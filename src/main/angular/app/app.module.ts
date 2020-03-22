import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CameraViewComponent } from "./apps/camera/camera-view/camera-view.component";
import { HomeViewComponent } from "./apps/home/home-view/home-view.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {StorageServiceModule} from 'angular-webstorage-service'
import { HttpClientModule } from '@angular/common/http';
import {LoginComponent} from "./login/component/login.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./register/register.component";
import {FormsModule} from "@angular/forms";
import {RegexValidatorDirective} from "./directives/regex-validator.directive";
import {LoginService} from "./login/service/login.service";
import {PrintsComponent} from "./apps/prints/prints.component";
import {PrintSearchComponent} from "./apps/prints/print-search/print-search.component";
import {MatTabsModule} from "@angular/material/tabs";
import {PrintUploadComponent} from "./apps/prints/print-upload/print-upload.component";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CameraViewComponent,
    HomeViewComponent,
    LoginComponent,
    RegisterComponent,
    RegexValidatorDirective,
    PrintsComponent,
    PrintSearchComponent,
    PrintUploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    StorageServiceModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    MatTabsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
