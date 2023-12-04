import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.interface';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: Item[] = [];
  usuario: any;
  idEndereco: number = 1;

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(items => {
      this.items = items;
    });
    
    this.usuarioService.getLoggedUser().subscribe(data => {
      this.usuario = data;
    });
  }

  finishOrder() {
    this.pedidoService.save(this.items, this.idEndereco).subscribe({
      next: () => {
        this.carrinhoService.removeAll();
      },
      error: (error) => {
        console.log('Erro ao incluir' + JSON.stringify(error));
      }
    });
  }
}