import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Processo } from './processo.model';

@Injectable({ providedIn: 'root' })
export class ProcessoService {
  private readonly STORAGE_KEY = 'processos_jessica_db';

  private readonly _processos$ = new BehaviorSubject<Processo[]>([]);
  readonly processos$ = this._processos$.asObservable();

  constructor() {
    this._processos$.next(this.carregarDados());
  }

  private carregarDados(): Processo[] {
    const dados = localStorage.getItem(this.STORAGE_KEY);
    if (dados) return JSON.parse(dados) as Processo[];

    const seed: Processo[] = [
      { id: 1, numero: '2026-001', cliente: 'Arasaka Ltd', tipo: 'Cível', status: 'Novo', criadoEm: new Date().toISOString() },
      { id: 2, numero: '2026-002', cliente: 'Michael Sullivan', tipo: 'Criminal', status: 'Ativo', criadoEm: new Date().toISOString() },
      { id: 3, numero: '2026-003', cliente: 'Weyland Corp', tipo: 'Trabalhista', status: 'Concluído', criadoEm: new Date().toISOString() },
    ];
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  private guardar(processos: Processo[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(processos));
    this._processos$.next(processos);
  }

  // --- CRUD ---
  getSnapshot(): Processo[] {
    return this._processos$.value;
  }

  getById(id: number): Processo | undefined {
    return this.getSnapshot().find(p => p.id === id);
  }

  adicionar(p: Omit<Processo, 'id' | 'criadoEm'>) {
    const novo: Processo = { ...p, id: Date.now(), criadoEm: new Date().toISOString() };
    this.guardar([novo, ...this.getSnapshot()]);
  }

  atualizar(p: Processo) {
    const lista = this.getSnapshot().map(item => (item.id === p.id ? p : item));
    this.guardar(lista);
  }

  eliminar(id: number) {
    this.guardar(this.getSnapshot().filter(p => p.id !== id));
  }

  // --- validação custom: número duplicado ---
  numeroExiste(numero: string, ignorarId?: number): boolean {
    const n = numero.trim();
    return this.getSnapshot().some(p => p.numero === n && p.id !== ignorarId);
  }

  // --- Exportação (tira lógica do componente) ---
  exportarJsonBlob(): Blob {
    const data = JSON.stringify(this.getSnapshot(), null, 2);
    return new Blob([data], { type: 'application/json' });
  }

  exportarCsvBlob(): Blob {
    const header = 'ID;Numero;Cliente;Tipo;Status;CriadoEm\n';
    const linhas = this.getSnapshot()
      .map(p => `${p.id};${p.numero};${p.cliente};${p.tipo};${p.status};${p.criadoEm}`)
      .join('\n');
    return new Blob([header + linhas + '\n'], { type: 'text/csv' });
  }
}