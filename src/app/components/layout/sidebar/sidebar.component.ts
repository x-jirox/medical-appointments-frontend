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
  private listeners: (() => void)[] = [];
  private isCollapsed = false;
  userRole: string | null = null;
  menuItems: any[] = [];

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.userRole = this.authService.getRole()?.toLowerCase() ?? null;
    this.setMenuItems();
  }

  setMenuItems(): void {
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
            { label: 'All Doctors', route: '/admin/doctors/list-doctors' },
            { label: 'Add Doctor', route: '/admin/doctors/create-doctors' }
          ]
        }
      ];
      break;
      default:
        this.menuItems = [];
        break;
    }
  }

  ngAfterViewInit(): void {
    const dropdownToggles = this.elRef.nativeElement.querySelectorAll('.dropdown-toggle');
    const sidebarToggles = this.elRef.nativeElement.querySelectorAll('.sidebar-toggler, .sidebar-menu-button');

    const toggleDropdown = (dropdown: HTMLElement, menu: HTMLElement, isOpen: boolean) => {
      dropdown.classList.toggle('open', isOpen);
      this.renderer.setStyle(menu, 'height', isOpen ? `${menu.scrollHeight}px` : '0');
    };

    const closeAllDropdowns = () => {
      const openDropdowns = this.elRef.nativeElement.querySelectorAll('.dropdown-container.open');
      openDropdowns.forEach((openDropdown: HTMLElement) => {
        const menu = openDropdown.querySelector('.dropdown-menu') as HTMLElement;
        toggleDropdown(openDropdown, menu, false);
      });
    };

    dropdownToggles.forEach((toggle: HTMLElement) => {
      const listener = this.renderer.listen(toggle, 'click', (e: Event) => {
        e.preventDefault();
        const dropdown = toggle.closest('.dropdown-container') as HTMLElement;
        const menu = dropdown.querySelector('.dropdown-menu') as HTMLElement;
        const isOpen = dropdown.classList.contains('open');
        closeAllDropdowns();
        toggleDropdown(dropdown, menu, !isOpen);
      });
      this.listeners.push(listener);
    });

    sidebarToggles.forEach((btn: HTMLElement) => {
      const listener = this.renderer.listen(btn, 'click', () => {
        closeAllDropdowns();
        const sidebar = this.elRef.nativeElement.querySelector('.sidebar') as HTMLElement;
        this.isCollapsed = !sidebar.classList.contains('collapsed');
        sidebar.classList.toggle('collapsed');
        this.toggleSidebar.emit(!this.isCollapsed);
      });
      this.listeners.push(listener);
    });

    const sidebar = this.elRef.nativeElement.querySelector('.sidebar') as HTMLElement;
    if (window.innerWidth <= 1024) {
      sidebar.classList.add('collapsed');
      this.toggleSidebar.emit(false);
    } else {
      this.toggleSidebar.emit(true);
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

  onLogout() {
    this.authService.logout();
    this.messageService.add({
      severity: 'success',
      summary: 'Logout successful',
      detail: 'You have successfully logged out.'
    });
  }

  ngOnDestroy(): void {
    this.listeners.forEach(unlisten => unlisten());
  }
}
