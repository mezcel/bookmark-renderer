<#
    package-electron-app.ps1

    remove previous build and package a new build
#>

Remove-Item -Recurse -Force ".\bookmark-renderer-win32-x64"

electron-packager .