import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'estados', loadChildren:
      () => import('./estado/estado.module')
        .then(m => m.EstadoModule)
  },

  {
    path: 'cidades', loadChildren:
      () => import('./cidade/cidade.module')
        .then(m => m.CidadeModule)
  },

  {
    path: 'usuarios', loadChildren:
      () => import('./usuario/usuario.module')
        .then(m => m.UsuarioModule)
  },

  {
    path: 'marcas', loadChildren:
      () => import('./marca/marca.module')
        .then(m => m.MarcaModule)
  },

  {
    path: 'cupons', loadChildren:
      () => import('./cupom/cupom.module')
        .then(m => m.CupomModule)
  },

  {
    path: 'hardwares', loadChildren:
      () => import('./hardware/hardware.module')
        .then(m => m.HardwareModule)
  },

  {
    path: 'fornecedores', loadChildren:
      () => import('./fornecedor/fornecedor.module')
        .then(m => m.FornecedorModule)
  },

  {
    path: 'descricoes', loadChildren:
      () => import('./descricao/descricao.module')
        .then(m => m.DescricaoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
