import { Injectable } from '@angular/core';
import { SQLiteDatabaseService } from './sqlite-database.service';
import { Produto } from '../models/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private dbService: SQLiteDatabaseService) {}

  async salvarProdutosIniciais(): Promise<void> {
    console.time("Inserção de 10.000 produtos");

    const insercoes = Array.from({ length: 10000 }, (_, i) => {
      return this.dbService.insert(
        "INSERT INTO produtos (codigoBarras, descricao, valorUnitario, unidade, imagem) VALUES (?, ?, ?, ?, ?)",
        [
          (100000000000 + (i + 1)).toString(),
          `Produto ${i + 1}`,
          parseFloat((Math.random() * 100).toFixed(2)),
          'UN',
          './assets/img_padrao.png'
        ]
      );
    });

    await Promise.all(insercoes);
    console.timeEnd("Inserção de 10.000 produtos");
    console.log("📦 Produtos inseridos no SQLite!");
  }

  async buscarProdutos(): Promise<Produto[]> {
    const result: any = await this.dbService.select("SELECT * FROM produtos");

    if (!result || result.length === 0) return [];

    return result as Produto[];
  }

  async buscarProdutoPorCodigo(codigoBarras: string): Promise<Produto | null> {
    const result: any[] = await this.dbService.select(
      "SELECT * FROM produtos WHERE codigoBarras = ? LIMIT 1",
      [codigoBarras]
    );

    return result.length > 0 ? (result[0] as Produto) : null;
  }
}