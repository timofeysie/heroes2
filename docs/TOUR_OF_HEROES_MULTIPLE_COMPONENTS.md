## <a name="tour-of-heroes-multiple-components">Tour of Heroes: Multiple Components</a>

After getting through part 3: Multiple Components, I got this error:
```
zone.js:484 Unhandled Promise rejection: Template parse errors:
Can't bind to 'hero' since it isn't a known property of 'my-hero-detail'.
1. If 'my-hero-detail' is an Angular component and it has 'hero' input, 
then verify that it is part of this module.
2. If 'my-hero-detail' is a Web Component then add "CUSTOM_ELEMENTS_SCHEMA" to the '@NgModule.schema' of this component to suppress this message.
 ("
    </li>
</ul>
<my-hero-detail [ERROR ->][hero]="selectedHero"></my-hero-detail>
"): AppComponent@19:16
```">

This is definately case 1.
We had forgotten to import the new detail view in the app.module.ts file:
```
import { HeroDetailComponent } from './hero-detail.component';
```
But this did not solve the error.  We had to also declare it in the declarations section:
```
declarations: [
    AppComponent,
    HeroDetailComponent
],
```
