# heroes2

The official Angular2 Tour of Heros for rc-6 using TypeScript.

## Current work

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
In that sense readonly makes better sense for class members and that is supported :


Completed [toh-pt1](https://angular.io/docs/ts/latest/tutorial/toh-pt1.html) step.
Will jump ahead next and [add Webpack](https://angular.io/docs/ts/latest/guide/webpack.html) to replace SystemJS.


## Webpack
This is an alternative to the SystemJS approach used throughout the tutorial.
It has been chosen to replace SystemJS in the Angular CLI project, so getting used to it with Angular2 is the idea here.
We will add a new config file for it.
webpack.config.js
If you look at systemjs.config.js, you can see that everything needed is added there manually.
Webpack will inspects webpack.config.js and traverses files listed there for their import dependencies recursively.
It sees that we're importing @angular/core so it adds that to its dependency list for (potential) inclusion in the bundle. It opens @angular/core and follows its network of import statements until it has build the complete dependency graph from app.ts down.
Then it outputs these files to the app.js bundle file designated in configuration:
separate our volatile application app code from comparatively stable vendor code modules.


## Setup
Following the section beolow in the original Angular 2 Quickstart, with the following exception:
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



# Original Angular 2 QuickStart Source
[![Build Status][travis-badge]][travis-badge-url]

This repository holds the TypeScript source code of the [angular.io quickstart](https://angular.io/docs/ts/latest/quickstart.html),
the foundation for most of the documentation samples and potentially a good starting point for your application.

It's been extended with testing support so you can start writing tests immediately.

**This is not the perfect arrangement for your application. It is not designed for production.
It exists primarily to get you started quickly with learning and prototyping in Angular 2**

We are unlikely to accept suggestions about how to grow this QuickStart into something it is not.
Please keep that in mind before posting issues and PRs.

## Prerequisites

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

### Create a new git repo
You could [start writing code](#start-development) now and throw it all away when you're done.
If you'd rather preserve your work under source control, consider taking the following steps.

Initialize this project as a *local git repo* and make the first commit:
```bash
git init
git add .
git commit -m "Initial commit"
```

Create a *remote repository* for this project on the service of your choice.

Grab its address (e.g. *`https://github.com/<my-org>/my-proj.git`*) and push the *local repo* to the *remote*.
```bash
git remote add origin <repo-address>
git push -u origin master
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

### npm scripts

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
