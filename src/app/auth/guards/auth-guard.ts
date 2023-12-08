import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isTokenExpired()) {
      this.authService.removeToken();
      this.router.navigate(['/login']);

      return false;
    }

    const role = this.authService.getUserRole();

    if (route.data['roles'] && !route.data['roles'].includes(role)) {
      this.router.navigate(['/produtos']);

      return false;
    }

    return true;
  }
}