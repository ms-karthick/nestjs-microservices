import { Controller, Get } from '@nestjs/common';
import { SalesService } from './sales.service';
import { Patterns, SaleLine } from 'yes/shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  
  @MessagePattern('sales')
  getHello(): string {
    return this.salesService.getHello();
  }
}
