import { Component, OnInit } from '@angular/core';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {
  usuario: any;
  pedidos: any;
  cartoes: any;

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser().subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      }
    });

    this.pedidoService.get().subscribe({
      next: (data) => {
        this.pedidos = data;
        console.log(this.pedidos)
      }
    })
  }

  getImageUrl(imageName: string): string {
    return this.usuarioService.getImageUrl(imageName);
  }
}