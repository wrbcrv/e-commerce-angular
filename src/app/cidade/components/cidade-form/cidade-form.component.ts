import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cidade } from 'src/app/models/cidade.model';
import { Estado } from 'src/app/models/estado.model';
import { CidadeService } from 'src/app/services/cidade.service';
import { EstadoService } from 'src/app/services/estado.service';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})

export class CidadeFormComponent implements OnInit {
  formGroup: FormGroup;
  estados: Estado[] = [];

  constructor(private formBuilder: FormBuilder,
    private estadoService: EstadoService,
    private cidadeService: CidadeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      nome: ['', Validators.required],
      estado: [null]
    })
  }

  ngOnInit(): void {
    this.estadoService.findAll(0, 27).subscribe(data => {
      this.estados = data;
      this.initializeForm();
    })
  }

  initializeForm() {
    const cidade: Cidade = this.activatedRoute.snapshot.data['cidade'];
    const estado = this.estados.find(estado => estado.id === (cidade?.estado?.id || null))

    this.formGroup = this.formBuilder.group({
      id: [(cidade && cidade.id) ? cidade.id : null],
      nome: [(cidade && cidade.nome) ? cidade.nome : '', Validators.required],
      estado: [estado]
    })
  }

  salvar(): void {
    if (this.formGroup.valid) {
      const cidade = this.formGroup.value;

      if (cidade.id == null) {
        this.cidadeService.create(cidade).subscribe({
          next: (cidadeCadastrado) => {
            this.router.navigateByUrl('/admin/cidades/list');
          },

          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.cidadeService.update(cidade).subscribe({
          next: (cidadeCadastrado) => {
            this.router.navigateByUrl('/admin/cidades/list');
          },

          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    const cidade = this.formGroup.value;
    if (cidade.id != null) {
      this.cidadeService.delete(cidade).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/admin/cidades/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }
}