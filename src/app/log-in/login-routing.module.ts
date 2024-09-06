import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from '../log-in/log-in.component';
import { MainComponent } from '../../app/main/main.component';
import { ListviewComponent } from '../../app/listview/listview.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'listview',
    component: ListviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }