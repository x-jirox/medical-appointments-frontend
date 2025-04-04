import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageServiceComponent } from './pages/page-service/page-service.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { AuthGuard } from './guards/auth.guard';
import { PatientComponent } from './pages/dashboard/patient/patient.component';
import { AppointmentComponent } from './pages/dashboard/patient/appointment/appointment.component';


const routes: Routes = [
  {path: '', component: HomeComponent},  // Página de inicio

  {path: 'page-service', component: PageServiceComponent}, // Servicio que ofrece la pagina
  {path: 'about-us', component: AboutUsComponent}, // Acerca de nosotros
  {path: 'contact', component: ContactComponent}, // Contacto
  {path: 'sign-in', component: SignInComponent}, 
  {path: 'sign-up', component: SignUpComponent}, 
  {path: 'recover-password', component: RecoverPasswordComponent}, 

  // Ruta principal del paciente
  { 
    path: 'patient', 
    component: PatientComponent, 
    canActivate: [AuthGuard], 
    data: { role: 'patient' },
    children: [
      { path: 'appointment', component: AppointmentComponent },
      //{ path: 'history', component: HistoryComponent }
    ]
  },


  //Manejo de errores
  {path: '404', component: NotFoundComponent}, // Página 404
  {path: '**', redirectTo: '/404'} // Redirige a la página 404 si no encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
