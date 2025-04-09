import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.css']
})
export class PrivateLayoutComponent implements OnInit {
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
