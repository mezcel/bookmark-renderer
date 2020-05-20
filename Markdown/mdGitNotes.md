# Git Notes

## Cheat Sheet

### server:

Configuring your server repo

```sh
## Set up Git ssh/sftp server on LAN
# git daemon --export-all --base-path=. --reuseaddr --verbose

## perform both read/write the server repo
## the magic word being '--enable=receive-pack'
git daemon --base-path=. --export-all --enable=receive-pack --reuseaddr --informative-errors --verbose

## [...] Ready to rumble
## Ctrl + C to end service
```

### client:

configuring your client repo

```sh
# client side LAN git sharing
git clone git://192.168.xxx.x/ my-whatever-dir-folder

# go ahead and name a personalized client branch for yourself. this avoids ambiguity in a whole lot of ways.
```

---

## win10 GitBash workarounds

Not real a workaround, it's just stuff you need to do with LAN/Ad-Hoc peer-to-peer share (push, fetch, pull)

### push from win10

```sh
# Win10 has default firewall security settings.
# Make sure TCP port: 9418 is accessable at the time when you want GitBash to perform Daemon Services

# Make sure your do this or the 'transfer' will hang when you push
# do this on both client and server, but most relevant for the client. The client is going to need it push back to its server.
git config --global sendpack.sideband false
```

---

# Sharing A Git Repo Within A Private Network

#### Identify available Server/Client IP's within the same network hub

CMD

```bat
REM View IP's on network hub from a Win10 CMD
arp -a
```

Bash

```sh
# View IP's on network hub from a Linux Terminal
nmap sP 192.168.0.*
```
---

## Git daemon Service

Task | Git Script | Guidance
--- | --- | ---
Clone from a Git daemon repo | ```git clone git://10.42.0.1/ dirName``` | git://desired-server-ip
Git daemon host | ```git daemon --base-path=. --export-all --enable=receive-pack --reuseaddr --informative-errors --verbose``` | LAN or Ad-hoc server
Enable daemon push/pull | ```git config --global sendpack.sideband false``` | Allow daemon host to receive push back from client
Resolve push/pull conflicts | ```git reset --hard HEAD``` | reorient path mismatches caused by using roving IPs, servers, and clients
Convenient daemon Alias | ```git config --global alias.serve 'daemon --base-path=. --export-all --enable=receive-pack --reuseaddr --informative-errors --verbose'``` | define alias variable
. | ```git serve``` | start daemon service from the **serve** alias

## Common Git Tasks

#### Variable Related

Task | Script | Guidance / Instructions
--- | --- | ---
View existing remote variable |```git remote -v```|
Make a remote variable |```git remote add <my-var-name> git://10.42.0.1/```|
Change variable value of know IPs | ```git remote set-url origin <git://new.url.name>``` | **origin** is the var being changed
Remove a remote variable | ```git remote rm <my-variable>``` |
Edit global variables | ```git config --global --edit``` | this displays the config file
Unstage a file | ```git reset HEAD <file>``` | unstage file in current commit
. | ```git rm --cached <file>``` | remove file from index without removing the file
. | ```git rm <file>``` | remove file from dir and from git

#### File Stage Related

Task | Script | Guidance / Instructions
--- | --- | ---
Unstage a file | ```git reset HEAD <file>``` | unstage file in current commit
. | ```git rm --cached <file>``` | remove file from index without removing the file
. | ```git rm <file>``` | remove file from dir and from git
Reset | ```git reset <file>``` | Discard commits in a private file
. |```git reset <branch>```| remove uncommitted changes
Revert | ```git revert``` | Undo commits in a public branch
Check Out | ```git checkout <branch>``` | Switch between branches


#### Branch Related

Task | Script | Guidance / Instructions
--- | --- | ---
Make a new branch  | ```git branch <new-branch-name>```|
. |```git checkout -b <new-branch-name>```| make a new branch and checkout that branch
View all branches | ```git branch -a```|
Check out a branch  |```git checkout <my-branch-name>```|
Merge branches | ```git merge <my-branch-name>``` | merge local branch into another
Pull into a local branch | ```git pull . <my-desired-branch>``` | pull from a local branch
Delete a local branch | ```git branch -d <my-branch-name>```| On local machine
. |```git fetch --all --prune```| Prune after delete
Fetch a file from a different branch | ```git checkout <my-source-branch> -- my-file.txt``` |
Fully replace **master** branch | ```git checkout <my-branch-name>``` | step 1 of 4
. | ```git merge -s ours master``` | step 2 of 4
. | ```git checkout master``` | step 3 of 4
. | ```git merge  <my-branch-name>``` | step 4 of 4

---

## Caveat Reminders

Task | Script | Explanation
--- | --- | ---
Fetch | ```git fetch``` | retrieve file from a remote
Pull | ```git pull``` | Performs both fetch and merge

#### Merging vs Rebase

**Merging** is non-destructive and existing branches are not changed. But the branch receiving the merge will have upstream inconsistencies. Merge the history of both branches.

```sh
# feature will incorporate the latest master state
git checkout feature
git merge master

# Or
git merge master feature
```

**Rebase** Makes rewrites/replaces one branch for another. It writes your branch as the latest change on top of whatever the master initially was. The context for the changes will get lost. Interactive rebase will prompt for confirmation before removing history.

```sh
# feature will overwrite the latest master state
git checkout feature
git rebase master

# Or Interactive Rebase
git rebase -i master

# Or Interactive Rebase with a clean history, your branch history
git merge-base feature master
```

Your rebased master will have remote conflicts with the Remote Master. Force pushing overwrites the remote master branch with the rebased one from your Repo.

```sh
git push --force
```

A safe thing to do is just merge in a temporary branch and if the temp is good... do your thing.

---

## Use git between computers in the same LAN

With Git i dont need to mess arround with personalizing ```ssh``` and ```sftp``` configurations with new computers on the same network.

_Note_: Recomended for peer to peer. Outsiders can still tamper. But... outsiders are always tampering. With read-only mode for both parties, some measure of security piece of mind can be established.

### guidance:

> http://geekaholic.github.io/blog/2012/05/14/git-on-p2p-development/
>
> https://gist.github.com/datagrok/5080545
>
> https://railsware.com/blog/2013/09/19/taming-the-git-daemon-to-quickly-share-git-repository/

### Synopsis Steps:

1. Have Git installed on server and client machines. OS does not matter, git will clear things up for you
	* __Note__: Remember to allow Git through your firewall settings on the server computer. Don't block yourself/team.

2. Connect the server and client by a common IP. Have your ip ready.
	 * Everybody needs to be clear about who they are. ex: 0.1 is not 0.100
	 * This is extra important if people want to be pushing and pulling back and forth with each other.
	 ```sh
	 	# Confirm presance of IPs on existing network
	 	# linux

		nmap sP 192.168.0.*

		# win

		arp -a
	 ```

3. Initialize the Repo you want to serve and configure the ```git daemon```

4. Pull server repo into the client via ip and make a brach. The brach will help keep all forked user organized.

5. Work within your branch and from here on out it is just like using Github. Just remember who your Server is. Your server is the host computer. That is partly why it is best practice to work within your custom branches.
