import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltragemService {
  private filtroSubject = new BehaviorSubject<string>('');
  filtro$ = this.filtroSubject.asObservable();

  private paginaSubject = new BehaviorSubject<number>(0);
  pagina$ = this.paginaSubject.asObservable();

  private pageSizeSubject = new BehaviorSubject<number>(16);
  pageSize$ = this.pageSizeSubject.asObservable();

  setFiltro(filtro: string) {
    this.filtroSubject.next(filtro);
  }

  setPagina(pagina: number) {
    this.paginaSubject.next(pagina);
  }

  setPageSize(pageSize: number) {
    this.pageSizeSubject.next(pageSize);
  }
}