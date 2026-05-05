import { Component, signal, afterNextRender } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly apiMessage = signal('Conectando con el backend...');
  protected readonly apiStatus = signal('');

  constructor(private http: HttpClient) {
    afterNextRender(() => {
      this.http.get<{ status: string; message: string }>('/api/health/').subscribe({
        next: (res) => {
          this.apiMessage.set(res.message);
          this.apiStatus.set(res.status);
        },
        error: () => {
          this.apiMessage.set('❌ Error al conectar con el backend');
          this.apiStatus.set('error');
        },
      });
    });
  }
}
