import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { SharedRoutingModule } from './shared-routing.module';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainComponent } from './components/main/main.component';

@NgModule({
    declarations: [
        HeaderComponent,
        MainComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        SharedRoutingModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule

    ],
    exports: [
        HeaderComponent,
        MainComponent,
        FooterComponent
    ]
})
export class SharedModule { }