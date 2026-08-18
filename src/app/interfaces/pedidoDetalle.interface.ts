import {Producto} from './producto.interface'
import {Pedido} from './pedido.interface'

export interface PedidoDetalle {
  id?:number;
  cantidad:number;
  precioUnitario:number;
  subtotal:number;
  producto:Producto;
  pedido:Pedido;
}
