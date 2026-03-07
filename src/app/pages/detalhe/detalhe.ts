import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { ProcessoService } from '../../processo.service';
import { Processo } from '../../processo.model';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';

@Component({
  selector: 'app-detalhe-page',
  standalone: true,
  imports: [CommonModule, RouterModule, StatusBadgeComponent],
  templateUrl: './detalhe.html',
  styleUrl: './detalhe.css',
})
export class DetalhePageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly processoService = inject(ProcessoService);

  processo?: Processo;

  constructor() {
    this.route.paramMap.subscribe(params => {
      const idStr = params.get('id');
      const id = idStr ? Number(idStr) : NaN;
      this.processo = Number.isFinite(id) ? this.processoService.getById(id) : undefined;
    });
  }
}