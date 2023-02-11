# pygame.midi

midi の入出力に対応した pygame モジュール。

|                API                |                             説明                             |
| --------------------------------- | ------------------------------------------------------------ |
| pygame.midi.init                  | MIDIモジュールの初期化                                       |
| pygame.midi.quit                  | MIDIモジュールのアンイニシャライズ                           |
| pygame.midi.get_init              | midiモジュールが現在初期化されている場合、Trueを返します。   |
| pygame.midi.Input                 | Inputは、MIDI機器からのMIDI入力を取得するために使用します。  |
| pygame.midi.Output                | 出力は、出力デバイスにミディを送るために使用します           |
| pygame.midi.get_count             | は、デバイスの数を取得します。                               |
| pygame.midi.get_default_input_id  | デフォルトの入力デバイス番号を取得                           |
| pygame.midi.get_default_output_id | デフォルトの出力デバイス番号を取得                           |
| pygame.midi.get_device_info       | MIDI 機器に関する情報を返します。                            |
| pygame.midi.midis2events          | midi イベントを pygame イベントに変換します。                |
| pygame.midi.time                  | PortMidiタイマーの現在時刻をms単位で返します。               |
| pygame.midi.frequency_to_midi     | 周波数をMIDIノートに変換します。最も近いMIDI音符に丸めます。 |
| pygame.midi.midi_to_frequency     | MIDIノートを周波数に変換します。                             |
| pygame.midi.midi_to_ansi_note     | MIDI番号に対応するAnsiノート名を返します。                   |
| pygame.midi.MidiException         | pygame.midiの関数やクラスが発生させることができる例外です。  |

New in pygame 1.9.0.

The midi module can send output to midi devices and get input from midi devices. It can also list midi devices on the system.

The midi module supports real and virtual midi devices.

It uses the portmidi library. Is portable to which ever platforms portmidi supports (currently Windows, Mac OS X, and Linux).

This uses pyportmidi for now, but may use its own bindings at some point in the future. The pyportmidi bindings are included with pygame.


New in pygame 2.0.0.

These are pygame events (pygame.eventpygame module for interacting with events and queues) reserved for midi use. The MIDIIN event is used by pygame.midi.midis2events()converts midi events to pygame events when converting midi events to pygame events.

MIDIIN
MIDIOUT

pygame.midi.init()
initialize the midi module
init() -> None
Initializes the pygame.midipygame module for interacting with midi input and output. module. Must be called before using the pygame.midipygame module for interacting with midi input and output. module.

It is safe to call this more than once.


pygame.midi.quit()
uninitialize the midi module
quit() -> None
Uninitializes the pygame.midipygame module for interacting with midi input and output. module. If pygame.midi.init()initialize the midi module was called to initialize the pygame.midipygame module for interacting with midi input and output. module, then this function will be called automatically when your program exits.

It is safe to call this function more than once.


pygame.midi.get_init()
returns True if the midi module is currently initialized
get_init() -> bool
Gets the initialization state of the pygame.midipygame module for interacting with midi input and output. module.

Returns
True if the pygame.midipygame module for interacting with midi input and output. module is currently initialized.
Return type
bool
New in pygame 1.9.5.


pygame.midi.Input
Input is used to get midi input from midi devices.
Input(device_id) -> None
Input(device_id, buffer_size) -> None
pygame.midi.Input.close
closes a midi stream, flushing any pending buffers.
pygame.midi.Input.poll
returns True if there's data, or False if not.
pygame.midi.Input.read
reads num_events midi events from the buffer.
Parameters
device_id (int) -- midi device id
buffer_size (int) -- (optional) the number of input events to be buffered
close()
closes a midi stream, flushing any pending buffers.
close() -> None
PortMidi attempts to close open streams when the application exits.

Note This is particularly difficult under Windows.

poll()
returns True if there's data, or False if not.
poll() -> bool
Used to indicate if any data exists.

Returns
True if there is data, False otherwise
Return type
bool
Raises
MidiException -- on error

read()
reads num_events midi events from the buffer.
read(num_events) -> midi_event_list
Reads from the input buffer and gives back midi events.

Parameters
num_events (int) -- number of input events to read
Returns
the format for midi_event_list is [[[status, data1, data2, data3], timestamp], ...]
Return type
list


