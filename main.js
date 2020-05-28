/*  main.js */

// Modules to control application life and create native browser window
const {
    app,
    BrowserWindow,
    shell,
    Menu,
    Tray
} = require( 'electron' );

const path = require( 'path' );
const url  = require( 'url' );

/*
function returnPackageDir( processCwd ) {
    //var processCwd = process.cwd();

    var parentDir = "";
    var appDir = processCwd.split( '\\' ).pop();
    var isRelativeMatch = /bookmark-renderer-win32-x64/.test(appDir);

    if ( isRelativeMatch ) {
        parentDir = process.cwd() + "\\resources\\app\\";
    }

    return parentDir;
}
*/
/*
function notificaitionArea() {

    var processCwd = process.cwd();
    var icoPath = returnPackageDir( processCwd ) + 'view\\img\\electron_light.ico';

    let tray = null;
        tray = new Tray( icoPath );

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'https://github.com/mezcel/bookmark-renderer.git',
            click () {
                shell.openExternal( 'https://github.com/mezcel/bookmark-renderer' );
            }
        }
    ]);

    tray.setToolTip( 'kiosk' );
    tray.setContextMenu( contextMenu );
}
*/

function createWindow () {

    Menu.setApplicationMenu( null ); // null menu

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 400,
        webPreferences: {
            preload: path.join( __dirname, 'preload.js' ),
            nodeIntegration: true
        }
    });  /* nodeIntegration: true will enable renderer.js script */

    // and load the index.html of the app.
    mainWindow.loadURL(
        url.format({
            pathname: path.join( __dirname, 'view/index.html' ),
            protocol: 'file:'
        })
    );

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

    //notificaitionArea();
    createWindow();

    app.applicationMenu = false

    app.on( 'activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if ( BrowserWindow.getAllWindows().length === 0 ) createWindow()
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if ( process.platform !== 'darwin' ) app.quit()
})
