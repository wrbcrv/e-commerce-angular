import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarrinhoComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    FormsModule
  ]
})
export class PedidoModule { }