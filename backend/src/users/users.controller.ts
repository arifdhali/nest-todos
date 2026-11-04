import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { AuthGuard } from '../auth/guard/auth.guard.js';
import { MetaResponse } from '../common/interceptor/response.interceptor.js';
import { CurrentUser } from '../common/decorator/current-user.decorator.js';
import type { userType } from '../common/constant/constant.js';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }



  @Get("")
  async userData(@CurrentUser() user: userType): Promise<MetaResponse> {


    let userData = await this.usersService.userData(user)

    return {
      message: "Dashboard retrived successfull",
      data: userData
    }


  }


}
