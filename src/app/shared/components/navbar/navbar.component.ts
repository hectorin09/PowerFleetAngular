import { Component, ViewChild  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DarkModeService } from '../../../services/dark-mode.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: false
})
export class NavbarComponent {

  constructor(private router: Router,private translate: TranslateService, private darkModeService: DarkModeService) {
    // Configura el idioma por defecto y los idiomas soportados
    this.translate.setDefaultLang('en');
    this.translate.use('en');

    this.darkModeService.darkMode$.subscribe(mode => this.isDarkMode = mode);
  }

  // Método para cambiar el idioma
  switchLanguage(language: string) {
    this.translate.use(language);
  }
  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
//modo dark
 isDarkMode: boolean = false;

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }


}
