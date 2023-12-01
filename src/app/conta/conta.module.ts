import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContaComponent } from './components/conta/conta.component';
import { ContaRoutingModule } from './conta-routing.module';

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