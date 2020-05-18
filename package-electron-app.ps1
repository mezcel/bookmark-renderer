<#
    package-electron-app.ps1

    remove previous build and package a new build
#>

Write-Host "Remove previous build ..." -ForegroundColor Cyan
Remove-Item -Recurse -Force ".\bookmark-renderer-win32-x64"
Start-Sleep 1

Write-Host "Build a new package ..." -ForegroundColor Cyan
electron-packager .
Start-Sleep 1

Write-Host "Done.`n"-ForegroundColor Yellow
