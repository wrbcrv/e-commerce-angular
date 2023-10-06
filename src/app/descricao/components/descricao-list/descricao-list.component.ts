import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Descricao } from 'src/app/models/descricao.model';
import { DescricaoService } from 'src/app/services/descricao.service';

@Component({
  selector: 'app-descricao-list',
  templateUrl: './descricao-list.component.html',
  styleUrls: ['./descricao-list.component.css']
})
export class DescricaoListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'hardware-column', 'conteudo-column', 'acoes-column'];
  descricoes: Descricao[] = [];
  totalRegistros = 0;
  pageSize = 2;
  page = 0;
  filtro: string = '';

  constructor(private descricaoService: DescricaoService) { }

  ngOnInit(): void {
    this.carregarDescricoes();
    this.carregarTotalRegistros();
  }

  carregarDescricoes() {
    if (this.filtro) {
      this.descricaoService.findByNome(this.filtro, this.page, this.pageSize).subscribe(data => {
        this.descricoes = data;
      });
    } else {
      this.descricaoService.findAll(this.page, this.pageSize).subscribe(data => {
        this.descricoes = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.descricaoService.countByConteudo(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.descricaoService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarDescricoes();
  }

  aplicarFiltro() {
    this.carregarDescricoes();
    this.carregarTotalRegistros();
  }

  excluirDescricao(descricao: Descricao): void {
    if (confirm(`Deseja realmente excluir o descricao ${descricao.conteudo}?`)) {
      this.descricaoService.delete(descricao).subscribe({
        next: () => {
          console.log('Descricao excluído com sucesso');
          this.carregarDescricoes();
        },
        error: (err) => {
          console.log('Erro ao excluir descricao: ' + JSON.stringify(err));
        },
      });
    }
  } 
}