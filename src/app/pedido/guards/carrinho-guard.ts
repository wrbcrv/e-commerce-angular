// carrinho.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoGuard implements CanActivate {
  constructor(private carrinhoService: CarrinhoService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const carrinhoVazio = this.carrinhoService.isCarrinhoVazio();
    if (!carrinhoVazio) {
      return true;
    } else {
      this.router.navigate(['/carrinho']);
      return false;
    }
  }
}
