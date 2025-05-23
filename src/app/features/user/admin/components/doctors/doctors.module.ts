// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { ListDoctorsComponent } from './components/list-doctors/list-doctors.component';
import { CreateDoctorsComponent } from './components/create-doctors/create-doctors.component';


@NgModule({
    declarations: [
        ListDoctorsComponent,
        CreateDoctorsComponent

    ],
    imports: [
        CommonModule,
        DoctorsRoutingModule// Aquí importamos el módulo de rutas
    ]
})
export class DoctorsModule { }
