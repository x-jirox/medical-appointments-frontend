import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageServiceComponent } from './pages/page-service/page-service.component';
import { PatientDashboardComponent } from './users/patient/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './users/doctor/doctor-dashboard/doctor-dashboard.component';
import { FooterComponent } from './layout/footer/footer.component';
import { AcoutnComponent } from './auth/acoutn/acoutn.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    AboutUsComponent,
    ContactComponent,
    PageServiceComponent,
    PatientDashboardComponent,
    DoctorDashboardComponent,
    FooterComponent,
    AcoutnComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
