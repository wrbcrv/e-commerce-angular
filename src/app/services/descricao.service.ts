import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Descricao } from '../models/descricao.model';

@Injectable({
  providedIn: 'root'
})

export class DescricaoService {
  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findAll(page: number, pageSize: number): Observable<Descricao[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Descricao[]>(`${this.baseURL}/descricoes`, { params });
  }

  findById(id: string): Observable<Descricao> {
    return this.http.get<Descricao>(`${this.baseURL}/descricoes/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Descricao[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Descricao[]>(`${this.baseURL}/descricoes/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/descricoes/count`);
  }

  countByConteudo(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/descricoes/search/${nome}/count`);
  }

  save(descricao: Descricao): Observable<Descricao> {
    const obj = {
      idHardware: descricao.hardware.id,
      conteudo: descricao.conteudo
    }

    return this.http.post<Descricao>(`${this.baseURL}/descricoes`, obj);
  }

  update(descricao: Descricao): Observable<Descricao> {
    const obj = {
      idHardware: descricao.hardware.id,
      conteudo: descricao.conteudo
    }

    return this.http.put<Descricao>(`${this.baseURL}/descricoes/${descricao.id}`, obj);
  }

  delete(descricao: Descricao): Observable<any> {
    return this.http.delete<Descricao>(`${this.baseURL}/descricoes/${descricao.id}`);
  }
}