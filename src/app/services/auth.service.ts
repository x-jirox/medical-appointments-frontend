import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs'; // Importamos BehaviorSubject

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: any = null; // Usuario actualmente autenticado

  // Creamos un Subject que notificará cambios en la autenticación
  private authStatusSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatusSubject.asObservable(); // Observable para que otros componentes se suscriban

  constructor(private router: Router) { 
    // Recuperamos el usuario de localStorage si está autenticado
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  // Simula el inicio de sesión del usuario
  signIn(username: string, password: string): boolean {
    const users = [
      { username: 'patient', password: 'patient123', role: 'patient' },
      { username: 'doctor', password: 'doctor123', role: 'doctor' },
      { username: 'admin', password: 'admin123', role: 'admin' }
    ];

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      this.authStatusSubject.next(true); // Emitimos el estado de autenticación
      return true;
    } else {
      return false;
    }
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.currentUser !== null || localStorage.getItem('currentUser') !== null;
  }

  // Obtener el rol del usuario autenticado
  getRole(): string {
    return this.currentUser?.role || JSON.parse(localStorage.getItem('currentUser') || '{}')?.role;
  }

  // Cerrar sesión
  signOut(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.authStatusSubject.next(false); // Emitimos el estado de no autenticación
    this.router.navigate(['/sign-in']);
  }
}
