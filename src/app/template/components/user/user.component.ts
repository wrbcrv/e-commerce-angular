import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  usuario: any;
  itemCount: number = 0;

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

    this.getItemCount();
  }

  logout() {
    this.authService.removeToken();
    this.carrinhoService.clearCart();
    this.router.navigateByUrl('/login');
  }

  getImageUrl(imageName: string): string {
    return this.usuarioService.getImageUrl(imageName);
  }

  getItemCount() {
    this.carrinhoService.carrinho$.subscribe(items => {
      this.itemCount = items.length
    });
  }
}