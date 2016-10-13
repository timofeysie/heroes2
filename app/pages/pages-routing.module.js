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
var router_1 = require('@angular/router');
var page_list_component_1 = require('./page-list.component');
var page_detail_component_1 = require('./page-detail.component');
var pages_home_component_1 = require('./pages-home.component');
var pages_component_1 = require('./pages.component');
var PageRoutingModule = (function () {
    function PageRoutingModule() {
    }
    PageRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forChild([
                    {
                        path: '',
                        redirectTo: '/page',
                        pathMatch: 'full'
                    },
                    {
                        path: 'page',
                        component: pages_component_1.PagesComponent,
                        children: [
                            {
                                path: '',
                                component: page_list_component_1.PageListComponent,
                                children: [
                                    {
                                        path: ':id',
                                        component: page_detail_component_1.PageDetailComponent
                                    },
                                    {
                                        path: '',
                                        component: pages_home_component_1.PagesHomeComponent
                                    }
                                ] }] }])
            ],
            exports: [
                router_1.RouterModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PageRoutingModule);
    return PageRoutingModule;
}());
exports.PageRoutingModule = PageRoutingModule;
//# sourceMappingURL=pages-routing.module.js.map