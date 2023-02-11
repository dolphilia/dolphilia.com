sokol_spine.h -- a sokol-gfx renderer for the spine-c runtime
                 (see https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c)

Project URL: https://github.com/floooh/sokol

Do this:
    #define SOKOL_IMPL or
    #define SOKOL_SPINE_IMPL

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
SOKOL_SPINE_API_DECL    - public function declaration prefix (default: extern)
SOKOL_API_DECL      - same as SOKOL_SPINE_API_DECL
SOKOL_API_IMPL      - public function implementation prefix (default: -)
SOKOL_UNREACHABLE() - a guard macro for unreachable code (default: assert(false))

If sokol_spine.h is compiled as a DLL, define the following before
including the declaration or implementation:

SOKOL_DLL

On Windows, SOKOL_DLL will define SOKOL_SPINE_API_DECL as __declspec(dllexport)
or __declspec(dllimport) as needed.

Include the following headers before including sokol_spine.h:

    sokol_gfx.h

Include the following headers before include the sokol_spine.h *IMPLEMENTATION*:

    spine/spine.h

You'll also need to compile and link with the spine-c runtime:

    https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c/spine-c


FEATURE OVERVIEW
================
sokol_spine.h is a sokol-gfx renderer and 'handle wrapper' for Spine
(http://en.esotericsoftware.com/spine-in-depth) on top of the
spine-c runtime: http://en.esotericsoftware.com/spine-c (source code:
https://github.com/EsotericSoftware/spine-runtimes/tree/4.1/spine-c/spine-c).

The sokol-gfx renderer allows to manage multiple contexts for rendering
Spine scenes into different sokol-gfx render passes (similar to sokol-gl and
sokol-debugtext), allows to split rendering into layers to mix Spine
rendering with other rendering operations, and it automatically batches
adjacent draw calls for Spine objects that use the same texture and in the
same layer.

Sokol-spine wraps 'raw' spine-c objects with tagged index handles. This
eliminates the risk of memory corruption via dangling pointers. Any
API calls involving invalid objects either result in a no-op, or
in a proper error.

The sokol-spine API exposes four 'base object types', and a number of
'subobject types' which are owned by base objects.

Base object types are:

- sspine_atlas: A wrapper around a spine-c spAtlas object, each spAtlas
  object owns at least one spAtlasPage object, and each spAtlasPage object
  owns exactly one sokol-gfx image object.

- sspine_skeleton: A skeleton object requires an atlas object for creation,
  and is a wrapper around one spine-c spSkeletonData and one
  spAnimationStateData object.  both contain the shared static data for
  individual spine instances

- sspine_instance: Instance objects are created from skeleton objects.
  Instances are the objects that are actually getting rendered. Each instance
  tracks its own transformation and animation state, but otherwise just
  references shared data of the skeleton object it was created from. An
  sspine_instance object is a wrapper around one spine-c spSkeleton,
  spAnimationState and spSkeletonClipping object each.

- sspine_skinset: Skin-set objects are collections of skins which define
  the look of an instance. Some Spine scenes consist of combinable skins
  (for instance a human character could offer different skins for different
  types of clothing, hats, scarfs, shirts, pants, and so on..., and a skin
  set would represent a specific outfit).

Subobject types allow to inspect and manipulate Spine objects in more detail:

- sspine_anim: Each skeleton object usually offers animations which can
  then be scheduled and mixed on an instance.

- sspine_bone: Bone objects are the hierarchical transform nodes of
  a skeleton. The sokol-spine API allows both to inspect the shared
  static bone attributes of an sspine_skeleton object, as well as
  inspecting and manipulating the per-instance bone attributes
  on an sspine_instance object.

- sspine_event: A running Spine animation may fire 'events' at certain
  positions in time (for instance a 'footstep' event whenever a foot
  hits the ground). Events can be used to play sound effects (or visual
  effects) at the right time.

- sspine_iktarget: Allows to set the target position for a group of
  bones controlled by inverse kinematics.

There's a couple of other subobject types which are mostly useful to
inspect the interior structure of skeletons. Those will be explained
in detail further down.

MINIMAL API USAGE OVERVIEW
==========================
During initialization:

    - call sspine_setup() after initializating sokol-gfx
    - create an atlas object from a Spine atlas file with sspine_make_atlas()
    - load and initialize the sokol-gfx image objects referenced by the atlas
    - create a skeleton object from a Spine skeleton file with sspine_make_skeleton()
    - create at least one instance object with sspine_make_instance()

In the frame loop, outside of sokol-gfx render passes:

    - if needed, move instances around with sspine_set_position()
    - if needed, schedule new animations with sspine_set_animation() and sspine_add_animation()
    - each frame, advance the current instance animation state with sspine_update_instance()
    - each frame, render instances with sspine_draw_instance_in_layer(), this just records
      vertices, indices and draw commands into internal buffers, but does no actual
      sokol-gfx rendering

In the frame loop, inside a sokol-gfx render pass:

    - call sspine_draw_layer() to draw all previously recorded instances in a specific layer

On shutdown:

    - call sspine_shutdown(), ideally before shutting down sokol-gfx

QUICKSTART STEP BY STEP
=======================
For a simple demo program using sokol_app.h, sokol_gfx.h and sokol_fetch.h,
see here: [TODO: add link to spine-simple-sapp wasm demo].

- sokol_spine.h must be included after sokol_gfx.h (this is true both
  for the declaration and implementation):

    #include "sokol_gfx.h"
    #include "sokol_spine.h"

- ...and sokol_gfx.h must be initialized before sokol_spine.h:

    sg_setup(&(sg_desc){ ... });
    sspine_setup(&(sspine_desc){ ... });

- You can tweak the memory usage of sokol-spine by limiting or expanding the
  maximum number of vertices, draw commands and pool sizes:

    sspine_setup(&(sspine_desc){
        .max_vertices = 1024,       // default: (1<<16) = 65536
        .max_commands = 128,        // default: (1<<14) = 16384
        .context_pool_size = 1,     // default: 4
        .atlas_pool_size = 1,       // default: 64
        .skeleton_pool_size = 1,    // default: 64
        .skinset_pool_size = 1,     // default: 64
        .instance_pool_size = 16,   // default: 1024
    });

  Sokol-spine uses 32-bit vertex-indices for rendering
  (SG_INDEXTYPE_UINT32), so that the maximum number of Spine vertices
  in a frame isn't limited to (1<<16).

- You can override the default memory allocation and
  error logging functions, this is explained in detail further down:

    sspine_setup(&(sspine_desc){
        .allocator = { ... },
        .logger = { ... }
    });

- After initialization, the first thing you need is an sspine_atlas object.
  Sokol-spine doesn't concern itself with file IO, it expects all external
  data to be provided as pointer/size pairs:

    sspine_atlas atlas = sspine_make_atlas(&(sspine_atlas_desc){
        .data = {
            .ptr = ...,  // pointer to Spine atlas file data in memory
            .size = ..., // atlas file data size in bytes
        }
    });
    assert(sspine_atlas_valid(atlas));

  If you load the atlas data asynchronously, you can still run your
  per-frame rendering code without waiting for the atlas data to be loaded
  and the atlas to be created. This works because calling sokol-spine
  functions with 'invalid' object handles is a valid no-op.

- Optionally you can override some or all of the atlas texture creation parameters:

    sspine_atlas atlas = sspine_make_atlas(&(sspine_atlas_desc){
        .data = { ... },
        .overrides = {
            .min_filter = SG_FILTER_NEAREST,
            .mag_filter = SG_FILTER_NEAREST,
            .wrap_u = SG_WRAP_MIRROR,
            .wrap_v = SG_WRAP_MIRROR,
            .premul_alpha_enabled = ...,
            .premul_alpha_disabled = ...,
        }
    });

- The atlas file itself doesn't contain any texture data, it only contains
  filenames of the required textures. Sokol-spine has already allocated
  a sokol-gfx sg_image handle for each required texture, but the actual
  texture loading and initialization must be performed by user code:

    // iterate over atlas textures and initialize sokol-gfx image objects
    // with existing handles
    const int num = sspine_num_images(atlas);
    for (int i = 0; i < num; i++) {
        const sspine_image img = sspine_image_by_index(atlas, i);
        const sspine_image_info img_info = sspine_get_image_info(img);
        assert(img_info.valid);
        assert(!img_info.filename.truncated);

        // the filename is now in img_info.filename.cstr, 'somehow'
        // load and decode the image data into memory, and then
        // initialize the sokol-gfx image from the existing sg_image handle
        // in img_info.sgimage:
        sg_init_image(img_info.sgimage, &(sg_image_desc){
            .width = ...,
            .height = ...,
            .pixel_format = ...,
            .min_filter = img_info.min_filter,
            .mag_filter = img_info.mag_filter,
            .wrap_u = img_info.wrap_u,
            .wrap_v = img_info.wrap_v,
            .data.subimage[0][0] = {
                .ptr = ...,     // pointer to decoded image pixel data
                .size = ...,    // size of decoded image pixel data in bytes
            }
        });
    }

  If you load the image data asynchronously, you can still simply start rendering
  before the image data is loaded. This works because sokol-gfx will silently drop
  any rendering operations that involve 'incomplete' objects.

- Once an atlas object has been created (independently from loading any image data),
  an sspine_skeleton object is needed next. This requires a valid atlas object
  handle as input, and a pointer to the Spine skeleton file data loaded into memory.

  Spine skeleton files come in two flavours: binary or json, for binary data,
  a ptr/size pair must be provided:

    sspine_skeleton skeleton = sspine_make_skeleton(&(sspine_skeleton_desc){
        .atlas = atlas,     // atlas must be a valid sspine_atlas handle
        .binary_data = {
            .ptr = ...,     // pointer to binary skeleton data in memory
            .size = ...,    // size of binary skeleton data in bytes
        }
    });
    assert(sspine_skeleton_valid(skeleton));

  For JSON skeleton file data, the data must be provided as a zero-terminated C string:

    sspine_skeleton skeleton = sspine_make_skeleton(&(sspine_skeleton_desc){
        .atlas = atlas,
        .json_data = ...,   // JSON skeleton data as zero-terminated(!) C-string
    });

  Like with all sokol-spine objects, if you load the skeleton data asynchronously
  and only then create a skeleton object, you can already start rendering before
  the data is loaded and the Spine objects have been created. Any operations
  involving 'incomplete' handles will be dropped.

- You can pre-scale the Spine scene size, and you can provide a default cross-fade
  duration for animation mixing:

    sspine_skeleton skeleton = sspine_make_skeleton(&(sspine_skeleton_desc){
        .atlas = atlas,
        .binary_data = { ... },
        .prescale = 0.5f,           // scale to half-size
        .anim_default_mix = 0.2f,   // default anim mixing cross-fade duration 0.2 seconds
    });

- Once the skeleton object has been created, it's finally time to create one or many instance objects.
  If you want to independently render and animate the 'same' Spine object many times in a frame,
  you should only create one sspine_skeleton object, and then as many sspine_instance object
  as needed from the shared skeleton object:

    sspine_instance instance = sspine_make_instance(&(sspine_instance_desc){
        .skeleton = skeleton,   // must be a valid skeleton handle
    });
    assert(sspine_instance_valid(instance));

  After creation, the sspine_instance will have a 'default skin' set as its appearance.

- To set the position of an instance:

    sspine_set_position(inst, (sspine_vec2){ .x=..., .y=... });

  Sokol-spine doesn't define a specific unit (like pixels or meters), instead the
  rendering coordinate system is defined later at 'render time'.

- To schedule an initial looping animation by its name:

    // first lookup up the animation by name on the skeleton:
    sspine_anim anim = sspine_anim_by_name(skeleton, "walk");
    assert(sspine_anim_valid(anim));

    // then schedule the animation on the instance, on mixer track 0, as looping:
    sspine_set_animation(instance, anim, 0, true);

  Scheduling and mixing animations will be explained in more detail further down.

- To advance and mix instance animations:

    sspine_update_instance(instance, delta_time_in_seconds);

  Usually you'd call this each frame for each active instance with the
  frame duration in seconds.

- Now it's finally time to 'render' the instance at its current position and
  animation state:

    sspine_draw_instance_in_layer(instance, 0);

  Instances are generally rendered into numbered virtual 'render layers' (in this
  case, layer 0). Layers are useful for interleaving sokol-spine rendering
  with other rendering commands (like background and foreground tile maps,
  sprites or text).

- It's important to note that no actual sokol-gfx rendering happens in
  sspine_draw_instance_in_layer(), instead only vertices, indices and
  draw commands are recorded into internal memory buffes.

- The only sokol-spine function which *must* (and should) be called inside
  a sokol-gfx rendering pass is sspine_draw_layer().

  This renders all draw commands that have been recorded previously in a
  specific layer via sspine_draw_instance_in_layer().

    const sspine_layer_transform tform = { ... };

    sg_begin_default_pass(...);
    sspine_draw_layer(0, tform);
    sg_end_pass();
    sg_commit();

  IMPORTANT: DO *NOT* MIX any calls to sspine_draw_instance_in_layer()
  with sspine_draw_layer(), as this will confuse the internal draw command
  recording. Ideally, move all sokol-gfx pass rendering (including all
  sspine_draw_layer() calls) towards the end of the frame, separate from
  any other sokol-spine calls.

  The sspine_layer_transform struct defines the layer's screen space coordinate
  system. For instance to map Spine coordinates to framebuffer pixels, with the
  origin in the screen center, you'd setup the layer transform like this:

    const float width = sapp_widthf();
    const float height = sapp_heightf();
    const sspine_layer_transform tform = {
        .size = { .x = width, .y = height },
        .origin = { .x = width * 0.5f, .y = height * 0.5f },
    };

  With this pixel mapping, the Spine scene would *not* scale with window size,
  which often is not very useful. Instead it might make more sense to render
  to a fixed 'virtual' resolution, for instance 1024 * 768:

    const sspine_layer_transform tform = {
        .size = { .x = 1024.0f, .y = 768.0f },
        .origin = { .x = 512.0f, .y = 384.0f },
    };

  How to configure a virtual resolution with a fixed aspect ratio is
  left as an exercise to the reader ;)

