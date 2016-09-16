import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
    selectedHero: Hero;
    heroes: Hero[];

    ngOnInit(): void {
        this.getHeroes();
        this.heroService.getHero(11)
                .then(hero => 
                    this.selectedHero = hero);
    }

    onSelect(hero: Hero): void {
        console.log('hero', hero);
        this.selectedHero = hero;
    }

    constructor(
        private heroService: HeroService,
        private router: Router) {
            console.log('hero.component constructed');
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .then(heroes => 
                this.heroes = heroes);
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

}
