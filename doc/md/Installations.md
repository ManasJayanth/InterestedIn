# Node.js
Node.js can be installed from a package managaer or built from source

#### Linux (DEB based)

     sudo apt-get install nodejs

#### Linux (RPM based)
     
     sudo yum install nodejs


#### OSX

     brew install node

The official also site provides [binaries](http://nodejs.org/download/) for download.

#### Windows
Windows doesn't have a package manager as sophisticated as Ubuntu. [Chocolately](http://chocolatey.org/) can however be used.

    C:\> cinst nodejs.install
	
The official site provides [binaries](http://nodejs.org/download/) for download as well.

#### From source
Download the source from the official website and extract it. Make
sure you have Python 2.6 or 2.7 before you begin.

Run the following from the directory

    ./config
    make
    sudo make install

# Mongoose
Older version of node.js may give the following error after installing
latest mongoose (as of this writing 3.8.6). This problem is discussed
[here](https://github.com/mongodb/js-bson/issues/58)

This problem can be solved by building the latest node (0.10.25)
from source. Then run the following

    npm cache clean
    rm -rf node_modules
    npm install mongoose --save-dev

Use the --save-dev option to add mongoose to package.json (if you have one)

# Bower
Bower is a front-end package management tool used for generic package
management. Developed by twitter, Bower runs over Git, and is
package-agnostic. A packaged component can be made up of any type of
asset, and use any type of transport (e.g., AMD, CommonJS, etc.).

    npm install -g bower
