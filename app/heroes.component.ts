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
        this.heroService.getHero(1)
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

    /** Currently this navigation method does not work.  
     * it jumps back to the provious route. */
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }

    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.create(name)
            .then(hero => {
            this.heroes.push(hero);
            this.selectedHero = null;
            });
    }

    delete(hero: Hero): void {
        this.heroService
            .delete(hero.id)
            .then(() => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) { this.selectedHero = null; }
            });
    }


}
