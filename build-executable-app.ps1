<#
    build-executable-app.ps1
    remove previous build and package a new build
#>

function set-shortcut( [string]$ShortcutFile, [string]$WorkingDir, [string]$TargetFile ) {
    $WScriptShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WScriptShell.CreateShortcut($ShortcutFile)
    $Shortcut.TargetPath = $TargetFile
    $Shortcut.WorkingDirectory = $WorkingDir
    $Shortcut.Save()
}

## Install npm package
#npm install -g electron-packager

## kill any running  processes
Write-Host "kill any running bookmark-renderer* processes ..." -ForegroundColor Cyan
Stop-Process -Name "bookmark-renderer*"
Start-Sleep 3

## rm old build
Write-Host "Remove previous build ..." -ForegroundColor Cyan
Remove-Item -Recurse -Force ".\bookmark-renderer-win32-x64" -ErrorAction Ignore
Remove-Item -Recurse -Force ".\bookmark-renderer-win32-ia32" -ErrorAction Ignore
Remove-Item -Recurse -Force ".\bookmark-renderer*" -ErrorAction Ignore
Start-Sleep 3

## build new package
Write-Host "Build a new package ..." -ForegroundColor Cyan
electron-packager .
Start-Sleep 3

## Make a shortcut link
Write-Host "Create a shortcut ..." -ForegroundColor Cyan
Set-Location -Path bookmark-renderer*
$verbosePath = Get-Location
$ShortcutFile1 = "$env:UserProfile\Desktop\bookmark-renderer.lnk"
$ShortcutFile2 = "$env:AppData\Microsoft\Windows\Start Menu\Programs\Startup\bookmark-renderer.lnk"
$WorkingDir = "$verbosePath"
$TargetFile = "$verbosePath\bookmark-renderer.exe"

set-shortcut $ShortcutFile1 $WorkingDir $TargetFile
set-shortcut $ShortcutFile2 $WorkingDir $TargetFile

Set-Location -Path ..\
Write-Host "Done.`n"-ForegroundColor Yellow
