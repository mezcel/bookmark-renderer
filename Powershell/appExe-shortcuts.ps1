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
    Write-Host "#`tMake a desktop shortcut and a startup shortcut."
    Write-Host "# "
    Write-Host "# By:"
    Write-Host "#`tMezcel ( https://github.com/mezcel/bookmark-renderer )"
    Write-Host "# "
    Write-Host "# Source:"
    Write-Host "#`thttps://github.com/mezcel/bookmark-renderer/Powershell/$scriptName"
    Write-Host "# "
    Write-Host "# Script Path:"
    Write-Host "#`t$scriptParentDir\$scriptName"
    Write-Host "//////////////////////////////////////////////////////////////////////////////" -ForegroundColor Magenta
}

function set-shortcut( [string]$ShortcutFile, [string]$WorkingDir, [string]$TargetFile ) {
    # Make a shortcut file .lnk

    $WScriptShell = New-Object -ComObject WScript.Shell
    $Shortcut     = $WScriptShell.CreateShortcut($ShortcutFile)
    $Shortcut.TargetPath = $TargetFile
    $Shortcut.WorkingDirectory = $WorkingDir
    $Shortcut.Save()
}

function createShortcutLinks() {
    ## Make a startup link and a desktop shortcut
    ## The start menu shortcut does not work, but it is made as well
    ## dist\win\bookmark-renderer-win32-x64\bookmark-renderer.exe
    $packagePathia32 = "dist\win\bookmark-renderer-win32-ia32"
    $packagePathx64  = "dist\win\bookmark-renderer-win32-x64"

    if ( Test-Path .\$packagePathia32 ) {
        $packagePath = $packagePathia32
    } elseif ( Test-Path .\$packagePath2 ) {
        $packagePath = $packagePathx64
    } else {
        Write-Host "Exiting script because $packagePathia32 or $packagePathx64 was not detected by this script." -ForegroundColor Red
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

    $WorkingDir = "$verbosePath\"
    $TargetFile = "$verbosePath\bookmark-renderer.exe"

    ## desktop .lnk
    set-shortcut $ShortcutFile1 $WorkingDir $TargetFile
    Write-Host "Created a desktop shortcut ..." -ForegroundColor Cyan
    ## startup .lnk
    set-shortcut $ShortcutFile2 $WorkingDir $TargetFile
    Write-Host "Created a startup link ..." -ForegroundColor Cyan
    ## start menu .lnk
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
    createShortcutLinks
}

<# ############# RUN ############# #>

main

Write-Host "Done.`n"-ForegroundColor Yellow
