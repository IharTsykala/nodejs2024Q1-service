import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/swagger';

//modules
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<unknown, boolean> = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') ?? 4000;

  app.setGlobalPrefix('');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  const server = await app.listen(port);

  // process.on('SIGTERM', async () => {
  //   console.info('Received SIGTERM signal, shutting down gracefully...');
  //   await app.close();
  //   server.close();
  //   console.log('Server closed.');
  //   process.exit(0);
  // });
  //
  // process.on('SIGINT', async () => {
  //   console.info('Received SIGINT signal, shutting down gracefully...');
  //   await app.close();
  //   server.close();
  //   console.log('Server closed.');
  //   process.exit(0);
  // });
  //
  // process.on('unhandledRejection', (reason, promise) => {
  //   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  //   // Application specific logging, throwing an error, or other logic here
  // });
  //
  // process.on('uncaughtException', (error) => {
  //   console.error('Uncaught Exception:', error);
  //   // Handle the error, log it, and possibly close the server
  //   server.close(() => {
  //     console.log('Server closed due to uncaught exception.');
  //     process.exit(1);
  //   });
  // });
}
bootstrap();
