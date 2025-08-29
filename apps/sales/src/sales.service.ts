import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Sale, SaleLine } from 'yes/shared';

@Injectable()
export class SalesService {
  getHello(): string {
    return 'Sales Hello World!';
  }
}
