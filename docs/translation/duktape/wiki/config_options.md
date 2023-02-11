# Duktapeの設定オプション

## Platform and portability options

### DUK_USE_32BIT_PTRS

Pointers are 32-bit integer compatible.

```
Default: False
```

### DUK_USE_64BIT_OPS

Use 64-bit integer operations. On some platforms 64-bit types may be available but 64-bit operations don't work correctly e.g. in integer/float casts.

```
Default: True
```

### DUK_USE_ALIGN_4

Use 4-byte alignment for 64-bit integers and IEEE doubles. Replaced by DUK_USE_ALIGN_BY.

```
Default: False
```

### DUK_USE_ALIGN_8

Use 8-byte alignment for 64-bit integers and IEEE doubles. Replaced by DUK_USE_ALIGN_BY.

```
Default: False
```

### DUK_USE_ALIGN_BY

Use N-byte alignment for 64-bit integers and IEEE doubles (supported values are 1, 4, and 8).

```
Default: 8
```

### DUK_USE_ALLOW_UNDEFINED_BEHAVIOR

Allow technically undefined behavior such as out-of-range double-to-integer casts, floating point division by zero, etc. which are likely to work on the majority of platforms. Default is to avoid such behaviors, at the cost of some footprint and performance.

```
Default: False
```

### DUK_USE_ARCH_STRING

Human-readable architecture string used in e.g. Duktape.env and debugger protocol (example: x64).

```
Default: {'string': 'unknown'}
```

### DUK_USE_ATAN2_WORKAROUNDS

Enable workarounds to common atan2() semantics issues. At least Cygwin/MinGW has such issues, see test-bug-mingw-math-issues.js.

```
Default: False
```

### DUK_USE_AVOID_PLATFORM_FUNCPTRS

Don't assume that platform functions (e.g. math functions) are actual functions. This option is needed if platform functions may be defined as macros. This is certainly the case with some platform "polyfills" which provide missing C99/C++11 functions through macros, and may be the case with VS2013 (see GH-17).

This is now the default: the cost in footprint is negligible.

```
Default: True
```

### DUK_USE_BRANCH_HINTS

Use branch hints if the compiler supports them.

```
Default: True
```

### DUK_USE_BYTEORDER

Byte order for platform: 1 = little endian, 2 = mixed (arm hybrid) endian, 3 = big endian.

ARM mixed endian means integers are little endian but IEEE doubles have mixed endianness: big endian bytes 12345678 are ordered in memory as 43218765. See http://infocenter.arm.com/help/index.jsp?topic=/com.arm.doc.dui0056d/Bcfhgcgd.html.

(This define should be produced by duk_config.h; currently Duktape internals use automatically derived defines DUK_USE{INTEGER,DOUBLE}_{LE,BE_ME} instead of using this define directly.)

```
Default: 0
```

### DUK_USE_BYTEORDER_FORCED

Byte order was forced (instead of being autodetected). This has no functional impact but the forced status shows up in Duktape.env.

```
Default: False
```

### DUK_USE_CLANG_PRAGMAS

Use Clang-specific pragmas, e.g. "#pragma clang diagnostic" to suppress unnecessary warnings.

```
Default: False
```

### DUK_USE_COMPILER_RECLIMIT

ECMAScript compiler native call stack recursion limit.

```
Default: 2500
```

### DUK_USE_COMPILER_STRING

Human-readable compiler string used in e.g. Duktape.env and debugger protocol (example: gcc).

```
Default: {'string': 'unknown'}
```

### DUK_USE_COMPUTED_INFINITY

The DUK_DOUBLE_INFINITY is not a constant but refers to a global variable with an IEEE double infinity value computed at run-time. Some compilers don't provide a constant for infinity, and may incorrectly evaluate (1 / 0) when doing constant folding.

When enabled, define DUK_DOUBLE_INFINITY as duk_computed_infinity.

Default: False

### DUK_USE_COMPUTED_NAN

The DUK_DOUBLE_NAN is not a constant but refers to a global variable with an IEEE NaN value computed at run-time. Some compilers don't provide a constant for NaN, and may incorrectly evaluate (0 / 0) when doing constant folding.

When enabled, define DUK_DOUBLE_NAN as duk_computed_nan.

Default: False

### DUK_USE_CPP_EXCEPTIONS

Use C++ exceptions instead of setjmp/longjmp for long control transfers. This allows Duktape/C functions written in C++ to use automatic destructors (RAII or scope-based resource management).

Default: False

### DUK_USE_DEEP_C_STACK

Assume deep C stacks are not an issue on the target platform; on some embedded platforms the native C stack is very limited (e.g. 32-64 kB) and overrunning the stack leads to difficult-to-diagnose problems.

Removed in Duktape 1.3.0, replaced by explicit recursion limits.

Default: True

### DUK_USE_DOUBLE_BE

IEEE double memory representation is big endian on the target platform.

Default: False

### DUK_USE_DOUBLE_LE

IEEE double memory representation is little endian on the target platform.

Default: True

### DUK_USE_DOUBLE_ME

IEEE double memory representation is mixed endian on the target platform. In other words the logical bytes ABCDEFGH are represented in memory as DCBAHGFE. This endianness is used by some ARM platforms.

Default: False

### DUK_USE_EXPLICIT_NULL_INIT

When zeroing structures, don't rely on memzero initializing pointers to NULL. Instead, write NULL values explicitly after zeroing. This should only be necessary when a NULL pointer is not represented by zero bytes in memory.

# NOTE: Condition in Duktape 1.2 seems wrong, and is linked to packed tval.

Default: False

### DUK_USE_FATAL_HANDLER

Provide a custom default fatal error handler to replace the built-in one (which calls abort() without any error message). The default fatal error handler gets called when (1) a fatal error occurs and application code didn't register a fatal error handler in heap creation or (2) a context-free fatal error happens, concretely e.g. an assertion failure.

The handler is called like a C function with the prototype "void fatal_handler(void udata, const charmsg)". The "msg" argument can be NULL. The "udata" argument matches the heap-related userdata but is NULL for fatal errors unrelated to a heap/thread context (this is the case for e.g. assertions).

A custom default fatal error handler is recommended for any environment where recover from fatal errors is important. A custom handler can take appropriate action to recover, e.g. record the error and reboot the target device.

Default: False

### DUK_USE_FATAL_MAXLEN

Maximum length of fatal error message string when error is thrown by Duktape internals, in particular for uncaught errors.

Default: 128

### DUK_USE_FLEX_C99

Use C99 flexible array member for defining variable size structures.

Default: True

### DUK_USE_FLEX_ONESIZE

Use a single element array to define variable size structures. This is the most portable alternative: zero-size arrays are not allowed by all compilers and flexible array member ("char arr[]") is defined in C99.

Default: False

### DUK_USE_FLEX_ZEROSIZE

Use a zero element array to define variable size structures. This is not fully portable but works with some compilers and is preferred over using a one element array.

Default: False

### DUK_USE_GCC_PRAGMAS

Use GCC-specific pragmas, e.g. "#pragma GCC diagnostic" to suppress unnecessary warnings.

Default: False

### DUK_USE_GET_MONOTONIC_TIME

Optional macro for getting monotonic time in milliseconds from an arbitrary starting point (device startup, program startup, script startup, etc). Fractional time values are allowed (and even recommended). The time returned must increase monotonically, and must not jump discontinuously even if system date/time is reset. The semantics are similar to POSIX clock_gettime() CLOCK_MONOTONIC.

Monotonic time is used by Duktape for its internal needs, such as rate limiting debugger transport peek callbacks. It is also used to provide performance.now(). If this option is not provided, Duktape falls back to using DUK_USE_DATE_GET_NOW() which is usually fine.

If DUK_USE_DATE_GET_NOW() experiences time jumps or doesn't run in realtime (which may be useful for some time virtualization cases) it's recommended to provide this config option so that internals which need a reliable realtime rate have a reliable time basis.

Default: False

### DUK_USE_GET_MONOTONIC_TIME_CLOCK_GETTIME

Use clock_gettime(CLOCK_MONOTONIC, ...) for monotonic time on POSIX platforms.

Default: False

### DUK_USE_GET_MONOTONIC_TIME_WINDOWS_QPC

Use QueryPerformanceCounter() for monotonic time on Windows.

Default: False

### DUK_USE_GET_RANDOM_DOUBLE

Override the default internal random number generator which is used for Math.random() and some other internal call sites (currently, for example, Array.prototype.sort()). The default random number generator has a very low footprint but is not suitable for serious statistics algorithms or cryptography. Overriding the random number generator may thus be useful in some environments.

