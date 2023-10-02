import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hardware } from '../models/hardware.model';

@Injectable({
  providedIn: 'root'
})

export class HardwareService {
  private baseURL: string =  'http://localhost:8080';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Hardware[]> {
    return this.http.get<Hardware[]>(`${this.baseURL}/hardwares`);
  }

  findById(id: string): Observable<Hardware> {
    return this.http.get<Hardware>(`${this.baseURL}/hardwares/${id}`);
  }

  save(estado: Hardware): Observable<Hardware> {
    return this.http.post<Hardware>(`${this.baseURL}/hardwares`, estado);
  }

  update(estado: Hardware): Observable<Hardware> {
    return this.http.put<Hardware>(`${this.baseURL}/hardwares/${estado.id}`, estado );
  }

  delete(estado: Hardware): Observable<any> {
    return this.http.delete<Hardware>(`${this.baseURL}/hardwares/${estado.id}`);
  }
}