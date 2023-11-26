import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared-module';

import { Overlay } from '@angular/cdk/overlay';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MAT_SELECT_SCROLL_STRATEGY } from '@angular/material/select';
import { MAT_TOOLTIP_SCROLL_STRATEGY } from '@angular/material/tooltip';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';
import { ErrorInterceptor } from './auth/interceptors/error.interceptor';
import { HardwareCardListComponent } from './hardware/components/hardware-card-list/hardware-card-list.component';
import { PedidoModule } from './pedido/pedido.module';
import { AdminComponent } from './shared/components/admin/admin.component';
import { UserComponent } from './shared/components/user/user.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt_token'),
        allowedDomains: ['unitins.br'],
        disallowedRoutes: ['localhost:8080/login']
      }
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    PedidoModule
  ],
  providers: [
    JwtHelperService,
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_TOOLTIP_SCROLL_STRATEGY, useClass: HardwareCardListComponent },
    {
      provide: MAT_SELECT_SCROLL_STRATEGY,
      useFactory: (overlay: { scrollStrategies: { reposition: () => any; }; }) => () => overlay.scrollStrategies.reposition(),
      deps: [Overlay],
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }