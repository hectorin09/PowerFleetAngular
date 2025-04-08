import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'; // Importa el módulo de ng-bootstrap dropdown

import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';


import {provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

// import { LoginComponent } from './pages/login/login.component';



import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// Función para cargar archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// import { HomeComponent } from './pages/home/home.component';
@NgModule({ declarations: [
        AppComponent,
        FooterComponent,
          // LoginComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
      NgbTooltipModule,
        BrowserModule,
        RouterModule,
        NgbModule,
        CommonModule,
        NgbDropdownModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        SharedModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
