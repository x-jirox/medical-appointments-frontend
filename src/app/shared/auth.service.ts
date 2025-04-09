// src/app/shared/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'patient' | 'doctor' | 'admin';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private mockUsers = [
    { username: 'patient1', password: '123', role: 'patient' },
    { username: 'doctor1', password: '123', role: 'doctor' },
    { username: 'admin1', password: '123', role: 'admin' }
  ];

  private currentUser: { username: string, role: UserRole } | null = null;

  constructor(private router: Router) { }

  private loadUser(): void {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('user');
      this.currentUser = storedUser ? JSON.parse(storedUser) : null;
    }
  }

  login(username: string, password: string): boolean {
    const user = this.mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      this.currentUser = { username: user.username, role: user.role as UserRole };
      localStorage.setItem('user', JSON.stringify(this.currentUser));
      this.redirectUser(user.role as UserRole);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
    this.router.navigate(['/auth/sign-in']);
  }

  getRole(): UserRole | null {
    this.loadUser();
    return this.currentUser?.role || null;
  }

  isLoggedIn(): boolean {
    this.loadUser();
    return !!this.currentUser;
  }

  private redirectUser(role: UserRole): void {
    switch (role) {
      case 'patient':
        this.router.navigate(['/patient/dashboard']);
        break;
      case 'doctor':
        this.router.navigate(['/doctor/dashboard']);
        break;
      case 'admin':
        this.router.navigate(['/admin/dashboard']); // si agregás admin en el futuro
        break;
    }
  }
}
