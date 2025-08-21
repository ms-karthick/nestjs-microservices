import { NestFactory } from '@nestjs/core';
import { SalesModule } from './sales.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    // Start an HTTP server
    const app = await NestFactory.create(SalesModule);

  // Attach Redis microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002); // Now you have an HTTP server too
  console.log(`Sales service running at http://localhost:3002`);
}
bootstrap();