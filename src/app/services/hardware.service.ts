import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hardware } from '../models/hardware.model';

@Injectable({
  providedIn: 'root'
})

export class HardwareService {
  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findAll(page: number, pageSize: number): Observable<Hardware[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Hardware[]>(`${this.baseURL}/hardwares`, { params });
  }

  findById(id: string): Observable<Hardware> {
    return this.http.get<Hardware>(`${this.baseURL}/hardwares/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Hardware[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Hardware[]>(`${this.baseURL}/hardwares/search/${nome}`, { params });
  }

  save(hardware: Hardware): Observable<Hardware> {
    const obj = {
      idMarca: hardware.marca.id,
      nome: hardware.nome,
      preco: hardware.preco,
      estoque: hardware.estoque,
      modelo: hardware.modelo,
      lancamento: hardware.lancamento
    }

    return this.http.post<Hardware>(`${this.baseURL}/hardwares`, obj);
  }

  update(hardware: Hardware): Observable<Hardware> {
    const obj = {
      idMarca: hardware.marca.id,
      nome: hardware.nome,
      preco: hardware.preco,
      estoque: hardware.estoque,
      modelo: hardware.modelo,
      lancamento: hardware.lancamento
    }

    return this.http.put<Hardware>(`${this.baseURL}/hardwares/${hardware.id}`, obj);
  }

  delete(hardware: Hardware): Observable<any> {
    return this.http.delete<Hardware>(`${this.baseURL}/hardwares/${hardware.id}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/hardwares/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/hardwares/search/${nome}/count`);
  }
}