- That's it for basic sokol-spine setup and rendering. Any existing objects
  will automatically be cleaned up when calling sspine_shutdown(), this
  should be called before shutting down sokol-gfx, but this is not required:

    sspine_shutdown();
    sg_shutdown();

- You can explicitely destroy the base object types if you don't need them
  any longer. This will cause the underlying spine-c objects to be
  freed and the memory to be returned to the operating system:

    sspine_destroy_instance(instance);
    sspine_destroy_skinset(skinset);
    sspine_destroy_skeleton(skeleton);
    sspine_destroy_atlas(atlas);

  You can destroy these objects in any order without causing memory corruption
  issues. Instead any dependent object handles will simply become invalid (e.g.
  if you destroy an atlas object, all skeletons and instances created from
  this atlas will 'technically' still exist, but their handles will resolve to
  'invalid' and all sokol-spine calls involving these handles will silently fail).

  For instance:

    // create an atlas, skeleton and instance
    sspine_atlas atlas = sspine_make_atlas(&(sspine_atlas_desc){ ... });
    assert(sspine_atlas_valid(atlas));

    sspine_skeleton skeleton = sspine_make_skeleton(&(sspine_skeleton_desc){
        .atlas = atlas,
        ...
    });
    assert(sspine_skeleton_valid(skeleton));

    sspine_instance instance = sspine_make_instance(&(sspine_instance_desc){
        .skeleton = skeleton,
    });
    assert(sspine_instance_valid(instance));

    // destroy the atlas object:
    sspine_destroy_atlas(atlas);

    // the skeleton and instance handle should now be invalid, but
    // otherwise, nothing bad will happen:
    if (!sspine_skeleton_valid(skeleton)) {
        ...
    }
    if (!sspine_instance_valid(instance)) {
        ...
    }

