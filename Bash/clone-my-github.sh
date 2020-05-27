#!/bin/bash

## my bonzai tree Github hosted apps
mkdir -p  ~/github/mezcel/
mkdir -p  ~/gist.github/mezcel/

## Pull any existing Github repos
echo -e "\nPull Gist repos\n"
for filename in ~/github/mezcel/*
do
    echo Pulling $filename
    cd $filename
    git pull
    cd ../
done

## Pull any existing Gist repos
echo -e "\nPull Github repos\n"
for filename in ~/gist.github/mezcel/*
do
    echo Pulling $filename
    cd $filename
    git pull
    cd ../
done

## Major repos
echo -e "\nClone Github repos\n"

git clone https://github.com/mezcel/electron-container.git ~/github/mezcel/electron-container.git
git clone https://github.com/mezcel/printf-time.git ~/github/mezcel/printf-time.git
git clone https://github.com/mezcel/jq-tput-terminal.git ~/github/mezcel/jq-tput-terminal.git
#git clone https://github.com/mezcel/carousel-score.git ~/github/mezcel/carousel-score.git
git clone https://github.com/mezcel/python-curses.git ~/github/mezcel/python-curses.git
#git clone https://github.com/mezcel/catechism-scrape.git ~/github/mezcel/catechism-scrape.git
#git clone https://github.com/mezcel/wicked-curse.git ~/github/mezcel/wicked-curse.git
git clone https://github.com/mezcel/simple-respin.git ~/github/mezcel/simple-respin.git
git clone https://github.com/mezcel/terminal-profile.git ~/github/mezcel/terminal-profile.git
git clone https://github.com/mezcel/keyboard-layout.git ~/github/mezcel/keyboard-layout.git
git clone https://github.com/mezcel/bookmark-renderer.git ~/github/mezcel/bookmark-renderer.git

## hidden repos

#git clone https://github.com/mezcel/scrapy-spider.git ~/github/mezcel/scrapy-spider
#git clone https://github.com/mezcel/adeptus-mechanicus-stc.git ~/github/mezcel/drone-rpg

## Gists Notes
echo -e "\nClone Gist repos\n"

git clone https://gist.github.com/eab7764d1f9e67d051fd59ec7ce3e066.git ~/gist.github/mezcel/git-notes.gist
#git clone https://gist.github.com/64db9afd5419e557c0ee53ed935d516e.git ~/gist.github/mezcel/my-screen-gama
#git clone https://gist.github.com/8ac1119e0bb94c581128184d332beee4.git ~/gist.github/mezcel/scrapy-help
git clone https://gist.github.com/c90ce696785821d1921f8c2104fb60d3.git ~/gist.github/mezcel/stations.gist
git clone https://gist.github.com/72730d0c2f8cd8b7e0491188df6fa0f0.git ~/gist.github/mezcel/tmux-notes.gist
git clone https://gist.github.com/7293290230cda8dc69d1ad0a67ad4250.git ~/gist.github/mezcel/vim-notes.gist
git clone https://gist.github.com/7bf48505cc0440f7a5ff08340ecb24bd.git ~/gist.github/mezcel/atomio-notes.gist
git clone https://gist.github.com/62f85669d9d901d364f3779198e1f5b6.git ~/gist.github/mezcel/c-snipits.gist
git clone https://gist.github.com/f374a42c197ba9d2d41cd1d6b95f9496.git ~/gist.github/mezcel/tmp-gist.gist
git clone https://gist.github.com/2cc404f78d2488f02394c81d30047b2d.git ~/gist.github/mezcel/nodejs-notes.gist
git clone https://gist.github.com/fa9f298a0e02ff8f7afa02b05f2804f8.git ~/gist.github/mezcel/python-notes.gist
git clone https://gist.github.com/34895a5ae768873a26e762e068394a84.git ~/gist.github/mezcel/powershell-notes.gist
git clone https://gist.github.com/4be2de2cb400dd7f781c721c19e3b99b.git ~/gist.github/mezcel/vscode-notes.gist
