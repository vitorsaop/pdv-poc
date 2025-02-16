import { Component, OnInit } from '@angular/core';
import { SQLiteDatabaseService } from './services/sqlite-database.service';
import { Produto } from './models/produto.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pdv-poc';

  constructor(private sqliteService: SQLiteDatabaseService) {}

  async ngOnInit() {
  // Inicializa o banco de dados e passa a instância para o serviço
    const db = await this.sqliteService.initDB(); // Precisa retornar um SQLiteObject
    await this.sqliteService.initializeDatabase(db);

    // Inserir um produto de teste e aguardar sua execução
    const produtoId = await this.sqliteService.insert(
      "INSERT INTO produtos (codigoBarras, descricao, valorUnitario, unidade, imagem) VALUES (?, ?, ?, ?, ?)",
      ["1234567890123", "Produto Teste", 99.90, "UN", "./assets/img_padrao.png"]
    );
  
    console.log(`O Produto inserido com sucesso! ID: ${produtoId}`);
  
    // Buscar todos os produtos
    const produtos = await this.sqliteService.select<any>(
      "SELECT * FROM produtos"
    );
  
    // Transformar os resultados em um array de `Produto`
    const listaProdutos: Produto[] = produtos.map((p) => ({
      id: p.id,
      codigoBarras: p.codigoBarras,
      descricao: p.descricao,
      valorUnitario: p.valorUnitario,
      unidade: p.unidade,
      imagem: p.imagem
    }));
  
    console.log("Os Produtos no banco:", listaProdutos);
  }
   
}