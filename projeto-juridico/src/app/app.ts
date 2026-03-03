import { Component, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Requisito: Uso de Interfaces (evitar any) 
interface Processo {
  id: number;
  numero: string;
  cliente: string;
  status: string;
}

@Pipe({
  name: 'saudacao',
  standalone: true
})
export class SaudacaoPipe implements PipeTransform {
  transform(value: string): string {
    const hora = new Date().getHours();
    let msg = 'Bom dia';
    if (hora >= 13 && hora < 20) msg = 'Boa tarde';
    if (hora >= 20 || hora < 5) msg = 'Boa noite';
    return `${msg}${value}`;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SaudacaoPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  dataDeHoje: string = new Date().toLocaleDateString('pt-PT');
  nomeUsuario: string = ', Jessica';
  processoSendoEditado: Processo | null = null;

  termoPesquisa: string = '';
  filtroStatusLista: string = 'Todos';

  listaDeProcessos: Processo[] = [
    { id: 1, numero: '2026-001', cliente: 'Arasaka Ltd', status: 'Novo' },
    { id: 2, numero: '2026-002', cliente: 'Michael Sullivan', status: 'Ativo' },
    { id: 3, numero: '2026-003', cliente: 'Weyland Corp', status: 'Concluído' }
  ];

  constructor(public router: Router) {}

  get listaFiltrada() {
    let lista = [...this.listaDeProcessos];
    const urlParts = this.router.url.split('/');
    const filtroRota = decodeURIComponent(urlParts[urlParts.length - 1] || '');

    if (filtroRota !== 'todos' && filtroRota !== 'dashboard' && filtroRota !== '') {
      lista = lista.filter(p => p.status === filtroRota);
    } 
    else if (filtroRota === 'todos' && this.filtroStatusLista !== 'Todos') {
      lista = lista.filter(p => p.status === this.filtroStatusLista);
    }

    if (this.termoPesquisa) {
      const termo = this.termoPesquisa.toLowerCase();
      lista = lista.filter(p => 
        p.cliente.toLowerCase().includes(termo) || p.numero.toLowerCase().includes(termo)
      );
    }
    return lista;
  }

  // KPIs calculados em tempo real (Requisito I) 
  get total() { return this.listaDeProcessos.length; }
  get novos() { return this.listaDeProcessos.filter(p => p.status === 'Novo').length; }
  get ativos() { return this.listaDeProcessos.filter(p => p.status === 'Ativo').length; }
  get concluidos() { return this.listaDeProcessos.filter(p => p.status === 'Concluído').length; }

  // Lógica de Exportação
  exportarJSON() {
    const data = JSON.stringify(this.listaDeProcessos, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    this.baixarArquivo(blob, 'processos.json');
  }

  exportarExcel() {
    let csv = 'ID;Numero;Cliente;Status\n';
    this.listaDeProcessos.forEach(p => {
      csv += `${p.id};${p.numero};${p.cliente};${p.status}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    this.baixarArquivo(blob, 'processos.csv');
  }

  private baixarArquivo(blob: Blob, nome: string) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nome;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  salvarProcesso(cliente: string, numero: string, status: string) {
    if (cliente && numero) {
      this.listaDeProcessos.push({ id: Date.now(), cliente, numero, status });
      this.router.navigate(['/dashboard']);
    }
  }

  excluirProcesso(id: number) {
    if(confirm('Deseja excluir?')) this.listaDeProcessos = this.listaDeProcessos.filter(p => p.id !== id);
  }

  iniciarEdicao(p: Processo) { this.processoSendoEditado = { ...p }; }
  
  atualizarProcesso() {
    if (this.processoSendoEditado) {
      const i = this.listaDeProcessos.findIndex(p => p.id === this.processoSendoEditado?.id);
      if (i !== -1) {
        this.listaDeProcessos[i] = this.processoSendoEditado;
        this.processoSendoEditado = null;
      }
    }
  }
  
  cancelarEdicao() { this.processoSendoEditado = null; }
}