TOC

1. [Setup](#setup)
2. Using VSCode

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
