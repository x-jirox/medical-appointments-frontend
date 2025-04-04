import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { HomeComponent } from './home/home.component';
import { PageServiceComponent } from './page-service/page-service.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';

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
export class PublicRoutingModule { }
