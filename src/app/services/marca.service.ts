import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';

@Injectable({
    providedIn: 'root'
})

export class MarcaService {
    private baseUrl: string = 'http://localhost:8080/marcas';

    constructor(private http: HttpClient) { }

    create(marca: Marca): Observable<Marca> {
        return this.http.post<Marca>(`${this.baseUrl}`, marca);
    }

    update(marca: Marca): Observable<Marca> {
        return this.http.put<Marca>(`${this.baseUrl}/${marca.id}`, marca);
    }

    delete(marca: Marca): Observable<any> {
        return this.http.delete<Marca>(`${this.baseUrl}/${marca.id}`);
    }

    findAll(page: number, pageSize: number): Observable<Marca[]> {
        const params = {
            page: page.toString(),
            pageSize: pageSize.toString()
        }

        return this.http.get<Marca[]>(`${this.baseUrl}`, { params });
    }

    findById(id: string): Observable<Marca> {
        return this.http.get<Marca>(`${this.baseUrl}/${id}`);
    }

    findByNome(nome: string, page: number, pageSize: number): Observable<Marca[]> {
        const params = {
            page: page.toString(),
            pageSize: pageSize.toString()
        }

        return this.http.get<Marca[]>(`${this.baseUrl}/search/${nome}`, { params });
    }

    count(): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/count`);
    }

    countByNome(nome: string): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
    }
}