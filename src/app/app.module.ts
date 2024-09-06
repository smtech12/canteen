import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LayoutModule } from '../app/Layouts/layout.module';
import { LogInComponent } from './log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon';
import { formsModule } from '../app/forms/forms.module';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/HttpErrorInterceptor';
import { AlertModule } from './alert'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainComponent } from './main/main.component';
import { ListviewComponent } from './listview/listview.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MatVideoModule } from 'mat-video';
import {UploadFileComponent} from './upload-file/upload-file.component'
import {TableModule} from 'primeng/table';

registerLocaleData(en);

const routes: Routes = [
  {
    path: '',
    redirectTo: "/login",
    pathMatch: 'full'
  },
  { path: 'login', component: LogInComponent },
  { path: 'main', component: MainComponent },
  { path: 'listview', component: ListviewComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    MainComponent,
    ListviewComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    LayoutModule,
    AlertModule,
    MatIconModule,
    formsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    NgZorroAntdModule,
    MatVideoModule,
    TableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
