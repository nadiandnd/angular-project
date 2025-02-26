import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./pages/product/product.component').then(
        (m) => m.ProductComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: '**',
    component: ProductComponent,
  },
];
