import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  // @Output() submit = new EventEmitter<Product>();
  done = output<Product>()

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
