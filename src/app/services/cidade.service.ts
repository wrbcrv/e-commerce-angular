import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cidade } from '../models/cidade.model';

@Injectable({
  providedIn: 'root'
})

export class CidadeService {
  private baseUrl: string = 'http://localhost:8080/cidades';

  constructor(private http: HttpClient) { }

  create(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(`${this.baseUrl}`, cidade);
  }

  update(cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.baseUrl}/${cidade.id}`, cidade);
  }

  delete(cidade: Cidade): Observable<any> {
    return this.http.delete<Cidade>(`${this.baseUrl}/${cidade.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Cidade[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Cidade[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.baseUrl}/${id}`);
  }

  findByNome(nome: string, page: number, pageSize: number): Observable<Cidade[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Cidade[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }
}