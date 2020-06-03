/* renderer.js */

// Launch Exe related
const { execFile, spawn } = require( 'child_process' );
const path = require( 'path' );
//const url = require( 'url' );

// Markdown related // dialog for Electron "^8.2.5"
const { getCurrentWindow, dialog, shell } = require( 'electron' ).remote;

/* -------------------------------------------------------------------------- */

function openFileExplorer( dirPath ) {
    var UserProfile = process.env.USERPROFILE;
    var filePath = path.join( UserProfile, dirPath );
    console.log( "Opening the " + filePath + " Directory." );
    shell.openItem( filePath );
}

function openFileManager( dirPath ) {
    var UserProfile = process.env.HOME;
    var filePath = path.join( UserProfile, dirPath );

    console.log( "Opening the " + filePath + " Directory." );
    shell.openPath( filePath );
}

function launchBatScript( scriptPath ) {
    const bat = spawn( 'cmd.exe', [ '/c', scriptPath ]);

    bat.stdout.on( 'data', ( data ) => {
        console.log( data.toString() );
    });

    bat.stderr.on( 'data', ( data ) => {
        console.log( "\n script path = " + scriptPath + " \n", data.toString() );
    });

    bat.on( 'exit', ( code ) => {
        console.log( `Child exited with code ${code}` );
    });
}

function colorTheme( cssTheme ) {
    // Dynamically change css theme

    var cssFile = "view/css/" + cssTheme;
    var href    = path.join( __dirname, cssFile );
    var w3Theme = document.getElementById("w3Theme");

    if ( w3Theme ) {
        if ( w3Theme.href !== href ) {
            w3Theme.href = href;
        }
    }

    require('electron').remote.getGlobal('GlobalVars').css = cssTheme;
}

function updateFavicon( faviconPath ) {
    var isWin32 = require('electron').remote.getGlobal('GlobalVars').isWin32;
    if ( isWin32 ) {
        getCurrentWindow().setIcon( faviconPath );
    }
}

function keyboardElemIdClick( elementID, consoleNotes ) {
    // keypress decoration
    // simulate a hover event by calling a user defined active style class
    // used only in btnStyle1 - btnStyle6

    var clickedButton = document.getElementById( elementID );

    if ( clickedButton ) {
        clickedButton.classList.add("active");
        clickedButton.click();
        console.log( consoleNotes );
    }
}

function domIndex() {   // event buttons for view\index.html

    const   btn4 = document.getElementById( 'btn4' ),
            btn5 = document.getElementById( 'btn5' ),
            btn6 = document.getElementById( 'btn6' ),
            btn7 = document.getElementById( 'btn7' );

    const   btnStyle1 = document.getElementById( 'btnStyle1' ),
            btnStyle2 = document.getElementById( 'btnStyle2' ),
            btnStyle3 = document.getElementById( 'btnStyle3' ),
            btnStyle4 = document.getElementById( 'btnStyle4' ),
            btnStyle5 = document.getElementById( 'btnStyle5' ),
            btnStyle6 = document.getElementById( 'btnStyle6' ),
            btnStyle7 = document.getElementById( 'btnStyle7' ),
            btnStyle8 = document.getElementById( 'btnStyle8' ),
            btnStyle9 = document.getElementById( 'btnStyle9' );

    if ( btn4 ) {   // explorer gist
        btn4.addEventListener( 'click', function () {

            var gistDir = "gist.github/mezcel/";
            var isWin32 = require('electron').remote.getGlobal('GlobalVars').isWin32;
            if ( isWin32 ) {
                openFileExplorer( gistDir );
            } else {
                gistDir = "/" + gistDir
                openFileManager( gistDir );
            }
        });
    }

    if ( btn5 ) {   // explorer git
        btn5.addEventListener( 'click', function () {
            var githubDir = "github/mezcel/";
            var isWin32 = require('electron').remote.getGlobal('GlobalVars').isWin32;
            if ( isWin32 ) {
                openFileExplorer( githubDir );
            } else {
                gistDir = "/" + githubDir
                openFileManager( githubDir );
            }
        });
    }

    if ( btn6 ) {   // Launch VS Code

        btn6.addEventListener( 'click', function () {
            scriptPath = path.join( __dirname, 'Batch/launchVSCode.bat' );
            launchBatScript( scriptPath );
        });
    }

    if ( btn7 ) {   // launch Windows Terminal

        btn7.addEventListener( 'click', function () {
            scriptPath = path.join( __dirname, 'Batch/launchWT.bat' );
            launchBatScript( scriptPath );
        });
    }

    if ( btnStyle1 ) {   // style 1

        btnStyle1.addEventListener( 'click', function () {
            colorTheme( "w3-theme-blue-grey.css" );
        });
    }

    if ( btnStyle2 ) {   // style 2

        btnStyle2.addEventListener( 'click', function () {
            colorTheme( "w3-theme-brown.css" );
        });
    }

    if ( btnStyle3 ) {   // style 3

        btnStyle3.addEventListener( 'click', function () {
            colorTheme( "w3-theme-black.css" );
        });
    }

    if ( btnStyle4 ) {   // style 4

        btnStyle4.addEventListener( 'click', function () {
            colorTheme( "w3-theme-pink.css" );
        });
    }

    if ( btnStyle5 ) {   // style 5

        btnStyle5.addEventListener( 'click', function () {
            colorTheme( "w3-theme-green.css" );
        });
    }

    if ( btnStyle6 ) {   // style 6

        btnStyle6.addEventListener( 'click', function () {
            colorTheme( "w3-theme-indigo.css" );
        });
    }

    if ( btnStyle7 ) {   // style 6

        btnStyle7.addEventListener( 'click', function () {
            colorTheme( "w3-theme-yellow.css" );
        });
    }

    if ( btnStyle8 ) {   // style 6

        btnStyle8.addEventListener( 'click', function () {
            colorTheme( "w3-theme-purple.css" );
        });
    }

    if ( btnStyle9 ) {   // style 6

        btnStyle9.addEventListener( 'click', function () {
            colorTheme( "w3-theme-orange.css" );
        });
    }

}

