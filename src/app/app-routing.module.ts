import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/components/login/login.component';
import { MapComponent } from './components/location/components/map/map.component';
import { AccountGuard} from './components/account/gurds/account.guard'


const routes: Routes =[


  { path: 'Home', component: MapComponent },
  { path: 'Login', component:LoginComponent ,  canActivate: [AccountGuard]},
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
