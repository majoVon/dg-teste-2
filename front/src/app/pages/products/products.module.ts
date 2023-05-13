import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componentes
import { LayoutComponent } from './layout/layout.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CreateProductComponent } from './create-product/create-product.component';

//Modulos
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { InputValidatorModule } from 'src/app/shared/components/input-validator/input-validator.module';
import { SharedModule } from 'src/app/shared/modules/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterceptor } from 'src/app/interceptors/http.interceptor';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ProductsListComponent,
    CreateProductComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    ProductsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
})
export class ProductsModule {}
