import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    const requiredRole = next.data['role'];  // Obtener el rol necesario para acceder a esta ruta

    // Verificar si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      const userRole = this.authService.getRole();
      
      // Verificar si el rol del usuario es el mismo que el de la ruta
      if (userRole === requiredRole) {
        return true; // El usuario tiene acceso
      } else {
        this.router.navigate(['/not-found']); // Si el rol no coincide, redirigir a la página "No encontrado"
        return false;
      }
    } else {
      this.router.navigate(['/sign-in']); // Si no está autenticado, redirigir a la página de inicio de sesión
      return false;
    }
  }
}
