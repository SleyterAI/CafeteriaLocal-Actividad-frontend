import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'hamburger-menu-component',
  templateUrl: './hamburger-menu.component.html',
  styleUrl: './hamburger-menu.component.css',
  imports: [RouterLink]
})
export class HambugerMenuComponent {
  isOpen = signal(false);

  isAdminMenuOpen = signal(false);

  adminOptions = [
    {
      name: 'Gestion de productos',
      route: '/admin-page/products-admin-page'
    },
    {
      name: 'Gestion de pedidos',
      route: '/admin-page/pedidos-admin-page'
    }
  ];

  toggleMenu(): void {
    this.isOpen.update(open => !open);
    if (!this.isOpen()) {
      this.isAdminMenuOpen.set(false);
    }
  }

  closeMenu(): void {
    this.isOpen.set(false);
    this.isAdminMenuOpen.set(false);
  }

  toggleAdminMenu(): void {
    this.isAdminMenuOpen.update(open => !open);
  }

  closeAdminMenu(): void {
    this.isAdminMenuOpen.set(false);
  }
}
