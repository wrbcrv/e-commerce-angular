import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Descricao } from '../models/descricao.model';

@Injectable({
  providedIn: 'root'
})

export class DescricaoService {
  private baseUrl: string = 'http://localhost:8080/descricoes';

  constructor(private http: HttpClient) { }

  create(descricao: Descricao): Observable<Descricao> {
    return this.http.post<Descricao>(`${this.baseUrl}`, descricao);
  }

  update(descricao: Descricao): Observable<Descricao> {
    return this.http.put<Descricao>(`${this.baseUrl}/${descricao.id}`, descricao);
  }

  delete(descricao: Descricao): Observable<any> {
    return this.http.delete<Descricao>(`${this.baseUrl}/${descricao.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Descricao[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Descricao[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Descricao> {
    return this.http.get<Descricao>(`${this.baseUrl}/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Descricao[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Descricao[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByConteudo(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }
}