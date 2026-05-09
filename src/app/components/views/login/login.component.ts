import { Component, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';
import { UiStore } from '../../../services/ui.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  username = signal('');
  password = signal('');
  localError = signal('');

  constructor(public store: AppStore, public ui: UiStore) {
    // Cuando el usuario se autentique, redirigir a home
    effect(() => {
      if (this.store.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });
  }

  login(event?: Event): void {
    if (event) event.preventDefault();
    if (!this.username() || !this.password()) {
      this.localError.set('Todos los campos son obligatorios');
      return;
    }
    this.localError.set('');
    this.ui.loading.set(true);
    this.ui.error.set(null);
    this.store.login(this.username(), this.password());
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
