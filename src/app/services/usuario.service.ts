import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Telefone, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl: string = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseUrl}`, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario);
  }

  delete(usuario: Usuario): Observable<any> {
    return this.http.delete<Usuario>(`${this.baseUrl}/${usuario.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Usuario[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Usuario[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  findByNome(nome: string, page: number, pageSize: number): Observable<Usuario[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Usuario[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  deletarTelefone(usuarioId: number, telefoneId: number): Observable<any> {
    const url = `${this.baseUrl}/${usuarioId}/telefones/${telefoneId}`;
    return this.http.delete(url);
  }

  deletarEndereco(usuarioId: number, enderecoId: number) {
    const url = `${this.baseUrl}/${usuarioId}/enderecos/${enderecoId}`;
    return this.http.delete(url);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/search/${nome}/count`);
  }
}