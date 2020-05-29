/*  main.js */

// Modules to control application life and create native browser window
const { app, BrowserWindow, shell, Menu, Tray } = require( 'electron' );

const path = require( 'path' );
const url  = require( 'url' );
const nativeImage = require('electron').nativeImage;

// Global theme css variable
global.GlobalTheme = {
    css: "w3-theme-blue-grey.css"
}

/* -------------------------------------------------------------------------- */

function createWindow () {
    Menu.setApplicationMenu( null ); // null menubar

    const faviconPath = path.join( __dirname, 'view/img/electron_favicon.ico' );
    const favicon     = nativeImage.createFromPath( faviconPath );

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join( __dirname, 'preload.js' ),
            nodeIntegration: true,
            show: false
        },
        icon: faviconPath
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
            }
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
            }
        },
        { type: 'separator' },
        {
            label: 'Exit App',
            click () {
                mainWindow.close();
            }
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
    mainWindow.tray.setToolTip( 'kiosk' );
    mainWindow.tray.setContextMenu( contextMenu );

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
});