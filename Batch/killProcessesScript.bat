::
:: killProcessesScript.bat
::

@ECHO off

:::: Kill steam
set appExe="C:\Program Files (x86)\Steam\Steam.exe"
taskkill /f /im %appExe% 2> nul
set appExe="steam.exe"
taskkill /f /im %appExe% 2> nul

:::: Kill gamebar
set appExe="GameBar.exe"
taskkill /f /im %appExe% 2> nul

:::: Kill ms-edge
::set appExe="MicrosoftEdge.exe"
set appExe="msedge.exe"
taskkill /f /im %appExe% /t 2> nul
set appExe="MicrosoftEdgeCP.exe"
taskkill /f /im %appExe% /t 2> nul
set appExe="browser_broker.exe"
taskkill /f /im %appExe% /t 2> nul

:: Kill Cortana
set appExe="SearchUI.exe"
taskkill /f /im %appExe% /t 2> nul
