# bookmark-renderer

## 1.0 About

A startup welcome kiosk for **Windows 10**. ![icon.png](http://icons.iconarchive.com/icons/igh0zt/ios7-style-metro-ui/32/MetroUI-Folder-OS-Windows-8-icon.png)

> It is basically just a bulky taskbar and markdown viewer. ( *not cross platform* )
>
> Experimental Linux branch: ```git checkout deb64```, ( Non-Sand boxed Debian x64 )

## 2.0 Install

```js
npm install                // install all dependences
npm run buildExe           // just build as a .exe ( for --arch=x64 )

npm run-script buildExe2   // build as a .exe & make desktop shortcut along with a startup link
```

## 3.0 Functional Features:

* ![md.ico](view/img/github.ico) Repo File Explorer / Repo File Manager
* ![md.ico](view/img/md.ico) Markdown Reader
* ![md.ico](view/img/ps.ico) Launch shell scripts (```.bat```, ```.ps1```)
    * Enable powershell scripts for current user
        ```ps1
        Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
        ```
* ![md.ico](view/img/favicon.ico)Launch ```.exe``` apps
* ![md.ico](view/img/star.ico) Web bookmarks
* Taskbar and Tray Menus

## 4.0 Dependencies

### 4.1 Node Packages

| Package | npm | About |
|---|---|---|
|NodeJS|[download]( https://nodejs.org )|Work around for: *"npm does not support Node.js vXX.XX.X"* ```npm install npm@latest -g```|
|Electron|[download]( https://www.electronjs.org/ )|Windows 10|
|marked|[download]( https://www.npmjs.com/package/marked )|markdown to html|
|electron-packager|[download]( https://www.npmjs.com/package/electron-packager )|package electron app as an .exe|

---

### 4.1 CSS Styles

* [github-markdown-css]( https://github.com/sindresorhus/github-markdown-css )
* [w3.css](https://www.w3schools.com/w3css/w3css_color_themes.asp)

## 5.0 Screenshots ( outdated )

* Compressed ```.gif``` rendered [screenshots](screenshots/README.md)
* The latest version has more cosmetic conveniences:
    * more decorative color options
    * taksbar and tray menus
    * decorative favicons
    * more Markdown reader controls

|||
|:---:|:---:|
|![screenshots\group-colors-600x329.gif](screenshots/group-colors-600x329.gif)|![screenshots\bookmarks.gif](screenshots/bookmarks.gif)|
|![screenshots\scripts.gif](screenshots/scripts.gif)|![screenshots\kiosk-md.gif](screenshots/kiosk-md.gif)|
