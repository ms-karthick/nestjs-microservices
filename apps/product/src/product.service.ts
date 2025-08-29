import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDto, Product, SaleItemDto } from 'yes/shared';

@Injectable()
export class ProductService {

  getHello(): string {
    return 'Products Hello World!';
  }
}
