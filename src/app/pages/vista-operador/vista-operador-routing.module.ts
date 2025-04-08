import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VistaOperadorComponent } from './vista-operador.component';
const routes: Routes = [
  { path: '', component: VistaOperadorComponent }  // Asegúrate de que esta ruta esté correcta
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistaOperadorRoutingModule { }
