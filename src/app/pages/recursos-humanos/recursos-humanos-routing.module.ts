import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecursosHumanosComponent } from './recursos-humanos.component';

const routes: Routes = [
  { path: '', component: RecursosHumanosComponent }  // Asegúrate de que esta ruta esté correcta
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecursosHumanosRoutingModule { }
