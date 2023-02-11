# pygame

トップレベルの pygame パッケージ

|           API            |                                      説明                                      |
| ------------------------ | ------------------------------------------------------------------------------ |
| pygame.init              | インポートされたすべての pygame モジュールを初期化します。                     |
| pygame.quit              | すべての pygame モジュールの初期化を解除します。                               |
| pygame.get_init          | pygameが現在初期化されている場合、Trueを返します。                             |
| pygame.error             | 標準的な pygame の例外                                                         |
| pygame.get_error         | 現在のエラーメッセージを取得する                                               |
| pygame.set_error         | 現在のエラーメッセージを設定する                                               |
| pygame.get_sdl_version   | SDLのバージョン番号を取得する                                                  |
| pygame.get_sdl_byteorder | SDL のバイトオーダーを取得する                                                 |
| pygame.register_quit     | pygame が終了するときに呼び出される関数を登録します。                          |
| pygame.encode_string     | Unicodeまたはbytesオブジェクトをエンコードする                                 |
| pygame.encode_file_path  | Unicodeまたはbytesオブジェクトをファイルシステムのパスとしてエンコードします。 |

The pygame package represents the top-level package for others to use. Pygame itself is broken into many submodules, but this does not affect programs that use pygame.

As a convenience, most of the top-level variables in pygame have been placed inside a module named pygame.localspygame constants. This is meant to be used with from pygame.locals import *, in addition to import pygame.

When you import pygame all available pygame submodules are automatically imported. Be aware that some of the pygame modules are considered optional, and may not be available. In that case, pygame will provide a placeholder object instead of the module, which can be used to test for availability.

pygame.init()
initialize all imported pygame modules
init() -> (numpass, numfail)
Initialize all imported pygame modules. No exceptions will be raised if a module fails, but the total number if successful and failed inits will be returned as a tuple. You can always initialize individual modules manually, but pygame.init()initialize all imported pygame modules is a convenient way to get everything started. The init() functions for individual modules will raise exceptions when they fail.

You may want to initialize the different modules separately to speed up your program or to not use modules your game does not require.

It is safe to call this init() more than once as repeated calls will have no effect. This is true even if you have pygame.quit() all the modules.


pygame.quit()
uninitialize all pygame modules
quit() -> None
Uninitialize all pygame modules that have previously been initialized. When the Python interpreter shuts down, this method is called regardless, so your program should not need it, except when it wants to terminate its pygame resources and continue. It is safe to call this function more than once as repeated calls have no effect.

Note Calling pygame.quit()uninitialize all pygame modules will not exit your program. Consider letting your program end in the same way a normal Python program will end.

pygame.get_init()
returns True if pygame is currently initialized
get_init() -> bool
Returns True if pygame is currently initialized.

New in pygame 1.9.5.


exception pygame.error
standard pygame exception
raise pygame.error(message)
This exception is raised whenever a pygame or SDL operation fails. You can catch any anticipated problems and deal with the error. The exception is always raised with a descriptive message about the problem.

Derived from the RuntimeError exception, which can also be used to catch these raised errors.


pygame.get_error()
get the current error message
get_error() -> errorstr
SDL maintains an internal error message. This message will usually be given to you when pygame.error()standard pygame exception is raised, so this function will rarely be needed.


pygame.set_error()
set the current error message
set_error(error_msg) -> None
SDL maintains an internal error message. This message will usually be given to you when pygame.error()standard pygame exception is raised, so this function will rarely be needed.


pygame.get_sdl_version()
get the version number of SDL
get_sdl_version() -> major, minor, patch
Returns the three version numbers of the SDL library. This version is built at compile time. It can be used to detect which features may or may not be available through pygame.

New in pygame 1.7.0.


pygame.get_sdl_byteorder()
get the byte order of SDL
get_sdl_byteorder() -> int
Returns the byte order of the SDL library. It returns 1234 for little endian byte order and 4321 for big endian byte order.

New in pygame 1.8.


pygame.register_quit()
register a function to be called when pygame quits
register_quit(callable) -> None
When pygame.quit()uninitialize all pygame modules is called, all registered quit functions are called. Pygame modules do this automatically when they are initializing, so this function will rarely be needed.


