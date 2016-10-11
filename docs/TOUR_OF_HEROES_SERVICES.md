TOC

1. [The ngOnInit Lifecycle Hook](#The-ngOnInit-Lifecycle-Hook")
2. Errata



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
