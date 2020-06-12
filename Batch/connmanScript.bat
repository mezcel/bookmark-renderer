::
:: connmanScript.bat
::

@ECHO off

::start powershell -NoExit -Command ".\interface_con.ps1"
::start powershell Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Command ".\interface_con.ps1"

:::: Packaged app
set filePath1="..\Powershell\interface_con.ps1"

:::: Local npm path
set filePath2=".\Powershell\interface_con.ps1"

if EXIST %filePath1% (
    start powershell -Command %filePath1%
    echo "Launched and ran %filePath1%"
) else (
    start powershell -Command %filePath2%
    echo "Launched and ran %filePath2%"
)
