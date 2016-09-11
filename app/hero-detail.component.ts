import { Component, Input } from '@angular/core';
import { Hero } from './hero';

@Component({
    selector: 'my-hero-detail',
    styleUrls: ['./app/hero-styles.css'],
    templateUrl: './app/hero-detail.template.html'
})
export class HeroDetailComponent {
    @Input()
    hero: Hero;
}