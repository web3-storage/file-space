# Getting started
## How to link to local version on w3ui
Given the latest w3ui is not released yet, in order to run the latest version an approach is to link it to a local version of the library.

### Clone and build all of the w3ui packages:
* Clone w3ui: https://github.com/web3-storage/w3ui
* `cd w3ui`
* `git checkout next`
* `npm i`
* `npm run compile`
* `npm run build`
* `rm -rf node_modules` (this step prevents multiple react versions)

### Prepare the packages for linking
This will ensure the file-hose repo can discover these linked packages.

File-hose requires @w3ui/react-keyring' and '@w3ui/react-uploader', so the react-keyring and react-uploader packages need to be linked in w3ui.

* Link react-keyring
    * `cd package/react-keyring`
    * `npm link`
    * `rm -rf node_modules` (this step prevents multiple react versions)

* Link react-uploader
    * `cd package/react-uploader`
    * `npm link`
    * `rm -rf node_modules` (this step prevents multiple react versions)

* If any other packages are required, follow the same steps for that package.

This will tell npm to link these packages. Next checkout the file-hose repo. 
* Clone file-hose: https://github.com/web3-storage/file-hose
* `cd file-hose`
* `npm i`
* `npm link @w3ui/react-keyring @w3ui/react-uploader` (this will link to both of the packages we linked earlier in the w3ui repo)
* `npm start`

When running the app, if you notice this error in the console:
```
Warning: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
```
It's due to multiple react versions. To solve this, remove the node_modules in the root, and every linked package in the w3ui repo. ie
* rm -rf node_modules
* rm -rf packages/react-uploader/node_modules
* rm -rf packages/react-keyring/node_modules

## Local development
Install the required dependencies 
```npm i```

and then you can run the local server with

```
npm start
```
