import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/pages/public/not-found/not-found.component';

const routes: Routes = [

  { path: '', loadChildren: () => import('./components/pages/public/public.module').then(m => m.PublicModule) }, // Rutas públicas
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) }, // Rutas de autenticación
  
  //Manejo de errores
  {path: '404', component: NotFoundComponent}, // Página 404
  {path: '**', redirectTo: '/404'} // Redirige a la página 404 si no encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules // Esto precarga todos los módulos perezosos
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
