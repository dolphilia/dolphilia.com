# pygame.cursors

カーソルリソースのための pygame モジュール

|           API           |                       説明                       |
| ----------------------- | ------------------------------------------------ |
| pygame.cursors.compile  | 単純な文字列からバイナリカーソルデータを作成する |
| pygame.cursors.load_xbm | XBMファイルからカーソルデータを読み込む          |
| pygame.cursors.Cursor   | カーソルを表す pygame オブジェクト。             |

Pygame offers control over the system hardware cursor. Pygame supports black and white cursors (bitmap cursors), as well as system variant cursors and color cursors. You control the cursor with functions inside pygame.mousepygame module to work with the mouse.

This cursors module contains functions for loading and decoding various cursor formats. These allow you to easily store your cursors in external files or directly as encoded python strings.

The module includes several standard cursors. The pygame.mouse.set_cursor()set the mouse cursor to a new cursor function takes several arguments. All those arguments have been stored in a single tuple you can call like this:

>>> pygame.mouse.set_cursor(*pygame.cursors.arrow)
The following variables can be passed to pygame.mouse.set_cursor function:

pygame.cursors.arrow
pygame.cursors.diamond
pygame.cursors.broken_x
pygame.cursors.tri_left
pygame.cursors.tri_right
This module also contains a few cursors as formatted strings. You'll need to pass these to pygame.cursors.compile() function before you can use them. The example call would look like this:

>>> cursor = pygame.cursors.compile(pygame.cursors.textmarker_strings)
>>> pygame.mouse.set_cursor((8, 16), (0, 0), *cursor)
The following strings can be converted into cursor bitmaps with pygame.cursors.compile() :

pygame.cursors.thickarrow_strings
pygame.cursors.sizer_x_strings
pygame.cursors.sizer_y_strings
pygame.cursors.sizer_xy_strings
pygame.cursor.textmarker_strings
pygame.cursors.compile()
create binary cursor data from simple strings
compile(strings, black='X', white='.', xor='o') -> data, mask
A sequence of strings can be used to create binary cursor data for the system cursor. This returns the binary data in the form of two tuples. Those can be passed as the third and fourth arguments respectively of the pygame.mouse.set_cursor()set the mouse cursor to a new cursor function.

If you are creating your own cursor strings, you can use any value represent the black and white pixels. Some system allow you to set a special toggle color for the system color, this is also called the xor color. If the system does not support xor cursors, that color will simply be black.

The height must be divisible by 8. The width of the strings must all be equal and be divisible by 8. If these two conditions are not met, ValueError is raised. An example set of cursor strings looks like this

thickarrow_strings = (               #sized 24x24
  "XX                      ",
  "XXX                     ",
  "XXXX                    ",
  "XX.XX                   ",
  "XX..XX                  ",
  "XX...XX                 ",
  "XX....XX                ",
  "XX.....XX               ",
  "XX......XX              ",
  "XX.......XX             ",
  "XX........XX            ",
  "XX........XXX           ",
  "XX......XXXXX           ",
  "XX.XXX..XX              ",
  "XXXX XX..XX             ",
  "XX   XX..XX             ",
  "     XX..XX             ",
  "      XX..XX            ",
  "      XX..XX            ",
  "       XXXX             ",
  "       XX               ",
  "                        ",
  "                        ",
  "                        ")

pygame.cursors.load_xbm()
load cursor data from an XBM file
load_xbm(cursorfile) -> cursor_args
load_xbm(cursorfile, maskfile) -> cursor_args
This loads cursors for a simple subset of XBM files. XBM files are traditionally used to store cursors on UNIX systems, they are an ASCII format used to represent simple images.

Sometimes the black and white color values will be split into two separate XBM files. You can pass a second maskfile argument to load the two images into a single cursor.

The cursorfile and maskfile arguments can either be filenames or file-like object with the readlines method.

The return value cursor_args can be passed directly to the pygame.mouse.set_cursor() function.


pygame.cursors.Cursor
pygame object representing a cursor
Cursor(size, hotspot, xormasks, andmasks) -> Cursor
Cursor(hotspot, surface) -> Cursor
Cursor(constant) -> Cursor
Cursor(Cursor) -> Cursor
Cursor() -> Cursor
pygame.cursors.Cursor.copy
pygame.cursors.Cursor.type
Gets the cursor type
pygame.cursors.Cursor.data
Gets the cursor data
In pygame 2, there are 3 types of cursors you can create to give your game that little bit of extra polish. There's bitmap type cursors, which existed in pygame 1.x, and are compiled from a string or load from an xbm file. Then there are system type cursors, where you choose a preset that will convey the same meaning but look native across different operating systems. Finally you can create a color cursor, which displays a pygame surface as the cursor.

