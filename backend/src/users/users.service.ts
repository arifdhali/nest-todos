import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { userType } from '../common/constant/constant.js';
import { PrismaService } from '../prismaConfig/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) { }

  async dashboard(user: userType) {

    await this.getActiveUserOrThrow(user);


    let todos = await this.prismaService.users.findMany({
      where: {
        status: true,
        id: user.sub
      },
      select: {
        todo: {
          select: {
            shareTodos: true
          }
        },
      }
    })

    return todos;

  }
  protected async getActiveUserOrThrow(user: Pick<userType, "sub">) {
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
}
