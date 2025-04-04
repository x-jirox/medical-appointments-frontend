import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método que se ejecuta cuando se envía el formulario
  async onSignIn(): Promise<void> {
    try {
      // Llamamos al servicio de autenticación para verificar las credenciales
      const success = await this.authService.signIn(this.email, this.password);

      // Si las credenciales son correctas, redirigimos según el rol
      if (success) {
        const role = this.authService.getRole();
        if (role === 'patient') {
          this.router.navigate(['/patient']);
        }
      } else {
        // Si las credenciales son incorrectas, mostramos un mensaje de error
        this.errorMessage = 'Incorrect email or password. Please try again.';
      }
    } catch (error) {
      // Manejo de errores en caso de que ocurra un problema con la autenticación
      this.errorMessage = 'An error occurred during sign-in. Please try again later.';
    }
  }
}
