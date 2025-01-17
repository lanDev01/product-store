import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { ProductPayload } from '../models/create-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products');
  }

  get(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`/api/products/${id}`);
  }

  post(payload: ProductPayload) {
    return this.httpClient.post<ProductPayload>('/api/products', payload);
  }

  put(id: string, payload: ProductPayload) {
    return this.httpClient.put<ProductPayload>(`/api/products/${id}`, payload);
  }

}
