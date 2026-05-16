import { Component, input } from '@angular/core';
import { LucideAngularModule, CheckCircle2, XCircle, Clock, AlertTriangle, RotateCcw, HelpCircle, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-status-badge',
  imports: [LucideAngularModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadgeComponent {
  readonly status = input<string>('');

  getConfig(): { label: string; class: string; icon: LucideIconData; pulse?: boolean } {
    const map: Record<string, { label: string; class: string; icon: LucideIconData; pulse?: boolean }> = {
      available:   { label: 'Disponible',   class: 'bg-success/10 text-success border-success/30',           icon: CheckCircle2 },
      unavailable: { label: 'No Disponible',class: 'bg-destructive/10 text-destructive border-destructive/30', icon: XCircle },
      active:      { label: 'Activo',       class: 'bg-primary/10 text-primary border-primary/30',           icon: Clock, pulse: true },
      overdue:     { label: 'Vencido',      class: 'bg-destructive/10 text-destructive border-destructive/30', icon: AlertTriangle, pulse: true },
      returned:    { label: 'Devuelto',     class: 'bg-accent/10 text-accent border-accent/30',              icon: RotateCcw },
    };
    return map[this.status()] || { label: this.status(), class: 'bg-muted text-muted-foreground border-border', icon: HelpCircle };
  }
}
