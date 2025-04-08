import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { NgbModule,NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'; // Si usas componentes de ng-boo


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,  // CommonModule es necesario para poder usar directivas comunes de Angular como ngIf, ngFor, etc.
    NgbModule, 
    NgbTooltipModule
  ],
  exports: [
    SidebarComponent  // Exponemos el SidebarComponent para que pueda ser usado en otros módulos
  ]
})
export class SidebarModule { }
