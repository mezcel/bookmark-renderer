/* renderer.js */

const { shell, BrowserWindow } = require('electron');

// Launch Exe related
const { execFile, spawn, exec } = require('child_process');
const util = require('util');

// Markdown relates
const fs = require('fs');
const marked = require('marked');

//////////////////////////////////////////////

function returnEnvHome() {
    var myOS = process.platform

    if ( myOS = "win32" ) {
        var systemDrive = process.env.systemdrive;
        var home = (process.env.homepath).replace(/\\/g, '/');

        homeDir = "file:///" + systemDrive + home
    }

    return homeDir
}

function openFileExplorer( dirPath ) {
    var filePath = returnEnvHome() + dirPath
    console.log( "Opening the " + filePath + " Directory." );
    shell.openItem( filePath );
}

function launchBatScript( scriptPath ) {
    const bat = spawn('cmd.exe', ['/c', scriptPath ]);

    bat.stdout.on('data', (data) => {
        console.log(
            data.toString()
        );
    });

    bat.stderr.on('data', (data) => {
        console.log(
            "\n script path = "+scriptPath+" \n",
            data.toString()
        );
    });

    bat.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
}

function returnPackageDir( processCwd ) {
    //var processCwd = process.cwd();

    var parentDir = "";
    var appDir = processCwd.split('\\').pop();
    var isRelativeMatch = /bookmark-renderer-/.test(appDir);

    /*if ( appDir == "bookmark-renderer-win32-x64" ) {*/
    if ( isRelativeMatch ) {
        parentDir = process.cwd() + "\\resources\\app\\";
    }

    return parentDir;
}

function domIndex() {   // event buttons for view\index.html

    const btnGistDir   = document.getElementById('btnGistDir');
    const btnGithubDir = document.getElementById('btnGithubDir');
    const btnVSCode    = document.getElementById('btnVSCode');
    const btnWT        = document.getElementById('btnWT');

    if ( btnGistDir ) {
        btnGistDir.addEventListener('click', function () {
            openFileExplorer("/gist.github/mezcel");
        });
    }

    if ( btnGithubDir ) {
        btnGithubDir.addEventListener('click', function () {
            openFileExplorer("/github/mezcel");
        });
    }

    if ( btnVSCode ) {/* Launch VS Code */

        btnVSCode.addEventListener('click', function () {
            var parentDir = returnPackageDir( process.cwd() );
            var scriptPath = parentDir + "batch\\launchVSCode.bat"
            launchBatScript( scriptPath );
        });
    }

    if ( btnWT ) { /* launch Windows Terminal */

        btnWT.addEventListener('click', function () {
            var parentDir = returnPackageDir( process.cwd() );
            var scriptPath = parentDir + "batch\\launchWT.bat"
            launchBatScript( scriptPath );
        });
    }
}

function domScripts() { // event buttons for view\html\scripts.html

    const btnScript0 = document.getElementById('btnScript0');
    const btnScript1 = document.getElementById('btnScript1');
    const btnScript2 = document.getElementById('btnScript2');
    const btnScript3 = document.getElementById('btnScript3');
    const btnScript4 = document.getElementById('btnScript4');
    const btnScript5 = document.getElementById('btnScript5');
    const btnScript6 = document.getElementById('btnScript6');
    const btnScript7 = document.getElementById('btnScript7');
    const btnScript8 = document.getElementById('btnScript8');

    var parentDir = returnPackageDir( process.cwd() );

    var scriptPath0 = parentDir + "batch\\launchTaskManager.bat";
    var scriptPath1 = parentDir + "batch\\pullGithubRepos.bat";
    var scriptPath2 = parentDir + "";

    var scriptPath3 = parentDir + "";
    var scriptPath4 = parentDir + "";
    var scriptPath5 = parentDir + "";

    var scriptPath6 = parentDir + "batch\\connmanScript.bat";
    var scriptPath7 = parentDir + "batch\\killProcessesScript.bat";
    var scriptPath8 = parentDir + "batch\\shutdownScript.bat";

    if ( btnScript0 ) {
        btnScript0.addEventListener('click', function () {
            launchBatScript( scriptPath0 );
        });
    }

    if ( btnScript1 ) {
        btnScript1.addEventListener('click', function () {
            launchBatScript( scriptPath1 );
        });
    }

    if ( btnScript2 ) {
        btnScript2.addEventListener('click', function () {
            launchBatScript( scriptPath2 );
        });
    }

    if ( btnScript3 ) {
        btnScript3.addEventListener('click', function () {
            launchBatScript( scriptPath3 );
        });
    }

    if ( btnScript4 ) {
        btnScript4.addEventListener('click', function () {
            launchBatScript( scriptPath4 );
        });
    }

    if ( btnScript5 ) {
        btnScript5.addEventListener('click', function () {
            launchBatScript( scriptPath5 );
        });
    }

    if ( btnScript6 ) {
        btnScript6.addEventListener('click', function () {
            launchBatScript( scriptPath6 );
        });
    }

    if ( btnScript7 ) {
        btnScript7.addEventListener('click', function () {
            alert("Killing processes. The log Console, (F11), will be toggled after pressing OK");
            console.clear();
            console.log("\n:::::::::::::::::\nKill status\n:::::::::::::::::\n");

            require('electron').remote.getCurrentWindow().toggleDevTools();

            launchBatScript( scriptPath7 );
        });
    }

    if ( btnScript8 ) {
        btnScript8.addEventListener('click', function () {
            launchBatScript( scriptPath8 );
        });
    }

}

