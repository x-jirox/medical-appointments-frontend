// sign-in.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin(): void {
    const { email, password } = this.loginForm.value;

    // Validaciones manuales
    const missingFields = [];
    if (!email) missingFields.push('el correo');
    if (!password) missingFields.push('la contraseña');

    if (missingFields.length) {
      const detail = missingFields.length === 2
        ? 'Debes ingresar el correo y la contraseña'
        : `Debes ingresar ${missingFields[0]}`;

      this.messageService.add({
        severity: 'warn',
        summary: 'Campo obligatorio',
        detail,
      });
      return;
    }


    // Si pasa todas las validaciones, se hace el login
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.setRole(response.role);

        this.messageService.add({
          severity: 'success',
          summary: 'Login successful',
          detail: 'Welcome back!',
        });

        const dashboardRoute = `/${response.role.toLowerCase()}/dashboard`;
        this.router.navigate([dashboardRoute]);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Login failed',
          detail: 'Invalid email or password',
        });
      }
    });
  }
}