The macro gets a heap userdata argument and must provide an IEEE double in the range [0,1[.

Default: False

### DUK_USE_HASHBYTES_UNALIGNED_U32_ACCESS

Allow unaligned 32-bit unsigned integer access in hashbytes algorithm.

Default: False

### DUK_USE_HOBJECT_LAYOUT_1

Use layout variant 1 for object properties. Layout 1 can be used when the target has no alignment restrictions. It is preferable to other layouts because it produces smaller code and provides direct access to property keys.

Default: False

### DUK_USE_HOBJECT_LAYOUT_2

Use layout variant 2 for object properties. Layout 2 can be used on any target (including targets with alignment restrictions).

Default: True

### DUK_USE_HOBJECT_LAYOUT_3

Use layout variant 3 for object properties. Layout 3 can be used on any target (including targets with alignment restrictions). It's a bit more packed than layout variant 2 but has a bit slower lookups.

Default: False

### DUK_USE_INTEGER_BE

Integer memory representation is big endian on the target platform.

Default: False

### DUK_USE_INTEGER_LE

Integer memory representation is little endian on the target platform.

Default: True

### DUK_USE_INTEGER_ME

Integer memory representation is mixed endian on the target platform.

This option is unused (and unsupported) because no target platform currently needs this.

Default: False

### DUK_USE_JSON_DEC_RECLIMIT

Maximum native stack recursion for JSON decoding.

Default: 1000

### DUK_USE_JSON_ENC_RECLIMIT

Maximum native stack recursion for JSON encoding.

Must be higher than the internal DUK_JSON_ENC_LOOPARRAY define when DUK_USE_JSON_STRINGIFY_FASTPATH is enabled.

Default: 1000

### DUK_USE_MARK_AND_SWEEP_RECLIMIT

Mark-and-sweep C recursion depth for marking phase; if reached, mark object as a TEMPROOT and use multi-pass marking (slower but same result).

Default: 256

### DUK_USE_MATH_FMAX

Assume platform function fmax() is available and works correctly. Some platforms don't have fmax() (it is defined in C99) and on some platforms (e.g. some uclibc environments) it may not be provided even though the compilation environment is nominally C99.

Removed in Duktape 2.0.0: if the platform doesn't have fmax(), simply define a replacement for DUK_FMAX().

Default: True

### DUK_USE_MATH_FMIN

Assume platform function fmin() is available and works correctly. Some platforms don't have fmin() (it is defined in C99) and on some platforms (e.g. some uclibc environments) it may not be provided even though the compilation environment is nominally C99.

Removed in Duktape 2.0.0: if the platform doesn't have fmin(), simply define a replacement for DUK_FMIN().

Default: True

### DUK_USE_MATH_ROUND

Assume platform function round() is available and works correctly. Some platforms don't have round() (it is defined in C99) and on some platforms (e.g. some uclibc environments) it may not be provided even though the compilation environment is nominally C99.

Removed in Duktape 2.0.0: if the platform doesn't have round(), simply define a replacement for DUK_ROUND(). Currently DUK_ROUND() isn't used at all however.

Default: True

### DUK_USE_NATIVE_CALL_RECLIMIT

Maximum duk_handle_call() / duk_handle_safe_call() C recursion limit. Note that this does not limit bytecode executor internal call depth at all (e.g. for ECMAScript-to-ECMAScript calls, thread yields/resumes, etc). There is a separate callstack depth limit for threads which is independent of this limit.

Default: 1000

### DUK_USE_NATIVE_STACK_CHECK

Provide a macro hook to check for available native stack space for the currently executing native thread. The macro must evaluate to zero if there is enough stack space available and non-zero otherwise; a RangeError will then be thrown.

The definition of "enough space" depends on the target platform and the compiler because the size of native stack frames cannot be easily known in advance. As a relatively safe estimate, one can check for 8kB of available stack.

Duktape doesn't call this macro for every internal native call. The macro is called in code paths that are involved in potentially unlimited recursion (such as making Ecmascript/native function calls, invoking getters and Proxy traps, and resolving Proxy chains) and code paths requiring a lot of stack space temporarily.

Default: False

### DUK_USE_NO_DOUBLE_ALIASING_SELFTEST

Disable double aliasing selftest (if self tests enabled).

Double aliasing testcase fails when Emscripten-generated code is run. This is not fatal because it only affects packed duk_tval which we avoid with Emscripten.

Default: False

### DUK_USE_OS_STRING

Human-readable operating system string used in e.g. Duktape.env and debugger protocol (example: linux).

```
Default: {'string': 'unknown'}
```

### DUK_USE_PACKED_TVAL

Use a packed 8-byte representation for duk_tval. The packed representation represents non-number values as special IEEE double NaN values, and is only possible for platforms with 32-bit pointers. When the packed representation is not available, Duktape uses a 12-16 byte struct/union which is more portable.

Default: False

### DUK_USE_PACKED_TVAL_POSSIBLE

Define when packed, 8-byte duk_tval representation is possible.

Default: False

### DUK_USE_PACK_CLANG_ATTR

Use clang-specific attribute to force struct packing.

Default: False

### DUK_USE_PACK_DUMMY_MEMBER

Use dummy struct member to force struct packing.

Default: False

### DUK_USE_PACK_GCC_ATTR

Use gcc-specific attribute to force struct packing.

Default: False

### DUK_USE_PACK_MSVC_PRAGMA

Use msvc-specific attribute to force struct packing.

Default: False

### DUK_USE_PANIC_ABORT

Call abort() when the default panic handler is invoked.

Default: True

### DUK_USE_PANIC_EXIT

Call exit() when the default panic handler is invoked.

Default: False

### DUK_USE_PANIC_HANDLER

Provide a custom panic handler. A custom panic handler is recommended for any environment where recovery from fatal errors is important. A custom handler can take appropriate action to recover, e.g. record the error and reboot the target device.

Default: False

### DUK_USE_PANIC_SEGFAULT

Cause an intentional segfault when the default panic handler is invoked. This is useful when debugging with valgrind because a segfault provides a nice C traceback in valgrind.

Default: False

### DUK_USE_PARANOID_DATE_COMPUTATION

There was a curious bug where test-bi-date-canceling.js would fail e.g. on 64-bit Ubuntu, gcc-4.8.1, -m32, and no -std=c99. Some date computations using doubles would be optimized which then broke some corner case tests. The problem goes away by adding 'volatile' to the datetime computations. Not sure what the actual triggering conditions are, but using this on non-C99 systems solves the known issues and has relatively little cost on other platforms.

Recommended for non-C99 platforms.

Default: False

### DUK_USE_PARANOID_MATH

Rely as little as possible on compiler behavior for NaN comparison, signed zero handling, etc. May be needed for (very) broken compilers.

Default: False

### DUK_USE_POW_NETBSD_WORKAROUND

NetBSD 6.0 x86 (at least) has a few problems with pow() semantics, see test-bug-netbsd-math-pow.js. Use NetBSD specific workaround.

(This might be a wider problem; if so, generalize the define name.)

Default: False

### DUK_USE_POW_WORKAROUNDS

Enable workarounds to common pow() semantics issues. At least NetBSD 6.0 x86 and Cygwin/MinGW have such issues, see test-bug-netbsd-math-pow.js and test-bug-mingw-math-issues.js.

Default: False

### DUK_USE_PROVIDE_DEFAULT_ALLOC_FUNCTIONS

Provide default allocation functions.

At the moment this option should be enabled.

Default: True

### DUK_USE_RDTSC

Macro to provide an x86/x64 RDTSC timestamp for debug prints.

Default: False

### DUK_USE_REGEXP_COMPILER_RECLIMIT

RegExp compiler native call stack recursion limit.

Default: 10000

### DUK_USE_REGEXP_EXECUTOR_RECLIMIT

RegExp executor native call stack recursion limit.

Default: 10000

### DUK_USE_REPL_FPCLASSIFY

Provide a built-in replacement for fpclassify(), duk_repl_fpclassify.

When enabled, define DUK_FPCLASSIFY as duk_repl_fpclassify.

Default: False

### DUK_USE_REPL_ISFINITE

Provide a built-in replacement for isfinite(), duk_repl_isfinite.

When enabled, define DUK_ISFINITE as duk_repl_isfinite.

Default: False

### DUK_USE_REPL_ISINF

Provide a built-in replacement for isinf(), duk_repl_isinf.

When enabled, define DUK_ISINF as duk_repl_isinf.

Default: False

### DUK_USE_REPL_ISNAN

Provide a built-in replacement for isnan(), duk_repl_isnan.

When enabled, define DUK_ISNAN as duk_repl_isnan.

Default: False

### DUK_USE_REPL_SIGNBIT

Provide a built-in replacement for signbit(), duk_repl_signbit.

When enabled, define DUK_SIGNBIT as duk_repl_signbit.

Default: False

### DUK_USE_SETJMP

Use setjmp/longjmp for long control transfers. This is the most portable option for long control transfers.

The downside of setjmp/longjmp is that signal mask saving behavior is not specified and varies between platforms. Signal mask saving may have a significant performance impact so you may want to force a specific provider if performance matters for your application. (This is the case for OSX, for instance.)

Removed in Duktape 1.5.0: edit duk_config.h directly.

Default: True

### DUK_USE_SIGSETJMP

Use sigsetjmp/siglongjmp with savesigs == 0 for long control transfers (i.e. signal mask not saved/restored). See comments in DUK_USE_SETJMP.

Removed in Duktape 1.5.0: edit duk_config.h directly.

Default: False

### DUK_USE_UNALIGNED_ACCESSES_POSSIBLE

Target architecture unaligned memory accesses (e.g. 32-bit integer access from an arbitrary address).

Default: False

### DUK_USE_UNDERSCORE_SETJMP

Use _setjmp/_longjmp for long control transfers. This ensures signal mask is not saved which can be a lot faster if setjmp/longjmp saves the signal mask (this varies between platforms). See comments in DUK_USE_SETJMP.

Removed in Duktape 1.5.0: edit duk_config.h directly.

Default: False

### DUK_USE_UNION_INITIALIZERS

Compiler supports C99-style designated union initializers, e.g. { .foo = 123 }.

When disabled, Duktape sometimes needs to resort to less efficient struct initializers for portability.

Default: False

### DUK_USE_USER_DECLARE

Provide declarations or additional preprocessor include directives to be used when compiling Duktape. You may need this if you set DUK_USE_PANIC_HANDLER to call your own panic handler function. You can also use this option to cause additional files to be included when compiling Duktape.

NOTE: This is only needed if using the default autodetecting duk_config.h header. When providing DUK_USE_xxx flags directly, you should just provide all the necessary declarations in duk_config.h directly.

Default: {'verbatim': '#define DUK_USE_USER_DECLARE() /* no user declarations */'}

### DUK_USE_USER_INITJS

Provide a string to evaluate when a thread with new built-ins (a new global environment) is created. This allows you to make minor modifications to the global environment before any code is executed in it. The value must be a string, e.g.:: -DDUK_OPT_USER_INITJS='"this.foo = 123"'.

Errors in the initialization code result in a fatal error.

Default: False

### DUK_USE_VARIADIC_MACROS

Compiler supports C99-style variadic macros. Highly recommended to enable when possible.

When disabled, Duktape needs to resort to various hacks to work around missing support for variadic macros.

Default: True

## Memory management options

### DUK_USE_EXTSTR_FREE

Optional counterpart to DUK_USE_EXTSTR_INTERN_CHECK. Invoked when an external string is about to be freed by Duktape.

The argument "ptr" is a void ptr and points to the external string data. Concretely, it is the (non-NULL) value returned by DUK_USE_EXTSTR_INTERN_CHECK. The "udata" argument is the heap userdata which may be ignored if not needed.

Also enable DUK_USE_HSTRING_EXTDATA to use this feature.

NOTE: Right now there is no API to push external strings; external strings come into being as a result of DUK_USE_EXTSTR_INTERN_CHECK() only. If/when this is changed, this hook will get called for every string, even if pushed by the user using an API call; this may need to be rethought at that time.

Default: False

### DUK_USE_EXTSTR_INTERN_CHECK

Provide a hook for checking if data for a certain string can be used from external memory (outside of Duktape heap, e.g. memory mapped flash). The hook is called during string interning with the following semantics:

The string data with no NUL termination resides at "ptr" and has "len" bytes. The "udata" argument is the heap userdata which may be ignored if not needed. If the hook returns NULL, Duktape interns the string normally, i.e. string data is allocated from Duktape heap. Otherwise the hook return value must point to a memory area which contains "len" bytes from "ptr" followed by a NUL byte which is NOT PRESENT in the input data. Data behind the returned pointer may not change after the hook returns.

The hook may be called several times for the same input string. This happens when a string is interned, garbage collected, and then interned again.

The DUK_USE_EXTSTR_FREE() hook allows application code to detect when an external string is about to be freed.

In most cases the hook should reject strings whose "len" is less than 4 because there is no RAM advantage in moving so short strings into external memory. The ordinary "duk_hstring" header followed by the data (and a NUL byte) has the same size as "duk_hstring_external" header which hosts a pointer instead of string data.

Also enable DUK_USE_HSTRING_EXTDATA to use this feature.

See doc/low-memory.rst for more discussion how to use this feature option in practice.

Default: False

### DUK_USE_HSTRING_EXTDATA

Enable support for external strings. An external string requires a Duktape heap allocation to store a minimal string header, with the actual string data being held behind a pointer (similarly to how dynamic buffers work).

This option is needed to use DUK_USE_EXTSTR_INTERN_CHECK and/or DUK_USE_EXTSTR_FREE.

Default: False

### DUK_USE_ZERO_BUFFER_DATA

Zero data are of newly allocated buffer values (recommended).

When disabled, buffers are not zeroed and may contain arbitrary data. Disabling this option only makes sense for performance reasons.

Default: True

## Low memory options

### DUK_USE_BUFLEN16

Use a 16-bit buffer length field (for low memory environments).

Default: False

### DUK_USE_DATAPTR16

Enable "compression" of arbitrary data pointers into an unsigned 16-bit value. Use together with DUK_USE_DATAPTR_ENC16 and DUK_USE_DATAPTR_DEC16.

Pointers compressed are any void pointers in C code, not just the Duktape heap. Also NULL pointer must encode and decode correctly.

Currently it is required that NULL encodes to integer 0, and integer 0 decodes to NULL. No other pointer can be encoded to 0.

NOTE: This feature option is currently unimplemented, i.e. Duktape won't compress any data pointers at the moment.

Default: False

### DUK_USE_DATAPTR_DEC16

Use together with DUK_USE_DATAPTR16 for arbitrary data pointer compression. DUK_USE_DATAPTR_DEC16(udata,x) is a macro with a userdata and duk_uint16_t argument, and a void ptr return value. The userdata argument is the heap userdata value given at heap creation.

Default: False

### DUK_USE_DATAPTR_ENC16

Use together with DUK_USE_DATAPTR16 for arbitrary data pointer compression. DUK_USE_DATAPTR_ENC16(udata,p) is a macro with a userdata and void ptr argument, and a duk_uint16_t return value. The userdata argument is the heap userdata value given at heap creation. Currently it is required that NULL encodes to integer 0, and integer 0 decodes to NULL. No other pointer can be encoded to 0.

Default: False

### DUK_USE_EXEC_PREFER_SIZE

Prefer size over performance in bytecode executor.

Default: False

### DUK_USE_FUNCPTR16

Enable "compression" of arbitrary data pointers into an unsigned 16-bit value. Use together with DUK_USE_DATAPTR_ENC16 and DUK_USE_DATAPTR_DEC16.

Pointers compressed are any void pointers in C code, not just the Duktape heap. Also NULL pointer must encode and decode correctly.

Currently it is required that NULL encodes to integer 0, and integer 0 decodes to NULL. No other pointer can be encoded to 0.

NOTE: This feature option is currently unimplemented, i.e. Duktape won't compress any data pointers at the moment.

Default: False

### DUK_USE_FUNCPTR_DEC16

Use together with DUK_USE_FUNCPTR16 for arbitrary data pointer compression. DUK_USE_FUNCPTR_ENC16(udata,p) is a macro with a userdata and void ptr argument, and a duk_uint16_t return value. The userdata argument is the heap userdata value given at heap creation. Currently it is required that NULL encodes to integer 0, and integer 0 decodes to NULL. No other pointer can be encoded to 0.

Default: False

### DUK_USE_FUNCPTR_ENC16

Use together with DUK_USE_FUNCPTR16 for arbitrary data pointer compression. DUK_USE_FUNCPTR_DEC16(udata,x) is a macro with a userdata and duk_uint16_t argument, and a void ptr return value. The userdata argument is the heap userdata value given at heap creation.

Default: False

### DUK_USE_HEAPPTR16

Enable "compression" of Duktape heap pointers into an unsigned 16-bit value. Use together with DUK_USE_HEAPPTR_ENC16 and DUK_USE_HEAPPTR_DEC16.

Pointers compressed are those allocated from Duktape heap, using the user provided allocation functions. Also NULL pointer must encode and decode correctly.

Currently it is required that NULL encodes to integer 0, and integer 0 decodes to NULL. No other pointer can be encoded to 0.

This option reduces memory usage by several kilobytes, but has several downsides. It can only be applied when Duktape heap is limited in size, for instance, with 4-byte aligned allocations a 256kB heap (minus one value for NULL) can be supported. Pointer encoding and decoding may be relatively complicated as they need to correctly handle NULL pointers and non-continuous memory maps used by some targets. The macro may need to call out to a helper function in practice, which is much slower than an inline implementation.

Current limitation: Duktape internal debug code enabled with e.g. DUK_USE_DEBUG and DUK_USE_DEBUG_LEVEL=0 doesn't have enough plumbing to be able to decode pointers. Debug printing cannot currently be enabled when pointer compression is active.

Default: False

### DUK_USE_HEAPPTR_DEC16

Use together with DUK_USE_HEAPPTR16 for heap pointer compression. DUK_USE_HEAPPTR_DEC16(udata,x) is a macro with a userdata and duk_uint16_t argument, and a void ptr return value. The userdata argument is the heap userdata value given at heap creation.

Default: False

### DUK_USE_HEAPPTR_ENC16

Use together with DUK_USE_HEAPPTR16 for heap pointer compression. DUK_USE_HEAPPTR_ENC16(udata,p) is a macro with a userdata and void ptr argument, and a duk_uint16_t return value. The userdata argument is the heap userdata value given at heap creation.

Default: False

### DUK_USE_HOBJECT_HASH_PART

Use a hash table for objects that have enough properties. This should be enabled unless the target is very low on memory.

If DUK_USE_OBJSIZES16 is defined, this option must not be defined.

Default: True

### DUK_USE_HSTRING_ARRIDX

When enabled, duk_hstring stores a precomputed array index (or "not an array index") value related to the string. This reduces code footprint and improves performance a littl ebit.

When disabled, duk_hstring has a flag indicating whether it is an array index or not, but the actual value is computed on-the-fly.

Default: True

### DUK_USE_HSTRING_CLEN

When DUK_USE_STRLEN16 enabled, indicates whether the character length (clen16) field should be actually present (default) or computed on-the-fly.

When clen is computed on-the-fly the duk_hstring structure will be 4 bytes smaller (from 10 bytes + 2 bytes padding to 8 bytes) which may be useful for very low memory targets.

Default: True

### DUK_USE_LEXER_SLIDING_WINDOW

Use a sliding window approach for managing the lexer codepoint lookup window (recommended). If disabled, the lexer uses a slower algorithm which has a slightly smaller code and RAM footprint.

Default: True

### DUK_USE_LIGHTFUNC_BUILTINS

Force built-in functions to be lightweight functions. This reduces memory footprint by around 14 kB at the cost of some non-compliant behavior.

Default: False

### DUK_USE_OBJSIZES16

Use a 16-bit object entry and array part sizes (for low memory environments). Also automatically drops support for an object hash part to further reduce memory usage; there are rarely large objects in low memory environments simply because there's no memory to store a lot of properties.

Default: False

### DUK_USE_PREFER_SIZE

Catch-all flag which can be used to choose between variant algorithms where a speed-size tradeoff exists (e.g. lookup tables). When it really matters, specific use flags may be appropriate.

Default: False

### DUK_USE_REFCOUNT16

Use a 16-bit reference count field (for low memory environments).

Default: False

### DUK_USE_ROM_GLOBAL_CLONE

When using ROM built-in objects, create a RAM-based global object by copying the properties of the ROM-based global object into a fresh empty object.

Having a writable global object is usually expected; if the global object is not writable, it's not possible to e.g. declare functions outside of CommonJS modules.

Default: False

### DUK_USE_ROM_GLOBAL_INHERIT

When using ROM built-in objects, create a RAM-based global object by creating a fresh empty object which inherits from the ROM-based global object. This provides all the standard bindings with a small RAM footprint cost, but still allows the global object to be extended and existing bindings overwritten (but not deleted). The downside of this compared to cloning a global object is that the inheritance is not fully transparent and the result is less compliant.

Having a writable global object is usually expected; if the global object is not writable, it's not possible to e.g. declare functions outside of CommonJS modules.

Default: False

### DUK_USE_ROM_OBJECTS

Enable support for built-in objects compiled as constants and placed in a read-only data section. This reduces startup RAM usage considerably at the cost of a larger code footprint and slower performance overall. The built-in objects will be immutable: the objects will be non-extensible.

ROM objects will always be non-extensible and properties are forced to be non-configurable. Other property attributes will have their usual values; in particular, properties can be "writable" from a property attributes standpoint, but an attempt to actually change the property value will fail with a TypeError. This may seem strange, but is necessary to allow a property value to be overridden in a RAM object inheriting from a ROM object: if the inherited ROM property was not writable, ECMAScript semantics would prevent a new property from being established in the RAM object.

Default: False

### DUK_USE_ROM_PTRCOMP_FIRST

When using ROM pointer compression ROM pointers are compressed to the integer range [DUK_USE_ROM_PTRCOMP_FIRST,0xffff]. The default value allows for 2048 ROM pointers, which can point to objects and strings.

You may need to lower this value to support more pointers if there are a lot of custom ROM strings/objects.

Default: 63488

### DUK_USE_ROM_STRINGS

Enable support for built-in (and optional user-supplied strings) which are compiled as constants and placed in a read-only data section. This reduces startup RAM usage considerably at the cost of a larger code footprint and slower string interning.

Default: False

### DUK_USE_STRHASH16

Use a 16-bit string hash field (for low memory environments).

Default: False

### DUK_USE_STRLEN16

Use a 16-bit string length field (for low memory environments).

Default: False

### DUK_USE_STRTAB_CHAIN

Replace the default (open addressing, probing) string table structure with one based on separate chaining. There is a fixed-size top level hash table (whose size is defined using DUK_USE_STRTAB_CHAIN_SIZE), with each entry in the hash table being: (a) NULL, (b) a duk_hstring pointer, or (c) a pointer to an array of duk_hstring pointers. The pointer arrays are gappy (the gaps are reused on new inserts) and are never shrunk at the moment.

This option is intended for low memory environments to make Duktape's memory behavior match a typical pool-based allocator better as follows:

The top level fixed structure never changes size, so there is no hash table resize, and thus no need for resize temporaries. The default string table algorithm needs resizing from time to time and doesn't resize in place, so you effectively need twice the string table size temporarily during a resize.

The pointer arrays vary in size, but their size (typically 8 to 64 bytes, depending on the load factor) matches that of many other allocations which works well with a pooled allocator.

Default: False

### DUK_USE_STRTAB_CHAIN_SIZE

Define stringtable size for DUK_USE_STRTAB_CHAIN.

Default: False

### DUK_USE_STRTAB_PROBE

Use the default open addressing (probing) based string table algorithm.

Default: True

## ECMAScript Edition 5 (ES5) options

### DUK_USE_ARRAY_BUILTIN

Provide an Array built-in.

Default: True

### DUK_USE_AUGMENT_ERROR_CREATE

Augment an ECMAScript error object at creation with tracedata or fileName/lineNumber, or Duktape.errCreate (if enabled).

Default: True

### DUK_USE_AUGMENT_ERROR_THROW

Augment an ECMAScript error object at throw time with Duktape.errThrow (if enabled).

Default: True

### DUK_USE_BOOLEAN_BUILTIN

Provide a Boolean built-in.

Default: True

### DUK_USE_BROWSER_LIKE

Provide browser-like bindings: currently print() and alert().

Default: True

### DUK_USE_BUILTIN_INITJS

Use built-in .js init code when creating a new global context. The .js init code (duk_initjs.js) provides some initialization code that's nicer to implement in ECMAScript, and is also used to provide some backwards compatibility bindings which are easy to remove later.

Default: True

### DUK_USE_COMMONJS_MODULES

Enable support for CommonJS modules. When enabled, the global require() function provides a simple module loader facility which depends on the user providing low level module searching functionality. When disabled, the global require() function is present but throws an error.

Default: True

### DUK_USE_DATE_BUILTIN

Provide a Date built-in.

Default: True

### DUK_USE_DOUBLE_LINKED_HEAP

Use a double-linked duk_heaphdr structure. Required when reference counting is enabled.

Default: True

### DUK_USE_ERRCREATE

Call Duktape.errCreate() when augmenting an ECMAScript error object being created.

Default: True

### DUK_USE_ERRTHROW

Call Duktape.errThrow() when augmenting an ECMAScript error object about to be thrown.

Default: True

### DUK_USE_ESBC_LIMITS

Impose byte and line number limits for compiled function bytecode.

Default: True

### DUK_USE_ESBC_MAX_BYTES

Maximum byte count for compiled function bytecode.

Default: 2147418112

### DUK_USE_ESBC_MAX_LINENUMBER

Maximum line number for compiled function bytecode.

Default: 2147418112

### DUK_USE_FUNCTION_BUILTIN

Provide a Function built-in.

Default: True

### DUK_USE_FUNC_FILENAME_PROPERTY

Add a non-standard ".fileName" property to function instances. Disabling reduces footprint.

Default: True

### DUK_USE_FUNC_NAME_PROPERTY

Add a "name" property to function instances. This is part of ECMAScript requirements, but low memory devices can sometimes opt to not include the .name to reduce footprint.

Default: True

### DUK_USE_GLOBAL_BINDING

Provide a 'globalThis' binding (https://github.com/tc39/proposal-global).

Default: True

### DUK_USE_GLOBAL_BUILTIN

Provide miscellaneous global built-ins like encodeURIComponent(), escape(), Infinity, etc. This is a catch-all for globals not covered by other options (like DUK_USE_ARRAY_BUILTIN).

Default: True

### DUK_USE_JC

Enable support for the JC custom JSON format.

Default: True

### DUK_USE_JSON_BUILTIN

Provide a JSON built-in.

Default: True

### DUK_USE_JSON_SUPPORT

Enable JSON functionality, affects both ECMAScript and C APIs. Note that disabling DUK_USE_JSON_BUILTIN still leaves the C API intact and pulls in the JSON encoding/decoding functionality; disable this option to remove that too.

Default: True

### DUK_USE_JX

Enable support for the JX custom JSON format.

Default: True

### DUK_USE_MATH_BUILTIN

Provide a Math built-in.

Default: True

### DUK_USE_NONSTD_ARRAY_CONCAT_TRAILER

In ES5.1 trailing gaps of an argument array don't count towards the result length. This is in essence a specification "bug" which was fixed in ES2015. This option was removed in 2.3.0, and the remaining behavior matches ES2015.

Default: True

### DUK_USE_NONSTD_ARRAY_MAP_TRAILER

This option was removed in 2.3.0 as it was unnecessary and in essence fixing a Duktape bug. ES5.0/ES5.1 already behave like ES2015 in that trailing gaps in the input don't affect the result length. The result array is created with a length based on the input array in Step 6 of ES5.1 Section 15.4.4.19 and subsequent index writes don't affect the length.

Default: True

### DUK_USE_NONSTD_ARRAY_SPLICE_DELCOUNT

For better compatibility with existing code, enable non-standard Array.prototype.splice() behavior when the second argument (deleteCount) is not given: the splice operation is extended to the end of the array, see https://github.com/svaarala/duktape/blob/master/tests/ecmascript/test-bi-array-proto-splice-no-delcount.js.

If this option is disabled, splice() will behave in a strictly conforming fashion, treating a missing deleteCount the same as an undefined (or 0) value.

Default: True

### DUK_USE_NONSTD_FUNC_CALLER_PROPERTY

Add a non-standard "caller" property to non-strict function instances for better compatibility with existing code. The semantics of this property are not standardized and may vary between engines; Duktape tries to behave close to V8 and Spidermonkey. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/caller description of the property. This feature disables tail call support.

This feature conflicts with several other features, so you should use it only if it's absolutely necessary.

Default: False

### DUK_USE_NONSTD_FUNC_SOURCE_PROPERTY

Add a non-standard "source" property to function instances. This allows function toString() to print out the actual function source. The property is disabled by default because it increases memory footprint.

NOTE: Unimplemented as of Duktape 1.3.0.

Default: False

### DUK_USE_NONSTD_FUNC_STMT

Enable support for function declarations outside program or function top level (also known as "function statements"). Such declarations are non-standard and the strictly compliant behavior is to treat them as a SyntaxError. When this option is enabled (recommended), Duktape behavior is to treat them like ordinary function declarations ("hoist" them to function top) with V8-like semantics.

Default: True

### DUK_USE_NONSTD_GETTER_KEY_ARGUMENT

Give getter calls the accessed property name as an additional non-standard argument. This allows a single getter function to be reused for multiple properties more easily. See http://duktape.org/guide.html#propertyvirtualization.

Default: True

### DUK_USE_NONSTD_JSON_ESC_U2028_U2029

When enabled, Duktape JSON.stringify() will escape U+2028 and U+2029 which is non-compliant behavior. This is recommended to make JSON.stringify() output valid when embedded in a web page or parsed with eval().

When disabled, Duktape provides the compliant behavior, i.e. no escaping for U+2028 and U+2029.

Default: True

### DUK_USE_NONSTD_REGEXP_DOLLAR_ESCAPE

Replaced by DUK_USE_ES6_REGEXP_SYNTAX.

Default: True

### DUK_USE_NONSTD_SETTER_KEY_ARGUMENT

Give setter calls the accessed property name as an additional non-standard argument. This allows a single setter function to be reused for multiple properties more easily. See http://duktape.org/guide.html#propertyvirtualization.

Default: True

### DUK_USE_NONSTD_STRING_FROMCHARCODE_32BIT

Allow 32-bit codepoints in String.fromCharCode(). This is non-compliant (the E5.1 specification has a ToUint16() coercion for the codepoints) but useful because Duktape supports non-BMP strings.

When disabled, Duktape provides the compliant behavior.

Default: True

### DUK_USE_NUMBER_BUILTIN

Provide a Number built-in.

Default: True

### DUK_USE_OBJECT_BUILTIN

Provide an Object built-in.

Default: True

### DUK_USE_OCTAL_SUPPORT

Enable optional octal number support (ECMAScript E5/E5.1 Annex B: http://www.ecma-international.org/ecma-262/5.1/#sec-B). Recommended because existing code bases use octal numbers.

Default: True

### DUK_USE_PARANOID_ERRORS

When enabled, error messages won't involve summarization of keys or values. Summaries may be an issue in some security sensitive environments because error messages will include e.g. property keys.

The default is to summarize offending base value and key for property access errors such as "null.foo = 123;", invalid calls such as "undefined()", etc. Base values and keys are summarized using duk_push_string_tval_readable().

Default: False

### DUK_USE_PC2LINE

Record a "pc2line" map into function instances which allows bytecode program counter values to be mapped into line numbers e.g. in error tracebacks.

Without this map, exceptions won't have meaningful line numbers but function instances will have a smaller footprint.

Default: True

### DUK_USE_PROMISE_BUILTIN

Enable Promise built-in.

At present entirely non-functional, and disabled by default.

Default: False

### DUK_USE_REGEXP_SUPPORT

Enable support for regular expressions (recommended).

When disabled, regexp literals are treated as a SyntaxError, RegExp constructor and prototype functions throw an error, String.prototype.replace() throws an error if given a regexp search value, String.prototype.split() throws an error if given a regexp separator value, String.prototype.search() and String.prototype.match() throw an error unconditionally.

Default: True

### DUK_USE_SECTION_B

Enable optional features in ECMAScript specification Annex B: http://www.ecma-international.org/ecma-262/5.1/#sec-B.

When disabled, escape(), unescape(), and String.prototype.substr() throw an error.

Default: True

### DUK_USE_SOURCE_NONBMP

Enable accurate Unicode support for non-BMP characters in source code.

When disabled non-BMP characters are always accepted as identifier characters. Disabling this option saves a little bit of code footprint.

Default: True

### DUK_USE_STRICT_DECL

Enable support for "use strict" declaration (recommended).

When disabled, ECMAScript code is always executed in non-strict mode. Duktape/C functions remain strict. This option is useful in some legacy environments where "use strict" declarations are used in existing code base but the Javascript engine didn't actually support strict mode.

Default: True

### DUK_USE_STRICT_UTF8_SOURCE

Enable strict UTF-8 parsing of source code.

When disabled, non-shortest encodings (normally invalid UTF-8) and surrogate pair codepoints are accepted as valid source code characters. Disabling this option breaks compatibility with some test262 tests.

Default: False

### DUK_USE_STRING_BUILTIN

Provide a String built-in.

Default: True

### DUK_USE_TAILCALL

Enable tail call support (recommended).

The non-standard function 'caller' property feature conflicts with tailcalls quite severely so tailcalls must be disabled if the 'caller' property is enabled.

Default: True

### DUK_USE_TRACEBACKS

Record traceback data into ECMAScript error objects.

When disabled, traceback data is not recorded, but fileName/lineNumber of the error cause are still recorded as explicit properties. Disabling this option reduces footprint and makes error handling a bit faster, at the cost of less informative ECMAScript errors.

Default: True

### DUK_USE_TRACEBACK_DEPTH

Define traceback collection depth. A large number causes tracedata to be larger, taking more time to create and consuming more memory. A small number makes tracebacks less useful.

When tracebacks are disabled this option affects .fileName and .lineNumber blaming. Error augmentation code won't look deeper than this value to find a function to blame for error .fileName / .lineNumber.

Default: 10

### DUK_USE_VERBOSE_ERRORS

Provide error message strings and file/line information for errors generated by Duktape.

When disabled, reduces footprint at the cost of much less informative ECMAScript errors.

Default: True

### DUK_USE_VERBOSE_EXECUTOR_ERRORS

Use verbose error messages in bytecode executor (recommended).

When disabled, reduces footprint slightly at the cost of more obscure error messages.

Default: True

## Execution options

### DUK_USE_COROUTINE_SUPPORT

Enable support for Duktape coroutines, i.e. yield/resume.

Default: True

### DUK_USE_EXEC_INDIRECT_BOUND_CHECK

For opcodes with indirect indices, check final index against stack size. Useful for diagnosing problems. Normally this check is not necessary because the compiler is trusted, and we don't bound check direct indices either.

Default: False

### DUK_USE_EXEC_TIMEOUT_CHECK

NOTE: This mechanism is EXPERIMENTAL and the details may change between releases.

Provide a hook to check for bytecode execution timeout. The macro gets a void ptr userdata argument (the userdata given to duk_heap_create()) and must evaluate to a duk_bool_t. Duktape calls the macro as: "if (DUK_USE_EXEC_TIMEOUT_CHECK(udata)) { ... }".

The macro is called occasionally by the Duktape bytecode executor (i.e. when executing ECMAScript code), typically from a few times per second to a hundred times per second, but the interval varies a great deal depending on what kind of code is being executed.

To indicate an execution timeout, the macro must return a non-zero value. When that happens, Duktape starts to bubble a RangeError outwards until control has been returned to the original protected call made by the application. Until that happens, the exec timeout macro must always return non-zero to indicate an execution timeout is still in progress.

This mechanism and its limitations is described in more detail in doc/sandboxing.rst.

Default: False

### DUK_USE_FINALIZER_SUPPORT

Enable support for object finalizers (Duktape specific).

Default: True

### DUK_USE_INTERRUPT_COUNTER

Enable the internal bytecode executor periodic interrupt counter. The mechanism is used to implement e.g. execution step limit, custom profiling, and debugger interaction. Enabling the interrupt counter has a small impact on execution performance.

Default: False

## Debugger options

### DUK_USE_DEBUGGER_DUMPHEAP

Support the DumpHeap command. This is optional because the command is not always needed. The command also has a relatively large footprint (about 10% of debugger code); in absolute terms it's about 1kB of code footprint.

Default: False

### DUK_USE_DEBUGGER_FWD_LOGGING

Forward log writes using the built-in logging framework to the debug client. Forwarding happens from the Duktape.Logger.prototype.info() etc calls before the raw() function is called, so that logging is forwarded even if you replace the backend.

Default: False

### DUK_USE_DEBUGGER_FWD_PRINTALERT

Forward calls to the built-in print() and alert() function to the debug client.

Default: False

### DUK_USE_DEBUGGER_INSPECT

Support debugger heap object inspection commands GetHeapObjInfo, GetObjPropDesc, GetObjPropDescRange. These are optional because the commands have a relatively high code footprint (about 3kB) and are not always needed.

Default: False

### DUK_USE_DEBUGGER_PAUSE_UNCAUGHT

Pause automatically when an error is about to be thrown and that error is (most likely) not going to be caught. An error is considered uncaught if there is no active catch clause in the current thread or in the current thread's resumer chain. This is not 100% accurate because there may be a finally clause which neutralizes the throw (e.g. converts it to a "return" or a "continue").

Default: False

### DUK_USE_DEBUGGER_SUPPORT

Enable support for Duktape debug protocol (see doc/debugger.rst) and the debug API calls (duk_debugger_attach(), duk_debugger_detach(), etc). This adds about 10kB of code footprint at the moment.

This option requires DUK_USE_INTERRUPT_COUNTER.

Default: False

### DUK_USE_DEBUGGER_THROW_NOTIFY

Send a Throw notify when an error is about to be thrown. The Throw notify also indicates if an error is fatal (most likely not caught) which is very useful in debugging.

Default: True

### DUK_USE_DEBUGGER_TRANSPORT_TORTURE

Development time option: force debugger transport torture. Concretely this now causes Duktape to read/write debug protocol data in 1-byte increments, which stresses message parsing and transport code.

Default: False

### DUK_USE_TARGET_INFO

Define a freeform human readable string to describe the target device (e.g. "Arduino Yun"). This string will be sent as part of version/target info in the debugger protocol and shows up in the debugger UI.

Default: {'string': 'unknown'}

## Debug options

### DUK_USE_DDDPRINT

Enable even more debug printouts. Not recommended unless you have grep handy. Replaced by DUK_USE_DEBUG_LEVEL.

Default: False

### DUK_USE_DDPRINT

Enable more debug printouts. Replaced by DUK_USE_DEBUG_LEVEL.

Default: False

### DUK_USE_DEBUG

Enable debug code in Duktape internals. Without this option other debugging options (such as DUK_USE_DEBUG_LEVEL and DUK_USE_DEBUG_WRITE) have no effect.

Default: False

### DUK_USE_DEBUG_BUFSIZE

Debug code uses a static buffer as a formatting temporary to avoid side effects in debug prints. The static buffer is large by default, which may be an issue in constrained environments. You can set the buffer size manually with this option, e.g. set DUK_USE_DEBUG_BUFSIZE to 2048.

Default: 65536

### DUK_USE_DEBUG_LEVEL

Set debug print level when DUK_USE_DEBUG is enabled. The level can be 0 (minimal), 1 (verbose), 2 (very verbose).

Default: 0

### DUK_USE_DEBUG_WRITE

Macro used for Duktape debug log writes (when DUK_USE_DEBUG is enabled). There's no default provider to avoid a dependency on platform I/O calls. The macro is called like a function with the following prototype: "void DUK_USE_DEBUG_WRITE(long level, const char file, long line, const charfunc, const char *msg)". The "file", "func", and "msg" arguments are non-NULL strings, though NULLs should be handled as good practice (it's ultimately up to duk_config.h whether NULL values are possible).

See http://wiki.duktape.org/HowtoDebugPrints.html for more information and examples.

Default: False

### DUK_USE_DPRINT

Enable debug printouts. Replaced by DUK_USE_DEBUG_LEVEL.

Default: False

### DUK_USE_DPRINT_COLORS

Enable coloring of debug prints with ANSI escape codes (http://en.wikipedia.org/wiki/ANSI_escape_code). The behavior is not sensitive to terminal settings.

Default: False

### DUK_USE_DPRINT_RDTSC

Print RDTSC cycle count in debug prints if available.

Default: False

### DUK_USE_SELF_TESTS

Perform run-time self tests when a Duktape heap is created. Catches platform/compiler problems which cannot be reliably detected during compile time. Not enabled by default because of the extra footprint.

Default: False

## Developer-only options

Developer options which are not intended for end users and are not part of semantic versioning guarantees (e.g. torture options).

### DUK_USE_ASSERTIONS

Enable internal assert checks. These slow down execution considerably so only use when debugging.

Default: False

### DUK_USE_INJECT_HEAP_ALLOC_ERROR

Force heap allocation to fail, value indicates the desired error position.

Default: False

### DUK_USE_INTERRUPT_DEBUG_FIXUP

For Duktape development only: enable "interrupt fixup" in call handling so that heap->inst_count_exec and heap->inst_count_interrupt can be manually checked to match. Only useful when debugging and/or asserts are enabled.

Default: False

## API options

### DUK_USE_BYTECODE_DUMP_SUPPORT

Enable support for API calls to dump/load function bytecode.

Default: True

## Codecs

### DUK_USE_BASE64_SUPPORT

Enable base64 encoding/decoding support.

Default: True

### DUK_USE_CBOR_BUILTIN

Provide a CBOR built-in with CBOR.encode() and CBOR.decode() functions.

Default: True

### DUK_USE_CBOR_SUPPORT

Include CBOR support. When disabled, CBOR functions in the C API (and the CBOR built-in, if enabled) will throw an error.

Default: True

### DUK_USE_HEX_SUPPORT

Enable hex encoding/decoding support.

Default: True

## Date handling options

### DUK_USE_DATE_FMT_STRFTIME

Use strftime() to format Date values in native, platform specific format before falling back into ISO 8601. When enabled, appropriate date/time headers must be included.

Default: False

### DUK_USE_DATE_FORMAT_STRING

Optional macro for formatting a date in a platform dependent manner, see datetime.rst.

Default: False

### DUK_USE_DATE_GET_LOCAL_TZOFFSET

Mandatory macro for getting the local time offset for a given datetime, see datetime.rst.

Default: False

### DUK_USE_DATE_GET_NOW

Mandatory macro for getting the current time, see datetime.rst. The macro is allowed (and recommended) to return millisecond fractions. The fractions are truncated by the Date built-in, but are available via duk_get_now() C API call.

If the time provided experiences time jumps or doesn't advance in realtime (which is useful in some time virtualization scenarios), consider defining DUK_USE_GET_MONOTONIC_TIME.

Default: False

### DUK_USE_DATE_NOW_GETTIMEOFDAY

Use gettimeofday() to get current datetime. When enabled, appropriate date/time headers must be included.

Default: False

### DUK_USE_DATE_NOW_TIME

Use time() to get current datetime, with the limitation that datetime is limited to one second resolution. When enabled, appropriate date/time headers must be included.

Default: False

### DUK_USE_DATE_NOW_WINDOWS

Use Win32 API calls to get current datetime.

Default: False

### DUK_USE_DATE_NOW_WINDOWS_SUBMS

Like DUK_USE_DATE_NOW_WINDOWS but use GetSystemTimePreciseAsFileTime(), available since Windows 8, for sub-millisecond resolution.

Default: False

### DUK_USE_DATE_PARSE_STRING

Optional macro for parsing a date in a platform dependent manner, see datetime.rst.

Default: False

### DUK_USE_DATE_PRS_GETDATE

Use getdate_r() to parse a platform specific datetime string into ECMAScript time. getdate_r() depends on DATEMSK being set so this is not always very convenient for an embedded interpreter. When enabled, appropriate date/time headers must be included.

Default: False

### DUK_USE_DATE_PRS_STRPTIME

Use strptime() to parse a platform specific datetime string into ECMAScript time.

Default: False

### DUK_USE_DATE_TZO_GMTIME

Use gmtime() to get local time offset at a certain time. When enabled, appropriate date/time headers must be included.

Since gmtime() is not re-entrant, this is not thread safe.

Default: False

### DUK_USE_DATE_TZO_GMTIME_R

Use gmtime_r() to get local time offset at a certain time. When enabled, appropriate date/time headers must be included.

Default: False

### DUK_USE_DATE_TZO_GMTIME_S

Use gmtime_s() to get local time offset at a certain time.

Default: False

### DUK_USE_DATE_TZO_WINDOWS

Use Win32 API calls to get local time offset at a certain time.

Default: False

### DUK_USE_DATE_TZO_WINDOWS_NO_DST

Use Win32 API calls to get local time offset at a certain time. Does not take into account daylight savings time.

Default: False

## Duktape specific options

### DUK_USE_DUKTAPE_BUILTIN

Provide a Duktape built-in.

Default: True

## ECMAScript 2015 (ES6) options

### DUK_USE_BUFFEROBJECT_SUPPORT

Enable support for Khronos/ES6 typed arrays and Node.js Buffer objects.

When disabled, Duktape custom plain buffer type is present and functional in the C API. Plain buffers have virtual properties and you can read/write buffer contents in ECMAScript code. Plain buffers will still inherit from ArrayBuffer.prototype, but none of the ECMAScript buffer related bindings will work. This includes all ArrayBuffer, typed array, and Node.js Buffer methods. Native bindings which produce plain buffer results (like Duktape.dec()) will still work.

Default: True

### DUK_USE_ES6

Enable ES6 functionality not covered by other specific config options.

Default: True

### DUK_USE_ES6_OBJECT_PROTO_PROPERTY

Provide the non-standard (ES6) Object.prototype.__proto__ property.

Default: True

### DUK_USE_ES6_OBJECT_SETPROTOTYPEOF

Provide the non-standard (ES6) Object.setPrototypeOf method.

Default: True

### DUK_USE_ES6_PROXY

Provide the non-standard (ES6) Proxy object.

Default: True

### DUK_USE_ES6_REGEXP_BRACES

Replaced by DUK_USE_ES6_REGEXP_SYNTAX.

Default: True

### DUK_USE_ES6_REGEXP_SYNTAX

Enable support for additional RegExp syntax from E6 Section B.1.4, such as: (1) dollar escape, (2) unescaped curly braces ('{' and '}'), and (3) unescaped right bracket (']'). This option does not enable all of the ES6 syntax because not all of the extra syntax is implemented; rather, the option enables whatever ES6 extra syntax has been implemented so far.

This option is recommended because a lot of existing code depends on literal regexp braces, and other non-ES5 constructs.

Default: True

### DUK_USE_ES6_UNICODE_ESCAPE

Enable support for ES6 Unicode escape syntax ("u{12345}") in source code and RegExps.

Default: True

### DUK_USE_HTML_COMMENTS

Enable ES2015 Annex B.1.3 HTML comment syntax.

Default: True

### DUK_USE_REFLECT_BUILTIN

Provide a Reflect built-in. The ES6 Reflect object provides a collection of methods for examining and manipulating objects at runtime.

Default: True

### DUK_USE_SHEBANG_COMMENTS

Support parsing of a "shebang" comment ('#!...') on the first line of source text.

Default: True

### DUK_USE_SYMBOL_BUILTIN

Provide ES6 Symbol built-ins.

Even with the built-ins disabled, symbols created by C code are still supported.

Default: True

## ECMAScript 2016 (ES7) options

### DUK_USE_ES7

Enable ES7 functionality not covered by other specific config options.

Default: True

### DUK_USE_ES7_EXP_OPERATOR

Support the ES7 exponentiation operator (* and*=). This is optional because the operator pulls in pow() which may have a significant footprint impact on bare metal platforms.

Default: True

## ECMAScript 2017 (ES8) options

### DUK_USE_ES8

Enable ES8 functionality not covered by other specific config options.

Default: True

## ECMAScript 2018 (ES9) options

### DUK_USE_ES9

Enable ES9 functionality not covered by other specific config options.

Default: True

## WHATWG Encoding API

### DUK_USE_ENCODING_BUILTINS

Provide TextEncoder and TextDecoder built-ins (the Encoding API) which allow ECMAScript code to encode and decode text stored in a buffer. Only UTF-8 is currently supported for decoding.

### DUK_USE_BUFFEROBJECT_SUPPORT is recommended but not required: If it is disabled, TextEncoder will encode to a plain buffer instead of a Uint8Array. TextDecoder always accepts plain buffers as input.


Default: True

## Garbage collection options

### DUK_USE_FINALIZER_TORTURE

Development time option: simulate a fake finalizer call every time when finalizers might be executed (even if the actual finalize_list is empty).

Default: False

### DUK_USE_GC_TORTURE

Development time option: force full mark-and-sweep on every allocation and in other chosen places to stress test memory management.

Using a low value (e.g. 3) for DUK_USE_MARK_AND_SWEEP_RECLIMIT is also recommended.

Default: False

### DUK_USE_MARKANDSWEEP_FINALIZER_TORTURE

Development time option: simulate a fake finalizer call during every mark-and-sweep round. This is useful to detect bugs caused by finalizer side effects. Most useful when combined with DUK_USE_GC_TORTURE so that potential finalizer side effects are realized on every allocation.

Default: False

### DUK_USE_MARK_AND_SWEEP

Enable mark-and-sweep garbage collection (recommended).

When disabled, only reference counting is used for garbage collection. This reduces code footprint and eliminates garbage collection pauses, but objects participating in unreachable reference cycles won't be collected until the Duktape heap is destroyed. In particular, function instances won't be collected because they're always in a reference cycle with their default prototype object. Unreachable objects are collected if you break reference cycles manually (and are always freed when a heap is destroyed).

NOTE: Removed in Duktape 2.0.0 because mark-and-sweep is no longer optional.

Default: True

### DUK_USE_MS_STRINGTABLE_RESIZE

Enable forced string intern table resize during mark-and-sweep garbage collection. This is the recommended behavior.

It may be useful to disable this option when reference counting is disabled, as mark-and-sweep collections will be more frequent and thus more expensive.

Default: True

### DUK_USE_REFCOUNT32

Use a 32-bit reference count field.

While on some 64-bit systems it's theoretically possible to wrap a 32-bit counter field, assuming a 16-byte duk_tval the Duktape heap would have to be larger than 64GB for that to happen. Because of this the default is to use a 32-bit refcount field.

Default: True

### DUK_USE_REFERENCE_COUNTING

Use reference counting for garbage collection.

Default: True

### DUK_USE_REFZERO_FINALIZER_TORTURE

Development time option: simulate a fake finalizer call for every object going through refzero freeing. This is useful to detect bugs caused by finalizer side effects in e.g. call handling.

Default: False

### DUK_USE_SHUFFLE_TORTURE

Development time option: force compiler to shuffle every possible opcode to stress shuffle behavior which is otherwise difficult to test for comprehensively.

Default: False

### DUK_USE_VOLUNTARY_GC

Enable voluntary periodic mark-and-sweep collection.

When disabled, a mark-and-sweep collection is still triggered in an out-of-memory condition (known as "emergency GC". When disabling this option it's recommended to use reference counting which collects all non-cyclical garbage. Application code should also request an explicit garbage collection from time to time when appropriate. When this option is disabled, Duktape will have no garbage collection pauses in ordinary use, which is useful for timing sensitive applications like games.

Default: True

## I/O options

### DUK_USE_FILE_IO

File I/O support. This is now used in a few API calls to e.g. push a string from file contents or eval a file. For portability it must be possible to disable I/O altogether.

Default: True

## Miscellaneous options

### DUK_USE_CALLSTACK_LIMIT

Maximum call stack size. If call stack would grow beyond this value, reject the call in progress. This mainly protects against runaway recursion. Note in particular that this limit is unrelated to the native C stack size which has a separate limit define.

Default: 10000

### DUK_USE_FULL_TVAL

Initialize all bytes of a duk_tval when setting a value into one.

By default only needed fields are initialized which reduces code size and improves performance slightly. This should cause no functional issues but may cause valgrind issues in rare cases, e.g. when debugger code dumps the constant table of a function (which then reads uninitialized bits).

Removed in 1.2.0 because the option was never enabled and there was no feature option to cause it to be used.

Default: False

### DUK_USE_VALSTACK_LIMIT

Maximum value stack size. If value stack is about to be grown beyond this size (the check includes a possible spare so the check isn't exact) reject the resize. The limit must be low enough so that when multiplied by sizeof(duk_tval), typically 8 or 16, the multiplication won't overflow size_t.

Default: 1000000

## Performance options

### DUK_USE_ARRAY_FASTPATH

Enable fast path for Array.prototype operations like push(), pop(), etc. The fast path handles dense Array instances which are more common than sparse arrays or non-array objects (which Array.prototype operations must also support). The fast path assumes that Array.prototype doesn't contain inherited index properties; such properties are very rarely used in practical code. If compliance is critical, disable the fast path.

Default: True

### DUK_USE_ARRAY_PROP_FASTPATH

Enable a shallow fast path check for Array index property reads and writes. The fast path assumes Array.prototype doesn't have numeric index properties which would be inherited and affect read/write behavior. This behavior is non-compliant (but practical because such inherited properties are very rare). Disable this option to ensure strict compliance.

Default: True

### DUK_USE_BASE64_FASTPATH

Enable fast path for base64 encode/decode. The fast path uses a lookup table at a small cost in footprint.

Default: True

### DUK_USE_CACHE_ACTIVATION

Cache duk_activation records. When releasing a duk_activation, place it in a free list for later reuse. Mark-and-sweep frees the free list to keep memory usage in check.

Default: True

### DUK_USE_CACHE_CATCHER

Cache duk_catcher records. When releasing a duk_catcher, place it in a free list for later reuse. Mark-and-sweep frees the free list to keep memory usage in check.

Default: True

### DUK_USE_EXEC_FUN_LOCAL

Use a local variable "fun" pointing to the current function in the bytecode dispatch loop instead of looking up the current function through "thr" every time it is needed. On x64 performance is slightly better without a "fun" local; on x86 performance is slightly better with one.

You should only tweak this if you're really interested in performance, and should then do proper testing to see which value works better.

Default: False

### DUK_USE_EXEC_REGCONST_OPTIMIZE

Use an internal optimization to access registers and constants in the bytecode executor. The optimization avoids unnecessary shifts when computing addresses but assumes sizeof(duk_tval) is 8 or 16. This is almost always the case, but when it isn't, disable this option.

Default: True

### DUK_USE_FASTINT

Enable support for 48-bit signed "fastint" integer values. Fastints are transparent to user code (both C and ECMAScript) but may be faster than IEEE doubles on some platforms, especially those using softints. The downside of fastints is increased code footprint and a small performance penalty for some kinds of code.

Default: False

### DUK_USE_FAST_REFCOUNT_DEFAULT

When enabled, plain refcount macros (e.g. DUK_TVAL_INCREF) default to fast variants (DUK_TVAL_INCREF_FAST) to improve performance.

Default: True

### DUK_USE_HEX_FASTPATH

Enable fast path for hex encode/decode. The fast path uses a lookup table at a small cost in footprint.

Default: True

### DUK_USE_HOBJECT_ARRAY_ABANDON_LIMIT

Abandon array part if its density is below L and array is larger than DUK_USE_HOBJECT_ARRAY_ABANDON_MINSIZE. The limit L is expressed as a .3 fixed point point, e.g. 2 means 2/8 = 25%.

The default limit is quite low: one array entry with packed duk_tval is 8 bytes whereas one normal entry is 4+1+8 = 13 bytes without a hash entry, and 17-21 bytes with a hash entry (load factor 0.5-1.0). So the array part shouldn't be abandoned very easily from a footprint point of view.

Default: 2

### DUK_USE_HOBJECT_ARRAY_ABANDON_MINSIZE

Minimum array size required for array to be abandoned. For example, a value of 257 means arrays up to 256 long are never abandoned. The default value ensures 8-bit lookups are not abandoned even if sparse or initialized in random order.

Default: 257

### DUK_USE_HOBJECT_ARRAY_FAST_RESIZE_LIMIT

Skip abandon check in object array part resize if `new_size < L * old_size`. The limit L is expressed as a .3 fixed point value, e.g. 9 means 9/8 = 112.5% of current size.

This is rather technical and you should only change the parameter if you've looked at the internals.

Default: 9

### DUK_USE_HOBJECT_ARRAY_MINGROW_ADD

Technical internal parameter, see sources for details. Only adjust if you've looked at the internals.

Default: 16

### DUK_USE_HOBJECT_ARRAY_MINGROW_DIVISOR

Technical internal parameter, see sources for details. Only adjust if you've looked at the internals.

Default: 8

### DUK_USE_HOBJECT_ENTRY_MINGROW_ADD

Technical internal parameter, see sources for details. Only adjust if you've looked at the internals.

Default: 16

### DUK_USE_HOBJECT_ENTRY_MINGROW_DIVISOR

Technical internal parameter, see sources for details. Only adjust if you've looked at the internals.

Default: 8

### DUK_USE_HOBJECT_HASH_PROP_LIMIT

Minimum number of properties needed for a hash part to be included in the object property table. This limit is checked whenever an object is resized.

A hash part improves property lookup performance even for small objects, starting from roughly 4 properties. However, this ignores the cost of setting up and managing the hash part, which is offset only if property lookups made through the hash part can offset the setup cost. A hash part is worth it for heavily accessed small objects or large objects (even those accessed quite infrequently). The limit doesn't take into account property access frequency, so it is necessarily a compromise.

A lower value improves performance (a value as low a 4-8 can be useful) while a higher value conserves memory.

Default: 8

### DUK_USE_HSTRING_LAZY_CLEN

When enabled, duk_hstring charlen is computed only when accessed; because the charlen of most strings is not accessed during their lifetime, this reduces unnecessary charlen calculations. When disabled, charlen is computed during interning which has smaller code footprint at slightly slower charlen handling.

Default: True

### DUK_USE_IDCHAR_FASTPATH

Enable fast path for identifier start/part tables, which affect lexing and JSON performance slightly at a small cost in footprint.

Default: True

### DUK_USE_JSON_DECNUMBER_FASTPATH

Enable fast path for decoding numbers in JSON.parse(). The fast path uses a lookup table at a small cost in footprint.

Default: True

### DUK_USE_JSON_DECSTRING_FASTPATH

Enable fast path for string decoding in JSON.parse(). The fast path uses a lookup table at a small cost in footprint.

Default: True

### DUK_USE_JSON_EATWHITE_FASTPATH

Enable fast path for eating whitespace in JSON.parse(). The fast path uses a lookup table at a small cost in footprint.

Default: True

### DUK_USE_JSON_QUOTESTRING_FASTPATH

Enable fast path for string quoting in JSON.stringify(). The fast path uses a lookup table at a small cost in footprint.

Default: True

### DUK_USE_JSON_STRINGIFY_FASTPATH

Enable fast path for JSON.stringify() serialization. The fast path is used when there is no "replacer" argument. Indent argument and JX/JC format is supported since Duktape 1.4.0. The fast path increases code footprint by roughly 1.5 kB but is up to 4-5x faster than the slow path.

Current limitation: assumes "long long" type exists (and covers duk_int64_t range) and that sprintf() format string "%lld" works for "long long".

Default: False

### DUK_USE_LITCACHE_SIZE

Size of the literal cache, which maps C literal memory addresses into pinned duk_hstring heap object addresses. The cache is used when application code calls one of the duk_xxx_literal() API call variants, such as duk_push_literal() or duk_get_prop_literal(), to speed up the string intern check for the literal. In successful cases this caching makes using duk_xxx_literal() almost as fast as using borrowed heap pointers with duk_xxx_heapptr().

When this option is defined, duk_hstrings related to literals encountered in duk_xxx_literal() API calls are automatically pinned between mark-and-sweep rounds. This accomplishes two things. First, it avoids the need for cache invalidation for the literal cache in normal operation between mark-and-sweep rounds. Second, it reduces string table traffic (i.e. freeing and reallocating) for literals which are likely to occur again and again. However, the downside is that some strings that may occur only temporarily will remain pinned until the next mark-and-sweep round. If this matter, you can avoid it by simply using e.g. duk_xxx_string() when dealing with such strings.

The literal cache size must be a power of two (2^N).

Default: 256

### DUK_USE_REGEXP_CANON_BITMAP

Use a small lookup table (footprint impact is ~300-400 bytes) to speed up case insensitive RegExp canonicalization. The result is still much slower than with DUK_USE_REGEXP_CANON_WORKAROUND but ~50x faster than without the lookup.

Default: True

### DUK_USE_REGEXP_CANON_WORKAROUND

Use a 128kB lookup table for RegExp codepoint canonicalization to improve performance of case insensitive RegExp handling.

This is a temporary workaround until there's better support for faster Unicode handling.

Default: False

### DUK_USE_STRHASH_DENSE

Use the slower but more dense string hash algorithm from Duktape 1.3.0 and prior (based on Murmurhash2). This may be useful if you're experiencing collision issues with the default hash algorithm.

Default: False

### DUK_USE_STRHASH_SKIP_SHIFT

Shift value to use for string hash skip offset when using the default (fast) string hash. The skip offset is calculated as: ((length `>>` DUK_USE_STRHASH_SKIP_SHIFT) + 1). A higher value will be slower but sample the string more densely.

You should only change this if you run into issues with the default value.

Default: 5

### DUK_USE_STRTAB_GROW_LIMIT

Grow top level strtable allocation when load factor reaches this value. Expressed as a .4 fixed point; the load factor is computed as floor((count / size) * 16.0), e.g. 32 means a load factor of 2.0.

Default: 17

### DUK_USE_STRTAB_MAXSIZE

Maximum size for Duktape heap string table, must be 2^N, and small enough so that if the value is multiplied by sizeof(duk_hstring *) it won't overflow duk_size_t.

To avoid resizing the strtable at all, set DUK_USE_STRTAB_MINSIZE and DUK_USE_STRTAB_MAXSIZE to the same value.

Default: 268435456

### DUK_USE_STRTAB_MINSIZE

Minimum size for Duktape heap string table, must be 2^N, and should never be lower than 64.

Default: 1024

### DUK_USE_STRTAB_PTRCOMP

Pointer compress the top level heap->strtable[] string table. On 32-bit targets this saves 2 bytes per entry, e.g. for 256 entries 0.5kB. However, the additional pointer compression code increases footprint by 200-300 bytes. The option also reduces performance a little bit, so this should be enabled when RAM is much more constrained than ROM.

Default: False

### DUK_USE_STRTAB_RESIZE_CHECK_MASK

Somewhat technical: bit mask (must be 2^N-1) used against heap->st_count to determine the interval between string table resize checks. A resize check is made when heap->st_count & DUK_USE_STRTAB_RESIZE_CHECK_MASK is zero.

A large value makes string table grow/shrink checks less frequent. Usually this has very little practical impact on memory performance. There are corner cases, such as dereferencing a large number of strings simultaneously, where this parameter affects how many new strings need to be inserted before the string table shrinks to a more appropriate size.

Default: 255

### DUK_USE_STRTAB_SHRINK_LIMIT

Shrink top level strtable allocation when load factor reaches this value. Expressed as a .4 fixed point; the load factor is computed as floor((count / size) * 16.0), e.g. 8 means a load factor of 0.5.

Default: 6

### DUK_USE_VALSTACK_GROW_SHIFT

When growing the value stack, shift minimum size right by this amount to come up with a slack which is allocated on top of the minimum required size. The slack increases memory usage a bit, but reduces value stack reallocations when the minimum size grows. A value of 2 means that a 25% slack is used. Undefine to remove any slack, value stack is then always grown by the minimum amount possible.

Default: 2

### DUK_USE_VALSTACK_SHRINK_CHECK_SHIFT

When doing a value stack shrink check, skip shrinking if the difference between the minimum reserve and allocated size is less than (curr_size >> DUK_USE_VALSTACK_SHRINK_CHECK_SHIFT) bytes. A value of 2 means that the difference must be at least 25% for a shrink to happen. If undefined, value stack is always shrunk to the minimum reserved size with no slack.

Default: 2

### DUK_USE_VALSTACK_SHRINK_SLACK_SHIFT

When shrinking, leave (curr_size >> DUK_USE_VALSTACK_SHRINK_SLACK_SHIFT) bytes as a slack. This shift count must be larger than DUK_USE_VALSTACK_SHRINK_CHECK_SHIFT.

Default: 4

### DUK_USE_VALSTACK_UNSAFE

Don't check allocated value stack size in operations like value stack pushes. Improves performance of API calls but causes unsafe memory behavior (e.g. a segfault) when user code pushes beyond "checked" value stack size.

Default: False

## Performance API (High Resolution Time)

### DUK_USE_PERFORMANCE_BUILTIN

Provide a 'performance' global object based on https://www.w3.org/TR/hr-time/.

Default: True

Development time torture options
Development time options to stress test corner case handling by e.g. causing a garbage collection on every allocation.

### DUK_USE_STRTAB_TORTURE

Resize string table (grow, shrink back) for every intern. Ensures string table chaining is correct, and resize side effects are exercised on every resize.

Default: False

