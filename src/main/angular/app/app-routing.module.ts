import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/component/login.component";
import {RegisterComponent} from "./register/register.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'login/register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
