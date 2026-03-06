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
    if (dados) {
      const lista = JSON.parse(dados) as any[];


      const migrado: Processo[] = lista.map(item => ({
        ...item,
        descricao: item.descricao ?? '',
      }));


      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(migrado));
      return migrado;
    }

    const seed: Processo[] = [];

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  private guardar(processos: Processo[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(processos));
    this._processos$.next(processos);
  }

  getSnapshot(): Processo[] {
    return this._processos$.value;
  }

  getById(id: number): Processo | undefined {
    return this.getSnapshot().find(p => p.id === id);
  }

  adicionar(p: Omit<Processo, 'id' | 'criadoEm'>) {
    const novo: Processo = {
      ...p,
      id: Date.now(),
      criadoEm: new Date().toISOString(),
    };
    this.guardar([novo, ...this.getSnapshot()]);
  }

  atualizar(p: Processo) {
    const lista = this.getSnapshot().map(item => (item.id === p.id ? p : item));
    this.guardar(lista);
  }

  eliminar(id: number) {
    this.guardar(this.getSnapshot().filter(p => p.id !== id));
  }

  numeroExiste(numero: string, ignorarId?: number): boolean {
    const n = numero.trim();
    return this.getSnapshot().some(p => p.numero === n && p.id !== ignorarId);
  }

  exportarJsonBlob(): Blob {
    const data = JSON.stringify(this.getSnapshot(), null, 2);
    return new Blob([data], { type: 'application/json' });
  }

  exportarCsvBlob(): Blob {
    const header = 'ID;Numero;Cliente;Tipo;Status;Descricao;CriadoEm\n';
    const linhas = this.getSnapshot()
      .map(p => {
        const desc = (p.descricao ?? '').replaceAll('\n', ' ').replaceAll(';', ',');
        return `${p.id};${p.numero};${p.cliente};${p.tipo};${p.status};${desc};${p.criadoEm}`;
      })
      .join('\n');

    return new Blob([header + linhas + '\n'], { type: 'text/csv' });
  }
}