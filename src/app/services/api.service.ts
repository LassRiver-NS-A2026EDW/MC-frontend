import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book, Review, User, Loan } from '../models/models';

/**
 * Servicio centralizado para comunicación con el backend Django.
 * Todas las rutas apuntan a /api/ que Nginx redirige al backend.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '/api';

  // ─── Auth ───────────────────────────────────────────────

  login(username: string, password: string): Observable<{ user: User; token: string }> {
    return this.http.post<{ user: User; token: string }>(
      `${this.baseUrl}/auth/login/`,
      { username, password }
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
    return this.http.post<{ user: User; token: string }>(
      `${this.baseUrl}/auth/registro/`,
      data
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/auth/logout/`, {});
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/me/`);
  }

  // ─── Libros ─────────────────────────────────────────────

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/libros/`);
  }

  getBook(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/libros/${id}/`);
  }

  createBook(book: Partial<Book> & { autor_id: number }): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/libros/`, book);
  }

  updateBook(id: number, updates: Partial<Book>): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/libros/${id}/`, updates);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/libros/${id}/`);
  }

  // ─── Reseñas ────────────────────────────────────────────

  getReviews(params?: { bookId?: number; userId?: number }): Observable<Review[]> {
    let url = `${this.baseUrl}/resenas/`;
    const queryParts: string[] = [];
    if (params?.bookId) queryParts.push(`bookId=${params.bookId}`);
    if (params?.userId) queryParts.push(`userId=${params.userId}`);
    if (queryParts.length > 0) url += '?' + queryParts.join('&');
    return this.http.get<Review[]>(url);
  }

  createReview(review: { bookId: number; rating: number; comment: string }): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/resenas/`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/resenas/${id}/`);
  }

  flagReview(id: number, reason: string): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/resenas/${id}/flag/`, { reason });
  }

  unflagReview(id: number): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/resenas/${id}/unflag/`, {});
  }

  // ─── Favoritos ──────────────────────────────────────────

  getFavorites(): Observable<{ id: number; bookId: number }[]> {
    return this.http.get<{ id: number; bookId: number }[]>(`${this.baseUrl}/favoritos/`);
  }

  addFavorite(bookId: number): Observable<{ id: number; bookId: number }> {
    return this.http.post<{ id: number; bookId: number }>(
      `${this.baseUrl}/favoritos/`,
      { bookId }
    );
  }

  removeFavorite(bookId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/favoritos/${bookId}/`);
  }

  // ─── Préstamos ──────────────────────────────────────────

  getLoans(params?: { status?: string }): Observable<Loan[]> {
    let url = `${this.baseUrl}/prestamos/`;
    if (params?.status) url += `?status=${params.status}`;
    return this.http.get<Loan[]>(url);
  }

  createLoan(data: { bookId: number; dueDate: string }): Observable<Loan> {
    return this.http.post<Loan>(`${this.baseUrl}/prestamos/`, data);
  }

  returnLoan(id: number): Observable<Loan> {
    return this.http.post<Loan>(`${this.baseUrl}/prestamos/${id}/devolver/`, {});
  }

  // ─── Estadísticas ───────────────────────────────────────

  getStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/estadisticas/`);
  }
}
