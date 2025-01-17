import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import type { Product } from '../../shared/models/product.model';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products: Product[] = [];
  router = inject(Router);
  productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      }
    })
  }

  onEdit() {
    this.router.navigateByUrl('/edit-product');
  }
}
