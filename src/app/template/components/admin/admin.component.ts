import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario: any;

  constructor(
    private carrinhoService: CarrinhoService,
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
    this.carrinhoService.clearCart();
    this.router.navigateByUrl('/login');
  }

  getImageUrl(imageName: string): string {
    return this.usuarioService.getImageUrl(imageName);
  }
}