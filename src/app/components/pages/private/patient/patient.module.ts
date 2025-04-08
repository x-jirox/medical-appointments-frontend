// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientRoutingModule } from './patient-routing.module';
import { AppoinmentsComponent } from './appoinments/appoinments.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent,
        AppoinmentsComponent,
        MedicalHistoryComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        PatientRoutingModule // Aquí importamos el módulo de rutas
    ]
})
export class PatientModule { }
