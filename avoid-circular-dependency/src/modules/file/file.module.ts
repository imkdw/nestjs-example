import { Module } from '@nestjs/common';
import FileService from './file.service';
import UsersModule from '../users/users.module';

@Module({
  providers: [FileService],
  exports: [FileService],
})
export default class FileModule {}
