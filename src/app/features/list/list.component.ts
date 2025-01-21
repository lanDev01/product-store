import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import type { Product } from '../../shared/models/product.model';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { DialogService } from '../../shared/services/dialog.service';

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
  matDialog = inject(DialogService);

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
