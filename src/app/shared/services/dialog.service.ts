import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ProductsService } from './products.service';
import type { Observable } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Deletar produto</h2>
    <h2>
      Tem certeza que deseja deletar este produto?
    </h2>
    <div class="end">

      <!-- <button mat-button (click)="onNo()">Não</button>
      <button mat-button (click)="onYes()" color="primary" cdkFocusInitial>Sim</button> -->
    </div>
  `,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
  // readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  // matDialogRef = inject(MatDialogRef);

  // onNo() {
  //   this.matDialogRef.close(false);
  // }

  // onYes() {
  //   this.matDialogRef.close(true);
  // }
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  productsService = inject(ProductsService);
  // matDialog = inject(MatDialog);

  // openDialog(): Observable<boolean> {
  //   return this.matDialog.open(ConfirmationDialogComponent).afterClosed()
  // }
}