RENDERER DETAILS
================
Any rendering related work happens in the functions sspine_draw_instance_in_layer() and
sspine_draw_layer().

sspine_draw_instance_in_layer() will result in vertices, indices and internal
draw commands which will be recorded into internal memory buffers (e.g.
no sokol-gfx functions will be called here).

If possible, batching will be performed by merging a new draw command with
the previously recorded draw command. For two draw commands to be merged,
the following conditions must be tru:

    - rendering needs to go into the same layer
    - the same atlas texture must be used
    - the blend mode must be compatible (the Spine blending modes
      'normal' and 'additive' can be merged, but not 'multiply')
    - the same premultiplied alpha mode must be used

To make the most out of batching:

    - use Spine objects which only have a single atlas texture
      and blend mode across all slots
    - group sspine_draw_instance_in_layer() calls by layer

After all instances have been 'rendered' (or rather: recorded) into layers,
the actually rendering happens inside a sokol-gfx pass by calling the
function sspine_draw_layer() for each layer in 'z order' (e.g. the layer
index doesn't matter for z-ordering, only the order how sspine_draw_layer() is
called).

Only the first call to sspine_draw_layer() in a frame will copy the recorded
vertices and indices into sokol-gfx buffers.

Each call to sspine_draw_layer() will iterate over all recorded (and
hopefully well-batched) draw commands, skip any draw commands with a
non-matching layer index, and draw only those with a matching layer by
calling:

    - if the pipeline object has changed:
        - sg_apply_pipeline()
        - sg_apply_uniforms() for the vertex stage
    - if the atlas texture has changed:
        - sg_apply_bindings()
    - if the premultiplied-alpha mode has changed:
        - sg_apply_uniforms() for the fragment stage
    - and finally sg_draw()

