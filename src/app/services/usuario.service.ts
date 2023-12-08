import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endereco, Telefone, Usuario } from '../models/usuario.model';
import { Perfil } from '../models/perfil.modal';
import { Cartao } from '../models/cartao.model';
import { Tipo } from '../models/tipo.model';

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
    const obj = {
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      cpf: usuario.cpf,
      rg: usuario.rg,
      login: usuario.login,
      senha: usuario.senha,
      idPerfil: usuario.perfil.id
    }

    return this.http.put<Usuario>(`${this.baseUrl}/${usuario.id}`, obj);
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

  findEnderecoByUsuarioId(usuarioId: string, enderecoId: string): Observable<Endereco> {
    return this.http.get<Endereco>(`${this.baseUrl}/${usuarioId}/enderecos/${enderecoId}`);
  }

  createEnderecos(usuarioId: number, enderecos: Endereco[]): Observable<Endereco[]> {
    const object = enderecos.map(endereco => ({
      nome: endereco.nome,
      sobrenome: endereco.sobrenome,
      cep: endereco.cep,
      endereco: endereco.endereco,
      numero: endereco.numero,
      bairro: endereco.bairro,
      complemento: endereco.complemento,
      cidade: endereco.cidade,
      telefone: endereco.telefone
    }))

    return this.http.post<Endereco[]>(`${this.baseUrl}/${usuarioId}/enderecos`, object);
  }

  updateEnderecos(usuarioId: number, enderecoId: number, endereco: Endereco): Observable<Endereco[]> {
    const object = {
      nome: endereco.nome,
      sobrenome: endereco.sobrenome,
      cep: endereco.cep,
      endereco: endereco.endereco,
      numero: endereco.numero,
      bairro: endereco.bairro,
      complemento: endereco.complemento,
      cidade: endereco.cidade,
      telefone: endereco.telefone
    };

    return this.http.put<Endereco[]>(`${this.baseUrl}/${usuarioId}/enderecos/${enderecoId}`, object);
  }

  deletarEndereco(usuarioId: number, enderecoId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${usuarioId}/enderecos/${enderecoId}`);
  }

  createCartao(usuarioId: number, cartao: Cartao[]): Observable<Cartao[]> {
    const object = cartao.map(cartao => ({
      idTipo: cartao.tipo.id,
      numero: cartao.numero,
      cvv: cartao.cvv,
      validade: cartao.validade,
      titular: cartao.titular,
      cpf: cartao.cpf
    }));

    return this.http.post<Cartao[]>(`${this.baseUrl}/${usuarioId}/cartoes`, object);
  }

  updateCartao(usuarioId: number, cartaoId: number, cartao: Cartao): Observable<Cartao[]> {
    const object = {
      idTipo: cartao.tipo.id,
      numero: cartao.numero,
      cvv: cartao.cvv,
      validade: cartao.validade,
      titular: cartao.titular,
      cpf: cartao.cpf
    };

    return this.http.put<Cartao[]>(`${this.baseUrl}/${usuarioId}/enderecos/${cartaoId}`, object);
  }

  deletarCartao(usuarioId: number, cartaoId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${usuarioId}/cartoes/${cartaoId}`);
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

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.baseUrl}/tipos`)
  }

  getLoggedUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.get(`${this.baseUrl}`.replace('usuarios', 'logged'), { headers });
  }
}