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
var HEROES = [
    { id: 11, name: 'Myra' },
    { id: 12, name: 'Stingray' },
    { id: 13, name: 'Hakea Blossom' },
    { id: 14, name: 'Bonnie Doon' },
    { id: 15, name: 'Palm Beach Wharf' },
    { id: 16, name: 'Pittwater' },
    { id: 17, name: 'Serrata' },
    { id: 18, name: 'Coasters Retreat' },
    { id: 19, name: 'The Basin' },
    { id: 20, name: 'Lion Island' },
    { id: 21, name: 'Broken Bay' },
    { id: 22, name: 'Refuge Bay' },
    { id: 23, name: 'Hakea seed' },
    { id: 24, name: 'Wallaby' }
];
var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Myra the ferryboat';
        this.heroes = HEROES;
    }
    AppComponent.prototype.onSelect = function (hero) {
        this.selectedHero = hero;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            styleUrls: ['./app/hero-styles.css'],
            templateUrl: './app/app.template.html'
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map