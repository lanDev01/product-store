import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from './components/card/card.component';

import { ProductsService } from '../../shared/services/products.service';
import { DialogService } from '../../shared/services/dialog.service';

import type { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CardComponent, RouterLink, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  products = signal<Product[]>(inject(ActivatedRoute).snapshot.data['products']);
  router = inject(Router);
  productsService = inject(ProductsService);
  matDialog = inject(DialogService);

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products.set(response)
      }
    })
  }

  onEdit(productId: string) {
    this.router.navigate([`/edit-product/${productId}`]);
  }

  onDelete(productId: string) {
    this.matDialog.openDialog()
      .pipe(filter(answer => answer === true))
      .subscribe((answer) => {
        this.productsService.delete(productId).subscribe(() => {
          this.getProducts();
        })
      })
  }
}
