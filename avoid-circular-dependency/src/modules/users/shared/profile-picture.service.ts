import { Injectable } from '@nestjs/common';
import UsersService from '../users.service';
import FileService from '../../file/file.service';

@Injectable()
export default class ProfilePictureService {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileService: FileService,
  ) {}

  addUserProfilePicture(userId: string, pictureId: string) {
    const picture = this.fileService.getById(pictureId);
    return { id: userId, name: 'Sam', profilePictureId: picture.id };
  }

  getUserProfilePicture(userId: string) {
    const user = this.usersService.getUserById(userId);
    return this.fileService.getById(user.profilePictureId);
  }
}
