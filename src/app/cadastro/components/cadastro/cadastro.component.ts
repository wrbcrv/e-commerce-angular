import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil.modal';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formGroup: FormGroup;
  perfis: Perfil[] = [];
  apiResponse: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService) {

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
    this.usuarioService.getPerfis().subscribe(data => {
      this.perfis = data;
      this.initializeForm();
    })
  }

  initializeForm() {
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    const perfil = this.perfis.find(perfis => perfis.id === (usuario?.perfil?.id || 2));

    const formValues = {
      id: [usuario?.id || null],
      nome: [usuario?.nome || null],
      sobrenome: [usuario?.sobrenome || null],
      cpf: [usuario?.cpf || null],
      rg: [usuario?.rg || null],
      login: [usuario?.login || null],
      senha: [usuario?.senha || null],
      perfil: [perfil]
    };

    this.formGroup = this.formBuilder.group(formValues);
  }

  cadastrar() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value as Usuario;

      if (usuario.id == null) {
        this.usuarioService.create(usuario).subscribe({
          next: (response) => {
            console.log('Usuario cadastrado com sucesso' + JSON.stringify(response));
            this.router.navigateByUrl('/login');
          },
          error: (error) => {
            this.apiResponse = error.error

            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('sobrenome')?.setErrors({ apiError: this.getErrorMessage('sobrenome') });
            this.formGroup.get('cpf')?.setErrors({ apiError: this.getErrorMessage('cpf') });
            this.formGroup.get('rg')?.setErrors({ apiError: this.getErrorMessage('rg') });
            this.formGroup.get('login')?.setErrors({ apiError: this.getErrorMessage('login') });
            this.formGroup.get('senha')?.setErrors({ apiError: this.getErrorMessage('senha') });

            console.log('Erro ao incluir' + JSON.stringify(error));
          }
        });
      }
    }
  }

  getErrorMessage(field: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.field === field);
    return error ? error.message : '';
  }
}