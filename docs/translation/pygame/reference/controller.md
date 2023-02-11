# pygame._sdl2.controller

コントローラを扱う Pygame モジュール。

|                  API                   |                                                説明                                                |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| pygame._sdl2.controller.init           | コントローラモジュールの初期化                                                                     |
| pygame._sdl2.controller.quit           | コントローラモジュールの初期化を解除します。                                                       |
| pygame._sdl2.controller.get_init       | コントローラモジュールが初期化されている場合、True を返します。                                    |
| pygame._sdl2.controller.set_eventstate | コントローラに関するイベントの現在の状態を設定します。                                             |
| pygame._sdl2.controller.get_eventstate | コントローラに関するイベントの現在の状態を取得します。                                             |
| pygame._sdl2.controller.get_count      | ジョイスティックの接続台数を取得                                                                   |
| pygame._sdl2.controller.is_controller  | 与えられたジョイスティックがゲームコントローラインタフェースでサポートされているかどうかを確認する |
| pygame._sdl2.controller.name_forindex  | コントローラの名前を取得します。                                                                   |
| pygame._sdl2.controller.Controller     | Controllerオブジェクトを新規に作成します。                                                         |

This module offers control over common controller types like the dualshock 4 or the xbox 360 controllers: They have two analog sticks, two triggers, two shoulder buttons, a dpad, 4 buttons on the side, 2 (or 3) buttons in the middle.

Pygame uses xbox controllers naming conventions (like a, b, x, y for buttons) but they always refer to the same buttons. For example CONTROLLER_BUTTON_X is always the leftmost button of the 4 buttons on the right.

Controllers can generate the following events:

CONTROLLERAXISMOTION, CONTROLLERBUTTONDOWN, CONTROLLERBUTTONUP,
CONTROLLERDEVICEREMAPPED, CONTROLLERDEVICEADDED, CONTROLLERDEVICEREMOVED
Additionally if pygame is built with SDL 2.0.14 or higher the following events can also be generated (to get the version of sdl pygame is built with use pygame.version.SDL()tupled integers of the SDL library version):

CONTROLLERTOUCHPADDOWN, CONTROLLERTOUCHPADMOTION, CONTROLLERTOUCHPADUP
These events can be enabled/disabled by pygame._sdl2.controller.set_eventstate()Sets the current state of events related to controllers Note that controllers can generate joystick events as well. This function only toggles events related to controllers.

Note See the pygame.joystickPygame module for interacting with joysticks, gamepads, and trackballs. for a more versatile but more advanced api.
New in pygame 2: This module requires SDL2.

pygame._sdl2.controller.init()
initialize the controller module
init() -> None
Initialize the controller module.


pygame._sdl2.controller.quit()
Uninitialize the controller module.
quit() -> None
Uninitialize the controller module.


pygame._sdl2.controller.get_init()
Returns True if the controller module is initialized.
get_init() -> bool
Test if pygame._sdl2.controller.init() was called.

 
pygame._sdl2.controller.set_eventstate()
Sets the current state of events related to controllers
set_eventstate(state) -> None
Enable or disable events connected to controllers.

Note Controllers can still generate joystick events, which will not be toggled by this function.
Changed in pygame 2.0.2:: Changed return type from int to None


pygame._sdl2.controller.get_eventstate()
Gets the current state of events related to controllers
get_eventstate() -> bool
Returns the current state of events related to controllers, True meaning events will be posted.

New in pygame 2.0.2.


pygame._sdl2.controller.get_count()
Get the number of joysticks connected
get_count() -> int
Get the number of joysticks connected.


pygame._sdl2.controller.is_controller()
Check if the given joystick is supported by the game controller interface
is_controller(index) -> bool
Returns True if the index given can be used to create a controller object.


pygame._sdl2.controller.name_forindex()
Get the name of the controller
name_forindex(index) -> name or None
Returns the name of controller, or None if there's no name or the index is invalid.


pygame._sdl2.controller.Controller
Create a new Controller object.
Controller(index) -> Controller
Create a new Controller object. Index should be integer between 0 and pygame._sdl2.controller.get_count(). Controllers also can be created from a pygame.joystick.Joystick using pygame._sdl2.controller.from_joystick. Controllers are initialized on creation.

