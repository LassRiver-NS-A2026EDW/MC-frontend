import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadgeComponent {
  readonly status = input<string>('');

  getConfig(): { label: string; class: string } {
    const map: Record<string, { label: string; class: string }> = {
      available: { label: 'Disponible', class: 'bg-accent/10 text-accent border-accent/30' },
      unavailable: { label: 'No Disponible', class: 'bg-destructive/10 text-destructive border-destructive/30' },
      active: { label: 'Activo', class: 'bg-primary/10 text-primary border-primary/30' },
      overdue: { label: 'Vencido', class: 'bg-destructive/10 text-destructive border-destructive/30' },
      returned: { label: 'Devuelto', class: 'bg-accent/10 text-accent border-accent/30' },
    };
    return map[this.status()] || { label: this.status(), class: 'bg-muted text-muted-foreground border-border' };
  }
}