pygame.midi.Output
Output is used to send midi to an output device
Output(device_id) -> None
Output(device_id, latency=0) -> None
Output(device_id, buffer_size=256) -> None
Output(device_id, latency, buffer_size) -> None
pygame.midi.Output.abort
terminates outgoing messages immediately
pygame.midi.Output.close
closes a midi stream, flushing any pending buffers.
pygame.midi.Output.note_off
turns a midi note off (note must be on)
pygame.midi.Output.note_on
turns a midi note on (note must be off)
pygame.midi.Output.set_instrument
select an instrument, with a value between 0 and 127
pygame.midi.Output.pitch_bend
modify the pitch of a channel.
pygame.midi.Output.write
writes a list of midi data to the Output
pygame.midi.Output.write_short
writes up to 3 bytes of midi data to the Output
pygame.midi.Output.write_sys_ex
writes a timestamped system-exclusive midi message.
The buffer_size specifies the number of output events to be buffered waiting for output. In some cases (see below) PortMidi does not buffer output at all and merely passes data to a lower-level API, in which case buffersize is ignored.

latency is the delay in milliseconds applied to timestamps to determine when the output should actually occur. If latency is <<0, 0 is assumed.

If latency is zero, timestamps are ignored and all output is delivered immediately. If latency is greater than zero, output is delayed until the message timestamp plus the latency. In some cases, PortMidi can obtain better timing than your application by passing timestamps along to the device driver or hardware. Latency may also help you to synchronize midi data to audio data by matching midi latency to the audio buffer latency.

Note Time is measured relative to the time source indicated by time_proc. Timestamps are absolute, not relative delays or offsets.
abort()
terminates outgoing messages immediately
abort() -> None
The caller should immediately close the output port; this call may result in transmission of a partial midi message. There is no abort for Midi input because the user can simply ignore messages in the buffer and close an input device at any time.


close()
closes a midi stream, flushing any pending buffers.
close() -> None
PortMidi attempts to close open streams when the application exits.

Note This is particularly difficult under Windows.

note_off()
turns a midi note off (note must be on)
note_off(note, velocity=None, channel=0) -> None
Turn a note off in the output stream. The note must already be on for this to work correctly.


note_on()
turns a midi note on (note must be off)
note_on(note, velocity=None, channel=0) -> None
Turn a note on in the output stream. The note must already be off for this to work correctly.


set_instrument()
select an instrument, with a value between 0 and 127
set_instrument(instrument_id, channel=0) -> None
Select an instrument.


pitch_bend()
modify the pitch of a channel.
set_instrument(value=0, channel=0) -> None
Adjust the pitch of a channel. The value is a signed integer from -8192 to +8191. For example, 0 means "no change", +4096 is typically a semitone higher, and -8192 is 1 whole tone lower (though the musical range corresponding to the pitch bend range can also be changed in some synthesizers).

If no value is given, the pitch bend is returned to "no change".

New in pygame 1.9.4.


write()
writes a list of midi data to the Output
write(data) -> None
Writes series of MIDI information in the form of a list.

Parameters
data (list) -- data to write, the expected format is [[[status, data1=0, data2=0, ...], timestamp], ...] with the data# fields being optional
Raises
IndexError -- if more than 1024 elements in the data list
Example:

# Program change at time 20000 and 500ms later send note 65 with
# velocity 100.
write([[[0xc0, 0, 0], 20000], [[0x90, 60, 100], 20500]])
Note
Timestamps will be ignored if latency = 0
To get a note to play immediately, send MIDI info with timestamp read from function Time
Optional data fields: write([[[0xc0, 0, 0], 20000]]) is equivalent to write([[[0xc0], 20000]])

write_short()
writes up to 3 bytes of midi data to the Output
write_short(status) -> None
write_short(status, data1=0, data2=0) -> None
Output MIDI information of 3 bytes or less. The data fields are optional and assumed to be 0 if omitted.

Examples of status byte values:

0xc0  # program change
0x90  # note on
# etc.
Example:

# note 65 on with velocity 100
write_short(0x90, 65, 100)

write_sys_ex()
writes a timestamped system-exclusive midi message.
write_sys_ex(when, msg) -> None
Writes a timestamped system-exclusive midi message.

Parameters
msg (list[int] or str) -- midi message
when -- timestamp in milliseconds
Example:

midi_output.write_sys_ex(0, '\xF0\x7D\x10\x11\x12\x13\xF7')

# is equivalent to

