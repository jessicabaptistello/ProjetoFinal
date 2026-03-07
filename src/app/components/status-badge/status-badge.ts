import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusProcesso } from '../../processo.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css',
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: StatusProcesso;

  get classes(): Record<string, boolean> {
    return {
      badge: true,
      novo: this.status === 'Novo',
      ativo: this.status === 'Ativo',
      concluido: this.status === 'Concluído',
    };
  }
}