import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path: '', component: HomeComponent},  // Página de inicio
  {path: 'login', component: LoginComponent}, // Pagina de Login
  {path: 'register', component: RegisterComponent}, // Pagina de Registro
  {path: '404', component: NotFoundComponent}, // Página 404
  {path: '**', redirectTo: '/404'} // Redirige a la página 404 si no encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
