import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContaRoutingModule } from './conta-routing.module';
import { ContaComponent } from './conta/conta.component';

@NgModule({
  declarations: [
    ContaComponent
  ],
  imports: [
    CommonModule,
    ContaRoutingModule
  ]
})
export class ContaModule { }