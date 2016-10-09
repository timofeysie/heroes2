## <a name="fixing-the-drive-forms">Fixing the data driven forms</a>

After using the sample code from the [dynamic forms](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html) tutorial in the Heroes 2 app,
out of the box, the app is broken with these errors in the console:
```
http://localhost:3000/styles.css Failed to load resource: net::ERR_FAILED
http://localhost:3000/node_modules/core-js/client/shim.min.js Failed to load resource: net::ERR_FAILED
http://localhost:3000/node_modules/zone.js/dist/zone.js Failed to load resource: net::ERR_FAILED
http://localhost:3000/node_modules/reflect-metadata/Reflect.js Failed to load resource: net::ERR_FAILED
http://localhost:3000/node_modules/systemjs/dist/system.src.js Failed to load resource: net::ERR_FAILED
http://localhost:3000/systemjs.config.js Failed to load resource: net::ERR_FAILED
localhost/:20 Uncaught ReferenceError: System is not defined
http://localhost:3000/browser-sync/browser-sync-client.2.15.0.js Failed to load resource: net::ERR_FAILED
service-worker.js:1 A bad HTTP response code (404) was received when fetching the script.
service-worker.js:1 GET http://localhost:3000/service-worker.js net::ERR_INVALID_RESPONSE
```

Since new modules were added, wasn't sure if running npm install is necessary.
After doing npm i, the errors are different:
```
The FetchEvent for "http://localhost:3000/app/main.js" resulted in a network error response: 
    an object that was not a Response was passed to respondWith().
http://localhost:3000/app/main.js Failed to load resource: net::ERR_FAILED
localhost/:20 Error: Error: XHR error loading http://localhost:3000/app/main.js(…)
The FetchEvent for "http://localhost:3000/browser-sync/socket.io/?EIO=3&transport=polling&t=LUOhlU4"
...
```
Googling
```FetchEvent for browser-sync/socket.io resulted in a network error response: an object that was not a Response was passed to respondWith()```
resulted in this gem:
```
tl;dr
socket: {
    domain: "localhost:3000"
}
```

Actually, I can't even find that message again.
No other relevant results come up with that search.
Anyhow, it's a browser sync problem, not something I did with the forms?
But how to try and modify that socket?  That was for a different framework, that gem.
And a search for browser-sync reveals nothing else in the project.
Maybe we did break main.ts?

No, it's not main.ts.
How about AppModule?

We are including all the proper inports:
```
import { BrowserModule }                from '@angular/platform-browser';
import { ReactiveFormsModule }          from '@angular/forms';
import { NgModule }                     from '@angular/core';
import { AppComponent }                 from './app.component';
import { DynamicFormComponent }         from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, DynamicFormComponent, DynamicFormQuestionComponent ],
  bootstrap: [ AppComponent ]
})
```
Not in the correct order.  So moved AppComponent above the form imports.
Same errors.

Preparing to ask for help, commited and pushed to Heroku to see if the same error happens live.
It doesn't.
Here are some of the errors from the live site:
```
core.umd.js:3462 EXCEPTION: Error in ./AppComponent class AppComponent_Host - 
inline template:0:0 caused by: No provider for QuestionService!
core.umd.js:3464 ORIGINAL EXCEPTION: No provider for QuestionService!
core.umd.js:3467 ORIGINAL STACKTRACE:
core.umd.js:3468 Error: No provider for QuestionService!
    at NoProviderError.Error (native)
    at NoProviderError.BaseError [as constructor] 
```

Looks like we forgot this:
```
@Component({
  providers: [QuestionService]
```

 But including the question provider causes this error:
 ```
 zone.js:344 Unhandled Promise rejection: Failed to load 
 app/app.component.html ; Zone: <root> ; Task: 
 Promise.then ; Value: 
 Failed to load app/app.component.html undefined
 ```

