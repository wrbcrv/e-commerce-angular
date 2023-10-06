import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescricaoFormComponent } from './components/descricao-form/descricao-form.component';
import { DescricaoListComponent } from './components/descricao-list/descricao-list.component';
import { descricaoResolver } from './resolver/descricao-resolver';

const routes: Routes = [
  { path: 'list', component: DescricaoListComponent },
  { path: 'new', component: DescricaoFormComponent },
  { path: 'edit/:id', component: DescricaoFormComponent, resolve: { descricao: descricaoResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DescricaoRoutingModule { }