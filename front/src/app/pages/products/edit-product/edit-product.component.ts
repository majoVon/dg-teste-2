import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { RouterService } from 'src/app/shared/services/router.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit {
  form: FormGroup;
  onSave = false;
  product: Product;
  constructor(
    private _router: ActivatedRoute,
    private _productService: ProductsService,
    private _fb: FormBuilder,
    private _routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  setForm(res: Product) {
    this.form = this._fb.group({
      name: [
        res?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      department: [
        res?.department,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      price: [
        res?.price,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      sales: [res?.sales, []],
    });
  }

  getProduct() {
    const id = this._router.snapshot.paramMap.get('id').trim();

    this._productService.getProductById(id).subscribe((res) => {
      if (res) {
        this.product = res;
        this.setForm(res);
      }
    });
  }

  back() {
    this._routerService.back();
  }

  onSubmit() {
    this.onSave = true;
    const product = { ...this.form.value, id: this.product.id };
    this._productService.updateProduct(product).subscribe({
      error: (err) => {
        this.onSave = false;
        alert('Não foi possível editar o produto!');
      },
      next: () => {
        this.onSave = false;
        alert('Produto Editado com sucesso!');
        this._routerService.redirectTo('/admin');
      },
    });
  }
}
