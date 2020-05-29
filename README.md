# bookmark-renderer

## About
A startup welcome kiosk for **Windows 10**. ( *not cross platform* )

> It is basically just a bulky taskbar and markdown viewer. File paths and apps are based on the Win10 file system and application suite.

## Install
```js
npm install     // install dependences
npm build       // build as a .exe and make desktop and startup shorcut links
```

## Electron features:

* File Explorer
* Markdown Reader
* Launch shell scripts (```.bat```, ```.ps1```)
* Launch ```.exe``` apps
* Web bookmarks

## Npm Dependencies

* NodeJS [download]( https://nodejs.org )
    * Work around for: *"npm does not support Node.js vXX.XX.X"* ```npm install npm@latest -g```
* Electron [download]( https://www.electronjs.org/ )
    * "electron": "^8.2.5" | ```win10```
* marked [download]( https://www.npmjs.com/package/marked )
    * ""marked": "^1.1.0" | ```markdown to html```
* electron-packager [download]( https://www.npmjs.com/package/electron-packager )
    * "electron-packager": "^14.2.1" | ```package as .exe```


---

## CSS

* [github-markdown-css]( https://github.com/sindresorhus/github-markdown-css )
* [w3.css](https://www.w3schools.com/w3css/w3css_color_themes.asp)
