import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateProductDto, Product, SaleItemDto } from 'yes/shared';

@Injectable()
export class ProductService {
  private products = new Map<string, Product>();

  create(dto: CreateProductDto) {
    const id = randomUUID();
    const product: Product = { id, ...dto };
    this.products.set(id, product);
    return product;
  }

  findAll(): Product[] {
    return [...this.products.values()];
  }

  findOne(id: string): Product | undefined {
    return this.products.get(id);
  }

  reserve(items: SaleItemDto[]) {
    // Validate availability
    for (const { productId, qty } of items) {
      const p = this.products.get(productId);
      if (!p) throw new Error(`Product ${productId} not found`);
      if (p.stock < qty) throw new Error(`Insufficient stock for ${p.name}`);
    }
    // Reserve (decrease)
    const priced = items.map(({ productId, qty }) => {
      const p = this.products.get(productId)!;
      p.stock -= qty;
      this.products.set(productId, p);
      return { productId, qty, price: p.price };
    });
    return { reserved: priced };
  }

  release(items: SaleItemDto[]) {
    for (const { productId, qty } of items) {
      const p = this.products.get(productId);
      if (p) {
        p.stock += qty;
        this.products.set(productId, p);
      }
    }
    return { released: true };
  }

  getHello(): string {
    return 'Products Hello World!';
  }
}
