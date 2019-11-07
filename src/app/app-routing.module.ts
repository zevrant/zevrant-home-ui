import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CameraViewComponent} from './apps/camera/camera-view/camera-view.component';
import {HomeViewComponent} from './apps/home/home-view/home-view.component';


const routes: Routes = [
  {path: 'home', component: HomeViewComponent},
  {path: 'camera', component: CameraViewComponent, data: {title: 'Zevrant Doggie Cam'}},
  {path: '', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
