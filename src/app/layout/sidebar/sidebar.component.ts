import { Component, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  userRole: string = '';
  @Output() sidebarToggle: EventEmitter<boolean> = new EventEmitter<boolean>(); // Emisor de evento

  constructor(private authService: AuthService) {}

  ngAfterViewInit() {
    this.userRole = this.authService.getRole(); 

    const toggleDropdown = (dropdown: HTMLElement, menu: HTMLElement, isOpen: boolean) => {
      dropdown.classList.toggle("open", isOpen);
      menu.style.height = isOpen ? `${menu.scrollHeight}px` : '0';
    };

    const closeAllDropdowns = () => {
      document.querySelectorAll<HTMLElement>(".dropdown-container.open").forEach((openDropdown) => {
        toggleDropdown(openDropdown, openDropdown.querySelector<HTMLElement>(".dropdown-menu")!, false);
      });
    };

    // Listener para el toggle del sidebar
    document.querySelectorAll<HTMLElement>(".sidebar-toggler, .sidebar-menu-button").forEach((button) => {
      button.addEventListener("click", () => {
        closeAllDropdowns();
        const sidebar = document.querySelector<HTMLElement>(".sidebar")!;
        const isCollapsed = sidebar.classList.contains("collapsed");
        sidebar.classList.toggle("collapsed", !isCollapsed); // Cambio de estado

        this.sidebarToggle.emit(!isCollapsed); // Emitimos el cambio inmediatamente
      });
    });

    // Inicializa el sidebar colapsado en pantallas pequeñas
    if (window.innerWidth <= 1024) {
      document.querySelector<HTMLElement>(".sidebar")!.classList.add("collapsed");
      this.sidebarToggle.emit(true); // Emitir el evento que el sidebar está colapsado
    }
  }

  signOut(): void {
    this.authService.signOut();
  }
}
