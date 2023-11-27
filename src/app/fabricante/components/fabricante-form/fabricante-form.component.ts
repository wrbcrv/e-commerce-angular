import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fabricante } from 'src/app/models/fabricante.model';
import { FabricanteService } from 'src/app/services/fabricante.service';

@Component({
  selector: 'app-fabricante-form',
  templateUrl: './fabricante-form.component.html',
  styleUrls: ['./fabricante-form.component.css']
})
export class FabricanteFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private fabricanteService: FabricanteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const fabricante: Fabricante = this.activatedRoute.snapshot.data['fabricante'];

    this.formGroup = formBuilder.group({
      id: [(fabricante && fabricante.id) ? fabricante.id : null],
      nome: [(fabricante && fabricante.nome) ? fabricante.nome : '', Validators.required],
      site: [(fabricante && fabricante.site) ? fabricante.site : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const fabricante = this.formGroup.value;
      if (fabricante.id == null) {
        this.fabricanteService.create(fabricante).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/fabricantes/list');
          },
          error: (error) => {
            console.log('Erro ao incluir' + JSON.stringify(error));
          }
        });
      } else {
        this.fabricanteService.update(fabricante).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/fabricantes/list');
          },
          error: (error) => {
            console.log('Erro ao alterar' + JSON.stringify(error));
          }
        });
      }
    }
  }

  excluir() {
    const fabricante = this.formGroup.value;
    if (fabricante.id != null) {
      this.fabricanteService.delete(fabricante).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/fabricantes/list');
        },
        error: (error) => {
          console.log('Erro ao excluir' + JSON.stringify(error));
        }
      });
    }
  }
}