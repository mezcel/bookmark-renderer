# bookmark-renderer

## about

a welcome kiosk popup.
* target os: win32
* launches file explorer directories
* runs custom shell scripts (```.bat```, ```.ps1```)
* launches ```.exe``` apps
* open web bookmarks
* markdown reader

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
Remove-Item -Recurse -Force .\bookmark-renderer-win32-x64
electron-packager .
```

> Rebuild an executable package application. [script]( package-electron-app.ps1 )

---

# community themes

* [github-markdown-css]( https://github.com/sindresorhus/github-markdown-css )
* [w3.css](https://www.w3schools.com/w3css/w3css_color_themes.asp)
