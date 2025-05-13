import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/shared/models/sign-up.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      names: [''],
      phone: [''],
      email: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    const { names, phone, email, password, confirmPassword } = this.registerForm.value;

    const missingFields: string[] = [];
    if (!names) missingFields.push('el nombre');
    if (!phone) missingFields.push('el teléfono');
    if (!email) missingFields.push('el correo');
    if (!password) missingFields.push('la contraseña');
    if (!confirmPassword) missingFields.push('la confirmación de la contraseña');

    if (missingFields.length > 0) {
      const detail = missingFields.length === 1
        ? `Debes ingresar ${missingFields[0]}`
        : `Debes ingresar ${missingFields.join(', ')}`;

      this.messageService.add({
        severity: 'warn',
        summary: 'Campos obligatorios',
        detail,
      });
      return;
    }

    if (!/^[0-9]{7,10}$/.test(phone)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Teléfono inválido',
        detail: 'El teléfono debe tener entre 7 y 10 dígitos numéricos',
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo inválido',
        detail: 'El formato del correo no es válido',
      });
      return;
    }

    if (password.length < 6) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Contraseña inválida',
        detail: 'La contraseña debe tener al menos 6 caracteres',
      });
      return;
    }

    if (password !== confirmPassword) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Error de validación',
        detail: 'Las contraseñas no coinciden',
      });
      return;
    }

    this.authService.register({ names, phone, email, password }).subscribe({
      next: (response: RegisterResponse) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registro exitoso',
          detail: 'Ya puedes iniciar sesión',
        });
        this.router.navigate(['/auth/sign-in']);
        this.registerForm.reset();
        this.submitted = false;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error en el registro',
          detail: err?.error?.message || 'Este usuario ya esta registrado.',
        });
      }
    });
  }

  // Métodos auxiliares para el template
  isEmpty(field: string): boolean {
    return this.submitted && !this.registerForm.get(field)?.value;
  }

  isInvalidPattern(field: string): boolean {
    const value = this.registerForm.get(field)?.value;
    if (!value) return false;

    switch (field) {
      case 'phone':
        return !/^[0-9]{7,10}$/.test(value);
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case 'password':
        return value.length < 6;
      case 'confirmPassword':
        return value !== this.registerForm.get('password')?.value;
      default:
        return false;
    }
  }
}
