import { Component } from "@angular/core";

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from "../../components/footer/footer.component";
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";
import { CartComponent } from "../../components/cart/cart.component";

@Component({
  selector:'product-detail-page',
  templateUrl:'./product-detail-page.component.html',
  styleUrl:'./product-detail-page.component.css',

  imports: [
    NavbarComponent,
    ProductDetailComponent,
    CartComponent,
    FooterComponent,
],
})
export class ProductDetailPageComponent{ }
