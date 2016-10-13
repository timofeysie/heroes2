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
var hero_service_1 = require('./hero.service');
// import { QuestionService } from '../question.service';
/** This component uses moduleId to set Component-Relative Path. */
var HeroListComponent = (function () {
    function HeroListComponent(heroService, router, route) {
        this.heroService = heroService;
        this.router = router;
        this.route = route;
        // this.questions = service.getQuestions();
        // console.log('yo hero.component constructed with ',this.questions);
    }
    // questions: any[];
    HeroListComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.getHeroes();
        // this.heroService.getHero(1)
        //         .then(hero => 
        //             this.selectedHero = hero);
        this.route.params.forEach(function (params) {
            _this.selectedId = +params['id'];
            _this.heroService.getHeroes()
                .then(function (heroes) { return _this.heroes = heroes; });
        });
    };
    HeroListComponent.prototype.onSelect = function (hero) {
        this.router.navigate(['/hero', hero.id]);
    };
    HeroListComponent.prototype.isSelected = function (hero) {
        return hero.id === this.selectedId;
    };
    HeroListComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) {
            return _this.heroes = heroes;
        });
    };
    HeroListComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/hero', this.selectedHero.id]);
    };
    HeroListComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedHero = null;
        });
    };
    HeroListComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService
            .delete(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedHero === hero) {
                _this.selectedHero = null;
            }
        });
    };
    HeroListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-heroes',
            styleUrls: ['../hero-styles.css'],
            templateUrl: 'hero-list.component.html',
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService, router_1.Router, router_2.ActivatedRoute])
    ], HeroListComponent);
    return HeroListComponent;
}());
exports.HeroListComponent = HeroListComponent;
//# sourceMappingURL=hero-list.component.js.map