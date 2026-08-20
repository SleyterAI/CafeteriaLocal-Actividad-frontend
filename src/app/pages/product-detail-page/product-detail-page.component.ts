import { Component } from "@angular/core";

import { HambugerMenuComponent } from "../../components/hamburger-menu/hamburger-menu.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";
import { CartComponent } from "../../components/cart/cart.component";

@Component({
  selector:'product-detail-page',
  templateUrl:'./product-detail-page.component.html',
  styleUrl:'./product-detail-page.component.css',

  imports: [
    HambugerMenuComponent,
    ProductDetailComponent,
    CartComponent,
    FooterComponent,
],
})
export class ProductDetailPageComponent{ }
