import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ContaComponent } from './components/conta/conta.component';
import { EnderecosFormComponent } from './components/enderecos-form/enderecos-form.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';
import { ContaRoutingModule } from './conta-routing.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { DadosFormComponent } from './components/dados-form/dados-form.component';

@NgModule({
  declarations: [
    ContaComponent,
    EnderecosComponent,
    EnderecosFormComponent,
    PedidosComponent,
    DadosFormComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule
  ]
})
export class ContaModule { }