import { Component, inject } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../interfaces/producto.interface";

@Component({
  selector:'products-admin-page',
  templateUrl:'./products-admin-page.component.html',
  styleUrl:'./products-admin-page.component.css',

  imports: [
],
})
export class ProductsAdminPageComponent{
  private productoService = inject(ProductoService);
  productos: Producto[] = [];

  producto = this.productoService.
  cargando = false;
  error = '';

  ngOnInit(): void {
    this.getAllProducto();
  }

  getAllProducto(): void {
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

  updateProduct(){
    this.productoService.updateProducto;
  }
}



