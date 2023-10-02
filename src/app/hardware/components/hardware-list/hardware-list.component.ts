import { Component, OnInit } from '@angular/core';
import { Hardware } from 'src/app/models/hardware.model';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware-list',
  templateUrl: './hardware-list.component.html',
  styleUrls: ['./hardware-list.component.css']
})
export class HardwareListComponent implements OnInit {

  tableColumns: string[] = ['id-column', 'nome-column', 'preco-column', 'estoque-column', 'modelo-column', 'lancamento-column'];
  hardwares: Hardware[] = [];

  constructor(private hardwareService: HardwareService) { }

  ngOnInit(): void {
    this.hardwareService.findAll().subscribe(data => {
      this.hardwares = data;
    });
  }
}