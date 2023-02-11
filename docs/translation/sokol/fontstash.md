sokol_fontstash.h -- renderer for https://github.com/memononen/fontstash
                     on top of sokol_gl.h

Project URL: https://github.com/floooh/sokol

Do this:
    #define SOKOL_IMPL or
    #define SOKOL_FONTSTASH_IMPL

before you include this file in *one* C or C++ file to create the
implementation.

The following defines are used by the implementation to select the
platform-specific embedded shader code (these are the same defines as
used by sokol_gfx.h and sokol_app.h):

SOKOL_GLCORE33
SOKOL_GLES2
SOKOL_GLES3
SOKOL_D3D11
SOKOL_METAL

...optionally provide the following macros to override defaults:

SOKOL_ASSERT(c)     - your own assert macro (default: assert(c))
SOKOL_FONTSTASH_API_DECL    - public function declaration prefix (default: extern)
SOKOL_API_DECL      - same as SOKOL_FONTSTASH_API_DECL
SOKOL_API_IMPL      - public function implementation prefix (default: -)
SOKOL_UNREACHABLE() - a guard macro for unreachable code (default: assert(false))

Include the following headers before including sokol_fontstash.h:

    sokol_gfx.h

Additionally include the following headers for including the sokol_fontstash.h
implementation:

    sokol_gl.h

HOW TO
======
--- First initialize sokol-gfx and sokol-gl as usual:

        sg_setup(&(sg_desc){...});
        sgl_setup(&(sgl_desc){...});

--- Create at least one fontstash context with sfons_create() (this replaces
    glfonsCreate() from fontstash.h's example GL renderer:

        FONScontext* ctx = sfons_create(&(sfons_desc_t){
            .width = atlas_width,
            .height = atlas_height,
        });

    Each FONScontext manages one font atlas texture which can hold rasterized
    glyphs for multiple fonts.

--- From here on, use fontstash.h's functions "as usual" to add TTF
    font data and draw text. Note that (just like with sokol-gl), text
    rendering can happen anywhere in the frame, not only inside
    a sokol-gfx rendering pass.

--- You can use the helper function

        uint32_t sfons_rgba(uint8_t r, uint8_t g, uint8_t b, uint8_t a)

    To convert a 0..255 RGBA color into a packed uint32_t color value
    expected by fontstash.h.

--- Once per frame before calling sgl_draw(), call:

        sfons_flush(FONScontext* ctx)

    ...this will update the dynamic sokol-gfx texture with the latest font
    atlas content.

--- To actually render the text (and any other sokol-gl draw commands),
    call sgl_draw() inside a sokol-gfx frame.

--- NOTE that you can mix fontstash.h calls with sokol-gl calls to mix
    text rendering with sokol-gl rendering. You can also use
    sokol-gl's matrix stack to position fontstash.h text in 3D.

--- finally on application shutdown, call:

        sfons_destroy(FONScontext* ctx)

    before sgl_shutdown() and sg_shutdown()


WHAT HAPPENS UNDER THE HOOD:
============================

FONScontext* sfons_create(const sfons_desc_t* desc)
    - creates a sokol-gfx shader compatible with sokol-gl
    - creates an sgl_pipeline object with alpha-blending using
      this shader
    - creates a 1-byte-per-pixel font atlas texture via sokol-gfx
      (pixel format SG_PIXELFORMAT_R8)

fonsDrawText():
    - this will call the following sequence of sokol-gl functions:

        sgl_enable_texture();
        sgl_texture(...);
        sgl_push_pipeline();
        sgl_load_pipeline(...);
        sgl_begin_triangles();
        for each vertex:
            sgl_v2f_t2f_c1i(...);
        sgl_end();
        sgl_pop_pipeline();
        sgl_disable_texture();

    - note that sokol-gl will merge several sgl_*_begin/sgl_end pairs
      into a single draw call if no relevant state has changed, typically
      all calls to fonsDrawText() will be merged into a single draw call
      as long as all calls use the same FONScontext

sfons_flush(FONScontext* ctx):
    - this will call sg_update_image() on the font atlas texture
      if fontstash.h has added any rasterized glyphs since the last
      frame

sfons_destroy(FONScontext* ctx):
    - destroy the font atlas texture, sgl_pipeline and sg_shader objects


MEMORY ALLOCATION OVERRIDE
==========================
You can override the memory allocation functions at initialization time
like this:

    void* my_alloc(size_t size, void* user_data) {
        return malloc(size);
    }

    void my_free(void* ptr, void* user_data) {
        free(ptr);
    }

    ...
    FONScontext* fons_context = sfons_create(&(sfons_desc_t){
        ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...,
        }
    });
    ...

If no overrides are provided, malloc and free will be used. Please
note that this doesn't affect any memory allocation performed
in fontstash.h (unfortunately those are hardwired to malloc/free).

LICENSE
=======
zlib/libpng license

Copyright (c) 2018 Andre Weissflog

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the
use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software in a
    product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not
    be misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.