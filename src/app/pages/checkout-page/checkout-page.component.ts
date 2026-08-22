import { Component } from "@angular/core";

import { HambugerMenuComponent } from "../../components/hamburger-menu/hamburger-menu.component";
import { CheckoutComponent } from "../../components/checkout/checkout.component";
import { FooterComponent } from '../../components/footer/footer.component';

import { CartComponent } from "../../components/cart/cart.component";

@Component({
  selector:'app-checkout-page',
  templateUrl:'./checkout-page.component.html',
  styleUrl:'./checkout-page.component.css',

  imports: [
    HambugerMenuComponent,
    CheckoutComponent,
    CartComponent,
    FooterComponent,
    HambugerMenuComponent
],
})

export class CheckoutPageComponent{}
