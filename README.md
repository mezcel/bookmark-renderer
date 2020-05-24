# bookmark-renderer

## About
A startup welcome kiosk for Win10.

> It is basically just a bulky taskbar and markdown viewer. File paths and apps are based on the Win10 file system and application suite.

Electron features:

* File Explorer
* Markdown Reader
* Launch shell scripts (```.bat```, ```.ps1```)
* Launch ```.exe``` apps
* Web bookmarks

## Npm Dependencies

* NodeJS [download]( https://nodejs.org )
* Electron [download]( https://www.electronjs.org/ )
* marked [download]( https://www.npmjs.com/package/marked )
* electron-packager [download](https://www.npmjs.com/package/electron-packager)

## Install

```ps1
## download and install electron
npm install electron

## download and install other dependencies
npm install

## globally install electron-packager
npm install -g electron-packager
```
## Build

[script]( build-executable-app.ps1 )
```PS1
## Build app into an executable package, make a desktop shortcut, and set it to autostart when the user logs on.

.\build-executable-app.ps1
```

### package app as an executable

* > Rebuild an executable package application. [script]( build-executable-app.ps1 )
    ```ps1
    ## package app as an executable
    electron-packager .
    ```
* > Launch app at startup with shortcuts [script]( build-executable-app.ps1 )
    ```ps1
    Copy-Item -Path "<shortcut-link.lnk>" -Destination "$env:AppData\Microsoft\Windows\Start Menu\Programs\Startup"
    ```

---

# community themes

* [github-markdown-css]( https://github.com/sindresorhus/github-markdown-css )
* [w3.css](https://www.w3schools.com/w3css/w3css_color_themes.asp)
