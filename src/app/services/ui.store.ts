import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UiStore {
  private platformId = inject(PLATFORM_ID);

  readonly sidebarCollapsed = signal(false);
  readonly theme = signal<'light' | 'dark'>(this.readInitialTheme());
  readonly showAuthModal = signal(false);
  readonly authModalMessage = signal('');
  readonly showConfirmModal = signal(false);
  readonly confirmModalConfig = signal<{
    title: string;
    description: string;
    confirmText: string;
    cancelText: string;
    isDestructive: boolean;
    onConfirm: () => void;
  } | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly isDarkTheme = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      document.documentElement.classList.toggle('dark', this.isDarkTheme());
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed.update((value) => !value);
  }

  toggleTheme(): void {
    this.theme.update((value) => {
      const next = value === 'light' ? 'dark' : 'light';
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('app-theme', next);
      }
      return next;
    });
  }

  private readInitialTheme(): 'light' | 'dark' {
    if (!isPlatformBrowser(this.platformId)) return 'dark';
    const stored = localStorage.getItem('app-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  }

  openAuthModal(message = 'Debes iniciar sesión para usar esta función.'): void {
    this.authModalMessage.set(message);
    this.showAuthModal.set(true);
  }

  confirmAction(config: {
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    isDestructive?: boolean;
    onConfirm: () => void;
  }): void {
    this.confirmModalConfig.set({
      title: config.title,
      description: config.description,
      confirmText: config.confirmText || 'Confirmar',
      cancelText: config.cancelText || 'Cancelar',
      isDestructive: config.isDestructive || false,
      onConfirm: () => {
        config.onConfirm();
        this.showConfirmModal.set(false);
      },
    });
    this.showConfirmModal.set(true);
  }
}
