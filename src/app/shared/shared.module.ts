import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './components/navbar/navbar.module';
import { HomeModule } from '../pages/home/home.module';
import { NgbModule, NgbDropdownModule,NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


// Función para cargar archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    NavbarModule,
    HomeModule,
    NgbModule, 
    NgbTooltipModule,
    NgbDropdownModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
  ],
  exports: [
    NavbarModule  // Exporta el NavbarModule para que otros módulos puedan usarlo
  ]
})
export class SharedModule { }
