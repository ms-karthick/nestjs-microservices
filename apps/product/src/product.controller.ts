import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateProductDto, Patterns, SaleItemDto } from 'yes/shared';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('products')
  getHello(): string {
    return this.productService.getHello();
  }

}
