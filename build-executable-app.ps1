<#
    build-executable-app.ps1
    remove previous build and package a new build
#>

function killRunningProcess() {
    ## kill any running  processes
    Write-Host "kill any running bookmark-renderer* processes ..." -ForegroundColor Cyan
    Stop-Process -Name "bookmark-renderer*"
    Start-Sleep 3
}

function removePreviousBuild() {
    ## rm old build
    Write-Host "Remove previous build ..." -ForegroundColor Cyan
    Remove-Item -Recurse -Force ".\bookmark-renderer-win32-x64" -ErrorAction Ignore
    Remove-Item -Recurse -Force ".\bookmark-renderer-win32-ia32" -ErrorAction Ignore
    Remove-Item -Recurse -Force ".\bookmark-renderer*" -ErrorAction Ignore
    Start-Sleep 3

}

function buildNewPackage() {
    ## build new package
    Write-Host "Build a new package ..." -ForegroundColor Cyan
    electron-packager .
    Start-Sleep 3

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
    Write-Host "Create a shortcut ..." -ForegroundColor Cyan
    Set-Location -Path bookmark-renderer*

    $verbosePath = Get-Location
    $ShortcutFile1 = "$env:UserProfile\Desktop\bookmark-renderer.lnk"
    $ShortcutFile2 = "$env:AppData\Microsoft\Windows\Start Menu\Programs\Startup\bookmark-renderer.lnk"

    $WorkingDir = "$verbosePath"
    $TargetFile = "$verbosePath\bookmark-renderer.exe"

    ## desktop
    set-shortcut $ShortcutFile1 $WorkingDir $TargetFile
    ## startup
    set-shortcut $ShortcutFile2 $WorkingDir $TargetFile

    Set-Location -Path ..\

}

function main() {
    ## Install npm package
    #npm install -g electron-packager

    killRunningProcess
    removePreviousBuild
    buildNewPackage
    createShortcutLinks
}

<# RUN #>

main

Write-Host "Done.`n"-ForegroundColor Yellow