import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Router } from '@angular/router';
import { FormComponent } from '../../shared/components/form/form.component';
import type { Product } from '../../shared/models/product.model';

@Component({
    selector: 'app-create',
    imports: [FormComponent],
    templateUrl: './create.component.html',
    styleUrl: './create.component.scss'
})
export class CreateComponent {
  productService = inject(ProductsService);
  router = inject(Router);

  onSubmit(product: Product) {
    const title = product.title

    if (title === '') return

    // this.productService.post(product).subscribe(() => {
    //   this.matSnackBar.open('Produto criado com sucesso!', 'Ok');

    //   this.router.navigateByUrl('/');
    // })
  }
}
