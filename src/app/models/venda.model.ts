import { Produto } from './produto.model';

export interface Venda {
    id: number;
    produtos: Produto[];
    total: number;
    data: string;
}