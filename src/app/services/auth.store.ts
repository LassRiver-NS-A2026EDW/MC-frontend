import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/models';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private api = inject(ApiService);
  private platformId = inject(PLATFORM_ID);

  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');
  readonly isLibrarian = computed(() => this.currentUser()?.role === 'librarian');
  readonly isAdminOrLibrarian = computed(() => this.isAdmin() || this.isLibrarian());

  constructor() {
    this.loadMe();
  }

  loadMe(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const token = this.getToken();
    if (!token) return;

    this.api.me().subscribe({
      next: (user) => this.currentUser.set(user),
      error: () => this.removeToken(),
    });
  }

  login(username: string, password: string): Observable<{ user: User; token: string }> {
    return this.api.login(username, password).pipe(
      tap((res) => {
        this.setToken(res.token);
        this.currentUser.set(res.user);
      }),
    );
  }

  register(data: {
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password2: string;
    fecha_nacimiento: string;
    genero: string;
    pais: string;
  }): Observable<{ user: User; token: string }> {
    return this.api.register(data).pipe(
      tap((res) => {
        this.setToken(res.token);
        this.currentUser.set(res.user);
      }),
    );
  }

  logout(): Observable<void> {
    return this.api.logout().pipe(
      tap({
        complete: () => {
          this.removeToken();
          this.currentUser.set(null);
        },
      }),
    );
  }

  updateProfile(updates: Partial<User>): void {
    const user = this.currentUser();
    if (user) this.currentUser.set({ ...user, ...updates });
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('auth_token', token);
  }

  removeToken(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('auth_token');
  }
}
