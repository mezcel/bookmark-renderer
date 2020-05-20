# Powershell Notes

Menu:

1. [Aliases](#aliases)
2. [Processes](#processes)
3. [System](#system)
    * [Enable PS scripts](#enable-ps-scripts)
    * [Settings browser](#settings-browser)
4. [Extras](#extras)
    * [Curl Weather](#curl-weather)

---

## Aliases

| bash | Powershell | About |
| --- | --- | --- |
| touch | ```New-Item -Path``` "< path to file >" ```-ItemType File``` | new file |
| mkdir | ```New-Item -Path``` "< path to dir >" ```-ItemType Directory```  | new dir |
| rm | ```Remove-Item -Path``` "< path to file/dir >" | remove file/dir |
| mv | ```Move-Item -Path``` "< source path > " ```-Destination``` "< destination path >" | move |
| mv | ```Rename-Item -Path``` "< original file path >" ```-NewName``` "< new file name >"| rename |
| rm | ```Remove-Item -Path``` "< path >" | del file/dir |
| rm -rf | ```Remove-Item -Path``` "< path >" ```-Recurse``` | del file/dir recursively|
| cp | ```Copy-Item -Path``` "< source path >" ```-Destination``` "< destination path >" | copy |
| ls -al | ```Get-ChildItem -Force``` "< dir >" | ```-Force``` shows hidden files too|
| ls | ```Get-ChildItem -Force``` "< dir >" ```-Recurse``` |  all subfolders and their content |
| ```echo``` "text to add" ```>>``` < your file > | ```Add-Content``` "text to add" < your file > | append text to file |
| echo " " | ```Write-Host``` " " | echo|
| less | ```Get-Content -Path``` < file path > | view text file contents |
| grep | ```Select-String -Pattern``` < search chars > | return records containing strings|
| \n | `n | new line|
| \t | `t | tab|
| && |-and | and |
| \|\| | -or | or |

---

## Processes

| bash | Powershell | About |
| --- | --- | --- |
| command -v < prgm name > | Get-Command "< prgm name >" | is the command recognized by the terminal |
| killall < proc name > | ```Stop-Process -Name``` "< process name >" | kill process |
| shutdown now | ```shutdown``` /s /f /t 0 | shutdown |
| shutdown now | ```Stop-Computer``` | shutdown |

---

## System

| bash | Powershell | About |
| --- | --- | --- |
| ifconfig | ipconfig ||
| systemctl con up | ```Enable-NetAdapter -Name``` "< my adapter >" -Confirm:$false ||
| systemctl con down | ```Disable-NetAdapter -Name``` "< my adapter >" -Confirm:$false ||

---

### Enable PS scripts
```ps1
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Settings browser
[guidance](https://ss64.com/nt/syntax-settings.html)
```ps1
## wifi configs
Start-Process "ms-settings:network-wifi"

## developers configs
Start-Process "ms-settings:developers"

## win10 update
Start-Process "ms-settings:windowsupdate"
```

---

# Extras

## Curl Weather

```ps1
## Region
(curl http://wttr.in/NewYork -UserAgent "curl" ).Content

## city
(curl http://wttr.in/"my_city,my_state" -UserAgent "curl" ).Content

## Moon
(curl wttr.in/Moon -UserAgent "curl" ).Content
```