import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector:'navbar-admin-component',
  templateUrl:'./navbar-admin.component.html',
  styleUrl:'./navbar-admin.component.css',
  imports: [
    RouterLink,
    RouterLinkActive
  ]
})
export class NavbarAdminComponent{}
