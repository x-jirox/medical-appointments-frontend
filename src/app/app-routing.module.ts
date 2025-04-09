import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/public/not-found/not-found.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [

  { path: '', loadChildren: () => import('./components/pages/public/public.module').then(m => m.PublicModule) }, // Rutas públicas
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) }, // Rutas de autenticación

  {
    path: 'patient',
    loadChildren: () => import('./components/pages/private/patient/patient.module').then(m => m.PatientModule),
    canActivate: [AuthGuard],
    data: { role: 'patient' }
  },

  {
    path: 'doctor',
    loadChildren: () => import('./components/pages/private/doctor/doctor.module').then(m => m.PatientModule),
    canActivate: [AuthGuard],
    data: { role: 'doctor' }
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


  /*
  nueva estrcutra de rutas por revisar
  sera buena practica
  se manejara mediante los layouts
  */
export class AppRoutingModule { }
