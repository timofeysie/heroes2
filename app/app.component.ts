import { Component } from '@angular/core';
import { Hero } from './hero';

const HEROES: Hero[] = [
    { id: 11, name: 'Myra' },
    { id: 12, name: 'Stingray' },
    { id: 13, name: 'Hakea Blossom' },
    { id: 14, name: 'Bonnie Doon' },
    { id: 15, name: 'Palm Beach Wharf' },
    { id: 16, name: 'Pittwater' },
    { id: 17, name: 'Serrata' },
    { id: 18, name: 'Coasters Retreat' },
    { id: 19, name: 'The Basin' },
    { id: 20, name: 'Lion Island' },
    { id: 21, name: 'Broken Bay' },
    { id: 22, name: 'Refuge Bay' },
    { id: 23, name: 'Hakea seed' },
    { id: 24, name: 'Wallaby' }
];

@Component({
    selector: 'my-app',
    styleUrls: ['./app/hero-styles.css'],
    templateUrl: './app/app.template.html'
})
export class AppComponent {

    title = 'Myra the ferryboat';
    selectedHero: Hero;
    heroes = HEROES;
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
}
