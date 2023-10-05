import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cupom, Hardware } from '../models/cupom.model';

@Injectable({
  providedIn: 'root'
})

export class CupomService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(page: number, pageSize: number): Observable<Cupom[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Cupom[]>(`${this.baseURL}/cupons`, {params});
  }

  findById(id: string): Observable<Cupom> {
    return this.http.get<Cupom>(`${this.baseURL}/cupons/${id}`);
  }

  findByNome(nome: string, page: number, pageSize: number): Observable<Cupom[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }
    
    return this.http.get<Cupom[]>(`${this.baseURL}/cupons/search/${nome}`, {params});
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/count`);
  }

  countByCodigo(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/cupons/search/${nome}/count`);
  }

  save(cupom: Cupom): Observable<Cupom> {
    return this.http.post<Cupom>(`${this.baseURL}/cupons`, cupom);
  }

  update(cupom: Cupom): Observable<Cupom> {
    return this.http.put<Cupom>(`${this.baseURL}/cupons/${cupom.id}`, cupom );
  }

  delete(cupom: Cupom): Observable<any> {
    return this.http.delete<Cupom>(`${this.baseURL}/cupons/${cupom.id}`);
  }

  getHardwares(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>(`${this.baseURL}/hardwares`);
  }
  
  associateHardware(cupomId: number, hardwareId: number): Observable<Cupom> {
    return this.http.post<Cupom>(
      `${this.baseURL}/cupons/${cupomId}/associar-hardware/${hardwareId}`,
      {}
    );
  }  
}