Creating a system cursor

Choose a constant from this list, pass it into pygame.cursors.Cursor(constant), and you're good to go. Be advised that not all systems support every system cursor, and you may get a substitution instead. For example, on MacOS, WAIT/WAITARROW should show up as an arrow, and SIZENWSE/SIZENESW/SIZEALL should show up as a closed hand. And on Wayland, every SIZE cursor should show up as a hand.

Pygame Cursor Constant           Description
--------------------------------------------
pygame.SYSTEM_CURSOR_ARROW       arrow
pygame.SYSTEM_CURSOR_IBEAM       i-beam
pygame.SYSTEM_CURSOR_WAIT        wait
pygame.SYSTEM_CURSOR_CROSSHAIR   crosshair
pygame.SYSTEM_CURSOR_WAITARROW   small wait cursor
                                 (or wait if not available)
pygame.SYSTEM_CURSOR_SIZENWSE    double arrow pointing
                                 northwest and southeast
pygame.SYSTEM_CURSOR_SIZENESW    double arrow pointing
                                 northeast and southwest
pygame.SYSTEM_CURSOR_SIZEWE      double arrow pointing
                                 west and east
pygame.SYSTEM_CURSOR_SIZENS      double arrow pointing
                                 north and south
pygame.SYSTEM_CURSOR_SIZEALL     four pointed arrow pointing
                                 north, south, east, and west
pygame.SYSTEM_CURSOR_NO          slashed circle or crossbones
pygame.SYSTEM_CURSOR_HAND        hand
Creating a cursor without passing arguments

In addition to the cursor constants available and described above, you can also call pygame.cursors.Cursor(), and your cursor is ready (doing that is the same as calling pygame.cursors.Cursor(pygame.SYSTEM_CURSOR_ARROW). Doing one of those calls actually creates a system cursor using the default native image.

Creating a color cursor

To create a color cursor, create a Cursor from a hotspot and a surface. hotspot is an (x,y) coordinate that determines where in the cursor the exact point is. The hotspot position must be within the bounds of the surface.

Creating a bitmap cursor

When the mouse cursor is visible, it will be displayed as a black and white bitmap using the given bitmask arrays. The size is a sequence containing the cursor width and height. hotspot is a sequence containing the cursor hotspot position.

A cursor has a width and height, but a mouse position is represented by a set of point coordinates. So the value passed into the cursor hotspot variable helps pygame to actually determine at what exact point the cursor is at.

xormasks is a sequence of bytes containing the cursor xor data masks. Lastly andmasks, a sequence of bytes containing the cursor bitmask data. To create these variables, we can make use of the pygame.cursors.compile()create binary cursor data from simple strings function.

Width and height must be a multiple of 8, and the mask arrays must be the correct size for the given width and height. Otherwise an exception is raised.

copy()
| :sl:`copy the current cursor`
| :sg:`copy() -> Cursor`
Returns a new Cursor object with the same data and hotspot as the original.
type
Gets the cursor type
type -> string
The type will be "system", "bitmap", or "color".


data
Gets the cursor data
data -> tuple
Returns the data that was used to create this cursor object, wrapped up in a tuple.


New in pygame 2.0.1.


Example code for creating and settings cursors. (Click the mouse to switch cursor)

# pygame setup
import pygame as pg

pg.init()
screen = pg.display.set_mode([600, 400])
pg.display.set_caption("Example code for the cursors module")

# create a system cursor
system = pg.cursors.Cursor(pg.SYSTEM_CURSOR_NO)

# create bitmap cursors
bitmap_1 = pg.cursors.Cursor(*pg.cursors.arrow)
bitmap_2 = pg.cursors.Cursor(
    (24, 24), (0, 0), *pg.cursors.compile(pg.cursors.thickarrow_strings)
)

# create a color cursor
surf = pg.Surface((40, 40)) # you could also load an image 
surf.fill((120, 50, 50))        # and use that as your surface
color = pg.cursors.Cursor((20, 20), surf)

cursors = [system, bitmap_1, bitmap_2, color]
cursor_index = 0

pg.mouse.set_cursor(cursors[cursor_index])

clock = pg.time.Clock()
going = True
while going:
    clock.tick(60)
    screen.fill((0, 75, 30))
    pg.display.flip()

    for event in pg.event.get():
        if event.type == pg.QUIT or (event.type == pg.KEYDOWN and event.key == pg.K_ESCAPE):
            going = False

        # if the mouse is clicked it will switch to a new cursor
        if event.type == pg.MOUSEBUTTONDOWN:
            cursor_index += 1
            cursor_index %= len(cursors)
            pg.mouse.set_cursor(cursors[cursor_index])

pg.quit()