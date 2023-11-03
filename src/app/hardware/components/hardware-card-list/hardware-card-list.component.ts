import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Hardware } from 'src/app/models/hardware.model';
import { HardwareService } from 'src/app/services/hardware.service';

type Card = {
  categoria: number;
  status: number;
  imageUrl: string;
  modelo: string;
  preco: number;
}

@Component({
  selector: 'app-hardware-card-list',
  templateUrl: './hardware-card-list.component.html',
  styleUrls: ['./hardware-card-list.component.css']
})
export class HardwareCardListComponent implements OnInit {

  cards = signal<Card[]>([]);
  hardwares: Hardware[] = [];
  totalRegistros = 0;
  pageSize = 16;
  page = 0;
  filter: string = '';

  constructor(private hardwareService: HardwareService) { }

  ngOnInit(): void {
    this.loadHardwares();
    this.loadTotal();
  }

  loadCards() {
    const cards: Card[] = [];

    this.hardwares.forEach(hardware => {
      cards.push({
        categoria: hardware.idCategoria,
        status: hardware.idStatus,
        imageUrl: this.hardwareService.getImageUrl(hardware.imageName),
        modelo: hardware.modelo,
        preco: hardware.preco
      });
    });

    this.cards.set(cards);
  }

  loadHardwares() {
    if (this.filter) {
      this.hardwareService.findByModelo(this.filter, this.page, this.pageSize).subscribe(data => {
        this.hardwares = data;
        this.loadCards();
      });
    } else {
      this.hardwareService.findAll(this.page, this.pageSize).subscribe(data => {
        this.hardwares = data;
        this.loadCards();
      });
    }
  }

  loadTotal() {
    if (this.filter) {
      this.hardwareService.countByNome(this.filter).subscribe(data => {
        this.totalRegistros = data;
      });
    } else {
      this.hardwareService.count().subscribe(data => {
        this.totalRegistros = data;
      });
    }
  }

  paginate(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadHardwares();
  }

  applyFilter() {
    this.loadCards();
    this.loadHardwares();
    this.loadTotal();
  }
}