import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  id: string;
  username: string;
  email: string;
  roleId: number;
  roleName: string;
}

export interface LoginRequest {
  usernameOrDocumentNumber: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiration: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = '/api/v1/auth';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';
  
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    // Verificar si localStorage está disponible (no estamos en SSR)
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.TOKEN_KEY);
      const userJson = localStorage.getItem(this.USER_KEY);
      
      if (token && userJson) {
        try {
          const user = JSON.parse(userJson) as User;
          this.currentUserSubject.next(user);
          this.isAuthenticatedSubject.next(true);
        } catch (e) {
          this.logout();
        }
      }
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(response => this.handleAuthSuccess(response)),
        map(response => response.user),
        catchError(error => {
          console.error('Error en la petición de login:', error);
          console.error('Detalles del error:', JSON.stringify(error));
          
          // Inicializar con mensaje por defecto
          let message = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
          
          // Verificar si el error contiene información del servidor
          if (error.error && typeof error.error === 'object') {
            message = error.error.message || message;
          }
          
          return throwError(() => new Error(message));
        })
      );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  private handleAuthSuccess(response: LoginResponse): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, response.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
    }
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}