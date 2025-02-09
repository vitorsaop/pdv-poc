import { Component, ChangeDetectorRef, HostListener} from '@angular/core';
import { VendaService } from '../services/venda.service';
import { Produto } from '../models/produto.model';

interface ItemCarrinho {
    produto: Produto;
    quantidade: number;
}

@Component({
    selector: 'app-venda',
    templateUrl: './venda.component.html',
    styleUrls: ['./venda.component.css']
})
export class VendaComponent {
    codigoBarras: string = '';
    carrinho: ItemCarrinho[] = [];
    produtoSelecionado: Produto | null = null;

    constructor(private vendaService: VendaService, private cdr: ChangeDetectorRef) { }

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        switch (event.key) {
        case "F10":
            event.preventDefault(); 
            this.encerrarVenda();
            break;
        case "F2":
            event.preventDefault();
            alert("Consulta de item (F2) acionada!");
            break;
        case "F3":
            event.preventDefault();
            console.log("F3 clicado!");
            break;
        default:
            break;
        }
    }

    adicionarProduto() {
        if (!this.codigoBarras.trim()) {
            alert('Digite um código de barras!');
            return;
        }

        this.vendaService.buscarProdutoPorCodigo(this.codigoBarras).subscribe(produto => {
            if (produto) {
              let itemNoCarrinho = this.carrinho.find(item => item.produto.codigoBarras === produto.codigoBarras);
              if (itemNoCarrinho) {
                itemNoCarrinho.quantidade++;
              } else {
                this.carrinho.push({ produto, quantidade: 1 });
              }
              this.produtoSelecionado = produto;
            } else {
              alert('Produto não encontrado!');
            }
      
            this.codigoBarras = '';
          });
        
    }

    removerProduto(codigoBarras: string) {
        this.carrinho = this.carrinho.filter(item => item.produto.codigoBarras !== codigoBarras);
    }

    calcularTotal(): number {
        return this.carrinho.reduce((total, item) => total + (item.produto.valorUnitario * item.quantidade), 0);
    }

    selecionarProduto(produto: Produto) {
        this.produtoSelecionado = produto;
    }    

  /** Finaliza a venda e salva no IndexedDB */
  async encerrarVenda() {
    
    console.log("Botão F10 clicado! Encerrando venda...");

    if (this.carrinho.length === 0) {
      alert("O carrinho está vazio!");
      return;
    }

    const total = this.calcularTotal();
    const produtosVendidos = this.carrinho.map(item => ({
      ...item.produto,
      quantidade: item.quantidade
    }));

    await this.vendaService.registrarVenda(produtosVendidos, total);

    this.limparTela();
  }    

  limparTela() {
    this.carrinho = [];
    this.produtoSelecionado = null;
    this.codigoBarras = '';

    this.cdr.detectChanges(); // Força a atualização da tela
    
  }

}