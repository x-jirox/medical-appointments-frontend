import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service'; // Asegúrate de importar el AuthService

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<boolean>();
  private isCollapsed = false;
  userRole: string | null = null; // Variable para almacenar el rol del usuario

  constructor(private authService: AuthService) {
    // Obtener el rol del usuario desde el AuthService
    this.userRole = this.authService.getRole();
  }

  ngAfterViewInit() {
    const toggleDropdown = (dropdown: HTMLElement, menu: HTMLElement, isOpen: boolean) => {
      dropdown.classList.toggle("open", isOpen);
      menu.style.height = isOpen ? `${menu.scrollHeight}px` : '0';
    };

    const closeAllDropdowns = () => {
      document.querySelectorAll<HTMLElement>(".dropdown-container.open").forEach((openDropdown) => {
        toggleDropdown(openDropdown, openDropdown.querySelector<HTMLElement>(".dropdown-menu")!, false);
      });
    };

    // Toggle sidebar
    document.querySelectorAll<HTMLElement>(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
      button.addEventListener("click", () => {
        closeAllDropdowns();
        const sidebar = document.querySelector<HTMLElement>(".sidebar")!;
        this.isCollapsed = !sidebar.classList.contains("collapsed");
        sidebar.classList.toggle("collapsed");

        this.toggleSidebar.emit(!this.isCollapsed); // Emitir estado actualizado
      });
    });

    // Collapse sidebar por defecto en pantallas pequeñas
    if (window.innerWidth <= 1024) {
      document.querySelector<HTMLElement>(".sidebar")!.classList.add("collapsed");
      this.toggleSidebar.emit(false);
    } else {
      this.toggleSidebar.emit(true);
    }
  }

  // Función para devolver el link correcto según el rol
  getDashboardLink(): string {
    switch (this.userRole) {
      case 'patient':
        return '/patient/dashboard';
      case 'doctor':
        return '/doctor/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  }

  getProfileLink(): string {
    switch (this.userRole) {
      case 'patient':
        return '/patient/profile';
      case 'doctor':
        return '/doctor/profile';
      case 'admin':
        return '/admin/profile';
      default:
        return '/';
    }
  }

  // Función de logout
  onLogout(): void {
    this.authService.logout(); // Llama al método de logout de AuthService
  }
}
