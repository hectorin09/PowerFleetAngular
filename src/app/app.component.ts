import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = 'femsa-safety';

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  constructor(private router: Router) {}

  getPageClass(): string {
    const route = this.router.url;
  
    if (route === '/login') {
      return 'login-background';
    } else if (route === '/voperador') {
      return 'voperador-background';
    } else {
      return 'default-background'; // Clase por defecto si no es ninguna de esas rutas
    }
  }

  isLoginPage(): boolean {
    const hiddenRoutes = ['/login', '/voperador'];     
    return hiddenRoutes.includes(this.router.url);

  }

  
  
}
