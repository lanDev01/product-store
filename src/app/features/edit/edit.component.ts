import { Component, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';;
import { ActivatedRoute, Router } from '@angular/router';
import type { Product } from '../../shared/models/product.model';
import { FormComponent } from '../../shared/components/form/form.component';

@Component({
    selector: 'app-edit',
    imports: [FormComponent],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss'
})
export class EditComponent {
  productService = inject(ProductsService);
  router = inject(Router);

  // biome-ignore lint/complexity/useLiteralKeys: <explanation>
  product: Product = inject(ActivatedRoute).snapshot.data['product'];

  onSubmit(product: Product) {
    const title = product.title

    if (title === '') return

    // this.productService.put(this.product.id, product).subscribe(() => {
    //   this.matSnackBar.open('Produto editado com sucesso!', 'Ok');

    //   this.router.navigateByUrl('/');
    // })
  }
}
