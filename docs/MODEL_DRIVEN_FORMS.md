
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

```
<div ngFor="let event of events">
    <pre> {{ event | json }} </pre>
</div>
">
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


