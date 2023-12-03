import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.interface';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router,
    private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(items => {
      this.items = items;
    });
  }

  removeItem(item: Item): void {
    this.carrinhoService.remove(item);
  }

  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }

  finishOrder() {
    this.pedidoService.save(this.items).subscribe({
      next: () => {
        this.carrinhoService.removeAll();
      },
      error: (error) => {
        console.log('Erro ao incluir' + JSON.stringify(error));
      }
     })
  }
}