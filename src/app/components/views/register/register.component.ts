import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private router = inject(Router);
  name = signal('');
  email = signal('');
  password = signal('');
  confirmPassword = signal('');
  error = signal('');

  constructor(public store: AppStore) {}

  register(): void {
    if (!this.name() || !this.email() || !this.password()) {
      this.error.set('Todos los campos son obligatorios');
      return;
    }
    if (this.password() !== this.confirmPassword()) {
      this.error.set('Las contraseñas no coinciden');
      return;
    }
    if (this.password().length < 6) {
      this.error.set('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    const success = this.store.register(this.name(), this.email(), this.password());
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.error.set('El email ya está registrado');
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
