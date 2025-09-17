import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { TodosComponent } from './pages/todos/todos.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'button-demo',
    loadComponent: () => import('./shared/components/ui/buttons/button-demo.component').then(m => m.ButtonDemoComponent)
  },
  {
    path: 'card-demo',
    loadComponent: () => import('./shared/components/ui/cards/card-demo.component').then(m => m.CardDemoComponent)
  },
  {
    path: 'form-demo',
    loadComponent: () => import('./shared/components/ui/forms/form-demo.component').then(m => m.FormDemoComponent)
  },
  {
    path: 'chart-demo',
    loadComponent: () => import('./shared/components/ui/charts/chart-demo.component').then(m => m.ChartDemoComponent)
  },
  {
    path: 'table-demo',
    loadComponent: () => import('./pages/table-demo/table-demo-page.component').then(m => m.TableDemoPageComponent)
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
