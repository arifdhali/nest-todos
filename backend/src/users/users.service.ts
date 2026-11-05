import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { userType } from '../common/constant/constant.js';
import { PrismaService } from '../prismaConfig/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async userData(user: userType) {
    await this.getActiveUserOrThrow(user);

    let sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)



    let todos = await this.prismaService.users.findMany({
      where: {
        status: true,
        id: user.sub
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        todo: {
          where: {
            created_at: {
              gt: sevenDaysAgo
            }
          },
          orderBy: {
            created_at: "desc"
          },
          omit: {
            user_id: true,
            status: true,
            updated_at: true
          },
          take: 5,
        },
        sentTodoShares: {
          select: {
            todo_id: true,
            todo: {
              select: {
                subject: true
              }
            },
            can_read: true,
            can_write: true,
            receiver: {
              select: {
                id: true,
                first_name: true,
                last_name: true
              }
            },
          },
          take: 5
        },
        receiveTodoShares: {
          select: {
            todo_id: true,
            todo: {
              select: {
                subject: true
              }
            },
            can_read: true,
            can_write: true,
            sender: {
              select: {
                id: true,
                first_name: true,
                last_name: true
              }
            },
          },
          take: 5
        },
        history: {
          select: {
            updated_at: true,
            actions: true,
            todo: {
              select: {
                id: true,
                subject: true
              }
            }
          }
        }
      },
    })


    let result = todos.map(({ history: shareHistory, receiveTodoShares, sentTodoShares, ...rest }) => ({
      ...rest,
      history: shareHistory.map((his) => {
        return {
          ...his.todo,
          actions: his.actions,
          updated_at: his.updated_at,
        }
      }),
      reciveTodo: receiveTodoShares.map(({ todo, ...rest }) => ({
        ...todo,
        ...rest
      })),
      sendTodo: sentTodoShares.map(({ todo, ...rest }) => ({
        ...todo,
        ...rest
      })),
    }))[0]
    return result;

  }
  protected async getActiveUserOrThrow(user: Pick<userType, "sub">) {
    let isUser = await this.prismaService.users.findFirst({
      where: {
        id: user.sub,
        status: true
      }
    })

    if (!isUser) {
      throw new BadRequestException("User not found!")
    }

    return isUser;
  }
}
