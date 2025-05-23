import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/authentication/auth.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  isSidebarOpen = true;
  role: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateAuthState();
    this.listenToRouterEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Escucha eventos de navegación para mantener actualizado el estado de sesión.
   */
  private listenToRouterEvents(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateAuthState();
        }
      });
  }

  /**
   * Actualiza el estado de autenticación y rol del usuario.
   */
  private updateAuthState(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getRole();

    if (!this.role) {
      console.warn('[PrivateLayout] Rol no encontrado. El usuario podría no estar autenticado.');
    }
  }

  /**
   * Permite que el sidebar hijo controle su estado.
   */
  toggleSidebar(isOpen: boolean): void {
    this.isSidebarOpen = isOpen;
  }
}
