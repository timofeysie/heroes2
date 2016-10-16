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
var core_2 = require('@angular/core');
var router_1 = require('@angular/router');
var page_service_1 = require('./page.service');
var page_1 = require('./page');
var PageDetailComponent = (function () {
    function PageDetailComponent(router, route, pageService) {
        this.router = router;
        this.route = route;
        this.pageService = pageService;
        console.log('PageDetailComponent constructor called');
    }
    Object.defineProperty(PageDetailComponent.prototype, "routeAnimation", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageDetailComponent.prototype, "display", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageDetailComponent.prototype, "position", {
        get: function () {
            return 'absolute';
        },
        enumerable: true,
        configurable: true
    });
    PageDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.route.params.forEach((params: Params) => {
        //     let id = +this.route.snapshot.params['id'];
        //     this.pageService.getPage(id)
        //         .then(page => 
        //             this.page = page);
        //             //console.log('page param', id);
        // });
        this.route.params.forEach(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            _this.pageService.getPage(id).then(function (page) { return _this.page = page; });
        });
    };
    PageDetailComponent.prototype.goBack = function () {
        window.history.back();
        console.log('goBack');
    };
    PageDetailComponent.prototype.goForward = function (oldId) {
        var _this = this;
        var newId = oldId + 1;
        this.pageService.getPage(newId)
            .then(function (page) {
            _this.page = page;
            history.pushState({}, _this.page.name, '/page/' + newId);
        });
    };
    PageDetailComponent.prototype.gotoPages = function () {
        var pageId = this.page ? this.page.id : null;
        // Pass along the page id if available
        // so that the PageList component can select that page.
        this.router.navigate(['/pages', { id: pageId, foo: 'foo' }]);
        //this.router.navigate(['/pages']); // from the tut (old version)
        // Add a totally useless `foo` parameter for kicks.
        // Relative navigation back to the crises
        this.router.navigate(['../', { id: pageId, foo: 'foo' }], { relativeTo: this.route });
    };
    PageDetailComponent.prototype.save = function () {
        this.pageService.update(this.page)
            .then(this.goBack);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', page_1.Page)
    ], PageDetailComponent.prototype, "page", void 0);
    __decorate([
        core_2.HostBinding('@routeAnimation'), 
        __metadata('design:type', Object)
    ], PageDetailComponent.prototype, "routeAnimation", null);
    __decorate([
        core_2.HostBinding('style.display'), 
        __metadata('design:type', Object)
    ], PageDetailComponent.prototype, "display", null);
    __decorate([
        core_2.HostBinding('style.position'), 
        __metadata('design:type', Object)
    ], PageDetailComponent.prototype, "position", null);
    PageDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-page-detail',
            styleUrls: ['./app/hero-styles.css', 'app/pages/page-detail.component.css'],
            templateUrl: './app/pages/page-detail.component.html',
            animations: [
                core_2.trigger('routeAnimation', [
                    core_2.state('*', core_2.style({
                        opacity: 1,
                        transform: 'translateX(0)' })),
                    core_2.transition('void => *', [
                        core_2.style({
                            opacity: 0,
                            transform: 'translateX(-100%)' }),
                        core_2.animate('0.2s ease-in')
                    ]),
                    core_2.transition('* => void', [
                        core_2.animate('0.5s ease-out', core_2.style({
                            opacity: 0,
                            transform: 'translateY(100%)'
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, page_service_1.PageService])
    ], PageDetailComponent);
    return PageDetailComponent;
}());
exports.PageDetailComponent = PageDetailComponent;
//# sourceMappingURL=page-detail.component.js.map