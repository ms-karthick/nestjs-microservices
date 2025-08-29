import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Patterns } from 'yes/shared';

@Controller('api-gateway')
export class ApiGatewayController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
    @Inject('SALES_SERVICE') private readonly salesClient: ClientProxy,
    private readonly apiGatewayService: ApiGatewayService,) {}

    @Get('products')
    async products() {
      return firstValueFrom(this.productClient.send('products', {}));
    }
  
    @Get('sales')
    async salses() {
      return firstValueFrom(this.salesClient.send('sales', {}));
    }
  
  @Get()
  getHello(): string {
    return this.apiGatewayService.getHello();
  }
}