The main purpose of render layers is to mix Spine rendering with other
render operations. In the not too distant future, the same render layer idea
will also be implemented at least for sokol-gl and sokol-debugtext.

FIXME: does this section need more details about layer transforms?

RENDERING WITH CONTEXTS
=======================
At first glance, render contexts may look like more heavy-weight
render layers, but they serve a different purpose: they are useful
if Spine rendering needs to happen in different sokol-gfx render passes
with different pixel formats and MSAA sample counts.

All Spine rendering happens within a context, even you don't call any
of the context API functions, in this case, an internal 'default context'
will be used.

Each context has its own internal vertex-, index- and command buffer and
all context state is completely independent from any other contexts.

To create a new context object, call:

    sspine_context ctx = sspine_make_context(&(sspine_context_desc){
        .max_vertices = ...,
        .max_commands = ...,
        .color_format = SG_PIXELFORMAT_...,
        .depth_format = SG_PIXELFORMAT_...,
        .sample_count = ...,
        .color_write_mask = SG_COLORMASK_...,
    });

The color_format, depth_format and sample_count items must be compatible
with the sokol-gfx render pass you're going to render into.

If you omit the color_format, depth_format and sample_count designators,
the new context will be compatible with the sokol-gfx default pass
(which is most likely not what you want, unless your offscreen render passes
exactly match the default pass attributes).

