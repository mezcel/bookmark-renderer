# bookmark-renderer

## About

A startup welcome kiosk for **Windows 10**. ( *not cross platform* )

> It is basically just a bulky taskbar and markdown viewer. File paths and apps are based on the Win10 file system and application suite.

## Install

```js
npm install                // install all dependences
npm run buildExe           // just build as a .exe ( for --arch=x64 )

npm run-script buildExe2   // build as a .exe & make desktop shortcut along with a startup link
```

## App features:

* File Explorer
* Markdown Reader
* Launch shell scripts (```.bat```, ```.ps1```)
    * Enable powershell scripts for current user
    ```ps1
    Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```
* Launch ```.exe``` apps
* Web bookmarks

## Npm Dependencies

| Package | npm | About |
|---|---|---|
|NodeJS|[download]( https://nodejs.org )|Work around for: *"npm does not support Node.js vXX.XX.X"* ```npm install npm@latest -g```|
|Electron|[download]( https://www.electronjs.org/ )|Windows 10|
|marked|[download]( https://www.npmjs.com/package/marked )|markdown to html|
|electron-packager|[download]( https://www.npmjs.com/package/electron-packager )|package electron app as an .exe|

---

## CSS Styles

* [github-markdown-css]( https://github.com/sindresorhus/github-markdown-css )
* [w3.css](https://www.w3schools.com/w3css/w3css_color_themes.asp)

## Screenshots ( outdated )

* Compressed ```.gif``` rendered [screenshots](screenshots/README.md)

|||
|:---:|:---:|
|![screenshots\group-colors-600x329.gif](screenshots/group-colors-600x329.gif)|![screenshots\bookmarks.gif](screenshots/bookmarks.gif)|
|![screenshots\scripts.gif](screenshots/scripts.gif)|![screenshots\kiosk-md.gif](screenshots/kiosk-md.gif)|

---

## OS and Version Workaround

* Things seem to work with electron@^6 up to electron@^9
    * The way images and dialog boxes are rendered have changed over the years within each respective OS.

### Linux Workaround

There are kernel specific permission regarding how Node interfaces with an OS. Therer are also  a lot userspace and (desktop environment/ window manager) settings to take into account with Linux and Electron.

#### Error Msg

> Error Msg:
>
> The SUID sandbox helper binary was found, but is not configured correctly. ... Maks sure that .../chrome-sandbox is owned by root.

#### Linux Workaround

```json
"scripts": {
    "start": "electron . --no-sandbox"
}
```

Thoughts:

I don't care to fix this, since it does not happen on Win10, and IMO the Electron devs only care about MacOS and Win10 over Debian/Archlinux. Also... I live in the bash cli... so this is n/a on my DWM setup.