function domScripts() { // event buttons for view\html\scripts.html

    const   btn1 = document.getElementById( 'btn1' ),
            btn2 = document.getElementById( 'btn2' ),
            btn3 = document.getElementById( 'btn3' ),
            btn4 = document.getElementById( 'btn4' ),
            btn5 = document.getElementById( 'btn5' ),
            btn6 = document.getElementById( 'btn6' ),
            btn7 = document.getElementById( 'btn7' ),
            btn8 = document.getElementById( 'btn8' ),
            btn9 = document.getElementById( 'btn9' );

    var scriptPath1 = "Batch/launchTaskManager.bat",
        scriptPath2 = "Batch/pullGithubRepos.bat",
        scriptPath3 = "",
        scriptPath4 = "Batch/electron-rosary.bat",
        scriptPath5 = "",
        scriptPath6 = "",
        scriptPath7 = "Batch/connmanScript.bat",
        scriptPath8 = "Batch/killProcessesScript.bat",
        scriptPath9 = "Batch/shutdownScript.bat";

    if ( btn1 ) {
        btn1.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath1 );
            launchBatScript( scriptPath );
        });
    }

    if ( btn2 ) {
        btn2.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath2 );
            launchBatScript( scriptPath );
        });
    }

    if ( btn3 ) {
        btn3.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath3 );
            launchBatScript( scriptPath );
        });
    }

    if ( btn4 ) {
        btn4.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath4 );
            launchBatScript( scriptPath );
        });
    }

    if ( btn5 ) {
        btn5.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath5 );
            launchBatScript( scriptPath4 );
        });
    }

    if ( btn6 ) {
        btn6.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath6 );
            launchBatScript( scriptPath5 );
        });
    }

    if ( btn7 ) {
        btn7.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath7 );
            launchBatScript( scriptPath );
        });
    }

    if ( btn8 ) {
        btn8.addEventListener( 'click', function () {

            console.clear();
            console.log( "\n:::::::::::::::::\nKill status\n:::::::::::::::::\n" );

            var scriptPath = path.join( __dirname, scriptPath8 );
            launchBatScript( scriptPath );
            alert( "Killed processes. Check the log Console, (F12), to view kill status." );
        });
    }

    if ( btn9 ) {
        btn9.addEventListener( 'click', function () {
            var scriptPath = path.join( __dirname, scriptPath9 );
            launchBatScript( scriptPath );
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
    });
}

function markdownWindowSize() {
    require( 'electron' ).remote.getCurrentWindow().setSize( 1020, 700 );
    require( 'electron' ).remote.getCurrentWindow().center();
}

