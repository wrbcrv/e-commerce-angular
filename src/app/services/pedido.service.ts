import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';
import { Item } from '../models/item.interface';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private baseUrl: string =  'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}
  
  get(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}`)
  }

  save(carrinho: Item[] ): Observable<Item> {
    const itens = carrinho.map(item => ({
      quantidade: item.quantidade,
      preco: item.preco,
      idHardware: item.id
    }));

    const produtos = {
      itens: itens
    };

    return this.http.post<any>(`${this.baseUrl}`, produtos);
  }
}