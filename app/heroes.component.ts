import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
/** This component uses moduleId to set Component-Relative Path. */
@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    styleUrls: ['hero-styles.css'],
    templateUrl: 'heroes.component.html',
    providers: []
})
export class HeroesComponent implements OnInit {

  ngOnInit(): void {
      this.getHeroes();
  }

    selectedHero: Hero;
    heroes: Hero[];
    onSelect(hero: Hero): void {
        console.log('hero', hero);
        this.selectedHero = hero;
    }

    constructor(private heroService: HeroService) { }

    getHeroes(): void {
        this.heroService.getHeroes()
            .then(heroes => 
                this.heroes = heroes);
    }

}
