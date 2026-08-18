import { Injectable, signal, computed } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { CartItem } from '../interfaces/cartItem.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly STORAGE_KEY = 'shopping-cart';

  //Productos guardados en el carrito
  private cartProducts = signal<CartItem[]>(this.loadCart());

  //Cantidad total de unidades
  readonly cartCount = computed(() =>
    this.cartProducts().reduce(
      (total, item) => total + item.cantidad, 0)
  );

  addToCart(producto: Producto): void {

    this.cartProducts.update(items => {

      const itemExistente = items.find(
        item => item.producto.id === producto.id
      );

      if (itemExistente) {
        return items.map(item =>
          item.producto.id === producto.id
            ? {
              ...item,
              cantidad: item.cantidad + 1
            }
            : item
        );
      }

      return [
        ...items,
        {
          producto,
          cantidad: 1
        }
      ];
    });

    this.saveCart();
  }

  // Aumentar cantidad
  increaseQuantity(productoId: number): void {
    this.cartProducts.update(items =>
      items.map(item =>
        item.producto.id === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
    this.saveCart();
  }

  // Disminuir cantidad
  decreaseQuantity(productoId: number): void {
    this.cartProducts.update(items =>
      items
        .map(item =>
          item.producto.id === productoId
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter(item => item.cantidad > 0)
    );
    this.saveCart();
  }

  // Eliminar completamente un producto
  removeFromCart(productoId: number): void {

    this.cartProducts.update(items =>
      items.filter(item => item.producto.id !== productoId)
    );
    this.saveCart();
  }

  // Obtener productos del carrito
  getCartProducts() {
    return this.cartProducts.asReadonly();
  }

  // Subtotal general
  subtotal = computed(
    () => this.cartProducts().reduce(
      (total, item) => total + (
        item.producto.precio * item.cantidad), 0)
  );

  // Por ahora el total es igual al subtotal
  total = computed(() => this.subtotal());

  private saveCart(): void {

    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify(this.cartProducts())
    );
  }

  private loadCart(): CartItem[] {

    const storedCart = localStorage.getItem(this.STORAGE_KEY);

    if (!storedCart) {
      return [];
    }

    try {
      return JSON.parse(storedCart) as CartItem[];
    } catch (error) {
      console.error(
        'Error al cargar el carrito desde localStorage',
        error
      );

      return [];
    }
  }
  clearCart(): void {
    this.cartProducts.set([]);
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
