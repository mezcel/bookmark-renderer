<#
    build-executable-app.ps1
    remove previous build and package a new build
#>

function set-shortcut( [string]$SourceLnk, [string]$DestinationPath ) {
    <#
    $SourceLnk = path of the shortcut link we want to make
    $DestinationPath = the source file we want to make a shortcut for
    #>
    $WshShell = New-Object -comObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut($SourceLnk)
    $Shortcut.TargetPath = $DestinationPath
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
Start-Sleep 1

## Make a shortcut link
#Write-Host "Create a shortcut ..." -ForegroundColor Cyan
#cd bookmark-renderer*
#$verbosePath = Get-Location
#set-shortcut "Shortcut_Name.lnk" "$verbosePath\bookmark-renderer.exe"

Write-Host "Done.`n"-ForegroundColor Yellow
