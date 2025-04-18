import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css']
})
export class PrivateLayoutComponent implements OnInit, OnDestroy {
  isLoggedIn = false; // Estado de autenticación
  isSidebarOpen = true; // Estado de la barra lateral
  role: string | null = null; // Rol del usuario
  private destroy$ = new Subject<void>(); // Para gestionar la suscripción y evitar fugas de memoria

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateAuthState(); // Verificamos el estado actual de autenticación y rol
    this.subscribeToRouterEvents(); // Suscripción a los eventos de navegación para actualizar estado
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emitir señal de destrucción
    this.destroy$.complete(); // Completar el observable
  }

  // Método para suscribirse a los eventos de navegación
  private subscribeToRouterEvents(): void {
    this.router.events.pipe(
      takeUntil(this.destroy$) // Se cancelará automáticamente la suscripción cuando el componente se destruya
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAuthState(); // Actualizamos el estado de autenticación al navegar
      }
    });
  }

  // Método que actualiza el estado de autenticación y rol
  private updateAuthState(): void {
    this.isLoggedIn = this.authService.isLoggedIn(); // Verifica si el usuario está autenticado
    this.role = this.authService.getRole(); // Obtiene el rol del usuario
    if (!this.role) {
      console.warn('Role not found. User may be unauthenticated.');
    }
  }

  // Método para alternar el estado de la barra lateral
  toggleSidebar(isOpen: boolean): void {
    this.isSidebarOpen = isOpen;
  }
}
