import { Component, inject } from "@angular/core";
import { PedidoService } from "../../services/pedido.service";
import { Pedido } from "../../interfaces/pedido.interface";

@Component({
  selector: 'pedidos-admin-page',
  templateUrl: './pedidos-admin-page.component.html',
  styleUrl: './pedidos-admin-page.component.css',

  imports: [
  ],
})
export class PedidosAdminPageComponent {

  private pedidoService = inject(PedidoService);
  pedido: Pedido[] = [];
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.getAllPedido();
  }

  getAllPedido(): void {
    this.cargando = true;
    this.error = '';

    this.pedidoService.getAllPedido().subscribe({
      next: (data) => {
        this.pedido = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }
}
