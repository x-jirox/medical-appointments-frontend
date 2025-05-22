// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListDoctorsComponent } from './list-doctors/list-doctors.component';
import { CreateDoctorsComponent } from './create-doctors/create-doctors.component';
import { DoctorsRoutingModule } from './doctors-routing.module';


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
