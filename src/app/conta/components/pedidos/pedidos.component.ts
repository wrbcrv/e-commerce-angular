import { Component, OnInit } from '@angular/core';
import { CupomService } from 'src/app/services/cupom.service';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: any;

  constructor(
    private pedidoService: PedidoService,
    private cupomService: CupomService) { }

  ngOnInit(): void {
    this.pedidoService.get().subscribe(data => {
      this.pedidos = data;
      console.log(this.pedidos)
    });
  }
}