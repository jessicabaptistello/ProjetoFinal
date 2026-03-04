import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SaudacaoPipe } from './saudacao-pipe';
import { ProcessoService } from './processo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SaudacaoPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  private readonly processoService = inject(ProcessoService);

  dataDeHoje: string = new Date().toLocaleDateString('pt-PT');
  nomeUsuario: string = 'Jessica';

  exportarJSON() {
    const blob = this.processoService.exportarJsonBlob();
    this.baixarArquivo(blob, 'processos.json');
  }

  exportarExcel() {
    const blob = this.processoService.exportarCsvBlob();
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
}