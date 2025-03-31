import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageServiceComponent } from './pages/page-service/page-service.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PatientDashboardComponent } from './users/patient/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './users/doctor/doctor-dashboard/doctor-dashboard.component';
import { AcoutnComponent } from './auth/acoutn/acoutn.component';


const routes: Routes = [
  {path: '', component: HomeComponent},  // Página de inicio

  {path: 'page-service', component: PageServiceComponent}, // Servicio que ofrece la pagina
  {path: 'about-us', component: AboutUsComponent}, // Acerca de nosotros
  {path: 'contact', component: ContactComponent}, // Contacto
  {path: 'dashboard-patient', component: PatientDashboardComponent}, // Pagina de inicio paciente
  {path: 'dashboard-doctor', component: DoctorDashboardComponent}, // Pagina de inicio doctor
  {path: 'acount', component: AcoutnComponent}, // Pagina de inicio doctor

  //Manejo de errores
  {path: '404', component: NotFoundComponent}, // Página 404
  {path: '**', redirectTo: '/404'} // Redirige a la página 404 si no encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
