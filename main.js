/*  main.js */

// Modules to control application life and create native browser window

const { app, BrowserWindow, shell, Menu, Tray } = require( 'electron' );

const { execFile, spawn } = require( 'child_process' );

const path        = require( 'path' );
const url         = require( 'url' );
const nativeImage = require( 'electron' ).nativeImage;

// Global theme css variable
global.GlobalTheme = {
    css: "w3-theme-blue-grey.css"
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

function createWindow () {
    Menu.setApplicationMenu( null ); // null menubar

    const faviconPath = path.join( __dirname, 'view/img/favicon.ico' ),
          favicon     = nativeImage.createFromPath( faviconPath ).resize( { width:16 } );

    const githubiconPath = path.join( __dirname, 'view/img/github.ico' ),
          githubicon     = nativeImage.createFromPath( githubiconPath ).resize( { width:16 } );

    const mdiconPath = path.join( __dirname, 'view/img/md.ico' ),
          mdicon     = nativeImage.createFromPath( mdiconPath ).resize( { width:16 } );

    const psiconPath = path.join( __dirname, 'view/img/ps.ico' ),
          psicon     = nativeImage.createFromPath( psiconPath ).resize( { width:16 } );

    const closeiconPath = path.join( __dirname, 'view/img/close.ico' ),
          closeicon     = nativeImage.createFromPath( closeiconPath ).resize( { width:16 } );

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join( __dirname, 'preload.js' ),
            nodeIntegration: true,
            show: false
        },
        icon: favicon
    });
    /* BrowserWindow Notes:
        nodeIntegration: true (will enable renderer.js script)
        show: false (don't initially show)
    */

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

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
                    }
                }, {
                    label: 'Gist',
                    click () {
                        shell.openExternal( 'https://gist.github.com/mezcel' );
                    }
                }, {
                    label: 'Google',
                    click () {
                        shell.openExternal( 'https://google.com' );
                    }
                }, {
                    label: 'Youtube',
                    click () {
                        shell.openExternal( 'https://www.youtube.com/channel/UCpNZc5SjrUzVwGgI9PDMHxg' );
                    }
                }, {
                    label: 'Soundcloud',
                    click () {
                        shell.openExternal( 'https://soundcloud.com/mezcel' );
                    }
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

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join( __dirname, 'view/index.html' ),
            protocol: 'file:'
        })
    );

    // start bar tray
    const trayIcon = favicon.resize({ width: 16, height: 16 });

    mainWindow.tray = new Tray( trayIcon );
    //mainWindow.tray = new Tray();
    mainWindow.tray.setToolTip( 'kiosk' );
    mainWindow.tray.setContextMenu( contextMenu );

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

/* -------------------------------------------------------------------------- */

// Run Main App
app.whenReady().then( () => { createWindow(); } );