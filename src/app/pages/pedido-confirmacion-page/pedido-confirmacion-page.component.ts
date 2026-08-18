import { Component, inject } from '@angular/core';
import { RouterLink,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pedido-confirmacion-page-component',
  templateUrl: './pedido-confirmacion-page.component.html',
  styleUrl: './pedido-confirmacion-page.component.css',
  imports: [RouterLink]
})
export class PedidoConfirmacionPageComponent {
  private route = inject(ActivatedRoute);

  estado = this.route.snapshot.queryParamMap.get('estado');
}
