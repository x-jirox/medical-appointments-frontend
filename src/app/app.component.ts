import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isSidebarOpen = true;
  role: string | null = null;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.role = this.authService.getRole(); // Actualizar el rol

        if (!this.isLoggedIn) {
          this.isSidebarOpen = false;
        }
      }
    });
  }

  toggleSidebar(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }
}
