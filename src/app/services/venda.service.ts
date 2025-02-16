import { Injectable } from '@angular/core';
import { SQLiteDatabaseService } from './sqlite-database.service';
import { Produto } from '../models/produto.model';
import { Venda } from '../models/venda.model';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  constructor(private dbService: SQLiteDatabaseService) {}

  async registrarVenda(produtos: { produto: Produto; quantidade: number }[], total: number): Promise<void> {
    const dataAtual = new Date().toISOString();
    try {
      // Inserir a venda e obter o ID gerado
      const vendaId = await this.dbService.insert(
        "INSERT INTO venda (total, data) VALUES (?, ?)",
        [total, dataAtual]
      );
      
      // Inserir os produtos da venda
      for (const item of produtos) {
        await this.dbService.insert(
          "INSERT INTO venda_produtos (venda_id, produto_id, quantidade, subtotal) VALUES (?, ?, ?, ?)",
          [vendaId, item.produto.id, item.quantidade, item.produto.valorUnitario * item.quantidade]
        );
      }
      console.log("🛒 Venda registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
    }
  }

  async buscarVendas(): Promise<Venda[]> {
    const vendas = await this.dbService.select<Venda>("SELECT * FROM venda");
    for (const venda of vendas) {
      venda.produtos = await this.buscarProdutosDaVenda(venda.id);
    }
    return vendas;
  }

  private async buscarProdutosDaVenda(vendaId: number): Promise<Produto[]> {
    return this.dbService.select<Produto>(
      `SELECT p.* FROM venda_produtos vp 
       JOIN produtos p ON vp.produto_id = p.id 
       WHERE vp.venda_id = ?`,
      [vendaId]
    );
  }
}