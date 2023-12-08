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
  apiResponse: any = null;
  fileName: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
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
      status: [null],
      descricao: [null]
    });
  }

  ngOnInit(): void {
    this.marcaService.findAll(0, 16).subscribe(data => {
      this.marcas = data;
      this.initializeForm();
    });

    this.fabricanteService.findAll(0, 16).subscribe(data => {
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

    if (hardware && hardware.imageName) {
      this.imagePreview = this.hardwareService.getImageUrl(hardware.imageName);
      this.fileName = hardware.imageName;
    }

    this.formGroup = this.formBuilder.group({
      id: [hardware?.id || null],
      marca: [marca],
      nome: [hardware?.nome || null],
      preco: [hardware?.preco || null],
      estoque: [hardware?.estoque || null],
      modelo: [hardware?.modelo || null],
      lancamento: [hardware?.lancamento ? new Date(hardware.lancamento) : null],
      fabricante: [fabricante],
      categoria: [categoria],
      status: [status],
      descricao: [hardware?.descricao || null]
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      const hardware = this.formGroup.value;

      if (hardware.id == null) {
        this.hardwareService.create(hardware).subscribe({
          next:
            (response) => {
              this.uploadImage(response.id);
            },
          error:
            (error) => {
              this.apiResponse = error.error;

              this.formGroup.get('marca')?.setErrors({ apiError: this.getErrorMessage('marca') });
              this.formGroup.get('nome')?.setErrors({ apiError: this.getErrorMessage('nome') });
              this.formGroup.get('preco')?.setErrors({ apiError: this.getErrorMessage('preco') });
              this.formGroup.get('estoque')?.setErrors({ apiError: this.getErrorMessage('estoque') });
              this.formGroup.get('modelo')?.setErrors({ apiError: this.getErrorMessage('modelo') });
              this.formGroup.get('lancamento')?.setErrors({ apiError: this.getErrorMessage('lancamento') });
              this.formGroup.get('fabricante')?.setErrors({ apiError: this.getErrorMessage('fabricante') });
              this.formGroup.get('categoria')?.setErrors({ apiError: this.getErrorMessage('categoria') });
              this.formGroup.get('status')?.setErrors({ apiError: this.getErrorMessage('status') });
              this.formGroup.get('descricao')?.setErrors({ apiError: this.getErrorMessage('descricao') });

              console.log('Erro ao incluir' + JSON.stringify(error));
            }
        });
      } else {
        this.hardwareService.update(hardware).subscribe({
          next:
            (response) => {
              this.uploadImage(response.id)
            },
          error:
            (error) => {
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
        next:
          () => {
            this.router.navigateByUrl('/admin/hardwares/list');
          },
        error:
          (error) => {
            console.log('Erro ao excluir' + JSON.stringify(error));
          }
      });
    }
  }

  loadSelectedImage(event: any) {
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      this.fileName = this.selectedFile.name;

      const fileReader = new FileReader();
      fileReader.onload = e => this.imagePreview = fileReader.result;
      fileReader.readAsDataURL(this.selectedFile);
    }
  }

  uploadImage(hardwareId: number) {
    if (this.selectedFile) {
      this.hardwareService.uploadImage(hardwareId, this.selectedFile.name, this.selectedFile).subscribe({
        next:
          () => {
            this.router.navigateByUrl('/admin/hardwares/list')
          },
        error:
          (error) => {
            console.log('Erro ao fazer upload da imagem');
          }
      })
    } else {
      this.router.navigateByUrl('/admin/hardwares/list');
    }
  }

  getErrorMessage(field: string): string {
    const error = this.apiResponse.errors.find((error: any) => error.field === field);
    return error ? error.message : '';
  }
}