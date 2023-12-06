import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hardware } from 'src/app/models/hardware.model';
import { HardwareService } from 'src/app/services/hardware.service';

@Component({
  selector: 'app-hardware-details',
  templateUrl: './hardware-details.component.html',
  styleUrls: ['./hardware-details.component.css']
})
export class HardwareDetailsComponent {
  produto: any;
  imageUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private hardwareService: HardwareService
  ) { }

  ngOnInit(): void {
    this.getProdutoDetalhes();
  }

  getProdutoDetalhes(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id !== null) {
      this.hardwareService.findById(id).subscribe(produto => {
        this.produto = produto;
        this.imageUrl = this.hardwareService.getImageUrl(produto.imageName);
      });
    }
  }
}
