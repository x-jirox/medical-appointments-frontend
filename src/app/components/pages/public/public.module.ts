import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';  // Importamos las rutas públicas

// Componentes públicos
import { HomeComponent } from './home/home.component';
import { PageServiceComponent } from './page-service/page-service.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { AboutUsComponent } from './about-us/about-us.component';

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
    PublicRoutingModule  // Importamos el módulo de rutas públicas
  ]
})
export class PublicModule { }
