import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Fabricante } from 'src/app/models/fabricante.model';
import { Hardware } from 'src/app/models/hardware.model';
import { Marca } from 'src/app/models/marca.model';
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
  categorias: Categoria[] = [];
  status: Categoria[] = [];

  constructor(private formBuilder: FormBuilder,
    private hardwareService: HardwareService,
    private marcaService: MarcaService,
    private fabricanteService: FabricanteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [null],
      marca: [null],
      nome: [null],
      preco: [null],
      estoque: [null],
      modelo: [null],
      lancamento: [null],
      fabricante: [null],
      categoria: [null],
      status: [null]
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

    this.hardwareService.getCategorias().subscribe(data => {
      this.categorias = data;
      this.initializeForm();
    });

    this.hardwareService.getStatus().subscribe(data => {
      this.status = data;
      this.initializeForm();
    });
  }

  initializeForm() {
    const hardware: Hardware = this.activatedRoute.snapshot.data['hardware'];
    const marca = this.marcas.find(marca => marca.id === (hardware?.marca?.id || null));
    const fabricante = this.fabricantes.find(fabricante => fabricante.id === (hardware?.fabricante?.id || null));
    const categoria = this.categorias.find(categoria => categoria.id === (hardware?.categoria?.id || null));
    const status = this.status.find(status => status.id === (hardware?.status?.id || null));

    const formValues = {
      id: [hardware?.id || null],
      marca: [marca],
      nome: [hardware?.nome || '', Validators.required],
      preco: [hardware?.preco || '', Validators.required],
      estoque: [hardware?.estoque || '', Validators.required],
      modelo: [hardware?.modelo || '', Validators.required],
      lancamento: [hardware?.lancamento ? new Date(hardware.lancamento) : '', Validators.required],
      fabricante: [fabricante],
      categoria: [categoria],
      status: [status]
    };

    this.formGroup = this.formBuilder.group(formValues);
  }

  salvar() {
    if (this.formGroup.valid) {
      const hardware = this.formGroup.value;

      if (hardware.id == null) {
        this.hardwareService.create(hardware).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/hardwares/list');
          },
          error: (error) => {
            console.log('Erro ao incluir' + JSON.stringify(error));
          }
        });
      } else {
        this.hardwareService.update(hardware).subscribe({
          next: (response) => {
            this.router.navigateByUrl('/hardwares/list');
          },
          error: (error) => {
            console.log('Erro ao alterar' + JSON.stringify(error));
          }
        });
      }
    }
  }

  excluir() {
    const hardware = this.formGroup.value;
    if (hardware.id != null) {
      this.hardwareService.delete(hardware).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/hardwares/list');
        },
        error: (error) => {
          console.log('Erro ao excluir' + JSON.stringify(error));
        }
      });
    }
  }
}