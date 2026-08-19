import { Component, OnInit, inject } from "@angular/core";
import { ProductCardComponent }
from "../product-card/product-card.component";

import { ProductoService }from "../../services/producto.service";
import { CategoriaService } from "../../services/categoria.service";
import { CartService }from "../../services/cart.service";

import { Producto }from "../../interfaces/producto.interface";
import { Categoria } from "../../interfaces/categoria.interface";

@Component({
  selector:'products-component',
  templateUrl:'./products.component.html',
  styleUrl:'./products.component.css',
  imports: [ProductCardComponent],
})

export class ProductsComponent implements OnInit{

private productoService = inject(ProductoService);
private categoriaService = inject(CategoriaService);
private cartService = inject(CartService);

productos: Producto[] = [];
categorias: Categoria[] = [];

cargando = false;
cargandoCategorias = false;
error = '';

categoriaSeleccionada = '';

  ngOnInit(): void {
    this.getCategorias();
    this.getAllProducts();
  }

  getCategorias(): void {
    this.cargandoCategorias = true;

    this.categoriaService.getAllCategoria().subscribe({
      next: (data) => {
        this.categorias = data;
        this.cargandoCategorias = false;
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
        this.cargandoCategorias = false;
      }
    });
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

  getProductsByCategoria(nombreCategoria: string): void {

    this.cargando = true;
    this.error = '';

    this.productoService.getProductsByCategoria(nombreCategoria)
    .subscribe({
        next: (data) => {
          this.productos = data;
          this.cargando = false;
        },
        error: (err) => {
          console.error('Error al obtener productos por categoría:', err);
          this.error = 'No se pudieron cargar los productos';
          this.cargando = false;
        }
      });
  }

  cambiarCategoria(event: Event): void {

    const select = event.target as HTMLSelectElement;

    this.categoriaSeleccionada = select.value;

    // Si seleccionamos "Todas"
    if (!this.categoriaSeleccionada) {
      this.getAllProducts();
      return;
    }

    this.getProductsByCategoria(this.categoriaSeleccionada);
  }

  addToCart(producto: Producto): void {
    this.cartService.addToCart(producto);
  }

  // Obtenemos el contador del carrito
  cartCount = this.cartService.cartCount;

}
