import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';
import { Hardware } from '../models/hardware.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private baseUrl: string = 'http://localhost:8080/fornecedores';
  private hardwareUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.baseUrl}`, fornecedor);
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.baseUrl}/${fornecedor.id}`, fornecedor);
  }

  delete(fornecedor: Fornecedor): Observable<any> {
    return this.http.delete<Fornecedor>(`${this.baseUrl}/${fornecedor.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Fornecedor[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Fornecedor[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseUrl}/${id}`);
  }

  findByNome(nome: string, page: number, pageSize: number): Observable<Fornecedor[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Fornecedor[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  deletarEndereco(fornecedorId: number, enderecoId: number) {
    const url = `${this.baseUrl}/${fornecedorId}/enderecos/${enderecoId}`;
    return this.http.delete(url);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }

  getHardwares(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>(`${this.hardwareUrl}/hardwares`);
  }

  associateHardware(fornecedorId: number, hardwareId: number): Observable<Hardware> {
    return this.http.post<Hardware>(
      `${this.baseUrl}/${fornecedorId}/associate-hardware/${hardwareId}`,
      {}
    );
  }
}