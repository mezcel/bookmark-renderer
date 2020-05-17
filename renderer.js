/*
    renderer.js
*/

const { shell } = require('electron');
const { execFile, spawn, exec } = require('child_process');
const util = require('util');

/*
    const { ipcRenderer } = require('electron');
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

    ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
    })
    ipcRenderer.send('asynchronous-message', 'ping from myScript.js');
*/

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

function closeElectronApp() {
    // closes DOM which ends app
    window.close();
}

function launchBatScript( scriptPath ) {
    const bat = spawn('cmd.exe', ['/c', scriptPath ]);

    bat.stdout.on('data', (data) => {
    console.log(data.toString());
    });

    bat.stderr.on('data', (data) => {
    console.error(data.toString());
    });

    bat.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
    });
}

function domButtons() {

    const btnGistDir   = document.getElementById('btnGistDir');
    const btnGithubDir = document.getElementById('btnGithubDir');
    const btnClose     = document.getElementById('btnClose');

    const btnVSCode    = document.getElementById('btnVSCode');
    const btnTaskMgr   = document.getElementById('btnTaskMgr');
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
            var winExePath = process.env.userprofile + "\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe";
            const childCode = execFile( winExePath, (error, stdout, stderr) => {
                if (error) {
                  throw error;
                }
                console.log(stdout);
              });
        });
    }
    if ( btnTaskMgr ) { /* Launch Windows Task Manager */

        btnTaskMgr.addEventListener('click', function () {
            var scriptPath = "batch\\launchTaskManager.bat"
            launchBatScript( scriptPath );
        });

    }

    if ( btnWT ) { /* launch Windows Terminal */

        btnWT.addEventListener('click', function () {
            const childWt = execFile('wt', (error, stdout, stderr) => {
                if (error) {
                  throw error;
                }
                console.log(stdout);
              });
        });
    }

    if ( btnClose ) {
        btnClose.addEventListener('click', function () {
            closeElectronApp();
        });
    }
}

domButtons();

console.log("loaded renderer.js")