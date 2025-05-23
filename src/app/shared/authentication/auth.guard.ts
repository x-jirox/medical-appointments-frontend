import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';
import { UserRole } from './auth.constants';

/**
 * Guard que protege rutas basándose en autenticación
 * y rol del usuario.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Verifica si el usuario puede acceder a la ruta.
   * Redirige a login si no está autenticado.
   * Redirige a su dashboard si tiene un rol distinto al requerido.
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const isLogged = this.authService.isLoggedIn();
    const userRole = this.authService.getRole();
    const requiredRole = next.data['role'] as UserRole;

    if (!isLogged) {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate([`/${userRole}/dashboard`]);
      return false;
    }

    return true;
  }
}
