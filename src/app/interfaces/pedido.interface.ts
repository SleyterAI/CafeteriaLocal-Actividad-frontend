import { PedidoDetalle } from './pedidoDetalle.interface';

export interface PedidoDetalleRequest {
  productoId: number;
  cantidad: number;
}

export interface Pedido {
  id?:number;
  clienteNombre:string;
  celular:string;
  direccion:string;
  pedidoDetalleRequest: PedidoDetalleRequest[];
}

export interface PedidoRequest {
  id: number;
  clienteNombre: string;
  celular: string;
  direccion: string;
  fecha: string;
  estado: string;
  total: number;
  detalles: PedidoDetalle[];
}
