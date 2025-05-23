import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDoctorsComponent } from './components/list-doctors/list-doctors.component';
import { CreateDoctorsComponent } from './components/create-doctors/create-doctors.component';



const routes: Routes = [
    {path: 'list-doctors', component: ListDoctorsComponent},
    {path: 'create-doctors', component: CreateDoctorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule {}
