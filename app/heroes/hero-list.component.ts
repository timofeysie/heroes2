import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { OnInit } from '@angular/core';
// import { QuestionService } from '../question.service';

/** This component uses moduleId to set Component-Relative Path. */
@Component({
    moduleId: module.id,
    selector: 'my-heroes',
    styleUrls: ['../hero-styles.css'],
    templateUrl: 'hero-list.component.html',
    // providers: [HeroService,QuestionService]
})
export class HeroListComponent implements OnInit {
    private selectedId: number;
    selectedHero: Hero;
    heroes: Hero[];
    // questions: any[];

    ngOnInit(): void {
        // this.getHeroes();
        // this.heroService.getHero(1)
        //         .then(hero => 
        //             this.selectedHero = hero);
        this.route.params.forEach((params: Params) => {
        this.selectedId = +params['id'];
        this.heroService.getHeroes()
          .then(heroes => this.heroes = heroes);
      });
    }

    onSelect(hero: Hero) {
        this.router.navigate(['/hero', hero.id]);
    }

    isSelected(hero: Hero) { 
        return hero.id === this.selectedId; 
    }

    constructor(
        private heroService: HeroService,
        private router: Router,
        private route: ActivatedRoute
        // private service: QuestionService
        ) {
            // this.questions = service.getQuestions();
            // console.log('yo hero.component constructed with ',this.questions);
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .then(heroes => 
                this.heroes = heroes);
    }

    gotoDetail(): void {
        this.router.navigate(['/hero', this.selectedHero.id]);
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
