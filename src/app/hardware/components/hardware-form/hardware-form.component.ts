import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hardware } from 'src/app/models/hardware.model';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware-form',
  templateUrl: './hardware-form.component.html',
  styleUrls: ['./hardware-form.component.css']
})
export class HardwareFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private hardwareService: HardwareService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    const hardware: Hardware = this.activatedRoute.snapshot.data['hardware'];

    this.formGroup = formBuilder.group({
      id:[(hardware && hardware.id) ? hardware.id : null],
      nome:[(hardware && hardware.nome) ? hardware.nome : '', Validators.required],
      preco:[(hardware && hardware.preco) ? hardware.preco : '', Validators.required],
      estoque:[(hardware && hardware.estoque) ? hardware.estoque : '', Validators.required],
      modelo:[(hardware && hardware.modelo) ? hardware.modelo : '', Validators.required],
      lancamento:[(hardware && hardware.lancamento) ? hardware.modelo : '', Validators.required]
    })
  }

  salvar() {
    if (this.formGroup.valid) {
      const hardware = this.formGroup.value;
      if (hardware.id == null) {
        this.hardwareService.save(hardware).subscribe({
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