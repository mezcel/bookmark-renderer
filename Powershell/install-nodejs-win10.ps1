#
## install-nodejs-win10.ps1
#

# Download the Nodjs installer

$arch = $env:PROCESSOR_ARCHITECTURE
$length = $arch.length
$archNo = $arch.substring($length -2)

if ( $archNo = "64" ) {
	$url = "https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi"
} else {
	$url = "https://nodejs.org/dist/v12.16.3/node-v12.16.3-x86.msi"
}

write-host "Downloading NodeJS ...`n`t$url" -ForegroundColor Magenta
$outputFile = Split-Path $url -leaf

$output = "C:\Users\$env:UserName\Downloads\$outputFile"
$output = "$env:UserProfile\Downloads\$outputFile"

## Commence Download
Invoke-WebRequest -Uri $url -OutFile $output

write-host "`nDone.`n`tCheck $output if the executable did not automatically run." -ForegroundColor Green
write-host "Press any key to continue..." -ForegroundColor Green
[void][System.Console]::ReadKey($true)