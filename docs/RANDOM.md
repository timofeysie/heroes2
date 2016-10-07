# Random Notes


## Template Syntax

    {{value}} same as [property]="value"?
    (event)="handler"
    [(ng-model)]="property"

Example usage:
```
<li>{{hero.name}}</li>
<hero-detail [hero]="selectedHero"></hero-detail>
<li (click)="selectHero(hero)"></li>
```
