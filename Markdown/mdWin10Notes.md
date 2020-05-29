# Win10 Notes

> under construction

## Desktop Window Manager Settings

* Remove shadows and animations
    * ```Control Panel\System and Security\System``` --> Advanced system settings --> System Properties --> Performance Settings

## Text Editors

### VS Code

* [documentation](https://code.visualstudio.com/docs/editor/command-line)

#### VS Code Plugins

|Spell Checking|Syntax highlighting|Color themes|WLS|
|:---:|:---:|:---:|:---:|
|[Spell Right](https://marketplace.visualstudio.com/items?itemName=ban.spellright)|[.c](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools)|[nineties](https://marketplace.visualstudio.com/items?itemName=jibjack.nineties)|[remote-wsl](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl)|
||[.ps1](https://marketplace.visualstudio.com/items?itemName=ms-vscode.PowerShell)|||
||[.py](https://marketplace.visualstudio.com/items?itemName=ms-python.python)||
||[.js](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)||

#### Column Width Marker

settings.json | File → Preferences → Settings
```json
// Show a vertical lines at column width

"editor.rulers": [80,120] // col 80 and col 120
```

---

### Notepad++ Text Editor

Get Notepad++ Text Editor

* [Download](https://notepad-plus-plus.org/downloads/)

Themes collected from the web

* Install themes by placing ```.xml``` files in the ``` %AppData%\Notepad++\themes``` directory.
* Installer: [install-themes.ps1](https://gist.githubusercontent.com/mezcel/247eda1319b9e1815cad7b955fdcc379/raw/8d57fa174df57edf630797de935fe3e2d5ac6cc8/install-themes.ps1)
