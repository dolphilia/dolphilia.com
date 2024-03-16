# Status

LuaJIT is actively developed and maintained. You can follow the development progress in the git repository, the LuaJIT mailing list and the issue tracker.

## Versions and Branches

Branch	Maintained	Breaking Changes	New Features	Recommended Use
v2.0	bugfixes	no	no	Compatibility only
v2.1	yes	no	limited	Production
(TBA)	yes	yes	yes	Development

Each versioned branch corresponds to a $major.$minor version of LuaJIT.

The old git master branch is phased out and stays pinned to the v2.0 branch. Please follow the versioned branches instead.

### Feature and Maintenance Policy

- Older versions receive fixes and backports, but no new features.
- Only recent versions receive new features.
- Production-use branches receive only non-breaking changes and limited, upwards-compatible features.
- Development-use branches also have breaking changes. Any commit may break API, ABI and bytecode compatibility.
- TBA = to-be-announced here, when a new development branch will open.

## Release Policy

LuaJIT uses rolling releases. The authoritative origin is the git repository from this site. You should regularly pull from the selected git branch to get the latest fixes and developments. No release tarballs or binaries are made available.

Instead of manual increments for each release, the build process uses the POSIX time stamp of the latest commit as the release number of the semantic version. The full version number in the format $major.$minor.$timestamp can be shown with:

```sh
luajit -v
```

If you only have a version number and need to know the related commit, then fill in the parts of the version number in this command:

```sh
git show "v$major.$minor@{$timestamp}"
```

## Operating Systems

### Server, Desktop and Embedded

OS	Min. Version	Requirements	LuaJIT Versions
Linux	 	 	v2.0 –
*BSD	 	 	v2.0 –
macOS (OSX)	10.4	 	v2.1 –
POSIX	 	mmap, dlopen	v2.0 –
Windows	7	x86 or x64, ARM64: TBA	v2.0 –

### Mobile

OS	Min. Version	Requirements	LuaJIT Versions
Android	4.0	Recent Android NDK	v2.0 –
iOS	3.0	Xcode iOS SDK	v2.1 –

### Console

OS	Min. Version	Requirements	LuaJIT Versions
PS3	 	PS3 SDK	v2.0 – v2.1 EOL
PS4	 	PS4 SDK (ORBIS)	v2.0 –
PS5	 	PS5 SDK (PROSPERO)	v2.1 –
PS Vita	 	PS Vita SDK (PSP2)	v2.0 – v2.1 EOL
Xbox 360	 	Xbox 360 SDK (XEDK)	v2.0 – v2.1 EOL
Xbox One	 	Xbox One SDK (DURANGO)	v2.1 –
Nintendo Switch	 	NintendoSDK + NX Addon	v2.1 –

The codebase has compatibility defines for some more systems, but without official support.

## CPU Architectures

CPU	Bits	Endianess	FP	Requirements	LuaJIT Versions
x86	32	little	FPU	v2.1+: SSE2	v2.0 –
x64	64	little	FPU	 	v2.0 –
ARM	32	little	FPU + soft	ARMv5+, ARM9E+	v2.0 –
ARM64	64	little + big	FPU	 	v2.1 –
PPC32	32	big	FPU + soft	 	v2.0 – v2.1 EOL
PPC/e500 v2	32	big	FPU	 	v2.0 EOL
MIPS32 r1-r5	32	big + little	FPU + soft	 	v2.0 –
MIPS64 r1-r5	64	big + little	FPU + soft	 	v2.1 –
MIPS64 r6	64	big + little	FPU + soft	 	v2.1 EOL
RISC-V	64	little	hard	RVA22+	(TBA)

There are no plans to add historic architectures or to continue support for end-of-life (EOL) architectures, for which no new CPUs are commonly available anymore. Likewise, there are no plans to support marginal and/or de-facto-dead architectures.