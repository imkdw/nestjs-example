import { Module } from '@nestjs/common';
import LockService from './lock.service';

@Module({ providers: [LockService] })
export default class LockModule {}
