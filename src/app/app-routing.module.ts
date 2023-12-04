import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { ContaComponent } from './conta/components/conta/conta.component';
import { HardwareCardListComponent } from './hardware/components/hardware-card-list/hardware-card-list.component';
import { CarrinhoComponent } from './pedido/components/carrinho/carrinho.component';
import { AdminComponent } from './template/components/admin/admin.component';
import { UserComponent } from './template/components/user/user.component';
import { CheckoutComponent } from './pedido/components/checkout/checkout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'cidades', loadChildren: () => import('./cidade/cidade.module').then(m => m.CidadeModule) },
      { path: 'cupons', loadChildren: () => import('./cupom/cupom.module').then(m => m.CupomModule) },
      { path: 'descricoes', loadChildren: () => import('./descricao/descricao.module').then(m => m.DescricaoModule) },
      { path: 'estados', loadChildren: () => import('./estado/estado.module').then(m => m.EstadoModule) },
      { path: 'fabricantes', loadChildren: () => import('./fabricante/fabricante.module').then(m => m.FabricanteModule) },
      { path: 'fornecedores', loadChildren: () => import('./fornecedor/fornecedor.module').then(m => m.FornecedorModule) },
      { path: 'hardwares', loadChildren: () => import('./hardware/hardware.module').then(m => m.HardwareModule) },
      { path: 'marcas', loadChildren: () => import('./marca/marca.module').then(m => m.MarcaModule) },
      { path: 'usuarios', loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule) },
    ]
  },

  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'conta', component: ContaComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'carrinho', component: CarrinhoComponent },
      { path: 'produtos', component: HardwareCardListComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }