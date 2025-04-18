import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup; // Formulario reactivo
  errorMessage: string = ''; // Mensaje de error en caso de fallo al iniciar sesión

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicialización del formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método llamado al hacer submit en el formulario
  onLogin(): void {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        // Guardamos token y rol
        this.authService.setToken(response.token);
        this.authService.setRole(response.role);

        // Redirigimos al dashboard correspondiente al rol
        const dashboardRoute = `/${response.role.toLowerCase()}/dashboard`;
        this.router.navigate([dashboardRoute]);
      },
      error: () => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

  // Getters para acceder fácilmente a los controles del formulario en la plantilla
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Método para obtener errores legibles por campo
  getFieldError(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    } else if (control?.hasError('email')) {
      return 'Invalid email format';
    } else if (control?.hasError('minlength')) {
      return `${controlName} must be at least ${control.errors?.['minlength']?.requiredLength} characters long`;
    }
    return null;
  }
}
