import { Injectable } from '@nestjs/common';

@Injectable()
export default class UsersService {
  private users = [
    {
      userId: 'dongwoo',
      name: 'Kim Dong Woo',
      age: 25,
      profilePictureId: 'picture-1',
    },
    {
      userId: 'noob',
      name: 'No Noob',
      age: 21,
      profilePictureId: 'picture-2',
    },
  ];
  constructor() {}

  getUserById(userId: string) {
    return this.users.find((user) => user.userId === userId);
  }
}
