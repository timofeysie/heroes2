# heroes2

The official Angular2 Tour of Heros for rc-6 using TypeScript.

The site will be available [on Heroku](https://myra-the-ferryboat.herokuapp.com/) as soon as the deployment errors are solved.


## Current work

Completed [part two](https://angular.io/docs/ts/latest/tutorial/toh-pt2.html) of the Angular2 Tour of Heros, titled Master/Detail.
Added NodeJS server in preparation for push to Heroku.
To run the server:
```
$ node server.js
```
There is also a smile route, /myra which will return the json object of app data.

Having problems changing the favicon.ico (see below).

Also changed the content using Myra the ferryboat as our hero.


## Tour of Heros

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


## The favicon.ico

The StackOverflow [#1 answer](http://stackoverflow.com/questions/2208933/how-do-i-force-a-favicon-refresh): 
force browsers to download a new version using the link tag and a querystring on your 
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
he easy way to fix it is close to that of lineofbirds

1. type in www.yoursite.com/favicon.ico
2. push enter
3. ctrl+f5
4. Restart Browser (for IE and Firefox)

However, this is not working.  There is either no icon, or the old Angular icon.
When using Node, there is a Spring leaf icon.


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

Runnging git add . takes forever and this kind of message fills the console:
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
It involes this script, which is already in our package.json.
"scripts": {
    "postinstall": "typings install"
}
So lookging at another [SO Q/A(http://stackoverflow.com/questions/35660498/angular-2-cant-find-promise-map-set-and-iterator)]:
UPDATE: USING ANGULAR RC4 or RC5 WITH TYPESCRIPT 2.0.0
To get this to work with typescript 2.0.0, I did the following.
```
npm install --save-dev @types/core-js
```

This didn't help.  Giving up on Webpack for now until Angular provides an official demo that works.


## Deploying to Heroku

```
remote:        sh: 1: typings: not found
remote:        npm ERR! Linux 3.13.0-93-generic
remote:        npm ERR! argv "/tmp/build_248acdd4c019d67d7106e34460406ddd/.heroku/node/bin/node" "/tmp/build_248acdd4c019d67d7106e34460406ddd/.heroku/node/bin/npm" "install" "--unsafe-perm" "--userconfig" "/tmp/build_248acdd4c019d67d7106e34460406ddd/.npmrc"
remote:        npm ERR! node v5.11.1
remote:        npm ERR! npm  v3.8.6
remote:        npm ERR! file sh
remote:        npm ERR! code ELIFECYCLE
remote:        npm ERR! errno ENOENT
remote:        npm ERR! syscall spawn
remote:        npm ERR! angular2-quickstart@1.0.0 postinstall: `typings install
remote:        npm ERR! spawn ENOENT
remote:        npm ERR! Failed at the angular2-quickstart@1.0.0 postinstall script 'typings install'.
remote:        npm ERR! Make sure you have the latest version of node.js and npm installed.
remote:        npm ERR! If you do, this is most likely a problem with the angular2-quickstart package,
remote:        npm ERR! not with npm itself.
remote:        npm ERR! Tell the author that this fails on your system:
remote:        npm ERR!     typings install
remote:        npm ERR! You can get information on how to open an issue for this project with:
remote:        npm ERR!     npm bugs angular2-quickstart
remote:        npm ERR! Or if that isn't available, you can get their info via:
remote:        npm ERR!     npm owner ls angular2-quickstart
remote:        npm ERR! There is likely additional logging output above.
remote:        npm ERR! Please include the following file with any support request:
remote:        npm ERR!     /tmp/build_248acdd4c019d67d7106e34460406ddd/npm-debug.log
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

This is the same error the the angular2-webpack-starter had.

Some fixes call for removing the postinstall in the package.json file:
```
    "postinstall": "typings install",
```

However, this then deploys without an error, but the page is broken with similar errors in the heroku logs:
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
2016-09-11T01:49:01.941313+00:00 app[web.1]: npm ERR! 
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
This how we do it locally, however, the logs on Heroku say this:
```
2016-09-11T06:09:59.426976+00:00 app[web.1]: Error: Cannot find module '/app/server.js'
2016-09-11T06:09:59.426977+00:00 app[web.1]:     at Function.Module._resolveFilename (module.js:339:15)
2016-09-11T06:09:59.426991+00:00 app[web.1]:     at Function.Module._load (module.js:290:25)
2016-09-11T06:09:59.426992+00:00 app[web.1]:     at Function.Module.runMain (module.js:447:10)
2016-09-11T06:09:59.426993+00:00 app[web.1]:     at startup (node.js:148:18)
2016-09-11T06:09:59.426994+00:00 app[web.1]:     at node.js:405:3
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
Then, realizing that git status was ignoring the server.js file becuase there was actually this like in the .gitignore file:
```
*.js
```
Why was that there?  Anyhow, now there is a new error (thank godess for small miracles):
```
Error: Cannot find module 'express'
```


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

To Deploy to Heroku
```
$ git push heroku master
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
