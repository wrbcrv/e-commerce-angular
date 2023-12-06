import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {
  usuario: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser().subscribe(data => {
      this.usuario = data;
    });
  }

  deleteEndereco(usuarioId: number, enderecoId: number): void {
    this.usuarioService.deletarEndereco(usuarioId, enderecoId).subscribe({
      next:
        (response) => {
          console.log('Endereço deletado com sucesso: ', response)
          location.reload();
        },
      error:
        (error) => {
          console.warn('Erro ao deletar endereço: ', error);
        }
    });
  }
}