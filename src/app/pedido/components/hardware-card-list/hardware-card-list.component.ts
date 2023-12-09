import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Hardware } from 'src/app/models/hardware.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { HardwareService } from 'src/app/services/hardware.service';
import { UsuarioService } from 'src/app/services/usuario.service';

type Card = {
  id: number;
  categoria: string;
  status: string;
  imageName: string;
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
  usuario: any;
  selectedHardwareId: number | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private hardwareService: HardwareService,
    private carrinhoService: CarrinhoService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: ParamMap | null) => {
      if (params) {
        this.filter = params.get('filter')! || '';
        this.page = +params.get('page')! || 0;
        this.pageSize = +params.get('pageSize')! || 16;

        this.loadHardwares();
        this.loadTotal();
      }
    });

    this.usuarioService.getLoggedUser().subscribe(data => {
      this.usuario = data;
    })
  }

  loadCards() {
    const cards: Card[] = [];

    this.hardwares.forEach(hardware => {
      cards.push({
        id: hardware.id,
        categoria: hardware.categoria.label,
        status: hardware.status.label,
        imageName: this.hardwareService.getImageUrl(hardware.imageName),
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

    this.updateUrl();
  }

  applyFilter() {
    this.loadCards();
    this.loadHardwares();
    this.loadTotal();
    this.updateUrl();
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') this.applyFilter();
  }

  addToCarrinho(card: Card) {
    this.selectedHardwareId = card.id;

    this.carrinhoService.add({
      id: card.id,
      nome: card.modelo,
      preco: card.preco,
      quantidade: 1,
      imageName: card.imageName
    });

    this.openSnackBar('Adicionado ao carrinho', 'Ok');
  }

  private updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { filter: this.filter, page: this.page, pageSize: this.pageSize },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }

  associateFavorito(hardwareId: number) {
    if (this.selectedHardwareId == null) {
      const usuarioId = this.usuario.id;

      this.usuarioService.addFavorito(usuarioId, hardwareId).subscribe(
        (usuario) => {
          this.openSnackBar('Adicionado aos favoritos', 'Ok');
        },
        (error) => {
          this.openSnackBar('Erro ao adicionar aos favoritos', 'Ok')
        }
      );
    } else {
      console.error('No hardware selected to associate with favorito');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}