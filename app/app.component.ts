import { Component } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    styleUrls: ['./app/hero-styles.css'],
    templateUrl: './app/app.template.html',
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
