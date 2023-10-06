import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Fornecedor } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.css']
})
export class FornecedorListComponent {

  tableColumns: string[] = ['id-column', 'nome-column', 'endereco-column', 'hardwares-column', 'acoes-column'];
  fornecedores: Fornecedor[] = [];
  totalRegistros = 0;
  pageSize = 2;
  page = 0;
  filtro: string = "";

  constructor(private fornecedorService: FornecedorService) { }

  ngOnInit(): void {
    this.carregarFornecedors();
    this.carregarTotalRegistros();
  }

  carregarFornecedors() {
    if (this.filtro) {
      this.fornecedorService.findByNome(this.filtro, this.page, this.pageSize).subscribe(data => {
        this.fornecedores = data;
      });
    } else {
      this.fornecedorService.findAll(this.page, this.pageSize).subscribe(data => {
        this.fornecedores = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.fornecedorService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.fornecedorService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarFornecedors();
  }

  aplicarFiltro() {
    this.carregarFornecedors();
    this.carregarTotalRegistros();
  }

  excluirFornecedor(fornecedor: Fornecedor): void {
    if (confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nome}?`)) {
      this.fornecedorService.delete(fornecedor).subscribe({
        next: () => {
          console.log('Fornecedor excluído com sucesso');
          this.carregarFornecedors();
        },
        error: (err) => {
          console.log('Erro ao excluir fornecedor: ' + JSON.stringify(err));
        },
      });
    }
  }
} 