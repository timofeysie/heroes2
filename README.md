# heroes 2

The official Angular2 Tour of Heroes for rc-6 using TypeScript.

The running app is available [on Heroku](https://myra-the-ferryboat.herokuapp.com/).

## Table of Contents

1. [Development](#development)
2. [Current Work](#current-work)
2. [Advanced: Routing & Navigation](#advanced-routing-and-navigation">)
2. [Tour of Heroes: Routing](#tour-of-heroes-routing)
2. [Upgrade to Angular 2 Official](#upgrade-to-angular-2-official)
2. [Fixing the tests](fixing-the-tests)
2. [Tests broken after separate components step](#tests-broken-after-separate-components-step)
2. [Tour of Heroes: Services](#tour-of-heroes-services)
2. [Tour of Heroes: Multiple Components](#tour-of-heroes-multiple-components)
2. [The ngOnInit Lifecycle Hook](lThe-ngOnInit-Lifecycle-Hook)
2. [Detail view pagination](#detail-view-pagination)
2. [Tour of Heroes: Master/Detail](#tour-of-heroes-master-detail)
3. [The favicon.ico](#the-favicon.ico)
4. [Webpack](#webpack)
5. [Deploying to Heroku](#deploying-to-heroku)
5. [Setup](#setup)
5. [Original Angular 2 QuickStart Source](#original-angular-2-quickstart-source)
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

Since the tests don't work for compiled templates yet, the templates are going back in-line for the time being.
See [fixing the tests](#fixing-the-tests) for more details.
For a discussion regarding the unit tests and an Unhandled Promise rejection, see the end of the 
[Tests broken](#tests-broken-after-separate-components-step) section below.

Added NodeJS server to use for deployment on Heroku.


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



## <a name="fixing-the-tests">Fixing the tests</a>

Looking at fixing the tests before the refactoring during the [next part: component templates](https://angular.io/docs/ts/latest/tutorial/toh-pt3.html).
Currently, two out of three unit tests are failing.
```
Failed	should instantiate component	AppComponent with TCB 
Error: Template parse errors: Can't bind to 'ngModel' since it isn't a known property of 'input'. 
(" <div> <label>name: </label> <input [ERROR ->][(ngModel)]="selectedHero.name" placeholder="name"/> </div> </div> "): 
AppComponent@7:11
```
Some advice [from StackOverflow](http://stackoverflow.com/questions/39040011/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input-despite-impor) on this:
`You need to create a root NgModule in which you import the FormsModule`
And example shows using this combo:
```
import { FORM_DIRECTIVES } from '@angular/forms';
...
, directives: [FORM_DIRECTIVES]
```
However, for us, the first one yields the following error:
```
[ts] Module '"/Users/tim/angular/ng2/heroes2/node_modules/@angular/forms/index"' has no exported member 'FORM_DIRECTIVES'.
import FORM_DIRECTIVES
```
The answer did mention that this is RC5, and we are using RC6 here.
The official docs point to using forms with two way binding with this import:
```
import { FormsModule }   from '@angular/forms';
```
That is what we already have in our app.modules.ts.
In RC6, provideForms, disableDeprecatedForms are removed as deprecated.
These were fixes for the problem mentioned.  So now is there no fix for testing forms with two way binding (pretty much the only place you would want it) in RC6?
Just about to get frustrated when a search prefixed with RC6 brought up [this answer](http://stackoverflow.com/questions/35229960/cant-bind-to-for-since-it-isnt-a-known-native-property-angular2):
`Angular by default uses property binding but label doesn't have a property for. To tell Angular explicitly to use attribute binding, use instead.`

So using this works:
```html
<input [(attr.ngModel)]="selectedHero.name" placeholder="name"/>
```
Günter Zöchbauer had this comment explaining why:
'With attr.for you have to explicitly opt in to attribute binding because attribute binding is expensive. Attributes are reflected in the DOM and changes require for example to check if CSS selectors are registered that match with this attribute set. Property binding is JS only and cheap, therefore the default.'
I have some notes somewhere on property vs. attribute binding.  Not a simple subject.


The second error (yes, I said there were two!:
```
Failed	should have expected h1 text	AppComponent with TCB 
Error: Template parse errors: Can't bind to 'ngModel' since it isn't a known property of 'input'. (" <div> <label>name: </label> <input [ERROR ->][(ngModel)]="selectedHero.name" placeholder="name"/> </div> </div> "): AppComponent@7:11
```
That is easy to fix.  Since we changed the title, expecting the new title passes the test.

Now for the end to end tests.
Running them yields this error:
```
npm ERR! Failed at the angular2-quickstart@1.0.0 e2e script 
'tsc && concurrently "http-server -s" "protractor protractor.config.js" 
--kill-others --success first'.
```
(kill-others --success first?  Really?!)
Anyhow, that is a similar error we when trying the Webpack introduction right at the end of the Developers Guide section of the Angular docs, and the Heroku deployment debacle.
Actually, that error comes AFTER this message:
```
[1]     failed - should display: My First Angular 2 App
[1]   Suite failed: QuickStart E2E Tests
```
So the test is failing for the same reason the last unit test was failing!
That error may be because of the clean up config we removed to make the app deploy to Heroku.
Change that and the test passes.


## <a name="tests-broken-after-separate-components-step">Tests broken after separate components step</a>
This was good, but a few days later, re-running the tests after the services step show two fails:
```
Timestamp: 9/13/2016, 7:46:59 AM
3 tests / 0 errors / 2 failures / 0 skipped / runtime: 0.065s
Status	Spec	Suite / Results
Passed in 0.003s	should run a passing test	Smoke test
Failed	should instantiate component	AppComponent with TCB 
Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents" before your test.
Failed	should have expected h1 text	AppComponent with TCB 
Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents" before your test.
```
So it seems the re-factoring done in the separate components step of the tour has broken the tests.
Where was it that said you can not run the development tools and the two test types at the same time?
It would be nice to have the tests running in the background.

Compiling templates is done with the karma-ng-html2js-preprocessor on GitHub:
$ npm install karma-ng-html2js-preprocessor --save-dev

Install and configure this in the karma.conf.js file.  
Then, following the recipe for compiling templates in the testing book, `beforeEach(inject('AppComponent', 'app.template.html'))`, causes this error:
```
[ts] Cannot find name 'inject'. any
```
Might have to skip ahead to the testing section to figure out how to use this format:
```
describe('AppComponent with TCB', function () {
  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [AppComponent]});
  });
  beforeEach(inject('AppComponent', 'app.template.html'))
  ...
```
Going to [the testing page from the Developer Guide])(https://angular.io/docs/ts/latest/guide/testing.html) has this alert:
```
We are still preparing the testing guide with all the new testing features introduced in RC5 and will update it very soon.
```
Does it talk about TestBed from '@angular/core/testing'?
Nope.
The [API References](https://angular.io/docs/ts/latest/api/core/testing/index/TestBed-class.html) says this about that:
`TestBed Class Stability: Experimental`
It does mention this function:
compileComponents() : Promise<any>
Compile components with a templateUrl for the test's NgModule. 
It is necessary to call this function as fetching urls is asynchronous.
It says you have to do this after the configuration statement:
TestBed.compileComponents();

On a side note, a few days later, following a tweet by Julie Ralph who I believe is on the Angular testing team.
She [has a test that uses test bed here](https://github.com/juliemr/ng2-test-seed/blob/master/src/test/greeting-component_test.ts)
describe('greeting component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GreetingComponent],
      providers: [
        {provide: LoginService, useClass: MockLoginService },
        UserService
      ]
    });
  });
Looks like we need to add the providers.  But that's for another chapter.


13 09 2016 11:29:34.741:ERROR [preprocess]: Can not load "ng-html2js", it is not registered!
Following [the advice here](http://stackoverflow.com/questions/19069183/karma-throws-error-can-not-load-ng-html2js-it-is-not-registered),
had to do this in the karma.conf.js file:
```
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-htmlfile-reporter'),
      require('karma-ng-html2js-preprocessor')
    ],
``` 
Then, we are getting these errors:
```
[1] 13 09 2016 11:35:19.709:ERROR [karma]: [TypeError: filepath.strip is not a function]
[1] TypeError: filepath.strip is not a function
```   

Looking for [for this error](http://stackoverflow.com/questions/36478554/karma-cannot-load-imported-files)
In the karma-test-shim.js file, it seems like the dist directory is wrong:
```
var builtPath = '/base/app/';
...
System.config({
  baseURL: '/base',
```
Get rid of the base part, since all our compiled files are next to their ts files in the app directory.
However, the karma.conf.js file also had the js path set wrong, it appears:
```
  var testBase    = 'testing/';       // transpiled test JS and map files
  var testSrcBase = 'testing/';       // test source TS files
```
Changed that also to 'app/'.
This was the output when running the tests:
[1] 13 09 2016 11:35:07.900:WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/systemjs.config.extras.js" does not match any file.
[1] 13 09 2016 11:35:07.907:WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/testing/**/*.js" does not match any file.
[1] 13 09 2016 11:35:07.917:WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/testing/**/*.ts" does not match any file.
[1] 13 09 2016 11:35:07.918:WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/testing/**/*.js.map" does not match any file.
```
After that change, the systemjs.config.extras.js line is still showing, and the `TypeError: filepath.strip is not a function` errors are still there.

```
    files: [
      // System.js for module loading
      'node_modules/systemjs/dist/system.src.js',
```
If the pattern in the log is:
"/Users/tim/angular/ng2/heroes2/systemjs.config.extras.js"
THen how is the file pattern not being used?
Changed the karma.conf.js:
```
 {pattern: 'systemjs.config.extras.js', included: false, watched: false},
```
Now it includes the path above.  Actually there is not extras file in that directory.
`system.src.js` exists but no idea why systemjs.config.extras.js is missing.

Anyhow, back to this:
var cacheId = filepath.strip('public/', '');
Change that via [this commit](https://github.com/karma-runner/karma-ng-html2js-preprocessor/pull/94/files)
from 'strip' to 'replace'.
Then, the errors change:
```
System output:
Chrome 52.0.2743 (Mac OS X 10.10.5) ERROR: 'Unhandled Promise rejection:', 'Error: XHR error (404 Not Found) loading http://localhost:9876/systemjs.config.js Error loading http://localhost:9876/systemjs.config.js', '; Zone:', '', '; Task:', 'Promise.then', '; Value:', Error{originalErr: Error{}}, null 
Chrome 52.0.2743 (Mac OS X 10.10.5) ERROR: Error{rejection: Error{originalErr: Error{}}, promise: ZoneAwarePromise{ zone_symbol__state: 0, __zone_symbol__value: Error{originalErr: ...}}, zone: Zone{_properties: Object{}, _parent: null, _name: '', _zoneDelegate: ZoneDelegate{_taskCounts: ..., zone: ..., _parentDelegate: ..., _forkZS: ..., _forkDlgt: ..., _interceptZS: ..., _interceptDlgt: ..., _invokeZS: ..., _invokeDlgt: ..., _handleErrorZS: ..., _handleErrorDlgt: ..., _scheduleTaskZS: ..., _scheduleTaskDlgt: ..., _invokeTaskZS: ..., _invokeTaskDlgt: ..., _cancelTaskZS: ..., _cancelTaskDlgt: ..., _hasTaskZS: ..., _hasTaskDlgt: ...}}, task: ZoneTask{runCount: 1, type: 'microTask', zone: Zone{_properties: ..., _parent: ..., _name: ..., _zoneDelegate: ...}, source: 'Promise.then', data: undefined, scheduleFn: undefined, cancelFn: null, callback: function () { ... }, invoke: function () { ... }}} 
Chrome 52.0.2743 (Mac OS X 10.10.5) ERROR: 'Unhandled Promise rejection:', 'Error: XHR error (404 Not Found) loading http://localhost:9876/systemjs.config.js Error loading http://localhost:9876/systemjs.config.js', '; Zone:', '', '; Task:', 'Promise.then', '; Value:', Error{originalErr: Error{}}, null 
```

The un-handled promise would be the one we saw in the API reference:
```
compileComponents() : Promise<any>
```
Compile components with a templateUrl for the test's NgModule. 
It is necessary to call this function as fetching urls is asynchronous.
It says you have to do this after the configuration statement:
TestBed.compileComponents();

One example uses this line:
```
TestBed.compileComponents().catch(error => console.error(error));
```
Same error.  It still looks like systemjs.config.extras.js is missing, but there is not much on Google regarding this.

"systemjs.config.extras.js" does not match any file.
This google search only appears in one place:
<script src="https://gist.github.com/Cayan/3e684dbe40b14cb3acdce00122bcf043.js"></script>
That gist appears [here](https://github.com/angular/quickstart/issues/208)
Foxandxss commented 5 days ago
Yes, we are syncing the testing chapter with the quickstart so this will be fixed for next week.
filipesilva referenced this issue 3 days ago
chore(test): remove references to missing folder #212
filipesilva commented 3 days ago
Tests seem to be running correctly with the latest quickstart, are you using the new SystemJS and karma config?

When did we download and start this? Only two days ago...
The commit referenced in #212 simply removes all the test base stuff in karma.conf.js
```
-  var testBase    = 'testing/';       // transpiled test JS and map files
-  var testSrcBase = 'testing/';       // test source TS files
``` 

The [GitHub repo](https://github.com/angular/quickstart/blob/master/karma.conf.js) still has the testBase there, so I suppose that pull request hasn't been merge yet?
Or maybe it's not the correct fix.

Created my own gist to add a comment on the issue.
<script src="https://gist.github.com/timofeysie/3cf46e2fffea24e6887ade811f14ad16.js"></script>

Then, to get back to the tour, the templates were put back in-line to get the tests to pass.
```
$ npm test
open the tests file:///Users/tim/angular/ng2/heroes2/_test-output/tests.html
```
The result:
```
Timestamp: 9/14/2016, 2:57:15 PM
0 tests / 1 errors / 0 failures / 0 skipped / runtime: 0s
Status	Spec	Suite / Results
System output:
Chrome 52.0.2743 (Mac OS X 10.10.5) ERROR: 'Unhandled Promise rejection:', 'Error: XHR error (404 Not Found) loading http://localhost:9877/systemjs.config.js Error loading http://localhost:9877/systemjs.config.js', '; Zone:', '', '; Task:', 'Promise.then', '; Value:', Error{originalErr: Error{}}, null 
Chrome 52.0.2743 (Mac OS X 10.10.5) 
ERROR: Error{rejection: 
Error{originalErr: 
Error{}}, promise: ZoneAwarePromise{ _zone_symbol__state: 0, __zone_symbol__value: Error{originalErr: ...}}, zone: Zone{_properties: Object{}, _parent: null, _name: '', _zoneDelegate: ZoneDelegate{_taskCounts: ..., zone: ..., _parentDelegate: ..., _forkZS: ..., _forkDlgt: ..., _interceptZS: ..., _interceptDlgt: ..., _invokeZS: ..., _invokeDlgt: ..., _handleErrorZS: ..., _handleErrorDlgt: ..., _scheduleTaskZS: ..., _scheduleTaskDlgt: ..., _invokeTaskZS: ..., _invokeTaskDlgt: ..., _cancelTaskZS: ..., _cancelTaskDlgt: ..., _hasTaskZS: ..., _hasTaskDlgt: ...}}, task: ZoneTask{runCount: 1, type: 'microTask', zone: Zone{_properties: ..., _parent: ..., _name: ..., _zoneDelegate: ...}, source: 'Promise.then', data: undefined, scheduleFn: undefined, cancelFn: null, callback: function () { ... }, invoke: function () { ... }}} 
Chrome 52.0.2743 (Mac OS X 10.10.5) ERROR Disconnected, because no message in 10000 ms.

Changed the paths again from this:
```
      {pattern: 'systemjs.config.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/systemjs.config.extras.js', included: false, watched: false},
      'karma-test-shim.js',
```
To match files that actually exist:
```
      {pattern: 'node_modules/systemjs/dist/system.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false},
      'karma-test-shim.js',
```
That fixed these warnings
```
[1] 13 09 2016 11:43:53.203:WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/systemjs.config.extras.js" does not match any file.
```
But for some reason this warning is still happening:
```
[1]] 13 09 2016 12:04:30.678:WARN [web-server]: 404: /systemjs.config.js
```

Found [this](http://stackoverflow.com/questions/39468417/angular2-testing-a-component-with-templateurl-resulting-in-unhandled-promise) on StackOverflow which seems to be a similar issue.
Will add a comment there.  It was asked today so hopefully will get some attention.

Actually, you need 50 experience points to add a comment to a question.  Currently we have 27.  Damn.
There are two comments on the question:

You are using relative paths for the template and styles. 
Can you try adding the moduleId: module.id property to the component decorator? 
The Angular site has a write up on it [here](https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html) – Dave V 16 hours ago 
  	
 		
If you do setup for commonjs and use relative paths as Dave V suggests make sure you are 
using the ts transpiler rather than the default typescript one (which ignores commonjs packaging). 
Otherwise, you need to define the absolute paths (from the location of index.html) 
which would be app/app.component.html – Steven Luke 15 hours ago


After reading the link above, I made the switch to Component-Relative Paths in the component class to use relative paths.
It takes the addition of the modul.Id.
We went from this:
```
@Component({
    selector: 'my-app',
    styleUrls: ['./app/hero-styles.css'],
     templateUrl: './app/app.template.html',
```
TO this:
```
@Component({
    moduleId: module.id,
    selector: 'my-app',
    styleUrls: ['hero-styles.css'],
    templateUrl: 'app.component.html',
```
Noticed I also changed the name of the template file.  Looks like the
When commenting out the inline template, this error showed up in the test page in Chrome:
```
[1] 14 09 2016 19:26:15.393:ERROR [karma]: [TypeError: Cannot read property 'manual-9633' of null]
[1] TypeError: Cannot read property 'manual-9633' of null
[1]     at onBrowserComplete (/Users/tim/angular/ng2/heroes2/node_modules/karma-htmlfile-reporter/index.js:95:23)
[1]     at null.<anonymous> (/Users/tim/angular/ng2/heroes2/node_modules/karma/lib/events.js:13:22)
[1]     at emitOne (events.js:82:20)
[1]     at emit (events.js:169:7)
[1]     at null._onTimeout (/Users/tim/angular/ng2/heroes2/node_modules/karma/lib/browser.js:51:15)
[1]     at Timer.listOnTimeout (timers.js:92:15)
```

Tried the complete same of conf from the quickstart, but just went back to the same errors, so something in our code has broken the tests.
Still wondering if `systemjs.config.extras.js` is loaded into the node_modules, or if this is a mistake in the current quickstart code.

Took out the test bed compile line, and got the same error:
```
TestBed.compileComponents().catch(error => console.error('compile components err',error));
```

TOgether with the original karma.conf.js and still no joy.  Remember the old errors?
```
WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/systemjs.config.extras.js" does not match any file.
WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/testing/**/*.js" does not match any file.
WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/testing/**/*.ts" does not match any file.
WARN [watcher]: Pattern "/Users/tim/angular/ng2/heroes2/testing/**/*.js.map" does not match any file.
```

Also not sure if changing the paths for the patterns in the karma.conf.js is a replacement for what was in the quick start.
```
      {pattern: 'node_modules/systemjs/dist/system.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false},
      'karma-test-shim.js',
```
Anyhow, if the warnings go away, isn't that a good thing?

At what point did the tests start failing and these start appearing?  
Were those warnings there all along, and something done in another section cause the tests to start failing?
It should be easier to find out where things went wrong with all these notes, but somehow it's not.

Searching for `Unhandled Promise rejection` shows that it first appeared in the "Tour of Heroes: Multiple Components" section.
That was when running the app.  It was fixed by finishing the code.  Not sure if that's related.

Giving up on tests for a while to get back to learning Angular2.
At least the e2e tests are still passing...

### Compare with Quickstart

In an attempt to fix this issue, I've started a new quickstart project to run the tests and compare.
System info Chrome 53.0.2785 (Mac OS X 10.10.5) removed from the output.

The Heroes2 npm test output:
```
INFO: Connected on socket /#7aWgYHExaelgcNwGAAAA with id 99466865
WARN [web-server]: 404: /systemjs.config.js
ERROR: 'Unhandled Promise rejection:', 'Error: XHR error (404 Not Found) loading http://localhost:9876/systemjs.config.js
Error loading http://localhost:9876/systemjs.config.js', '; Zone:', '<root>', '; Task:', 'Promise.then', '; Value:', Error{originalErr: Error{}}, null
```

A fresh quickstart npm test output:
```
INFO Connected on socket /#a78MlUEDcK86XhiRAAAA with id 75238691
WARN [web-server]: 404: /base/systemjs.config.extras.js
LOG: 'Warning: System.import could not load the optional "systemjs.config.extras.js". Did you omit it by accident? Continuing without it.'
LOG: 'Warning: System.import could not load the optional "systemjs.config.extras.js". Did you omit it by accident? Continuing without it.'
LOG: Error{originalErr: Error{}}
LOG: Error{originalErr: Error{}}
Executed 3 of 3 SUCCESS (0.819 secs / 0.491 secs)
```

In the karma-test-shim.js file of the new quickstart:
```
  baseURL: '/base',
```

However, just making this change for our Heroes2 project changes nothing.

The only other diff in that file is:
```
var builtPath = '/base/app/'; // we use only /app/
```

What's next?  Make the quickstart use external templates and see if the tests still pass.
SO, just changing the app.component.ts to use a template causes this output:
```
INFO Connected on socket /#PDR-eoB9CARiud_SAAAA with id 85453384
WARN [web-server]: 404: /base/systemjs.config.extras.js
LOG: 'Warning: System.import could not load the optional "systemjs.config.extras.js". Did you omit it by accident? Continuing without it.'
LOG: 'Warning: System.import could not load the optional "systemjs.config.extras.js". Did you omit it by accident? Continuing without it.'
LOG: Error{originalErr: Error{}}
LOG: Error{originalErr: Error{}}
AppComponent with TCB should instantiate component FAILED
AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents" before your test.
Executed 2 of 3 (1 FAILED) (0 secs / 0.06 secs)
AppComponent with TCB should instantiate component FAILED
Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents    Chrome 53.0.2785 (Mac OS X 10.10.5) AppComponent with TCB should have expected <h1> text FAILED
Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents" before your test.
Executed 3 of 3 (2 FAILED) (0 secs / 0.113 secs)
AppComponent with TCB should have expected <h1> text FAILED
Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents    Chrome 53.0.2785 (Mac OS X 10.10.5): Executed 3 of 3 (2 FAILED) (0.356 secs / 0.113 secs)
```

Despite the warnings, the tests are running.  
Lets try to compile the templates in the spec and see if we can make the failing test pass.
It goes something like this:
1. $ npm install karma-ng-html2js-preprocessor --save-dev
2. in the karma.conf.js file:
```
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-htmlfile-reporter'),
      require('karma-ng-html2js-preprocessor')
    ],
```
3. TestBed.compileComponents().catch(error => console.error('compile components err',error));

After those steps, there is this error:
```
Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents" before your test.
```
Put the line outside the before each function
[1] Chrome 53.0.2785 (Mac OS X 10.10.5) LOG: Error{originalErr: Error{}}
[1]
[1] Chrome 53.0.2785 (Mac OS X 10.10.5) LOG: Error{originalErr: Error{}}
    Chrome 53.0.2785 (Mac OS X 10.10.5) AppComponent with TCB encountered a declaration exception FAILED
[1]     Error: Cannot call Promise.then from within a sync test.

The testing chapter has this example:
```
// asynch beforeEach
beforeEach( async(() => {
  TestBed.configureTestingModule({
    declarations: [ DashboardHeroComponent ],
  })
  .compileComponents(); // compile template and css
}));
```

So it is chaining the compile call.
And notice it’s an async function now.
There are some important notes regarding compileComponents throughout the tutorial.
1. WebPack developers need not call compileComponents because it inlines templates and css as part of the automated build process that precedes running the test.
2. Do not configure the TestBed after calling compileComponents. Make compileComponents the last step before calling TestBed.createComponent to instantiate the component-under-test.

No comment.  Anyhow, after using the async test bed setup, there is this error:
AppComponent with TCB encountered a declaration exception FAILED
[1] ReferenceError: async is not defined

Searching for that error message on Google was a huge waste of time.
In frustration I tried this:
import { async }      from '@angular/core/testing';
And then all the tests passed!
Lets see if we can use what we learned from the clean quickstart tests to apply it here to Heroes2.
Nope.  That error is still a show stopper, so we never even get to the tests.

Looking at the karma.conf and test-shim files again.
The quick start has these in the config.set section:
```
     require('karma-jasmine-html-reporter'), // click "Debug" in browser to see it
      require('karma-htmlfile-reporter'), // crashing w/ strange socket error
```
That's an odd comment for a final release.
In the our Heroes2 project, we have this:
```
      require('karma-chrome-launcher'),
      require('karma-htmlfile-reporter'),
```

Trying that out of the box causes this showstopper:
```
[1] 29 09 2016 09:06:53.442:ERROR [config]: Error in config file!
[1]  { [Error: Cannot find module 'karma-jasmine-html-reporter'] code: 'MODULE_NOT_FOUND' }
```

Another difference is in the ```files: [``` section.
We use this:
```
      {pattern: 'node_modules/systemjs/dist/system.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false},
```
The quickstart uses this:
```
      {pattern: 'systemjs.config.js', included: false, watched: false},
      {pattern: 'systemjs.config.extras.js', included: false, watched: false},
```
So changing the patern to load the sysmtejs.config.js from the root directory gives us a new output from the test run:
```
INFO [Chrome 53.0.2785 (Mac OS X 10.10.5)]: Connected on socket /#zCaOvt_4u1slTj0UAAAA with id 21569874
[web-server]: 404: /base/systemjs.config.extras.js
LOG: 'WARNING: System.import could not load "systemjs.config.extras.js"; continuing without it.'
LOG: Error{originalErr: Error{}}
Executed 0 of 0 ERROR (0.027 secs / 0 secs)
```

Do we really need systemjs.config.extras.js?  It doesn't seem to be included even in the quickstarter.
Also, why is -karma-test-shim.js not included in a {pattern: ''} object?
Trying this:
```
      {pattern: 'systemjs.config.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false},
      {pattern: 'karma-test-shim.js', included: false, watched: false},
```
Causes only this output:
```
Chrome 53.0.2785 (Mac OS X 10.10.5): Executed 0 of 0 ERROR (0.007 secs / 0 secs)
```
Not much to go on there.

So looked at all the config files again.
karma-test-shim.js
```
var builtPath = '/base/app/';
...
baseURL: '/base',
```
IN karma.conf.js:
```
      {pattern: 'systemjs.config.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system.js', included: false, watched: false},
      {pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: false, watched: false},
      'karma-test-shim.js',
```

The output now is more promising:
```
WARN [web-server]: 404: /base/systemjs.config.extras.js
LOG: 'WARNING: System.import could not load "systemjs.config.extras.js"; continuing without it.'
LOG: Error{originalErr: Error{}}
Executed 0 of 2 SUCCESS (0 secs / 0 secs)
    HeroesComponent with TCB encountered a declaration exception FAILED
Failed: Uncaught (in promise): Failed to load app/heroes.component.html
Error: Uncaught (in promise): Failed to load app/heroes.component.html
Error: Cannot call Promise.then from within a sync test.
Executed 2 of 2 (1 FAILED) (0.083 secs / 0.073 secs)
```

I thought there were three tests?
There are three tests.  Not sure what was up with that.
Anyhow, the single spec file for the project so far was based on the heroes.component.ts file.
Since refactoring that file in the [Tour of Heroes: Routing](#tour-of-heroes-routing) section into an app.component.ts file, this test has not been updated.
Changed the HeroesComponent to AppComponent in all occurances and now we have another strange error:
```
LOG: Error{originalErr: Error{}}
Executed 0 of 3 SUCCESS (0 secs / 0 secs)
Missing error handler on `socket`.
TypeError: Cannot set property '33504108' of null
     at createHtmlResults (/Users/tim/angular/ng2/heroes2/node_modules/karma-htmlfile-reporter/index.js:57:32)
     ...
```
Doing a Google search for ```Missing error handler on socket``` reveals [this discussion](https://github.com/karma-runner/karma/issues/1969):
```
traceur-runtime.js, or rather, the lack of it. 
For some bizarre reason, without the traceur-runtime.js in the mix PhantomJS blows up badly while trying to run Angular2 unit tests.
...
Make sure all the sources that are needed for your application (in my case Angular2) are in that array. 
Just as you would add them to index.html```

It seems like loading the sources for tests is handled by this:
```
      // transpiled application & spec code paths loaded via module imports
      {pattern: appBase + '**/*.js', included: false, watched: true},
      {pattern: testBase + '**/*.js', included: false, watched: true},
```

Currently, the errors are:
```
Executed 1 of 3 SUCCESS (0 secs / 0.004 secs)
[web-server]: 404: /base/app/app.component.html
AppComponent with TCB should instantiate component FAILED
Failed: Uncaught (in promise): Failed to load /app/app.component.html
Error: Uncaught (in promise): Failed to load /app/app.component.html
    at resolvePromise (node_modules/zone.js/dist/zone.js:418:31)
```




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


## <a name="webpack">Webpack</a>
This is an alternative to the SystemJS approach used throughout the tutorial.
It has been chosen to replace SystemJS in the Angular CLI project, so getting used to it with Angular2 is the idea here.
We will add a new config file for it.
webpack.config.js
If you look at systemjs.config.js, you can see that everything needed is added there manually.
Webpack will inspects webpack.config.js and traverses files listed there for their import dependencies recursively.
It sees that we're importing @angular/core so it adds that to its dependency list for (potential) inclusion in the bundle. It opens @angular/core and follows its network of import statements until it has build the complete dependency graph from app.ts down.
Then it outputs these files to the app.js bundle file designated in configuration:
separate our volatile application app code from comparatively stable vendor code modules.

webpack.config.js (two entries)
```
entry: {
  app: 'src/app.ts',
  vendor: 'src/vendor.ts'
},
output: {
  filename: '[name].js'
}
```

We have an app.component.ts file, but no vendor.ts file.  That file would looks something like this:
```
// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/http';
import '@angular/router';
// RxJS
import 'rxjs';
// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
```

We have to tell Webpack to configure loaders for TypeScript and CSS and other non Javascript files.

Official Angular Webpack [introduction](https://angular.io/docs/ts/latest/guide/webpack.html)

These files  are the basics of the setup.
```
package.json 
typings.json 
tsconfig.json 
webpack.config.js 
karma.conf.js 
config/helpers.js
```
In the config directory, define separate configurations for development, production, and test environments in a separate file called webpack.common.js.
This is a JavaScript commonjs module file that begins with require statements
The standard polyfills are required to run Angular 2 applications in most modern browsers.
Load Zone.js early, immediately after the other ES6 and metadata shims.

Using the files from the end of the starter tutorial, this is some of what is output while running this command:
```
$ npm start
> angular2-webpack@1.0.0 start /Users/tim/angular/ng2/webpack-ng2
> webpack-dev-server --inline --progress --port 8080
 70% 3/3 build modules http://localhost:8080/
webpack result is served from http://localhost:8080/
content is served from /Users/tim/angular/ng2/webpack-ng2
404s will fallback to /index.html
 54% 6/8 build modulests-loader: Using typescript@1.8.10 and /Users/tim/angular/ng2/webpack-ng2/tsconfig.json
chunk    {0} app.js (app) 40 bytes {2} [rendered]
chunk    {1} polyfills.js (polyfills) 218 kB [rendered]
chunk    {2} vendor.js (vendor) 40 bytes {1} [rendered]
ERROR in /Users/tim/angular/ng2/webpack-ng2/node_modules/rxjs/operator/toPromise.d.ts
(7,59): error TS2304: Cannot find name 'Promise'.
...
ERROR in /Users/tim/angular/ng2/webpack-ng2/node_modules/@angular/platform-browser/src/dom/dom_adapter.d.ts
(97,42): error TS2304: Cannot find name 'Map'.
...
ERROR in /Users/tim/angular/ng2/webpack-ng2/node_modules/@angular/core/src/facade/collection.d.ts
(2,25): error TS2304: Cannot find name 'MapConstructor'.
...
ERROR in /Users/tim/angular/ng2/webpack-ng2/node_modules/@angular/core/src/facade/collection.d.ts
(103,25): error TS2304: Cannot find name 'Set'.
ERROR in /Users/tim/angular/ng2/webpack-ng2/node_modules/@angular/core/src/linker/system_js_ng_module_factory_loader.d.ts
(28,25): error TS2304: Cannot find name 'Promise'.
...
ERROR in multi polyfills
Module not found: Error: Cannot resolve 'file' or 'directory' ./src/polyfills.ts in /Users/tim/angular/ng2/webpack-ng2
 @ multi polyfills
ERROR in multi vendor
Module not found: Error: Cannot resolve 'file' or 'directory' ./src/vendor.ts in /Users/tim/angular/ng2/webpack-ng2
 @ multi vendor
Child html-webpack-plugin for "index.html":
    chunk    {0} index.html 20 bytes [rendered]
webpack: bundle is now VALID.
```

Going to localhost:8080 reveals a number of errors in the console:
```
polyfills.js:102 Uncaught Error: Cannot find module "./src/polyfills.ts"
vendor.js:6 Uncaught Error: Cannot find module "./src/vendor.ts"
client?cd17:46 [WDS] Errors while compiling.
client?cd17:48 /Users/tim/angular/ng2/webpack-ng2/node_modules/rxjs/operator/toPromise.d.ts
(7,59): error TS2304: Cannot find name 'Promise'.
...
client?cd17:48/Users/tim/angular/ng2/webpack-ng2/src/app/polyfills.ts
(9,3): error TS2304: Cannot find name 'require'.errors @ client?cd17:48
client?cd17:48multi polyfills
Module not found: Error: Cannot resolve 'file' or 'directory' ./src/polyfills.ts in /Users/tim/angular/ng2/webpack-ng2
resolve file
  /Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts doesn't exist
  /Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.ts doesn't exist
  /Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.js doesn't exist
  /Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.css doesn't exist
  /Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.html doesn't exist
resolve directory
  /Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts doesn't exist (directory default file)
  /Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts/package.json doesn't exist (directory description file)
[/Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts]
[/Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.ts]
[/Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.js]
[/Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.css]
[/Users/tim/angular/ng2/webpack-ng2/src/polyfills.ts.html]
 @ multi polyfillserrors @ client?cd17:48
client?cd17:48multi vendor
Module not found: Error: Cannot resolve 'file' or 'directory' ./src/vendor.ts in /Users/tim/angular/ng2/webpack-ng2
resolve file
  /Users/tim/angular/ng2/webpack-ng2/src/vendor.ts doesn't exist
  /Users/tim/angular/ng2/webpack-ng2/src/vendor.ts.js doesn't exist
  /Users/tim/angular/ng2/webpack-ng2/src/vendor.ts.ts doesn't exist
  /Users/t
```

Running git add . takes forever and this kind of message fills the console:
```
warning: CRLF will be replaced by LF in node_modules/karma/node_modules/expand-braces/node_modules/braces/node_modules/expand-range/node_modules/repeat-string/.npmignore.
The file will have its original line endings in your working directory.
```

Regarding this error:
```
error TS2304: Cannot find name 'Promise'.
```
Someone had a similar problem from beta 7.  

Make sure you have a reference to angular typings in your app's entry point.

See: https://github.com/ericmdantas/angular2-typescript-todo/blob/master/index.ts#L1

StackOverflow [says this](http://stackoverflow.com/questions/33332394/angular-2-typescript-cant-find-names):
    Core reason: the .d.ts file implicitly included by TypeScript varies with the compile target, so one needs to have more ambient declarations when targeting es5 even if things are actually present in the runtimes (e.g. chrome). More on lib.d.ts
There is no solution to the answer, only what is causing the problem.

This is an old issue that went away and came back again.
Here is the [Angular Github issue](https://github.com/angular/angular/issues/4902)
It involves this script, which is already in our package.json.
"scripts": {
    "postinstall": "typings install"
}
So looking at another [SO Q/A(http://stackoverflow.com/questions/35660498/angular-2-cant-find-promise-map-set-and-iterator)]:
UPDATE: USING ANGULAR RC4 or RC5 WITH TYPESCRIPT 2.0.0
To get this to work with typescript 2.0.0, I did the following.
```
npm install --save-dev @types/core-js
```

This didn't help.  Giving up on Webpack for now until Angular provides an official demo that works.


## <a name="deploying-to-heroku">Deploying to Heroku</a>

For Heroku, we serve the app with NodeJS.  This will also provide an API to get and save data for the app later.
Heroku is easy to set up.  You create an account, download the tool belt, add the remote and push to the server.
However, with Angular2, it was not so easy.  Had the following error when trying to deploy.
```
remote:        sh: 1: typings: not found
remote:        npm ERR! Linux 3.13.0-93-generic
remote:        npm ERR! argv "/tmp/build_248acdd4c019d67d7106e34460406ddd/.heroku/node/bin/node" "/tmp/build_248acdd4c019d67d7106e34460406ddd/.heroku/node/bin/npm" "install" "--unsafe-perm" "--userconfig" "/tmp/build_248acdd4c019d67d7106e34460406ddd/.npmrc"
remote:        npm ERR! node v5.11.1
remote:        npm ERR! npm  v3.8.6
...
remote: -----> Build failed
remote:        We're sorry this build is failing! You can troubleshoot common issues here:
remote:        https://devcenter.heroku.com/articles/troubleshooting-node-deploys
remote:        Some possible problems:
remote:        - Node version not specified in package.json
remote:        https://devcenter.heroku.com/articles/nodejs-support#specifying-a-node-js-version
remote:        Love,
remote:        Heroku
remote:  !     Push rejected, failed to compile Node.js app.
remote:  !     Push failed
remote: Verifying deploy...
remote: 
remote: !	Push rejected to myra-the-ferryboat.
remote: 
To https://git.heroku.com/myra-the-ferryboat.git
 ! [remote rejected] master -> master (pre-receive hook declined)
error: failed to push some refs to 'https://git.heroku.com/myra-the-ferryboat.git'
```

This is the same error the angular2-webpack-starter had.

Some fixes call for removing the postinstall in the package.json file:
```
    "postinstall": "typings install",
```

This deploys without an error, but the page is broken with similar errors in the heroku logs:
```
2016-09-11T01:49:01.928261+00:00 app[web.1]: sh: 1: tsc: not found
2016-09-11T01:49:01.939402+00:00 app[web.1]: npm ERR! Linux 3.13.0-93-generic
2016-09-11T01:49:01.939703+00:00 app[web.1]: npm ERR! argv "/app/.heroku/node/bin/node" "/app/.heroku/node/bin/npm" "start"
2016-09-11T01:49:01.939883+00:00 app[web.1]: npm ERR! node v5.11.1
2016-09-11T01:49:01.940262+00:00 app[web.1]: npm ERR! npm  v3.8.6
2016-09-11T01:49:01.940488+00:00 app[web.1]: npm ERR! file sh
2016-09-11T01:49:01.940634+00:00 app[web.1]: npm ERR! code ELIFECYCLE
2016-09-11T01:49:01.940774+00:00 app[web.1]: npm ERR! errno ENOENT
2016-09-11T01:49:01.940917+00:00 app[web.1]: npm ERR! syscall spawn
2016-09-11T01:49:01.941187+00:00 app[web.1]: npm ERR! spawn ENOENT
2016-09-11T01:49:01.941040+00:00 app[web.1]: npm ERR! angular2-quickstart@1.0.0 start: `tsc && concurrently "tsc -w" "lite-server" `
2016-09-11T01:49:01.941425+00:00 app[web.1]: npm ERR! Failed at the angular2-quickstart@1.0.0 start script 'tsc && concurrently "tsc -w" "lite-server" '.
2016-09-11T01:49:01.941558+00:00 app[web.1]: npm ERR! Make sure you have the latest version of node.js and npm installed.
2016-09-11T01:49:01.941802+00:00 app[web.1]: npm ERR! If you do, this is most likely a problem with the angular2-quickstart package,
2016-09-11T01:49:01.941942+00:00 app[web.1]: npm ERR! not with npm itself.
2016-09-11T01:49:01.942376+00:00 app[web.1]: npm ERR! Tell the author that this fails on your system:
2016-09-11T01:49:01.942474+00:00 app[web.1]: npm ERR!     tsc && concurrently "tsc -w" "lite-server" 
2016-09-11T01:49:01.942687+00:00 app[web.1]: npm ERR!     npm bugs angular2-quickstart
2016-09-11T01:49:01.942584+00:00 app[web.1]: npm ERR! You can get information on how to open an issue for this project with:
2016-09-11T01:49:01.942790+00:00 app[web.1]: npm ERR! Or if that isn't available, you can get their info via:
2016-09-11T01:49:01.943010+00:00 app[web.1]: npm ERR! There is likely additional logging output above.
2016-09-11T01:49:01.942895+00:00 app[web.1]: npm ERR!     npm owner ls angular2-quickstart
2016-09-11T01:49:01.946377+00:00 app[web.1]: npm ERR! Please include the following file with any support request:
2016-09-11T01:49:01.946485+00:00 app[web.1]: npm ERR!     /app/npm-debug.log
2016-09-11T01:49:02.033017+00:00 heroku[web.1]: State changed from starting to crashed
2016-09-11T01:49:47.651741+00:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=myra-the-ferryboat.herokuapp.com request_id=74c04f02-88b5-464b-a053-da73a395c221 fwd="115.69.35.53" dyno= connect= service= status=503 bytes=
```

Some advice from S.O.:Change the start field in package.json from
```
"start": "tsc && concurrently \"npm run tsc:w\" \"npm run lite\" "
```
to
```
"start": "concurrently \"npm run tsc:w\" \"npm run lite\" "
```

Worth a try, although our current start script is this:
```
"start": "tsc && concurrently \"tsc -w\" \"lite-server\" ",
```

However, the error in the logs is still the same:
```
npm ERR! Failed at the angular2-quickstart@1.0.0 start script 'concurrently "npm run tsc:w" "npm run lite" '.
```

Tried a basic version:
```
"start": "node server.js"
```
This is how we do it locally, however, the logs on Heroku say this:
```
2016-09-11T06:09:59.426976+00:00 app[web.1]: Error: Cannot find module '/app/server.js'
```

Why is it looking in the app directory?  This is how we have done it before.

And this:
```
node ../server.js
```
With the result:
```
Error: Cannot find module '/server.js'
```

And this: Run both commands in 2 separate cmds:
-in the first one run npm run tsc:w
-in the second one npm run lite
```
"start": "tsc && npm run tsc:w | npm run lite",
```

Gives the same error:
```
sh: 1: tsc: not found
```

Trying a Procfile:
```
web: node server.js
```
However, this, along with the original script causes the deploy error.
So removed the post install again:
```
"postinstall": "typings install",
```
Then the deploy works but the server crashes and we get the now familiar message in the logs:
```
Error: Cannot find module '/app/server.js'
```

Try renaming the file index.js.  This is the default apparently on Heroku.
Then, realizing that git status was ignoring the server.js file because there was actually this like in the .gitignore file:
```
*.js
```
Why was that there?  Anyhow, now there is a new error (thank goddess for small miracles):
```
Error: Cannot find module 'express'
```
So move that from dev dependencies to just dependencies, and now the app appears to hang and then eventually crashes on Heroku.
The logs you might ask?
```
2016-09-11T06:50:21.177537+00:00 app[web.1]: Node app is running on port 8080
2016-09-11T06:50:36.125422+00:00 heroku[router]: at=error code=H20 desc="App boot timeout" method=GET path="/" host=myra-the-ferryboat.herokuapp.com request_id=d8eafe9a-f183-49da-a299-d6703f6edbb0 fwd="115.69.35.53" dyno= connect= service= status=503 bytes=
2016-09-11T06:51:19.752934+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
```
Apparently we shouldn't be using port 8080.  So try 3000...
But same error:
```
2016-09-11T06:50:21.177537+00:00 app[web.1]: Node app is running on port 8080
2016-09-11T06:50:36.125422+00:00 heroku[router]: at=error code=H20 desc="App boot timeout" method=GET path="/" host=myra-the-ferryboat.herokuapp.com request_id=d8eafe9a-f183-49da-a299-d6703f6edbb0 fwd="115.69.35.53" dyno= connect= service= status=503 bytes=
2016-09-11T06:51:19.752934+00:00 heroku[web.1]: Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60 seconds of launch
2016-09-11T06:51:19.752993+00:00 heroku[web.1]: Stopping process with SIGKILL
```
Why is it trying port 8080 when we changed it to 3000?
Did the changes not get pushed?  Yer they did.
```
app.set('port', (process.env.PORT || 3000));
```
So the process environment port must be 8080.  Oh.  Doh!

```
app.set('port', (process.env.PORT || 3000));
app.listen(app.get('port'),function () {
	console.log('Node app is running on port 8080');
});
```
Wasn't using the port in the listen function!
So along with removing the postinstall in the package.json, creating the server.js file and configuring it correctly is the answer.


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



## <a name="original-angular-2-quickstart-source">Original Angular 2 QuickStart Source</a>
[![Build Status][travis-badge]][travis-badge-url]

This repository holds the TypeScript source code of the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html),
the foundation for most of the documentation samples and potentially a good starting point for your application.

It's been extended with testing support so you can start writing tests immediately.

**This is not the perfect arrangement for your application. It is not designed for production.
It exists primarily to get you started quickly with learning and prototyping in Angular 2**

We are unlikely to accept suggestions about how to grow this QuickStart into something it is not.
Please keep that in mind before posting issues and PRs.

## <a name="prerequisites">Prerequisites</a>

Node.js and npm are essential to Angular 2 development. 
    
<a href="https://docs.npmjs.com/getting-started/installing-node" target="_blank" title="Installing Node.js and updating npm">
Get it now</a> if it's not already installed on your machine.
 
**Verify that you are running at least node `v4.x.x` and npm `3.x.x`**
by running `node -v` and `npm -v` in a terminal/console window.
Older versions produce errors.

We recommend [nvm](https://github.com/creationix/nvm) for managing multiple versions of node and npm.

## Create a new project based on the QuickStart

Clone this repo into new project folder (e.g., `my-proj`).
```bash
git clone  https://github.com/angular/quickstart  my-proj
cd my-proj
```

We have no intention of updating the source on `angular/quickstart`.
Discard everything "git-like" by deleting the `.git` folder.
```bash
rm -rf .git  # non-Windows
rd .git /S/Q # windows
```

## Install npm packages

> See npm and nvm version notes above

Install the npm packages described in the `package.json` and verify that it works:

**Attention Windows Developers:  You must run all of these commands in administrator mode**.

```bash
npm install
npm start
```

> If the `typings` folder doesn't show up after `npm install` please install them manually with:

> `npm run typings -- install`

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with Ctrl-C.

You're ready to write your application.

### <a name="npm-scripts">npm scripts</a>

We've captured many of the most useful commands in npm scripts defined in the `package.json`:

* `npm start` - runs the compiler and a server at the same time, both in "watch mode".
* `npm run tsc` - runs the TypeScript compiler once.
* `npm run tsc:w` - runs the TypeScript compiler in watch mode; the process keeps running, awaiting changes to TypeScript files and re-compiling when it sees them.
* `npm run lite` - runs the [lite-server](https://www.npmjs.com/package/lite-server), a light-weight, static file server, written and maintained by
[John Papa](https://github.com/johnpapa) and
[Christopher Martin](https://github.com/cgmartin)
with excellent support for Angular apps that use routing.
* `npm run typings` - runs the typings tool.
* `npm run postinstall` - called by *npm* automatically *after* it successfully completes package installation. This script installs the TypeScript definition files this app requires.
Here are the test related scripts:
* `npm test` - compiles, runs and watches the karma unit tests
* `npm run e2e` - run protractor e2e tests, written in JavaScript (*e2e-spec.js)

## Testing

The QuickStart documentation doesn't discuss testing.
This repo adds both karma/jasmine unit test and protractor end-to-end testing support.

These tools are configured for specific conventions described below.

*It is unwise and rarely possible to run the application, the unit tests, and the e2e tests at the same time.
We recommend that you shut down one before starting another.*

### Unit Tests
TypeScript unit-tests are usually in the `app` folder. Their filenames must end in `.spec`.

Look for the example `app/app.component.spec.ts`.
Add more `.spec.ts` files as you wish; we configured karma to find them.

Run it with `npm test`

That command first compiles the application, then simultaneously re-compiles and runs the karma test-runner.
Both the compiler and the karma watch for (different) file changes.

Shut it down manually with Ctrl-C.

Test-runner output appears in the terminal window.
We can update our app and our tests in real-time, keeping a weather eye on the console for broken tests.
Karma is occasionally confused and it is often necessary to shut down its browser or even shut the command down (Ctrl-C) and
restart it. No worries; it's pretty quick.

The `HTML-Reporter` is also wired in. That produces a prettier output; look for it in `~_test-output/tests.html`.

### End-to-end (E2E) Tests

E2E tests are in the `e2e` directory, side by side with the `app` folder.
Their filenames must end in `.e2e-spec.ts`.

Look for the example `e2e/app.e2e-spec.ts`.
Add more `.e2e-spec.js` files as you wish (although one usually suffices for small projects);
we configured protractor to find them.

Thereafter, run them with `npm run e2e`.

That command first compiles, then simultaneously starts the Http-Server at `localhost:8080`
and launches protractor.  

The pass/fail test results appear at the bottom of the terminal window.
A custom reporter (see `protractor.config.js`) generates a  `./_test-output/protractor-results.txt` file
which is easier to read; this file is excluded from source control.

Shut it down manually with Ctrl-C.

[travis-badge]: https://travis-ci.org/angular/quickstart.svg?branch=master
[travis-badge-url]: https://travis-ci.org/angular/quickstart
