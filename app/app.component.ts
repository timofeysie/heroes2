import { Component } from '@angular/core';

export class Hero {
  id: number;
  name: string;
}

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
    template: `
  <h1>{{title}}</h1>
  <h2>{{hero.name}} details:</h2>
  <div><label>id: </label>{{hero.id}}</div>
  <div>
    <label>name: </label>
    <input [(ngModel)]="hero.name" placeholder="name">
  </div>
  <h2>My Heroes</h2>
    <ul class="heroes">
        <li *ngFor="let hero of heroes">
            <span class="badge">{{hero.id}}</span> {{hero.name}}
        </li>
    </ul>
  `
})
export class AppComponent {

    title = 'Myra the ferryboat';
    hero: Hero = {
        id: 1,
        name: 'Myra'
    };

    heroes = HEROES;
}
