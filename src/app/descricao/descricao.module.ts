import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DescricaoFormComponent } from './components/descricao-form/descricao-form.component';
import { DescricaoListComponent } from './components/descricao-list/descricao-list.component';
import { DescricaoRoutingModule } from './descricao-routing.module';


@NgModule({
  declarations: [
    DescricaoListComponent,
    DescricaoFormComponent
  ],
  imports: [
    CommonModule,
    DescricaoRoutingModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class DescricaoModule { }