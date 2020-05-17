<#
    interface_con.ps1

    About:
        Turn on wifi and connect to an SSID for internet.
        Or Turn off wifi
    Git:
        https://gist.github.com/mezcel/34895a5ae768873a26e762e068394a84#file-interface_con-ps1
#>

## External argument inputs
#param( $flagArg, $ssidArg )
$flagArg=""
$ssidArg=""

function testPing {
    Start-Sleep 2
    $pingAddr = "google.com"
    Write-Host "`nPinging $pingAddr ...`n" -ForegroundColor Cyan
    $pingPass = Test-Connection -ComputerName $pingAddr -Count 3 -Quiet

    if ( $pingPass ) {
        Write-Host " Ping Pass`n" -ForegroundColor Green
    } else {
        Write-Host " Ping Fail`n" -ForegroundColor Red
    }

    return $pingPass
}

function ssidPicker {
    ## grep and select a deteted ssid
    Write-Host "Available SSID's:" -ForegroundColor DarkYellow
    $ssidList = netsh wlan show network | Select-String "SSID"
    $listLength = $ssidList.length

    if ( $listLength -gt 0 ) {

        for ($i=1; $i -le $listLength; $i++) {
            $ssidString = $ssidList[$i-1]
            Write-Host "`t$ssidString"  -ForegroundColor Yellow
        }

        $idx = Read-Host "`nSelect an SSID No [ 1 - $listLength ] "
        $idx=$idx-1

        $selectedSsid = $ssidList[$idx]
        $selectedSsid = ($selectedSsid -split ": ")[1]

        Write-Host "`nYou selected: $selectedSsid" -ForegroundColor Green
        Write-Host " Connecting ...`n" -ForegroundColor Cyan

        netsh wlan connect name=$selectedSsid
        testPing

    }
}

function wifiStatus {
    ## View list of avilable wifi net adapters (Typically most Win10 computers have 1 Wi-Fi)
    Get-NetAdapter | SELECT Name, InterfaceDescription, Status | WHERE Name -eq Wi-Fi

    ## check if Status is up
    $statusQuery = Get-NetAdapter | SELECT Name, Status | WHERE Name -eq Wi-Fi
    $statusString = $statusQuery.Status

    if ( $statusString -ne "Up" ) {
        ## Redundant double check
        ## Enable Wifi adapter if NIC is manually turned on allready
        Enable-NetAdapter -Name "Wi-Fi" -Confirm:$false
        Start-Sleep 3
        $statusQuery = Get-NetAdapter | SELECT Name, Status | WHERE Name -eq Wi-Fi
        $statusString = $statusQuery.Status
        if ( $statusString -ne "Up" ) {
            Write-Host "NetAdapter status is $statusString" -ForegroundColor Red
            Write-Host "`tManually turn on the Wireles NIC and try this script again." -ForegroundColor Red
            Write-Host "Tip:`n`tNavigate to Settings --> Wi-Fi settings`n" -ForegroundColor Red

            $yn = Read-Host "Do you want to automatically navigate to and open the Wi-Fi Setting now? [ y/N ]"
            if ( $yn -eq "y" ) {
                ## guidance: https://ss64.com/nt/syntax-settings.html
                Start-Process "ms-settings:network-wifi"
            }

            Write-Host "Exiting script now.`n" -ForegroundColor Green

            Exit
        }
    } else {
        Write-Host "NetAdapter status is $statusString `n" -ForegroundColor DarkYellow
    }
}

function connman () {
    ssidPicker
    wifiStatus
}

function greeting ( [string] $scriptName ) {
    Write-Host "About:`n`tConnect or disconnect to/from Wifi internet."  -ForegroundColor Magenta
    Write-Host "Flags:`n`tIf you know the SSID you want to connect to."  -ForegroundColor Magenta
    Write-Host "`tNext time use the --ssid flag to skip prompts"  -ForegroundColor Magenta
    Write-Host "`tExample:"  -ForegroundColor Magenta
    Write-Host "`t`t.\$scriptName --ssid KnownSSIDName"  -ForegroundColor Magenta
    Write-Host "Source code:`n`thttps://gist.github.com/mezcel/34895a5ae768873a26e762e068394a84#file-interface_con-ps1"  -ForegroundColor Magenta
}

function main ([string] $flagArg, [string] $ssidArg, [string] $scriptName) {
    greeting $scriptName

    $testNet = testPing
    if ( $testNet -ne "True" ) {
        ## connect
        if ( $flagArg -eq "--ssid" ) {
            ## connect to a known ssid
            Write-Host "Attempt to connect to $ssidArg ..." -ForegroundColor Cyan
            Enable-NetAdapter -Name "Wi-Fi" -Confirm:$false
            netsh wlan connect name=$ssidArg
            testPing
        } else {
            ## find an ssid to connect to
            connman
        }
    } else {
        Write-Host "You should already be connected to wifi internet." -ForegroundColor DarkYellow
        $yn = Read-Host "Disconnect from wifi? [ y/N ]"

        if ( $yn -eq "y" ) {
            ## disconnect
            netsh wlan disconnect interface="Wi-Fi"
            #Disable-NetAdapter -Name "Wi-Fi" -Confirm:$false

            Write-Host "`nWi-fi should be off now.`n" -ForegroundColor Green
        } else {
            Write-Host "You entered $yn, nothing will be done.`n" -ForegroundColor Red
        }
    }
}

##############
## Run
##############

$scriptName = $MyInvocation.MyCommand.Name
main $flagArg $ssidArg $scriptName