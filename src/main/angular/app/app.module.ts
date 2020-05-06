import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {CameraViewComponent} from "./apps/camera/camera-view/camera-view.component";
import {HomeViewComponent} from "./apps/home/home-view/home-view.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from "./login/login.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./login/register/register.component";
import {RegexValidatorDirective} from "./directives/regex-validator.directive";
import {PrintsComponent} from "./apps/prints/prints.component";
import {PrintSearchComponent} from "./apps/prints/print-search/print-search.component";
import {MatTabsModule} from "@angular/material/tabs";
import {PrintUploadComponent} from "./apps/prints/print-upload/print-upload.component";
import {LoginService} from "./services/login.service";
import {PrintService} from "./services/print.service";
import {HttpService} from "./services/http.service";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {ModelService} from "./services/model.service";
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AdminComponent} from "./admin/admin.component";
import {AccountComponent} from "./account/account.component";

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
    PrintUploadComponent,
    AdminComponent,
    AccountComponent,
  ],
    imports: [
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        AppRoutingModule,
        MatTableModule,
        MatCheckboxModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatSliderModule,
        MatButtonModule,
        MatSnackBarModule,
        MatToolbarModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatTabsModule,
        MatIconModule,
        LazyLoadImageModule,
        MatTooltipModule,
        MatExpansionModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressSpinnerModule
    ],
  providers: [
    LoginService,
    HttpService,
    PrintService,
    ModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
