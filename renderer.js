const { shell } = require('electron');
const { execFile } = require('child_process');

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

function domButtons() {

    const btnGistDir   = document.getElementById('btnGistDir');
    const btnGithubDir = document.getElementById('btnGithubDir');
    const btnClose     = document.getElementById('btnClose');
    const btnVSCode    = document.getElementById('btnVSCode');
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

    if ( btnVSCode ) {
        
        btnVSCode.addEventListener('click', function () {
            const child = execFile('code', (error, stdout, stderr) => {
                if (error) {
                  throw error;
                }
                console.log(stdout);
              });
        });
    }

    if ( btnWT ) {
        
        btnWT.addEventListener('click', function () {
            const child = execFile('wt', (error, stdout, stderr) => {
                if (error) {
                  throw error;
                }
                console.log(stdout);
              });
        });
        
        /*var child = require('child_process').execFile;
        //var executablePath = "C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe";
        var executablePath ='C:\Program Files\WindowsApps\Microsoft.WindowsTerminal_0.11.1333.0_x64__8wekyb3d8bbwe\WindowsTerminal.exe'
        child('wt', function(err, data) {
            if(err){
               console.error(err);
               return;
            }
         
            console.log(data.toString());
        });*/
    }
    
    if ( btnClose ) {
        btnClose.addEventListener('click', function () {
            closeElectronApp();
        });
    }
}

domButtons();

console.log("loaded renderer.js")