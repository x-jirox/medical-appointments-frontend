import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { MessageService } from 'primeng/api'; // Importa el servicio para mostrar toasts

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<boolean>(); // Evento para alternar la visibilidad de la barra lateral
  private isCollapsed = false; // Estado de la barra lateral (colapsada o expandida)
  userRole: string | null = null; // Variable para almacenar el rol del usuario
  menuItems: any[] = []; // Arreglo para almacenar los elementos del menú

  constructor(private authService: AuthService,private messageService: MessageService /* Inyecta MessageService*/) {
    this.userRole = this.authService.getRole()?.toLowerCase() ?? null;
    this.setMenuItems();  // Establecer los elementos del menú según el rol
  }

  // Método para configurar los elementos del menú según el rol del usuario
  setMenuItems(): void {
    switch (this.userRole) {
      case 'patient':
        this.menuItems = [
          { label: 'Dashboard', route: '/patient/dashboard', icon: 'dashboard' },
          { label: 'Medical History', route: '/patient/medical-history', icon: 'history' },
          { label: 'Appointments', route: '/patient/appointments', icon: 'schedule' },
        ];
        break;
      case 'doctor':
        this.menuItems = [
          { label: 'Dashboard', route: '/doctor/dashboard', icon: 'dashboard' },
          { label: 'Patients', route: '/doctor/patients', icon: 'group' },
          { label: 'Medical History', route: '/doctor/medical-history', icon: 'history' }
        ];
        break;
      case 'admin':
        this.menuItems = [
          { label: 'Dashboard', route: '/admin/dashboard', icon: 'dashboard' },
          { label: 'Doctors', route: '/admin/doctores', icon: 'supervised_user_circle' }
        ];
        break;
      default:
        this.menuItems = [];
        break;
    }
  }

  // Método para abrir/cerrar el menú desplegable
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
        this.toggleSidebar.emit(!this.isCollapsed);  // Emitir el estado actualizado
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

  // Función para devolver el link de perfil según el rol
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
  onLogout(){
    this.authService.logout(); // Llama al método de logout de AuthService
    this.messageService.add({
      severity: 'success',
      summary: 'Logout successful',
      detail: 'You have successfully logged out.',
    });
  }
}