Removing the form selector reveals another more telling error:
```
Can't bind to 'formGroup' since it isn't a known property of 'form'.
```
That's easier to find answers for.
But [this answer](http://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form) just says import the reactive forms module, which we are already doing.
Ah, we also need to export those?
```
exports: [
        FormsModule,
        ReactiveFormsModule
]
```

But we're not out of the woods yet.
May I present to you Angular's next top error:
```
zone.js:344 Unhandled Promise rejection: 
Template parse errors:
Can't bind to 'formGroup' since it isn't a known property of 'form'. ("<div>
  <form (ngSubmit)="onSubmit()" [ERROR ->][formGroup]="form">
```
Actually that's the same error as before.

[This answer](http://stackoverflow.com/questions/35939950/angular-2-cant-bind-to-x-since-it-isnt-a-known-native-property)
recommends using:
```
try using [(ngModel)] rather than *NgModel and *ngIf instead of *NgIf
```
But our case is formGroup, not one of those.
An simply wrapping the formGroup in () does nothing to fix the situation.

[This answer](http://stackoverflow.com/questions/39777751/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form-angular-2-f)
shows how to use a shared module.
Is that really necessary for this?
The sample is working without a shared module.

The dynamic-form.component.html is the template, and 
dynamic-form-question.component.ts must be where the problem is.
This class is exactly like it is in the sample, where it works.

Shouldn't we also import these?
```
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
```

Doesn't help.

Do we also need this in the app.modules.ts?
```
import { FormGroup }        from '@angular/forms';
```
No.  Doesn't help.

Do we need to have all these in the app.module.ts?
```
import { FormGroup }           from '@angular/forms';
import { FormsModule }         from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
...
@NgModule({
  imports: [
    FormGroup
    FormsModule,
    ReactiveFormsModule,
```    

The plunker only has ReactiveFormsModule, 
and including those above and running the app again (the watch is failing due to the error?) has no effect on the error.

Need to learn more about modules in general to clear up this at least.
The official docs say:
    
    exports - the subset of declarations that should be visible and usable in the component templates of other modules.
    imports - other modules whose exported classes are needed by component templates declared in this module.

So based on that, we should need this:
```
exports: [ ReactiveFormsModule ]
```
But this does not appear in the plunker, and, it doesn't solve our problem.
So get rid of it.  

Let's say we get rid off all the form stuff in app.component.ts, the error will not go away.
So that may not be where the problem lies.
Say we want the form to appear in a different part of the application (we do).
How would that work?

Currently we have this:
```
<router-outlet></router-outlet>
<dynamic-form [questions]="questions"></dynamic-form>
```
That might be the problem, a conflict between the router outlet and the dynamic form.

If we get rid of the dynamic form directive (is it still called a directive?) and the app still crashes with the same error. 
(updte: A component is a directive-with-a-template)

So is it worth eventrying to move the form somewhere?

The root cause is a Template parse error.

If the app can't bind to 'formGroup' then we should look in the
dynamic-form-question.component.ts

The setup in the plunker of this class is pretty simple:
```
import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './question-base';
@Component({
  moduleId: module.id,
  selector: 'df-question',
  templateUrl: 'dynamic-form-question.component.html'
})
```

The error says formGroup isn't a known property of 'form'. ("<div>
  <form (ngSubmit)="onSubmit()" [ERROR ->][formGroup]="form">
```

So let's look at the docs for formGroup and find out how to make it a known property.

Reading a bit about [Angular 2 architecture](https://angular.io/docs/ts/latest/guide/architecture.html):
1. You install Angular libraries with npm.
2. There are two unrelated module systems at work: Javascript and Angular
3. JavaScript import statements: import { x } from '@angular/x';
4, Angular import statements: @NgModule { imports: [ x ] }

If this seems confusing, listen to the words of wisdom from the above page:

    confusion yields to clarity with time and experience - Angular team

    The @Component configuration option 'providers' is array of dependency injection providers for 
services that the component requires to tell Angular that the component's constructor requires a service.

So why isn't the QuestionService needed in the app.module providers array?
It is included in the app.components.ts file.
But putting it in the app.module.ts file does not help.

In the Dependency injection section of the architecture document, it says:
    
    Register providers in modules or in components.  
    In general, add providers to the root module so that the same instance of a service is available everywhere.

That's all good and nice, but for kicks we uploaded the app to Heroku to see if the error was still the same, and the app works fine.
The error in the template was obviously cached.
If I put the dynamic-form [questions]="questions"></dynamic-form> back in the app.component.ts and do a refresh, the error comes back.
Comment it out again, do a hard refresh, and the app works again.

The hero search directive is in the dashboard.component.html.
But in that controller (sorry for the old terms, directive, controller, but it is Angular after all...)
there is no import of that functionality.
```
  <hero-search></hero-search>
  <dynamic-form [questions]="questions"></dynamic-form>
```
That import is in the app.module.ts.
So if we move all the question form setup to the app.module.ts, what will happen?
Well the good news is the app is not totally broken anymore, it's partially broken now.
The bad news is the partially broken error of course:
```
The FetchEvent for "http://localhost:3000/browser-sync/socket.io/?EIO=3&transport=polling&t=LUYiojI" 
resulted in a network error response: an object that was not a Response was passed to respondWith().
heroes.component.ts:34 hero.component constructed
core.umd.js:3462 EXCEPTION: Uncaught (in promise): Error: 
Error in http://localhost:3000/app/heroes.component.html:5:16 caused by: 
Cannot read property 'forEach' of undefined
```

Oh and the form is not there as it's broken.

There are still some lessons to be learned about Angular 2 here.
If we want to have a lot of forms on a site, then where do we import them.
Where do we set up the variables they will used?

Wherever you want the questions to go, you must:
```
import { QuestionService } from './question.service';
@Component({
    providers: [HeroService,QuestionService],
})
export class Wherever { 
  questions: any[];
  constructor(service: QuestionService) {
    this.questions = service.getQuestions();
  }
}
```

Still getting problems without doing hard cache busting reloads.
With browser sync, after changes, the broken app is loaded.
Doing a hard refresh brings up the new code.

But, yay! We have the form working!  Time to party!
Maybe not a party, but still what a relief to have a working app since Thusday night.  
It's now Satruday.
