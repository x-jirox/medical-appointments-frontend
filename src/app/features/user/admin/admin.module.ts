// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DoctoresComponent } from './components/doctores/doctores.component';


@NgModule({
    declarations: [
        DashboardComponent,
        DoctoresComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule // Aquí importamos el módulo de rutas
    ]
})
export class AdminModule { }
