export interface DetallePedidoRequest {
  productoId: number;
  cantidad: number;
}

export interface Pedido {
  id?:number;
  clienteNombre:string;
  celular:string;
  direccion:string;
  detallePedidoRequestDto: DetallePedidoRequest[];
}
