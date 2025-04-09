import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/public/not-found/not-found.component';
import { AuthGuard } from './shared/auth.guard';
import { PublicLayoutComponent } from './components/layout/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './components/layout/private-layout/private-layout.component';

const routes: Routes = [

  // Rutas publicas
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/pages/public/public.module').then(m => m.PublicModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./components/auth/auth.module').then(m => m.AuthModule),
      }
    ]
  },

  // Rutas privadas
  {
    path: '',
    component: PrivateLayoutComponent,
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('./components/pages/private/patient/patient.module').then(m => m.PatientModule),
        canActivate: [AuthGuard],
        data: { role: 'patient' }
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./components/pages/private/doctor/doctor.module').then(m => m.DoctorModule),
        canActivate: [AuthGuard],
        data: { role: 'doctor' }
      }
    ]
  },

  //Manejo de errores
  { path: '404', component: NotFoundComponent }, // Página 404
  { path: '**', redirectTo: '/404' } // Redirige a la página 404 si no encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // Esto precarga todos los módulos perezosos
  })
  ],
  exports: [RouterModule]
})


export class AppRoutingModule { }
