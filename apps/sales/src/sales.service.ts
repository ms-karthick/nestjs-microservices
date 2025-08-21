import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Sale, SaleLine } from 'yes/shared';

@Injectable()
export class SalesService {
  private sales: Sale[] = [];

  create(lines: SaleLine[]): Sale {
    const total = lines.reduce((sum, l) => sum + l.qty * l.price, 0);
    const sale: Sale = {
      id: randomUUID(),
      items: lines,
      total,
      createdAt: new Date().toISOString(),
    };
    this.sales.unshift(sale);
    return sale;
  }

  findAll(): Sale[] {
    return this.sales;
  }

  getHello(): string {
    return 'Sales Hello World!';
  }
}
