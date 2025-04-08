import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    const success = this.authService.login(this.email, this.password);
    if (!success) {
      this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
    }
  }
}
