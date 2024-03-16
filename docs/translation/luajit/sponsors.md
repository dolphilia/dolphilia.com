# LuaJIT Sponsorship Program

LuaJIT is open source software and depends on your contributions! This may be in the form of bug reports, bug fixes and patches — see the Github issue tracker. Another option is to financially support the project through corporate sponsorship.
Please note: The main LuaJIT author (Mike Pall) is working on unrelated projects and cannot accept bigger sponsorships at this time. But other community members may be open to sponsorship offers — please ask on the LuaJIT mailing list for any takers.
List of Previous Sponsorships

Date	Sponsorship	Sponsors	Status
2009-12	x64 port	Various, see below	✔ Complete
2010-08	PPC/e500 port (interp.)	Anon. corporate sponsor	✔ Complete
2011-01	ARM port	QUALCOMM Inc.	✔ Complete
2011-06	Bytecode load/save	Gehtsoft USA, LLC	✔ Complete
2011-07	PPC port	Anon. corporate sponsor	✔ Complete
2011-10	MIPS port	MIPS Technologies, Inc.	✔ Complete
2011-11	FFI callbacks	Neomantra Corp	✔ Complete
2012-03	Alloc/store sinking	Anon. corporate sponsor	✔ Complete
2012-05	ARM VFP + hard-float	Anon. corporate sponsor	✔ Complete
2012-11	LuaJIT 2.0 completion	Snabb	✔ Complete
2013-03	64 bit bitwise ops	Anon. corporate sponsor	✔ Complete git v2.1
2013-04	Performance	CloudFlare	✔ Complete git v2.1
2013-06	Low-overhead Profiling	GIANTS Software GmbH	✔ Complete git v2.1
2014-12	ARM64 interpreter	Anon. corporate sponsor	✔ Complete git v2.1
2015-08	MIPS32 soft-float	Cisco Systems, Inc.	✔ Complete git v2.1
2016-05	MIPS64	Cisco Systems, Inc.	✔ Complete git v2.1
2016-07	ARM64 JIT compiler	Cisco & Linaro	✔ Complete git v2.1
2017-07	PPC soft-float	Cisco Systems, Inc.	✔ Complete git v2.1
2019-12	MIPS64 r6 port	Wave Computing	✔ Complete git v2.1
2021-03	String buffers	fmad engineering llc	✔ Complete git v2.1
2021-08	Table traversal	OpenResty Inc.	✔ Complete git v2.1
Sponsorship to compile table traversal
OpenResty Inc. has sponsored JIT-compilation of Lua table traversal, i.e. next(), pairs() and the accompanying optimized bytecodes.
Sponsorship for string buffers
fmad engineering llc has sponsored the development of the string buffer library. The string buffer library allows high-performance manipulation of string-like data. It also includes a high-performance serializer for Lua objects.
Sponsorship for MIPS64 r6 port
Wave Computing has sponsored the MIPS64 r6 ISA variant of the existing MIPS port. The work has been carried out by Wave Computing and RT-RK.
Sponsorship for PPC soft-float support
Cisco Systems, Inc. has sponsored the development of a soft-float variant of the existing PPC port. The work has been carried out by RT-RK.
Sponsorship for ARM64 JIT compiler
Cisco Systems, Inc. and Linaro have sponsored the development of the JIT compiler backend for the ARM64 port. The work has been carried out by RT-RK, Linaro and ARM.
Sponsorship for MIPS64 port
Cisco Systems, Inc. has sponsored the development of a MIPS64 port (hard-float + soft-float). The work has been carried out by RT-RK.
MIPS32 dual-number + soft-float support
The existing MIPS port of LuaJIT requires a hardware FPU, but many embedded devices based on MIPS CPUs don't have (nor need) one. Since only single-number mode is supported, even FPU emulation in the kernel would be unacceptably slow.
Cisco Systems, Inc. has sponsored the development of the missing dual-number + soft-float functionality for the existing MIPS32 port. The work has been carried out by RT-RK.
With these changes, the MIPS port of LuaJIT can now be used on many more MIPS devices, from tiny routers up to high-performance FPU-less MIPS SoCs.
Low-overhead profiling
GIANTS Software GmbH has sponsored the development of a low-overhead profiling functionality for LuaJIT 2.1 in June 2013. GIANTS Software develops a variety of simulation games for desktop, mobile and consoles. These games make extensive use of Lua for scripting and modding. Switching to LuaJIT was instrumental in reducing the CPU load and sustaining the required frame rates on all platforms.
Performance improvements
CloudFlare Inc. is sponsoring various performance improvements for LuaJIT 2.1, starting in April 2013. CloudFlare is operating one of the world's largest deployments of nginx + LuaJIT. At this scale, every fraction of a microsecond that can be shaved off for processing a request has a significant impact.
Compared to LuaJIT 2.0, more built-ins and bytecodes are now compiled and optimized. Many operations on strings are now improved, too.
Sponsorship for 64 bit bitwise operations
A corporate sponsor, who wishes to remain anonymous, has sponsored the development of 64 bit bitwise operations for LuaJIT 2.1 in March 2013.
Sponsorship for allocation/store sinking
A corporate sponsor, who wishes to remain anonymous, has sponsored the development of allocation sinking and store sinking optimizations for LuaJIT in March 2012.
Avoiding temporary allocations is an important optimization for high-level languages. The goal of this sponsorship is to research an innovative combination of analysis and optimization techniques. Taken together, these are more effective than the classic techniques and better suited for dynamic languages.
Sponsorship for FFI callbacks
Neomantra Corp has sponsored the FFI callback feature for LuaJIT x86/x64 in November 2011.
Sponsorship for the MIPS port of LuaJIT
As part of its commitment to open source development, MIPS Technologies, Inc. has sponsored a MIPS port of LuaJIT 2.0 in October 2011.
The port requires a CPU conforming to the MIPS32 R1 architecture (O32 ABI, hard-fp, little-endian or big-endian). The port has been tuned for the MIPS32 34K and 74K cores.
Sponsorship for bytecode loading/saving
Gehtsoft USA, LLC has sponsored the bytecode loading/saving feature for LuaJIT in June 2011.
The LuaJIT bytecode format is portable and ~40% smaller than Lua bytecode. The LuaJIT bytecode loader is 10x faster than the Lua bytecode loader. And LuaJIT bytecode loads 30x-40x faster than source code. Note that this is unrelated to the execution speed of the code itself — it doesn't matter how the code was loaded.
Sponsorship for the ARM port of LuaJIT
QUALCOMM Inc. has sponsored an ARM port of LuaJIT 2.0 in January 2011.
The initial target for the ARM port have been low-to-middle-end ARM-based devices. The port requires a CPU conforming to the ARMv5 architecture (ARM9E cores or better) with software floating-point (no FPU needed) and the classic ARM instruction set.
Another corporate sponsor, who wishes to remain anonymous, has sponsored the VFP support (hardware FPU) and the hard-float EABI support for the ARM port. The ARM port of LuaJIT 2.0 can be built either for soft-float targets, for VFP targets using the soft-float EABI (armel) or for VFP targets using the hard-float EABI (armhf).
Sponsorship for the PPC port of LuaJIT
A corporate sponsor, who wishes to remain anonymous, has sponsored the port of LuaJIT to PowerPC CPUs in July 2011. The port has been tuned for the FreeScale e300 cores, but runs fine on all PPC CPUs with a standard hardware FPU.
Another corporate sponsor, who wishes to remain anonymous, has previously sponsored the port of the LuaJIT 2.0 interpreter to PowerPC/e500v2 (different FPU than standard PPC) in August 2010.
Sponsorship for the x64 port of LuaJIT
The goal of this sponsorship campaign was to raise € 20,000 for the x64 port of LuaJIT 2.0. To jump-start sponsorship of LuaJIT, Athena Capital Research has provided an initial contribution of € 5,000 in December 2009.
As part of their commitment to the open source community, Athena Capital Research has offered to provide up to € 7,000 of matching funds. All funds offered through corporate sponsorship have been matched one-to-one. Other funds have been matched two-to-one.
The x64 sponsorship goal has been reached in January 2010 and a total of € 20,167 was raised!
Many thanks to all sponsors for supporting LuaJIT!
Sponsor Name	Amount	Matched	Date
Athena Capital Research LLC	€ 5,000	 	2009-12-07
(Identity withheld) via Athena CR	$ 100	+ $ 200	2009-12-10
Snabb	€ 100	+ € 100	2009-12-17
Google Inc.	€ 8,000	+ € 6,767	2010-01-20
€ 20,167 total	€ 13,167	+ € 7,000	 
Note: All accounting is performed in €. Foreign currencies are converted to € on the day of receipt using the actual conversion rate minus banking fees and taxes (if applicable).