import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';  // Importamos las rutas públicas
import { HomeComponent } from './components/home/home.component';
import { PageServiceComponent } from './components/page-service/page-service.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    HomeComponent,
    PageServiceComponent,
    NotFoundComponent,
    ContactComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule  // Importamos el módulo de rutas públicas
  ]
})
export class GuestModule { }
