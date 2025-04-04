import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PageServiceComponent } from './pages/page-service/page-service.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RecoverPasswordComponent } from './auth/recover-password/recover-password.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientComponent } from './pages/dashboard/patient/patient.component';
import { AppointmentComponent } from './pages/dashboard/patient/appointment/appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    AboutUsComponent,
    ContactComponent,
    PageServiceComponent,
    FooterComponent,
    SignUpComponent,
    SignInComponent,
    RecoverPasswordComponent,
    SidebarComponent,
    DashboardComponent,
    PatientComponent,
    AppointmentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
