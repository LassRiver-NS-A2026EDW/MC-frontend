import { Component, input } from '@angular/core';
import { LucideAngularModule, Shield, BookOpen, User, HelpCircle, LucideIconData } from 'lucide-angular';

@Component({
  selector: 'app-role-badge',
  imports: [LucideAngularModule],
  templateUrl: './role-badge.html',
  styleUrl: './role-badge.css',
})
export class RoleBadgeComponent {
  readonly role = input<string>('');

  getRoleConfig(): { label: string; class: string; icon: LucideIconData } {
    const map: Record<string, { label: string; class: string; icon: LucideIconData }> = {
      admin: {
        label: 'Administrador',
        class: 'bg-destructive/10 text-destructive border-destructive/30',
        icon: Shield,
      },
      librarian: {
        label: 'Bibliotecario',
        class: 'bg-primary/10 text-primary border-primary/30',
        icon: BookOpen,
      },
      user: {
        label: 'Usuario',
        class: 'bg-accent/10 text-accent border-accent/30',
        icon: User,
      },
    };
    return (
      map[this.role()] || {
        label: this.role(),
        class: 'bg-muted text-muted-foreground border-border',
        icon: HelpCircle,
      }
    );
  }
}
