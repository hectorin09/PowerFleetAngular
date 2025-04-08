import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'RH', loadChildren: () => import('./pages/recursos-humanos/recursos-humanos.module').then(m => m.RecursosHumanosModule) }, 
  { path: 'voperador', loadChildren: () => import('./pages/vista-operador/vista-operador.module').then(m => m.VistaOperadorModule) }, 
  { path: '**', redirectTo: 'login' }  // Esto debe estar al final
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }