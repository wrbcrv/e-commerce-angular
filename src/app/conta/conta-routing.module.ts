import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContaComponent } from './components/conta/conta.component';
import { EnderecosFormComponent } from './components/enderecos-form/enderecos-form.component';
import { EnderecosComponent } from './components/enderecos/enderecos.component';
import { enderecoResolver } from './components/resolver/endereco-resolver';

const routes: Routes = [
  { path: '', component: ContaComponent },
  { path: 'enderecos', component: EnderecosComponent },
  { path: 'enderecos/new', component: EnderecosFormComponent },
  {
    path: 'enderecos/:usuarioId/edit/:enderecoId',
    component: EnderecosFormComponent,
    resolve: { endereco: enderecoResolver } // Use the resolver
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContaRoutingModule { }