import { Component, inject } from "@angular/core";
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../interfaces/producto.interface";
@Component({
  selector: 'createProducto-page',
  templateUrl: './createProducto-page.component.html',
  styleUrl: './createProducto-page.component.css',
  imports: [
    ReactiveFormsModule
  ],
})
export class CreateProductoPageComponent {

  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);

  cargando = false;
  mensaje = '';
  error = '';

  productoForm = this.fb.nonNullable.group({

    nombre: ['',[
        Validators.required,
        Validators.minLength(5)]],

    descripcion: ['',[Validators.required,
        Validators.minLength(10)]],

    precio: [0,[
        Validators.required,
        Validators.min(1)]],

    stock: [0,[
        Validators.required,
        Validators.min(1)]],

    imageUrl: ['',[Validators.required]],

    activo: [true],

    categoriaId: [0,[
        Validators.required,
        Validators.min(1)]]

  });


  guardarProducto(): void {

    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.error = '';

    const formValue = this.productoForm.getRawValue();

    const producto: Producto = {
      nombre: formValue.nombre,
      descripcion: formValue.descripcion,
      precio: formValue.precio,
      stock: formValue.stock,
      imageUrl: formValue.imageUrl,
      activo: formValue.activo,
      categoria: {
        id: formValue.categoriaId,
        nombre: ''}
    };

    console.log('Producto que se enviará:', producto);

    this.productoService.createProducto(producto).subscribe({

      next: (productoCreado) => {
          console.log(
            'Producto creado:',
            productoCreado
          );

          this.mensaje =
            'Producto creado correctamente';
          this.cargando = false;

          this.productoForm.reset({
            nombre: '',descripcion: '',
            precio: 0,stock: 0,
            imageUrl: '',activo: true,
            categoriaId: 0
          });
        },

        error: (err) => {
          console.error('Error al crear producto:',err);
          this.error ='No se pudo crear el producto';
          this.cargando = false;
        }

      });

  }
}
