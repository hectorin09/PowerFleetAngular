import { Component } from '@angular/core';
import { NgbdTableCompleteRH } from './table-completeRH';
import { CommonModule } from '@angular/common';

import { DarkModeService } from '../../services/dark-mode.service';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component'; // Importar SidebarComponent

import { Router } from '@angular/router';
import {TranslateModule, TranslateLoader, TranslateService, TranslatePipe} from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
@Component({
  selector: 'app-recursos-humanos',
  standalone: true, 
  templateUrl: './recursos-humanos.component.html',
  styleUrl: './recursos-humanos.component.scss',
  imports: [CommonModule,NgbdTableCompleteRH, TranslateModule, SidebarComponent],
})
export class RecursosHumanosComponent {
  
  navigateToHome() {
    this.router.navigate(['/home']);
  }

  onSidebarToggled(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }    

  isDarkMode: boolean = false;

  constructor(private translate: TranslateService, private router: Router,private darkModeService: DarkModeService) {
    this.darkModeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
    this.translate.use('en');

  }
  isSidebarCollapsed: boolean = false;

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

 
}
