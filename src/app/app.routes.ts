import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path : '',
    loadComponent : ()=> import('./feature/home/home-component/home-component')
      .then((c)=> c.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/login/login-component/login-component')
      .then((c)=>c.LoginComponent)
  },
  {
    path: 'register',
    loadComponent : () => import('./feature/register/register-component/register-component')
      .then((c)=>c.RegisterComponent)
  }
];
