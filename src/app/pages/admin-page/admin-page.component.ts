import { Component } from "@angular/core";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarAdminComponent } from "../../components/navbar-admin/navbar-admin.component";

@Component({
  selector:'app-admin-page',
  templateUrl:'./admin-page.component.html',
  styleUrl:'./admin-page.component.css',
  imports: [
    NavbarComponent,
    NavbarAdminComponent,
    FooterComponent,
],
})
export class AdminPageComponent{}