midi_output.write_sys_ex(pygame.midi.time(),
                         [0xF0, 0x7D, 0x10, 0x11, 0x12, 0x13, 0xF7])


pygame.midi.get_count()
gets the number of devices.
get_count() -> num_devices
Device ids range from 0 to get_count() - 1


pygame.midi.get_default_input_id()
gets default input device number
get_default_input_id() -> default_id
The following describes the usage details for this function and the get_default_output_id() function.

Return the default device ID or -1 if there are no devices. The result can be passed to the Input/Output class.

On a PC the user can specify a default device by setting an environment variable. To use device #1, for example:

set PM_RECOMMENDED_INPUT_DEVICE=1
or
set PM_RECOMMENDED_OUTPUT_DEVICE=1
The user should first determine the available device ID by using the supplied application "testin" or "testout".

In general, the registry is a better place for this kind of info. With USB devices that can come and go, using integers is not very reliable for device identification. Under Windows, if PM_RECOMMENDED_INPUT_DEVICE (or PM_RECOMMENDED_OUTPUT_DEVICE) is NOT found in the environment, then the default device is obtained by looking for a string in the registry under:

HKEY_LOCAL_MACHINE/SOFTWARE/PortMidi/Recommended_Input_Device
or
HKEY_LOCAL_MACHINE/SOFTWARE/PortMidi/Recommended_Output_Device
The number of the first device with a substring that matches the string exactly is returned. For example, if the string in the registry is "USB" and device 1 is named "In USB MidiSport 1x1", then that will be the default input because it contains the string "USB".

In addition to the name, get_device_info() returns "interf", which is the interface name. The "interface" is the underlying software system or API used by PortMidi to access devices. Supported interfaces:

MMSystem   # the only Win32 interface currently supported
ALSA       # the only Linux interface currently supported
CoreMIDI   # the only Mac OS X interface currently supported
# DirectX - not implemented
# OSS     - not implemented
To specify both the interface and the device name in the registry, separate the two with a comma and a space. The string before the comma must be a substring of the "interf" string and the string after the space must be a substring of the "name" name string in order to match the device. e.g.:

MMSystem, In USB MidiSport 1x1
Note In the current release, the default is simply the first device (the input or output device with the lowest PmDeviceID).

pygame.midi.get_default_output_id()
gets default output device number
get_default_output_id() -> default_id
See get_default_input_id() for usage details.


pygame.midi.get_device_info()
returns information about a midi device
get_device_info(an_id) -> (interf, name, input, output, opened)
get_device_info(an_id) -> None
Gets the device info for a given id.

Parameters
an_id (int) -- id of the midi device being queried
Returns
if the id is out of range None is returned, otherwise a tuple of (interf, name, input, output, opened) is returned.
interf: string describing the device interface (e.g. 'ALSA')
name: string name of the device (e.g. 'Midi Through Port-0')
input: 1 if the device is an input device, otherwise 0
output: 1 if the device is an output device, otherwise 0
opened: 1 if the device is opened, otherwise 0
Return type
tuple or None

pygame.midi.midis2events()
converts midi events to pygame events
midis2events(midi_events, device_id) -> [Event, ...]
Takes a sequence of midi events and returns list of pygame events.

The midi_events data is expected to be a sequence of ((status, data1, data2, data3), timestamp) midi events (all values required).

Returns
a list of pygame events of event type MIDIIN
Return type
list

pygame.midi.time()
returns the current time in ms of the PortMidi timer
time() -> time
The time is reset to 0 when the pygame.midipygame module for interacting with midi input and output. module is initialized.


pygame.midi.frequency_to_midi()
Converts a frequency into a MIDI note. Rounds to the closest midi note.
frequency_to_midi(midi_note) -> midi_note
example:

frequency_to_midi(27.5) == 21
New in pygame 1.9.5.


pygame.midi.midi_to_frequency()
Converts a midi note to a frequency.
midi_to_frequency(midi_note) -> frequency
example:

midi_to_frequency(21) == 27.5
New in pygame 1.9.5.


pygame.midi.midi_to_ansi_note()
Returns the Ansi Note name for a midi number.
midi_to_ansi_note(midi_note) -> ansi_note
example:

midi_to_ansi_note(21) == 'A0'
New in pygame 1.9.5.


exception pygame.midi.MidiException
exception that pygame.midi functions and classes can raise
MidiException(errno) -> None

