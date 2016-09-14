import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    styleUrls: ['./app/hero-styles.css'],
    /* templateUrl: './app/app.template.html',*/
    template: `
<h1>{{title}}</h1>
<div *ngIf="selectedHero">
    <h2>{{selectedHero.name}} details:</h2>
    <div><label>id: </label>{{selectedHero.id}}</div>
    <div>
        <label>name: </label>
        <input [(attr.ngModel)]="selectedHero.name" placeholder="name"/>
    </div>
</div>
<h2>My Heroes</h2>
<ul class="heroes">
    <li *ngFor="let hero of heroes" 
        (click)="onSelect(hero)"
        [class.selected]="hero === selectedHero">
        <span class="badge">
            {{hero.id}}
        </span> {{hero.name}}
    </li>
</ul>
<my-hero-detail [hero]="selectedHero"></my-hero-detail>`,
    providers: [HeroService]
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
      this.getHeroes();
  }

    title = 'Myra the ferryboat';
    selectedHero: Hero;
    heroes: Hero[];
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    constructor(private heroService: HeroService) { }

    getHeroes(): void {
        this.heroService.getHeroes()
            .then(heroes => 
                this.heroes = heroes);
    }

}
