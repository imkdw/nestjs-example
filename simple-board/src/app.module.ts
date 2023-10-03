import { Module } from '@nestjs/common';
import AuthModule from './modules/auth/auth.module';
import BoardModule from './modules/board/board.module';

@Module({
  imports: [AuthModule, BoardModule],
})
export default class AppModule {}
