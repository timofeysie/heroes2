"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var forms_2 = require('@angular/forms');
require('./rxjs-extensions'); // all of the extensions needed are done there
// Imports for loading & configuring the in-memory web api
var angular2_in_memory_web_api_1 = require('angular2-in-memory-web-api');
var in_memory_data_service_1 = require('./in-memory-data.service');
var app_component_1 = require('./app.component');
var app_routing_module_1 = require('./app-routing.module');
// Imported for the model driven forms
// import { DynamicFormComponent }         from './dynamic-form.component';
// import { DynamicFormQuestionComponent } from './dynamic-form-question.component';
var heroes_module_1 = require('./heroes/heroes.module');
// import { HeroSearchComponent } from './hero-search.component';
// import { QuestionService } from './question.service';
//import { CrisisListComponent }  from './crisis-list.component';
var pages_module_1 = require('./pages/pages.module');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                heroes_module_1.HeroesModule,
                pages_module_1.PagesModule,
                app_routing_module_1.AppRoutingModule,
                forms_2.ReactiveFormsModule,
                http_1.HttpModule,
                angular2_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService)
            ],
            declarations: [
                app_component_1.AppComponent,
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent],
            exports: [forms_2.ReactiveFormsModule]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map