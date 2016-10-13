import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageListComponent }    from './page-list.component';
import { PageDetailComponent }  from './page-detail.component';
import { PagesHomeComponent }  from './pages-home.component';
import { PagesComponent }  from './pages.component';
@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: '/page',
        pathMatch: 'full'
      },
      {
        path: 'page',
        component: PagesComponent,
        children: [
          {
            path: '',
            component: PageListComponent,
            children: [
              {
                path: ':id',
                component: PageDetailComponent
              },
              {
                path: '',
                component: PagesHomeComponent
              }
            ]}]}])
  ],
  exports: [
    RouterModule
  ]
})
export class PageRoutingModule { }