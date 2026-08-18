import { Producto } from "../interfaces/producto.interface";

export interface CartItem {
  producto: Producto;
  cantidad: number;
}
