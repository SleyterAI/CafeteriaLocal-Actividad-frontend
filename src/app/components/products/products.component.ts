import { Component, OnInit, inject } from "@angular/core";
import { RouterLink } from '@angular/router';
import { ProductCardComponent }
from "../product-card/product-card.component";
import { ProductoService }
from "../../services/producto.service";
import { Producto }
from "../../interfaces/producto.interface";
import { CartService }
from "../../services/cart.service";

@Component({
  selector:'products-component',
  templateUrl:'./products.component.html',
  styleUrl:'./products.component.css',
  imports: [ProductCardComponent,RouterLink],
})

export class ProductsComponent implements OnInit{

private productoService = inject(ProductoService);
private cartService = inject(CartService);

productos: Producto[] = [];
cargando = false;
error = '';

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.cargando = true;
    this.error = '';

    this.productoService.getAllProduct().subscribe({
      next: (data) => {
        this.productos = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.error = 'No se pudieron cargar los productos';
        this.cargando = false;
      }
    });
  }

  addToCart(producto: Producto): void {
    this.cartService.addToCart(producto);
  }

  // Obtenemos el contador del carrito
  cartCount = this.cartService.cartCount;

}
