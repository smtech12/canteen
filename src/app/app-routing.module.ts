import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainlayoutComponent } from '../app/Layouts/mainlayout/mainlayout.component';

const routes: Routes = [
  // {path: '', component: LogInComponent},
  // {path: 'dashboard', component: DashboardComponent},

  {
    path: '', component: MainlayoutComponent,
    data: { pageTitle: 'Home' },
    children: [
      {
        path: '', redirectTo: '', pathMatch: 'full'
      },
      {
        path: 'Forms',
        loadChildren: () => import('app/forms/forms.module').then(m => m.formsModule),
        data: { pageTitle: 'Forms' }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
