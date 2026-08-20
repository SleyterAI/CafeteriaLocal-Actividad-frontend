import { Component } from "@angular/core";

import { IntroductionComponent } from "../introduction/introduction.component";
import { ProductsComponent } from "../products/products.component";
import { CartComponent } from "../cart/cart.component";

@Component({
  selector: 'body-component',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
  imports: [
    IntroductionComponent,
    ProductsComponent,
    CartComponent
  ]
})
export class BodyComponent {}
