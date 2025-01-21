import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { CardComponent } from './components/card/card.component';
import type { Product } from '../../shared/models/product.model';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
    <mat-dialog-content>
      Tem certeza que deseja deletar este produto?
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNo()">Não</button>
      <button mat-button (click)="onYes()" color="primary" cdkFocusInitial>Sim</button>
    </mat-dialog-actions>
  `,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  matDialogRef = inject(MatDialogRef);

  onNo() {
    this.matDialogRef.close(false);
  }

  onYes() {
    this.matDialogRef.close(true);
  }
}

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
  matDialog = inject(MatDialog);

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
    this.matDialog
      .open(ConfirmationDialogComponent)
      .afterClosed()
      .pipe(
        filter(answer => answer === true)
      )
      .subscribe(() => {
        this.productsService.delete(productId).subscribe(() => {
          this.getProducts();
        })
      })
  }
}