Once a context has been created, it can be made active with:

    sspine_set_context(ctx);

To set the default context again:

    sspine_set_contxt(sspine_default_context());

...and to get the currently active context:

    sspine_context cur_ctx = sspine_get_context();

The currently active context only matter for two functions:

    - sspine_draw_instance_in_layer()
    - sspine_draw_layer()

Alternatively you can bypass the currently set context with these
alternative functions:

    - sspine_context_draw_layer_in_instance(ctx, ...)
    - sspine_context_draw_layer(ctx, ...)

These explicitely take a context argument, completely ignore
and don't change the active context.

You can query some information about the a context with the function:

    sspine_context_info info = ssgpine_get_context_info(ctx);

This returns the current number of recorded vertices, indices
and draw commands.

RESOURCE STATES:
================
Similar to sokol-gfx, you can query the current 'resource state' of Spine
objects:

    sspine_resource_state sspine_get_atlas_resource_state(sspine_atlas atlas);
    sspine_resource_state sspine_get_skeleton_resource_state(sspine_atlas atlas);
    sspine_resource_state sspine_get_instance_resource_state(sspine_atlas atlas);
    sspine_resource_state sspine_get_skinset_resource_state(sspine_atlas atlas);
    sspine_resource_state sspine_get_context_resource_state(sspine_atlas atlas);

