import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { ProductoService } from '../../services/producto.service';
import { ProductoRequest } from '../../interfaces/producto.interface';

@Component({
  selector: 'update-form-page',
  templateUrl: './update-form-page.component.html',
  styleUrl: './update-form-page.component.css',
  imports: [
    ReactiveFormsModule, RouterLink
  ]
})
export class UpdateFormPageComponent implements OnInit {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productoService = inject(ProductoService);

  productoId!: number;

  cargando = false;
  guardando = false;
  mostrarExito = false;
  error = '';
  mensaje = '';

  formulario = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [
      Validators.required,
      Validators.min(1)
    ]],
    stock: [0, [
      Validators.required,
      Validators.min(0)
    ]],
    imageUrl: ['', Validators.required],
    activo: [true],
    categoriaId: [0, [
      Validators.required,
      Validators.min(1)
    ]]
  });


  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = 'No se recibió el ID del producto';
      return;
    }

    this.productoId = Number(id);
    this.getProducto();
  }


  getProducto(): void {

    this.cargando = true;
    this.error = '';

    this.productoService
      .getProductById(this.productoId).subscribe({

        next: (producto) => {
          this.formulario.patchValue({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            imageUrl: producto.imageUrl,
            activo: producto.activo,
            categoriaId: producto.categoria.id ?? 0
          });

          this.cargando = false;


        },

        error: (err) => {

          console.error(
            'Error al obtener producto:',
            err
          );

          this.error =
            'No se pudo cargar el producto';

          this.cargando = false;
        }

      });
  }


  actualizarProducto(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.guardando = true;
    this.error = '';

    const formValue = this.formulario.getRawValue();

    const productoRequest: ProductoRequest = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      precio: formValue.precio,
      stock: formValue.stock,
      imageUrl: formValue.imageUrl,
      activo: formValue.activo,

      categoria: {
        id: formValue.categoriaId
      }
    };

    this.productoService
      .updateProducto(this.productoId, productoRequest).subscribe({
        next: () => {
          this.mensaje = 'Producto actualizado correctamente';
          this.guardando = false;

          // Mostrar popup
          this.mostrarExito = true;

          // Esperar 1.5 segundos y navegar
          setTimeout(() => {
            this.mostrarExito = false;
            this.router.navigate([
              '/admin-page/products-admin-page']);
          }, 1500);
        },

        error: (err) => {
          console.error(
            'Error al actualizar producto:',err);
          this.error =
            'No se pudo actualizar el producto';
          this.guardando = false;
        }
      });
  }
}

