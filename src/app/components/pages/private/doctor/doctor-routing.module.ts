import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PatientsComponent } from './patients/patients.component';


const routes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'patients', component: PatientsComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes,)],
    exports: [RouterModule]
})
export class DoctorRoutingModule { }