This returns one of

    - SSPINE_RESOURCE_VALID: the object is valid and ready to use
    - SSPINE_RESOURCE_FAILED: the object creation has failed
    - SSPINE_RESOURCE_INVALID: the object or one of its dependencies is
      invalid, it either no longer exists, or the the handle hasn't been
      initialized with a call to one of the object creation functions

MISC HELPER FUNCTIONS:
======================
There's a couple of helper functions which don't fit into a big enough category
of their own:

You can ask a skeleton for the atlas it has been created from:

    sspine_atlas atlas = sspine_get_skeleton_atlas(skeleton);

...and likewise, ask an instance for the skeleton it has been created from:

    sspine_skeleton skeleton = sspine_get_instance_skeleton(instance);

...and finally you can convert a layer transform struct into a 4x4 projection
matrix that's memory-layout compatible with sokol-gl:

    const sspine_layer_transform tform = { ... };
    const sspine_mat4 proj = sspine_layer_transform_to_mat4(&tform);
    sgl_matrix_mode_projection();
    sgl_load_matrix(proj.m);

ANIMATIONS
==========
Animations have their own handle type sspine_anim. A valid sspine_anim
handle is either obtained by looking up an animation by name from a skeleton:

    sspine_anim anim = sspine_anim_by_name(skeleton, "walk");

...or by index:

    sspine_anim anim = sspine_anim_by_index(skeleton, 0);

The returned anim handle will be invalid if an animation of that name doesn't
exist, or the provided index is out-of-range:

    if (!sspine_anim_is_valid(anim)) {
        // animation handle is not valid
     }

An animation handle will also become invalid when the skeleton object it was
created is destroyed, or otherwise becomes invalid.

You can iterate over all animations in a skeleton:

    const int num_anims = sspine_num_anims(skeleton);
    for (int anim_index = 0; anim_index < num_anims; anim_index++) {
        sspine_anim anim = sspine_anim_by_index(skeleton, anim_index);
        ...
    }

Since sspine_anim is a 'fat handle' (it houses a skeleton handle and an index),
there's a helper function which checks if two anim handles are equal:

    if (sspine_anim_equal(anim0, anim1)) {
        ...
    }

To query information about an animation:

    const sspine_anim_info info = sspine_get_anim_info(anim);
    if (info.valid) {
        printf("index: %d, duration: %f, name: %s", info.index, info.duration, info.name.cstr);
    }

Scheduling and mixing animations is controlled through the following functions:

    void sspine_clear_animation_tracks(sspine_instance instance);
    void sspine_clear_animation_track(sspine_instance instance, int track_index);
    void sspine_set_animation(sspine_instance instance, sspine_anim anim, int track_index, bool loop);
    void sspine_add_animation(sspine_instance instance, sspine_anim anim, int track_index, bool loop, float delay);
    void sspine_set_empty_animation(sspine_instance instance, int track_index, float mix_duration);
    void sspine_add_empty_animation(sspine_instance instance, int track_index, float mix_duration, float delay);

Please refer to the spine-c documentation to get an idea what these functions do:

    http://en.esotericsoftware.com/spine-c#Applying-animations

EVENTS
======
For a general idea of Spine events, see here: http://esotericsoftware.com/spine-events

After calling sspine_update_instance() to advance the currently configured animations,
you can poll for triggered events like this:

    const int num_triggered_events = sspine_num_triggered_events(instance);
    for (int i = 0; i < num_triggered_events; i++) {
        const sspine_triggered_event_info info = sspine_get_triggered_event_info(instance, i);
        if (info.valid) {
            ...
        }
    }

The returned sspine_triggered_event_info struct gives you the current runtime properties
of the event (in case the event has keyed properties). For the actual list of event
properties please see the actual sspine_triggered_event_info struct declaration.

It's also possible to inspect the static event definition on a skeleton, this works
the same as iterating through animations. You can lookup an event by name,
get the number of events, lookup an event by its index, and get detailed
information about an event:

    int sspine_num_events(sspine_skeleton skeleton);
    sspine_event sspine_event_by_name(sspine_skeleton skeleton, const char* name);
    sspine_event sspine_event_by_index(sspine_skeleton skeleton, int index);
    bool sspine_event_valid(sspine_event event);
    bool sspine_event_equal(sspine_event first, sspine_event second);
    sspine_event_info sspine_get_event_info(sspine_event event);

