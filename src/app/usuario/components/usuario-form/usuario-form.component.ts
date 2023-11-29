import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Perfil } from 'src/app/models/perfil.modal';
import { Usuario, Endereco } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {
  formGroup: FormGroup;
  apiResponse: any = null;
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  perfis: Perfil[] = [];
  isEditRoute: boolean = false;
  isNewRoute: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      cpf: ['', Validators.required],
      rg: ['', Validators.required],
      login: ['', Validators.required],
      senha: ['', Validators.required],
      enderecos: formBuilder.array([]),
      perfil: [null]
    });
  }

  ngOnInit(): void {
    this.usuarioService.findAll(0, 999).subscribe(data => {
      this.usuarios = data;
      this.initializeForm();
    });

    this.usuarioService.getPerfis().subscribe(data => {
      this.perfis = data;
      this.initializeForm();
    })

    this.activatedRoute.url.subscribe(urlSegments => {
      this.isEditRoute = urlSegments.length > 0 && urlSegments[0].path === 'edit';
    });

    this.activatedRoute.url.subscribe(urlSegments => {
      this.isNewRoute = urlSegments.length > 0 && urlSegments[0].path === 'new';
    });
  }

  initializeForm() {
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    const perfil = this.perfis.find(perfis => perfis.id === (usuario?.perfil?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(usuario && usuario.id) ? usuario.id : null],
      nome: [(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
      sobrenome: [(usuario && usuario.sobrenome) ? usuario.sobrenome : '', Validators.required],
      cpf: [(usuario && usuario.cpf) ? usuario.cpf : '', Validators.required],
      rg: [(usuario && usuario.rg) ? usuario.rg : '', Validators.required],
      login: [(usuario && usuario.login) ? usuario.login : '', Validators.required],
      senha: [(usuario && usuario.senha) ? usuario.senha : '', Validators.required],
      enderecos: this.formBuilder.array([]),
      perfil: [perfil]
    });

    if (usuario && usuario.enderecos) {
      const enderecosFormArray = this.formGroup.get('enderecos') as FormArray;
      usuario.enderecos.forEach((endereco: Endereco) => {
        enderecosFormArray.push(
          this.formBuilder.group({
            id: [(endereco && endereco.id) ? endereco.id : null],
            endereco: [(endereco && endereco.endereco) ? endereco.endereco : '', Validators.required],
            numero: [(endereco && endereco.numero) ? endereco.numero : '', Validators.required],
            complemento: [(endereco && endereco.complemento) ? endereco.complemento : null],
            bairro: [(endereco && endereco.bairro) ? endereco.bairro : '', Validators.required],
            cep: [(endereco && endereco.cep) ? endereco.cep : '', Validators.required]
          })
        );
      });
    }
  }

  salvar() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value as Usuario;

      usuario.enderecos = this.enderecos.value;

      if (usuario.id == null) {
        this.usuarioService.create(usuario).subscribe({
          next: (response) => {
            console.log('Usuario cadastrado com sucesso' + JSON.stringify(response));
            this.router.navigateByUrl('/admin/usuarios/list');
          },
          error: (error) => {
            this.apiResponse = error.error;

            this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
            this.formGroup.get('login')?.setErrors({ apiError: this.getErrorMessage('login') });

            console.log('Erro ao incluir' + JSON.stringify(error));
          }
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
          next: (response) => {
            console.log('Usuario atualizado com sucesso' + JSON.stringify(response));
            this.router.navigateByUrl('/admin/usuarios/list');
          },
          error: (error) => {
            console.log('Erro ao alterar' + JSON.stringify(error));
          }
        });
      }
    }
  }

  excluir() {
    const usuario = this.formGroup.value;
    if (usuario.id != null) {
      this.usuarioService.delete(usuario).subscribe({
        next: (response) => {
          console.log('Usuario excluido com sucesso' + JSON.stringify(response));
          this.router.navigateByUrl('/admin/usuarios/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

  adicionarEndereco() {
    const enderecoFormGroup = this.formBuilder.group({
      id: [null],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: ['', Validators.required],
      bairro: ['', Validators.required],
      cep: ['', Validators.required]
    });

    this.enderecos.push(enderecoFormGroup);
  }

  deletarEndereco(enderecoId: number) {
    const usuario = this.formGroup.value as Usuario;

    if (usuario.id != null) {
      this.usuarioService.deletarEndereco(usuario.id, enderecoId).subscribe({
        next: (response) => {
          const enderecosFormArray = this.formGroup.get('enderecos') as FormArray;

          const enderecoIndex = enderecosFormArray.controls.findIndex(
            (enderecoControl: AbstractControl) =>
              enderecoControl.get('id')?.value === enderecoId
          );

          if (enderecoIndex !== -1) {
            enderecosFormArray.removeAt(enderecoIndex);
          }
        },
        error: (error) => {
          console.log('Erro ao deletar endereco: ' + JSON.stringify(error));
        }
      });
    }
  }

  removerEndereco(index: number) {
    this.enderecos.removeAt(index);
  }

  getErrorMessage(fieldName: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.fieldName === fieldName);
    return error ? error.message : '';
  }
  
  get enderecos() {
    return this.formGroup.get('enderecos') as FormArray;
  }
}