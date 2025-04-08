// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorRoutingModule } from './doctor-routing.module';
import { PatientsComponent } from './patients/patients.component';

@NgModule({
    declarations: [
        DashboardComponent,
        PatientsComponent

    ],
    imports: [
        CommonModule,
        DoctorRoutingModule // Aquí importamos el módulo de rutas
    ]
})
export class PatientModule { }
