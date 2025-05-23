import { SignUpInterface } from './../../models/sign-up.interface';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/shared/authentication/auth.service';

/**
 * Componente para el registro de nuevos usuarios.
 * Implementa un formulario template-driven con validaciones en el HTML
 * y lógica mínima en el TypeScript para manejar el registro.
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  /**
   * Modelo para enlazar con el formulario de registro.
   * Incluye todos los campos necesarios para crear una cuenta.
   */
  register: SignUpInterface = {
    names: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) { }

  /**
   * Maneja el evento de envío del formulario de registro.
   * Valida que el formulario sea válido y que las contraseñas coincidan.
   * Llama al servicio de autenticación para registrar el usuario.
   * @param form Referencia al formulario template-driven.
   */
  onSubmit(form: NgForm): void {
    if (form.invalid) return; // Evita enviar si el formulario es inválido

    if (this.register.password !== this.register.confirmPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error de validación',
        detail: 'Las contraseñas no coinciden.'
      });
      return;
    }

    // Invoca servicio para registrar usuario
    this.authService.register(this.register).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Ya puedes iniciar sesión.'
        });
        this.router.navigate(['/auth/sign-in']);
        form.resetForm();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: err?.error?.message || 'Este usuario ya está registrado.'
        });
      }
    });
  }
}