function domBookmarks() {  // open web links in a non-electron browser

    let shell = require('electron').shell
    document.addEventListener('click', function (event) {
        if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
            event.preventDefault()
            shell.openExternal(event.target.href)
        }
    })

}

function domNotes() {   // event buttons for view\html\notes.html

    const btnWin10Notes      = document.getElementById('btnWin10Notes');
    const btnPowershellNotes = document.getElementById('btnPowershellNotes');
    const btnPythonNotes     = document.getElementById('btnPythonNotes');
    const btnNodeNotes       = document.getElementById('btnNodeNotes');
    const btnCNotes          = document.getElementById('btnCNotes');
    const btnWslNotes        = document.getElementById('btnWslNotes');

    var parentDir = returnPackageDir( process.cwd() );

    var mdAbout           = parentDir + "Markdown/mdAbout.md";
    var mdCNotes          = parentDir + "Markdown/mdCNotes.md";
    var mdNodeNotes       = parentDir + "Markdown/mdNodeNotes.md";
    var mdPowershellNotes = parentDir + "Markdown/mdPowershellNotes.md";
    var mdPythonNotes     = parentDir + "Markdown/mdPythonNotes.md";
    var mdWslNotes        = parentDir + "Markdown/mdWslNotes.md";
    var mdWin10Notes      = parentDir + "Markdown/mdWin10Notes.md";

    var mdFile            = fs.readFileSync( mdAbout );
    document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );

    if ( btnWin10Notes ) {
        btnWin10Notes.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdWin10Notes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btnPowershellNotes ) {
        btnPowershellNotes.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdPowershellNotes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btnPythonNotes ) {
        btnPythonNotes.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdPythonNotes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btnNodeNotes ) {
        btnNodeNotes.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdNodeNotes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btnCNotes ) {
        btnCNotes.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdCNotes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btnWslNotes ) {
        btnWslNotes.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdWslNotes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    domBookmarks(); // open web links in a non-electron browser

}

function customKeybindings() {
    document.addEventListener( "keydown", function (e) {

        switch( e.which ) {
            case 122: // F11
                console.log(e.which, "toggle dev tools");
                require('electron').remote.getCurrentWindow().toggleDevTools();
                break;
            case 116: // F5
                console.log(e.which, "reload dom");
                location.reload();
                break;
            default:
                console.log(e.which);
        }

    });

}

function main() {

    const btnClose    = document.getElementById('btnClose');
    const htmlIndex   = document.getElementById('htmlIndex');
    const htmlScripts = document.getElementById('htmlScripts');
    const htmlNotes   = document.getElementById('htmlNotes');
    const htmlBookmarks   = document.getElementById('htmlBookmarks');

    if ( btnClose ) {
        btnClose.addEventListener('click', function () {
            window.close(); // closes DOM
        });
    }

    if ( htmlIndex ) {
        domIndex();     // event buttons for view\index.html
    }

    if ( htmlScripts ) {
        domScripts();   // event buttons for view\html\scripts.html
    }

    if ( htmlNotes ) {
        domNotes();     // event buttons for view\html\notes.html
    }

    if ( htmlBookmarks ) {
        domBookmarks();     // event buttons for view\html\bookmarks.html
    }

    customKeybindings(); // DOM Keybindings

}

//////////////////////////

main();

console.log("loaded renderer.js");
