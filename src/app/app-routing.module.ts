import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistractionComponent } from './registraction/registraction.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth/guard.guard';
import { ResultComponent } from './result/result.component';
import { HistoryComponent } from './history/history.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: RegistractionComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [AuthGuard],
  },
  // {
  //   path: 'home/history',
  //   component: HistoryComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
