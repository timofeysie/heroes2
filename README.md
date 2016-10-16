# heroes 2

Based on the official Angular 2 Tour of Heroes tutorial with samples from various parts of the documentation.

The running app is available [on Heroku](https://myra-the-ferryboat.herokuapp.com/).

Currently working through the humungeous [Advanced: Routing & Navigation](https://angular.io/docs/ts/latest/guide/router.html) page.

See the [Model driven forms](#model-drive-forms) section below.

## Table of Contents

1. [Development](#development)
2. [Current Work](#current-work)
2. [Model driven forms](#model-drive-forms)
2. [Advanced: Routing & Navigation](#advanced-routing-and-navigation">)
2. [Tour of Heroes: Routing](#tour-of-heroes-routing) (docs)
2. [Upgrade to Angular 2 Official](#upgrade-to-angular-2-official) (docs)
2. [Tour of Heroes: Services](#tour-of-heroes-services) (docs)
2. [Tour of Heroes: Multiple Components](#tour-of-heroes-multiple-components) (docs)
2. [The ngOnInit Lifecycle Hook](lThe-ngOnInit-Lifecycle-Hook)
2. [Detail view pagination](#detail-view-pagination) (docs)
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


zone.js:344 Unhandled Promise rejection: Template parse errors:

Can't bind to 'questions' since it isn't a known property of 'dynamic-form'.

1. If 'dynamic-form' is an Angular component and it has 'questions' input, then verify that it is part of this module.

2. If 'dynamic-form' is a Web Component then add "CUSTOM_ELEMENTS_SCHEMA" to the '@NgModule.schema' of this component to suppress this message.

Clearly, now the dynamic model driven form module is not set up correctly.
Really, it needs to be in it's own module, as we have just done with the heroes module.

The next section in the sprawling advanced routing and navigation page will create another module called crisis center.
So, all in favor of taking out the dynamic questions form until after we have more practice creating a module, say aye!

The form never looked good where it was anyhow.
The plan now is to create a form creation page with admin privileges.
And then have those created forms fill-able by anyone.
Yes, the features are half-baked, but this is a learning exercise, so we can let it slide for now.
Really the form stuff should be its own project, but it is convenient to do all the practice here for now.

Since we looked ahead, we know the crisis center will get those admin roles:

- Milestone #4: The Crisis Center
- Milestone #5: Route Guards
- Milestone #6: Asynchronous Routing



## Advanced: Routing and Navigation: The Crisis Center Module

Here we go, Milestone #4: The Crisis Center.

Since we have to copy the entire directory and change every mention of "hero" to "crisis", we will do it a little differently.
hero -> page
heroes -> pages
Hero -> page
Heroes -> Pages

crisis-center - pages-center.

Add a new component:
CrisisCenterComponent -> PagesComponent (pages.componente.ts) is much like the AppComponent shell.
CrisisCenterComponent is much like the AppComponent shell.

The naming differences, between page and pages is a little unclear.
pages-home.component.ts was created.  Should it have be page-home.component.ts?  Not sure...

What is the DialogService?  The example app.module.ts has that as an import and a provider.
What it doesn't have after all those changes is PagesComponent:

```
zone.js:344 Unhandled Promise rejection: 
Component PagesComponent is not part of any NgModule or the module has 
not been imported into your module. ; Zone: root ; Task: Promise.then ; 
Value: Error: Component PagesComponent is not part of any NgModule or the 
module has not been imported into your module.(…) Error: Component 
PagesComponent is not part of any NgModule or the module has not been 
imported into your module.
```

For some reason the pages component is not transpiled down to it's Javascript file.
Oh, had to refresh the directory.
So where does this component ned to be configrued.
Look at its counterpart.
There is only the hero-detial.component and the hero-list.component.

Right, right up there is says it's a new file.
OK.  It just wasn't imported into the pages.module.

Next error:
```
Component PagesHomeComponent is not part of any NgModule or the module has not been imported into your module.
```
Same as the pages component.

Next up:

```
core.umd.js:3462 EXCEPTION: Uncaught (in promise): Error: Cannot match any routes: ''
```

So the home page route is not working.
Going to the list of heroes works, with the hero details.

The next part of the tut deals with that:
```
    {
        path: '',
        redirectTo: '/crisis-center',
        pathMatch: 'full'
      },
```

So after finishing milestone #4: Crises center/Pages, we have some errors.

```
core.umd.js:3462 EXCEPTION: Uncaught (in promise): 
Error: Cannot find primary outlet to load 'PagesHomeComponent'
```

And when choosing the home page/dashbaord:
```
core.umd.js:3462 EXCEPTION: Uncaught (in promise): 
Error: Cannot match any routes: 'dashboard'
```


### Cannot find primary outlet to load 'PagesHomeComponent'
SO: In your app.component you are missing the router outlet directive.


### Cannot match any routes: 'dashboard'
SO: You should try
```
routerLink='/home'
```
instead of :
```
[routerLink]="['home']"
```

We are infact using routerLink="/dashboard" so will try this: 
[routerLink]="['dashboard']"

Same error unfortunately.  We do have that route, don't we?
Well, we added app-routing.module.ts during the last milestone.
But we already had app.routing.ts.

So which is the one to use?  Check the demo plunker.
It has no app-routing.module.ts.

So tyring to add dahsboard to app-routing.module.ts:
```
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
```

give the following error:
```
zone.js:344 Unhandled Promise rejection: 
Component DashboardComponent is not part of any NgModule or the module has 
not been imported into your module. 
```

So following the trail of app-routing.module.ts.
It was created in Milestone #2: The Routing Module

And app.routing.ts?
No hint of that file in the routing tutorial.

app-routing.module.ts was also in the tour of heroes routing section.
So where did app.routing.ts come from?

We have both imported in the app.module:
import { AppRoutingModule }    from './app-routing.module';
import { routing }             from './app.routing';

The app.routing.ts has this:
```
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

So what the hell?  Now the routing is all screwed up.  The various disparate tour of heroes apps aren't helping here.
The docus need a consistent thread that involves the evolution of a single app, not separate branches with different features.
We're getting farther and farther away from the dynamic model driven forms we wanted to implement as a module.

OK.  Rant over.  Back to the problem.
The tour of heroes routing tutorial says this:
    The current RouterModule.forRoot() produces an Angular ModuleWithProviders which 
    suggests that a class dedicated to routing should be some kind of module. 
    It should be a Routing Module.

Going to use SourceTree to look at the history of app.routing.ts.

2016/09/16 Begin router work commit has the entire file added.
2016/09/16 Finish router work commit shows adding more routes.
2016/10/12 Finish heroes feature morule show removing the components which are now presumably in separate module routing.

So it was definitely done during the tour of heroes routing section.
But now that file has disappeard from the tutorial.

Trying to get rid of the app.routing.ts breaks the whole site.
Really, what happened to that file?
Let's check the commits on the angular.io site where we made out [wonderful pull request](https://github.com/angular/angular.io/pull/2594) (it's still open, even though all checks have passed.  I know, they must be busy...)
That's the ticket~
app.routing.ts was replaced by app.module.ts on October 6th:
Author: Brandon <robertsbt@gmail.com>
Date: 6 October 2016 8:59:09 am 
Committer: Ward Bell <wardbell@hotmail.com>

-    We'll export a `routing` constant initialized using the `RouterModule.forRoot` method applied to our !{_array} of routes.
-    This method returns a **configured router module** that we'll add to our root NgModule, `AppModule`.
-
-  +makeExcerpt('app/app.routing.1.ts (excerpt)', 'routing-export')
-
-  .l-sub-section
-    :marked
-      We call the `forRoot` method because we're providing a configured router at the _root_ of the application.
-      The `forRoot` method gives us the Router service providers and directives needed for routing.
-
-  :marked
     ### Make the router available

-    We've setup initial routes in the `app.routing.ts` file. Now we'll add it to our root NgModule.
+    We've setup the initial route configuration. Now we'll add it to our `AppModule`.
+    We'll add our configured `RouterModule` to the `AppModule` imports !{_array}.

-    Import the `routing` constant from `app.routing.ts` and add it the `imports` !{_array} of `AppModule`.
+  +makeExcerpt('app/app.module.2.ts (app routing)', '')

-  +makeExcerpt('app/app.module.ts', 'routing')
+  .l-sub-section
+    :marked
+      We use the `forRoot` method because we're providing a configured router at the _root_ of the application.
+      The `forRoot` method gives us the Router service providers and directives needed for routing, and
+      performs the initial navigation based on the current browser URL.

This was added on October 5th:
  ## Refactor routes to a _Routing Module_

  Almost 20 lines of `AppModule` are devoted to configuring four routes.
  Most application have many more routes and they [add guard services](../guide/router.html#guards)
  to protect against unwanted or unauthorized navigations.
  Routing considerations could quickly dominate this module and obscure its primary purpose which is to
  establish key facts about the entire app for the Angular compiler.

  We should refactor the routing configuration into its own class.
  What kind of class?
  The current `RouterModule.forRoot()` produces an Angular `ModuleWithProviders` which suggests that a
  class dedicated to routing should be some kind of module.
  It should be a [_Routing Module_](../guide/router.htm#routing-module).

  By convention the name of a _Routing Module_ contains the word "Routing" and
  aligns with the name of the module that declares the components navigated to".

  Create an `app-routing.module.ts` file as a sibling to `app.module.ts`. Give it the following contents extracted from the `AppModule` class:

+makeExample('app/app-routing.module.ts')
:marked
  Noteworthy points, typical of _Routing Modules_:
  * Pull the routes into a variable. You might export it in future and it clarifies the _Routing Module_ pattern.

  * Add `RouterModule.forRoot(routes)` to `imports`.

  * Add `RouterModule` to `exports` so that the components in the companion module have access to Router declarables
  such as `RouterLink` and `RouterOutlet`.

  * No `declarations`!  Declarations are the responsibility of the companion module.

  * Add module `providers` for guard services if you have them; there are none in this example.
...
+
+  ### Update _AppModule_
+
+  Now delete the routing configuration from `AppModule` and import the `AppRoutingModule`
+  (_both_ with an ES `import` statement _and_ by adding it to the `NgModule.imports` list).
+
+  Here is the revised `AppModule`, compared to its pre-refactor state:
++makeTabs(
+  `toh-5/ts/app/app.module.ts, toh-5/ts/app/app.module.3.ts`,
+   null,
+  `app/app.module.ts (after), app/app.module.ts (before)`)
+:marked
+  It's simpler and focused on indentifying the key pieces of the application.
+.l-main-section
+:marked
   ## Select a Hero in the *HeroesComponent*

+  Earlier we added the ability to select a hero from the dashboard.
   We'll do something similar in the `HeroesComponent`.

-  That component's current template exhibits a "master/detail" style with the list of heroes
+  The `HeroesComponent` template exhibits a "master/detail" style with the list of heroes
...
  Our goal is to move the detail to its own view and navigate to it when the user decides to edit a selected hero.
...
-  When the user selects a hero from the list, we *won't* go to the detail page.
-  We'll show a *mini-detail* on *this* page instead and make the user click a button to navigate to the *full detail *page.
+  We are keeping the "master/detail" style but shrinking the detail to a "mini", read-only version.
+  When the user selects a hero from the list, we *don't* go to the detail page.
+  We show a *mini-detail* on *this* page instead and make the user click a button to navigate to the *full detail *page.

So you can see for yourself.  We were not going crazy.
app.routing.ts -> app.module.ts

The app.module.ts just imports AppRoutingModule
But, there is no dashboard, and the routes are all based on the route guard, whcih is a future section of the routing module.
We want to get back to the dynamic forms, not keep messing around with the router.
What to do?
Go back to something that works, for now.
I would say that the life of this current app is nearing it's end.
It should be replaced by an app created with the CLI, and an Ionic version that will use the dynamic forms with validation.
This whole project has lost its focus now anyhow.
So to wind things up, just go back to the app.router.ts.

## <a name="advanced-routing-and-navigation-feature-modules">Advanced: Routing & Navigation: Feature module</a>
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
```">

Even without the 8 files for each and every component, this is getting out of hand quickly.
The beta 1 quick start compiled the .js files to a dist directory, functionality which they have since removed.
I heard there is a way for VSCode to ignore .js files for TypeSript projects.
I don't mind them right now.  It's still interesting to take a look at what the transpiler is creating for us.

It's still a little strange to have app.module.ts, app.component.ts, and main.ts.
Why not just bootstrap the application's root module in the root module?  
There must be a reason.  Something to look forward to learning about. 
