import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cupom } from 'src/app/models/cupom.model';
import { CupomService } from 'src/app/services/cupom.service';

@Component({
  selector: 'app-cupom-form',
  templateUrl: './cupom-form.component.html',
  styleUrls: ['./cupom-form.component.css']
})
export class CupomFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private cupomService: CupomService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const cupom: Cupom = this.activatedRoute.snapshot.data['cupom'];

    this.formGroup = formBuilder.group({
      id:[(cupom && cupom.id) ? cupom.id : null],
      descricao:[(cupom && cupom.descricao) ? cupom.descricao : '', Validators.required],
      codigo:[(cupom && cupom.codigo) ? cupom.codigo : '', Validators.required],
      inicio:[(cupom && cupom.inicio) ? cupom.inicio : '', Validators.required],
      termino:[(cupom && cupom.termino) ? cupom.termino : '', Validators.required],
      desconto:[(cupom && cupom.termino) ? cupom.desconto : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;
      if (cupom.id == null) {
        this.cupomService.save(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.router.navigateByUrl('/cupons/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.cupomService.update(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.router.navigateByUrl('/cupons/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });        
      }
    }
  }

  excluir() {
    const cupom = this.formGroup.value;
    if (cupom.id != null) {
      this.cupomService.delete(cupom).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/cupons/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }      
  }
}