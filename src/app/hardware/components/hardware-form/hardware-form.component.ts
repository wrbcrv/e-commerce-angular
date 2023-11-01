import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Fabricante } from 'src/app/models/fabricante.model';
import { Hardware } from 'src/app/models/hardware.model';
import { Marca } from 'src/app/models/marca.model';
import { Status } from 'src/app/models/status.model';
import { FabricanteService } from 'src/app/services/fabricante.service';
import { HardwareService } from 'src/app/services/hardware.service';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
  selector: 'app-hardware-form',
  templateUrl: './hardware-form.component.html',
  styleUrls: ['./hardware-form.component.css']
})
export class HardwareFormComponent implements OnInit {
  formGroup: FormGroup;
  marcas: Marca[] = [];
  fabricantes: Fabricante[] = [];
  categorias: Categoria[] = [{ id: 1, label: 'Entrada' }, { id: 2, label: 'Mid-End' }, { id: 3, label: 'High-End' }];
  status: Status[] = [{ id: 1, label: 'Novo' }, { id: 2, label: 'Usado' }, { id: 3, label: 'Reparado' }];

  constructor(private formBuilder: FormBuilder,
    private hardwareService: HardwareService,
    private marcaService: MarcaService,
    private fabricanteService: FabricanteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    const hardware: Hardware = this.activatedRoute.snapshot.data['hardware'];

    this.formGroup = formBuilder.group({
      id: [null],
      marca: [null, Validators.required],
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      estoque: ['', Validators.required],
      modelo: ['', Validators.required],
      lancamento: [(hardware && hardware.lancamento) ? new Date(hardware.lancamento) : Validators.required],
      fabricante: [null, Validators.required],
      idCategoria: [null, Validators.required],
      idStatus: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.marcaService.findAll(0, 999).subscribe(data => {
      this.marcas = data;
      this.initializeForm();
    });

    this.fabricanteService.findAll(0, 999).subscribe(data => {
      this.fabricantes = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    const hardware: Hardware = this.activatedRoute.snapshot.data['hardware'];
    const marca = this.marcas.find(m => m.id === (hardware?.marca?.id || null));
    const fabricante = this.fabricantes.find(m => m.id === (hardware?.fabricante?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [(hardware && hardware.id) ? hardware.id : null],
      marca: [marca],
      nome: [(hardware && hardware.nome) ? hardware.nome : '', Validators.required],
      preco: [(hardware && hardware.preco) ? hardware.preco : '', Validators.required],
      estoque: [(hardware && hardware.estoque) ? hardware.estoque : '', Validators.required],
      modelo: [(hardware && hardware.modelo) ? hardware.modelo : '', Validators.required],
      lancamento: [(hardware && hardware.lancamento) ? new Date(hardware.lancamento) : Validators.required],
      fabricante: [fabricante],
      idCategoria: [(hardware && hardware.idCategoria) ? hardware.idCategoria : null],
      idStatus: [(hardware && hardware.idStatus) ? hardware.idStatus : null]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const hardware = this.formGroup.value;

      if (hardware.id == null) {
        this.hardwareService.create(hardware).subscribe({
          next: (hardwareCadastrado) => {
            this.router.navigateByUrl('/hardwares/list');
          },
          error: (err) => {
            console.log('Erro ao incluir' + JSON.stringify(err));
          }
        });
      } else {
        this.hardwareService.update(hardware).subscribe({
          next: (hardwareCadastrado) => {
            this.router.navigateByUrl('/hardwares/list');
          },
          error: (err) => {
            console.log('Erro ao alterar' + JSON.stringify(err));
          }
        });
      }
    }
  }

  excluir() {
    const hardware = this.formGroup.value;
    if (hardware.id != null) {
      this.hardwareService.delete(hardware).subscribe({
        next: (e) => {
          this.router.navigateByUrl('/hardwares/list');
        },
        error: (err) => {
          console.log('Erro ao excluir' + JSON.stringify(err));
        }
      });
    }
  }
}