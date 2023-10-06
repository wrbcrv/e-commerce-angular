import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EstadoFormComponent } from './components/estado-form/estado-form.component';
import { EstadoListComponent } from './components/estado-list/estado-list.component';
import { EstadoRoutingModule } from './estado-routing.module';

@NgModule({
  declarations: [
    EstadoListComponent,
    EstadoFormComponent
  ],
  imports: [
    CommonModule,
    EstadoRoutingModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class EstadoModule { }