function domMarkdown() {    // event buttons for view\html\notes.html

    const fs     = require( 'fs' );
    const marked = require( 'marked' );

    const btn0     = document.getElementById( 'btn0' );
    const btn1     = document.getElementById( 'btn1' );
    const btn2     = document.getElementById( 'btn2' );
    const btn3     = document.getElementById( 'btn3' );
    const btn4     = document.getElementById( 'btn4' );
    const btn5     = document.getElementById( 'btn5' );
    const btnWidth = document.getElementById( 'btnWidth' );
    const btnTop   = document.getElementById( 'btnTop' );
    const btnBottom   = document.getElementById( 'btnBottom' );

    var mdAbout           = "Markdown/mdAbout.md",
        mdCNotes          = "Markdown/mdCNotes.md",
        mdNodeNotes       = "Markdown/mdNodeNotes.md",
        mdPowershellNotes = "Markdown/mdPowershellNotes.md",
        mdGitNotes        = "Markdown/mdGitNotes.md",
        mdPythonNotes     = "Markdown/mdPythonNotes.md",
        mdWslNotes        = "Markdown/mdWslNotes.md",
        mdWin10Notes      = "Markdown/mdWin10Notes.md",
        README            = "README.md";

    var mdPath = path.join( __dirname, mdAbout );
    var mdFile = fs.readFileSync( mdPath );
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
    if ( btnBottom ) {

        btnBottom.addEventListener( 'click', function () {
            window.scrollTo({ top: 100000, behavior: 'smooth' });
            //window.scrollBy(100, window.innerHeight);
        });
    }

    if ( btn0 ) {

        btn0.addEventListener( 'click', function () {
            const filters = { filters: [{ name: 'Markdown', extensions: ['md', 'markdown'], properties: ['openFile'] }] }

            dialog.showOpenDialog( filters ).then( result => {
                var mdFile = fs.readFileSync( result.filePaths[0] );
                document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );

                btn0.classList.remove( "active" ); // rm hover effect css
            }).catch( err => {
                console.log( "err", err )
            });
        });
    }

    if ( btn1 ) {
        btn1.addEventListener('click', function () {
            var mdPath = path.join( __dirname, mdPowershellNotes );
            var mdFile = fs.readFileSync( mdPath );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn2 ) {
        btn2.addEventListener('click', function () {
            var mdPath = path.join( __dirname, mdGitNotes );
            var mdFile = fs.readFileSync( mdPath );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn3 ) {
        btn3.addEventListener('click', function () {
            var mdPath = path.join( __dirname, README );
            var mdFile = fs.readFileSync( mdPath );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn4 ) {
        btn4.addEventListener('click', function () {
            var mdPath = path.join( __dirname, README );
            var mdFile = fs.readFileSync( mdPath );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });
    }

    if ( btn5 ) {
        btn5.addEventListener('click', function () {
            var mdPath = path.join( __dirname, README );
            var mdFile = fs.readFileSync( mdPath );
            document.getElementById( 'md' ).innerHTML = marked( mdFile.toString() );
        });

    }
}

function customKeybindings() {
    // Keydown
    document.addEventListener( "keydown", function (e) {
        var keyboardKey = e.which;

        switch( keyboardKey ) {
            case 123: // F12
                console.log( keyboardKey, "toggle dev tools" );
                require( 'electron' ).remote.getCurrentWindow().toggleDevTools();
                break;

            case 122: // F11
                console.log( keyboardKey, "toggle fullscreen" );
                var isFullScreen = require( 'electron' ).remote.getCurrentWindow().isFullScreen();
                require( 'electron' ).remote.getCurrentWindow().setFullScreen(!isFullScreen);
                break;

            case 116: // F5
                console.log( keyboardKey, "reload browser" );
                location.reload();
                break;

            case 37: // Lt Arrow
            case 72: // h
            case 66: // b
                keyboardElemIdClick( "btnBack", "nav history back" );
                break;

            case 39: // Rt Arrow
            case 76: // l
                console.log( keyboardKey, "nav history fwd" );
                history.forward();
                break;

            case 65: // a
                keyboardElemIdClick( "btnStyle1", "key:" + keyboardKey + " w3-theme-blue-grey.css" );
                break;

            case 83: // s
                keyboardElemIdClick( "btnStyle2", "key:" + keyboardKey + " w3-theme-brown.css" );
                break;

            case 68: // d
                keyboardElemIdClick( "btnStyle3", "key:" + keyboardKey + " w3-theme-black.css" );
                break;

            case 70: // f
                keyboardElemIdClick( "btnStyle4", "key:" + keyboardKey + " w3-theme-pink.css" );
                break;

            case 71: // g
                keyboardElemIdClick( "btnStyle5", "key:" + keyboardKey + " w3-theme-green.css" );
                break;

            case 90: // z
                keyboardElemIdClick( "btnStyle6", "key:" + keyboardKey + " w3-theme-indigo.css" );
                break;

            case 88: // x
                keyboardElemIdClick( "btnStyle7", "key:" + keyboardKey + " w3-theme-yellow.css" );
                break;

            case 67: // c
                keyboardElemIdClick( "btnStyle8", "key:" + keyboardKey + " w3-theme-purple.css" );
                break;

            case 86: // v
                keyboardElemIdClick( "btnStyle9", "key:" + keyboardKey + " w3-theme-orange.css" );
                break;

            case 27: // ESC
            case 81: // q
                keyboardElemIdClick( "btnClose", "Close Window" );
                break;

            case 75: // k
                keyboardElemIdClick( "btnTop", "Scroll to top" );
                break;

            case 74: // j
                keyboardElemIdClick( "btnBottom", "Scroll to bottom" );
                break;

            case 190: // .
                keyboardElemIdClick( "btnWidth", "Resize to set dimensions" );
                break;

            case 49: // 1
            case 97:
                keyboardElemIdClick( "btn1", "Clicked btn1" );
                break;

            case 50: // 2
            case 98:
                keyboardElemIdClick( "btn2", "Clicked btn2" );
                break;

            case 51: // 3
            case 99:
                keyboardElemIdClick( "btn3", "Clicked btn3" );
                break;

            case 52: // 4
            case 100:
                keyboardElemIdClick( "btn4", "Clicked btn4" );
                break;

            case 53: // 5
            case 101:
                keyboardElemIdClick( "btn5", "Clicked btn5" );
                break;

            case 54: // 6
            case 102:
                keyboardElemIdClick( "btn6", "Clicked btn6" );
                break;

            case 55: // 7
            case 103:
                keyboardElemIdClick( "btn7", "Clicked btn7" );
                break;

            case 56: // 8
            case 104:
                keyboardElemIdClick( "btn8", "Clicked btn8" );
                break;

            case 57: // 9
            case 105:
                keyboardElemIdClick( "btn9", "Clicked btn9" );
                break;

            case 48: // 0
            case 96:
                keyboardElemIdClick( "btn0", "Clicked btn0" );
                break;

            default:
                console.log( "keyboardKey:", keyboardKey );
        }

    });

    // Keyup
    document.addEventListener( "keyup", function (e) {
        // Rem "active" class from keypress simulated hover

        var elemActive = document.getElementsByClassName( "active" );
        for ( var i = 0; i < elemActive.length; i++ ) {
            elemActive[i].classList.remove( "active" );
         }
    });

}

function main() {

    const   btnClose      = document.getElementById( 'btnClose' ),
            htmlIndex     = document.getElementById( 'htmlIndex' ),
            htmlScripts   = document.getElementById( 'htmlScripts' ),
            htmlMarkdown  = document.getElementById( 'htmlMarkdown' ),
            htmlBookmarks = document.getElementById( 'htmlBookmarks' );

    if ( btnClose ) {
        btnClose.addEventListener('click', function () {
            require( 'electron' ).remote.getCurrentWindow().close(); // closes DOM
        });
    }

    if ( htmlIndex ) {
        var faviconPath = "view/img/favicon.ico";
        updateFavicon( faviconPath );

        domIndex();         // event buttons for view\index.html
    }

    if ( htmlScripts ) {
        var faviconPath = "view/img/ps.ico";
        updateFavicon( faviconPath );

        domScripts();       // event buttons for view\html\scripts.html
    }

    if ( htmlMarkdown ) {
        var faviconPath = "view/img/md.ico";
        getCurrentWindow().center();
        updateFavicon( faviconPath );

        domMarkdown();      // event buttons for view\html\notes.html
        domBookmarks();     // open web links in a non-electron browser
    }

    if ( htmlBookmarks ) {
        var faviconPath = "view/img/star.ico";
        updateFavicon( faviconPath );

        domBookmarks();     // event buttons for view\html\bookmarks.html
    }

    customKeybindings();    // DOM Key bindings
}

/* -------------------------------------------------------------------------- */

main();

console.log("loaded renderer.js");
