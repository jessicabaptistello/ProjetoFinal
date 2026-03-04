export type StatusProcesso = 'Novo' | 'Ativo' | 'Concluído';
export type TipoProcesso = 'Cível' | 'Criminal' | 'Trabalhista' | 'Família' | 'Fiscal' | 'Outro';

export interface Processo {
  id: number;
  numero: string;     // Ex: "2026-001"
  cliente: string;
  tipo: TipoProcesso;
  status: StatusProcesso;
  criadoEm: string;   // ISO date
}