(FIXME: shouldn't the event info struct contains an sspine_anim handle?)

IK TARGETS
==========
The IK target function group allows to iterate over the IK targets that have been
defined on a skeleton, find an IK target by name, get detailed information about
an IK target, and most importantly, set the world space position of an IK target
which updates the position of all bones influenced by the IK target:

    int sspine_num_iktargets(sspine_skeleton skeleton);
    sspine_iktarget sspine_iktarget_by_name(sspine_skeleton skeleton, const char* name);
    sspine_iktarget sspine_iktarget_by_index(sspine_skeleton skeleton, int index);
    bool sspine_iktarget_valid(sspine_iktarget iktarget);
    bool sspine_iktarget_equal(sspine_iktarget first, sspine_iktarget second);
    sspine_iktarget_info sspine_get_iktarget_info(sspine_iktarget iktarget);
    void sspine_set_iktarget_world_pos(sspine_instance instance, sspine_iktarget iktarget, sspine_vec2 world_pos);

BONES
=====
Skeleton bones are wrapped with an sspine_bone handle which can be created from
a skeleton handle, and either a bone name:

    sspine_bone bone = sspine_bone_by_name(skeleton, "root");
    assert(sspine_bone_valid(bone));

...or a bone index:

    sspine_bone bone = sspine_bone_by_index(skeleton, 0);
    assert(sspine_bone_valid(bone));

...to iterate over all bones of a skeleton and query information about each
bone:

    const int num_bones = sspine_num_bones(skeleton);
    for (int bone_index = 0; bone_index < num_bones; bone_index++) {
        sspine_bone bone = sspine_bone_by_index(skeleton, bone_index);
        const sspine_bone_info info = sspine_get_bone_info(skeleton, bone);
        if (info.valid) {
            ...
        }
    }

The sspine_bone_info struct provides the shared, static bone state in the skeleton (like
the name, a parent bone handle, bone length, pose transform and a color attribute),
but doesn't contain any dynamic information of per-instance bones.

To manipulate the per-instance bone attributes use the following setter functions:

    void sspine_set_bone_transform(sspine_instance instance, sspine_bone bone, const sspine_bone_transform* transform);
    void sspine_set_bone_position(sspine_instance instance, sspine_bone bone, sspine_vec2 position);
    void sspine_set_bone_rotation(sspine_instance instance, sspine_bone bone, float rotation);
    void sspine_set_bone_scale(sspine_instance instance, sspine_bone bone, sspine_vec2 scale);
    void sspine_set_bone_shear(sspine_instance instance, sspine_bone bone, sspine_vec2 shear);

...and to query the per-instance bone attributes, the following getters:

    sspine_bone_transform sspine_get_bone_transform(sspine_instance instance, sspine_bone bone);
    sspine_vec2 sspine_get_bone_position(sspine_instance instance, sspine_bone bone);
    float sspine_get_bone_rotation(sspine_instance instance, sspine_bone bone);
    sspine_vec2 sspine_get_bone_scale(sspine_instance instance, sspine_bone bone);
    sspine_vec2 sspine_get_bone_shear(sspine_instance instance, sspine_bone bone);

These functions all work in the local bone coordinate system (relative to a bone's parent bone).

To transform positions between bone-local and global space use the following helper functions:

    sspine_vec2 sspine_bone_local_to_world(sspine_instance instance, sspine_bone bone, sspine_vec2 local_pos);
    sspine_vec2 sspine_bone_world_to_local(sspine_instance instance, sspine_bone bone, sspine_vec2 world_pos);

...and as a convenience, there's a helper function which obtains the bone position in global space
directly:

    sspine_vec2 sspine_get_bone_world_position(sspine_instance instance, sspine_bone bone);

SKINS AND SKINSETS
==================
Skins are named pieces of geometry which can be turned on and off, what makes Spine skins a bit
confusing is that they are hierarchical. A skin can itself be a collection of other skins. Setting
the 'root skin' will also make all 'child skins' visible. In sokol-spine collections of skins are
managed through dedicated 'skin set' objects. Under the hood they create a 'root skin' where the
skins of the skin set are attached to, but from the outside it just looks like a 'flat' collection
of skins without the tricky hierarchical management.

Like other 'subobjects', skin handles can be obtained by the skin name from a skeleton handle:

    sspine_skin skin = sspine_skin_by_name(skeleton, "jacket");
    assert(sspine_skin_valid(skin));

...or by a skin index:

    sspine_skin skin = sspine_skin_by_index(skeleton, 0);
    assert(sspine_skin_valid(skin));

...you can iterate over all skins of a skeleton and query some information about the skin:

    const int num_skins = sspine_num_skins(skeleton);
    for (int skin_index = 0; skin_index < num_skins; skin_index++) {
        sspine_skin skin = sspine_skin_by_index(skin_index);
        sspine_skin_info info = sspine_get_skin_info(skin);
        if (info.valid) {
            ...
        }
    }

Currently, the only useful query item is the skin name though.

To make a skin visible on an instance, just call:

    sspine_set_skin(instance, skin);

...this will first deactivate the previous skin before setting a new skin.

A more powerful way to configure the skin visibility is through 'skin sets'. Skin
sets are simply flat collections of skins which should be made visible at once.
A new skin set is created like this:

    sspine_skinset skinset = sspine_make_skinset(&(sspine_skinset_desc){
        .skeleton = skeleton,
        .skins = {
            sspine_skin_by_name(skeleton, "blue-jacket"),
            sspine_skin_by_name(skeleton, "green-pants"),
            sspine_skin_by_name(skeleton, "blonde-hair"),
            ...
        }
    });
    assert(sspine_skinset_valid(skinset))

...then simply set the skinset on an instance to reconfigure the appearance
of the instance:

    sspine_set_skinset(instance, skinset);

The functions sspine_set_skinset() and sspine_set_skin() will cancel each other.
Calling sspine_set_skinset() deactivates the effect of sspine_set_skin() and
vice versa.

ERROR REPORTING AND LOGGING
===========================
sokol_spine.h introduces a new combined logging- and error-reporting
mechanism which replaces the old SOKOL_LOG macro, and the more recent
logging callback.

The new reporting uses a more elaborate logger callback which provides:

    - a short tag string identifying the header (for instance 'sspine')
    - a numeric log level (panic, error, warning, info)
    - a numeric error code (SSPINE_ERROR_*)
    - in debug mode: the error code as human readable string
    - a line number, where in the header the problem occured
    - in debug mode: the filename of the header
    - and a user data parameter

The logging callback will be standardized across all sokol headers,
so that it will be possible to use the same logging function with
all headers.

To override logging, first write a logging function like this:

    void my_log(const char* tag,        // e.g. 'sspine'
                uint32_t log_level,     // 0=panic, 1=error, 2=warn, 3=info
                uint32_t error_code,    // SSPINE_ERROR_*
                const char* error_id,   // error as string, only in debug mode, otherwise empty string
                int line_nr,            // line number in sokol_spine.h
                const char* filename,   // debug mode only, otherwise empty string
                void* user_data)
    {
        ...
    }

...and then setup sokol-spine like this:

    sspine_setup(&(sspine_desc){
        .logger = {
            .func = my_log,
            .user_data = ...,
        }
    });

If no custom logger is provided, verbose default logging goes to stderr
(this means you won't see any logging messages on Android, or on Windows
unless the problem is attached to a terminal!).

Eventually there will be a more luxurious sokol_log.h header, which will
provide more control over logging, also on Windows or Android.

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
        sspine_setup(&(sspine_desc){
            // ...
            .allocator = {
                .alloc = my_alloc,
                .free = my_free,
                .user_data = ...;
            }
        });
    ...

If no overrides are provided, malloc and free will be used.

This only affects memory allocation calls done by sokol_gfx.h
itself though, not any allocations in OS libraries.

LICENSE
=======
zlib/libpng license

Copyright (c) 2022 Andre Weissflog

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