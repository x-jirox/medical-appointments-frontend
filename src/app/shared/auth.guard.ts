// src/app/shared/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/auth/sign-in']);
      return false;
    }

    const userRole = this.authService.getRole();
    if (expectedRole && userRole !== expectedRole) {
      return false;
    }

    return true;
  }
}
