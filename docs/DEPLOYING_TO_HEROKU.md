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
