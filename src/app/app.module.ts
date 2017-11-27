import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpModule,  Http } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

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
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CategoriesListingComponent } from './components/categories-listing/categories-listing.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventoryListingComponent } from './components/inventory-listing/inventory-listing.component';
import { HeaderComponent } from './components/header/header.component';




const appRoutes: Routes = [
  
    { path: '', component: HomeComponent ,  },
    { path: 'login', component: LoginComponent },
    { path: 'products', component: ProductListingComponent ,},
    { path: 'products/:id', component: ProductDetailComponent ,},
    { path: 'orders', component: OrderListingComponent ,},
    { path: 'order/:id', component: OrderDetailComponent ,},
    { path: 'settings', component: SettingsComponent ,},
    { path: 'forgot-password', component: ForgotPasswordComponent ,},
]


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
    SettingsComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    CategoriesListingComponent,
    NewCategoryComponent,
    CategoryDetailComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    InventoryListingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule, HttpModule ,FormsModule, RouterModule.forRoot(appRoutes, {}) ,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
