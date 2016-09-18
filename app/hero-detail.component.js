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
var hero_service_1 = require('./hero.service');
var hero_1 = require('./hero');
var HeroDetailComponent = (function () {
    function HeroDetailComponent(heroService, router, route) {
        this.heroService = heroService;
        this.router = router;
        this.route = route;
        console.log('HeroDetailComponent constructor called');
    }
    HeroDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id']; //convert the route parameter value to a number
            _this.heroService.getHero(id)
                .then(function (hero) {
                return _this.hero = hero;
            });
            //console.log('hero param', id);
        });
    };
    HeroDetailComponent.prototype.goBack = function () {
        window.history.back();
        console.log('goBack');
    };
    HeroDetailComponent.prototype.goForward = function () {
        var _this = this;
        var newId = this.hero.id++;
        this.heroService.getHero(newId)
            .then(function (hero) {
            _this.hero = hero;
            _this.router.navigate(['/detail', newId]);
            console.log('goForward');
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hero_1.Hero)
    ], HeroDetailComponent.prototype, "hero", void 0);
    HeroDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-hero-detail',
            styleUrls: ['./app/hero-styles.css', 'app/hero-detail.component.css'],
            templateUrl: './app/hero-detail.component.html'
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.Router, router_1.ActivatedRoute])
    ], HeroDetailComponent);
    return HeroDetailComponent;
}());
exports.HeroDetailComponent = HeroDetailComponent;
//# sourceMappingURL=hero-detail.component.js.map