#
## install-nodejs-win10.ps1
#

# Download the Nodjs installer

$arch = $env:PROCESSOR_ARCHITECTURE
$length = $arch.length
$archNo = $arch.substring($length -2)

if ( $archNo == "64" ) {
	$url = "https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi"
} else {
	$url = "https://nodejs.org/dist/v12.16.3/node-v12.16.3-x86.msi"
}

write-host "Downloading NodeJS ...`n`t$url"
$outputFile = Split-Path $url -leaf

$output = "C:\Users\$env:UserName\Downloads\$outputFile"
$output = "$env:UserProfile\Downloads\$outputFile"

Invoke-WebRequest -Uri $url -OutFile $output

$yn = Read-Host "`nDo you want to install $outputFile ? [ y/N ]"

if ( $yn = "y" ) {
	## if file exists, then do the do
	if ( Test-Path -Path $output -PathType Leaf ) {
		write-host "`ninstalling $output ...`n"
		Start-Process -FilePath $output
	} else {
		downloadNodejs
		Start-Process -FilePath $output
	}
}
write-host "`nDone."
write-host "Press any key to continue..."
[void][System.Console]::ReadKey($true)