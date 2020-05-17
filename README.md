# bookmark-renderer

## about

a welcome kiosk popup.
* target os: win32
* launches file explorer directories
* runs custom shell scripts (```.bat```, ```.ps1```)
* launches ```.exe``` apps
* open web bookmarks
* quick access to misc. other dev notes

## electron

* [download nodejs]( https://nodejs.org )

### npm dependencies
```ps1
## download and install electron
npm install electron

# download and install other dependencies
npm install
```

### package app as an executable
```ps1
## launch the app from cli
npm start

## globally install electron-packager
npm install -g electron-packager

## package app as an executable
electron-packager .
```

---

# workarrounds

This Electron App is intended to be packaged with ```electron-packager```. File paths to scripts are mapped locally as if it were packaged.

Alternative script paths
```js
// Change
var packagedRootDir = process.cwd() + "\\resources\\app\\";
// To

var packagedRootDir = process.cwd() + "";
//or
var packagedRootDir = "";
```