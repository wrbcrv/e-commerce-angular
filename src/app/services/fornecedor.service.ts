import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../models/fornecedor.model';
import { Hardware } from '../models/hardware.model';

@Injectable({
    providedIn: 'root'
})
export class FornecedorService {
    private baseURL: string = 'http://localhost:8080';

    constructor(private http: HttpClient) { }

    findAll(page: number, pageSize: number): Observable<Fornecedor[]> {
        const params = {
            page: page.toString(),
            pageSize: pageSize.toString()
        }

        return this.http.get<Fornecedor[]>(`${this.baseURL}/fornecedores`, { params });
    }

    findById(id: string): Observable<Fornecedor> {
        return this.http.get<Fornecedor>(`${this.baseURL}/fornecedores/${id}`);
    }

    findByNome(nome: string, page: number, pageSize: number): Observable<Fornecedor[]> {
        const params = {
            page: page.toString(),
            pageSize: pageSize.toString()
        }

        return this.http.get<Fornecedor[]>(`${this.baseURL}/fornecedores/search/${nome}`, { params });
    }

    save(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.http.post<Fornecedor>(`${this.baseURL}/fornecedores`, fornecedor);
    }

    update(fornecedor: Fornecedor): Observable<Fornecedor> {
        return this.http.put<Fornecedor>(`${this.baseURL}/fornecedores/${fornecedor.id}`, fornecedor);
    }

    delete(fornecedor: Fornecedor): Observable<any> {
        return this.http.delete<Fornecedor>(`${this.baseURL}/fornecedores/${fornecedor.id}`);
    }

    deletarEndereco(fornecedorId: number, enderecoId: number) {
        const url = `${this.baseURL}/fornecedores/${fornecedorId}/enderecos/${enderecoId}`;
        return this.http.delete(url);
    }

    count(): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/fornecedores/count`);
    }

    countByNome(nome: string): Observable<number> {
        return this.http.get<number>(`${this.baseURL}/fornecedores/search/${nome}/count`);
    }

    getHardwares(): Observable<Hardware[]> {
        return this.http.get<Hardware[]>(`${this.baseURL}/hardwares`);
    }

    associateHardware(fornecedorId: number, hardwareId: number): Observable<Hardware> {
        return this.http.post<Hardware>(
            `${this.baseURL}/fornecedores/${fornecedorId}/associar-hardware/${hardwareId}`,
            {}
        );
    }
}