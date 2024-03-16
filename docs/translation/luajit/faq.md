# Frequently Asked Questions (FAQ)

Q: Where can I learn more about LuaJIT and Lua?
The LuaJIT mailing list focuses on topics related to LuaJIT.
News about Lua itself can be found at the Lua mailing list. The mailing list archives are worth checking out for older postings about LuaJIT.
The main Lua.org site has complete documentation of the language and links to books and papers about Lua.
The community-managed Lua Wiki has information about diverse topics.
Q: Where can I learn more about the compiler technology used by LuaJIT?
Please use the following Google Scholar searches to find relevant papers:
Search for: Trace Compiler
Search for: JIT Compiler
Search for: Dynamic Language Optimizations
Search for: SSA Form
Search for: Linear Scan Register Allocation
Here is a list of the innovative features in LuaJIT.
And, you know, reading the source is of course the only way to enlightenment.
Q: Sometimes Ctrl-C fails to stop my Lua program. Why?
The interrupt signal handler sets a Lua debug hook. But this is ignored by compiled code. If your program is running in a tight loop and never falls back to the interpreter, the debug hook never runs and can't throw the "interrupted!" error.
You have to press Ctrl-C twice to stop your program. That's similar to when it's stuck running inside a C function under the Lua interpreter.
Q: Table iteration with pairs() does not result in the same order?
The order of table iteration is explicitly undefined by the Lua language standard.
Different Lua implementations or versions may use different orders for otherwise identical tables. Different ways of constructing a table may result in different orders, too.
Due to improved VM security, LuaJIT 2.1 may even use a different order on separate VM invocations or when string keys are newly interned.

If your program relies on a deterministic order, it has a bug. Rewrite it, so it doesn't rely on the key order. Or sort the table keys, if you must.
Q: Can Lua code be safely sandboxed?
Maybe for an extremely restricted subset of Lua and if you relentlessly scrutinize every single interface function you offer to the untrusted code.
Although Lua provides some sandboxing functionality (setfenv(), hooks), it's very hard to get this right even for the Lua core libraries. Of course, you'll need to inspect any extension library, too. And there are libraries that are inherently unsafe, e.g. the FFI library.
More reading material at the Lua Wiki and Wikipedia.

Relatedly, loading untrusted bytecode is not safe!
It's trivial to crash the Lua or LuaJIT VM with maliciously crafted bytecode. This is well known and there's no bytecode verification on purpose, so please don't report a bug about it. Check the mode parameter for the load*() functions to disable loading of bytecode.

In general, the only promising approach is to sandbox Lua code at the process level and not the VM level.
Q: Lua runs everywhere. Why doesn't LuaJIT support my CPU?
Because it's a compiler — it needs to generate native machine code. This means the code generator must be ported to each architecture. And the fast interpreter is written in assembler and must be ported, too. This is quite an undertaking.
The install documentation shows the supported architectures.
Other architectures may follow based on sufficient user demand and market-relevance of the architecture. Sponsoring is required to develop the port itself, to integrate it and to continuously maintain it in the actively developed branches.