import { Component } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import { HambugerMenuComponent }
  from "../../components/hamburger-menu/hamburger-menu.component";
import { FooterComponent }
  from "../../components/footer/footer.component";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css',
  imports: [
    HambugerMenuComponent,
    RouterOutlet,
    FooterComponent,
  ],
})
export class AdminPageComponent { }
