import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarCollapsed: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Inicializar si es necesario
  }

  // Manejar el cambio de estado del sidebar
  onSidebarToggle(isCollapsed: boolean) {
    this.sidebarCollapsed = isCollapsed;
  }

  // Cerrar sesión
  signOut() {
    this.authService.signOut();
    this.sidebarCollapsed = false;  // Restablecer el estado del sidebar
  }
}
