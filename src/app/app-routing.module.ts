import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/authentication/auth.guard';
import { GuestLayoutComponent } from './layout/guest-layout/guest-layout.component';
import { UserLayoutComponent } from './layout/user-layout/user-layout.component';
import { NotFoundComponent } from './features/guest/components/not-found/not-found.component';

const routes: Routes = [
  // === RUTAS PÚBLICAS ===
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/guest/guest.module').then(m => m.GuestModule)
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./features/auth/auth.module').then(m => m.AuthModule)
      }
    ]
  },

  // === RUTAS PRIVADAS (PROTEGIDAS POR ROL) ===
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: 'patient',
        loadChildren: () =>
          import('./features/user/patient/patient.module').then(m => m.PatientModule),
        canActivate: [AuthGuard],
        data: { role: 'PATIENT' }
      },
      {
        path: 'doctor',
        loadChildren: () =>
          import('./features/user/doctor/doctor.module').then(m => m.DoctorModule),
        canActivate: [AuthGuard],
        data: { role: 'DOCTOR' }
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./features/user/admin/admin.module').then(m => m.AdminModule),
        canActivate: [AuthGuard],
        data: { role: 'ADMIN' }
      }
    ]
  },

  // === MANEJO DE ERRORES ===
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules // Mejora el rendimiento precargando módulos
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
