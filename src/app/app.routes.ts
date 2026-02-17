import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
  {
    path : '',
    loadComponent : ()=> import('./feature/home/home-component/home-component')
      .then((c)=> c.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/login/login-component/login-component')
      .then((c)=>c.LoginComponent),
    canActivate : [guestGuard]
  },
  {
    path: 'register',
    loadComponent : () => import('./feature/register/register-component/register-component')
      .then((c)=>c.RegisterComponent)
  },
  {
    path : 'favorite',
    loadComponent : ()=>import('./feature/favorite/favorite-component/favorite-component')
      .then((c)=>c.FavoriteComponent)
  }
];
