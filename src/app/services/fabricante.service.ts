import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fabricante } from '../models/fabricante.model';

@Injectable({
  providedIn: 'root'
})

export class FabricanteService {
  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findAll(page: number, pageSize: number): Observable<Fabricante[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Fabricante[]>(`${this.baseURL}/fabricantes`, { params });
  }

  findById(id: string): Observable<Fabricante> {
    return this.http.get<Fabricante>(`${this.baseURL}/fabricantes/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Fabricante[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Fabricante[]>(`${this.baseURL}/fabricantes/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/fabricantes/count`);
  }

  countByCodigo(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/fabricantes/search/${nome}/count`);
  }

  save(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.post<Fabricante>(`${this.baseURL}/fabricantes`, fabricante);
  }

  update(fabricante: Fabricante): Observable<Fabricante> {
    return this.http.put<Fabricante>(`${this.baseURL}/fabricantes/${fabricante.id}`, fabricante);
  }

  delete(fabricante: Fabricante): Observable<any> {
    return this.http.delete<Fabricante>(`${this.baseURL}/fabricantes/${fabricante.id}`);
  }
}