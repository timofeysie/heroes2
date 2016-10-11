
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

```JavaScript
this.router.navigate(['/detail', this.selectedHero.id]);
```

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
`Which in our case is just this:

```
history.pushState({}, this.hero.name, '/detail/'+newId);
```

And viola, we have pagination.  
It's lacking validation at this point, but we'll deal with that once we know that this particularly implementation is going to stick around.


