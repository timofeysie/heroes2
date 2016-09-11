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
  <div *ngIf="selectedHero">
  <h2>{{selectedHero.name}} details:</h2>
  <div><label>id: </label>{{selectedHero.id}}</div>
  <div>
    <label>name: </label>
    <input [(attr.ngModel)]="selectedHero.name" placeholder="name"/>
  </div>
</div>
  <h2>My Heroes</h2>
    <ul class="heroes">
        <li *ngFor="let hero of heroes" 
            (click)="onSelect(hero)"
            [class.selected]="hero === selectedHero">
            <span class="badge">
                {{hero.id}}
            </span> {{hero.name}}
        </li>
    </ul>
  `,
  styles: [`
  .selected {
    background-color: #CFD8DC !important;
    color: white;
  }
  .heroes {
    margin: 0 0 2em 0;
    list-style-type: none;
    padding: 0;
    width: 15em;
  }
  .heroes li {
    cursor: pointer;
    position: relative;
    left: 0;
    background-color: #EEE;
    margin: .5em;
    padding: .3em 0;
    height: 1.6em;
    border-radius: 4px;
  }
  .heroes li.selected:hover {
    background-color: #BBD8DC !important;
    color: white;
  }
  .heroes li:hover {
    color: #607D8B;
    background-color: #DDD;
    left: .1em;
  }
  .heroes .text {
    position: relative;
    top: -3px;
  }
  .heroes .badge {
    display: inline-block;
    font-size: small;
    color: white;
    padding: 0.8em 0.7em 0 0.7em;
    background-color: #607D8B;
    line-height: 1em;
    position: relative;
    left: -1px;
    top: -4px;
    height: 1.8em;
    margin-right: .8em;
    border-radius: 4px 0 0 4px;
  }
`]
})
export class AppComponent {

    title = 'Myra the ferryboat';
    selectedHero: Hero;
    heroes = HEROES;
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
}
