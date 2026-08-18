import { Component, inject, signal } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { ProductoService } from "../../services/producto.service";
import { Producto } from '../../interfaces/producto.interface';
import { CartService } from "../../services/cart.service";

@Component({
  selector:'product-detail-component',
  templateUrl:'./product-detail.component.html',
  styleUrl:'./product-detail.component.css',
  imports: [DecimalPipe],
})
export class ProductDetailComponent{

  private route = inject(ActivatedRoute);
  productoService = inject(ProductoService);
  cartService = inject(CartService);

  producto = signal<Producto | null>(null);

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProductById(id).subscribe({
      next: (producto) => {
        this.producto.set(producto);
      },
      error: (error) => {
        console.error('Error al obtener el producto:', error);
      }
    });
  }

  addToCart(producto: Producto): void {
    this.cartService.addToCart(producto);
  }

  cartCount = this.cartService.cartCount;
}
