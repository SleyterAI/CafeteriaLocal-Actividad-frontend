import { Routes } from '@angular/router';
import { LandingPageComponent }
  from './pages/landing-page/landing-page.component';
import { ProductDetailPageComponent }
  from './pages/product-detail-page/product-detail-page.component'

import { CheckoutPageComponent }
  from './pages/checkout-page/checkout-page.component'
import { PedidoConfirmacionPageComponent }
  from './pages/pedido-confirmacion-page/pedido-confirmacion-page.component';

import { AdminPageComponent }
  from './pages/admin-page/admin-page.component';
import { ProductsAdminPageComponent }
  from './pages/products-admin-page/products-admin-page.component';
import { PedidosAdminPageComponent }
  from './pages/pedidos-admin-page/pedidos-admin-page.component';

import {CreateProductoPageComponent}
from './pages/createProducto-page/createProducto-page.component';
import { UpdateFormPageComponent } from './pages/update-form-page.component/update-form-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'productos/:id',
    component: ProductDetailPageComponent,
  },
  {
    path: 'carrito',
    component: CheckoutPageComponent,
  },
  {
    path: 'pedido-confirmacion-page',
    component: PedidoConfirmacionPageComponent,
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    children: [
      {
        path: 'products-admin-page',
        component: ProductsAdminPageComponent,
        /*children: [
          {
            path: 'createProducto-page',
            component: CreateProductoPageComponent
          },
        ]*/
      },
      {
        path: 'pedidos-admin-page',
        component: PedidosAdminPageComponent
      },
      {
        path: 'products-admin-page/createProducto-page',
        component: CreateProductoPageComponent
      },
      {
        path: 'products-admin-page/update-form-page/:id',
        component: UpdateFormPageComponent
      }
    ]
  },
];
