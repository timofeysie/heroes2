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
var hero_service_1 = require('./hero.service');
var AppComponent = (function () {
    function AppComponent(heroService) {
        this.heroService = heroService;
        this.title = 'Myra the ferryboat';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getHeroes();
    };
    AppComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    AppComponent.prototype.getHeroes = function () {
        var _this = this;
        this.heroService.getHeroes()
            .then(function (heroes) {
            return _this.heroes = heroes;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styleUrls: ['./app/hero-styles.css'],
            /* templateUrl: './app/app.template.html',*/
            template: "\n<h1>{{title}}</h1>\n<div *ngIf=\"selectedHero\">\n    <h2>{{selectedHero.name}} details:</h2>\n    <div><label>id: </label>{{selectedHero.id}}</div>\n    <div>\n        <label>name: </label>\n        <input [(attr.ngModel)]=\"selectedHero.name\" placeholder=\"name\"/>\n    </div>\n</div>\n<h2>My Heroes</h2>\n<ul class=\"heroes\">\n    <li *ngFor=\"let hero of heroes\" \n        (click)=\"onSelect(hero)\"\n        [class.selected]=\"hero === selectedHero\">\n        <span class=\"badge\">\n            {{hero.id}}\n        </span> {{hero.name}}\n    </li>\n</ul>\n<my-hero-detail [hero]=\"selectedHero\"></my-hero-detail>",
            providers: [hero_service_1.HeroService]
        }), 
        __metadata('design:paramtypes', [hero_service_1.HeroService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map