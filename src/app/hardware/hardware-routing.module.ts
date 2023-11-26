import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HardwareFormComponent } from './components/hardware-form/hardware-form.component';
import { HardwareListComponent } from './components/hardware-list/hardware-list.component';
import { hardwareResolver } from './resolver/hardware-resolver';
import { HardwareCardListComponent } from './components/hardware-card-list/hardware-card-list.component';

const routes: Routes = [
  { path: 'list', component: HardwareListComponent },
  { path: 'new', component: HardwareFormComponent },
  { path: 'edit/:id', component: HardwareFormComponent, resolve: { hardware: hardwareResolver } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HardwareRoutingModule { }