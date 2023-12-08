import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.interface';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  items: Item[] = [];

  constructor(
    private carrinhoService: CarrinhoService,
    private hardwareService: HardwareService,
    private router: Router) { }

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

  increase(item: Item): void {
    this.carrinhoService.increase(item);
  }

  decrease(item: Item): void {
    this.carrinhoService.decrease(item);
  }
}