import { Component } from "@angular/core";
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { CheckoutComponent } from "../../components/checkout/checkout.component";
import { CartComponent } from "../../components/cart/cart.component";

@Component({
  selector:'app-checkout-page',
  templateUrl:'./checkout-page.component.html',
  styleUrl:'./checkout-page.component.css',

  imports: [
    NavbarComponent,
    CheckoutComponent,
    CartComponent,
    FooterComponent,
],
})

export class CheckoutPageComponent{}
