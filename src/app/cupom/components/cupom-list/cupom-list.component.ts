import { Component, OnInit } from '@angular/core';
import { Cupom } from 'src/app/models/cupom.model';
import { CupomService } from 'src/app/services/cupom.service';

@Component({
  selector: 'app-cupom-list',
  templateUrl: './cupom-list.component.html',
  styleUrls: ['./cupom-list.component.css']
})
export class CupomListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'descricao-column', 'codigo-column', 'inicio-column', 'termino-column', 'desconto-column'];
  cupons: Cupom[] = [];

  constructor(private cupomService: CupomService) { }

  ngOnInit(): void {
    this.cupomService.findAll().subscribe(data => {
      this.cupons = data;
    });
  }
}