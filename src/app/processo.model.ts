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
  descricao: string;
  criadoEm: string;
  

} 
