import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppoinmentsComponent } from './appoinments/appoinments.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MedicalHistoryComponent } from './medical-history/medical-history.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'appoiments', component: AppoinmentsComponent },
    {path: 'medical-history', component: MedicalHistoryComponent },
    {path: 'profile', component: ProfileComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class PatientRoutingModule {}
