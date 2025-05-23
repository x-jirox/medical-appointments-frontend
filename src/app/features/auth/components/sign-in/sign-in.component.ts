// src/app/components/auth/components/sign-in/sign-in.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { SignInInterface } from '../../models/sign-in.interface';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  // Modelo para binding con ngModel
  credentials: SignInInterface = {
    email: '',
    password: ''
  };

  rememberMe: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  /**
   * Método llamado al enviar el formulario de inicio de sesión.
   * Valida el formulario antes de intentar autenticar.
   */
  onLogin(event: Event, form: NgForm): void {
    event.preventDefault();

    if (form.invalid) {
      // Si el formulario no es válido, no continúa (el navegador muestra las validaciones nativas)
      return;
    }

    const { email, password } = this.credentials;

    this.authService.login({ email, password }).subscribe({
      next: ({ token, role }) => {
        this.authService.setToken(token);
        this.authService.setRole(role);

        this.messageService.add({
          severity: 'success',
          summary: 'Login exitoso',
          detail: '¡Bienvenido de nuevo!',
        });

        this.router.navigate([`/${role.toLowerCase()}/dashboard`]);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de login',
          detail: 'Correo o contraseña incorrectos',
        });
      }
    });
  }
}
