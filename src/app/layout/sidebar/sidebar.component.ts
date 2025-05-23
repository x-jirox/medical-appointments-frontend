import {
  Component,
  AfterViewInit,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2
} from '@angular/core';
import { AuthService } from 'src/app/shared/authentication/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit, OnDestroy {
  @Output() toggleSidebar = new EventEmitter<boolean>();

  userRole: string | null = null;
  menuItems: any[] = [];
  private isCollapsed = false;
  private listeners: (() => void)[] = [];

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.userRole = this.authService.getRole()?.toLowerCase() ?? null;
    this.setMenuItems();
  }

  /**
   * Define el menú basado en el rol del usuario.
   */
  private setMenuItems(): void {
    switch (this.userRole) {
      case 'patient':
        this.menuItems = [
          { label: 'Dashboard', route: '/patient/dashboard', icon: 'dashboard' },
          { label: 'Medical History', route: '/patient/medical-history', icon: 'history' },
          { label: 'Appointments', route: '/patient/appointments', icon: 'schedule' }
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
          {
            label: 'Doctors',
            icon: 'supervised_user_circle',
            children: [
              { label: 'All Doctors', route: '/admin/doctors/list-doctors', icon: 'group' },
              { label: 'Add Doctor', route: '/admin/doctors/create-doctors', icon: 'person_add' }
            ]

          }
        ];
        break;
      default:
        this.menuItems = [];
        break;
    }
  }

  /**
   * Devuelve el link de perfil dependiendo del rol.
   */
  getProfileLink(): string {
    switch (this.userRole) {
      case 'patient': return '/patient/profile';
      case 'doctor': return '/doctor/profile';
      case 'admin': return '/admin/profile';
      default: return '/';
    }
  }

  /**
   * Ejecuta la lógica del logout.
   */
  onLogout(): void {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Logout successful',
      detail: 'You have successfully logged out.'
    });
  }

  /**
   * Inicializa los listeners y comportamientos del sidebar.
   */
  ngAfterViewInit(): void {
    const sidebar = this.elRef.nativeElement.querySelector('.sidebar') as HTMLElement;
    const dropdownToggles = this.elRef.nativeElement.querySelectorAll('.dropdown-toggle');
    const sidebarToggles = this.elRef.nativeElement.querySelectorAll('.sidebar-toggler, .sidebar-menu-button');

    // Dropdown toggles
    dropdownToggles.forEach((toggle: HTMLElement) => {
      const listener = this.renderer.listen(toggle, 'click', (e: Event) => {
        e.preventDefault();
        const dropdown = toggle.closest('.dropdown-container') as HTMLElement;
        const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
        const isOpen = dropdown.classList.contains('open');

        this.closeAllDropdowns();
        this.toggleDropdown(dropdown, menu, !isOpen);
      });
      this.listeners.push(listener);
    });

    // Sidebar collapse toggle
    sidebarToggles.forEach((btn: HTMLElement) => {
      const listener = this.renderer.listen(btn, 'click', () => {
        this.closeAllDropdowns();
        this.isCollapsed = !sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed');
        this.toggleSidebar.emit(!this.isCollapsed);
      });
      this.listeners.push(listener);
    });

    // Responsivo
    if (window.innerWidth <= 1024) {
      sidebar.classList.add('collapsed');
      this.toggleSidebar.emit(false);
    } else {
      this.toggleSidebar.emit(true);
    }
  }

  /**
   * Cierra todos los dropdowns abiertos.
   */
  private closeAllDropdowns(): void {
    const openDropdowns = this.elRef.nativeElement.querySelectorAll('.dropdown-container.open');
    openDropdowns.forEach((dropdown: HTMLElement) => {
      const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
      this.toggleDropdown(dropdown, menu, false);
    });
  }

  /**
   * Abre o cierra un dropdown específico.
   */
  private toggleDropdown(dropdown: HTMLElement, menu: HTMLElement, open: boolean): void {
    dropdown.classList.toggle('open', open);
    this.renderer.setStyle(menu, 'height', open ? `${menu.scrollHeight}px` : '0');
  }

  /**
   * Limpia todos los listeners al destruir el componente.
   */
  ngOnDestroy(): void {
    this.listeners.forEach(unlisten => unlisten());
  }
}
