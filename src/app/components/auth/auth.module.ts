// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module'; // Importar el módulo de rutas
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule // Aquí importamos el módulo de rutas
  ]
})
export class AuthModule { }
