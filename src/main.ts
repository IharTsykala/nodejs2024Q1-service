import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') ?? 4000;

  app.setGlobalPrefix('');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  await app.listen(port);
}
bootstrap();
