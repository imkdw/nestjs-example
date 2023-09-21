import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Math.floor(Math.random() * 1000) + 3000;
  console.log('Server on', port);
  await app.listen(port);
}
bootstrap();
