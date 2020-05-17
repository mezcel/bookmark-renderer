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

function domIndex() {

    const btnGistDir   = document.getElementById('btnGistDir');
    const btnGithubDir = document.getElementById('btnGithubDir');
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
            /*
            var winExePath = process.env.userprofile + "\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe";
            const childCode = execFile( winExePath, (error, stdout, stderr) => {
                if (error) {
                  throw error;
                }
                console.log(stdout);
            });
            */

            var packagedRootDir = process.cwd() + "\\resources\\app\\";
            var scriptPath = packagedRootDir + "batch\\launchVSCode.bat"
            launchBatScript( scriptPath );
        });
    }

    if ( btnWT ) { /* launch Windows Terminal */

        btnWT.addEventListener('click', function () {
            /*
            const childWt = execFile('wt', (error, stdout, stderr) => {
                if (error) {
                  throw error;
                }
                console.log(stdout);
            });
            */
            var packagedRootDir = process.cwd() + "\\resources\\app\\";
            var scriptPath = packagedRootDir + "batch\\launchWT.bat"
            launchBatScript( scriptPath );
        });
    }
}

function domScripts() {

    const btnScript0 = document.getElementById('btnScript0');
    const btnScript1 = document.getElementById('btnScript1');
    const btnScript2 = document.getElementById('btnScript2');
    const btnScript3 = document.getElementById('btnScript3');
    const btnScript4 = document.getElementById('btnScript4');
    const btnScript5 = document.getElementById('btnScript5');
    const btnScript6 = document.getElementById('btnScript6');
    const btnScript7 = document.getElementById('btnScript7');
    const btnScript8 = document.getElementById('btnScript8');

    var packagedRootDir = process.cwd() + "\\resources\\app\\";

    var scriptPath0 = packagedRootDir + "batch\\launchTaskManager.bat";
    var scriptPath1 = packagedRootDir + "batch\\pullGithubRepos.bat";
    var scriptPath2 = packagedRootDir + "";

    var scriptPath3 = packagedRootDir + "";
    var scriptPath4 = packagedRootDir + "";
    var scriptPath5 = packagedRootDir + "";

    var scriptPath6 = packagedRootDir + "batch\\connmanScript.bat";
    var scriptPath7 = packagedRootDir + "batch\\killProcessesScript.bat";
    var scriptPath8 = packagedRootDir + "batch\\shutdownScript.bat";

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
            alert("Killing misc. processes. The log Console, (F11), will be toggled after pressing OK");
            console.log("\n:::::::::::::::::\nKilling Processes\n:::::::::::::::::\n");
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

const btnClose    = document.getElementById('btnClose');
const htmlIndex   = document.getElementById('htmlIndex');
const htmlScripts = document.getElementById('htmlScripts');

if ( btnClose ) {
    btnClose.addEventListener('click', function () {
        closeElectronApp();
    });
}

if ( htmlIndex ) {
    domIndex();
}

if ( htmlScripts ) {
    domScripts();
}

// DOM Keybindings
document.addEventListener( "keydown", function (e) {
    if (e.which === 122) {
        console.log(e.which, "toggle dev tools");
        require('electron').remote.getCurrentWindow().toggleDevTools();
    } else if (e.which === 116) {
        console.log(e.which, "reload dom");
        location.reload();
    }
    console.log(e.which);
})

console.log("loaded renderer.js")