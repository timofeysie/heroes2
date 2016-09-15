/* tslint:disable:no-unused-variable */
import { HeroesComponent } from './heroes.component';
import { TestBed } from '@angular/core/testing';
import { By }             from '@angular/platform-browser';
////////  SPECS  /////////////
/// Delete this
describe('Smoke test', () => {
  it('should run a passing test', () => {
    expect(true).toEqual(true, 'should pass');
  });
});

describe('HeroesComponent with TCB', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [HeroesComponent]});
  });
  //TestBed.compileComponents().catch(error => console.error('compile components err',error));

  it('should instantiate component', () => {
    let fixture = TestBed.createComponent(HeroesComponent);
    expect(fixture.componentInstance instanceof HeroesComponent).toBe(true, 'should create HeroesComponent');
  });

  it('should have expected <h1> text', () => {
    let fixture = TestBed.createComponent(HeroesComponent);
    fixture.detectChanges();

    let h1 = fixture.debugElement.query(el => el.name === 'h1').nativeElement;  // it works

        h1 = fixture.debugElement.query(By.css('h1')).nativeElement;            // preferred

    expect(h1.innerText).toMatch('Myra the ferryboat');
  });
});
