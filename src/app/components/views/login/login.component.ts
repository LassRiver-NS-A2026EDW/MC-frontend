import { Component, inject, signal, effect } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../services/auth.store';
import { UiStore } from '../../../services/ui.store';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  User,
  Lock,
  LogIn,
  UserPlus,
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from 'lucide-angular';

@Component({
  selector: 'app-login',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private router = inject(Router);
  username = signal('');
  password = signal('');
  localError = signal('');
  showPassword = signal(false);

  readonly UserIcon = User;
  readonly LockIcon = Lock;
  readonly LogInIcon = LogIn;
  readonly UserPlusIcon = UserPlus;
  readonly AlertIcon = AlertCircle;
  readonly ArrowRightIcon = ArrowRight;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;
  readonly ShieldIcon = ShieldCheck;
  readonly SparklesIcon = Sparkles;

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  constructor(public auth: AuthStore, public ui: UiStore) {
    // Cuando el usuario se autentique, redirigir a home
    effect(() => {
      if (this.auth.isAuthenticated()) {
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
    this.auth.login(this.username(), this.password()).subscribe({
      next: () => this.ui.loading.set(false),
      error: (err) => {
        this.ui.error.set(err.error?.error || 'Credenciales inválidas');
        this.ui.loading.set(false);
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  continueAsGuest(): void {
    this.router.navigate(['/home']);
  }
}
