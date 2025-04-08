import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecursosHumanosRoutingModule } from './recursos-humanos-routing.module';
import { RecursosHumanosComponent } from './recursos-humanos.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule,  } from '@ng-bootstrap/ng-bootstrap';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  { path: '', component: RecursosHumanosComponent } // Importante que esté vacío
];

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Función para cargar archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    // RecursosHumanosComponent
  ],
  imports: [
    CommonModule,
    RecursosHumanosRoutingModule,
    NgbModule,
    NgbDropdownModule,
    NgbTooltipModule,
    TranslateModule.forChild(),
  ]
})
export class RecursosHumanosModule { }
