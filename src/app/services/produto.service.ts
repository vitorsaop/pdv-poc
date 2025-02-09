import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { IndexedDBService } from './indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  constructor(private indexedDBService: IndexedDBService) {}

  /** Gera um produto aleatório */
  gerarProdutoAleatorio(index: number): Produto {
    return {
      codigoBarras: (100000000000 + index).toString(),
      descricao: `Produto ${index}`,
      valorUnitario: parseFloat((Math.random() * 100).toFixed(2)),
      unidade: 'UN',
      imagem: './assets/img_padrao.png'
    };
  }

  /** Insere 10.000 produtos no IndexedDB */
  async salvarProdutosIniciais() {
    const db = await this.indexedDBService.getDB();
    const tx = db.transaction('produtos', 'readwrite');
    const store = tx.objectStore('produtos');

    console.time("Inserção de 10.000 produtos");

    for (let i = 1; i <= 10000; i++) {
      const produto = this.gerarProdutoAleatorio(i);
      await store.put(produto);
    }

    await tx.done;
    console.timeEnd("Inserção de 10.000 produtos");
    console.log("10.000 produtos inseridos no IndexedDB!");
  }
}
