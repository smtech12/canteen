import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainlayoutComponent } from '../Layouts/mainlayout/mainlayout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UsersComponent } from '../forms/users/users.component';
import { EmployeesComponent } from '../forms/employees/employees.component';
import { MealsComponent } from '../forms/meals/meals.component';
import { DishtypeComponent } from '../forms/dishtype/dishtype.component';
import { MenuDishComponent } from '../forms/menu-dish/menu-dish.component';
import { MenuDetailComponent } from '../forms/menu-detail/menu-detail.component';
import { MenuDisplayComponent } from '../forms/menu-display/menu-display.component';
import { CollectionsComponent } from '../forms/collections/collections.component';
import { AddmenuComponent } from '../forms/addmenu/addmenu.component';
import { MobiCalendarComponent } from '../mobi-calendar/mobi-calendar.component';
import { UploadFileComponent } from '../upload-file/upload-file.component'
import { MenuComponent } from '../forms/menu/menu.component'
import { DesignationComponent } from '../forms/designation/designation.component'
import { ContractorsComponent } from '../forms/contractors/contractors.component'

const routes: Routes = [
  {
    path: 'dashboard',
    component: MainlayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'meals', component: MealsComponent },
      { path: 'dishtype', component: DishtypeComponent },
      { path: 'menudish', component: MenuDishComponent },
      { path: 'menudetail', component: MenuDetailComponent },
      { path: 'menudisplay', component: MenuDisplayComponent },
      { path: 'collections', component: CollectionsComponent },
      { path: 'addmenu', component: AddmenuComponent },
      { path: 'addMenuDetail', component: MobiCalendarComponent },
      { path: 'uploadFile', component: UploadFileComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'designation', component: DesignationComponent },
      { path: 'contractors', component: ContractorsComponent }


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class formsRoutingModule { }
