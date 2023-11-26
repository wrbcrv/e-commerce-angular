import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from './local-storage-service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL: string = 'http://localhost:8080/auth';
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient,
    private localStorageService: LocalStorageService,
    private jwtHelper: JwtHelperService) { }


  login(email: string, senha: string): Observable<any> {
    const params = {
      login: email,
      senha: senha
    }

    return this.http.post(`${this.baseURL}`, params, { observe: 'response' }).pipe(
      tap((res: any) => {
        const authToken = res.headers.get('Authorization') ?? '';
        if (authToken) {
          this.setToken(authToken);
        }
      })
    );
  }

  setToken(token: string): void {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  removeToken(): void {
    this.localStorageService.removeItem(this.tokenKey);
  }

  isTokenExpired(): boolean {
    const token = this.getToken();

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  getUserRole(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.groups[0] || null;
    }

    return null;
  }

  getSubject(): string | null {
    const token = this.getToken();

    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.sub || null;
    }

    return null;
  }
}