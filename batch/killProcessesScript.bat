::
:: killProcessesScript.bat
::
:: Kill known background process and turn off computer
::

:::: Kill steam
taskkill /f /im "C:\Program Files (x86)\Steam\Steam.exe"

:::: Kill gamebar
::cmd /k taskkill /f /im GameBar.exe
taskkill /f /im RuntimeBarker.exe

:::: Kill ms-edge
::cmd /k taskkill /f /im  MicrosoftEdge.exe /t
taskkill /f /im  MicrosoftEdge.exe /t

:: Kill Cortana
::cmd /k taskkill /f /im  SearchUI.exe /t
taskkill /f /im  SearchUI.exe /t
