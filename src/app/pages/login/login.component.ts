import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  showPassword: boolean = false;
  isRecoveringPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRecoverPassword() {
    this.isRecoveringPassword = !this.isRecoveringPassword;
  }
}
