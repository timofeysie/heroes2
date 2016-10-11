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
var hero_service_1 = require('./hero.service');
var hero_1 = require('./hero');
var HeroDetailComponent = (function () {
    function HeroDetailComponent(router, route, heroService) {
        this.router = router;
        this.route = route;
        this.heroService = heroService;
        console.log('HeroDetailComponent constructor called');
    }
    Object.defineProperty(HeroDetailComponent.prototype, "routeAnimation", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroDetailComponent.prototype, "display", {
        get: function () {
            return 'block';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroDetailComponent.prototype, "position", {
        get: function () {
            return 'absolute';
        },
        enumerable: true,
        configurable: true
    });
    HeroDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.route.params.forEach((params: Params) => {
        //     let id = +this.route.snapshot.params['id'];
        //     this.heroService.getHero(id)
        //         .then(hero => 
        //             this.hero = hero);
        //             //console.log('hero param', id);
        // });
        this.route.params.forEach(function (params) {
            var id = +params['id']; // (+) converts string 'id' to a number
            _this.heroService.getHero(id).then(function (hero) { return _this.hero = hero; });
        });
    };
    HeroDetailComponent.prototype.goBack = function () {
        window.history.back();
        console.log('goBack');
    };
    HeroDetailComponent.prototype.goForward = function (oldId) {
        var _this = this;
        var newId = oldId + 1;
        this.heroService.getHero(newId)
            .then(function (hero) {
            _this.hero = hero;
            history.pushState({}, _this.hero.name, '/hero/' + newId);
        });
    };
    HeroDetailComponent.prototype.gotoHeroes = function () {
        var heroId = this.hero ? this.hero.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
        //this.router.navigate(['/heroes']); // from the tut
    };
    HeroDetailComponent.prototype.save = function () {
        this.heroService.update(this.hero)
            .then(this.goBack);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', hero_1.Hero)
    ], HeroDetailComponent.prototype, "hero", void 0);
    __decorate([
        core_2.HostBinding('@routeAnimation'), 
        __metadata('design:type', Object)
    ], HeroDetailComponent.prototype, "routeAnimation", null);
    __decorate([
        core_2.HostBinding('style.display'), 
        __metadata('design:type', Object)
    ], HeroDetailComponent.prototype, "display", null);
    __decorate([
        core_2.HostBinding('style.position'), 
        __metadata('design:type', Object)
    ], HeroDetailComponent.prototype, "position", null);
    HeroDetailComponent = __decorate([
        core_1.Component({
            selector: 'my-hero-detail',
            styleUrls: ['./app/hero-styles.css', 'app/heroes/hero-detail.component.css'],
            templateUrl: './app/heroes/hero-detail.component.html',
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
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, hero_service_1.HeroService])
    ], HeroDetailComponent);
    return HeroDetailComponent;
}());
exports.HeroDetailComponent = HeroDetailComponent;
//# sourceMappingURL=hero-detail.component.js.map