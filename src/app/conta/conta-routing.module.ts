import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './components/conta/conta.component';
import { EnderecosFormComponent } from './components/enderecos-form/enderecos-form.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';
import { enderecoResolver } from './components/resolver/endereco-resolver';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { DadosFormComponent } from './components/dados-form/dados-form.component';
import { usuarioResolver } from '../usuario/resolver/usuario-resolver';

const routes: Routes = [
  { path: '', component: ContaComponent },
  { path: 'enderecos', component: EnderecosComponent },
  { path: 'enderecos/new', component: EnderecosFormComponent },
  { path: 'enderecos/:usuarioId/edit/:enderecoId', component: EnderecosFormComponent, resolve: { endereco: enderecoResolver } },
  { path: 'pedidos', component: PedidosComponent },
  { path: 'dados/:id', component: DadosFormComponent, resolve: { usuario: usuarioResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }