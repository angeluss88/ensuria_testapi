import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { exposeDefaultValues: true },
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new UnprocessableEntityException(validationErrors);
      },
    }),
  );

  app.enableCors({
    origin: true,
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'access-token',
      'responsetype',
    ],
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
