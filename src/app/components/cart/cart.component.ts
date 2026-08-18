import { Component, inject } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { RouterLink } from '@angular/router';

@Component({
  selector:'cart-component',
  templateUrl:'./cart.component.html',
  styleUrl:'./cart.component.css',
  imports: [RouterLink],
})
export class CartComponent {

  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;

}
