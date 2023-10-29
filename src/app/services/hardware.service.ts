import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hardware } from '../models/hardware.model';

@Injectable({
  providedIn: 'root'
})

export class HardwareService {
  private baseUrl: string = 'http://localhost:8080/hardwares';

  constructor(private http: HttpClient) { }

  create(hardware: Hardware): Observable<Hardware> {
    return this.http.post<Hardware>(`${this.baseUrl}`, hardware);
  }

  update(hardware: Hardware): Observable<Hardware> {
    return this.http.put<Hardware>(`${this.baseUrl}/${hardware.id}`, hardware);
  }

  delete(hardware: Hardware): Observable<any> {
    return this.http.delete<Hardware>(`${this.baseUrl}/${hardware.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Hardware[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Hardware[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Hardware> {
    return this.http.get<Hardware>(`${this.baseUrl}/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Hardware[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Hardware[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }
}