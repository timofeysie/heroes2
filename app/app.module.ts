import { NgModule }            from '@angular/core';
import { BrowserModule }       from '@angular/platform-browser';
import { HttpModule }          from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import './rxjs-extensions'; // all of the extensions needed are done there

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }        from './app.component';

// Imported for the model driven forms
import { DynamicFormComponent }         from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

import { HeroService }         from './hero.service';
import { HeroesComponent }     from './heroes.component';
import { HeroDetailComponent } from './hero-detail.component';
import { DashboardComponent }  from './dashboard.component';
import { routing }             from './app.routing';
import { HeroSearchComponent } from './hero-search.component';
import {QuestionService} from './question.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroesComponent,
    DashboardComponent,
    HeroSearchComponent,
    DynamicFormComponent, 
    DynamicFormQuestionComponent 
  ],
  providers: [HeroService, QuestionService],
  bootstrap: [ AppComponent ],
  exports: [ ReactiveFormsModule ]
})
export class AppModule { 
  constructor() {
  }
}
