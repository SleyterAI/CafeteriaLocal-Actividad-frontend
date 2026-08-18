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

export const routes: Routes = [
  {
    path:'',
    component: LandingPageComponent,
  },
  {
    path:'productos/:id',
    component: ProductDetailPageComponent,
  },
  {
    path:'carrito',
    component: CheckoutPageComponent,
  },
  {
    path:'pedido-confirmacion-page',
    component: PedidoConfirmacionPageComponent,
  },
  {
    path:'admin-page',
    component: AdminPageComponent,
    children: [
      {
        path: 'products-admin-page',
        component: ProductsAdminPageComponent
      },
      {
        path: 'pedidos-admin-page',
        component: PedidosAdminPageComponent
      }
    ]
  },
];
