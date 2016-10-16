import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { FormsModule }         from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import './rxjs-extensions'; // all of the extensions needed are done there

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }        from './app.component';
import { AppRoutingModule }    from './app-routing.module';
import { routing }             from './app.routing';

// Imported for the model driven forms
// import { DynamicFormComponent }         from './dynamic-form.component';
// import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

import { HeroesModule }         from './heroes/heroes.module';
// import { HeroService }         from './heroes/hero.service';
// import { HeroListComponent }     from './heroes/hero-list.component';
import { DashboardComponent }  from './dashboard.component';

import { HeroSearchComponent } from './hero-search.component';
// import { QuestionService } from './question.service';
//import { CrisisListComponent }  from './crisis-list.component';
import { PagesModule }     from './pages/pages.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HeroesModule,
    PagesModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  declarations: [
    AppComponent,
    //CrisisListComponent
    //HeroListComponent, its being provided by the HeroesModule now
    // there can be only one owner for a declared component
    DashboardComponent,
    HeroSearchComponent,
    // DynamicFormComponent, 
    // DynamicFormQuestionComponent 
  ],
  providers: [
    // HeroService,
    // QuestionService
    ],
  bootstrap: [ AppComponent ],
  exports: [ ReactiveFormsModule ]
})
export class AppModule { 
  constructor() {
  }
}
