
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

