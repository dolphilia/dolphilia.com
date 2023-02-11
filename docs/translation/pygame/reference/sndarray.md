# pygame.sndarray

サウンドサンプルデータにアクセスするためのpygameモジュール

|              API               |                           説明                           |
| ------------------------------ | -------------------------------------------------------- |
| pygame.sndarray.array          | サウンドサンプルを配列にコピーする                       |
| pygame.sndarray.samples        | 参照 サウンドサンプルを配列に格納                        |
| pygame.sndarray.make_sound     | 配列をSoundオブジェクトに変換する                        |
| pygame.sndarray.use_arraytype  | サウンドアレイに使用するアレイシステムを設定します。     |
| pygame.sndarray.get_arraytype  | 現在アクティブな配列の種類を取得します。                 |
| pygame.sndarray.get_arraytypes | 現在サポートされているアレイシステムの種類を取得します。 |

Functions to convert between NumPy arrays and Sound objects. This module will only be functional when pygame can use the external NumPy package. If NumPy can't be imported, surfarray becomes a MissingModule object.

Sound data is made of thousands of samples per second, and each sample is the amplitude of the wave at a particular moment in time. For example, in 22-kHz format, element number 5 of the array is the amplitude of the wave after 5/22000 seconds.

The arrays are indexed by the X axis first, followed by the Y axis. Each sample is an 8-bit or 16-bit integer, depending on the data format. A stereo sound file has two values per sample, while a mono sound file only has one.

pygame.sndarray.array()
copy Sound samples into an array
array(Sound) -> array
Creates a new array for the sound data and copies the samples. The array will always be in the format returned from pygame.mixer.get_init().


pygame.sndarray.samples()
reference Sound samples into an array
samples(Sound) -> array
Creates a new array that directly references the samples in a Sound object. Modifying the array will change the Sound. The array will always be in the format returned from pygame.mixer.get_init().


pygame.sndarray.make_sound()
convert an array into a Sound object
make_sound(array) -> Sound
Create a new playable Sound object from an array. The mixer module must be initialized and the array format must be similar to the mixer audio format.


pygame.sndarray.use_arraytype()
Sets the array system to be used for sound arrays
use_arraytype (arraytype) -> None
DEPRECATED: Uses the requested array type for the module functions. The only supported arraytype is 'numpy'. Other values will raise ValueError. Using this function will raise a DeprecationWarning. .. ## pygame.sndarray.use_arraytype ##


pygame.sndarray.get_arraytype()
Gets the currently active array type.
get_arraytype () -> str
DEPRECATED: Returns the currently active array type. This will be a value of the get_arraytypes() tuple and indicates which type of array module is used for the array creation. Using this function will raise a DeprecationWarning.

New in pygame 1.8.


pygame.sndarray.get_arraytypes()
Gets the array system types currently supported.
get_arraytypes () -> tuple
DEPRECATED: Checks, which array systems are available and returns them as a tuple of strings. The values of the tuple can be used directly in the pygame.sndarray.use_arraytype()Sets the array system to be used for sound arrays () method. If no supported array system could be found, None will be returned. Using this function will raise a DeprecationWarning.

New in pygame 1.8.


