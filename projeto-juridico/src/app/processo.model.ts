export type StatusProcesso = 'Novo' | 'Ativo' | 'Concluído';
export type TipoProcesso =
  | 'Cível'
  | 'Criminal'
  | 'Trabalhista'
  | 'Família'
  | 'Fiscal'
  | 'Outro';

export interface Processo {
  id: number;
  numero: string;
  cliente: string;
  tipo: TipoProcesso;
  status: StatusProcesso;

  // ✅ ADICIONA ISTO
  descricao: string;

  criadoEm: string; // ISO
}