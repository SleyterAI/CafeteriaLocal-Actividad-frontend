import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ReactiveFormsModule,NonNullableFormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../interfaces/pedido.interface';

@Component({
  selector: 'checkout-component',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  imports: [DecimalPipe, ReactiveFormsModule],
})
export class CheckoutComponent {

  private cartService = inject(CartService);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);
  private fb = inject(NonNullableFormBuilder);

  readonly cartProducts = this.cartService.getCartProducts();
  readonly cartCount = this.cartService.cartCount;

  readonly subtotal = this.cartService.subtotal;
  readonly total = this.cartService.total;

  increase(productoId: number): void {
    this.cartService.increaseQuantity(productoId);
  }

  decrease(productoId: number): void {
    this.cartService.decreaseQuantity(productoId);
  }

  remove(productoId: number): void {
    this.cartService.removeFromCart(productoId);
  }

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    celular: ['', [Validators.required,
      Validators.pattern(/^\d{9}$/)
    ]],
    direccion: ['', Validators.required]
  });

  crearPedido(): void {
    if (this.formulario.invalid) {
    this.formulario.markAllAsTouched();
    return;
  }

  const { nombre, celular, direccion } = this.formulario.getRawValue();

    const pedido: Pedido = {
      clienteNombre: nombre,
      celular: celular,
      direccion: direccion,

      detallePedidoRequestDto: this.cartProducts().map(item => ({
        productoId: item.producto.id!,
        cantidad: item.cantidad
      }))
    };



    this.pedidoService.createPedido(pedido).subscribe({
      next: () => {

        this.cartService.clearCart();
        this.router.navigate(['/pedido-confirmacion-page'],
          { queryParams: { estado: 'exito' } });
      },

      error: (error) => {
        console.error('Error al crear pedido:', error);

        this.cartService.clearCart();
        this.router.navigate(['/pedido-confirmacion-page'],
          { queryParams: { estado: 'error' } });
      }
    });
  }
}
