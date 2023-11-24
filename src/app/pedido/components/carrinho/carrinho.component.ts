import { Component, OnInit } from '@angular/core';
import { CarrinhoService, Item } from 'src/app/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itens: Item[] = [];

  constructor(private carrinhoService: CarrinhoService) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.itens = itens;
    });
  }

  removeItem(item: Item): void {
    this.carrinhoService.remove(item);
  }

  calculateTotal(): number {
    return this.itens.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }
}