pygame.encode_string()
Encode a Unicode or bytes object
encode_string([obj [, encoding [, errors [, etype]]]]) -> bytes or None
obj: If Unicode, encode; if bytes, return unaltered; if anything else, return None; if not given, raise SyntaxError.

encoding (string): If present, encoding to use. The default is 'unicode_escape'.

errors (string): If given, how to handle unencodable characters. The default is 'backslashreplace'.

etype (exception type): If given, the exception type to raise for an encoding error. The default is UnicodeEncodeError, as returned by PyUnicode_AsEncodedString(). For the default encoding and errors values there should be no encoding errors.

This function is used in encoding file paths. Keyword arguments are supported.

New in pygame 1.9.2: (primarily for use in unit tests)


pygame.encode_file_path()
Encode a Unicode or bytes object as a file system path
encode_file_path([obj [, etype]]) -> bytes or None
obj: If Unicode, encode; if bytes, return unaltered; if anything else, return None; if not given, raise SyntaxError.

etype (exception type): If given, the exception type to raise for an encoding error. The default is UnicodeEncodeError, as returned by PyUnicode_AsEncodedString().

This function is used to encode file paths in pygame. Encoding is to the codec as returned by sys.getfilesystemencoding(). Keyword arguments are supported.

New in pygame 1.9.2: (primarily for use in unit tests)


pygame.version
small module containing version information
pygame.version.ver
version number as a string
pygame.version.vernum
tupled integers of the version
pygame.version.rev
repository revision of the build
pygame.version.SDL
tupled integers of the SDL library version
This module is automatically imported into the pygame package and can be used to check which version of pygame has been imported.

pygame.version.ver
version number as a string
ver = '1.2'
This is the version represented as a string. It can contain a micro release number as well, e.g. '1.5.2'


pygame.version.vernum
tupled integers of the version
vernum = (1, 5, 3)
This version information can easily be compared with other version numbers of the same format. An example of checking pygame version numbers would look like this:

if pygame.version.vernum < (1, 5):
    print('Warning, older version of pygame (%s)' %  pygame.version.ver)
    disable_advanced_features = True
New in pygame 1.9.6: Attributes major, minor, and patch.

vernum.major == vernum[0]
vernum.minor == vernum[1]
vernum.patch == vernum[2]
Changed in pygame 1.9.6: str(pygame.version.vernum) returns a string like "2.0.0" instead of "(2, 0, 0)".

Changed in pygame 1.9.6: repr(pygame.version.vernum) returns a string like "PygameVersion(major=2, minor=0, patch=0)" instead of "(2, 0, 0)".


pygame.version.rev
repository revision of the build
rev = 'a6f89747b551+'
The Mercurial node identifier of the repository checkout from which this package was built. If the identifier ends with a plus sign '+' then the package contains uncommitted changes. Please include this revision number in bug reports, especially for non-release pygame builds.

Important note: pygame development has moved to github, this variable is obsolete now. As soon as development shifted to github, this variable started returning an empty string "". It has always been returning an empty string since v1.9.5.

Changed in pygame 1.9.5: Always returns an empty string "".


pygame.version.SDL
tupled integers of the SDL library version
SDL = '(2, 0, 12)'
This is the SDL library version represented as an extended tuple. It also has attributes 'major', 'minor' & 'patch' that can be accessed like this:

>>> pygame.version.SDL.major
2
printing the whole thing returns a string like this:

>>> pygame.version.SDL
SDLVersion(major=2, minor=0, patch=12)
New in pygame 2.0.0.


Setting Environment Variables

Some aspects of pygame's behaviour can be controlled by setting environment variables, they cover a wide range of the library's functionality. Some of the variables are from pygame itself, while others come from the underlying C SDL library that pygame uses.

In python, environment variables are usually set in code like this:

import os
os.environ['NAME_OF_ENVIRONMENT_VARIABLE'] = 'value_to_set'
Or to preserve users ability to override the variable:

