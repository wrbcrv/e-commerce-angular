import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil.modal';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dados-form',
  templateUrl: './dados-form.component.html',
  styleUrls: ['./dados-form.component.css']
})
export class DadosFormComponent implements OnInit {
  formGroup: FormGroup;
  usuario: any;
  perfis: Perfil[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: [null],
      sobrenome: [null],
      cpf: [null],
      rg: [null],
      login: [null],
      senha: [null],
      perfil: [null]
    });
  }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser().subscribe(data => {
      this.usuario = data;
      this.initializeForm();
    })

    this.usuarioService.getPerfis().subscribe(data => {
      this.perfis = data;
      this.initializeForm();
    })
  }

  initializeForm() {
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    const perfil = this.perfis.find(perfis => perfis.id === (usuario?.perfil?.id || 2));

    this.formGroup = this.formBuilder.group({
      id: [(usuario && usuario.id) ? usuario.id : null],
      nome: [(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
      sobrenome: [(usuario && usuario.sobrenome) ? usuario.sobrenome : '', Validators.required],
      cpf: [(usuario && usuario.cpf) ? usuario.cpf : '', Validators.required],
      rg: [(usuario && usuario.rg) ? usuario.rg : '', Validators.required],
      login: [(usuario && usuario.login) ? usuario.login : '', Validators.required],
      senha: ['', Validators.required],
      perfil: [perfil]
    })
  }

  update(): void {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value;

      this.usuarioService.update(usuario).subscribe({
        next: (response) => {
          console.log("Sucesso: ", response)
          this.authService.removeToken();
          this.router.navigateByUrl('login');
        },
        error: (error) => {
          console.log("Erro: ", error);
        }
      });
    }
  }
}