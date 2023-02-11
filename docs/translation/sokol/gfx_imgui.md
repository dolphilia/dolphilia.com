sokol_gfx_imgui.h -- debug-inspection UI for sokol_gfx.h using Dear ImGui

Project URL: https://github.com/floooh/sokol

Do this:
    #define SOKOL_IMPL or
    #define SOKOL_GFX_IMGUI_IMPL

before you include this file in *one* C or C++ file to create the
implementation.

NOTE that the implementation can be compiled either as C++ or as C.
When compiled as C++, sokol_gfx_imgui.h will directly call into the
Dear ImGui C++ API. When compiled as C, sokol_gfx_imgui.h will call
cimgui.h functions instead.

Include the following file(s) before including sokol_gfx_imgui.h:

    sokol_gfx.h

Additionally, include the following headers before including the
implementation:

If the implementation is compiled as C++:
    imgui.h

If the implementation is compiled as C:
    cimgui.h

The sokol_gfx.h implementation must be compiled with debug trace hooks
enabled by defining:

    SOKOL_TRACE_HOOKS

...before including the sokol_gfx.h implementation.

Before including the sokol_gfx_imgui.h implementation, optionally
override the following macros:

    SOKOL_ASSERT(c)     -- your own assert macro, default: assert(c)
    SOKOL_UNREACHABLE   -- your own macro to annotate unreachable code,
                           default: SOKOL_ASSERT(false)
    SOKOL_GFX_IMGUI_API_DECL      - public function declaration prefix (default: extern)
    SOKOL_API_DECL      - same as SOKOL_GFX_IMGUI_API_DECL
    SOKOL_API_IMPL      - public function implementation prefix (default: -)

If sokol_gfx_imgui.h is compiled as a DLL, define the following before
including the declaration or implementation:

SOKOL_DLL

On Windows, SOKOL_DLL will define SOKOL_GFX_IMGUI_API_DECL as __declspec(dllexport)
or __declspec(dllimport) as needed.

STEP BY STEP:
=============
--- create an sg_imgui_t struct (which must be preserved between frames)
    and initialize it with:

        sg_imgui_init(&sg_imgui, &(sg_imgui_desc_t){ 0 });

    Note that from C++ you can't inline the desc structure initialization:

        const sg_imgui_desc_t desc = { };
        sg_imgui_init(&sg_imgui, &desc);

    Provide optional memory allocator override functions (compatible with malloc/free) like this:

        sg_imgui_init(&sg_imgui, &(sg_imgui_desc_t){
            .allocator = {
                .alloc = my_malloc,
                .free = my_free,
            }
        });

--- somewhere in the per-frame code call:

        sg_imgui_draw(&sg_imgui)

    this won't draw anything yet, since no windows are open.

--- open and close windows directly by setting the following public
    booleans in the sg_imgui_t struct:

        sg_imgui.buffers.open = true;
        sg_imgui.images.open = true;
        sg_imgui.shaders.open = true;
        sg_imgui.pipelines.open = true;
        sg_imgui.passes.open = true;
        sg_imgui.capture.open = true;

    ...for instance, to control the window visibility through
    menu items, the following code can be used:

        if (ImGui::BeginMainMenuBar()) {
            if (ImGui::BeginMenu("sokol-gfx")) {
                ImGui::MenuItem("Buffers", 0, &sg_imgui.buffers.open);
                ImGui::MenuItem("Images", 0, &sg_imgui.images.open);
                ImGui::MenuItem("Shaders", 0, &sg_imgui.shaders.open);
                ImGui::MenuItem("Pipelines", 0, &sg_imgui.pipelines.open);
                ImGui::MenuItem("Passes", 0, &sg_imgui.passes.open);
                ImGui::MenuItem("Calls", 0, &sg_imgui.capture.open);
                ImGui::EndMenu();
            }
            ImGui::EndMainMenuBar();
        }

--- before application shutdown, call:

        sg_imgui_discard(&sg_imgui);

    ...this is not strictly necessary because the application exits
    anyway, but not doing this may trigger memory leak detection tools.

--- finally, your application needs an ImGui renderer, you can either
    provide your own, or drop in the sokol_imgui.h utility header

ALTERNATIVE DRAWING FUNCTIONS:
==============================
Instead of the convenient, but all-in-one sg_imgui_draw() function,
you can also use the following granular functions which might allow
better integration with your existing UI:

The following functions only render the window *content* (so you
can integrate the UI into you own windows):

    void sg_imgui_draw_buffers_content(sg_imgui_t* ctx);
    void sg_imgui_draw_images_content(sg_imgui_t* ctx);
    void sg_imgui_draw_shaders_content(sg_imgui_t* ctx);
    void sg_imgui_draw_pipelines_content(sg_imgui_t* ctx);
    void sg_imgui_draw_passes_content(sg_imgui_t* ctx);
    void sg_imgui_draw_capture_content(sg_imgui_t* ctx);

And these are the 'full window' drawing functions:

    void sg_imgui_draw_buffers_window(sg_imgui_t* ctx);
    void sg_imgui_draw_images_window(sg_imgui_t* ctx);
    void sg_imgui_draw_shaders_window(sg_imgui_t* ctx);
    void sg_imgui_draw_pipelines_window(sg_imgui_t* ctx);
    void sg_imgui_draw_passes_window(sg_imgui_t* ctx);
    void sg_imgui_draw_capture_window(sg_imgui_t* ctx);

Finer-grained drawing functions may be moved to the public API
in the future as needed.

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
        sg_imgui_init(&(&ctx, &(sg_imgui_desc_t){
            // ...
            .allocator = {
                .alloc = my_alloc,
                .free = my_free,
                .user_data = ...;
            }
        });
    ...

This only affects memory allocation calls done by sokol_gfx_imgui.h
itself though, not any allocations in OS libraries.


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