import { Component, inject } from "@angular/core";
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../interfaces/producto.interface";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'products-admin-page',
  templateUrl: './products-admin-page.component.html',
  styleUrl: './products-admin-page.component.css',

  imports: [
    RouterLink,
    RouterLinkActive
  ],
})
export class ProductsAdminPageComponent {
  private productoService = inject(ProductoService);
  productos: Producto[] = [];

  //producto = this.productoService.
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

  cambiarActivo(producto: Producto): void {

    const nuevoEstado = !producto.activo;

    this.productoService.cambiarActivo(producto.id!, nuevoEstado).subscribe({
        next: (productoActualizado) => {
          console.log(
            'Producto actualizado:',
            productoActualizado
          );
          producto.activo = productoActualizado.activo;
        },

        error: (err) => {
          console.error('Error al actualizar estado:',err);
          this.error =
            'No se pudo actualizar el estado del producto';
        }
      });
  }

}



