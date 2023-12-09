import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HardwareService } from 'src/app/services/hardware.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  favoritos: any;
  usuario: any;

  constructor(
    private usuarioSevice: UsuarioService,
    private hardwareService: HardwareService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
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
    return this.hardwareService.getImageUrl(imageName);
  }

  deletarFavorito(usuarioId: number, hardwareId: number): void {
    this.usuarioSevice.deleteFavorito(usuarioId, hardwareId).subscribe({
      next: (usuario) => {
        this.openSnackBar('Favorito deletado com sucesso:', 'Ok');
        this.load();

      },
      error: () => {
        this.openSnackBar('Erro ao deletar favorito', 'Ok');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
