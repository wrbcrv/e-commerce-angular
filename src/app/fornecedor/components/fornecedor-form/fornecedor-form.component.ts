import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Fornecedor, Endereco } from 'src/app/models/fornecedor.model';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
    selector: 'app-fornecedor-form',
    templateUrl: './fornecedor-form.component.html',
    styleUrls: ['./fornecedor-form.component.css']
})

export class FornecedorFormComponent implements OnInit {
    formGroup: FormGroup;
    fornecedor: Fornecedor = new Fornecedor();
    fornecedores: Fornecedor[] = [];
    isEditRoute: boolean = false;
    isNewRoute: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private fornecedorService: FornecedorService,
        private router: Router,
        private activatedRoute: ActivatedRoute) {

        this.formGroup = formBuilder.group({
            id: [null],
            nome: ['', Validators.required],
            enderecos: formBuilder.array([])
        });
    }

    ngOnInit(): void {
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
    }

    initializeForm() {
        const fornecedor: Fornecedor = this.activatedRoute.snapshot.data['fornecedor'];
        this.fornecedor = fornecedor;

        this.formGroup = this.formBuilder.group({
            id: [(fornecedor && fornecedor.id) ? fornecedor.id : null],
            nome: [(fornecedor && fornecedor.nome) ? fornecedor.nome : '', Validators.required],
            enderecos: this.formBuilder.array([])
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
                this.fornecedorService.save(fornecedor).subscribe({
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