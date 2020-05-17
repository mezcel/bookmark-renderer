<#
    clone-my-gist-notes.ps1
    Clone my gist notes
    https://gist.github.com/mezcel
#>

function greetings {
    Write-Host "`nAbout:" -ForegroundColor Cyan
    Write-Host "`tUpdate local gist repos from https://gist.github.com/mezcel" -ForegroundColor Cyan
    Write-Host "`tand clone repos that are not on local machine" -ForegroundColor Cyan
    Write-Host "`tsource:`n`thttps://gist.github.com/mezcel/34895a5ae768873a26e762e068394a84#file-clone-my-gist-notes-ps1" -ForegroundColor Cyan
    Start-Sleep 2
}

function dependencyCheck {
    ## Check if git is installed
    if ( Get-Command git -ErrorAction 'SilentlyContinue' ) {
        Write-Host "`nGit is installed`n`tGood." -ForegroundColor Green
    } else {
        Write-Host "`nGit is NOT installed`n`tInstall Git and try again." -ForegroundColor Red
        Write-Host "Done." -ForegroundColor Green
        Exit
    }

    ## Check internet connectivity
    $pingPass = Test-Connection -ComputerName "google.com" -Count 3 -Quiet
    if ( $pingPass ) {
        Write-Host "`nInternet Works.`n`tGood." -ForegroundColor Green
    } else {
        Write-Host "`nPing failed.`n`tGet online and try again." -ForegroundColor Red
        Write-Host "Done." -ForegroundColor Green
        Exit
    }
}

function cloneGists {
    ## Make gist dir if needed
    $myGistDir = "C:$env:HOMEPATH\gist.github\mezcel"
    #$myGistDir = "~\gist.github\mezcel"
    New-Item -ItemType Directory -Force -Path $myGistDir
    Start-Sleep 1

    Write-Host "`nCloneing gists.`n" -ForegroundColor Cyan

    ## Clone gists if they do not exist

    git clone https://gist.github.com/eab7764d1f9e67d051fd59ec7ce3e066.git "$myGistDir\git-notes.gist"
    git clone https://gist.github.com/c90ce696785821d1921f8c2104fb60d3.git "$myGistDir\stations.gist"
    git clone https://gist.github.com/72730d0c2f8cd8b7e0491188df6fa0f0.git "$myGistDir\tmux-notes.gist"
    git clone https://gist.github.com/7293290230cda8dc69d1ad0a67ad4250.git "$myGistDir\vim-notes.gist"
    git clone https://gist.github.com/7bf48505cc0440f7a5ff08340ecb24bd.git "$myGistDir\atomio-notes.gist"
    git clone https://gist.github.com/62f85669d9d901d364f3779198e1f5b6.git "$myGistDir\c-snipits.gist"
    git clone https://gist.github.com/f374a42c197ba9d2d41cd1d6b95f9496.git "$myGistDir\tmp-gist.gist"
    git clone https://gist.github.com/2cc404f78d2488f02394c81d30047b2d.git "$myGistDir\nodejs-notes.gist"
    git clone https://gist.github.com/fa9f298a0e02ff8f7afa02b05f2804f8.git "$myGistDir\python-notes.gist"
    git clone https://gist.github.com/34895a5ae768873a26e762e068394a84.git "$myGistDir\powershell-notes.gist"
    git clone https://gist.github.com/4be2de2cb400dd7f781c721c19e3b99b.git "$myGistDir\vscode-notes.gist"
    git clone https://gist.github.com/247eda1319b9e1815cad7b955fdcc379.git "$myGistDir\notepadpp-notes.gist"

    Write-Host "`nDone cloneing gists." -ForegroundColor Cyan
}

function cloneGithub {
    ## Make gist dir if needed
    $myGistDir = "C:$env:HOMEPATH\github\mezcel"
    #$myGistDir = "~\github\mezcel"
    New-Item -ItemType Directory -Force -Path $myGistDir
    Start-Sleep 1

    Write-Host "`nCloneing github.`n" -ForegroundColor Cyan

    ## Clone gists if they do not exist

    git clone https://github.com/mezcel/electron-container.git "$myGistDir\electron-container.git"
    git clone https://github.com/mezcel/printf-time.git "$myGistDir\printf-time.git"
    git clone https://github.com/mezcel/jq-tput-terminal.git "$myGistDir\jq-tput-terminal.git"
    #git clone https://github.com/mezcel/carousel-score.git "$myGistDir\carousel-score.git"
    git clone https://github.com/mezcel/python-curses.git "$myGistDir\python-curses.git"
    #git clone https://github.com/mezcel/catechism-scrape.git "$myGistDir\catechism-scrape.git"
    git clone https://github.com/mezcel/wicked-curse.git "$myGistDir\wicked-curse.git"
    git clone https://github.com/mezcel/simple-respin.git "$myGistDir\simple-respin.git"
    git clone https://github.com/mezcel/terminal-profile.git "$myGistDir\terminal-profile.git"
    git clone https://github.com/mezcel/keyboard-layout.git "$myGistDir\keyboard-layout.git"
    #git clone https://github.com/mezcel/bookmark-renderer.git "$myGistDir\bookmark-renderer.git"

    Write-Host "`nDone cloneing github." -ForegroundColor Cyan
}

function pullRepos ( [string] $myGistDir ) {

    Write-Host "`nPulling $myGistDir repos.`n" -ForegroundColor Cyan

    ## Array of Dirs present in repo dir
    $repoArr = Get-ChildItem -Path $myGistDir | Where-Object { $_.PSIsContainer } | Foreach-Object { $_.Name }

    ## Perform a pull on every repo
    for ( $i = 0; $i -lt $repoArr.length; $i++ ) {
        $repo = $repoArr[$i].ToString()
        $repoPath = "$myGistDir\$repo"

        ## repo to update
        Write-Host $repo -ForegroundColor Magenta
        ## cd into repo
        Set-Location -Path $repoPath

        git pull
    }

    Write-Host "`nDone pulling $myGistDir repos.`n" -ForegroundColor Cyan
}

function pullGists {
    ## Make gist dir if needed
    $myGistDir = "C:$env:HOMEPATH\gist.github\mezcel"
    New-Item -ItemType Directory -Force -Path $myGistDir
    Start-Sleep 1

    $currentDir = (Get-Item -Path ".\").FullName

    pullRepos $myGistDir

    ## cd back to working dir
    Set-Location -Path $currentDir
}

function pullGithub {
    ## Make gist dir if needed
    $myGithubDir = "C:$env:HOMEPATH\github\mezcel"
    New-Item -ItemType Directory -Force -Path $myGithubDir
    Start-Sleep 1

    $currentDir = (Get-Item -Path ".\").FullName

    pullRepos $myGithubDir

    ## cd back to working dir
    Set-Location -Path $currentDir
}

function main {
    greetings
    dependencyCheck

    pullGists
    cloneGists

    pullGithub
    cloneGithub
}

##############
## Run
##############

main
