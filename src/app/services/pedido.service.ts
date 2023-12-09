import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';
import { Cupom } from '../models/cupom.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl: string = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) { }

  get(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}`)
  }

  save(carrinho: Item[], idEndereco: string, idCartao: number, cupons: Cupom[]): Observable<Item> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idHardware: item.id
    }));

    const cuponsObject = cupons.map(cupom => ({
      codigo: cupom.codigo,
      descricao: cupom.descricao,
      inicio: cupom.inicio,
      termino: cupom.termino,
      desconto: cupom.desconto
    }));

    const produtos = {
      itens: itens,
      idEndereco: idEndereco,
      idCartao: idCartao,
      cupons: cuponsObject
    };

    return this.http.post<any>(`${this.baseUrl}`, produtos);
  }
}