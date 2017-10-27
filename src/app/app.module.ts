import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrderListingComponent } from './components/order-listing/order-listing.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductListingComponent,
    NewProductComponent,
    EditProductComponent,
    OrderListingComponent,
    OrderDetailComponent,
    ProductDetailComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
