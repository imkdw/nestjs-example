import { Module } from '@nestjs/common';
import ProfilePictureService from './profile-picture.service';
import UsersModule from '../users.module';
import FileModule from '../../file/file.module';

@Module({
  imports: [UsersModule, FileModule],
  providers: [ProfilePictureService],
  exports: [ProfilePictureService],
})
export default class ProfilePictureModule {}
