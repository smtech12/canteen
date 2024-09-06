import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { formsRoutingModule } from './forms-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MealsComponent } from './meals/meals.component';
import { UsersComponent } from './users/users.component';
import { DishtypeComponent } from './dishtype/dishtype.component';
import { EmployeesComponent } from './employees/employees.component';
import { MenuDetailComponent } from './menu-detail/menu-detail.component';
import { MenuDishComponent } from './menu-dish/menu-dish.component';
import { MenuDisplayComponent } from './menu-display/menu-display.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { CollectionsComponent } from './collections/collections.component';
// import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { AddmenuComponent } from './addmenu/addmenu.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from '../calendar/calendar.component';
import { MobiCalendarComponent } from '../mobi-calendar/mobi-calendar.component';
import { NzZorroAntdModule } from '../nz-zorro-antd.module';
import { MenuComponent } from './menu/menu.component';
import { DesignationComponent } from './designation/designation.component';
import { ContractorsComponent } from './contractors/contractors.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    formsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SearchPipeModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NzZorroAntdModule,
    NgxPaginationModule
  ],
  declarations: [
    DashboardComponent,
    MealsComponent,
    UsersComponent,
    DishtypeComponent,
    EmployeesComponent,
    MenuDetailComponent,
    MenuDishComponent,
    MenuDisplayComponent,
    JwPaginationComponent,
    CollectionsComponent,
    AddmenuComponent,
    CalendarComponent,
    MobiCalendarComponent,
    MenuComponent,
    DesignationComponent,
    ContractorsComponent,
  ],
})
export class formsModule { }
