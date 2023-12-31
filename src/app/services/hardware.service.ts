import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Hardware } from '../models/hardware.model';
import { Categoria } from '../models/categoria.model';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class HardwareService {
  private baseUrl: string = 'http://localhost:8080/hardwares';

  constructor(private http: HttpClient) { }

  create(hardware: Hardware): Observable<Hardware> {
    const obj = {
      idMarca: hardware.marca.id,
      nome: hardware.nome,
      preco: hardware.preco,
      estoque: hardware.estoque,
      modelo: hardware.modelo,
      idFabricante: hardware.fabricante.id,
      lancamento: hardware.lancamento,
      idCategoria: hardware.categoria.id,
      idStatus: hardware.status.id,
      descricao: hardware.descricao
    }

    return this.http.post<Hardware>(`${this.baseUrl}`, obj);
  }

  update(hardware: Hardware): Observable<Hardware> {
    const obj = {
      idMarca: hardware.marca.id,
      nome: hardware.nome,
      preco: hardware.preco,
      estoque: hardware.estoque,
      modelo: hardware.modelo,
      idFabricante: hardware.fabricante.id,
      lancamento: hardware.lancamento,
      idCategoria: hardware.categoria.id,
      idStatus: hardware.status.id,
      descricao: hardware.descricao
    }

    return this.http.put<Hardware>(`${this.baseUrl}/${hardware.id}`, obj);
  }

  delete(hardware: Hardware): Observable<any> {
    return this.http.delete<Hardware>(`${this.baseUrl}/${hardware.id}`);
  }

  findAll(page: number, pageSize: number): Observable<Hardware[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Hardware[]>(`${this.baseUrl}`, { params });
  }

  findById(id: string): Observable<Hardware> {
    return this.http.get<Hardware>(`${this.baseUrl}/${id}`);
  }


  findByNome(nome: string, page: number, pageSize: number): Observable<Hardware[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Hardware[]>(`${this.baseUrl}/search/${nome}`, { params });
  }

  findByModelo(modelo: string, page: number, pageSize: number): Observable<Hardware[]> {
    const params = {
      page: page.toString(),
      pageSize: pageSize.toString()
    }

    return this.http.get<Hardware[]>(`${this.baseUrl}/search/${modelo}`, { params });
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

    return this.http.patch<Hardware>(`${this.baseUrl}/image/upload`, formData);
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorias`);
  }

  getStatus(): Observable<Status[]> {
    return this.http.get<Status[]>(`${this.baseUrl}/status`);
  }

  generatePdfReports(filter: string): Observable<Blob> {
    const url = `${this.baseUrl}/relatorios?filter=${filter}`;
    const headers = new HttpHeaders({
      'Content-Disposition': 'application/pdf',
      'Accept': 'application/pdf'
    });

    return this.http.get(url, { responseType: 'blob', headers });
  }
}