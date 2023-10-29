import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from '../models/estado.model';

@Injectable({
  providedIn: 'root'
})

export class EstadoService {
  private baseUrl: string = 'http://localhost:8080/estados';

  constructor(private http: HttpClient) { }

  create(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(`${this.baseUrl}`, estado);
  }

  update(estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(`${this.baseUrl}/${estado.id}`, estado);
  }

  delete(estado: Estado): Observable<any> {
    return this.http.delete<Estado>(`${this.baseUrl}/${estado.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Estado[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Estado[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Estado> {
    return this.http.get<Estado>(`${this.baseUrl}/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Estado[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Estado[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByCodigo(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }
}