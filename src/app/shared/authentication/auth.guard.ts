import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from './auth.constants';

/**
 * Guard de rutas que protege el acceso según la autenticación
 * y el rol requerido en cada ruta.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Verifica si el usuario puede acceder a una ruta.
   * Redirige a login si no está autenticado,
   * o al dashboard correspondiente si no tiene el rol adecuado.
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }

    const userRole = this.authService.getRole();
    const requiredRole = next.data['role'] as UserRole;

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate([`/${userRole}/dashboard`]);
      return false;
    }

    return true;
  }
}
