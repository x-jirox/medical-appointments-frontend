import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module'; // Importar el módulo de rutas
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    RecoverPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule 
  ]
})
export class AuthModule { }
