import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cupom, Hardware } from 'src/app/models/cupom.model';
import { CupomService } from 'src/app/services/cupom.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-cupom-form',
  templateUrl: './cupom-form.component.html',
  styleUrls: ['./cupom-form.component.css']
})
export class CupomFormComponent implements OnInit {
  formGroup: FormGroup;
  hardwares: Hardware[] = [];
  isAssociateRoute: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const cupom: Cupom = this.activatedRoute.snapshot.data['cupom'];

    this.formGroup = formBuilder.group({
      id: [(cupom && cupom.id) ? cupom.id : null],
      descricao: [(cupom && cupom.descricao) ? cupom.descricao : '', Validators.required],
      codigo: [(cupom && cupom.codigo) ? cupom.codigo : '', Validators.required],
      inicio: [(cupom && cupom.inicio) ? new Date(cupom.inicio) : Validators.required],
      termino: [(cupom && cupom.termino) ? new Date(cupom.termino) : Validators.required],
      desconto: [(cupom && cupom.termino) ? cupom.desconto : '', Validators.required],
      hardwares: [(cupom && cupom.hardwares) ? cupom.hardwares : []]
    });
  }

  ngOnInit(): void {
    this.loadHardwares();

    this.activatedRoute.url.subscribe(urlSegments => {
      if (urlSegments.length > 0 && urlSegments[0].path === 'associate') {
        this.isAssociateRoute = true;
        this.formGroup.get('id')?.disable();
        this.formGroup.get('descricao')?.disable();
        this.formGroup.get('codigo')?.disable();
        this.formGroup.get('inicio')?.disable();
        this.formGroup.get('termino')?.disable();
        this.formGroup.get('desconto')?.disable();
      }
    });
  }

  loadHardwares() {
    this.cupomService.getHardwares().subscribe(
      (hardwares) => {
        this.hardwares = hardwares;
      },
      (error) => {
        console.log('Erro ao carregar hardwares: ' + JSON.stringify(error));
      }
    );
  }

  associarHardwares() {
    const cupomId = this.formGroup.get('id')?.value;
    const hardwareIds = this.formGroup.get('hardwares')?.value;

    if (hardwareIds && hardwareIds.length > 0) {
      for (const hardwareId of hardwareIds) {
        this.cupomService.associateHardware(cupomId, hardwareId).subscribe(
          (hardware) => {
            console.log('Hardware associado com sucesso.' + JSON.stringify(hardware));
            this.router.navigateByUrl('/cupons/list');
          },
          (error) => {
            console.log('Erro ao associar hardware: ' + JSON.stringify(error));
          }
        );
      }
    } else {
      console.log('Selecione pelo menos um hardware antes de associar.');
    }
  }

  salvar() {
    if (this.formGroup.valid) {
      const cupom = this.formGroup.value;
      if (cupom.id == null) {
        this.cupomService.save(cupom).subscribe({
          next: (cupomCadastrado) => {
            console.log('Cupom cadastrado com sucesso' + JSON.stringify(cupomCadastrado));
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
}