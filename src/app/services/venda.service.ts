import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs'; 
import { Produto } from '../models/produto.model';
import { Venda } from '../models/venda.model';
import { IndexedDBService } from './indexeddb.service';

@Injectable({
  providedIn: 'root'
})
export class VendaService {
  constructor(private indexedDBService: IndexedDBService) {}

  /** Registra uma venda no IndexedDB */
  async registrarVenda(produtos: Produto[], total: number): Promise<void> {
    const db = await this.indexedDBService.getDB();
    const venda: Venda = {
      id: Date.now(),
      produtos,
      total,
      data: new Date().toISOString()
    };

    const tx = db.transaction('vendas', 'readwrite');
    await tx.objectStore('vendas').put(venda);
    await tx.done;

    console.log("✅ Venda registrada com sucesso!", venda);
  }

  /** Obtém todas as vendas registradas */
  async obterVendas(): Promise<Venda[]> {
    const db = await this.indexedDBService.getDB();
    return await db.getAll('vendas');
  }

  /** 
   * * TO-DO: retirar ess emétodo daqui e colocar em ProdutoService
   * Busca um produto pelo código de barras */
  buscarProdutoPorCodigo(codigo: string): Observable<Produto | undefined> {
    const buscaProduto = async () => {
      const db = await this.indexedDBService.getDB();
      return db.get('produtos', codigo);
    };
    return from(buscaProduto()); 
  }

  /** 
   * TO-DO: retirar ess emétodo daqui e colocar em ProdutoService
   * Retorna todos os produtos do IndexedDB */
  buscarProdutos(): Observable<Produto[]> {
    const buscaProdutos = async () => {
      const db = await this.indexedDBService.getDB();
      return db.getAll('produtos');
    };
    return from(buscaProdutos()); 
  }  
}
