import { Module } from '@nestjs/common';
import UsersService from './users.service';
import UsersController from './users.controller';
import FileModule from '../file/file.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule {}
