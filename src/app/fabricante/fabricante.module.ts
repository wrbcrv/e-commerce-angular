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
import { FabricanteFormComponent } from './components/fabricante-form/fabricante-form.component';
import { FabricanteListComponent } from './components/fabricante-list/fabricante-list.component';
import { FabricanteRoutingModule } from './fabricante-routing.module';

@NgModule({
    declarations: [
        FabricanteListComponent,
        FabricanteFormComponent
    ],
    imports: [
        CommonModule,
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
        FabricanteRoutingModule
    ]
})
export class FabricanteModule { }