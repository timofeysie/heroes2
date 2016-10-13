import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { PageListComponent }    from './page-list.component';
import { PageDetailComponent }  from './page-detail.component';
import { PageService } from './page.service';
import { PageRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PagesHomeComponent } from './pages-home.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PageRoutingModule
  ],
  declarations: [
    PageListComponent,
    PageDetailComponent,
    PagesComponent,
    PagesHomeComponent
  ],
  providers: [
    PageService
  ]
})
export class PagesModule {}
