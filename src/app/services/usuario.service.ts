import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Telefone, Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseURL: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  findAll(page: number, pageSize: number): Observable<Usuario[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios`, { params });
  }

  findById(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/usuarios/${id}`);
  }

  findByNome(nome: string, page: number, pageSize: number): Observable<Usuario[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Usuario[]>(`${this.baseURL}/usuarios/search/${nome}`, { params });
  }

  save(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.baseURL}/usuarios`, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseURL}/usuarios/${usuario.id}`, usuario);
  }

  delete(usuario: Usuario): Observable<any> {
    return this.http.delete<Usuario>(`${this.baseURL}/usuarios/${usuario.id}`);
  }

  deletarTelefone(usuarioId: number, telefoneId: number): Observable<any> {
    const url = `${this.baseURL}/usuarios/${usuarioId}/telefones/${telefoneId}`;
    return this.http.delete(url);
  }

  deletarEndereco(usuarioId: number, enderecoId: number) {
    const url = `${this.baseURL}/usuarios/${usuarioId}/enderecos/${enderecoId}`;
    return this.http.delete(url);
  }

  count(): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/usuarios/count`);
  }

  countByNome(nome: string): Observable<number> {
    return this.http.get<number>(`${this.baseURL}/usuarios/search/${nome}/count`);
  }
}