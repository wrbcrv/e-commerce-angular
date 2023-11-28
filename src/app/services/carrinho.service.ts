import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { LocalStorageService } from './local-storage-service';

export interface Item {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private carrinhoSubject = new BehaviorSubject<Item[]>([]);
  carrinho$ = this.carrinhoSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) {
    const storedCarrinho = localStorageService.getItem('carrinho') || [];
    this.carrinhoSubject.next(storedCarrinho);
  }

  add(hardware: Item): void {
    const currentCarrinho = this.carrinhoSubject.value;
    const existingItem = currentCarrinho.find(item => item.id === hardware.id);

    if (existingItem)
      existingItem.quantidade += hardware.quantidade || 1;
    else
      currentCarrinho.push({ ...hardware });

    this.carrinhoSubject.next(currentCarrinho);
    this.updateLocalStorage()
  }

  remove(item: Item): void {
    const currentCarrinho = this.carrinhoSubject.value;
    const upadatedCarrinho = currentCarrinho.filter(carrinhoItem => carrinhoItem !== item);

    this.carrinhoSubject.next(upadatedCarrinho);
    this.updateLocalStorage();
  }

  get(): Item[] {
    return this.carrinhoSubject.value;
  }

  private updateLocalStorage(): void {
    localStorage.setItem('carrinho', JSON.stringify(this.carrinhoSubject.value));
  }
}