import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PageServiceComponent } from './components/page-service/page-service.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  // Página de inicio
  { path: 'page-service', component: PageServiceComponent }, // Servicio que ofrece la página
  { path: 'about-us', component: AboutUsComponent }, // Acerca de nosotros
  { path: 'contact', component: ContactComponent }, // Contacto
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
