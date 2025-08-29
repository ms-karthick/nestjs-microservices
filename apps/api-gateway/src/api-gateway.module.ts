import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => {
          const redisUrl = new URL(cfg.get<string>('REDIS_URL') || 'redis://localhost:6379');
          return {
            transport: Transport.REDIS,
            options: {
              host: redisUrl.hostname,
              port: Number(redisUrl.port),
            },
          };
        },
      },
      {
        name: 'SALES_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => {
          const redisUrl = new URL(cfg.get<string>('REDIS_URL') || 'redis://localhost:6379');
          return {
            transport: Transport.REDIS,
            options: {
              host: redisUrl.hostname,
              port: Number(redisUrl.port),
            },
          };
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
