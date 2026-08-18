import { Component } from "@angular/core";
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { ProductsComponent } from '../../components/products/products.component';
import { CartComponent } from "../../components/cart/cart.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector:'app-landing-page',
  templateUrl:'./landing-page.component.html',
  styleUrl:'./landing-page.component.css',

  imports: [
    NavbarComponent,
    IntroductionComponent,
    ProductsComponent,
    CartComponent,
    FooterComponent,
  ],
})

export class LandingPageComponent{}
