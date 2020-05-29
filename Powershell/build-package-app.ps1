<#
    app-shortcut-links.ps1

    About:
        remove previous build and package a new build
        desktop shortcut and startup shortcut

    Enable this script in Powershell:
        Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
#>


$scriptParentDir = split-path -parent $MyInvocation.MyCommand.Definition
$scriptName = $MyInvocation.MyCommand.Name

function greetings() {

    Write-Host "//////////////////////////////////////////////////////////////////////////////" -ForegroundColor Magenta
    Write-Host "# $scriptName"
    Write-Host "# "
    Write-Host "# About:"
    Write-Host "#`tRemove previous build and package a new build."
    Write-Host "#`tMake a desktop shortcut and a startup shortcut."
    Write-Host "# "
    Write-Host "# By:"
    Write-Host "#`tMezcel ( https://github.com/mezcel/bookmark-renderer )"
    Write-Host "# "
    Write-Host "# Source:"
    Write-Host "#`thttps://github.com/mezcel/bookmark-renderer/blob/master/Powershell/build-package-app.ps1"
    Write-Host "# "
    Write-Host "# Script Path:"
    Write-Host "#`t$scriptParentDir\$scriptName"
    Write-Host "//////////////////////////////////////////////////////////////////////////////" -ForegroundColor Magenta
}

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

    $packagePath1 = "bookmark-renderer-win32-x64"
    $packagePath1 = "bookmark-renderer-win32-ia32"

    if ( $archNo = "64" ) {
        $packagePath = $packagePath1
    } elseif ( $archNo = "x86" ) {
        $packagePath = $packagePath2
    }

    Write-Host "Deleting $packagePath ..." -ForegroundColor Cyan

    if ( Test-Path $packagePath ) {
        Remove-Item -Recurse -Force $packagePath -ErrorAction Ignore
        Remove-Item -Force $packagePath -ErrorAction Ignore

        Write-Host "Pause to allow removal to settle in ..." -ForegroundColor DarkYellow
        Start-Sleep 3
    } else {
        Write-Host "Exiting because $packagePath1 and $packagePath2 was not detected by this script." -ForegroundColor Red
        Start-Sleep 3
    }
}

function buildNewPackage() {
    ## build new package

    $packagePath1 = "bookmark-renderer-win32-x64"
    $packagePath2 = "bookmark-renderer-win32-ia32"

    Write-Host "Build a new package ..." -ForegroundColor Cyan
    if ( -Not ( Test-Path $packagePath2 ) -and -Not ( Test-Path $packagePath1 ) ) {
        electron-packager .

        Write-Host "Pause to allow built package to settle in ..." -ForegroundColor DarkYellow
        Start-Sleep 3
    } else {
        Write-Host "The $packagePath1 or $packagePath2 should not exist, yet it does.`n`tManually delete them. Restart to computer too, just incase there are undetected hanging background npm stuff still running." -ForegroundColor Red
        #electron-packager . --overwrite
        explorer .
        Write-Host "Script exited" -ForegroundColor Red
        Exit
    }

}

function set-shortcut( [string]$ShortcutFile, [string]$WorkingDir, [string]$TargetFile ) {
    # Make a shortcut file .lnk

    $WScriptShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
    $Shortcut.TargetPath = $TargetFile
    $Shortcut.WorkingDirectory = $WorkingDir
    $Shortcut.Save()
}
function createShortcutLinks() {
    # Make a startup link and a desktop shortcut
    # The start menu shortcut does not work, but it is made as well

    $packagePath1 = "bookmark-renderer-win32-x64"
    $packagePath2 = "bookmark-renderer-win32-ia32"

    if ( Test-Path $packagePath1 ) {
        $packagePath = $packagePath1
    } elseif ( Test-Path $packagePath2 ) {
        $packagePath = $packagePath2
    } else {
        Write-Host "Exiting script because $packagePath1 or $packagePath2 was not detected by this script." -ForegroundColor Red
        Start-Sleep 3
        exit
    }

    ## Make a shortcut link
    Write-Host "Creating shortcut links..." -ForegroundColor Cyan
    ## CD into dir
    Set-Location -Path $packagePath

    $verbosePath   = Get-Location
    $ShortcutFile1 = "$env:UserProfile\Desktop\bookmark-renderer.lnk"
    $ShortcutFile2 = "$env:AppData\Microsoft\Windows\Start Menu\Programs\Startup\bookmark-renderer.lnk"
    $ShortcutFile3 = "$env:AppData\Microsoft\Windows\Start Menu\Programs\bookmark-renderer.lnk"

    $WorkingDir = "$verbosePath"
    $TargetFile = "$verbosePath\bookmark-renderer.exe"

    ## desktop
    set-shortcut $ShortcutFile1 $WorkingDir $TargetFile
    Write-Host "Created a desktop shortcut ..." -ForegroundColor Cyan
    ## startup
    set-shortcut $ShortcutFile2 $WorkingDir $TargetFile
    Write-Host "Created a startup link ..." -ForegroundColor Cyan
    ## start menu
    set-shortcut $ShortcutFile3 $WorkingDir $TargetFile
    Write-Host "Created a start menu link ..." -ForegroundColor Cyan

    ## CD up to parent dir
    Set-Location -Path ..\

}

function getNpms() {
    # Install npm packages
    # N/a

    Write-Host "Installing packages listed in package.json ..." -ForegroundColor Cyan
    npm install
    Write-Host "Pause to allow new package.json installations to settle in ..." -ForegroundColor DarkYellow
    Start-Sleep 3

    Write-Host "Installing electron-packager ..." -ForegroundColor Cyan
    npm install -g electron-packager
    Write-Host "Pause to allow new electron-packager installation to settle in ..." -ForegroundColor DarkYellow
    Start-Sleep 3
}

function main() {
    greetings

    ## Install npm packages
    #getNpms

    killRunningProcess
    removePreviousBuild
    buildNewPackage
    createShortcutLinks
}

<# ############# RUN ############# #>

main

Write-Host "Done.`n"-ForegroundColor Yellow