import os
os.environ['ENV_VAR'] = os.environ.get('ENV_VAR', 'value')
If the variable is more useful for users of an app to set than the developer then they can set it like this:

Windows:

set NAME_OF_ENVIRONMENT_VARIABLE=value_to_set
python my_application.py
Linux/Mac:

ENV_VAR=value python my_application.py
For some variables they need to be set before initialising pygame, some must be set before even importing pygame, and others can simply be set right before the area of code they control is run.

Below is a list of environment variables, their settable values, and a brief description of what they do.


Pygame Environment Variables

These variables are defined by pygame itself.


PYGAME_DISPLAY - Experimental (subject to change)
Set index of the display to use, "0" is the default.
This sets the display where pygame will open its window or screen. The value set here will be used if set before calling pygame.display.set_mode()Initialize a window or screen for display, and as long as no 'display' parameter is passed into pygame.display.set_mode()Initialize a window or screen for display.


PYGAME_FORCE_SCALE -
Set to "photo" or "default".
This forces set_mode() to use the SCALED display mode and, if "photo" is set, makes the scaling use the slowest, but highest quality anisotropic scaling algorithm, if it is available. Must be set before calling pygame.display.set_mode()Initialize a window or screen for display.


PYGAME_BLEND_ALPHA_SDL2 - New in pygame 2.0.0
Set to "1" to enable the SDL2 blitter.
This makes pygame use the SDL2 blitter for all alpha blending. The SDL2 blitter is sometimes faster than the default blitter but uses a different formula so the final colours may differ. Must be set before pygame.init()initialize all imported pygame modules is called.


PYGAME_HIDE_SUPPORT_PROMPT -
Set to "1" to hide the prompt.
This stops the welcome message popping up in the console that tells you which version of python, pygame & SDL you are using. Must be set before importing pygame.


PYGAME_FREETYPE -
Set to "1" to enable.
This switches the pygame.font module to a pure freetype implementation that bypasses SDL_ttf. See the font module for why you might want to do this. Must be set before importing pygame.


PYGAME_CAMERA -
Set to "opencv" or "vidcapture"
Forces the library backend used in the camera module, overriding the platform defaults. Must be set before calling pygame.camera.init()Module init.

In pygame 2.0.3, backends can be set programmatically instead, and the old OpenCV backend has been replaced with one on top of "opencv-python," rather than the old "highgui" OpenCV port. Also, there is a new native Windows backend available.



SDL Environment Variables

These variables are defined by SDL.

For documentation on the environment variables available in pygame 1 try here. For Pygame 2, some selected environment variables are listed below.


SDL_VIDEO_CENTERED -
Set to "1" to enable centering the window.
This will make the pygame window open in the centre of the display. Must be set before calling pygame.display.set_mode()Initialize a window or screen for display.


SDL_VIDEO_WINDOW_POS -
Set to "x,y" to position the top left corner of the window.
This allows control over the placement of the pygame window within the display. Must be set before calling pygame.display.set_mode()Initialize a window or screen for display.


SDL_VIDEODRIVER -
Set to "drivername" to change the video driver used.
On some platforms there are multiple video drivers available and this allows users to pick between them. More information is available here. Must be set before calling pygame.init()initialize all imported pygame modules or pygame.display.init()Initialize the display module.


SDL_AUDIODRIVER -
Set to "drivername" to change the audio driver used.
On some platforms there are multiple audio drivers available and this allows users to pick between them. More information is available here. Must be set before calling pygame.init()initialize all imported pygame modules or pygame.mixer.init()initialize the mixer module.


SDL_VIDEO_ALLOW_SCREENSAVER
Set to "1" to allow screensavers while pygame apps are running.
By default pygame apps disable screensavers while they are running. Setting this environment variable allows users or developers to change that and make screensavers run again.


SDL_VIDEO_X11_NET_WM_BYPASS_COMPOSITOR
Set to "0" to re-enable the compositor.
By default SDL tries to disable the X11 compositor for all pygame apps. This is usually a good thing as it's faster, however if you have an app which doesn't update every frame and are using linux you may want to disable this bypass. The bypass has reported problems on KDE linux. This variable is only used on x11/linux platforms.