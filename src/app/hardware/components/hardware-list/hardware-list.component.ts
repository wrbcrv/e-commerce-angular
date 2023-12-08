import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Hardware } from 'src/app/models/hardware.model';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.css']
})
export class HardwareListComponent implements OnInit {

  tableColumns: string[] = [
    'id-column',
    'marca-column',
    'nome-column',
    'preco-column',
    'estoque-column',
    'modelo-column',
    'fabricante-column',
    'lancamento-column',
    'categoria-column',
    'status-column',
    'descricao-column',
    'acoes-column'
  ];
  hardwares: Hardware[] = [];
  totalRegistros = 0;
  pageSize = 2;
  page = 0;
  filter: string = '';
  pdfData: any;

  constructor(private hardwareService: HardwareService) { }

  ngOnInit(): void {
    this.carregarHardwares();
    this.carregarTotalRegistros();
  }

  carregarHardwares() {
    if (this.filter) {
      this.hardwareService.findByNome(this.filter, this.page, this.pageSize).subscribe(data => {
        this.hardwares = data;
      });
    } else {
      this.hardwareService.findAll(this.page, this.pageSize).subscribe(data => {
        this.hardwares = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filter) {
      this.hardwareService.countByNome(this.filter).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.hardwareService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarHardwares();
  }

  aplicarFiltro() {
    this.carregarHardwares();
    this.carregarTotalRegistros();
  }

  excluirHardware(hardware: Hardware): void {
    if (confirm(`Deseja realmente excluir o hardware ${hardware.nome}?`)) {
      this.hardwareService.delete(hardware).subscribe({
        next: () => {
          console.log('Hardware excluído com sucesso');
          this.carregarHardwares();
        },
        error: (err) => {
          console.log('Erro ao excluir hardware: ' + JSON.stringify(err));
        },
      });
    }
  }

  abrirRelatorioPDF(): void {
    const filter = this.filter;
    
    this.hardwareService.generatePdfReports(filter).subscribe((data: Blob) => {
      const file = new Blob([data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, '_blank');
    });
  }
}