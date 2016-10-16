import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent }  from './dashboard.component';

// import { CrisisListComponent }  from './crisis-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
    //   { path: 'crisis-center', component: CrisisListComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
