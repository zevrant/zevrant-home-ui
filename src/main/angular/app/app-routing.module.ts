import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {HomeViewComponent} from "./apps/home/home-view/home-view.component";
import {PrintsComponent} from "./apps/prints/prints.component";
import {AdminComponent} from "./admin/admin.component";
import {AccountProxyComponent} from "./proxies/account/account-proxy.component";


const routes: Routes = [
  { path: '', component: HomeViewComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/register', component: RegisterComponent },
  { path: 'prints', component: PrintsComponent },
  { path: 'administration', component: AdminComponent },
  { path: 'account', component: AccountProxyComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
