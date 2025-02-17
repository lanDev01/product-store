import { Component, input, output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import type { Product } from '../../models/product.model';

@Component({
    selector: 'app-form',
    imports: [ReactiveFormsModule, RouterLink],
    templateUrl: './form.component.html',
    styleUrl: './form.component.scss'
})
export class FormComponent {

  done = output<Product>()
  link = input<string>('')

  product = input<Product | null>(null);
  form!: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl<string>(
        this.product()?.title ?? '', {
          nonNullable: true,
          validators: Validators.required
      })
    });
  }

  onSubmit() {
    const product = this.form.value as Product
    this.done.emit(product)
  }
}
