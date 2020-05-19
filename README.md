# bookmark-renderer

## about

> a welcome kiosk popup for win10

* launch file explorer directories
* run shell scripts (```.bat```, ```.ps1```)
* launch ```.exe``` apps
* open web bookmarks
* markdown reader (github style display)

## npm dependencies

* [download nodejs]( https://nodejs.org )
    ```ps1
    ## download and install electron
    npm install electron

    # download and install other dependencies
    npm install
    ```

### package app as an executable

* > Rebuild an executable package application. [script]( package-electron-app.ps1 )
    ```ps1
    ## launch the app from cli
    npm start

    ## globally install electron-packager
    npm install -g electron-packager

    ## package app as an executable
    Remove-Item -Recurse -Force .\bookmark-renderer-win32-x64
    electron-packager .
    ```
* Launch app at startup
    ```ps1
    Copy-Item -Path "<shortcut-link.lnk>" -Destination "$env:AppData\Microsoft\Windows\Start Menu\Programs\Startup"
    ```

---

# community themes

* [github-markdown-css]( https://github.com/sindresorhus/github-markdown-css )
* [w3.css](https://www.w3schools.com/w3css/w3css_color_themes.asp)
