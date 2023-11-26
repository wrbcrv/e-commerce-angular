import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  usuario: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser().subscribe({
      next: (data) => {
        this.usuario = data;
        console.log('Usuário:', this.usuario);
      },
      error: (error) => {
        console.error('Erro ao obter usuário:', error);
      }
    });
  }
}