import { Component } from "@angular/core";

import { HeaderComponent }
from "../../components/header/header.component";
import { BodyComponent }
from "../../components/body/body.component";
import { FooterComponent }
from '../../components/footer/footer.component';
import { RouterOutlet } from "@angular/router";

@Component({
  selector:'app-landing-page',
  templateUrl:'./landing-page.component.html',
  styleUrl:'./landing-page.component.css',

  imports: [
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    RouterOutlet,
],
})

export class LandingPageComponent{}
