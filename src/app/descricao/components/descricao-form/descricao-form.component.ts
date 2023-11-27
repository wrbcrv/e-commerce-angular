import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Descricao } from 'src/app/models/descricao.model';
import { Hardware } from 'src/app/models/hardware.model';
import { DescricaoService } from 'src/app/services/descricao.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-descricao-form',
  templateUrl: './descricao-form.component.html',
  styleUrls: ['./descricao-form.component.css']
})

export class DescricaoFormComponent implements OnInit {
  formGroup: FormGroup;
  hardwares: Hardware[] = [];

  constructor(private formBuilder: FormBuilder,
    private descricaoService: DescricaoService,
    private hardwareService: HardwareService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      conteudo: ['', Validators.required],
      hardware: [null]
    })
  }

  ngOnInit(): void {
    this.hardwareService.findAll(0, 999).subscribe(data => {
      this.hardwares = data;
      this.initializeForm();
    })
  }

  initializeForm() {
    const descricao: Descricao = this.activatedRoute.snapshot.data['descricao'];
    const hardware = this.hardwares.find(hardware => hardware.id === (descricao?.hardware?.id || null))

    this.formGroup = this.formBuilder.group({
      id: [(descricao && descricao.id) ? descricao.id : null],
      conteudo: [(descricao && descricao.conteudo) ? descricao.conteudo : '', Validators.required],
      hardware: [hardware]
    })

    console.log(this.formGroup.value)
  }

  salvar() {
    if (this.formGroup.valid) {
      const descricao = this.formGroup.value;
      if (descricao.id == null) {
        this.descricaoService.create(descricao).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/descricoes/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.descricaoService.update(descricao).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/descricoes/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    const descricao = this.formGroup.value;
    if (descricao.id != null) {
      this.descricaoService.delete(descricao).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/descricoes/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }
}