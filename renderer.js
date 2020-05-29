/* renderer.js */

// Launch Exe related
const { execFile, spawn } = require( 'child_process' );
const path = require( 'path' );

// Markdown related // dialog for Electron "^8.2.5"
const { getCurrentWindow, dialog, shell } = require( 'electron' ).remote;

/* -------------------------------------------------------------------------- */

function openFileExplorer( dirPath ) {
    var filePath = path.join( __dirname, dirPath );
    console.log( "Opening the " + filePath + " Directory." );
    shell.openItem( filePath );
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

function domIndex() {       // event buttons for view\index.html

    const   btn4 = document.getElementById( 'btn4' ),
            btn5 = document.getElementById( 'btn5' ),
            btn6 = document.getElementById( 'btn6' ),
            btn7 = document.getElementById( 'btn7' );

    if ( btn4 ) {
        btn4.addEventListener( 'click', function () {
            var gistDir = "/gist.github/mezcel";
            openFileExplorer( gistDir );
        });
    }

    if ( btn5 ) {
        btn5.addEventListener( 'click', function () {
            var githubDir = "/github/mezcel";
            openFileExplorer( githubDir );
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
    })
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

    var mdAbout           = "Markdown/mdAbout.md",
        mdCNotes          = "Markdown/mdCNotes.md",
        mdNodeNotes       = "Markdown/mdNodeNotes.md",
        mdPowershellNotes = "Markdown/mdPowershellNotes.md",
        mdGitNotes        = "Markdown/mdGitNotes.md",
        mdPythonNotes     = "Markdown/mdPythonNotes.md",
        mdWslNotes        = "Markdown/mdWslNotes.md",
        mdWin10Notes      = "Markdown/mdWin10Notes.md",
        README            = "README.md";

    var mdPath = path.join( __dirname, README );
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

    document.addEventListener( "keydown", function (e) {
        var keyboardKey = e.which;

        switch( keyboardKey ) {
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
            case 72: // h
            case 66: // b
                history.back();
                break;

            case 39: // Rt Arrow
            case 76: // l
            case 70: // f
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

            case 49: // 1
            case 97:
                document.getElementById( "btn1" ).click();
                break;

            case 50: // 2
            case 98:
                document.getElementById( "btn2" ).click();
                break;

            case 51: // 3
            case 99:
                document.getElementById( "btn3" ).click();
                break;

            case 52: // 4
            case 100:
                document.getElementById( "btn4" ).click();
                break;

            case 53: // 5
            case 101:
                document.getElementById( "btn5" ).click();
                break;

            case 54: // 6
            case 102:
                document.getElementById( "btn6" ).click();
                break;

            case 55: // 7
            case 103:
                document.getElementById( "btn7" ).click();
                break;

            case 56: // 8
            case 104:
                document.getElementById( "btn8" ).click();
                break;

            case 57: // 9
            case 105:
                document.getElementById( "btn9" ).click();
                break;

            case 48: // 0
            case 96:
                document.getElementById( "btn0" ).click();
                break;

            default:
                console.log( keyboardKey );
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

/* -------------------------------------------------------------------------- */

main();

console.log("loaded renderer.js");
