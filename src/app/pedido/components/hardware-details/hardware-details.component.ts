import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Hardware } from 'src/app/models/hardware.model';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware-details',
  templateUrl: './hardware-details.component.html',
  styleUrls: ['./hardware-details.component.css']
})
export class HardwareDetailsComponent {
  produto: any;
  imageName: string | undefined;

  constructor(
    private hardwareService: HardwareService,
    private carrinhoService: CarrinhoService,
    private _snackBar: MatSnackBar,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProdutoDetalhes();
  }

  getProdutoDetalhes(): void {
    const id = this.ActivatedRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.hardwareService.findById(id).subscribe(produto => {
        this.produto = produto;
        console.log(this.produto);
        this.imageName = this.hardwareService.getImageUrl(produto.imageName);
      });
    }
  }

  addToCart(): void {
    if (this.produto) {
      this.carrinhoService.add({
        id: this.produto.id,
        nome: this.produto.modelo,
        preco: this.produto.preco,
        quantidade: 1,
        imageName: this.imageName || ''
      });

      this.openSnackBar('Adicionado ao carrinho', 'Ok');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
