import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent {

  tableColumns: string[] = ['id-column', 'nome-column', 'login-column', 'cpf-column', 'telefone-column', 'endereco-column', 'acoes-column'];
  usuarios: Usuario[] = [];
  totalRegistros = 0;
  pageSize = 2;
  page = 0;
  filtro: string = "";

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.carregarUsuarios();
    this.carregarTotalRegistros();
  }

  carregarUsuarios() {
    if (this.filtro) {
      this.usuarioService.findByNome(this.filtro, this.page, this.pageSize).subscribe(data => {
        this.usuarios = data;
      });
    } else {
      this.usuarioService.findAll(this.page, this.pageSize).subscribe(data => {
        this.usuarios = data;
      });
    }
  }

  carregarTotalRegistros() {
    if (this.filtro) {
      this.usuarioService.countByNome(this.filtro).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.usuarioService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.carregarUsuarios();
  }

  aplicarFiltro() {
    this.carregarUsuarios();
    this.carregarTotalRegistros();
  }

  excluirUsuario(usuario: Usuario): void {
    if (confirm(`Deseja realmente excluir o usuario ${usuario.nome}?`)) {
      this.usuarioService.delete(usuario).subscribe({
        next: () => {
          console.log('Usuario excluído com sucesso');
          this.carregarUsuarios();
        },
        error: (err) => {
          console.log('Erro ao excluir usuario: ' + JSON.stringify(err));
        },
      });
    }
  }
} 