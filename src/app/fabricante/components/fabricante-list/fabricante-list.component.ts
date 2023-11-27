import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Fabricante } from 'src/app/models/fabricante.model';
import { FabricanteService } from 'src/app/services/fabricante.service';

@Component({
  selector: 'app-fabricante-list',
  templateUrl: './fabricante-list.component.html',
  styleUrls: ['./fabricante-list.component.css']
})
export class FabricanteListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'site-column', 'acoes-column'];
  fabricantes: Fabricante[] = [];
  totalRegistros = 0;
  pageSize = 2;
  page = 0;
  filtro: string = '';

  constructor(private fabricanteService: FabricanteService) { }

  ngOnInit(): void {
    this.carregarFabricantes();
    this.carregarTotalRegistros();
  }

  carregarFabricantes() {
    if (this.filtro) {
      this.fabricanteService.findByNome(this.filtro, this.page, this.pageSize).subscribe(data => {
        this.fabricantes = data;
      });
    } else {
      this.fabricanteService.findAll(this.page, this.pageSize).subscribe(data => {
        this.fabricantes = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.fabricanteService.countByCodigo(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.fabricanteService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarFabricantes();
  }

  aplicarFiltro() {
    this.carregarFabricantes();
    this.carregarTotalRegistros();
  }

  excluirFabricante(fabricante: Fabricante): void {
    if (confirm(`Deseja realmente excluir o fabricante ${fabricante.nome}?`)) {
      this.fabricanteService.delete(fabricante).subscribe({
        next: () => {
          console.log('Fabricante excluído com sucesso');
          this.carregarFabricantes();
        },
        error: (err) => {
          console.log('Erro ao excluir fabricante: ' + JSON.stringify(err));
        },
      });
    }
  }
}