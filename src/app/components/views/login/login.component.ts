import { Component, signal } from '@angular/core';
import { AppStore } from '../../../services/app-store.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  error = signal('');

  constructor(public store: AppStore) {}

  login(): void {
    if (!this.email() || !this.password()) {
      this.error.set('Todos los campos son obligatorios');
      return;
    }
    const success = this.store.login(this.email(), this.password());
    if (!success) {
      this.error.set('Credenciales inválidas');
    }
  }
}
