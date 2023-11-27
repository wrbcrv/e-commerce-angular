import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Cupom } from 'src/app/models/cupom.model';
import { CupomService } from 'src/app/services/cupom.service';

@Component({
  selector: 'app-cupom-list',
  templateUrl: './cupom-list.component.html',
  styleUrls: ['./cupom-list.component.css']
})
export class CupomListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'descricao-column', 'codigo-column', 'inicio-column', 'termino-column', 'desconto-column', 'hardwares-column', 'acoes-column'];
  cupons: Cupom[] = [];
  totalRegistros = 0;
  pageSize = 2;
  pagina = 0;
  filtro: string = '';

  constructor(private cupomService: CupomService) { }

  ngOnInit(): void {
    this.carregarCupons();
    this.carregarTotalRegistros();
  }

  carregarCupons() {
    if (this.filtro) {
      this.cupomService.findByNome(this.filtro, this.pagina, this.pageSize).subscribe(data => {
        this.cupons = data;
      });
    } else {
      this.cupomService.findAll(this.pagina, this.pageSize).subscribe(data => {
        this.cupons = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.cupomService.countByCodigo(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.cupomService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.pagina = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarCupons();
  }

  aplicarFiltro() {
    this.carregarCupons();
    this.carregarTotalRegistros();
  }

  excluirCupom(cupom: Cupom): void {
    if (confirm(`Deseja realmente excluir o cupom ${cupom.descricao}?`)) {
      this.cupomService.delete(cupom).subscribe({
        next: () => {
          console.log('Cupom excluído com sucesso');
          this.carregarCupons();
        },
        error: (err) => {
          console.log('Erro ao excluir cupom: ' + JSON.stringify(err));
        },
      });
    }
  }
}