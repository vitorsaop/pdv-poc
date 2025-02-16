export interface Produto {
  id?: number; // Opcional
  codigoBarras: string;
  descricao: string;
  valorUnitario: number;
  unidade: string;
  imagem?: string;
  quantidade?: number;
}