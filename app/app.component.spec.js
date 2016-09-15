"use strict";
/* tslint:disable:no-unused-variable */
var heroes_component_1 = require('./heroes.component');
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
////////  SPECS  /////////////
/// Delete this
describe('Smoke test', function () {
    it('should run a passing test', function () {
        expect(true).toEqual(true, 'should pass');
    });
});
describe('HeroesComponent with TCB', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({ declarations: [heroes_component_1.HeroesComponent] });
    });
    //TestBed.compileComponents().catch(error => console.error('compile components err',error));
    it('should instantiate component', function () {
        var fixture = testing_1.TestBed.createComponent(heroes_component_1.HeroesComponent);
        expect(fixture.componentInstance instanceof heroes_component_1.HeroesComponent).toBe(true, 'should create HeroesComponent');
    });
    it('should have expected <h1> text', function () {
        var fixture = testing_1.TestBed.createComponent(heroes_component_1.HeroesComponent);
        fixture.detectChanges();
        var h1 = fixture.debugElement.query(function (el) { return el.name === 'h1'; }).nativeElement; // it works
        h1 = fixture.debugElement.query(platform_browser_1.By.css('h1')).nativeElement; // preferred
        expect(h1.innerText).toMatch('Myra the ferryboat');
    });
});
//# sourceMappingURL=app.component.spec.js.map