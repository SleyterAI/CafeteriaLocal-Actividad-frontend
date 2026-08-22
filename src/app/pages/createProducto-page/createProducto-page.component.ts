import { Component, inject } from "@angular/core";
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ProductoService } from "../../services/producto.service";
import { Producto } from "../../interfaces/producto.interface";
import { CategoriaService } from "../../services/categoria.service";
import { Categoria } from "../../interfaces/categoria.interface";

@Component({
  selector: 'createProducto-page',
  templateUrl: './createProducto-page.component.html',
  styleUrl: './createProducto-page.component.css',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
})
export class CreateProductoPageComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private productoService = inject(ProductoService);
  private categoriaService = inject(CategoriaService)

  categorias: Categoria[] = [];

  cargando = false;
  cargandoCategorias = false;
  mensaje = '';
  error = '';
  categoriaSeleccionada = '';
  mostrarExito = false;

  ngOnInit(): void {
    this.getCategorias();
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



  productoForm = this.fb.nonNullable.group({

    nombre: ['',
      [Validators.required,
      Validators.minLength(5)]],

    descripcion: ['',
      [Validators.required,
    Validators.minLength(10)]],

    precio: ['',
      [Validators.required,
      Validators.min(1)]],

    stock: ['',
      [Validators.required,
      Validators.min(1)]],

    imageUrl: ['',
      [Validators.required]],

    activo: [true],

    categoriaId: ['', [Validators.required]]

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
      precio: Number(formValue.precio),
      stock: Number(formValue.stock),
      imageUrl: formValue.imageUrl,
      activo: formValue.activo,
      categoria: {
        id: Number(formValue.categoriaId),
        nombre: ''
      }
    };

    //console.log('Producto que se enviará:', producto);

    this.productoService.createProducto(producto).subscribe({

      next: () => {
        /*console.log(
          'Producto creado:',
          productoCreado
        );*/

        this.mensaje =
          'Producto creado correctamente';
        this.cargando = false;

        // Mostrar popup
        this.mostrarExito = true;

        // Esperar 1.5 segundos y navegar
        setTimeout(() => {
          this.mostrarExito = false;

          this.router.navigate([
            '/admin-page/products-admin-page'
          ]);
        }, 1500);

        this.productoForm.reset({
          nombre: '',
          descripcion: '',
          precio: '',
          stock: '',
          imageUrl: '',
          activo: true,
          categoriaId: ''
        });
      },

      error: (err) => {
        console.error('Error al crear producto:', err);
        this.error = 'No se pudo crear el producto';
        this.cargando = false;
      }

    });

  }
}
