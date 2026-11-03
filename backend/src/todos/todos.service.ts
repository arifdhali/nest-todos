import { BadGatewayException, BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto.js';
import { UpdateTodoDto } from './dto/update-todo.dto.js';
import { PrismaService } from '../prismaConfig/prisma.service.js';
import type { userType } from '../common/constant/constant.js';
import { FindTodoQueryDto } from './dto/find-todo.dto.js';

@Injectable()
export class TodosService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(user: userType, createTodoDto: CreateTodoDto) {
    return this.prismaService.$transaction(async (tx) => {

      let isUser = await tx.users.findFirst({
        where: {
          id: user.sub,
          status: true
        },
        select: {
          id: true
        }
      })

      if (!isUser) {
        throw new ForbiddenException("Your account is inactive or unavailable")
      }

      //  removing owner id and making unique
      let sharedUsers = [...new Set(createTodoDto.shared_with) ?? []].filter((user_id) => user_id != user.sub);


      if (sharedUsers.length >= 1) {
        let verifyAllUsers = await tx.users.findMany({
          where: {
            id: {
              in: sharedUsers
            },
            status: true
          },
          select: {
            id: true,
            email: true,
            user_name: true
          }
        })
        if (!verifyAllUsers.length) {
          throw new NotFoundException("Given users is not found or Invalid")
        }

        if (sharedUsers.length != verifyAllUsers.length) {
          throw new BadRequestException('One or more users do not exist or are inactive')
        }
      }




      let todo = await tx.todo.create({
        data: {
          user_id: user.sub,
          subject: createTodoDto.subject,
          description: createTodoDto.description,
          shareable: sharedUsers.length >= 1
        }
      })

      if (!todo) {
        throw new BadGatewayException("Todo creation failed")
      }
      await tx.sharedTodos.createMany({
        data: sharedUsers.map((receiver) => ({
          todo_id: todo.id,
          sender_id: user.sub,
          reciver_id: receiver,
          can_read: createTodoDto.shared_permission.read,
          can_write: createTodoDto.shared_permission.write
        }))
      })

      let sharedTodoInfo = await tx.todo.findMany({
        where: {
          id: todo.id,
          user_id: user.sub,
          status: true,
        },
        select: {
          id: true,
          subject: true,
          description: true,
          shareable: true,
          shareTodos: {
            select: {
              id: true,
              receiver: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true
                }
              },
              can_read: true,
              can_write: true
            }
          }

        },
      })
      let result = sharedTodoInfo.map((todos) => {
        return {
          id: todos.id,
          subject: todos.subject,
          description: todos.description,
          ...(todos.shareTodos.length >= 1 && (
            {
              share_info: todos.shareTodos.map((share) => ({
                id: share.id,
                receiver: `${share.receiver.first_name} ${share.receiver.last_name}`,
                can_read: share.can_read,
                can_write: share.can_write,
              }))
            }
          ))
        }
      })

      // here i need to call notifications services
      // NotifcationServices()

      return {
        msg: "You have added a todo successfully",
        todo: result
      }
    })
  }

  async findAll(user: userType, query: FindTodoQueryDto) {


    const { status, page, perPage } = query;
    let IsUser = await this.prismaService.users.findFirst({
      where: {
        id: user.sub,
        status: true
      }
    })

    if (!IsUser) {
      throw new BadRequestException("User id not found!")
    }
    let skip = (page - 1) * perPage;

    let todos = await this.prismaService.todo.findMany({
      where: {
        user_id: user.sub,
        status: true,
        completed: status
      },
      select: {
        id: true,
        subject: true,
        description: true,
        shareTodos: {
          where: {
            sender_id: user.sub
          },
          select: {
            receiver: {
              select: {
                id: true,
                first_name: true,
                status: true
              }
            }
          }
        },

      },
      take: perPage,
      skip,
      orderBy: {
        created_at: "asc"
      }
    })

    let result = todos.map((todo) => {

      return {
        id: todo.id,
        subject: todo.subject,
        description: todo.description,
        shared_users: todo.shareTodos.map((share) => ({
          id: share.receiver.id,
          name: share.receiver.first_name
        }))
      }
    })
    return result;
  }

  async findOne(user: userType, todo_id: string) {

    await this.getUser(user);

    let todo = await this.prismaService.todo.findFirst({
      where: {
        id: todo_id,
        user_id: user.sub
      }
    })


    if (!todo) {
      throw new BadRequestException("Todo not found")
    }


    let sharedTodoHistory = await this.prismaService.sharedTodosHistory.findMany({
      where: {
        todo_id: todo_id
      },
      omit: {
        created_at: true
      }
    })

    let normalizeUser = [...new Set(sharedTodoHistory)].map((todo) => todo.user_id);

    let sharedUser = await this.prismaService.users.findMany({
      where: {
        id: {
          in: normalizeUser
        }
      },
      select: {
        first_name: true,
        last_name: true
      }
    })

    let result = sharedTodoHistory.map((history) => {
      const { user_id, ...otherData } = history;
      return {
        ...otherData,
        receiver: sharedUser.map((user) => `${user.first_name} ${user.last_name}`)
      }
    })

    return result;

  }



  async remove(user: userType, id: string, forceDelete: boolean) {

    await this.getUser(user);
    let todo = await this.prismaService.todo.findFirst({
      where: {
        id: id,
        user_id: user.sub
      }
    })

    if (!todo) {
      throw new BadRequestException("Todo not found")
    }


    // check whether its has shared user or not 

    let sharedCount = await this.prismaService.sharedTodos.count({
      where: {
        todo_id: id
      }
    });

    if (sharedCount > 0 && !forceDelete) {
      return {
        confirmationRequired: true,
        shared_count: sharedCount,
        message: `You have shared this Todo with ${sharedCount} user(s). Do you really want to delete it?`,
      };
    }
    await this.prismaService.$transaction(async (tx) => {
      await tx.todo.delete({
        where: { id },
      });
    })

    return {
      success: true,
      message: 'Todo deleted successfully',
    }

  }

  protected async getUser(user: Pick<userType, "sub">) {
    let isUser = await this.prismaService.users.findFirst({
      where: {
        id: user.sub,
        status: true
      }
    })

    if (!isUser) {
      throw new BadRequestException("User id not found!")
    }

    return isUser;
  }



  async update(params: { id: string }, user: userType, updateTodoData: UpdateTodoDto) {


    await this.getUser(user)

    let todo = await this.prismaService.todo.findFirst({
      where: {
        id: params.id,
        user_id: user.sub,
        completed: {
          not: "completed"
        }
      }
    })

    if (!todo) {
      throw new BadRequestException("Todo not found")
    }
    if (todo.completed) {
      throw new ConflictException('Completed Todo cannot be updated.');
    }

    await this.prismaService.todo.update({
      where: {
        id: params.id,
        user_id: user.sub
      },
      data: updateTodoData
    })

    return true;
  }
}
