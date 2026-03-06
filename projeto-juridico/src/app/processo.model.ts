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
//Retirei do HTML porque nao fazia sentido aparecer nos detalhes mas em caso de 
// migração de base de dados ou mudança de numero de proc faz sentido ter e dai é só incluir