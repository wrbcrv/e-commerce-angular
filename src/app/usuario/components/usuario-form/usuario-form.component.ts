import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario, Telefone, Endereco } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})

export class UsuarioFormComponent implements OnInit {
  formGroup: FormGroup;
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  isEditRoute: boolean = false;
  isNewRoute: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id       : [null],
      nome     : ['', Validators.required],
      login    : ['', Validators.required],
      senha    : ['', Validators.required],
      cpf      : ['', Validators.required],
      telefones: formBuilder.array([]),
      enderecos: formBuilder.array([])
    });
  }

  ngOnInit(): void {
    this.usuarioService.findAll().subscribe(data => {
      this.usuarios = data;
      this.initializeForm();
    });

    this.activatedRoute.url.subscribe(urlSegments => {
      this.isEditRoute = urlSegments.length > 0 && urlSegments[0].path === 'edit';
    });

    this.activatedRoute.url.subscribe(urlSegments => {
      this.isNewRoute = urlSegments.length > 0 && urlSegments[0].path === 'new';
    });
  }

  initializeForm() {
    const usuario: Usuario = this.activatedRoute.snapshot.data['usuario'];
    this.usuario = usuario;

    this.formGroup = this.formBuilder.group({
      id       : [(usuario && usuario.id) ? usuario.id : null],
      nome     : [(usuario && usuario.nome) ? usuario.nome : '', Validators.required],
      login    : [(usuario && usuario.login) ? usuario.login : '', Validators.required],
      senha    : [(usuario && usuario.senha) ? usuario.senha : '', Validators.required],
      cpf      : [(usuario && usuario.cpf) ? usuario.cpf : '', Validators.required],
      telefones: this.formBuilder.array([]),
      enderecos: this.formBuilder.array([])
    });

    if (usuario && usuario.telefones) {
      const telefonesFormArray = this.formGroup.get('telefones') as FormArray;
      usuario.telefones.forEach((telefone: Telefone) => {
        telefonesFormArray.push(
          this.formBuilder.group({
            id    : [(telefone && telefone.id) ? telefone.id : null],
            ddd   : [(telefone && telefone.ddd) ? telefone.ddd : '', Validators.required],
            numero: [(telefone && telefone.numero) ? telefone.numero : '', Validators.required]
          })
        );
      });
    }

    if (usuario && usuario.enderecos) {
      const enderecosFormArray = this.formGroup.get('enderecos') as FormArray;
      usuario.enderecos.forEach((endereco: Endereco) => {
        enderecosFormArray.push(
          this.formBuilder.group({
            id         : [(endereco && endereco.id) ? endereco.id : null],
            logradouro : [(endereco && endereco.logradouro) ? endereco.logradouro : '', Validators.required],
            numero     : [(endereco && endereco.numero) ? endereco.numero : '', Validators.required],
            complemento: [(endereco && endereco.complemento) ? endereco.complemento : null],
            bairro     : [(endereco && endereco.bairro) ? endereco.bairro : '', Validators.required],
            cep        : [(endereco && endereco.cep) ? endereco.cep : '', Validators.required]
          })
        );
      });
    }
  }

  salvar() {
    if (this.formGroup.valid) {
      const usuario = this.formGroup.value as Usuario;

      usuario.telefones = this.telefones.value;
      usuario.enderecos = this.enderecos.value;

      if (usuario.id == null) {
        this.usuarioService.save(usuario).subscribe({
          next: (usuarioCadastrado) => {
            console.log('Usuario cadastrado com sucesso' + JSON.stringify(usuarioCadastrado));
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.usuarioService.update(usuario).subscribe({
          next: (usuarioCadastrado) => {
            console.log('Usuario atualizado com sucesso' + JSON.stringify(usuarioCadastrado));
            this.router.navigateByUrl('/usuarios/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    const usuario = this.formGroup.value;
    if (usuario.id != null) {
      this.usuarioService.delete(usuario).subscribe({
        next: (e) => {
          console.log('Usuario excluido com sucesso' + JSON.stringify(e));
          this.router.navigateByUrl('/usuarios/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }

  adicionarTelefone() {
    const telefoneFormGroup = this.formBuilder.group({
      id    : [null],
      ddd   : ['', Validators.required],
      numero: ['', Validators.required]
    });

    this.telefones.push(telefoneFormGroup);
  }

  deletarTelefone(telefoneId: number) {
    const usuario = this.formGroup.value as Usuario;

    if (usuario.id != null) {
      this.usuarioService.deletarTelefone(usuario.id, telefoneId).subscribe({
        next: () => {
          const telefonesFormArray = this.formGroup.get('telefones') as FormArray;

          const telefoneIndex = telefonesFormArray.controls.findIndex(
            (telefoneControl: AbstractControl) =>
              telefoneControl.get('id')?.value === telefoneId
          );

          if (telefoneIndex !== -1) {
            telefonesFormArray.removeAt(telefoneIndex);
          }
        },
        error: (err) => {
          console.log('Erro ao deletar telefone: ' + JSON.stringify(err));
        }
      });
    }
  }

  removerTelefone(index: number) {
    this.telefones.removeAt(index);
  }

  adicionarEndereco() {
    const enderecoFormGroup = this.formBuilder.group({
      id         : [null],
      logradouro : ['', Validators.required],
      numero     : ['', Validators.required],
      complemento: ['', Validators.required],
      bairro     : ['', Validators.required],
      cep        : ['', Validators.required]
    });

    this.enderecos.push(enderecoFormGroup);
  }

  deletarEndereco(enderecoId: number) {
    const usuario = this.formGroup.value as Usuario;

    if (usuario.id != null) {
      this.usuarioService.deletarEndereco(usuario.id, enderecoId).subscribe({
        next: () => {
          const enderecosFormArray = this.formGroup.get('enderecos') as FormArray;

          const enderecoIndex = enderecosFormArray.controls.findIndex(
            (enderecoControl: AbstractControl) =>
              enderecoControl.get('id')?.value === enderecoId
          );

          if (enderecoIndex !== -1) {
            enderecosFormArray.removeAt(enderecoIndex);
          }
        },
        error: (err) => {
          console.log('Erro ao deletar endereco: ' + JSON.stringify(err));
        }
      });
    }
  }

  removerEndereco(index: number) {
    this.enderecos.removeAt(index);
  }

  get telefones() {
    return this.formGroup.get('telefones') as FormArray;
  }

  get enderecos() {
    return this.formGroup.get('enderecos') as FormArray;
  }
}