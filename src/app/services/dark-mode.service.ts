import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DarkModeService {
  private darkMode = new BehaviorSubject<boolean>(this.getStoredDarkMode());
  darkMode$ = this.darkMode.asObservable();

  constructor() {}

  // Guardar y obtener la preferencia de modo oscuro
  private getStoredDarkMode(): boolean {
    return JSON.parse(localStorage.getItem('darkMode') || 'false');
  }

  toggleDarkMode() {
    const newMode = !this.darkMode.value;
    this.darkMode.next(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  }
}
