import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Telefone, Usuario } from '../models/usuario.model';
import { Perfil } from '../models/perfil.modal';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl: string = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) { }

  create(usuario: Usuario): Observable<Usuario> {
    const obj = {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      cpf: usuario.cpf,
      rg: usuario.rg,
      login: usuario.login,
      senha: usuario.senha,
      idPerfil: usuario.perfil.id
    }

    return this.http.post<Usuario>(`${this.baseUrl}`, obj);
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

  getImageUrl(imageName: string): string {
    return `${this.baseUrl}/image/download/${imageName}`;
  }

  uploadImage(id: number, imageName: string, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('imageName', image.name);
    formData.append('image', image, image.name);

    return this.http.patch<Usuario>(`${this.baseUrl}/image/upload`, formData);
  }

  getPerfis(): Observable<Perfil[]> {
    return this.http.get<Perfil[]>(`${this.baseUrl}/perfis`);
  }

  getLoggedUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}`.replace('usuarios', 'logged'), { headers });
  }
}