pygame._sdl2.controller.Controller.quit
uninitialize the Controller
pygame._sdl2.controller.Controller.get_init
check if the Controller is initialized
pygame._sdl2.controller.Controller.from_joystick
Create a Controller from a pygame.joystick.Joystick object
pygame._sdl2.controller.Controller.attached
Check if the Controller has been opened and is currently connected.
pygame._sdl2.controller.Controller.as_joystick
Returns a pygame.joystick.Joystick() object
pygame._sdl2.controller.Controller.get_axis
Get the current state of a joystick axis
pygame._sdl2.controller.Controller.get_button
Get the current state of a button
pygame._sdl2.controller.Controller.get_mapping
Get the mapping assigned to the controller
pygame._sdl2.controller.Controller.set_mapping
Assign a mapping to the controller
pygame._sdl2.controller.Controller.rumble
Start a rumbling effect
pygame._sdl2.controller.Controller.stop_rumble
Stop any rumble effect playing
quit()
uninitialize the Controller
quit() -> None
Close a Controller object. After this the pygame event queue will no longer receive events from the device.

It is safe to call this more than once.


get_init()
check if the Controller is initialized
get_init() -> bool
Returns True if the Controller object is currently initialised.


static from_joystick()
Create a Controller from a pygame.joystick.Joystick object
from_joystick(joystick) -> Controller
Create a Controller object from a pygame.joystick.Joystick object


attached()
Check if the Controller has been opened and is currently connected.
attached() -> bool
Returns True if the Controller object is opened and connected.


as_joystick()
Returns a pygame.joystick.Joystick() object
as_joystick() -> Joystick object
Returns a pygame.joystick.Joystick() object created from this controller's index


get_axis()
Get the current state of a joystick axis
get_axis(axis) -> int
Get the current state of a trigger or joystick axis. The axis argument must be one of the following constants:

CONTROLLER_AXIS_LEFTX, CONTROLLER_AXIS_LEFTY,
CONTROLLER_AXIS_RIGHTX, CONTROLLER_AXIS_RIGHTY,
CONTROLLER_AXIS_TRIGGERLEFT, CONTROLLER_AXIS_TRIGGERRIGHT
Joysticks can return a value between -32768 and 32767. Triggers however can only return a value between 0 and 32768.


get_button()
Get the current state of a button
get_button(button) -> bool
Get the current state of a button, True meaning it is pressed down. The button argument must be one of the following constants:

CONTROLLER_BUTTON_A, CONTROLLER_BUTTON_B,
CONTROLLER_BUTTON_X, CONTROLLER_BUTTON_Y
CONTROLLER_BUTTON_DPAD_UP, CONTROLLER_BUTTON_DPAD_DOWN,
CONTROLLER_BUTTON_DPAD_LEFT, CONTROLLER_BUTTON_DPAD_RIGHT,
CONTROLLER_BUTTON_LEFTSHOULDER, CONTROLLER_BUTTON_RIGHTSHOULDER,
CONTROLLER_BUTTON_LEFTSTICK, CONTROLLER_BUTTON_RIGHTSTICK,
CONTROLLER_BUTTON_BACK, CONTROLLER_BUTTON_GUIDE,
CONTROLLER_BUTTON_START

get_mapping()
Get the mapping assigned to the controller
get_mapping() -> mapping
Returns a dict containing the mapping of the Controller. For more information see Controller.set_mapping()

Changed in pygame 2.0.2:: Return type changed from str to dict


set_mapping()
Assign a mapping to the controller
set_mapping(mapping) -> int
Rebind buttons, axes, triggers and dpads. The mapping should be a dict containing all buttons, hats and axes. The easiest way to get this is to use the dict returned by Controller.get_mapping(). To edit this mapping assign a value to the original button. The value of the dictionary must be a button, hat or axis represented in the following way:

For a button use: bX where X is the index of the button.
For a hat use: hX.Y where X is the index and the Y is the direction (up: 1, right: 2, down: 3, left: 4).
For an axis use: aX where x is the index of the axis.
An example of mapping:

mapping = controller.get_mapping() # Get current mapping
mapping["a"] = "b3" # Remap button a to y
mapping["y"] = "b0" # Remap button y to a
controller.set_mapping(mapping) # Set the mapping
The function will return 1 if a new mapping is added or 0 if an existing one is updated.

Changed in pygame 2.0.2:: Renamed from add_mapping to set_mapping

Changed in pygame 2.0.2:: Argument type changed from str to dict


rumble()
Start a rumbling effect
rumble(low_frequency, high_frequency, duration) -> bool
Start a rumble effect on the controller, with the specified strength ranging from 0 to 1. Duration is length of the effect, in ms. Setting the duration to 0 will play the effect until another one overwrites it or Controller.stop_rumble() is called. If an effect is already playing, then it will be overwritten.

Returns True if the rumble was played successfully or False if the controller does not support it or pygame.version.SDL()tupled integers of the SDL library version is below 2.0.9.

New in pygame 2.0.2.


stop_rumble()
Stop any rumble effect playing
stop_rumble() -> None
Stops any rumble effect playing on the controller. See Controller.rumble() for more information.

New in pygame 2.0.2.




