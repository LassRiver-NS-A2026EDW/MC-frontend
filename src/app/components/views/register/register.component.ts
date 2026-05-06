import { Component, inject, signal, effect } from '@angular/core';
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

  // Campos del formulario
  username = signal('');
  email = signal('');
  firstName = signal('');
  lastName = signal('');
  password = signal('');
  confirmPassword = signal('');
  fechaNacimiento = signal('');
  genero = signal('M');
  pais = signal('Colombia');
  localError = signal('');

  constructor(public store: AppStore) {
    effect(() => {
      if (this.store.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });
  }

  register(event?: Event): void {
    if (event) event.preventDefault();

    if (!this.username() || !this.email() || !this.firstName() || !this.password() || !this.fechaNacimiento()) {
      this.localError.set('Todos los campos obligatorios deben completarse');
      return;
    }
    if (this.password() !== this.confirmPassword()) {
      this.localError.set('Las contraseñas no coinciden');
      return;
    }
    if (this.password().length < 8) {
      this.localError.set('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    this.localError.set('');
    this.store.register({
      username: this.username(),
      email: this.email(),
      first_name: this.firstName(),
      last_name: this.lastName(),
      password: this.password(),
      password2: this.confirmPassword(),
      fecha_nacimiento: this.fechaNacimiento(),
      genero: this.genero(),
      pais: this.pais(),
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
