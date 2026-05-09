import { Component, inject, signal, effect, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from '../../../services/app-store.service';
import { UiStore } from '../../../services/ui.store';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Check, X } from 'lucide-angular';

@Component({
  selector: 'app-register',
  imports: [FormsModule, LucideAngularModule],
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
  localErrors = signal<string[]>([]);

  // Requisitos de contraseña
  hasLength = computed(() => this.password().length >= 8);
  hasUpper = computed(() => /[A-Z]/.test(this.password()));
  hasNumber = computed(() => /[0-9]/.test(this.password()));
  hasSpecial = computed(() => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(this.password()));

  readonly CheckIcon = Check;
  readonly XIcon = X;

  constructor(public store: AppStore, public ui: UiStore) {
    effect(() => {
      if (this.store.isAuthenticated()) {
        this.router.navigate(['/home']);
      }
    });
  }

  register(event?: Event): void {
    if (event) event.preventDefault();

    const errors: string[] = [];

    if (!this.username() || !this.email() || !this.firstName() || !this.password() || !this.fechaNacimiento()) {
      errors.push('Todos los campos obligatorios deben completarse.');
    }
    if (this.username().length > 15) {
      errors.push('El nombre de usuario no puede exceder los 15 caracteres.');
    }
    if (this.password() !== this.confirmPassword()) {
      errors.push('Las contraseñas no coinciden.');
    }
    if (!this.hasLength() || !this.hasUpper() || !this.hasNumber() || !this.hasSpecial()) {
      errors.push('La contraseña no cumple con todos los requisitos.');
    }

    if (errors.length > 0) {
      this.localErrors.set(errors);
      return;
    }

    this.localErrors.set([]);
    this.ui.loading.set(true);
    this.ui.error.set(null);
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
