::
:: connmanScript.bat
::

@ECHO off

CLS

REM Make an array of available SSID's
:MAKEARRAY
    setlocal enableextensions enabledelayedexpansion
    SET /a i=1
    SET /a j=0

    REM ignore the 1st 3 lines
    REM store only the SSID names in an array of names
    FOR /F "tokens=4 skip=3 USEBACKQ" %%F IN (`netsh wlan show network`) DO (
        SET /a i+=1
        SET /a modFlag=!i! %% 2

        if !modFlag!==0 (
            SET list[!j!]=%%F
            SET /a j+=1
        )
    )

REM Check string parse
:PARSECHECK
    IF !list[0]!==Infrastructure GOTO :DISPARSERROR
    IF !list[0]!==WPA2-Personal GOTO :DISPARSERROR
    IF !list[0]!==CCMP GOTO :DISPARSERROR

    REM Display array of ssid names
    GOTO :DISPARRAY

REM Parsing error display message
:DISPARSERROR
    ECHO There was a parsing error.
    ECHO Check your wifi on/off state and try again in a moment.
    ECHO.
    ECHO [Press enter to continue]
    PAUSE
    GOTO :EOL

REM List array of SSID names
:DISPARRAY
    ECHO List of available SSID's:
    ECHO.

    setlocal enableextensions enabledelayedexpansion
    SET /a i=0
    FOR /F "tokens=2 delims==" %%s IN ('set list[') DO (
        ECHO    !i! %%s
        SET /a i+=1
    )
    SET /a i-=1

    REM if !i!==0 (
    REM     ECHO "You are likely connected to !list[%i%]!"
    REM     GOTO :PINGTEST
    REM )

REM Select a SSID Name
:SELSSID
    ECHO.
    ECHO Select the number corresponding to the available SSID.
    ECHO.
    SET /p ssidNo="Select number [ 0 - !i! ]: "

    ECHO You selected !list[%ssidNo%]!
    ECHO.

    SET /p yn="Confirm [ y/N ]: "
    ECHO You selected !yn!

    IF %yn%==y (
        ECHO.
        ECHO Connecting ...
        GOTO :CONNECTSSID
    ) ELSE (
        ECHO.
        ECHO Exiting ...
        GOTO :EOL
    )

REM Connect to SSID
:CONNECTSSID
    netsh wlan connect name=!list[%ssidNo%]!

REM Ping google
:PINGTEST
    ECHO Pinging google at 8.8.8.8 ...
    Ping 8.8.8.8

:EOL
    ECHO Done.
