import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Estado } from 'src/app/models/estado.model';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css']
})
export class EstadoListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'sigla-column', 'acoes-column'];
  estados: Estado[] = [];
  totalRegistros = 0;
  pageSize = 2;
  page = 0;
  filtro: string = '';

  constructor(private estadoService: EstadoService) { }

  ngOnInit(): void {
    this.carregarEstados();
    this.carregarTotalRegistros();
  }

  carregarEstados() {
    if (this.filtro) {
      this.estadoService.findByNome(this.filtro, this.page, this.pageSize).subscribe(data => {
        this.estados = data;
      });
    } else {
      this.estadoService.findAll(this.page, this.pageSize).subscribe(data => {
        this.estados = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.estadoService.countByCodigo(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.estadoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarEstados();
  }

  aplicarFiltro() {
    this.carregarEstados();
    this.carregarTotalRegistros();
  }

  excluirEstado(estado: Estado): void {
    if (confirm(`Deseja realmente excluir o estado ${estado.nome}?`)) {
      this.estadoService.delete(estado).subscribe({
        next: () => {
          console.log('Estado excluído com sucesso');
          this.carregarEstados();
        },
        error: (err) => {
          console.log('Erro ao excluir estado: ' + JSON.stringify(err));
        },
      });
    }
  }
}