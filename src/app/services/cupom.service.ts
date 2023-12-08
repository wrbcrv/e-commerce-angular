import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cupom, Hardware } from '../models/cupom.model';

@Injectable({
  providedIn: 'root'
})

export class CupomService {
  private baseUrl: string = 'http://localhost:8080/cupons';
  private hardwareUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  create(cupom: Cupom): Observable<Cupom> {
    return this.http.post<Cupom>(`${this.baseUrl}`, cupom);
  }

  update(cupom: Cupom): Observable<Cupom> {
    return this.http.put<Cupom>(`${this.baseUrl}/${cupom.id}`, cupom);
  }

  delete(cupom: Cupom): Observable<any> {
    return this.http.delete<Cupom>(`${this.baseUrl}/${cupom.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Cupom[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Cupom[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Cupom> {
    return this.http.get<Cupom>(`${this.baseUrl}/${id}`);
  }

  findByCodigo(codigo: string): Observable<Cupom> {
    return this.http.get<Cupom>(`${this.baseUrl}/search/${codigo}`);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByCodigo(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }

  getHardwares(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>(`${this.hardwareUrl}/hardwares`);
  }

  associateHardware(cupomId: number, hardwareId: number): Observable<Cupom> {
    return this.http.post<Cupom>(
      `${this.baseUrl}/${cupomId}/associate-hardware/${hardwareId}`,
      {}
    );
  }
}