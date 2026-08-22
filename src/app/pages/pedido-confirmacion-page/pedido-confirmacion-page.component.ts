import { Component, inject } from '@angular/core';
import { RouterLink,ActivatedRoute } from '@angular/router';
import { HambugerMenuComponent } from "../../components/hamburger-menu/hamburger-menu.component";
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'pedido-confirmacion-page-component',
  templateUrl: './pedido-confirmacion-page.component.html',
  styleUrl: './pedido-confirmacion-page.component.css',
  imports: [RouterLink, HambugerMenuComponent,FooterComponent]
})
export class PedidoConfirmacionPageComponent {
  private route = inject(ActivatedRoute);

  estado = this.route.snapshot.queryParamMap.get('estado');
}
