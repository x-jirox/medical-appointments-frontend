// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { DoctoresComponent } from './doctores/doctores.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ProfileComponent } from './profile/profile.component';

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
