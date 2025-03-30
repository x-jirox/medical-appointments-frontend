import { Component, HostListener } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    // Usamos HostListener para escuchar el evento de scroll
    isScrolled = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
      this.isScrolled = window.scrollY > 50;
    }
}
