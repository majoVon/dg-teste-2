import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url = environment.url;
  constructor(private _http: HttpClient, private _afs: AngularFirestore) {}

  getProducts(orderBy = 'name'): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.url}/${orderBy}`);
  }

  createProduct(product: Product): Observable<Product> {
    product.id = this._afs.createId();
    return this._http.post<Product>(this.url, product).pipe(take(1));
  }

  getProductById(id: string): Observable<Product> {
    return this._http.get<Product>(`${this.url}/get-by-id/${id}`).pipe(take(1));
  }

  updateProduct(product: Product): Observable<Product> {
    return this._http.put<Product>(this.url, product).pipe(take(1));
  }

  deleteProduct(id: string) {
    return this._http.delete(`${this.url}/${id}`).pipe(take(1));
  }
}
