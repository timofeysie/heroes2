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
// Imported for the model driven forms
var dynamic_form_component_1 = require('./dynamic-form.component');
var dynamic_form_question_component_1 = require('./dynamic-form-question.component');
var hero_service_1 = require('./hero.service');
var heroes_component_1 = require('./heroes.component');
var hero_detail_component_1 = require('./hero-detail.component');
var dashboard_component_1 = require('./dashboard.component');
var app_routing_1 = require('./app.routing');
var hero_search_component_1 = require('./hero-search.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_2.ReactiveFormsModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                angular2_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService),
                app_routing_1.routing
            ],
            declarations: [
                app_component_1.AppComponent,
                hero_detail_component_1.HeroDetailComponent,
                heroes_component_1.HeroesComponent,
                dashboard_component_1.DashboardComponent,
                hero_search_component_1.HeroSearchComponent,
                dynamic_form_component_1.DynamicFormComponent,
                dynamic_form_question_component_1.DynamicFormQuestionComponent
            ],
            providers: [hero_service_1.HeroService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map