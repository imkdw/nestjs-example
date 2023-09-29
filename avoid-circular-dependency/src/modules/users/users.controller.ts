import { Controller, Get, Param } from '@nestjs/common';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }
}
