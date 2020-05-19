# Powershell Notes

## bash equivalents

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

| bash | Powershell | About |
| --- | --- | --- |
| command -v < prgm name > | Get-Command "< prgm name >" | is the command recognized by the terminal |
| killall < proc name > | ```Stop-Process -Name``` "< process name >" | kill process |
| shutdown now | ```shutdown``` /s /f /t 0 | shutdown |
| shutdown now | ```Stop-Computer``` | shutdown |

| bash | Powershell | About |
| --- | --- | --- |
| ifconfig | ipconfig ||
| systemctl con up | ```Enable-NetAdapter -Name``` "< my adapter >" -Confirm:$false ||
| systemctl con down | ```Disable-NetAdapter -Name``` "< my adapter >" -Confirm:$false ||