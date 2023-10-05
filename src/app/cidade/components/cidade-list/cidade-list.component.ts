import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cidade } from 'src/app/models/cidade.model';
import { CidadeService } from 'src/app/services/cidade.service';

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.css']
})
export class CidadeListComponent {

  tableColumns: string[] = ['id-column', 'nome-column', 'estado-column', 'acao-column'];
  cidades: Cidade[] = [];
  totalRegistros = 0;
  pageSize = 2;
  page = 0;
  filtro: string = "";

  constructor(private cidadeService: CidadeService) { }

  ngOnInit(): void {
    this.carregarCidades();
    this.carregarTotalRegistros();
  }

  carregarCidades() {
    if (this.filtro) {
      this.cidadeService.findByNome(this.filtro, this.page, this.pageSize).subscribe(data => {
        this.cidades = data;
      });
    } else {
      this.cidadeService.findAll(this.page, this.pageSize).subscribe(data => {
        this.cidades = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.cidadeService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.cidadeService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarCidades();
  }

  aplicarFiltro() {
    this.carregarCidades();
    this.carregarTotalRegistros();
  }

  excluirCidade(cidade: Cidade): void {
    if (confirm(`Deseja realmente excluir o cidade ${cidade.nome}?`)) {
      this.cidadeService.delete(cidade).subscribe({
        next: () => {
          console.log('Cidade excluído com sucesso');
          this.carregarCidades();
        },
        error: (err) => {
          console.log('Erro ao excluir cidade: ' + JSON.stringify(err));
        },
      });
    }
  }
}