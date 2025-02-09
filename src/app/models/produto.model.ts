export interface Produto {
  codigoBarras: string;
  descricao: string;
  valorUnitario: number;
  unidade: string;
  imagem?: string;
  quantidade?: number;
}