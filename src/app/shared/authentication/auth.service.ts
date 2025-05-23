import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_TOKEN_KEY, USER_ROLE_KEY, UserRole } from './auth.constants';
import { environment } from '@envs/environment';

/**
 * Servicio de autenticación que gestiona login, registro,
 * tokens, roles y el estado de sesión del usuario.
 */
@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // Token y rol almacenados en memoria
  private token: string | null = null;
  private role: UserRole | null = null;

  // Observable del estado de login
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {
    // Inicializamos token y rol desde localStorage si existen
    this.token = localStorage.getItem(AUTH_TOKEN_KEY);
    this.role = localStorage.getItem(USER_ROLE_KEY) as UserRole | null;
  }

  // ─────────────────────────────────────────────────────────────
  // API CALLS: Login & Registro
  // ─────────────────────────────────────────────────────────────

  /**
   * Envía una solicitud de login al backend.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/login`, credentials);
  }

  /**
   * Registra un nuevo usuario en el backend.
   */
  register(user: {
    names: string;
    email: string;
    password: string;
    phone?: string;
  }): Observable<any> {
    return this.http
      .post<any>(`${environment.API_URL}/register`, user)
      .pipe(catchError(this.handleError));
  }

  // ─────────────────────────────────────────────────────────────
  // TOKEN MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Verifica si ya existe un token almacenado.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Guarda el token en memoria y localStorage.
   */
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  /**
   * Obtiene el token actual del usuario.
   */
  getToken(): string | null {
    return this.token || localStorage.getItem(AUTH_TOKEN_KEY);
  }

  // ─────────────────────────────────────────────────────────────
  // ROLE MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Guarda el rol del usuario.
   */
  setRole(role: UserRole): void {
    this.role = role;
    localStorage.setItem(USER_ROLE_KEY, role);
  }

  /**
   * Obtiene el rol actual del usuario.
   */
  getRole(): UserRole | null {
    return this.role || (localStorage.getItem(USER_ROLE_KEY) as UserRole | null);
  }

  // ─────────────────────────────────────────────────────────────
  // AUTH STATE MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Verifica si el usuario está logueado.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Observable para detectar cambios en el estado de login.
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /**
   * Cierra la sesión, limpia los datos y redirige al login.
   */
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/sign-in']);
  }

  /**
   * Limpia token, rol y estado de login.
   */
  private clearAuthData(): void {
    this.token = null;
    this.role = null;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    this.isLoggedInSubject.next(false);
  }

  // ─────────────────────────────────────────────────────────────
  // ERROR HANDLING
  // ─────────────────────────────────────────────────────────────

  /**
   * Maneja errores HTTP de forma centralizada.
   */
  private handleError(error: HttpErrorResponse) {
    const message =
      error.error?.message || 'Ocurrió un error durante la autenticación.';
    return throwError(() => new Error(message));
  }
}
