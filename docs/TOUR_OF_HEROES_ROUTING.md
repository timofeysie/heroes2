## <a name="tour-of-heroes-routing">Tour of Heroes: Routing</a>

TOC

1. Routing section
2. history.pushState
3. Upgrade to Angular 2 Official


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
