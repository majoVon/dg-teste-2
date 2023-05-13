import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { RouterService } from 'src/app/shared/services/router.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  orderOptions: any[] = [
    {
      name: 'Nome',
      code: 'name',
    },
    { name: 'Departamento', code: 'department' },
    { name: 'Preço', code: 'price' },
    { name: 'Vendas', code: 'sales' },
  ];
  orderBy = {
    code: '',
    name: '',
  };
  currentOrder: string = 'name';
  products: Observable<Product[]>;
  constructor(
    private _productsService: ProductsService,
    private _routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.orderBy.code = this.currentOrder;
    this.getProducts();
  }

  getProducts() {
    this.products = this._productsService.getProducts(this.orderBy?.code).pipe(
      tap((res) => {
        if (res.length == 0) {
          alert('Nenhum produto cadastrado!');
          this._routerService.redirectTo('/admin/novo-produto');
        }
      })
    );
  }

  order() {
    if (this.currentOrder != this.orderBy?.code) {
      this.currentOrder = this.orderBy?.code;
      this.getProducts();
    }
  }

  deleteProduct(id: string, name: string) {
    if (confirm(`Deseja excluir o produto ${name}?`)) {
      this._productsService.deleteProduct(id).subscribe({
        error: (err) => alert('Não foi possível excluir o produto!'),
        next: () => {
          alert('Produto excluído com sucesso!');
          this.getProducts();
        },
      });
    }
  }
}
