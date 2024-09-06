import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common'
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MainlayoutComponent } from '../../app/Layouts/mainlayout/mainlayout.component';
import { FooterComponent } from '../../app/Layouts/footer/footer.component';
import { HeaderComponent } from '../../app/Layouts/header/header.component';
import { SidebarComponent } from '../../app/Layouts/sidebar/sidebar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AlertModule} from '../alert'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    BrowserModule,
    FlexLayoutModule,
    AlertModule
  ],
  exports: [
    MainlayoutComponent,
    FooterComponent
  ],
  declarations: [
    MainlayoutComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent
  ],
  
})
export class LayoutModule { }
