import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  usuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser().subscribe({
      next: (data) => {
        this.usuario = data;
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      }
    });
  }

  logout() {
    this.authService.removeToken();
    this.router.navigateByUrl('/login');
  }

  getImageUrl(imageName: string): string {
    return this.usuarioService.getImageUrl(imageName);
  }
}