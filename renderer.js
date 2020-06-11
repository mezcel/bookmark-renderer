/* renderer.js */

// Launch Exe related
const { execFile, spawn } = require( 'child_process' );
const path = require( 'path' );
//const url = require( 'url' );

// Markdown related // dialog for Electron "^8.2.5 or greater"
const { getCurrentWindow, dialog, shell } = require( 'electron' ).remote;

/* -------------------------------------------------------------------------- */

function openFileExplorer( dirPath ) {
    var UserProfile = process.env.USERPROFILE;
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

function toggleLightDark( isDark ) {

    var l1 = "w3-theme-l1",
        l2 = "w3-theme-l2",
        l3 = "w3-theme-l3",
        l4 = "w3-theme-l4",
        l5 = "w3-theme-l5";

    var d1 = "w3-theme-d1",
        d2 = "w3-theme-d2",
        d3 = "w3-theme-d3",
        d4 = "w3-theme-d4",
        d5 = "w3-theme-d5";


    if ( isDark ) {

        var eleml1 = document.querySelector( "." + l1 );
        var eleml2 = document.querySelector( "." + l2 );
        var eleml3 = document.querySelector( "." + l3 );
        var eleml4 = document.querySelector( "." + l4 );
        var eleml5 = document.querySelector( "." + l5 );

        if ( eleml5 ) { eleml5.classList.replace( l5, d5 ); }
        if ( eleml4 ) { eleml4.classList.replace( l4, d4 ); }
        if ( eleml3 ) { eleml3.classList.replace( l3, d3 ); }
        if ( eleml2 ) { eleml2.classList.replace( l2, d2 ); }
        if ( eleml1 ) { eleml1.classList.replace( l1, d1 ); }

    } else {

        var elemd1 = document.querySelector( "." + d1 );
        var elemd2 = document.querySelector( "." + d2 );
        var elemd3 = document.querySelector( "." + d3 );
        var elemd4 = document.querySelector( "." + d4 );
        var elemd5 = document.querySelector( "." + d5 );

        if ( elemd5 ) { elemd5.classList.replace( d5, l5 ); }
        if ( elemd4 ) { elemd4.classList.replace( d4, l4 ); }
        if ( elemd3 ) { elemd3.classList.replace( d3, l3 ); }
        if ( elemd2 ) { elemd2.classList.replace( d2, l2 ); }
        if ( elemd1 ) { elemd1.classList.replace( d1, l1 ); }

    }
    console.log( isDark );
}

function colorTheme( cssTheme, isDark ) {
	// Dynamically change css theme

    var cssFile = "view/css/" + cssTheme;
    var href    = path.join( __dirname, cssFile );
    var w3Theme = document.getElementById("w3Theme");

	if ( w3Theme ) {

        if ( w3Theme.dark !== isDark ) {
            w3Theme.isDark = isDark;
            toggleLightDark( isDark );
        }
        w3Theme.isDark = isDark;

        if ( w3Theme.href !== href ) {
            w3Theme.href = href;
			require('electron').remote.getGlobal('GlobalTheme').css = cssTheme;
        }

	}
	console.log(  w3Theme.isDark, require('electron').remote.getGlobal('GlobalTheme').isDark, "renderer.js" );

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
                keyboardElemIdClick( "btnStyle3", "key:" + keyboardKey + " w3-theme-dark-grey.css" );
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

            case 66: // b
                keyboardElemIdClick( "btnStyle10", "key:" + keyboardKey + " w3-theme-teal.css" );
                break;

            case 16: // shift key
                // keyboardElemIdClick( "btnStyle11", "key:" + keyboardKey + " light/dark toggle" );

                // Toggle Light/Dark Color Theme
                var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
                require('electron').remote.getGlobal('GlobalTheme').isDark = !isDark;
                toggleLightDark( !isDark );

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

/* -------------------------------------------------------------------------- */

function domIndex() {       // event buttons for view\index.html

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
            btnStyle9 = document.getElementById( 'btnStyle9' ),
            btnStyle10 = document.getElementById( 'btnStyle10');
    //const   btnStyle11 = document.getElementById( 'btnStyle11' );

    if ( btn4 ) {   // explorer gist
        btn4.addEventListener( 'click', function () {
            var gistDir = "gist.github/mezcel";
            openFileExplorer( gistDir );
        });
    }

    if ( btn5 ) {   // explorer git
        btn5.addEventListener( 'click', function () {
            var githubDir = "github/mezcel";
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

    if ( btnStyle1 ) {   // style 1

        btnStyle1.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-blue-grey.css", isDark );
        });
    }

    if ( btnStyle2 ) {   // style 2

        btnStyle2.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-brown.css", isDark );
        });
    }

    if ( btnStyle3 ) {   // style 3

        btnStyle3.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-dark-grey.css", isDark );
        });
    }

    if ( btnStyle4 ) {   // style 4

        btnStyle4.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-pink.css", isDark );
        });
    }

    if ( btnStyle5 ) {   // style 5

        btnStyle5.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-green.css", isDark );
        });
    }

    if ( btnStyle6 ) {   // style 6

        btnStyle6.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-indigo.css", isDark );
        });
    }

    if ( btnStyle7 ) {   // style 7

        btnStyle7.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-yellow.css", isDark );
        });
    }

    if ( btnStyle8 ) {   // style 8

        btnStyle8.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-purple.css", isDark );
        });
    }

    if ( btnStyle9 ) {   // style 9

        btnStyle9.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-orange.css", isDark );
        });
    }

    if ( btnStyle10 ) {   // style 10

        btnStyle10.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            colorTheme( "w3-theme-teal.css", isDark );
        });
    }

    /*
    if ( btnStyle11 ) {   // toggle light/dark

        btnStyle11.addEventListener( 'click', function () {
            var isDark = require('electron').remote.getGlobal('GlobalTheme').isDark;
            require('electron').remote.getGlobal('GlobalTheme').isDark = !isDark;
            toggleLightDark( !isDark );
        });
    }
    */
}

function domScripts() {     // event buttons for view\html\scripts.html

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
        var faviconPath = path.join( __dirname, "view/img/favicon.ico" );
        getCurrentWindow().setIcon( faviconPath );

        domIndex();         // event buttons for view\index.html
    }

    if ( htmlScripts ) {
        var faviconPath = path.join( __dirname, "view/img/ps.ico" );
        getCurrentWindow().setIcon( faviconPath );

        domScripts();       // event buttons for view\html\scripts.html
    }

    if ( htmlMarkdown ) {
        var faviconPath = path.join( __dirname, "view/img/md.ico" );
        getCurrentWindow().center();
        getCurrentWindow().setIcon( faviconPath );

        domMarkdown();      // event buttons for view\html\notes.html
        domBookmarks();     // open web links in a non-electron browser
    }

    if ( htmlBookmarks ) {
        var faviconPath = path.join( __dirname, "view/img/star.ico" );
        getCurrentWindow().setIcon( faviconPath );

        domBookmarks();     // event buttons for view\html\bookmarks.html
    }

    customKeybindings();    // DOM Key bindings
}

/* -------------------------------------------------------------------------- */

main();

console.log("loaded renderer.js");
