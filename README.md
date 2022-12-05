# Getting started
## How to link to local version on w3ui
Given the latest w3ui is not released yet, in order to run the latest version an approach is to link it to a local version of the library

* Clone w3ui
* `git checkout next`
* `> npm i`
* `> npm run compile`
* `npm run build`
* For every package that needs installing:
    * `cd package/_the_package_name`
    * `npm link`
    * Not sure if this is needed but I had to do it to solve a problem with 2 version of react bening imported `rm node_modules`
* Not sure if this is needed but I had to do it to solve a problem with 2 version of react bening imported, cd root,  `rm node_modules` 
* `npm link package_name1 package2 ...`

## Local development
Install the required dependencies 
```npm i```

and then you can run the local server with

```
npm start
```
