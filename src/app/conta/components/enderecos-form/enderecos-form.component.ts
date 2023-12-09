import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade.model';
import { Endereco } from 'src/app/models/endereco.model';
import { Estado } from 'src/app/models/estado.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { EstadoService } from 'src/app/services/estado.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-enderecos-form',
  templateUrl: './enderecos-form.component.html',
  styleUrls: ['./enderecos-form.component.css']
})
export class EnderecosFormComponent implements OnInit {
  formGroup: FormGroup;
  usuario: any;
  enderecos: Endereco[] = [];
  cidades: Cidade[] = [];
  estados: Estado[] = []
  apiResponse: any = null;

  constructor(
    private usuarioService: UsuarioService,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: [null],
      sobrenome: [null],
      cep: [null],
      endereco: [null],
      numero: [null],
      bairro: [null],
      complemento: [null],
      estado: [null],
      cidade: [null],
      telefone: [null]
    });
  }

  ngOnInit(): void {
    this.usuarioService.getLoggedUser().subscribe(data => {
      this.usuario = data;
      this.initializeForm();
    });

    this.estadoService.findAll(0, 16).subscribe(data => {
      this.estados = data;
      this.initializeForm();
    });

    this.cidadeService.findAll(0, 16).subscribe(data => {
      this.cidades = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    const endereco: Endereco = this.activatedRoute.snapshot.data['endereco'];
    const cidade = this.cidades.find(cidade => cidade.id === (endereco?.cidade?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(endereco && endereco.id) ? endereco.id : null],
      nome: [(endereco && endereco.nome) ? endereco.nome : '', Validators.required],
      sobrenome: [(endereco && endereco.sobrenome) ? endereco.sobrenome : '', Validators.required],
      cep: [(endereco && endereco.cep) ? endereco.cep : '', Validators.required],
      endereco: [(endereco && endereco.endereco) ? endereco.endereco : '', Validators.required],
      numero: [(endereco && endereco.numero) ? endereco.numero : '', Validators.required],
      bairro: [(endereco && endereco.bairro) ? endereco.bairro : '', Validators.required],
      complemento: [(endereco && endereco.complemento) ? endereco.complemento : '', Validators.required],
      estado: [],
      cidade: [cidade],
      telefone: [(endereco && endereco.telefone) ? endereco.telefone : '', Validators.required]
    });
  }

  save(): void {
    if (this.formGroup.valid) {
      const endereco = this.formGroup.value;
      const usuarioId = this.usuario.id;
      const enderecoId = endereco.id
      const enderecos: Endereco[] = [endereco];

      if (endereco.id == null) {
        this.usuarioService.createEnderecos(usuarioId, enderecos).subscribe({
          next: (response) => {
            console.log('Endereço criado com sucesso.');
            this.router.navigateByUrl('conta/enderecos');
          },
          error: (error) => {
            console.warn('Erro ao criar endereço: ', error);
          }
        });
      } else {
        this.usuarioService.updateEnderecos(usuarioId, enderecoId, endereco).subscribe({
          next: (response) => {
            this.router.navigateByUrl('conta/enderecos');
          },
          error: (error) => {
            console.warn('Erro ao atualizar endereço: ', error);
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