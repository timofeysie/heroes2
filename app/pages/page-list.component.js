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
var router_2 = require('@angular/router');
var page_service_1 = require('./page.service');
// import { QuestionService } from '../question.service';
/** This component uses moduleId to set Component-Relative Path. */
var PageListComponent = (function () {
    function PageListComponent(pageService, router, route) {
        this.pageService = pageService;
        this.router = router;
        this.route = route;
        // this.questions = service.getQuestions();
        // console.log('yo page.component constructed with ',this.questions);
    }
    // questions: any[];
    PageListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.getPages();
        // this.pageService.getPage(1)
        //         .then(page => 
        //             this.selectedPage = page);
        this.route.params.forEach(function (params) {
            _this.selectedId = +params['id'];
            _this.pageService.getPages()
                .then(function (pages) { return _this.pages = pages; });
        });
    };
    PageListComponent.prototype.onSelect = function (page) {
        this.router.navigate(['/page', page.id]);
    };
    PageListComponent.prototype.isSelected = function (page) {
        return page.id === this.selectedId;
    };
    PageListComponent.prototype.getPages = function () {
        var _this = this;
        this.pageService.getPages()
            .then(function (pages) {
            return _this.pages = pages;
        });
    };
    PageListComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/page', this.selectedPage.id]);
    };
    PageListComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.pageService.create(name)
            .then(function (page) {
            _this.pages.push(page);
            _this.selectedPage = null;
        });
    };
    PageListComponent.prototype.delete = function (page) {
        var _this = this;
        this.pageService
            .delete(page.id)
            .then(function () {
            _this.pages = _this.pages.filter(function (h) { return h !== page; });
            if (_this.selectedPage === page) {
                _this.selectedPage = null;
            }
        });
    };
    PageListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-pages',
            styleUrls: ['../hero-styles.css'],
            templateUrl: 'page-list.component.html',
        }), 
        __metadata('design:paramtypes', [page_service_1.PageService, router_1.Router, router_2.ActivatedRoute])
    ], PageListComponent);
    return PageListComponent;
}());
exports.PageListComponent = PageListComponent;
//# sourceMappingURL=page-list.component.js.map