import { Injectable } from '@nestjs/common';
import UsersService from '../users/users.service';

@Injectable()
export default class FileService {
  private files = [
    {
      id: 'picture-1',
      url: 'https://www.file.com/picture-1',
    },
    {
      id: 'picture-2',
      url: 'https://www.file.com/picture-2',
    },
  ];

  constructor() {}

  public getById(pictureId: string): { id: string; url: string } {
    const file = this.files.find((file) => file.id === pictureId);
    return file;
  }

  public async getUserProfilePicture(
    userId: string,
  ): Promise<{ id: string; url: string }> {
    const user = this.usersService.getUserById(userId);
    return this.getById(user.profilePictureId);
  }
}
