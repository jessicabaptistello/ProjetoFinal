// 'export' significa que este modelo pode ser usado noutros ficheiros
export interface Processo {
  id: number;           // Um número único para identificar o processo
  numero: string;       // Ex: "001/2026"
  cliente: string;      // Nome do cliente
  tipo: string;         // Ex: "Cível", "Criminal"
  status: string;       // Ex: "Ativo", "Concluído"
}