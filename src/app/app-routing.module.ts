import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cidades', loadChildren:
    () => import('./cidade/cidade.module')
    .then(m => m.CidadeModule)
  },

  {
    path: 'cupons', loadChildren:
    () => import('./cupom/cupom.module')
    .then(m => m.CupomModule)
  },
    
  {
    path: 'descricoes', loadChildren:
    () => import('./descricao/descricao.module')
    .then(m => m.DescricaoModule)
  },
    
  {
    path: 'estados', loadChildren:
    () => import('./estado/estado.module')
    .then(m => m.EstadoModule)
  },
    
  {
    path: 'fabricantes', loadChildren:
    () => import('./fabricante/fabricante.module')
    .then(m => m.FabricanteModule)
  },
    
  {
    path: 'fornecedores', loadChildren:
    () => import('./fornecedor/fornecedor.module')
    .then(m => m.FornecedorModule)
  },
    
  {
      path: 'hardwares', loadChildren:
      () => import('./hardware/hardware.module')
        .then(m => m.HardwareModule)
  },
    
  {
    path: 'marcas', loadChildren:
    () => import('./marca/marca.module')
    .then(m => m.MarcaModule)
  },
    
  {
    path: 'usuarios', loadChildren:
    () => import('./usuario/usuario.module')
    .then(m => m.UsuarioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
