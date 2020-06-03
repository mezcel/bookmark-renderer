/*  main.js */

// Modules to control application life and create native browser window

const { app, BrowserWindow, shell, Menu, Tray } = require( 'electron' );

const { execFile, spawn } = require( 'child_process' );

const path         = require( 'path' );
const url          = require( 'url' );

// Global theme css variable
var defaultCssTheme = "w3-theme-blue-grey.css";
//  defaultCssTheme = "w3-theme-indigo.css";

global.GlobalVars = {
    css: defaultCssTheme,
    isWin32: true
}

/* -------------------------------------------------------------------------- */

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

function win10menus( mainWindow ) {

    const nativeImage = require( 'electron' ).nativeImage;

    // Application Icons
    const faviconPath = path.join( __dirname, 'view/img/favicon.ico' ),
          favicon     = nativeImage.createFromPath( faviconPath ).resize( { width: 16 } );

    const githubiconPath = path.join( __dirname, 'view/img/github.ico' ),
          githubicon     = nativeImage.createFromPath( githubiconPath ).resize( { width: 16 } );

    const mdiconPath = path.join( __dirname, 'view/img/md.ico' ),
          mdicon     = nativeImage.createFromPath( mdiconPath ).resize( { width: 16 } );

    const psiconPath = path.join( __dirname, 'view/img/ps.ico' ),
          psicon     = nativeImage.createFromPath( psiconPath ).resize( { width: 16 } );

    const closeiconPath = path.join( __dirname, 'view/img/close.ico' ),
          closeicon     = nativeImage.createFromPath( closeiconPath ).resize( { width: 16 } );

    const stariconPath = path.join( __dirname, 'view/img/star.ico' ),
          staricon     = nativeImage.createFromPath( stariconPath ).resize( { width: 16 } );


    // taskbar icon right click menu
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Git: ' + app.name,
            click () {
                shell.openExternal( 'https://github.com/mezcel/bookmark-renderer' );
            },
            icon: githubicon
        },
        { type: 'separator' },
        {
            label: 'Bookmarks',
            'submenu': [
                {
                    label: 'Bookmarks Menu',
                    click () {
                        mainWindow.loadURL( path.join( __dirname, 'view/html/bookmarks.html' ) );
                        mainWindow.restore();
                    },
                    icon: favicon
                },
                { type: 'separator' },
                {
                    label: 'Github ',
                    click () {
                        shell.openExternal( 'https://github.com/mezcel' );
                    },
                    icon: staricon
                }, {
                    label: 'Gist',
                    click () {
                        shell.openExternal( 'https://gist.github.com/mezcel' );
                    },
                    icon: staricon
                }, {
                    label: 'Google',
                    click () {
                        shell.openExternal( 'https://google.com' );
                    },
                    icon: staricon
                }, {
                    label: 'YouTube',
                    click () {
                        shell.openExternal( 'https://www.youtube.com/channel/UCpNZc5SjrUzVwGgI9PDMHxg' );
                    },
                    icon: staricon
                }, {
                    label: 'Soundcloud',
                    click () {
                        shell.openExternal( 'https://soundcloud.com/mezcel' );
                    },
                    icon: staricon
                }
            ],
            icon: favicon
        },{
            label: 'Scripts',
            'submenu': [
                {
                    'label': 'Scripts Menu',
                    click() {
                        mainWindow.loadURL( path.join( __dirname, 'view/html/scripts.html' ) );
                        mainWindow.restore();
                    },
                    icon: favicon
                },
                { type: 'separator' },
                {
                    'label': 'Connection Manager',
                    click() {
                        console.log("Connection Manager");
                        var scriptPath = path.join( __dirname, "Batch/connmanScript.bat" );
                        launchBatScript( scriptPath );
                    },
                    icon: psicon
                },
                {
                    'label': 'Kill Misc. Processes',
                    click() {
                        console.log("Kill Misc. Processes");
                        var scriptPath = path.join( __dirname, "Batch/killProcessesScript.bat" );
                        launchBatScript( scriptPath );
                    },
                    icon: psicon
                },
                {
                    'label': 'Shutdown',
                    click() {
                        var scriptPath = path.join( __dirname, "Batch/shutdownScript.bat" );
                        launchBatScript( scriptPath );
                    },
                    icon: psicon
                }
            ],
            icon: favicon
        },
        { type: 'separator' },
        {
            label: 'Markdown Reader',
            click () {
                new BrowserWindow({
                    width: 1100,
                    height: 900,
                    webPreferences: {
                        preload: path.join( __dirname, 'preload.js' ),
                        nodeIntegration: true,
                        show: false
                    }
                }).loadURL(
                    path.join( __dirname, 'view/html/markdown.html' )
                );
            },
            icon: mdicon
        },
        { type: 'separator' },
        {
            label: 'Close App',
            click () {
                mainWindow.close();
            },
            icon: closeicon
        }
    ]);

    // start bar tray

    mainWindow.tray = new Tray( favicon );
    mainWindow.tray.setToolTip( 'kiosk' );
    mainWindow.tray.setContextMenu( contextMenu );

    // A taskbar thumb menu ( just another menu accessible from the taskbar )
    mainWindow.setThumbarButtons([
        {
            tooltip: 'Bookmarks Menu',
            click () {
                mainWindow.loadURL( path.join( __dirname, 'view/html/bookmarks.html' ) );
                mainWindow.restore();
            },
            icon: staricon
        }, {
            tooltip: 'Scripts Menu',
            click() {
                mainWindow.loadURL( path.join( __dirname, 'view/html/scripts.html' ) );
                mainWindow.restore();
            },
            icon: psicon
        }, {
            tooltip: 'Markdown Reader',
            click () {
                new BrowserWindow({
                    width: 1100,
                    height: 900,
                    webPreferences: {
                        preload: path.join( __dirname, 'preload.js' ),
                        nodeIntegration: true,
                        show: false
                    }
                }).loadURL(
                    path.join( __dirname, 'view/html/markdown.html' )
                );
            },
            icon: mdicon
        }, {
            tooltip: 'Close App',
            click () {
                mainWindow.close();
            },
            icon: closeicon
        }
    ]);

}

function createWindow ( isWin32 ) {
    Menu.setApplicationMenu( null ); // no browser menubar

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join( __dirname, 'preload.js' ),
            nodeIntegration: true,
            show: false
        }
    });

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join( __dirname, 'view/index.html' ),
            protocol: 'file:'
        })
    );

    if ( isWin32 ) {
        win10menus( mainWindow );
    }

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
}

/* -------------------------------------------------------------------------- */

// Run Main App
app.whenReady().then( () => {

    if ( process.platform !== "win32" ) {
        global.GlobalVars.isWin32 = false;
    }

    createWindow( global.GlobalVars.isWin32 );

} );
