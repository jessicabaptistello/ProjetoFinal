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


  private readonly processoService = inject(ProcessoService);

 
  processos: Processo[] = [];


  total = 0;
  novos = 0;
  ativos = 0;
  concluidos = 0;


  processosNovos: Processo[] = [];
  processosAtivos: Processo[] = [];
  processosConcluidos: Processo[] = [];

  ultimoProcesso: Processo | null = null;


  constructor() {

    this.processoService.processos$.subscribe(lista => {

  
      this.processos = lista;

  
      this.total = lista.length;


      this.processosNovos = lista.filter(p => p.status === 'Novo');
      this.processosAtivos = lista.filter(p => p.status === 'Ativo');
      this.processosConcluidos = lista.filter(p => p.status === 'Concluído');

    
      this.novos = this.processosNovos.length;
      this.ativos = this.processosAtivos.length;
      this.concluidos = this.processosConcluidos.length;


      if (lista.length > 0) {

        const ordenados = [...lista].sort((a, b) =>
          new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
        );


        this.ultimoProcesso = ordenados[0];

      }

    });

  }

}