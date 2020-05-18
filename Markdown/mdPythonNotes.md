# Python Notes

> under construction

* [python2 documentation](https://docs.python.org/2/contents.html)
    * [math](https://docs.python.org/3/library/math.html)



## Install Python Platform

[https://www.python.org/downloads](https://www.python.org/downloads/)

There are some differences between Python v2.x and Python v3.x regarding parsing ```.json```, so I included both techniques within the code.


### Win10

I just use [Python 2.7.x](https://www.python.org/downloads/release/python-2717/) from [python.org](https://www.python.org/downloads/windows/), but it also works on the latest Python 3.7.x

For runtime convenience, install "with environment variables" selected.

Install curses library:

```sh
## python package
pip install --upgrade pip
python -m pip install windows-curses
```


## Package a standalone executable

* [distutils](https://docs.python.org/3/distutils/builtdist.html), python3

* [pyinstaller](https://pypi.org/project/PyInstaller/), linux

* [py2exe](https://pypi.org/project/py2exe/), win10

---

# Code Examples

while loop
```py
count = 0
while ( count < 3 ):
    count = count + 1
    print(count)
else:
    print("other than count is less than 3")
```

for loop

```py
n = 3
for i in range(0, n+1):
    print(i)

arr=["hello", "world", "hello world"]
for i in arr:
    print(i)
```

use python to navigate the file system

```py
import os
import subprocess

currdir = os.getcwd()
print(currdir)
```