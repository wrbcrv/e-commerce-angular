import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cartao } from 'src/app/models/cartao.model';
import { Cupom } from 'src/app/models/cupom.model';
import { Item } from 'src/app/models/item.interface';
import { Tipo } from 'src/app/models/tipo.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { CupomService } from 'src/app/services/cupom.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  items: Item[] = [];
  usuario: any;
  idEndereco: number = 1;
  idCartao: number = 1;
  formGroup: FormGroup;
  tipos: Tipo[] = [];
  cupons: Cupom[] = [];
  cupomFormGroup: FormGroup;
  cupom: any;

  constructor(
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private cupomService: CupomService) {

    this.formGroup = formBuilder.group({
      id: [null],
      tipo: [null],
      numero: [null],
      cvv: [null],
      validade: [null],
      titular: [null],
      cpf: [null],
    });

    this.cupomFormGroup = formBuilder.group({
      id: [null],
      codigo: [null],
    });
  }

  ngOnInit(): void {
    this.carrinhoService.carrinho$.subscribe(items => {
      this.items = items;
      this.initializeForm();
    });

    this.usuarioService.getLoggedUser().subscribe(data => {
      this.usuario = data;
      this.initializeForm();
    });

    this.usuarioService.getTipos().subscribe(data => {
      this.tipos = data;
      this.initializeForm();
    });

    this.cupomService.findAll(0, 16).subscribe(data => {
      this.cupom = data;
      console.log(this.cupom)
      this.initializeForm();
    })
  }

  initializeForm() {
    const cartao: Cartao = this.activatedRoute.snapshot.data['cartao'];
    const tipo = this.tipos.find(tipo => tipo.id === (cartao?.tipo?.id || null));

    this.formGroup = this.formBuilder.group({
      id: [null],
      tipo: [tipo],
      numero: ['', Validators.required],
      cvv: ['', Validators.required],
      validade: ['', Validators.required],
      titular: ['', Validators.required],
      cpf: ['', Validators.required],
    });

    this.cupomFormGroup = this.formBuilder.group({
      id: [null],
      codigo: ['', Validators.required]
    });
  }

  findAndAddCupon() {
    const codigo = this.cupomFormGroup.value.codigo;

    this.cupomService.findByCodigo(codigo).subscribe({
      next: (response: Cupom) => {
        this.cupons.push(response);
        console.log(response)
        alert('Cupom aplicado com sucesso')
        this.cupomFormGroup.reset();
      },
      error: (error) => {
        alert('Cupom não encontrado ou inválido');
      }
    });
  }

  finishOrder() {
    this.pedidoService.save(this.items, this.idEndereco, this.idCartao, this.cupons).subscribe({
      next: () => {
        console.log(this.cupons);
        this.carrinhoService.removeAll();
      },
      error: (error) => {
        console.log('Erro ao incluir', error);
      }
    });
  }

  createCartao(): void {
    const usuarioId = this.usuario.id;
    const cartao = this.formGroup.value;
    const cartoes: Cartao[] = [cartao];

    this.usuarioService.createCartao(usuarioId, cartoes).subscribe({
      next: (response) => {
        console.log('Sucesso: ', response);
      },
      error: (error) => {
        console.warn('Erro: ', error);
      }
    });
  }

  calculateTotal(): number {
    return this.items.reduce((total, item) => total + item.quantidade * item.preco, 0);
  }
}