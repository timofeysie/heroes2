import { Component, Input, OnInit } from '@angular/core';
import { HostBinding, trigger, transition, animate,
         style, state } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HeroService } from './hero.service';
import { HeroListComponent } from './hero-list.component';
import { Hero } from './hero';

@Component({
    selector: 'my-hero-detail',
    styleUrls: ['./app/hero-styles.css', 'app/heroes/hero-detail.component.css'],
    templateUrl: './app/heroes/hero-detail.component.html',
  animations: [
    trigger('routeAnimation', [
      state('*',
        style({
          opacity: 1,
          transform: 'translateX(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'}),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.5s ease-out', style({
          opacity: 0,
          transform: 'translateY(100%)'
        }))
      ])
    ])
  ]
})
export class HeroDetailComponent implements OnInit {
    @Input()
    hero: Hero;

    @HostBinding('@routeAnimation') get routeAnimation() {
        return true;
    }
    @HostBinding('style.display') get display() {
        return 'block';
    }
    @HostBinding('style.position') get position() {
        return 'absolute';
    }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private heroService: HeroService) {
            console.log('HeroDetailComponent constructor called');
    }

    ngOnInit(): void {
        // this.route.params.forEach((params: Params) => {
        //     let id = +this.route.snapshot.params['id'];
        //     this.heroService.getHero(id)
        //         .then(hero => 
        //             this.hero = hero);
        //             //console.log('hero param', id);
        // });
        this.route.params.forEach((params: Params) => {
            let id = +params['id']; // (+) converts string 'id' to a number
            this.heroService.getHero(id).then(hero => this.hero = hero);
        });
    }

    goBack(): void {
        window.history.back();
        console.log('goBack');
    }

    goForward(oldId: number): void {
        let newId = oldId+1;
        this.heroService.getHero(newId)
            .then(hero => {
                this.hero = hero;
                history.pushState({}, this.hero.name, '/hero/'+newId);
            });
    }

    gotoHeroes() {
        let heroId = this.hero ? this.hero.id : null;
        // Pass along the hero id if available
        // so that the HeroList component can select that hero.
        this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
        //this.router.navigate(['/heroes']); // from the tut
    }

    save(): void {
        this.heroService.update(this.hero)
            .then(this.goBack);
    }

}

