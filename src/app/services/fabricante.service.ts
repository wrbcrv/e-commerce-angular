import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricante } from '../models/fabricante.model';

@Injectable({
  providedIn: 'root'
})

export class FabricanteService {
  private baseUrl: string = 'http://localhost:8080/fabricantes';

  constructor(private http: HttpClient) { }

  create(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(`${this.baseUrl}`, fabricante);
  }

  update(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.put<Fabricante>(`${this.baseUrl}/${fabricante.id}`, fabricante);
  }

  delete(fabricante: Fabricante): Observable<any> {
    return this.http.delete<Fabricante>(`${this.baseUrl}/${fabricante.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Fabricante[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Fabricante[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Fabricante> {
    return this.http.get<Fabricante>(`${this.baseUrl}/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Fabricante[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Fabricante[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByCodigo(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }
}