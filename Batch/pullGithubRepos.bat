::
:: pullGithubRepos.bat
::

@ECHO off

:batScript

set homeDir=%USERPROFILE%
set homeGithub=%USERPROFILE%\github\mezcel
set homeGist=%USERPROFILE%\gist.github\mezcel

if not exist %homeGithub% NUL ( mkdir %homeGithub% )
if not exist %homeGist% NUL ( mkdir %homeGist% )

:pullRepos
    ECHO.
    ECHO Pull gist.github.com/mezcel
    ECHO.
    :: Pull Existing Gists
    for /f %%f in ('dir /ad /b %homeGist%') do cd /d %homeGist%\%%f & call git pull & cd ..

    ECHO.
    ECHO Pull github.com/mezcel
    ECHO.
    :: Pull Existing Github Repo
    for /f %%f in ('dir /ad /b %homeGithub%') do cd /d %homeGithub%\%%f & call git pull & cd ..

:cloneGists
    ECHO.
    ECHO Clone gist.github.com/mezcel
    ECHO.
    git clone https://gist.github.com/eab7764d1f9e67d051fd59ec7ce3e066.git "%homeGist%\git-notes.gist"
    git clone https://gist.github.com/c90ce696785821d1921f8c2104fb60d3.git "%homeGist%\stations.gist"
    git clone https://gist.github.com/72730d0c2f8cd8b7e0491188df6fa0f0.git "%homeGist%\tmux-notes.gist"
    git clone https://gist.github.com/7293290230cda8dc69d1ad0a67ad4250.git "%homeGist%\vim-notes.gist"
    git clone https://gist.github.com/7bf48505cc0440f7a5ff08340ecb24bd.git "%homeGist%\atomio-notes.gist"
    git clone https://gist.github.com/62f85669d9d901d364f3779198e1f5b6.git "%homeGist%\c-snipits.gist"
    git clone https://gist.github.com/f374a42c197ba9d2d41cd1d6b95f9496.git "%homeGist%\tmp-gist.gist"
    git clone https://gist.github.com/2cc404f78d2488f02394c81d30047b2d.git "%homeGist%\nodejs-notes.gist"
    git clone https://gist.github.com/fa9f298a0e02ff8f7afa02b05f2804f8.git "%homeGist%\python-notes.gist"
    git clone https://gist.github.com/34895a5ae768873a26e762e068394a84.git "%homeGist%\powershell-notes.gist"
    git clone https://gist.github.com/4be2de2cb400dd7f781c721c19e3b99b.git "%homeGist%\vscode-notes.gist"
    git clone https://gist.github.com/247eda1319b9e1815cad7b955fdcc379.git "%homeGist%\notepadpp-notes.gist"
    git clone https://gist.github.com/b6be6bd5bd78d20bbd51af94af4d6ad4.git "%homeGist%\golang-notes.gist"
    git clone https://gist.github.com/22682a865a4e9d8a2c02877cf1cb7374.git "%homeGist%\ProjectEuler.gist"
    git clone https://gist.github.com/ff833a444f2671879b22e76aa4ed61c5.git "%homeGist%\alpine-notes.gist"
    git clone https://gist.github.com/c8d4759203ce958692fc960b92eda960.git "%homeGist%\tc-notes.gist"
    git clone https://gist.github.com/a08c54294ff806d52cd722ed786bcf9e.git "%homeGist%\fl11-theme.gist"
    git clone https://gist.github.com/508c384d9200933761fa8ecbc4f4698c.git "%homeGist%\cache-todo.gist

:cloneGithubs
    ECHO.
    ECHO Clone github.com/mezcel
    ECHO.
    git clone https://github.com/mezcel/electron-container.git "%homeGithub%\electron-container.git"
    git clone https://github.com/mezcel/printf-time.git "%homeGithub%\printf-time.git"
    git clone https://github.com/mezcel/jq-tput-terminal.git "%homeGithub%\jq-tput-terminal.git"
    ::git clone https://github.com/mezcel/carousel-score.git "%homeGithub%\carousel-score.git"
    git clone https://github.com/mezcel/python-curses.git "%homeGithub%\python-curses.git"
    ::git clone https://github.com/mezcel/catechism-scrape.git "%homeGithub%\catechism-scrape.git"
    git clone https://github.com/mezcel/wicked-curse.git "%homeGithub%\wicked-curse.git"
    git clone https://github.com/mezcel/simple-respin.git "%homeGithub%\simple-respin.git"
    git clone https://github.com/mezcel/terminal-profile.git "%homeGithub%\terminal-profile.git"
    git clone https://github.com/mezcel/keyboard-layout.git "%homeGithub%\keyboard-layout.git"
    git clone https://github.com/mezcel/bookmark-renderer.git "%homeGithub%\bookmark-renderer.git"
    git clone https://github.com/mezcel/struct-fmt.git "%homeGithub%\struct-fmt.git"

:EOF
    ECHO.
    ECHO Done pulling repos.
