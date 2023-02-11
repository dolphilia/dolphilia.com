# pygame.camera

カメラ用 pygame モジュール

|            API             |                          説明                          |
| -------------------------- | ------------------------------------------------------ |
| pygame.camera.init         | モジュールの初期化                                     |
| pygame.camera.get_backends | このシステムでサポートされているバックエンドを取得する |
| pygame.camera.colorspace   | サーフェス色空間変換                                   |
| pygame.camera.list_cameras | 利用可能なカメラの一覧を返します。                     |
| pygame.camera.Camera       | カメラをセットする                                     |

Pygame currently supports Linux (V4L2) and Windows (MSMF) cameras natively, with wider platform support available via an integrated OpenCV backend.

New in pygame 2.0.2: Windows native camera support

New in pygame 2.0.3: New OpenCV backends

EXPERIMENTAL!: This API may change or disappear in later pygame releases. If you use this, your code will very likely break with the next pygame release.

The Bayer to RGB function is based on:

Sonix SN9C101 based webcam basic I/F routines
Copyright (C) 2004 Takafumi Mizuno <taka-qce@ls-a.jp>
Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
1. Redistributions of source code must retain the above copyright
   notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
   notice, this list of conditions and the following disclaimer in the
   documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED.  IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS
OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
SUCH DAMAGE.
New in pygame 1.9.0.

pygame.camera.init()
Module init
init(backend = None) -> None
This function starts up the camera module, choosing the best webcam backend it can find for your system. This is not guaranteed to succeed, and may even attempt to import third party modules, like OpenCV. If you want to override its backend choice, you can call pass the name of the backend you want into this function. More about backends in get_backends().

Changed in pygame 2.0.3: Option to explicitly select backend


pygame.camera.get_backends()
Get the backends supported on this system
get_backends() -> [str]
This function returns every backend it thinks has a possibility of working on your system, in order of priority.

pygame.camera Backends:

Backend           OS        Description
---------------------------------------------------------------------------------
_camera (MSMF)    Windows   Builtin, works on Windows 8+ Python3
_camera (V4L2)    Linux     Builtin
OpenCV            Any       Uses `opencv-python` module, can't enumerate cameras
OpenCV-Mac        Mac       Same as OpenCV, but has camera enumeration
VideoCapture      Windows   Uses abandoned `VideoCapture` module, can't enumerate
                            cameras, may be removed in the future
There are two main differences among backends.

The _camera backends are built in to pygame itself, and require no third party imports. All the other backends do. For the OpenCV and VideoCapture backends, those modules need to be installed on your system.

The other big difference is "camera enumeration." Some backends don't have a way to list out camera names, or even the number of cameras on the system. In these cases, list_cameras() will return something like [0]. If you know you have multiple cameras on the system, these backend ports will pass through a "camera index number" through if you use that as the device parameter.

New in pygame 2.0.3.


pygame.camera.colorspace()
Surface colorspace conversion
colorspace(Surface, format, DestSurface = None) -> Surface
Allows for conversion from "RGB" to a destination colorspace of "HSV" or "YUV". The source and destination surfaces must be the same size and pixel depth. This is useful for computer vision on devices with limited processing power. Capture as small of an image as possible, transform.scale() it even smaller, and then convert the colorspace to YUV or HSV before doing any processing on it.


pygame.camera.list_cameras()
returns a list of available cameras
list_cameras() -> [cameras]
Checks the computer for available cameras and returns a list of strings of camera names, ready to be fed into pygame.camera.Cameraload a camera.

If the camera backend doesn't support webcam enumeration, this will return something like [0]. See get_backends() for much more information.


pygame.camera.Camera
load a camera
Camera(device, (width, height), format) -> Camera
pygame.camera.Camera.start
opens, initializes, and starts capturing
pygame.camera.Camera.stop
stops, uninitializes, and closes the camera
pygame.camera.Camera.get_controls
gets current values of user controls
pygame.camera.Camera.set_controls
changes camera settings if supported by the camera
pygame.camera.Camera.get_size
returns the dimensions of the images being recorded
pygame.camera.Camera.query_image
checks if a frame is ready
pygame.camera.Camera.get_image
captures an image as a Surface
pygame.camera.Camera.get_raw
returns an unmodified image as bytes
Loads a camera. On Linux, the device is typically something like "/dev/video0". Default width and height are 640 by 480. Format is the desired colorspace of the output. This is useful for computer vision purposes. The default is RGB. The following are supported:

RGB - Red, Green, Blue
YUV - Luma, Blue Chrominance, Red Chrominance
HSV - Hue, Saturation, Value
start()
opens, initializes, and starts capturing
start() -> None
Opens the camera device, attempts to initialize it, and begins recording images to a buffer. The camera must be started before any of the below functions can be used.


stop()
stops, uninitializes, and closes the camera
stop() -> None
Stops recording, uninitializes the camera, and closes it. Once a camera is stopped, the below functions cannot be used until it is started again.


get_controls()
gets current values of user controls
get_controls() -> (hflip = bool, vflip = bool, brightness)
If the camera supports it, get_controls will return the current settings for horizontal and vertical image flip as bools and brightness as an int. If unsupported, it will return the default values of (0, 0, 0). Note that the return values here may be different than those returned by set_controls, though these are more likely to be correct.


set_controls()
changes camera settings if supported by the camera
set_controls(hflip = bool, vflip = bool, brightness) -> (hflip = bool, vflip = bool, brightness)
Allows you to change camera settings if the camera supports it. The return values will be the input values if the camera claims it succeeded or the values previously in use if not. Each argument is optional, and the desired one can be chosen by supplying the keyword, like hflip. Note that the actual settings being used by the camera may not be the same as those returned by set_controls. On Windows, hflip and vflip are implemented by pygame, not by the Camera, so they should always work, but brightness is unsupported.


get_size()
returns the dimensions of the images being recorded
get_size() -> (width, height)
Returns the current dimensions of the images being captured by the camera. This will return the actual size, which may be different than the one specified during initialization if the camera did not support that size.


query_image()
checks if a frame is ready
query_image() -> bool
If an image is ready to get, it returns true. Otherwise it returns false. Note that some webcams will always return False and will only queue a frame when called with a blocking function like get_image(). On Windows (MSMF), and the OpenCV backends, query_image() should be reliable, though. This is useful to separate the framerate of the game from that of the camera without having to use threading.


get_image()
captures an image as a Surface
get_image(Surface = None) -> Surface
Pulls an image off of the buffer as an RGB Surface. It can optionally reuse an existing Surface to save time. The bit-depth of the surface is 24 bits on Linux, 32 bits on Windows, or the same as the optionally supplied Surface.


get_raw()
returns an unmodified image as bytes
get_raw() -> bytes
Gets an image from a camera as a string in the native pixelformat of the camera. Useful for integration with other libraries. This returns a bytes object



