import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../interfaces/pedido.interface';

@Component({
  selector: 'checkout-component',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
  imports: [DecimalPipe, FormsModule],
})
export class CheckoutComponent {

  private cartService = inject(CartService);
  private pedidoService = inject(PedidoService);
  private router = inject(Router);

  readonly cartProducts = this.cartService.getCartProducts();
  readonly cartCount = this.cartService.cartCount;

  readonly subtotal = this.cartService.subtotal;
  readonly total = this.cartService.total;

  // Datos del cliente
  clienteNombre = '';
  celular = '';
  direccion = '';

  increase(productoId: number): void {
    this.cartService.increaseQuantity(productoId);
  }

  decrease(productoId: number): void {
    this.cartService.decreaseQuantity(productoId);
  }

  remove(productoId: number): void {
    this.cartService.removeFromCart(productoId);
  }

  crearPedido(): void {

    const pedido: Pedido = {
      clienteNombre: this.clienteNombre,
      celular: this.celular,
      direccion: this.direccion,

      detallePedidoRequestDto: this.cartProducts().map(item => ({
        productoId: item.producto.id!,
        cantidad: item.cantidad
      }))
    };

    console.log(pedido);

    this.pedidoService.createPedido(pedido).subscribe({
      next: (respuesta) => {
        console.log('Pedido creado:', respuesta);
        this.cartService.clearCart();
        this.router.navigate(['/pedido-confirmacion-page'],
          { queryParams: { estado: 'exito' } });
      },

      error: (error) => {
        console.error('Error al crear pedido:', error);
        console.error('Status:', error.status);
        console.error('Error:', error.error);
        console.error('Mensaje:', error.message);
        this.cartService.clearCart();
        this.router.navigate(['/pedido-confirmacion-page'],
          { queryParams: { estado: 'error' } });
      }
    });
  }
}
