import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products');
  }

}
