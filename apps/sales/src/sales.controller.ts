import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Patterns, SaleLine } from 'yes/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @MessagePattern(Patterns.SALES_CREATE)
  create(@Payload() payload: { items: SaleLine[] }) {
    return this.salesService.create(payload.items);
  }

  @MessagePattern(Patterns.SALES_FIND_ALL)
  findAll() {
    return this.salesService.findAll();
  }

  @MessagePattern()
  getHello(): string {
    return this.salesService.getHello();
  }

  @Get()
  getHelloHttp(): string {
    return this.salesService.getHello();
  }
}
