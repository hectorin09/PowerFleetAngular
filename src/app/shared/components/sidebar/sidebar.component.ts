import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // 🔹 Importa RouterModule
import {TranslateModule, TranslateLoader, TranslateService, TranslatePipe} from '@ngx-translate/core';
import { DarkModeService } from '../../../services/dark-mode.service';
import { CommonModule } from '@angular/common'; // Importar CommonModule

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
    imports: [CommonModule, TranslateModule, SidebarComponent, RouterModule],
})
export class SidebarComponent {

  @Input() isSidebarCollapsed: boolean = false; // ✅ Ahora acepta valores desde el padre
  @Input() isDarkMode: boolean = false; // ✅ También es configurable desde el padre  
  @Output() isSidebarCollapsedChange = new EventEmitter<boolean>(); // 🔹 Emite cambios al padre

  constructor(private router: Router, private translate: TranslateService, private darkModeService: DarkModeService) {
    this.darkModeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
    this.translate.use('en');   
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.isSidebarCollapsedChange.emit(this.isSidebarCollapsed); // 🔹 Notifica al padre
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

	navigateToHR() {
    this.router.navigate(['/RH']);
  }  

 

 

}

