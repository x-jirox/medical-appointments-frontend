import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})export class AppComponent implements OnInit {
  isLoggedIn = false;
  isSidebarOpen = true;
  role: string | null = null;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscribeToRouterEvents();
  }

  private subscribeToRouterEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAuthState();
      }
    });
  }

  private updateAuthState() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getRole();

    if (!this.isLoggedIn) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}


/*Son buenas practicas?
revisar el uso de los modulos lazy loading, para que no se carguen todos los modulos al inicio, sino solo los necesarios.
revisar el uso de los guards, para que no se pueda acceder a las rutas sin estar logueado y con el rol correcto.
revisar el uso de los servicios, para que no se repitan las funciones y se mantenga el codigo limpio y ordenado.
revisar code de los componentes, para que no se repitan las funciones y se mantenga el codigo limpio y ordenado.
revisar codigo de app component.ts , esta el on init y el constructor, pero no se si es necesario tener ambos, o si solo con el on init es suficiente.
estructura de carpetas, para que sea facil de entender y mantener el codigo.
revisar ap.component.html, es buena practica tenerlo echo de esa manera?
mejorar rendimiento multimedia, png a webp para mejorar el rendimiento de la aplicacion.
organizar carpeta assets para que sea facil de entender y mantener el codigo.
nueva estructura de layouts
dividir layouts publicos y privados
*/
