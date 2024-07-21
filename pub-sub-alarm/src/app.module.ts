import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AlarmModule from './modules/alarm/alarm.module';
import { ConfigModule } from '@nestjs/config';
import DatabaseModule from './infra/redis/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AlarmModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
