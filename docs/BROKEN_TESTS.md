1. [Tests broken](#tests-broken-after-separate-components-step) 


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

So something is still not right.
Would love to ask for help on StackOverflow at this point, but since we got the quickstart vanilla example working, we know it's something in our code, not a problem with Angular2.
 
Putting the template back inline to see if the test passes cuases an interesting error:
```
AppComponent with TCB should instantiate component FAILED
	'router-outlet' is not a known element:
 	1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
 	2. If 'router-outlet' is a Web Component then add "CUSTOM_ELEMENTS_SCHEMA" to the '@NgModule.schema' of this component to suppress this message. ("
```
Maybe we are not configuring the component correctly?

gaurav2887: I resolved this by importing RouterModule in spec file.
@eamell: That didn't work for me (using 2.0.0). What worked for me was importing RouterTestingModule instead.

Those comments didn't help at all.

Solution was to pipe build.js.test result through gulp-inline-ng2-template with the following parameters:

{
  useRelativePaths: false,
};


That is used in:
gulp-inline-ng2-template 
But we are using:
karma-ng-html2js-preprocessor

After messing around, trying to get the original settings back, now, this error:
```
Error: Timeout - Async callback was not invoked within timeout specified by jasmine.DEFAULT_TIMEOUT_INTERVAL.
```

That was because I changed the 

This is probably a configuration issue with [the karma-ng-html2js-preprocessor lib](https://github.com/karma-runner/karma-ng-html2js-preprocessor).
Or kama.conf.js, karma-test-shim.js or systemjs.config.js.
Or something else.
Starting off with fresh files for karma, the first error:
```
[1] 02 10 2016 07:57:47.702:ERROR [config]: Error in config file!
[1]  { [Error: Cannot find module 'karma-jasmine-html-reporter'] code: 'MODULE_NOT_FOUND' }
```
No install that, actually copy the line in the package.json file and run npm i.
Next error:
```
[1] 	'router-outlet' is not a known element:
[1] 	1. If 'router-outlet' is an Angular component, then verify that it is part of this module.
```
We didn't really have a solution for that.  If I recall, I just rolled back the config changes.
Not this time.

One answer [here](http://stackoverflow.com/questions/34317044/angular2-exception-cant-bind-to-routerlink-since-it-isnt-a-known-native-pro)
```
>=RC.5
import the RouterModule See also https://angular.io/docs/ts/latest/guide/router.html
@NgModule({ 
  imports: [RouterModule],
  ...
})
```
It's not clear where to import that.  Of course we followed that tutorial.
That covers the app.router.ts, which off course imports that.
So should that be imported into every spec file?
That's an annotation for a class, so has no place in the spec file.
How does the vanila quickstart run?
So following [this advice](https://github.com/mraible/ng2-demo)
```
import { RouterTestingModule } from '@angular/router/testing';
```
Anyhow, that doesn't work.  The same error appears.

```
Brandon @brandonroberts 9월 16 12:28
@MrHus you need the RouterTestingModule.withRoutes([]) in your TestBed imports
```
Docs for the routing testing module show this:
beforeEach(() => {
  TestBed.configureTestModule({
    modules: [
      RouterTestingModule.withRoutes(
        [{path: '', component: BlankCmp}, {path: 'simple', component: SimpleCmp}])]
      )
    ]
  });
});
```
But using this in our test doesn't work.  Red squiggly lines indicate it doesn't match the api.

So next idea is to get rid of the async call made in the testing.
Roll back the config changes to the version we developed that had no warnings.
Get rid of the async call:
```
beforeEach( async(() => {
```

Then the error is this:
```
Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents" before your test.
```

Searching for that again.
[This page](https://github.com/angular/quickstart/issues/200) talks about it.
First recommendation:
```
import { RouterLinkActive } from '@angular/router';
```

That doesn't change anything however.
There is this comment at the end of the closed issue:
```
filipesilva commented 22 days ago
That is not the correct approach, no. We're putting the finishing touches on the testing chapter in www.angular.io which will address such situations.
```
Thanks filipesilva, but those finishing touches didn't work.

[This issue](https://github.com/angular/angular/issues/10727) is still open.
It recommend initializing the test bed.
I tried this:
```
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).initTestEnvironment(
      BrowserDynamicTestingModule,
      platformBrowserDynamicTesting()
    ).compileComponents(); // compile template and css
  });
```

The error, before the usual error, was this:
```
[1] 	Error: Cannot set base providers because it has already been called
[1] 	Error: This test module uses the component AppComponent which is using a "templateUrl", but they were never compiled. Please call "TestBed.compileComponents" before your test.
```
Remeber the warnings about the order the test bed was used in the testing chapter?
But this issue is to "Provide a mock service using TestBed", so is not the appropriate place to complain about this problem.

Removing the extras that the script is always complaining about I see this:
```
function initTestBed(){
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ])
```
Maybe that's the init method talked about above?
Not the same thing, but maybe that's where we could try and import the router testing functionality.
Or we could just move that router out into another component for testing purposes?
