import { Component, computed, input, output } from '@angular/core';
import type { Product } from '../../../../shared/models/product.model';

@Component({
    selector: 'app-card',
    imports: [],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class CardComponent {
  product = input.required<Product>();

  edit = output()
  delete = output()

  productTitle = computed(() => this.product()?.title);
}
