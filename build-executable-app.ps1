<#
    build-executable-app.ps1
    remove previous build and package a new build
#>

function killRunningProcess() {
    ## kill any running  processes
    Write-Host "kill any running bookmark-renderer* processes ..." -ForegroundColor Cyan
    Stop-Process -Name "bookmark-renderer*"
    Write-Host "Pause to allow killed process to settle ..." -ForegroundColor DarkYellow
    Start-Sleep 3
}

function removePreviousBuild() {
    ## rm old build
    Write-Host "Remove previous build ..." -ForegroundColor Cyan

    $arch = $env:PROCESSOR_ARCHITECTURE
    $length = $arch.length
    $archNo = $arch.substring($length -2)

    if ( $archNo = "64" ) {
        $packagePath = ".\bookmark-renderer-win32-x64"
    } elseif ( $archNo = "86" ) {
        $packagePath = ".\bookmark-renderer-win32-ia32"
    }

    if ( Test-Path $packagePath ) {
        Remove-Item -Recurse -Force $packagePath -ErrorAction Ignore
        Write-Host "Pause to allow removal to settle in ..." -ForegroundColor DarkYellow
        Start-Sleep 3
    }
}

function buildNewPackage() {
    ## build new package

    $packagePath1 = ".\bookmark-renderer-win32-x64"
    $packagePath2 = ".\bookmark-renderer-win32-ia32"

    Write-Host "Build a new package ..." -ForegroundColor Cyan
    if ( -Not ( Test-Path $packagePath2 ) -and -Not ( Test-Path $packagePath1 ) ) {
        electron-packager .
        Write-Host "Pause to allow built package to settle in ..." -ForegroundColor DarkYellow
        Start-Sleep 3
    }

}

function set-shortcut( [string]$ShortcutFile, [string]$WorkingDir, [string]$TargetFile ) {
    $WScriptShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
    $Shortcut.TargetPath = $TargetFile
    $Shortcut.WorkingDirectory = $WorkingDir
    $Shortcut.Save()
}
function createShortcutLinks() {

    ## Make a shortcut link
    Write-Host "Creating shortcut links..." -ForegroundColor Cyan
    Set-Location -Path bookmark-renderer*

    $verbosePath = Get-Location
    $ShortcutFile1 = "$env:UserProfile\Desktop\bookmark-renderer.lnk"
    $ShortcutFile2 = "$env:AppData\Microsoft\Windows\Start Menu\Programs\Startup\bookmark-renderer.lnk"

    $WorkingDir = "$verbosePath"
    $TargetFile = "$verbosePath\bookmark-renderer.exe"

    ## desktop
    set-shortcut $ShortcutFile1 $WorkingDir $TargetFile
    Write-Host "Created a desktop shortcut ..." -ForegroundColor Cyan
    ## startup
    set-shortcut $ShortcutFile2 $WorkingDir $TargetFile
    Write-Host "Created a startup link ..." -ForegroundColor Cyan

    Set-Location -Path ..\

}

function getNpms() {
    npm install
    Start-Sleep 3

    npm install -g electron-packager
    Write-Host "Pause to allow new installation to settle in ..." -ForegroundColor DarkYellow
    Start-Sleep 3
}

function main() {
    ## Install npm package
    getNpms

    killRunningProcess
    removePreviousBuild
    buildNewPackage
    createShortcutLinks
}

<# RUN #>

main

Write-Host "Done.`n"-ForegroundColor Yellow
