<#
    package-electron-app.ps1

    remove previous build and package a new build
#>

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

Write-Host "Done.`n"-ForegroundColor Yellow
