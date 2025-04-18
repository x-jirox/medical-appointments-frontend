import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Router } from '@angular/router';
import { RegisterResponse } from 'src/app/shared/models/sign-up.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm!: FormGroup;  // Formulario de registro
  errorMessage: string | null = null;  // Mensaje de error global

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();  // Inicializa el formulario cuando el componente se carga
  }

  // Método para crear y validar el formulario
  private initForm(): void {
    this.registerForm = this.fb.group({
      names: ['', Validators.required],  // Nombre
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{7,15}$')]],  // Teléfono
      email: ['', [Validators.required, Validators.email]],  // Correo electrónico
      password: ['', [Validators.required, Validators.minLength(6)]],  // Contraseña
      confirmPassword: ['', Validators.required]  // Confirmación de la contraseña
    }, { validator: this.passwordMatchValidator });  // Validador personalizado para contraseñas coincidentes
  }

  // Validador personalizado para asegurarse que las contraseñas coincidan
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };  // Retorna un error si las contraseñas no coinciden
  }

  // Método para verificar si un campo es inválido y tocado
  getFieldError(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    } else if (control?.hasError('email')) {
      return 'Invalid email format';
    } else if (control?.hasError('pattern')) {
      return `Invalid ${controlName} format`;
    } else if (control?.hasError('minlength')) {
      return `${controlName} must be at least 6 characters long`;
    } else if (control?.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return null;
  }

  // Método que se ejecuta cuando se envía el formulario
  onSubmit(): void {
    if (this.registerForm.invalid) return;  // No hacemos nada si el formulario no es válido

    const { names, phone, email, password } = this.registerForm.value;

    // Llamada al servicio de autenticación para registrar al usuario
    this.authService.register({ names, phone, email, password }).subscribe({
      next: (response: RegisterResponse) => {
        console.log('Registration Successful', response);  // Si es exitoso
        this.router.navigate(['/auth/sign-in']);  // Redirigir a la página de inicio de sesión
        this.registerForm.reset();  // Resetear el formulario
      },
      error: (err) => {
        console.error('Registration Error:', err);  // Log de error
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;  // Mostrar un mensaje de error detallado si está disponible
        } else {
          this.errorMessage = 'Registration failed. Try again.';  // Mensaje genérico
        }
      }
    });
  }

  // Método para verificar si el formulario está completamente válido
  isFormValid(): boolean {
    return this.registerForm.valid;
  }
}
