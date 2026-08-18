import { Component, input, output} from "@angular/core";
import { Producto } from "../../interfaces/producto.interface";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector:'product-card-component',
  templateUrl:'./product-card.component.html',
  styleUrl:'./product-card.component.css',
  imports: [RouterLink],
})
export class ProductCardComponent{
  producto = input.required<Producto>();

  //forma para poder enviar info al componente padre
  agregar = output<Producto>();
  //se envia al producto
  agregarAlCarrito(): void {
    this.agregar.emit(this.producto());}
}
