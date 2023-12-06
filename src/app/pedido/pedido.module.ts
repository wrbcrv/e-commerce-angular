import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { CarrinhoComponent } from './components/carrinho/carrinho.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule } from '@angular/forms';
import { HardwareDetailsComponent } from './components/hardware-details/hardware-details.component';

@NgModule({
  declarations: [
    CarrinhoComponent,
    CheckoutComponent,
    HardwareDetailsComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    FormsModule
  ]
})
export class PedidoModule { }