import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctoresComponent } from './doctores/doctores.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'doctores', component: DoctoresComponent },
    {path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
