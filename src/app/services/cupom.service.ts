import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cupom } from '../models/cupom.model';

@Injectable({
  providedIn: 'root'
})

export class CupomService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Cupom[]> {
    return this.http.get<Cupom[]>(`${this.baseURL}/cupons`);
  }

  findById(id: string): Observable<Cupom> {
    return this.http.get<Cupom>(`${this.baseURL}/cupons/${id}`);
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
}