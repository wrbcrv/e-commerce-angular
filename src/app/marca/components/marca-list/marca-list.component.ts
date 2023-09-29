import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { MarcaService } from 'src/app/services/marca.service';

@Component({
    selector: 'app-marca-list',
    templateUrl: './marca-list.component.html',
    styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit {

    tableColumns: string[] = ['id-column', 'nome-column', 'site-column', 'fundacao-column', 'sede-column'];
    marcas: Marca[] = [];

    constructor(private marcaService: MarcaService) { }

    ngOnInit(): void {
        this.marcaService.findAll().subscribe(data => {
            this.marcas = data;
        });
    }
}