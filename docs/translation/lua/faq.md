Frequently Asked Questions

Here are answers to some frequently asked questions about Lua.
For an introduction to what Lua is, see this summary or learn how to get started with Lua.
For programming questions, see the community-maintained LuaFaq and also the much longer uFAQ.

1 – Distribution
1.1 – What do I need to build Lua?
1.2 – How do I build Lua for Windows and other systems?
1.3 – When is the next version due?
1.4 – What changes will the next version bring?
1.5 – Is Lua free software?
1.6 – Is Lua compatible with GPL software?
1.7 – What do I call software derived from Lua?
1.8 – Is there a public revision control repository?
1.9 – Do you accept patches?
2 – Information
2.1 – Is there a mailing list for Lua?
2.2 – Is there a newsgroup for Lua?
2.3 – How do I report a bug in Lua?
2.4 – Who uses Lua?
2.5 – Are there any books on Lua?
2.6 – How can I help to support the Lua project?
1 – Distribution

See the download and get started pages for instructions on how to get source code and binaries for Lua.

1.1 – What do I need to build Lua?

Lua is implemented in pure ANSI C and compiles unmodified in all known platforms. All you need to build Lua is an ANSI C compiler (gcc and clang are a popular ones). Lua also compiles cleanly as C++.

If you are building Lua in a Unix system (like Linux or macOS), then you probably already have everything you need and simply typing make should do it. (You'll only have to choose a suitable platform.) Otherwise, see the next question. In any case, for full instructions see the README that comes with the distribution. Chapter 1 of the book Beginning Lua Programming contains detailed instructions for downloading, building, and installing Lua. Here are simple instructions for common platforms:

curl -L -R -O https://www.lua.org/ftp/lua-5.4.6.tar.gz
tar zxf lua-5.4.6.tar.gz
cd lua-5.4.6
make all test
If you don't have curl, try wget.
If you don't have the time or the inclination to compile Lua yourself, get a binary from LuaBinaries. If you only want to try Lua, try a live demo.

1.2 – How do I build Lua in Windows and other systems?

This depends on your compiler. Most compilers in these platforms require that you create "project" files. You'll need to create projects (or whatever your compiler uses) for building the library, the interpreter, and the compiler. The sources are all in the src directory. The exact lists of which modules should go into which project are given in the README. See also BuildingLua in the wiki. Chapter 1 of the book Beginning Lua Programming contains detailed instructions for downloading, building, and installing Lua.

If you don't have the time or the inclination to compile Lua yourself, get a binary from LuaBinaries.

1.3 – When is the next version due?

Lua is in continuous development but new versions are infrequent.

Lua 5.4.6 was released on 14 May 2023.

1.4 – What changes will the next version bring?

Lua 5.4 was released recently. For a preview of what is coming in the next version, try a work version when available.

If you're concerned with incompatibilities, you shouldn't, because we make every effort to avoid introducing any incompatibilities. When incompatibilities are unavoidable, previous code is usually supported unmodified, possibly by building Lua with a suitable compilation flag. In any case, the reference manual contains a list of incompatibilities.

1.5 – Is Lua free software?

Yes, Lua is freely available for any purpose, including commercial purposes, at absolutely no cost, and using it requires no paperwork. Read the details in the license page.

1.6 – Is Lua compatible with GPL software?

Yes. Lua is distributed under the terms of the very liberal and well-known MIT license, which is compatible with GPL and is approved by the Open Source Initiative. Read the details in the license page.

1.7 – What do I call software derived from Lua?

Lua is intended to be used in other people's software, including yours. In most cases, Lua is simply extended with new functions that adapt Lua to your specific domain. This is exactly what Lua was designed for. When the time comes to distribute your software two questions may arise: "May I still call the language inside my software Lua?" and "May I call it something else?".

The answer is the following: If the syntax and the semantics of the language (that is, the parser and the virtual machine) remain the same, then the language is still Lua. If you simply add new libraries, or even replace the standard Lua libraries with your own libraries, the language is still the same, and you don't need to (and probably shouldn't) give it a completely different name.

If you have changed the syntax or the semantics of the language, then it's probably a minor extension and you'll probably benefit from calling your language a Lua variant, so that you can refer users to existing Lua documentation and community, with the caveats relating to your extension of the language.

Usually, people use some name that has Lua as part of it (CGILua, LuaMan, LuaOrb, etc.), so that it is clear that it uses Lua but it is not the official Lua distribution. In other words, it should be very clear that your software uses Lua (or, more specifically, that the language inside your software is Lua), but also it should be clear that your software is not Lua.

In any case, please give us credit for Lua, according to the license.

If this explanation is still unclear, please contact us.

1.8 – Is there a public revision control repository?

There is a public mirror at GitHub of Lua development code, as seen by the Lua team. It contains the full history of all commits, but is mirrored irregularly. Please do not send pull requests. Send bug reports and suggestions to the mailing list. Lua is open-source software but it is not openly developed. Read this explanation.

If you want to see a preview of what is coming in the next version, you'll have to wait until a work version becomes available.

1.9 – Do you accept patches?

We encourage discussions based on tested code solutions for problems and enhancements, but we never incorporate third-party code verbatim. We always try to understand the issue and the proposed solution and then, if we choose to address the issue, we provide our own code. All code in Lua is written by us. See also the previous question.

2 – Information

Complete information on Lua can be found in its home page. You may want to read a summary first, choose an entry point from the site map, or learn how to get started with Lua.

2.1 – Is there a mailing list for Lua?

Yes, a friendly and active one called lua-l. Everyone is welcome. Read all about it here.

For discussions in Portuguese, there is Lua BR, the Brazilian version of lua-l.

2.2 – Is there a newsgroup for Lua?

No, just use the mailing list. If you want to read the postings using a web interface, visit Google Groups or see the archives at MARC. You may want also want to search the archives.

If you're looking for a Q&A forum for Lua, try stackoverflow or pt.stackoverflow.

2.3 – How do I report a bug in Lua?

First, try to make sure that you have indeed found a bug. Check whether the problem has been already reported (and probably fixed). Search the archives of the mailing list to see whether someone else has come across the same problem and have a fix or an explanation. After that research, if you still think you may have found a bug, post a report in the mailing list.

Before reporting a bug, try to identify a minimal program that exhibits the bug, also known as MWE and SSCCE. This makes it much easier to reproduce, document, and track down the bug. Also, read Simon Tatham's essay on How to Report Bugs Effectively.

2.4 – Who uses Lua?

Lua is used in many products and projects around the world, including several well-known games. The full list is too long for us to keep track. See a list of lists.

2.5 – Are there any books on Lua?

PiL4
Yes, several. See the complete list here. The book Programming in Lua is a detailed and authoritative introduction to all aspects of Lua programming written by Lua's chief architect. The fourth edition appeared in 2016 and is also available as an e-book. The first edition was published in 2003 and is freely available online. Previous editions are available in several languages. There are several books on Lua by other authors as well.

2.6 – How can I help to support the Lua project?

You can help to support the Lua project by buying a book published by Lua.org and by making a donation.

You can also help to spread the word about Lua by buying Lua products at Zazzle.