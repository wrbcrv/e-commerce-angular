import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor, Endereco } from 'src/app/models/fornecedor.model';
import { Hardware } from 'src/app/models/hardware.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
    selector: 'app-fornecedor-form',
    templateUrl: './fornecedor-form.component.html',
    styleUrls: ['./fornecedor-form.component.css']
})

export class FornecedorFormComponent implements OnInit {
    formGroup: FormGroup;
    fornecedor: Fornecedor = new Fornecedor();
    fornecedores: Fornecedor[] = [];
    hardwares: Hardware[] = [];
    isEditRoute: boolean = false;
    isNewRoute: boolean = false;
    isAssociateRoute: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private fornecedorService: FornecedorService,
        private hardwareService: HardwareService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        const fornecedor: Fornecedor = this.activatedRoute.snapshot.data['fornecedor'];

        this.formGroup = formBuilder.group({
            id: [(fornecedor && fornecedor.id) ? fornecedor.id : null],
            nome: [(fornecedor && fornecedor.nome) ? fornecedor.nome : '', Validators.required],
            enderecos: formBuilder.array([]),
            hardwares: [null]
        });
    }

    ngOnInit(): void {
        this.loadHardwares();

        this.fornecedorService.findAll(0, 999).subscribe(data => {
            this.fornecedores = data;
            this.initializeForm();
        });

        this.activatedRoute.url.subscribe(urlSegments => {
            this.isEditRoute = urlSegments.length > 0 && urlSegments[0].path === 'edit';
        });

        this.activatedRoute.url.subscribe(urlSegments => {
            this.isNewRoute = urlSegments.length > 0 && urlSegments[0].path === 'new';
        });

        this.activatedRoute.url.subscribe(urlSegments => {
            this.isAssociateRoute = urlSegments.length > 0 && urlSegments[0].path === 'associate';
        });
    }

    initializeForm() {
        const fornecedor: Fornecedor = this.activatedRoute.snapshot.data['fornecedor'];
        this.fornecedor = fornecedor;

        this.formGroup = this.formBuilder.group({
            id: [(fornecedor && fornecedor.id) ? fornecedor.id : null],
            nome: [(fornecedor && fornecedor.nome) ? fornecedor.nome : '', Validators.required],
            enderecos: this.formBuilder.array([]),
            hardwares: [(fornecedor && fornecedor.hardwares) ? fornecedor.hardwares : []]
        });

        if (fornecedor && fornecedor.enderecos) {
            const enderecosFormArray = this.formGroup.get('enderecos') as FormArray;
            fornecedor.enderecos.forEach((endereco: Endereco) => {
                enderecosFormArray.push(
                    this.formBuilder.group({
                        id: [(endereco && endereco.id) ? endereco.id : null],
                        logradouro: [(endereco && endereco.logradouro) ? endereco.logradouro : '', Validators.required],
                        numero: [(endereco && endereco.numero) ? endereco.numero : '', Validators.required],
                        complemento: [(endereco && endereco.complemento) ? endereco.complemento : null],
                        bairro: [(endereco && endereco.bairro) ? endereco.bairro : '', Validators.required],
                        cep: [(endereco && endereco.cep) ? endereco.cep : '', Validators.required]
                    })
                );
            });
        }
    }

    salvar() {
        if (this.formGroup.valid) {
            const fornecedor = this.formGroup.value as Fornecedor;

            fornecedor.enderecos = this.enderecos.value;

            if (fornecedor.id == null) {
                this.fornecedorService.create(fornecedor).subscribe({
                    next: (fornecedorCadastrado) => {
                        console.log('Fornecedor cadastrado com sucesso' + JSON.stringify(fornecedorCadastrado));
                        this.router.navigateByUrl('/fornecedores/list');
                    },
                    error: (err) => {
                        console.log('Erro ao incluir' + JSON.stringify(err));
                    }
                });
            } else {
                this.fornecedorService.update(fornecedor).subscribe({
                    next: (fornecedorCadastrado) => {
                        console.log('Fornecedor atualizado com sucesso' + JSON.stringify(fornecedorCadastrado));
                        this.router.navigateByUrl('/fornecedores/list');
                    },
                    error: (err) => {
                        console.log('Erro ao alterar' + JSON.stringify(err));
                    }
                });
            }
        }
    }

    excluir() {
        const fornecedor = this.formGroup.value;
        if (fornecedor.id != null) {
            this.fornecedorService.delete(fornecedor).subscribe({
                next: (e) => {
                    console.log('Fornecedor excluido com sucesso' + JSON.stringify(e));
                    this.router.navigateByUrl('/fornecedores/list');
                },
                error: (err) => {
                    console.log('Erro ao excluir' + JSON.stringify(err));
                }
            });
        }
    }

    loadHardwares() {
        this.fornecedorService.getHardwares().subscribe(
            (hardwares) => {
                this.hardwares = hardwares;
            },
            (error) => {
                console.log('Erro ao carregar hardwares: ' + JSON.stringify(error));
            }
        );
    }

    associarHardwares() {
        const fornecedorId = this.formGroup.get('id')?.value;
        const hardwareIds = this.formGroup.get('hardwares')?.value;

        if (hardwareIds && hardwareIds.length > 0) {
            for (const hardwareId of hardwareIds) {
                this.fornecedorService.associateHardware(fornecedorId, hardwareId).subscribe(
                    (hardware) => {
                        console.log('Hardware associado com sucesso.' + JSON.stringify(hardware));
                        this.router.navigateByUrl('/fornecedores/list');
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

    adicionarEndereco() {
        const enderecoFormGroup = this.formBuilder.group({
            id: [null],
            logradouro: ['', Validators.required],
            numero: ['', Validators.required],
            complemento: ['', Validators.required],
            bairro: ['', Validators.required],
            cep: ['', Validators.required]
        });

        this.enderecos.push(enderecoFormGroup);
    }

    deletarEndereco(enderecoId: number) {
        const fornecedor = this.formGroup.value as Fornecedor;

        if (fornecedor.id != null) {
            this.fornecedorService.deletarEndereco(fornecedor.id, enderecoId).subscribe({
                next: () => {
                    const enderecosFormArray = this.formGroup.get('enderecos') as FormArray;

                    const enderecoIndex = enderecosFormArray.controls.findIndex(
                        (enderecoControl: AbstractControl) =>
                            enderecoControl.get('id')?.value === enderecoId
                    );

                    if (enderecoIndex !== -1) {
                        enderecosFormArray.removeAt(enderecoIndex);
                    }
                },
                error: (err) => {
                    console.log('Erro ao deletar endereco: ' + JSON.stringify(err));
                }
            });
        }
    }

    removerEndereco(index: number) {
        this.enderecos.removeAt(index);
    }

    get enderecos() {
        return this.formGroup.get('enderecos') as FormArray;
    }
}