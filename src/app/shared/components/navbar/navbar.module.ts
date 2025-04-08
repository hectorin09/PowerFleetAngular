import { NgModule } from '@angular/core';
import { CommonModule,  } from '@angular/common';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// Función para cargar archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule, // Importa ng-bootstrap aquí
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
    NavbarComponent // Exporta NavbarComponent para usarlo en otros módulos
  ]
})
export class NavbarModule { }