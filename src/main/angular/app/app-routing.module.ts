import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/component/login.component";
import {RegisterComponent} from "./register/register.component";
import {HomeViewComponent} from "./apps/home/home-view/home-view.component";


const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
