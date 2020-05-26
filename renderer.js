/* renderer.js */

const {
    shell,
    BrowserWindow } = require( 'electron' );

// Launch Exe related
const {
    execFile,
    spawn,
    exec } = require( 'child_process' );
const util = require( 'util' );

// Markdown relates
const {
    getCurrentWindow,
    dialog } = require( 'electron' ).remote; /* dialog for Electron "^8.2.5" */
const fs     = require( 'fs' );
const marked = require( 'marked' );

//////////////////////////////////////////////

function returnEnvHome() {
    var myOS = process.platform

    if ( myOS = "win32" ) {
        var systemDrive = process.env.systemdrive;
        var home = ( process.env.homepath ).replace( /\\/g, '/' );

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
    const bat = spawn( 'cmd.exe', [ '/c', scriptPath ]);

    bat.stdout.on( 'data', ( data ) => {
        console.log(
            data.toString()
        );
    });

    bat.stderr.on( 'data', ( data ) => {
        console.log(
            "\n script path = " + scriptPath + " \n",
            data.toString()
        );
    });

    bat.on( 'exit', ( code ) => {
        console.log( `Child exited with code ${code}` );
    });
}

function returnPackageDir( processCwd ) {
    //var processCwd = process.cwd();

    var parentDir = "";
    var appDir = processCwd.split( '\\' ).pop();
    var isRelativeMatch = /bookmark-renderer-/.test(appDir);

    if ( isRelativeMatch ) {
        parentDir = process.cwd() + "\\resources\\app\\";
    }

    return parentDir;
}

function domIndex() {       // event buttons for view\index.html

    const btnGistDir   = document.getElementById( 'btnGistDir' );
    const btnGithubDir = document.getElementById( 'btnGithubDir' );
    const btnVSCode    = document.getElementById( 'btnVSCode' );
    const btnWT        = document.getElementById( 'btnWT' );

    const gistDir   = "/gist.github/mezcel";
    const githubDir = "/github/mezcel";

    if ( btnGistDir ) {
        btnGistDir.addEventListener( 'click', function () {
            openFileExplorer( gistDir );
        });
    }

    if ( btnGithubDir ) {
        btnGithubDir.addEventListener( 'click', function () {
            openFileExplorer( githubDir );
        });
    }

    if ( btnVSCode ) {/* Launch VS Code */

        btnVSCode.addEventListener( 'click', function () {
            var parentDir = returnPackageDir( process.cwd() );
            var scriptPath = parentDir + "Batch\\launchVSCode.bat"
            launchBatScript( scriptPath );
        });
    }

    if ( btnWT ) { /* launch Windows Terminal */

        btnWT.addEventListener( 'click', function () {
            var parentDir = returnPackageDir( process.cwd() );
            var scriptPath = parentDir + "Batch\\launchWT.bat"
            launchBatScript( scriptPath );
        });
    }
}

function domScripts() {     // event buttons for view\html\scripts.html

    const btnScript0 = document.getElementById( 'btnScript0' );
    const btnScript1 = document.getElementById( 'btnScript1' );
    const btnScript2 = document.getElementById( 'btnScript2' );
    const btnScript3 = document.getElementById( 'btnScript3' );
    const btnScript4 = document.getElementById( 'btnScript4' );
    const btnScript5 = document.getElementById( 'btnScript5' );
    const btnScript6 = document.getElementById( 'btnScript6' );
    const btnScript7 = document.getElementById( 'btnScript7' );
    const btnScript8 = document.getElementById( 'btnScript8' );

    var parentDir   = returnPackageDir( process.cwd() );

    var scriptPath0 = parentDir + "Batch\\launchTaskManager.bat";
    var scriptPath1 = parentDir + "Batch\\pullGithubRepos.bat";
    var scriptPath2 = parentDir + "";

    var scriptPath3 = parentDir + "Batch\\electron-rosary.bat";
    var scriptPath4 = parentDir + "";
    var scriptPath5 = parentDir + "";

    var scriptPath6 = parentDir + "Batch\\connmanScript.bat";
    var scriptPath7 = parentDir + "Batch\\killProcessesScript.bat";
    var scriptPath8 = parentDir + "Batch\\shutdownScript.bat";

    if ( btnScript0 ) {
        btnScript0.addEventListener( 'click', function () {
            launchBatScript( scriptPath0 );
        });
    }

    if ( btnScript1 ) {
        btnScript1.addEventListener( 'click', function () {
            launchBatScript( scriptPath1 );
        });
    }

    if ( btnScript2 ) {
        btnScript2.addEventListener( 'click', function () {
            launchBatScript( scriptPath2 );
        });
    }

    if ( btnScript3 ) {
        btnScript3.addEventListener( 'click', function () {
            launchBatScript( scriptPath3 );
        });
    }

    if ( btnScript4 ) {
        btnScript4.addEventListener( 'click', function () {
            launchBatScript( scriptPath4 );
        });
    }

    if ( btnScript5 ) {
        btnScript5.addEventListener( 'click', function () {
            launchBatScript( scriptPath5 );
        });
    }

    if ( btnScript6 ) {
        btnScript6.addEventListener( 'click', function () {
            launchBatScript( scriptPath6 );
        });
    }

    if ( btnScript7 ) {
        btnScript7.addEventListener( 'click', function () {
            //alert( "Killing processes. The log Console, (F11), will be toggled after pressing OK" );
            console.clear();
            console.log( "\n:::::::::::::::::\nKill status\n:::::::::::::::::\n" );

            // Display Dev Tools in order to read the console log
            //require( 'electron' ).remote.getCurrentWindow().toggleDevTools();

            launchBatScript( scriptPath7 );
            alert( "Killed processes. Check the log Console, (F12), to view kill status." );
        });
    }

    if ( btnScript8 ) {
        btnScript8.addEventListener( 'click', function () {
            launchBatScript( scriptPath8 );
        });
    }

}

function domBookmarks() {   // open web links in a non-electron browser
    let shell = require( 'electron' ).shell;

    document.addEventListener( 'click', function ( event ) {
        if ( event.target.tagName === 'A' && event.target.href.startsWith( 'http' )) {
            event.preventDefault();
            shell.openExternal(event.target.href);
        }
    })
}

function markdownWindowSize() {
    require( 'electron' ).remote.getCurrentWindow().setSize( 1020, 700 );
    require( 'electron' ).remote.getCurrentWindow().center();
}

function domMarkdown() {    // event buttons for view\html\notes.html

    const btn0 = document.getElementById( 'btn0' );
    const btn1 = document.getElementById( 'btn1' );
    const btn2 = document.getElementById( 'btn2' );
    const btn3 = document.getElementById( 'btn3' );
    const btn4 = document.getElementById( 'btn4' );
    const btn5 = document.getElementById( 'btn5' );
    const btnWidth = document.getElementById( 'btnWidth' );
    const btnTop = document.getElementById( 'btnTop' );

    var parentDir = returnPackageDir( process.cwd() );

    var mdAbout           = parentDir + "Markdown/mdAbout.md";
    var mdCNotes          = parentDir + "Markdown/mdCNotes.md";
    var mdNodeNotes       = parentDir + "Markdown/mdNodeNotes.md";
    var mdPowershellNotes = parentDir + "Markdown/mdPowershellNotes.md";
    var mdGitNotes        = parentDir + "Markdown/mdGitNotes.md";
    var mdPythonNotes     = parentDir + "Markdown/mdPythonNotes.md";
    var mdWslNotes        = parentDir + "Markdown/mdWslNotes.md";
    var mdWin10Notes      = parentDir + "Markdown/mdWin10Notes.md";
    var README            = parentDir + "README.md";

    var mdFile            = fs.readFileSync( mdAbout );
    document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );

    if ( btnWidth ) {

        btnWidth.addEventListener( 'click', function () {
            markdownWindowSize();
        });
    }
    if ( btnTop ) {

        btnTop.addEventListener( 'click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if ( btn0 ) {

        btn0.addEventListener( 'click', function () {
            const filters = { filters: [{ name: 'Markdown', extensions: ['md', 'markdown'], properties: ['openFile'] }] }

            dialog.showOpenDialog( filters ).then( result => {
                var mdFile = fs.readFileSync( result.filePaths[0] );
                document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
            }).catch( err => {
                console.log( "err", err )
            });
        });
    }

    if ( btn1 ) {
        btn1.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdPowershellNotes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn2 ) {
        btn2.addEventListener('click', function () {
            var mdFile = fs.readFileSync( mdGitNotes );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn3 ) {
        btn3.addEventListener('click', function () {
            var mdFile = fs.readFileSync( README );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn4 ) {
        btn4.addEventListener('click', function () {
            var mdFile = fs.readFileSync( README );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn5 ) {
        btn5.addEventListener('click', function () {
            var mdFile = fs.readFileSync( README );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });

    }
}

function customKeybindings() {
    document.addEventListener( "keydown", function (e) {

        switch( e.which ) {
            case 123: // F12
                console.log( e.which, "toggle dev tools" );
                require( 'electron' ).remote.getCurrentWindow().toggleDevTools();
                break;
            case 122: // F11
                console.log( e.which, "toggle fullscreen" );
                var isFullScreen = require( 'electron' ).remote.getCurrentWindow().isFullScreen();
                require( 'electron' ).remote.getCurrentWindow().setFullScreen(!isFullScreen);
                break;
            case 116: // F5
                console.log( e.which, "reload browser" );
                location.reload();
                break;
            case 37: // Lt Arrow
                history.back();
                break;
            case 39: // Rt Arrow
                history.forward();
                break;
            case 27: // ESC
            case 81: // q
            case 88: // x
                require( 'electron' ).remote.getCurrentWindow().close(); // closes DOM
                break;
            case 71: // g
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 32: // spacebar
                markdownWindowSize();
                break;
            default:
                console.log( e.which );
        }

    });

}

function main() {

    const btnClose      = document.getElementById( 'btnClose' );
    const htmlIndex     = document.getElementById( 'htmlIndex' );
    const htmlScripts   = document.getElementById( 'htmlScripts' );
    const htmlMarkdown  = document.getElementById( 'htmlMarkdown' );
    const htmlBookmarks = document.getElementById( 'htmlBookmarks' );

    if ( btnClose ) {
        btnClose.addEventListener('click', function () {
            require( 'electron' ).remote.getCurrentWindow().close(); // closes DOM
        });
    }

    if ( htmlIndex ) {
        domIndex();         // event buttons for view\index.html
    }

    if ( htmlScripts ) {
        domScripts();       // event buttons for view\html\scripts.html
    }

    if ( htmlMarkdown ) {
        getCurrentWindow().center();

        domMarkdown();      // event buttons for view\html\notes.html
        domBookmarks();     // open web links in a non-electron browser
    }

    if ( htmlBookmarks ) {
        domBookmarks();     // event buttons for view\html\bookmarks.html
    }

    customKeybindings();    // DOM Key bindings

}

//////////////////////////

main();

console.log("loaded renderer.js");
