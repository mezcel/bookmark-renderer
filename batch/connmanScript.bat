::
:: connmanScript.bat
::

cd ..\powershell
::start powershell -NoExit -Command ".\interface_con.ps1"
::start powershell Set-ExecutionPolicy RemoteSigned -Scope CurrentUser -Command ".\interface_con.ps1"
start powershell -Command ".\interface_con.ps1"