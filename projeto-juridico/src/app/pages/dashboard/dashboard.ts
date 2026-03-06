import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProcessoService } from '../../processo.service';
import { Processo } from '../../processo.model';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardPageComponent {

  // injeta o service que guarda os processos
  private readonly processoService = inject(ProcessoService);

  // lista completa de processos
  processos: Processo[] = [];

  // contadores dos cards
  total = 0;
  novos = 0;
  ativos = 0;
  concluidos = 0;

  // listas filtradas usadas nos cards
  processosNovos: Processo[] = [];
  processosAtivos: Processo[] = [];
  processosConcluidos: Processo[] = [];

  // 🔵 variável que guarda o último processo criado
  ultimoProcesso: Processo | null = null;


  constructor() {

    // subscreve ao observable que contém todos os processos
    this.processoService.processos$.subscribe(lista => {

      // guarda lista completa
      this.processos = lista;

      // total de processos
      this.total = lista.length;

      // filtra processos por status
      this.processosNovos = lista.filter(p => p.status === 'Novo');
      this.processosAtivos = lista.filter(p => p.status === 'Ativo');
      this.processosConcluidos = lista.filter(p => p.status === 'Concluído');

      // contadores para os cards
      this.novos = this.processosNovos.length;
      this.ativos = this.processosAtivos.length;
      this.concluidos = this.processosConcluidos.length;


      // ======================================
      // DESCOBRE O ÚLTIMO PROCESSO ADICIONADO
      // ======================================

      if (lista.length > 0) {

        // ordena os processos pela data mais recente
        const ordenados = [...lista].sort((a, b) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
        );

        // guarda o primeiro da lista (mais recente)
        this.ultimoProcesso = ordenados[0];

      }

    });

  }

}