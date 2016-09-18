import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { HeroService } from './hero.service';
import { HeroesComponent } from './heroes.component';
import { Hero } from './hero';

@Component({
    selector: 'my-hero-detail',
    styleUrls: ['./app/hero-styles.css', 'app/hero-detail.component.css'],
    templateUrl: './app/hero-detail.component.html'
})
export class HeroDetailComponent implements OnInit {
    @Input()
    hero: Hero;

    constructor(
        private heroService: HeroService,
        private router: Router,
        private route: ActivatedRoute) {
            console.log('HeroDetailComponent constructor called');
    }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; //convert the route parameter value to a number
            this.heroService.getHero(id)
                .then(hero => 
                    this.hero = hero);
                    //console.log('hero param', id);
            });
    }

    goBack(): void {
        window.history.back();
        console.log('goBack');
    }

    goForward(): void {
        let newId = this.hero.id++;
        this.heroService.getHero(newId)
            .then(hero => {
                this.hero = hero;
                this.router.navigate(['/detail', newId]);
                console.log('goForward');
            });
    }

}
