import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { RouterService } from 'src/app/shared/services/router.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  form: FormGroup;
  onSave = false;

  constructor(
    private _fb: FormBuilder,
    private _productsService: ProductsService,
    private _routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.setFormBuilder();
  }

  setFormBuilder() {
    this.form = this._fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      department: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      sales: ['', []],
    });
  }

  onSubmit() {
    this.onSave = true;
    const product: Product = {
      name: this.form.value.name,
      department: this.form.value.department,
      price: this.form.value.price,
      sales: this.form.value.sales ? this.form.value.sales : 0,
      id: '',
    };

    this._productsService.createProduct(product).subscribe({
      error: (err) => {
        alert('Falha ao criar produto');
        this.onSave = false;
      },
      next: () => {
        alert('Produto criado com sucesso!');
        this.onSave = false;
        this.clearFields();
      },
    });
  }

  clearFields() {
    this.form.reset();
  }

  back() {
    this._routerService.back();
  }
}
