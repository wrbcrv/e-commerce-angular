import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';

@Injectable({
    providedIn: 'root'
})

export class MarcaService {
    private baseURL: string = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    findAll(): Observable<Marca[]> {
        return this.http.get<Marca[]>(`${this.baseURL}/marcas`);
    }

    findById(id: string): Observable<Marca> {
        return this.http.get<Marca>(`${this.baseURL}/marcas/${id}`);
    }

    save(marca: Marca): Observable<Marca> {
        return this.http.post<Marca>(`${this.baseURL}/marcas`, marca);
    }

    update(marca: Marca): Observable<Marca> {
        return this.http.put<Marca>(`${this.baseURL}/marcas/${marca.id}`, marca);
    }

    delete(marca: Marca): Observable<any> {
        return this.http.delete<Marca>(`${this.baseURL}/marcas/${marca.id}`);
    }
}