import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

import { HambugerMenuComponent } from "../hamburger-menu/hamburger-menu.component";
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [
    HambugerMenuComponent,
    SearchComponent]
})
export class HeaderComponent{}
