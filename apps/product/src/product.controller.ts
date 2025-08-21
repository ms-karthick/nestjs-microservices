import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateProductDto, Patterns, SaleItemDto } from 'yes/shared';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('getHello')
  getHello(): string {
    return this.productService.getHello();
  }

  @MessagePattern(Patterns.PRODUCT_CREATE)
  create(@Payload() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @MessagePattern(Patterns.PRODUCT_FIND_ALL)
  findAll() {
    return this.productService.findAll();
  }

  @MessagePattern(Patterns.PRODUCT_FIND_ONE)
  findOne(@Payload() id: string) {
    const prod = this.productService.findOne(id);
    if (!prod) throw new RpcException('Product not found');
    return prod;
  }

  @MessagePattern(Patterns.PRODUCT_RESERVE)
  reserve(@Payload() payload: { items: SaleItemDto[] }) {
    return this.productService.reserve(payload.items);
  }

  @MessagePattern(Patterns.PRODUCT_RELEASE)
  release(@Payload() payload: { items: SaleItemDto[] }) {
    return this.productService.release(payload.items);
  }
}
