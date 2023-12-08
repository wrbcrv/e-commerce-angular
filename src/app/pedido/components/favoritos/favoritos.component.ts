import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: any;
  usuario: any;

  constructor(private usuarioSevice: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioSevice.getLoggedUser().subscribe(data => {
      this.usuario = data;

      const usuarioId = this.usuario.id;

      this.usuarioSevice.getFavoritos(usuarioId).subscribe(
        data => {
          this.favoritos = data;
          console.log('Favoritos:', this.favoritos);
        },
        error => {
          console.error('Erro ao obter favoritos:', error);
        }
      );
    });
  }

  getImageUrl(imageName: string): string {
    return this.usuarioSevice.getImageUrl(imageName);
  }

  deletarFavorito(usuarioId: number, hardwareId: number): void {
    this.usuarioSevice.deleteFavorito(usuarioId, hardwareId).subscribe(
      usuario => {
        console.log('Favorito deletado com sucesso:', usuario);
        window.location.reload();
      },
      error => {
        console.error('Erro ao deletar favorito:', error);
      }
    );
  }
}
