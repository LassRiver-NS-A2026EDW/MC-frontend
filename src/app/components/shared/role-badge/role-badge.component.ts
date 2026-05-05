import { Component, input } from '@angular/core';

@Component({
  selector: 'app-role-badge',
  templateUrl: './role-badge.html',
  styleUrl: './role-badge.css',
})
export class RoleBadgeComponent {
  readonly role = input<string>('');

  getRoleConfig(): { label: string; class: string } {
    const map: Record<string, { label: string; class: string }> = {
      admin: { label: 'Administrador', class: 'bg-destructive/10 text-destructive border-destructive/30' },
      librarian: { label: 'Bibliotecario', class: 'bg-primary/10 text-primary border-primary/30' },
      user: { label: 'Usuario', class: 'bg-accent/10 text-accent border-accent/30' },
    };
    return map[this.role()] || { label: this.role(), class: 'bg-muted text-muted-foreground border-border' };
  }
}
