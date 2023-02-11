
# pygame._sdl2.touch

タッチ入力を扱う pygame モジュール

|                API                 |                              説明                              |
| ---------------------------------- | -------------------------------------------------------------- |
| pygame._sdl2.touch.get_num_devices | タッチデバイスの数を取得する                                   |
| pygame._sdl2.touch.get_device      | 指定されたインデックスに対応するタッチデバイスIDを取得します。 |
| pygame._sdl2.touch.get_num_fingers | タッチデバイスの有効な指の数                                   |
| pygame._sdl2.touch.get_finger      | 指を動かす                                                     |

New in pygame 2: This module requires SDL2.

pygame._sdl2.touch.get_num_devices()
get the number of touch devices
get_num_devices() -> int
Return the number of available touch devices.


pygame._sdl2.touch.get_device()
get the a touch device id for a given index
get_device(index) -> touchid
Parameters
index (int) -- This number is at least 0 and less than the number of devices.
Return an integer id associated with the given index.


pygame._sdl2.touch.get_num_fingers()
the number of active fingers for a given touch device
get_num_fingers(touchid) -> int
Return the number of fingers active for the touch device whose id is touchid.


pygame._sdl2.touch.get_finger()
get information about an active finger
get_finger(touchid, index) -> int
Parameters
touchid (int) -- The touch device id.
index (int) -- The index of the finger to return information about, between 0 and the number of active fingers.
Return a dict for the finger index active on touchid. The dict contains these keys:

id         the id of the finger (an integer).
x          the normalized x position of the finger, between 0 and 1.
y          the normalized y position of the finger, between 0 and 1.
pressure   the amount of pressure applied by the finger, between 0 and 1.

