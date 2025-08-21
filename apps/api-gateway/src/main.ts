import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
   // Enable automatic validation using class-validator decorators
   app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,      // strip unknown properties
      forbidNonWhitelisted: false, // set to true if you want to throw errors on unknown props
      transform: true,      // auto-transform payloads to DTO instances
    }),
  );
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  await app.listen(port);
  console.log(`API Gateway is running on http://localhost:${port}`);
}
bootstrap();
