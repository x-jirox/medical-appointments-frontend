import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AUTH_TOKEN_KEY, USER_ROLE_KEY, UserRole } from './auth.constants';
import { environment } from '@envs/environment'

/**
 * Servicio responsable de la autenticación del usuario,
 * incluyendo login, registro, almacenamiento del token y del rol,
 * y control del estado de sesión.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private role: UserRole | null = null;

  // Estado reactivo del login
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Realiza la petición de login al backend.
   * @param credentials Credenciales del usuario (email, password)
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/login`, credentials);
  }

  /**
   * Registra un nuevo usuario en el backend.
   * @param user Datos del usuario a registrar
   */
  register(user: { names: string; email: string; password: string; phone?: string }): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/register`, user).pipe(
      catchError(this.handleError)
    );
  }

  // ===== TOKEN =====

  /**
   * Verifica si ya existe un token en localStorage.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Almacena el token en memoria y localStorage.
   * @param token Token JWT recibido del backend
   */
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    this.isLoggedInSubject.next(true);
  }

  /**
   * Devuelve el token actual del usuario.
   */
  getToken(): string | null {
    return this.token || localStorage.getItem(AUTH_TOKEN_KEY);
  }

  // ===== ROLE =====

  /**
   * Almacena el rol del usuario.
   * @param role Rol del usuario ('patient', 'doctor', etc.)
   */
  setRole(role: UserRole): void {
    this.role = role;
    localStorage.setItem(USER_ROLE_KEY, role);
  }

  /**
   * Devuelve el rol actual del usuario.
   */
  getRole(): UserRole | null {
    return this.role || (localStorage.getItem(USER_ROLE_KEY) as UserRole | null);
  }

  // ===== STATE =====

  /**
   * Verifica si el usuario está autenticado.
   */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  /**
   * Observable para saber si el usuario está logueado (modo reactivo).
   */
  get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  /**
   * Cierra la sesión del usuario y limpia todos los datos.
   */
  logout(): void {
    this.clearAuthData();
    this.router.navigate(['/auth/sign-in']);
  }

  /**
   * Limpia token, rol y estado de sesión.
   */
  private clearAuthData(): void {
    this.token = null;
    this.role = null;
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
    this.isLoggedInSubject.next(false);
  }

  /**
   * Manejo de errores de autenticación.
   */
  private handleError(error: HttpErrorResponse) {
    return throwError(() => new Error('An error occurred during authentication'));
  }
}
