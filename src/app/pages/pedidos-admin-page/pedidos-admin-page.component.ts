import { Component, inject } from "@angular/core";
import { PedidoService } from "../../services/pedido.service";
import { PedidoRequest } from "../../interfaces/pedido.interface";
import { DecimalPipe } from "@angular/common";

type EstadoPedido =
  | 'pendiente'
  | 'en preparacion'
  | 'entregado';

@Component({
  selector: 'pedidos-admin-page',
  templateUrl: './pedidos-admin-page.component.html',
  styleUrl: './pedidos-admin-page.component.css',

  imports: [
    DecimalPipe
  ],
})
export class PedidosAdminPageComponent {

  private pedidoService = inject(PedidoService);

  pedidoRequest: PedidoRequest[] = [];
  cargando = false;
  error = '';

  estados: EstadoPedido[] = [
    'pendiente',
    'en preparacion',
    'entregado'
  ];

  ngOnInit(): void {
    this.getAllPedido();
  }

  getAllPedido(): void {
    this.cargando = true;
    this.error = '';

    this.pedidoService.getAllPedidoRequest().subscribe({
      next: (data) => {
        this.pedidoRequest = data;
        this.cargando = false;
      },

      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }

  actualizandoEstado = new Set<number>();


  cambiarEstado(pedido: PedidoRequest, nuevoEstado: string): void {

    // Si seleccionó el mismo estado,
    // no hacemos ninguna petición.
    if (pedido.estado === nuevoEstado) { return; }

    if (this.actualizandoEstado.has(pedido.id)) { return; }

    const estadoAnterior = pedido.estado;

    this.actualizandoEstado.add(pedido.id);
    // Actualizamos visualmente
    pedido.estado = nuevoEstado;

    this.pedidoService.cambiarEstado(pedido.id, nuevoEstado).subscribe({
      next: (pedidoActualizado) => {
        const index = this.pedidoRequest.findIndex(
          p => p.id === pedidoActualizado.id);

        if (index !== -1) {
          this.pedidoRequest[index] = pedidoActualizado;
        }
        this.actualizandoEstado.delete(pedido.id);
      },

      error: (err) => {
        console.error('Error al cambiar estado:', err);

        // Si falla el backend,
        // recuperamos el estado anterior.
        pedido.estado = estadoAnterior;
        this.actualizandoEstado.delete(pedido.id);
        this.error = 'No se pudo actualizar el estado del pedido';
      }

    });
  }

  getEstadoClass(estado: string): string {

    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'estado-pendiente';

      case 'en preparacion':
        return 'estado-preparacion';

      case 'entregado':
        return 'estado-entregado';

      default:
        return '';
    }
  }

  getEstadoLabel(estado: string): string {

    switch (estado.toLowerCase()) {
      case 'pendiente':
        return 'Pendiente';

      case 'en preparacion':
        return 'En preparación';

      case 'entregado':
        return 'Entregado';

      default:
        return estado;
    }
  }
}
