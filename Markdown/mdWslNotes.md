# WSL Notes

> under construction

## Windows Subsystem for Linux Documentation [link](https://docs.microsoft.com/en-us/windows/wsl/about)

### Enable WLS via Powershell

* must enable "Developer Mode"
    * Extra: I enable Powershell script here to enable other DIY power-user ```.ps1``` scripts

```ps1
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
```

### To use GNU Desktop GUI Apps:

* Download X Server on Win10 [xming](https://sourceforge.net/projects/xming/) or [XLaunch vcxsrv](https://sourceforge.net/projects/vcxsrv/)
* Get a Distro from the Windows Store. I prefer Debian on Win10... despite prefering Arch or Alpine on everything else.
* Tell Bash you want to run an app through the X Server

```sh
## automatically launch a DE app
## within .bashrc add

export DISPLAY=:0.0
```