# heroes 2

The official Angular2 Tour of Heroes for rc-6 using TypeScript.

The running app is available [on Heroku](https://myra-the-ferryboat.herokuapp.com/).

## Table of Contents

1. [Development](#development)
2. [Current Work](#current-work)
2. [Advanced: Routing & Navigation](#advanced-routing-and-navigation">)
2. [Tour of Heroes: Routing](#tour-of-heroes-routing)
2. [Upgrade to Angular 2 Official](#upgrade-to-angular-2-official)
2. [Tour of Heroes: Services](#tour-of-heroes-services)
2. [Tour of Heroes: Multiple Components](#tour-of-heroes-multiple-components)
2. [The ngOnInit Lifecycle Hook](lThe-ngOnInit-Lifecycle-Hook)
2. [Detail view pagination](#detail-view-pagination)
2. [Tour of Heroes: Master/Detail](#tour-of-heroes-master-detail)
3. [The favicon.ico](#the-favicon.ico)
5. [Setup](#setup)
5. [Prerequisites](#prerequisites)
5. [Install npm packages](#Iinstall-npm-packages)
5. [npm scripts](#npm-scripts)
5. [Testing](#testing)
5. [Unit Tests](#unit-tests)
5. [End-to-end (E2E) Tests](#end-to-end)


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

Completed the Angular2 Tour of Heros.

Working on refactoring for the [routing and navigation](https://angular.io/docs/ts/latest/guide/router.html).
Getting ready to create feature folders for the routing section.

For a discussion regarding the unit tests and the compiling templates problem, se the separate document docs/BROKEN_TESTS.md.
If a document is too long, the spelling checker in VSCode will not work.


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



## <a name="tour-of-heroes-routing">Tour of Heroes: Routing</a>

[routing section](https://angular.io/docs/ts/latest/tutorial/toh-pt5.html)
This calls for some refactoring:

1. Change app.component.ts file to heroes.component.ts
2. Change AppComponent class to HeroesComponent
2. Change the Selector my-app to my-heroes
2. Create a new app.component.ts
2. Define an exported AppComponent class.
2. Add an @Component decorator above the class with a my-app selector.
2. Move the following from HeroesComponent to AppComponent: title class property, @Component template h1 element, which contains a binding to title
2. Add a <my-heroes> element to the app template just below the heading so we still see the heroes.
2. Add HeroesComponent to the declarations array of AppModule so Angular recognizes the <my-heroes> tags.
2. Add HeroService to the providers array of AppModule because we'll need it in every other view.
2. Remove HeroService from the HeroesComponent providers array since it has been promoted.
2. Add the supporting import statements for AppComponent.

That's quite a bit to take in.

During all those changes, of course the app breaks, but this is a great message that shows up:
```
core.umd.js:5995 EXCEPTION: Error in http://localhost:3000/app/app.component.html:1:0 caused by: Maximum call stack size exceededErrorHandler.handleError @ core.umd.js:5995(anonymous function) @ core.umd.js:9394ZoneDelegate.invoke @ zone.js:332onInvoke @ core.umd.js:8772ZoneDelegate.invoke @ zone.js:331Zone.run @ zone.js:225(anonymous function) @ zone.js:591ZoneDelegate.invokeTask @ zone.js:365onInvokeTask @ core.umd.js:8763ZoneDelegate.invokeTask @ zone.js:364Zone.runTask @ zone.js:265drainMicroTaskQueue @ zone.js:497ZoneTask.invoke @ zone.js:437
core.umd.js:5997 ORIGINAL EXCEPTION: Maximum call stack size exceededErrorHandler.handleError @ core.umd.js:5997(anonymous function) @ core.umd.js:9394ZoneDelegate.invoke @ zone.js:332onInvoke @ core.umd.js:8772ZoneDelegate.invoke @ zone.js:331Zone.run @ zone.js:225(anonymous function) @ zone.js:591ZoneDelegate.invokeTask @ zone.js:365onInvokeTask @ core.umd.js:8763ZoneDelegate.invokeTask @ zone.js:364Zone.runTask @ zone.js:265drainMicroTaskQueue @ zone.js:497ZoneTask.invoke @ zone.js:437
core.umd.js:6000 ORIGINAL STACKTRACE:ErrorHandler.handleError @ core.umd.js:6000(anonymous function) @ core.umd.js:9394ZoneDelegate.invoke @ zone.js:332onInvoke @ core.umd.js:8772ZoneDelegate.invoke @ zone.js:331Zone.run @ zone.js:225(anonymous function) @ zone.js:591ZoneDelegate.invokeTask @ zone.js:365onInvokeTask @ core.umd.js:8763ZoneDelegate.invokeTask @ zone.js:364Zone.runTask @ zone.js:265drainMicroTaskQueue @ zone.js:497ZoneTask.invoke @ zone.js:437
core.umd.js:6001 RangeError: Maximum call stack size exceeded
    at new ViewWrappedError (core.umd.js:8092)
    at DebugAppView._rethrowWithContext (core.umd.js:12183)
    at DebugAppView.create (core.umd.js:12129)
    at DebugAppView._View_HeroesComponent0.createInternal (HeroesComponent.ngfactory.js:33)
    at DebugAppView.AppView.create (core.umd.js:11914)
```
The browser appeared dead until that showed up.  The fan is going overtime and the notebook bottom is super hot.
Seems like an infinate loop.  Unable to kill the page.  Open the page in a new tab trying to get the updated changes to show.
Sometimes having everything running could cause problems like this.
Then, after completing the changes, in a new tab, there is a new error:
```
core.umd.js:5995 EXCEPTION: 
Error in ./AppComponent class AppComponent_Host
 - inline template:0:0 caused by: 
 The selector "my-app" did not match any elementsErrorHandler.handleError @ core.umd.js:5995
core.umd.js:5997 ORIGINAL EXCEPTION: The selector "my-app" did not match any elements
```
Then, the grey screen of death.
my-app is configured in the AppComponent class.
So what is causing the dance of death?

I confirmed that that class and the app.component.ts class are as expected in the doc.
It even says this:
```
Our refactoring of AppComponent into a new AppComponent and a HeroesComponent worked! 
We have done no harm.
```
I would say a crashing browser and crashing computer means harm was done.
But it was due to the old template being used as the selector.
Changed app.component to heroes.component for the templateUrl.
Since it's the hero-detail.component, it should use the 'heroes.component.html'!

There is one more small issue.  The name input is not being filled with the hero.
That's becuase the selected hero functionality is still in the heroes.component.
This will change because the router now will take the responsibility of passing the selected hero to the heroes page.

Now we can get on with using the router.

add <base href="/"> at the top of the <head> section of index.
Tyring to find out why this is needed, found out the internet is down.
Then, add the router, without the ability to install it, the running app showed this error in the console:
```
core.umd.js:5995 EXCEPTION: Uncaught (in promise): 
Error: Cannot match any routes: ''ErrorHandler.handleError @ ...
Error: Uncaught (in promise): 
Error: Cannot match any routes: ''
    at resolvePromise (zone.js:558)
...
    zone.js:484 Unhandled Promise rejection: 
Cannot match any routes: '' ; 
Zone: angular ; 
Task: Promise.then ; 
Value: Error: Cannot match any routes: ''(…) 
Error: Cannot match any routes: ''
```
Just curious that it mentions promise there.

Anyhow, the reason for the base tag?

### history.pushState
```
The Router uses the browser's history.pushState for navigation. 
in-app URLs can be indistinguishable from server URLs.
HTML 5 browsers support pushState which is why many people say "HTML 5 style" URLs.
```

the app.component template changes from this:
```
<my-heroes></my-heroes>
```

to this:
```
<a routerLink="/heroes">Heroes</a>
<router-outlet></router-outlet>
```

Not as cool as my-heroes for a tag, but whatever.
The routerLink="/heroes" is cool however.

The component router seems pretty straight forward.  Now it's on toe http.

Curratnly at: Setting the route parameters in the list view


## <a name="upgrade-to-angular-2-official">Upgrade to Angular 2 Official</a>
Yesterday avo the officual announcemnt came out amidst a shower of red balloons that the Angular2 release is now official.
I checked the [API References](https://angular.io/docs/ts/latest/api/core/testing/index/TestBed-class.html) says this about that:
`TestBed Class Stability: Experimental` has now been changed to just the work `experimental`.

Following the Julie Ralph commit for her [upgrade commit](https://github.com/juliemr/ng2-test-seed/commit/84d591bc9b8dee172c4fc4ac816b72da8aa5503f).
```
 -    "@angular/common": "2.0.0-rc.7",
 -    "@angular/compiler": "2.0.0-rc.7",
 -    "@angular/core": "2.0.0-rc.7",
 -    "@angular/platform-browser": "2.0.0-rc.7",
 -    "@angular/platform-browser-dynamic": "2.0.0-rc.7",
```
becomes
```
 +    "@angular/common": "2.0.0",
 +    "@angular/compiler": "2.0.0",
 +    "@angular/core": "2.0.0",
 +    "@angular/platform-browser": "2.0.0",
 +    "@angular/platform-browser-dynamic": "2.0.0",
```
Then, the errors:
```
$ npm i
npm WARN peerDependencies The peer dependency rxjs@5.0.0-beta.12 included from @angular/router will no
npm WARN peerDependencies longer be automatically installed to fulfill the peerDependency 
npm WARN peerDependencies in npm 3+. Your application will need to depend on it explicitly.
npm ERR! Darwin 14.5.0
npm ERR! argv "/Users/tim/.nvm/versions/node/v4.4.3/bin/node" "/Users/tim/.nvm/versions/node/v4.4.3/bin/npm" "i"
npm ERR! node v4.4.3
npm ERR! npm  v2.15.1
npm ERR! code EPEERINVALID

npm ERR! peerinvalid The package @angular/core@2.0.0 does not satisfy its siblings' peerDependencies requirements!
npm ERR! peerinvalid Peer @angular/common@2.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer @angular/compiler@2.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer @angular/forms@2.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer @angular/http@2.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer @angular/platform-browser@2.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer @angular/platform-browser-dynamic@2.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer @angular/router@3.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer @angular/upgrade@2.0.0 wants @angular/core@^2.0.0
npm ERR! peerinvalid Peer angular2-in-memory-web-api@0.0.18 wants @angular/core@2.0.0-rc.6

npm ERR! Please include the following file with any support request:
npm ERR!     /Users/tim/angular/ng2/heroes2/npm-debug.log
```
I left a comment on the commit page since there was no issues tab on the repo.
Felt like I am a little bit out of line with that, but anyhow, it's done.  
See if she notices and responds.
Tried this: `$ npm install npm -g`
Then, after starting the app again:
```
zone.js:484 Unhandled Promise rejection: Zone.assertZonePatched is not a function ; 
Zone: <root> ; Task: Promise.then ; 
Value: TypeError: Zone.assertZonePatched is not a function(…) 
TypeError: Zone.assertZonePatched is not a function
    at new NgZoneImpl 
```
Again with the Promise.
SO: You need to update zone.js pakage by zone.js@0.6.21 for RC7
```
<script src="https://unpkg.com/zone.js@0.6.21/dist/zone.js"></script>
```
(SO stands for StackOverflow b.t.w.)

Looked at the current quickstart package.json.
Changed this: `"rxjs": "5.0.0-beta.11",` from beta.11 to 12.
Then got these problems with $ npm i
```
symbol-observable@1.0.2 node_modules/rxjs/node_modules/symbol-observable -> node_modules/symbol-observable
angular2-quickstart@1.0.0 /Users/tim/angular/ng2/heroes2
├── UNMET PEER DEPENDENCY @angular/core@2.0.0
├── UNMET PEER DEPENDENCY @angular/http@2.0.0
├── UNMET PEER DEPENDENCY rxjs@5.0.0-beta.12
└── UNMET PEER DEPENDENCY zone.js@0.6.17
npm WARN @angular/core@2.0.0 requires a peer of zone.js@^0.6.21 but none was installed.
npm WARN angular2-in-memory-web-api@0.0.18 requires a peer of @angular/core@2.0.0-rc.6 but none was installed.
npm WARN angular2-in-memory-web-api@0.0.18 requires a peer of @angular/http@2.0.0-rc.6 but none was installed.
npm WARN angular2-in-memory-web-api@0.0.18 requires a peer of rxjs@5.0.0-beta.11 but none was installed.
npm ERR! code 1
```

Besides this change, here are some other mods in the quickstarter:
```
 -    "rxjs": "5.0.0-beta.11"
 +    "rxjs": "5.0.0-beta.12"
 -    "zone.js": "^0.6.21",
 +    "zone.js": "^0.6.23", 
 -    "angular2-in-memory-web-api": "0.0.19",
 +    "angular2-in-memory-web-api": "0.0.20",
```
After doing the npm i, then npm start, the app runs again.
Then we're back to implementing routes!


## <a name="tour-of-heroes-services">Tour of Heroes: Services</a>

The services part was pretty straight forward.  This just records an error that will happen halfway through the step.
After a half implemented promise, the app breaks with the following (partial!) error:
```
zone.js:484 Unhandled Promise rejection: Error in app/app.template.html:11:8 caused by: 
Cannot find a differ supporting object '[object Object]' of type 'object'. 
NgFor only supports binding to Iterables such as Arrays. ; 
Zone: <root> ; 
Task: Promise.then ; 
Value: ViewWrappedError {_nativeError: Error: Error in app/app.template.html:11:8 
caused by: Cannot find a differ supporting object 
'[objec…, originalError: Error: Cannot find a differ supporting object '[object Object]' of type 
'object'. NgFor only support…, context: DebugContext} 
Error: Cannot find a differ supporting object '[object Object]' of type 'object'. 
NgFor only supports binding to Iterables such as Arrays.
    at NgFor.ngOnChanges (http://localhost:3000/node_modules/@angular/common/bundles/common.umd.js:2309:31)
    at DebugAppView._View_AppComponent0.detectChangesInternal (AppComponent.ngfactory.js:130:46)
    at DebugAppView.AppView.detectChanges (http://localhost:3000/node_modules/@angular/core/bundles/core.umd.js:12061:18)
    at DebugAppView.detectChanges (http://localhost:3000/node_modules/@angular/core/bundles/core.umd.js:12166:48)
    at DebugAppView.AppView.detectViewChildrenChanges (http://localhost:3000/node_modules/@angular/core/bundles/core.umd.js:12087:23)
    at DebugAppView._View_AppComponent_Host0.detectChangesInternal (AppComponent_Host.ngfactory.js:37:8)
    at DebugAppView.AppView.detectChanges (http://localhost:3000/node_modules/@angular/core/bundles/core.umd.js:12061:18)
    at DebugAppView.detectChanges (http://localhost:3000/node_modules/@angular/core/bundles/core.umd.js:12166:48)
    at ViewRef_.detectChanges (http://localhost:3000/node_modules/@angular/core/bundles/core.umd.js:10159:69)
    at eval (http://localhost:3000/node_modules/@angular/core/bundles/core.umd.js:9623:88)consoleError @ zone.js:484_loop_1 @ zone.js:511drainMicroTaskQueue @ zone.js:515ZoneTask.invoke @ zone.js:437
zone.js:486 Error: Uncaught (in promise): Error: Error in app/app.template.html:11:8 caused by: Cannot find a differ supporting object '[object Object]' of type 'object'. NgFor only supports binding to Iterables such as Arrays.(…)
```

Obviously no improvement from Angular 1 on the errors.
But, yes, we need to use the promise now being returned by the service.
Implemnt the .then function to use the promise, and the app is back up and running.


## <a name="The-ngOnInit-Lifecycle-Hook">The ngOnInit Lifecycle Hook</a>
In the Tour of Heroes Services chapter, there is a discussion regarding a constructor vs. ngInit.
This comes directly from the tutorial:
```
AppComponent should fetch and display heroes without a fuss. 
Where do we call the getHeroes method? In a constructor? We do not!

Years of experience and bitter tears have taught us to keep complex logic out of the constructor, 
especially anything that might call a server as a data access method is sure to do.

The constructor is for simple initializations like wiring constructor parameters to properties. 
It's not for heavy lifting. 
We should be able to create a component in a test and not worry that it might do real work 
— like calling a server! — before we tell it to do so.

If not the constructor, something has to call getHeroes.
Angular will call it if we implement the Angular ngOnInit Lifecycle Hook. 
Angular offers a number of interfaces for tapping into critical moments in the component lifecycle: 
at creation, after each change, and at its eventual destruction.
```

## Errata
In the Hero service, there is a lot going on which is glossed over in the tutorial.  Keeping it simple do doubt.
Here are some of the things I am talking about.
```
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }
```
That's a pretty nifty bit of code there.  
Mapping an Ajax json file to a TypeScript object.
But say I wanted to add some logging in there:
```
.then(response => {
    console.log('response',response);
    response.json().data as Hero[];
})
```
XCode doesn't like that.  I has the whole and surrounding block in red squigglies, and a mouseover hint says this:
```
[ts] Type 'Promise<void>' is not assignable to type 'Promise<Hero[]>'.
  Type 'void' is not assignable to type 'Hero[]'.
(parameter) response: Response
```
I think it a combination of the fat arrow and, what, destructuring?  I'm not even clear on the 'as' format used there.
I remeber learning this about the fat arrow and restructuring, and this was a note I took at the time:
```
.then({data} => data.item; do not use the fat arrow function with desctructuring (DI function)
```
But that's not a destructuring syntax, I know I've seen it before but never used it myself.
It's not easy searching for a simple word like 'as' and getting useful responses.
Searching with the phrase 'response.json().data as ' yeilded [this answer](http://stackoverflow.com/questions/38708703/whats-the-best-way-to-cast-json-to-generic-object-in-angular-2-typescript) on stack overflow.
The question asked is 'Whats the best way to cast JSON to generic Object[] in angular 2 typescript?'
The answer, by @r3m0t sates: The correct way is as any[]:
```
return this.http.get(URL)
    .toPromise()
    .then(response => response.json().data as any[]) 
    .catch(this.handleError);
```
This will let you access everything that was in the JSON response 
(as well as everything that wasn't in the JSON response. You'll get an error at runtime).
It would be better to cast the result to a specific type, see [How do I cast a JSON object to a typescript class](http://stackoverflow.com/questions/22875636/how-do-i-cast-a-json-object-to-a-typescript-class)

So it's a TypeScript thing.  And the link above looks like a good read.
There are two camps on this:
1. a number of techniques for doing it that generally involve copying data.
2. cast to an interface (as it's purely a compile time structure), this would require that you use a TypeScript class which uses the data instance and performs operations with that data.

Anyhow, it does not actually include a sample with the obj as somthing[] syntax.
There is the accepted answer:
```
var d = new MyRichObject();
d.copyInto(jsonResult);
```
or this:
```
MapUtils.deserialize(Person, example);
```
or this:
```
var json = Utilities.JSONLoader.loadFromFile("../docs/location_map.json");
var locations: Array<ILocationMap> = JSON.parse(json).location;
```
from the second link.

There is [another question](http://stackoverflow.com/questions/39326976/get-data-from-json-with-angular2-promise) which deals with the exact same bit of code from the tutorial above.
There is debate about where to put the console.log in the notes.
However, there is no answer to the question.  Tha asker answers the question in the comments.
The method is wrapped in a return statement, so the result of that line is what will be returned.

Anyhow, the main question here, besides how to structore the statement with a console log, [is discussed here](http://acdcjunior.github.io/typescript-cast-object-to-other-type-or-instanceof.html).
It's a casting feature:
```
Use <> or the as keyword for casting:
var myObject: TypeA;
var otherObject: any;
// values are assigned to them, and...
myObject = <TypeA> otherObject;     // using <>
myObject = otherObject as TypeA;    // using as keyword
```
For those who don't know, the <> is known as the 'Elvis' operatro, probably because Elvis like jewels.

The 'as' syntax is detailed here:
[TypeScript 1.6: JSX support](https://www.typescriptlang.org/docs/release-notes/typescript-1.6.html)
the new as operator
```
var x = <any> foo;
// is equivalent to:
var x = foo as any;
```
There is also [this question]() which deals with the same operator:
Is there any difference between what the TypeScript spec calls a type assertion:
```
var circle = <Circle> createShape("circle");
```
And the newer as operator:
```
var circle = createShape("circle") as Circle;
```
Both of which are typically used for compile-time casting?

The Answer: The difference is that as Circle works in TSX files, but <Circle> conflicts with JSX syntax. 
as was introduced for this reason.  For example, the following code in a .tsx file:
```
var circle = <Circle> createShape("circle");
```
Will result in the following error:
```
error TS17002: Expected corresponding JSX closing tag for 'Circle'.
```
However, as Circle will work just fine.
Use as Circle from now on. It's the recommended syntax.

I can see why they glossed over that syntax.


The other piece of code I had a question about was this:
```
delete(hero: Hero): void {
  this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
}
``` 
What is the filter doing here?  It's a search and match function, but using the filter method with a fat arrow.
That's an interesting why to perform a loop.
That's a functional programming style from the rxjs observables library.


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


## <a name="detail-view-pagination">Detail view pagination</a>
Not sure how to use the router to programmatically go to a specific route.
This code goes to the next image, but then jumps back to the previous one.
This code it from the hero-detail.component:
```
<button (click)="goForward()"
    style="margin-top: 3px;transform: scaleX(-1);">
    <img src="/app/images/buttons/back-button.png"
        height="30px">
</button>
...
    goForward(): void {
        let newId = this.hero.id++;
        this.heroService.getHero(newId)
                .then(hero => 
                    this.hero = hero);
                    //console.log('hero param', id);
        this.router.navigate(['/detail',newId]);
        //window.history.pushState('detail','/detail','/detail/'+newId);
        console.log('goForward');
    }
```
These version will do the same:
```
this.router.navigate(['/detail/'+newId]);
this.router.navigateByUrl('/detail/'+newId);
this.router.navigate(['/detail', { id: newId }]);
```

Also note that the url does not change unless you click a few times quickly.
The router docs say:
```
The link parameters array has two items: the path of the destination route and a route parameter that specifies the id of the selected hero.
```
Why use an array?  Why not a function with two arguments?
Anyhow this is how the heroes.component does it:
```
this.router.navigate(['/detail', this.selectedHero.id]);
```
So that is the correct way to do it.  
What may be happening is that the selectedHero in the HeroesComponent class is not being changed.
Tried importing that class in to the HeroDetailComponent class, 
We could expose that class in the detail view and do this:
```
HeroesComponent.onSelect(this.hero);
```
But, then that would have to be a static function.  Not sure, in the JS world, since using the 'new' keyword is frowned upon and Angular has it's own way of creating these classes...
What to do?

The answer was not to call router.navigate at all, just change the hero object.
Then, to update the history of the browser, we use the history pushState functiuon.
Here is the API for that call:
```
(method) History.pushState(statedata: any, title?: string, url?: string): void
```
And an example use case:
```
var stateObj = { foo: "bar" };
history.pushState(stateObj, "page 2", "bar.html");
```
Which in our case is just this:
```
history.pushState({}, this.hero.name, '/detail/'+newId);
```
And viola, we have pagination.  
It's lacking validation at this point, but we'll deal with that once we know that this particulary implentation is going to stick around.


## <a name="tour-of-heroes-master-detail">Tour of Heroes: Master/Detail</a>

For part two, the master detail pattern, creating an array of heroes causes this error:
```
    const HEROES: Hero[] = [
        { id: 11, name: 'Mr. Nice' },
        ...
        { id: 19, name: 'Magma' },
        { id: 20, name: 'Tornado' }
    ];
```    
[ts]
A class member cannot have the 'const' keyword.

If 'const' is changed to 'var', then most of the red squiggly lines are gone, but there is a red squiggly line under the var keyword, with the mouse-over message:
[ts] 
Unexpected token. A constructor, method, accessor, or property was expected.

If the const keyword is removed altogether, there is no error.
The problem was the location where this was.
Originally, I put it in the AppComponent class.  But it should actually reside outside that class.
It could be in it's own file, but putting it after the Hero class after the import statements works for now.

On [StackOverflow, this answer said](http://stackoverflow.com/questions/36142879/const-keyword-in-typescript)
Why a class member cannot have the 'const' keyword in TypeScript?
const does not imply deep immutability so the following is valid:
```
const foo:any = {};
foo.bar = 123;  // Okay
```
In that sense read only makes better sense for class members and that is supported :


Completed [toh-pt1](https://angular.io/docs/ts/latest/tutorial/toh-pt1.html) step.
Will jump ahead next and [add Webpack](https://angular.io/docs/ts/latest/guide/webpack.html) to replace SystemJS.


## <a name="the-favicon.ico">The favicon.ico</a>

The StackOverflow [#1 answer](http://stackoverflow.com/questions/2208933/how-do-i-force-a-favicon-refresh): 
force browsers to download a new version using the link tag and a query string on your 
filename. This is especially helpful in production environments to make sure your users 
get the update.
```
<link rel="icon" href="http://www.yoursite.com/favicon.ico?v=2" />
```
We're using this variation:
```
<link rel="shortcut icon" href="favicon.ico?v=2" />
```

Answer #2:
he easy way to fix it is close to that of line of birds

1. type in www.yoursite.com/favicon.ico
2. push enter
3. ctrl+f5
4. Restart Browser (for IE and Firefox)

However, this is not working.  There is either no icon, or the old Angular icon.
When using Node, there is a Spring leaf icon.


## <a name="setup">Setup</a>
Following the section below in the original Angular 2 Quickstart, with the following exception:
```
QuinquenniumF:heroes2 tim$ git remote add origin https://github.com/timofeysie/heroes2.git
fatal: remote origin already exists.
QuinquenniumF:heroes2 tim$ git remote add remote https://github.com/timofeysie/heroes2.git
```

Next, the typings folder didn't show up after npm install, so installed them manually with:
```
$ npm run typings -- install
```

Then, to push changes to GitHub:
```
$ git push -u remote master
```

To Deploy to Heroku
```
$ git push heroku master
```

## Using VSCode
The editor of choice for working with TypeScript on this project.
Updated VisualStudio code to v1.5.2:
A version mismatch between the globally installed tsc compiler (1.5.3) and VS Code's language service (1.8.10) has been detected. This might result in inconsistent compile errors.
The editor [opens this page](https://code.visualstudio.com/docs/languages/typescript#_using-newer-typescript-versions) for details.
Might need to look at this later if there are any problems with the typings.

