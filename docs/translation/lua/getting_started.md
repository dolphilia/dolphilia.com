# Getting started

## Welcome!

Lua is a powerful and fast programming language that is easy to learn and use and to embed into your application.

Lua is designed to be a lightweight embeddable scripting language. It is used for all sorts of applications, from games to web applications and image processing.

See the about page for a detailed description of Lua and some reasons why you should choose Lua.

See what Lua programs look and feel like in the live demo.

## Learning

A good place to start learning Lua is the book Programming in Lua, available in paperback and as an e-book. The first edition is freely available online. See also course notes based on this book.

The official definition of the Lua language is given in the reference manual.

See the documentation page and the wiki for more.

## Getting help

Our community is friendly and will most probably help you if you need. Just visit the mailing list, the chat room, and stackoverflow.

If you need help in Portuguese, join the Lua BR mailing list and visit pt.stackoverflow.

See also the FAQ, the community-maintained wiki and LuaFaq, and the much longer uFAQ.

## Tools

If you need to complement the standard Lua libraries to handle more complex tasks, visit LuaRocks, the main repository of Lua modules. See also Awesome Lua, a curated list of quality Lua packages and resources. The lua-users wiki lists many user-contributed addons for Lua.

## Supporting

You can help to support the Lua project by buying a book published by Lua.org and by making a donation.

You can also help to spread the word about Lua by buying Lua products at Zazzle.

## Installing

Use the live demo to play with Lua if you don't want to install anything on your computer.

To run Lua programs on your computer, you'll need a standalone Lua interpreter and perhaps some additional Lua libraries. Pre-compiled Lua libraries and executables are available at LuaBinaries. Use your favorite text editor to write your Lua programs. Make sure to save your programs as plain text. If you want an IDE, try ZeroBrane Studio.

If you use Linux or macOS, Lua is either already installed on your system or there is a Lua package for it. Make sure you get the latest release of Lua (currently 5.4.6).

Lua is also quite easy to build from source, as explained below.

### Building from source

Lua is very easy to build and install. Just download it and follow the instructions in the package.

Here is a simple terminal session that downloads the current release of Lua and builds it in a Linux system:

curl -L -R -O https://www.lua.org/ftp/lua-5.4.6.tar.gz
tar zxf lua-5.4.6.tar.gz
cd lua-5.4.6
make all test
If you don't have curl, try wget.
If you use Windows and want to build Lua from source, there are detailed instructions in the wiki.

### Embedding

To embed Lua into your C or C++ program, you'll need the Lua headers to compile your program and a Lua library to link with it. If you're getting a ready-made Lua package for your platform, you'll probably need the development package as well. Otherwise, just download Lua and add its source directory to your project.