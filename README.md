# heroes 2

Based on the official Angular 2 Tour of Heroes tutorial with samples from various parts of the documentation.

The running app is available [on Heroku](https://myra-the-ferryboat.herokuapp.com/).

Currently we are adding form validation rules dynamically depends on user selection to our dynamic model driven forms.


See the [Model driven forms](#model-drive-forms) section below.

## Table of Contents

1. [Development](#development)
2. [Current Work](#current-work)
2. [Model driven forms](#model-drive-forms)
2. [Advanced: Routing & Navigation](#advanced-routing-and-navigation">)
2. [Tour of Heroes: Routing](#tour-of-heroes-routing) (docs)
2. [Upgrade to Angular 2 Official](#upgrade-to-angular-2-official)
2. [Tour of Heroes: Services](#tour-of-heroes-services) (docs)
2. [Tour of Heroes: Multiple Components](#tour-of-heroes-multiple-components)
2. [The ngOnInit Lifecycle Hook](lThe-ngOnInit-Lifecycle-Hook)
2. [Detail view pagination](#detail-view-pagination)
2. [Tour of Heroes: Master/Detail](#tour-of-heroes-master-detail) (docs)
3. [The favicon.ico](#the-favicon.ico)
5. [Setup](#setup) (docs)
5. [Prerequisites](#prerequisites) (docs)
5. [Install npm packages](#Iinstall-npm-packages) (docs)
5. [npm scripts](#npm-scripts) (docs)
5. [Testing](#testing) (docs)
5. [Unit Tests](#unit-tests) (docs)
5. [End-to-end (E2E) Tests](#end-to-end) (docs)


## <a name="development">Development</a>
This is a quick reference of commands used to develop the app.

* `$ npm start` - Start the lite server for development.
* `$ node server.js` - Start the NodeJS server for production environment and serving the API.
* `$ git push -u remote master` - Push to GitHub.
* `$ git push heroku master` - Push to Heroku.
* `$ npm test` - Unit tests. (test output will is saved in `./_test-output/tests.html`)
* `$ npm run e2e` - End to end tests. (generates a file at `./_test-output/protractor-results.txt`)

See the [npm scripts](#npm-scripts) for other commands.


## <a name="current-work">Current work</a>

Completed the Angular2 Tour of Heroes.

Working on refactoring for the [routing and navigation](https://angular.io/docs/ts/latest/guide/router.html).
Getting ready to create feature folders for the routing section.

For a discussion regarding the unit tests and the compiling templates problem, se the separate document docs/BROKEN_TESTS.md.
If a document is too long, the spelling checker in VSCode will not work.

<a name="advanced-routing-and-navigation">Advanced: Routing & Navigation</a>

Since this is such a long tutorial, we have come and gone from it as needed.
What we call feature modules covers the following sections:

- Milestone #1: Getting Started with the Router
- Milestone #2: The Routing Module
- Milestone #3: The Heroes Feature

That being done, we will add the crisis center module during these sections:

- Milestone #4: The Crisis Center
- Milestone #5: Route Guards
- Milestone #6: Asynchronous Routing

This is all in preparation to create our own dynamic model driven forms module.


## Feature modules
Going back to the routing tutorial to organize the app and routes into a feature area using modules.
The [routing and navigation](https://angular.io/docs/ts/latest/guide/router.html) section is rather long.
We read the section on feature modules but until now did not make the changes recommended.
We though would should have working unit tests for regression testing but were unable to get those running.
So now, here are the changes made to the app:

1. we already created the heroes directory
2. create a new hero-list.component.ts in the app/heroes/ folder using heroes.component.ts from the tutorial.
2. also change the name of the template and styles used for this component.
2. copy the hero-detail.component.ts to the heroes/ folder
2. and the hero.ts class, even though the tutorial didn't mention that.
2. the hero.service.ts files into the heroes/ folder
2. Create a new heroes-routing.module.ts in the heroes/ folder
2. change the forRoot method in the to to use the static forChild method.
2. import ActivatedRoute and Params
2. did not change heroService to service in hero-detail & hero-list components.  That would be ambiguous since we have the question service there now.  We should also call that questionService...
2. changed detail route to hero route

After all those changes, and removing the two routes from the app.routing file, here are the errors:

```
app/dashboard.component.ts(3,22): error TS2307: Cannot find module './hero'.
app/dashboard.component.ts(4,29): error TS2307: Cannot find module './hero.service'.
app/dashboard.component.ts(19,19): error TS7006: Parameter 'heroes' implicitly has an 'any' type.
app/hero-search.component.ts(6,22): error TS2307: Cannot find module './hero'.
app/hero-search.service.ts(4,32): error TS2307: Cannot find module './hero'.
app/app.module.ts(17,37): error TS2307: Cannot find module './hero.service'.
app/app.module.ts(18,37): error TS2307: Cannot find module './heroes.component'.
app/app.module.ts(19,37): error TS2307: Cannot find module './hero-detail.component'.
app/heroes/hero-detail.component.ts(5,33): error TS2307: Cannot find module './heroes.component'.
```

These errors involve adding the new route to the missing files,
and changing HeroesComponent to HeroListComponent

So then the app compiles, but does not run, with the following errors:

```
zone.js:1263GET http://localhost:3000/app/heroes/heroes.component.html 404 (Not Found)scheduleTask @ zone.js:1263ZoneDelegate.scheduleTask @ zone.js:205Zone.scheduleMacroTask @ zone.js:142(anonymous function) @ zone.js:1293send @ VM250:3ResourceLoaderImpl.get @ platform-browser-dynamic.umd.js:129DirectiveNormalizer._fetch @ compiler.umd.js:13455DirectiveNormalizer.normalizeTemplateAsync @ compiler.umd.js:13498DirectiveNormalizer.normalizeDirective @ compiler.umd.js:13473RuntimeCompiler._createCompiledTemplate @ compiler.umd.js:16869(anonymous function) @ compiler.umd.js:16807(anonymous function) @ compiler.umd.js:16805RuntimeCompiler._compileComponents @ compiler.umd.js:16804RuntimeCompiler._compileModuleAndComponents @ compiler.umd.js:16741RuntimeCompiler.compileModuleAsync @ compiler.umd.js:16732PlatformRef_._bootstrapModuleWithZone @ core.umd.js:6954PlatformRef_.bootstrapModule @ core.umd.js:6936(anonymous function) @ main.ts:4(anonymous function) @ main.ts:4(anonymous function) @ main.ts:4__exec @ system.src.js:1510entry.execute @ system.src.js:3926linkDynamicModule @ system.src.js:3252link @ system.src.js:3095execute @ system.src.js:3432doDynamicExecute @ system.src.js:798link @ system.src.js:1000doLink @ system.src.js:652updateLinkSetOnLoad @ system.src.js:700(anonymous function) @ system.src.js:512ZoneDelegate.invoke @ zone.js:192Zone.run @ zone.js:85(anonymous function) @ zone.js:451ZoneDelegate.invokeTask @ zone.js:225Zone.runTask @ zone.js:125drainMicroTaskQueue @ zone.js:357ZoneTask.invoke @ zone.js:297
zone.js:344 Unhandled Promise rejection: Failed to load http://localhost:3000/app/heroes/heroes.component.html ; Zone: <root> ; Task: Promise.then ; Value: Failed to load http://localhost:3000/app/heroes/heroes.component.html undefinedconsoleError @ zone.js:344_loop_1 @ zone.js:371drainMicroTaskQueue @ zone.js:375ZoneTask.invoke @ zone.js:297
zone.js:346 Error: Uncaught (in promise): Failed to load http://localhost:3000/app/heroes/heroes.component.html(…)
```
Cache problem?  No.
Had to change the
templateUrl: 'heroes.component.html' to 
templateUrl: 'hero-list.component.html' 
in the hero-list.component.ts.

Then we have these errors:


```
zone.js:1263 GET http://localhost:3000/app/heroes/heroes.component.html 404 (Not Found)scheduleTask @ zone.js:1263ZoneDelegate.scheduleTask @ zone.js:205Zone.scheduleMacroTask @ zone.js:142(anonymous function) @ zone.js:1293send @ VM621:3ResourceLoaderImpl.get @ platform-browser-dynamic.umd.js:129DirectiveNormalizer._fetch @ compiler.umd.js:13455DirectiveNormalizer.normalizeTemplateAsync @ compiler.umd.js:13498DirectiveNormalizer.normalizeDirective @ compiler.umd.js:13473RuntimeCompiler._createCompiledTemplate @ compiler.umd.js:16869(anonymous function) @ compiler.umd.js:16807(anonymous function) @ compiler.umd.js:16805RuntimeCompiler._compileComponents @ compiler.umd.js:16804RuntimeCompiler._compileModuleAndComponents @ compiler.umd.js:16741RuntimeCompiler.compileModuleAsync @ compiler.umd.js:16732PlatformRef_._bootstrapModuleWithZone @ core.umd.js:6954PlatformRef_.bootstrapModule @ core.umd.js:6936(anonymous function) @ main.ts:4(anonymous function) @ main.ts:4(anonymous function) @ main.ts:4__exec @ system.src.js:1510entry.execute @ system.src.js:3926linkDynamicModule @ system.src.js:3252link @ system.src.js:3095execute @ system.src.js:3432doDynamicExecute @ system.src.js:798link @ system.src.js:1000doLink @ system.src.js:652updateLinkSetOnLoad @ system.src.js:700(anonymous function) @ system.src.js:512ZoneDelegate.invoke @ zone.js:192Zone.run @ zone.js:85(anonymous function) @ zone.js:451ZoneDelegate.invokeTask @ zone.js:225Zone.runTask @ zone.js:125drainMicroTaskQueue @ zone.js:357ZoneTask.invoke @ zone.js:297
zone.js:344 Unhandled Promise rejection: Failed to load http://localhost:3000/app/heroes/heroes.component.html ; Zone: <root> ; Task: Promise.then ; Value: Failed to load http://localhost:3000/app/heroes/heroes.component.html undefinedconsoleError @ zone.js:344_loop_1 @ zone.js:371drainMicroTaskQueue @ zone.js:375ZoneTask.invoke @ zone.js:297
zone.js:346 Error: Uncaught (in promise): Failed to load http://localhost:3000/app/heroes/heroes.component.html(…)consoleError @ zone.js:346_loop_1 @ zone.js:371drainMicroTaskQueue @ zone.js:375ZoneTask.invoke @ zone.js:297
```

But heroes.component.html  does not appear in any file (except this readme).
So maybe now it is a cache problem.  The normal ctrl-refresh is not fixing it.

Stop the server.  Start it again.
App runs, but choosing the heores list causes this show-stopper:
```
core.umd.js:3462 EXCEPTION: Uncaught (in promise): Error: Cannot match any routes: 'heroes'
```

let link = ['/detail', hero.id]; should use hero and not detail.

There is a bit of a disconnect between our code and the app in the router examples.
Since we don't have the crisis center component, and our router is named
app.routing.ts while in the tutorial it is named app-routing.module.ts
Not sure how THAT happened ... someone might have to get fired over this!

Our router has these route:
```
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
```

The routing in the middle of the tutorial looks like this:

```
import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    RouterModule.forRoot([
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
```

It's probably a good idea to keep going along the trail before trying to debug the app in progress.
Even after changing the route name from detail/:id to hero/:id, there is still this error:
```
core.umd.js:3462 EXCEPTION: Uncaught (in promise): Error: Cannot match any routes: 'hero/4'
```
We still don't know how to integrate the hero module routes into the app module routes.
So on with the show!

Continuing with the changes, we add a new isSelected method, and use it in the template.

```
  <li *ngFor="let hero of heroes" 
    (click)="onSelect(hero)"
      [class.selected]="hero === selectedHero">
```

becomes:

```
      [class.selected]="isSelected(hero)">
```


### OBSERVABLE PARAMS AND COMPONENT RE-USE
For the pagination feature, we want to retrieve the route params from an Observable.
We don't want the router to remove the current HeroDetailComponent instance from the DOM 
only to re-create it for the next id. That could be visibly jarring. 
Better to simply re-use the same component instance and update the parameter.
Since ngOnInit is only called once per instantiation, 
we need a way to detect when the route parameters change from within the same instance. 
The observable params property handles that.

The alternative is ```route.snapshot.params['id']``` that gives us the initial 
value of the route parameters without subscribe or unsubscribe. 

Tha snapshot method:

```
ngOnInit() {
  let id = +this.route.snapshot.params['id']; // (+) converts string 'id' to a number
  this.service.getHero(id).then(hero => this.hero = hero);
```

The observables method:
```
ngOnInit() {
  this.route.params.forEach((params: Params) => {
     let id = +params['id']; // (+) converts string 'id' to a number
     this.service.getHero(id).then(hero => this.hero = hero);
   });
}
```

### matrix URL notation
When a url parameter value is not necessary to distinguish one route path from another, 
prefer an optional parameter.
This is for when the value is optional, complex, and/or multi-variate.
localhost:3000/heroes;id=15;foo=foo
The id value appears in the URL as (;id=15;foo=foo), not in the URL path. 

This method is used in the hero-detail.component.ts to go back to the list of heroes.

Just so you know, I started with Angular 2 back in the alpha phases, at least 10 months ago.
I have some plunkers that rely on this lib:
<script src="https://code.angularjs.org/2.0.0-beta.0/angular2-polyfills.js">
Anyhow, just showing off a bit.  Here is the link to the [example site for the router tutorial](http://plnkr.co/edit/0hU4oUea0rShCa2HWOCd?p=preview)


### Transition animations
To build animation triggers, control state and manage transitions between states to add 
transitions to the route component as it moves between states/view. 
The HostBinding decorator is for binding to route components.
```
import { HostBinding, trigger, transition, animate,
         style, state } from '@angular/core';
```

The animations are configured like this:
```
@HostBinding('@routeAnimation') get routeAnimation() {
    return true;
}
@HostBinding('style.display') get display() {
    return 'block';
}
@HostBinding('style.position') get position() {
    return 'absolute';
}
```


### Finishing Milestone #3: The Heroes Feature

After all those massive changes to get the heroes feature module in, 
here are the remaining errors:
```
zone.js:1263GET http://localhost:3000/app/hero-detail.component.html 404 (Not Found)scheduleTask @ zone.js:1263ZoneDelegate.scheduleTask @ zone.js:205Zone.scheduleMacroTask @ zone.js:142(anonymous function) @ zone.js:1293send @ VM250:3ResourceLoaderImpl.get @ platform-browser-dynamic.umd.js:129DirectiveNormalizer._fetch @ compiler.umd.js:13455DirectiveNormalizer.normalizeTemplateAsync @ compiler.umd.js:13498DirectiveNormalizer.normalizeDirective @ compiler.umd.js:13473RuntimeCompiler._createCompiledTemplate @ compiler.umd.js:16869(anonymous function) @ compiler.umd.js:16807(anonymous function) @ compiler.umd.js:16805RuntimeCompiler._compileComponents @ compiler.umd.js:16804RuntimeCompiler._compileModuleAndComponents @ compiler.umd.js:16741RuntimeCompiler.compileModuleAsync @ compiler.umd.js:16732PlatformRef_._bootstrapModuleWithZone @ core.umd.js:6954PlatformRef_.bootstrapModule @ core.umd.js:6936(anonymous function) @ main.ts:4(anonymous function) @ main.ts:4(anonymous function) @ main.ts:4__exec @ system.src.js:1510entry.execute @ system.src.js:3926linkDynamicModule @ system.src.js:3252link @ system.src.js:3095execute @ system.src.js:3432doDynamicExecute @ system.src.js:798link @ system.src.js:1000doLink @ system.src.js:652updateLinkSetOnLoad @ system.src.js:700(anonymous function) @ system.src.js:512ZoneDelegate.invoke @ zone.js:192Zone.run @ zone.js:85(anonymous function) @ zone.js:451ZoneDelegate.invokeTask @ zone.js:225Zone.runTask @ zone.js:125drainMicroTaskQueue @ zone.js:357ZoneTask.invoke @ zone.js:297
zone.js:344 Unhandled Promise rejection: Failed to load app/hero-detail.component.html ; Zone: ...
```

After a crash like that it takes a re-start of npm to get to the new code.
Change that naughty old path, and the ctrl-refresh, then we get these interesting errors:
```
zone.js:344 Unhandled Promise rejection: Template parse errors:
Can't bind to 'questions' since it isn't a known property of 'dynamic-form'.
1. If 'dynamic-form' is an Angular component and it has 'questions' input, then verify that it is part of this module.
2. If 'dynamic-form' is a Web Component then add "CUSTOM_ELEMENTS_SCHEMA" to the '@NgModule.schema' of this component to suppress this message.
 ("
    height="30px">
</button>
<dynamic-form [ERROR ->][questions]="questions"></dynamic-form>
<div *ngIf="selectedHero">
  <h2>
"): HeroListComponent@5:14
'dynamic-form' is not a known element:
1. If 'dynamic-form' is an Angular component, then verify that it is part of this module.
2. If 'dynamic-form' is a Web Component then add "CUSTOM_ELEMENTS_SCHEMA" to the '@NgModule.schema' of this component to suppress this message. ("
    height="30px">
</button>
[ERROR ->]<dynamic-form [questions]="questions"></dynamic-form>
<div *ngIf="selectedHero">
  <h2>
"): HeroListComponent@5:0 ; Zone: <root> ; Task: Promise.then ; Value: Error: Template parse errors:(…) Error: Template parse errors:
Can't bind to 'questions' since it isn't a known property of 'dynamic-form'.
1. If 'dynamic-form' is an Angular component and it has 'questions' input, then verify that it is part of this module.
2. If 'dynamic-form' is a Web Component then add "CUSTOM_ELEMENTS_SCHEMA" to the '@NgModule.schema' of this component to suppress this message.
 ("
    height="30px">
</button>
<dynamic-form [ERROR ->][questions]="questions"></dynamic-form>
<div *ngIf="selectedHero">
  <h2>
"): HeroListComponent@5:14
'dynamic-form' is not a known element:
1. If 'dynamic-form' is an Angular component, then verify that it is part of this module.
2. If 'dynamic-form' is a Web Component then add "CUSTOM_ELEMENTS_SCHEMA" to the '@NgModule.schema' of this component to suppress this message. ("
    height="30px">
</button>
[ERROR ->]<dynamic-form [questions]="questions"></dynamic-form>
<div *ngIf="selectedHero">
  <h2>
"): HeroListComponent@5:0
    at TemplateParser.parse 
">```

Not sure why all the repeats, but that's pretty par for the course with JavaScript error messages in general.

But, clearly, now the dynamic model driven form module is not set up correctly.
Really, it needs to be in it's own module, as we have just done with the heroes module.

The next section in the sprawling advanced routing & navigation page will create another module called crisis center.
So, all in favor of taking out the dynamic questions form until after we have more practice creating a module, say aye!

The form never looked good where it was anyhow.
The plan now is to create a form creation page with admin privlidges.
And then have those created forms fillable by anyone.
Yes, the features are half-baked, but this is a learning exercise, so we can let it slide for now.
Really the form stuff should be its own project, but it is convenient to do all the practice here for now.

Since we looked ahead, we know the crisis center will get those admin roles:

- Milestone #4: The Crisis Center
- Milestone #5: Route Guards
- Milestone #6: Asynchronous Routing


## <a name="model-drive-forms">Model driven forms</a>

Giving the testing and router refactoring a break to try out the [model driven forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html) 
in the Angular 2 docs Cookbook section.
What a great example of OOP in the front end!
Dynamic data binding of metadata used to render the form without making any hardcoded assumptions about specific questions.
In addition to control metadata, we are also adding validation dynamically.

After about two days of debugging, the form is working. 
See the separate file in docs/<a name="fixing-the-drive-forms">Fixing the data driven forms</a> for that story.
The problem seemed to be using the form  in the same view where the routing was happening:
```
  <hero-search></hero-search>
  <dynamic-form [questions]="questions"></dynamic-form>
```
Moved the form to the heroes.component.ts.
The form shows now, but there are still a few problems.

1. The page initially starts broken.
Doing a ctrl-refresh fixes this.
2. On Heroku this does not happen, but the data from the old form is cached.
3. The validation is broken.

So, there are a few options as to what to do next.

1. There is the Cookbook [form validation](https://angular.io/docs/ts/latest/cookbook/form-validation.html) section.
2. The OOP dance of objects that create the form needs a diagram.
3. We could also go back and cover the first [forms tutorial](https://angular.io/docs/ts/latest/guide/forms.html)
for a better understanding of how to fix the validation.
4. There is still the refactoring of class into feature folders in [the routing & navigation](https://angular.io/docs/ts/latest/guide/router.html) section of the advanced tutorial.
5. It would be great to write some unit tests for the forms, specifically to show the failing validation, 
and thereby practice BDD, but the unit tests are still broken because the templateUrls are not compiled.
6. This project is all going well, but it's not the only game on GitHub.  
We are starting a new role using Ionic 2 in a few days, and it was intended to use this dynamic forms feature in Ionic.  
Ionic 2 is in rc.1, so actually, the documentation is not there to support easy pickup of features yet.  
This is shown in the difficulty we had creating working unit tests for a sample Ionic 2 app.
7. There is also the Serene-brushlands project to test before pushing into production.

Given that there is only today and tomorrow to before the role starts, estimates show that only one of these things could be accomplished in that time.
So what's it going to be?
We <i>should</i> do no.7.  We want to do no.1.  So since it's our time here, no.1 it is!

That tutorial took most of the day to cover.
It handled validation using the ReactiveFormsModule in the second half.
It didn't cover the model driven part, so it would take some time to implement it's solutions in the Heroes 2 code.

Now I'm looking now at [the Scotch.io tutorial](https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol) on the subject,
which also has an updated [tutiral on nested forms](https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2) also using model driven forms.

The [Using Angular 2’s Model-Driven Forms with FormGroup and FormControl](https://scotch.io/tutorials/using-angular-2s-model-driven-forms-with-formgroup-and-formcontrol) 
tutorial starts off with instructions on installing forms.
This is something we were never told to do in the official cookbook tutorial.
We assumed that importing it would trigger a download when doing npm run.

```
npm install @angular/forms --save
```

Running this and then launching the app brings our validation back.
However, the app still launches broken and requires a ctrl-refresh to work.

The tuturoail is build on an interface like this:

```JavaScript
export interface User {
    name: string; // required with minimum 5 chracters
    address?: {
        street?: string; // required
        postcode?: string;
    }
}
```

However, this model is hardwired on creation like this:

```JavaScript
ngOnInit() {

    // the short way
    this.myForm = this._fb.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            address: this._fb.group({
                street: ['', <any>Validators.required],
                postcode: ['']
            })
        });

}
```

The validation is handled like this:

```htm
<div>
    <label>Name</label>
    <input type="text" formControlName="name">
    <small [hidden]="myForm.controls.name.valid || (myForm.controls.name.pristine && !submitted)">
        Name is required (minimum 5 characters).
    </small>
</div>
```

formGroupName can be used multiple times in the same form:

```htm
    <div formGroupName="address">
        <input formControlName="street">
        <input formControlName="postcode">
    </div>
```

This is the same as:

```htm
    <div formGroupName="address">
        <input formControlName="street">
    </div>
    <div formGroupName="address">
        <input formControlName="postcode">
    </div>
```    

There is a trick shown to use a default value.  

```javascript
(<FormControl>this.myForm.controls['name'])
    .setValue('John', { onlySelf: true });
```

{ onlySelf: true }, mean this change will only affect the validation of this control and 
not its parent component.

By default this.myForm.controls['name'] is of type AbstractControl. 
AbstractControl is the base class of FormGroup and FormControl. 
Therefore, we need to cast it to FormControl in order to utilize control specific function.

The whole model could be updated like this:

```javascript
    const people = {
            name: 'Jane',
            address: {
                street: 'High street',
                postcode: '94043'
            }
        };

        (<FormGroup>this.myForm)
            .setValue(people, { onlySelf: true });
```

Each form group or form control expose a few events which we can subscribe to (e.g. statusChanges, valuesChanges, etc).

Let say we want to do something every time when any form values changed. We can do this:-
```
subcribeToFormChanges() {
    // initialize stream
    const myFormValueChanges$ = this.myForm.valueChanges;

    // subscribe to the stream 
    myFormValueChanges$.subscribe(x => this.events
        .push({ event: ‘STATUS CHANGED’, object: x }));
}
```

subscribe to form changes 

```javascript
ngOnInit() {
    this.subcribeToFormChanges();
}
```

Then display all value changes event in our view.

```html
Form changes:
<div *ngFor="let event of events">
    <pre> {{ event | json }} </pre>
</div>
```

We will want to change form validation rules dynamically depending on user selection, so this method is the way to go.

On to the nested forms tutorial on Scotch.io.

It has the following model for the demo:

```JavaScript
export interface Customer {
    name: string; // required field with minimum 5 characters
    addresses: Address[]; // user can have one or more addresses
}
export interface Address {
    street: string;  // required field
    postcode: string;
}
```

What we will want however, is a Form interface, and a Field interface.
For the FormModel, we need a title, and probably a host of other housekeeping info such as id, created and updated dates, authors, etc.
The FieldModel should have the same members the QuestionBase:
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;




## <a name="advanced-routing-and-navigation">Advanced: Routing & Navigation</a>
Following [the router documentation tutorial](https://angular.io/docs/ts/latest/guide/router.html).

They say `We recommend giving each feature area its own route configuration file`.
This means separate folders and using `forRoot` method to register the routes 
and application level service providers whereas in a feature module the static `forChild` method is used.

Use RouterModule.forRoot to provide routes for the AppModule. 

Use RouterModule.forChild method to register additional routes.

It does this with the heroes routes:
```
const heroesRoutes: Routes = [
  { path: 'heroes',  component: HeroListComponent },
  { path: 'hero/:id', component: HeroDetailComponent }
];

export const heroesRouting: ModuleWithProviders = RouterModule.forChild(heroesRoutes);
```
Question: Why is the const keyword reuqired twice?

Next question.  This is in the sample:
```
export const appRoutingProviders: any[] = [];
```
This is to "simplify registration of router dependencies later in app.module.ts".
Apparently later it will be filled in.  In the Tour of Heroes, this was not addressed.

### Milestone #2: The Heroes Feature

Now it's time to organize the app and routes into feature areas using modules.
This is Milestone #2: The Heroes Feature in the epic Advanced Router & Navigation section.

In the previous Heroes tutorial from the Tour of Heroes beta release 1, the app folder had the following structure:
```
app  
|- assets  
|  |- main.css  
|  |- img  
|- bootstrap.ts  
|- components  
|  |- about  
|  |  |- about_spec.ts  
|  |  |- about.html  
|  |  |- about.ts  
|  |- app  
|  |  |- app_spec.ts  
|  |  |- app.css  
|  |  |- app.html  
|  |  |- app.ts  
|  |- heroes  
|  |  |- crisis-center.component.ts  
|  |  |- hero-detail.component.ts  
|  |  |- hero-detail.template.html  
|  |  |- hero-form.component.html  
|  |  |- hero-form.component.ts  
|  |  |- hero-master.component.ts  
|  |  |- hero-master.template.html  
|  |  |- hero-styles.css  
|  |  |- Hero.ts  
|  |- home  
|- index.html  
|- services  
```

It was still under construction when there were breaking changes in the next release after the team had promised no breaking changes now that they were in beta.
These breaking changes continued so I decided to wait until the official release to go any further.
Anyhow, not that breaking changes have died down for a while, it's time to get some of this structure into this app.

It does seem strange to have an app/app folder structure.  
The root app folder in other frameworks historically has been things like 'public', 'www', 'root', 'src', etc.
This would have been a better choice if you want to then have an app module.  I think 'src' is the most descriptive.
So it could be this: 'src/app'

But then we would have things like this: 'src/app/app.module.ts'
That is also ambiguous.
It should just be like this: 'src/app/module.ts'.
This makes the most sense to me.  I don't like repeating the directory name for each file inside.
Redundancy might be good for high availability, but it's not good for directory naming conventions in my view.


The current app does not have the crisis center feature.  
That must have been created in another section.
There isn't a clear path after the tour, so we will have to wing it here a little bit, functionality-wise.

We have quite a mess going on in the app directory after finishing the tour.
Files consist of groups like this:
```
app.component.css
app.component.html
app.component.js
app.component.ts
app.component.js.map
app.component.spec.js
app.component.spec.ts
app.component.spec.js.map
```

This pattern is continued for all these features.
```
app.component
app.module
dashboard.component
hero (.ts & .js only)
hero-detail
hero-search
hero.service
heroes.component
in-memory-data.service
main
rxjs-extension
```

Even without the 8 files for each and every component, this is getting out of hand quickly.
The beta 1 quick start compiled the .js files to a dist directory, functionality which they have since removed.
I heard there is a way for VSCode to ignore .js files for TypeSript projects.
I don't mind them right now.  It's still interesting to take a look at what the transpiler is creating for us.

It's still a little strange to have app.module.ts, app.component.ts, and main.ts.
Why not just bootstrap the application's root module in the root module?  
There must be a reason.  Something to look forward to learning about. 


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
```
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
