# pygame.mask

画像マスクのためのpygameモジュール。

|            API             |                          説明                           |
| -------------------------- | ------------------------------------------------------- |
| pygame.mask.from_surface   | 与えられたサーフェスからマスクを作成します              |
| pygame.mask.from_threshold | 閾値処理によるマスクの作成 Surfaces                     |
| pygame.mask.Mask           | 2次元ビットマスクを表現するための pygame オブジェクト。 |

Useful for fast pixel perfect collision detection. A mask uses 1 bit per-pixel to store which parts collide.

New in pygame 1.8.

Changed in pygame 2.0.2: Mask functions now support keyword arguments.

Changed in pygame 2.0.2: Mask functions that take positions or offsets now support pygame.math.Vector2a 2-Dimensional Vector arguments.

pygame.mask.from_surface()
Creates a Mask from the given surface
from_surface(surface) -> Mask
from_surface(surface, threshold=127) -> Mask
Creates a Mask object from the given surface by setting all the opaque pixels and not setting the transparent pixels.

If the surface uses a color-key, then it is used to decide which bits in the resulting mask are set. All the pixels that are not equal to the color-key are set and the pixels equal to the color-key are not set.

If a color-key is not used, then the alpha value of each pixel is used to decide which bits in the resulting mask are set. All the pixels that have an alpha value greater than the threshold parameter are set and the pixels with an alpha value less than or equal to the threshold are not set.

Parameters
surface (Surface) -- the surface to create the mask from
threshold (int) -- (optional) the alpha threshold (default is 127) to compare with each surface pixel's alpha value, if the surface is color-keyed this parameter is ignored
Returns
a newly created Mask object from the given surface
Return type
Mask
Note This function is used to create the masks for pygame.sprite.collide_mask()Collision detection between two sprites, using masks..

pygame.mask.from_threshold()
Creates a mask by thresholding Surfaces
from_threshold(surface, color) -> Mask
from_threshold(surface, color, threshold=(0, 0, 0, 255), othersurface=None, palette_colors=1) -> Mask
This is a more featureful method of getting a Mask from a surface.

If the optional othersurface is not used, all the pixels within the threshold of the color parameter are set in the resulting mask.

If the optional othersurface is used, every pixel in the first surface that is within the threshold of the corresponding pixel in othersurface is set in the resulting mask.

Parameters
surface (Surface) -- the surface to create the mask from
color (Color or int or tuple(int, int, int, [int]) or list[int, int, int, [int]]) -- color used to check if the surface's pixels are within the given threshold range, this parameter is ignored if the optional othersurface parameter is supplied
threshold (Color or int or tuple(int, int, int, [int]) or list[int, int, int, [int]]) -- (optional) the threshold range used to check the difference between two colors (default is (0, 0, 0, 255))
othersurface (Surface) -- (optional) used to check whether the pixels of the first surface are within the given threshold range of the pixels from this surface (default is None)
palette_colors (int) -- (optional) indicates whether to use the palette colors or not, a nonzero value causes the palette colors to be used and a 0 causes them not to be used (default is 1)
Returns
a newly created Mask object from the given surface
Return type
Mask

pygame.mask.Mask
pygame object for representing 2D bitmasks
Mask(size=(width, height)) -> Mask
Mask(size=(width, height), fill=False) -> Mask
pygame.mask.Mask.copy
Returns a new copy of the mask
pygame.mask.Mask.get_size
Returns the size of the mask
pygame.mask.Mask.get_rect
Returns a Rect based on the size of the mask
pygame.mask.Mask.get_at
Gets the bit at the given position
pygame.mask.Mask.set_at
Sets the bit at the given position
pygame.mask.Mask.overlap
Returns the point of intersection
pygame.mask.Mask.overlap_area
Returns the number of overlapping set bits
pygame.mask.Mask.overlap_mask
Returns a mask of the overlapping set bits
pygame.mask.Mask.fill
Sets all bits to 1
pygame.mask.Mask.clear
Sets all bits to 0
pygame.mask.Mask.invert
Flips all the bits
pygame.mask.Mask.scale
Resizes a mask
pygame.mask.Mask.draw
Draws a mask onto another
pygame.mask.Mask.erase
Erases a mask from another
pygame.mask.Mask.count
Returns the number of set bits
pygame.mask.Mask.centroid
Returns the centroid of the set bits
pygame.mask.Mask.angle
Returns the orientation of the set bits
pygame.mask.Mask.outline
Returns a list of points outlining an object
pygame.mask.Mask.convolve
Returns the convolution of this mask with another mask
pygame.mask.Mask.connected_component
Returns a mask containing a connected component
pygame.mask.Mask.connected_components
Returns a list of masks of connected components
pygame.mask.Mask.get_bounding_rects
Returns a list of bounding rects of connected components
pygame.mask.Mask.to_surface
Returns a surface with the mask drawn on it
A Mask object is used to represent a 2D bitmask. Each bit in the mask represents a pixel. 1 is used to indicate a set bit and 0 is used to indicate an unset bit. Set bits in a mask can be used to detect collisions with other masks and their set bits.

A filled mask has all of its bits set to 1, conversely an unfilled/cleared/empty mask has all of its bits set to 0. Masks can be created unfilled (default) or filled by using the fill parameter. Masks can also be cleared or filled using the pygame.mask.Mask.clear()Sets all bits to 0 and pygame.mask.Mask.fill()Sets all bits to 1 methods respectively.

A mask's coordinates start in the top left corner at (0, 0) just like pygame.Surfacepygame object for representing images. Individual bits can be accessed using the pygame.mask.Mask.get_at()Gets the bit at the given position and pygame.mask.Mask.set_at()Sets the bit at the given position methods.

The methods overlap(), overlap_area(), overlap_mask(), draw(), erase(), and convolve() use an offset parameter to indicate the offset of another mask's top left corner from the calling mask's top left corner. The calling mask's top left corner is considered to be the origin (0, 0). Offsets are a sequence of two values (x_offset, y_offset). Positive and negative offset values are supported.

           0 to x (x_offset)
           :    :
   0 ..... +----:---------+
   to      |    :         |
   y .......... +-----------+
(y_offset) |    | othermask |
           |    +-----------+
           | calling_mask |
           +--------------+
Parameters
size -- the dimensions of the mask (width and height)
fill (bool) -- (optional) create an unfilled mask (default: False) or filled mask (True)
Returns
a newly created Mask object
Return type
Mask
Changed in pygame 2.0.0: Shallow copy support added. The Mask class supports the special method __copy__() and shallow copying via copy.copy(mask).

Changed in pygame 2.0.0: Subclassing support added. The Mask class can be used as a base class.

Changed in pygame 1.9.5: Added support for keyword arguments.

Changed in pygame 1.9.5: Added the optional keyword parameter fill.

Changed in pygame 1.9.5: Added support for masks with a width and/or a height of 0.

copy()
Returns a new copy of the mask
copy() -> Mask
Returns
a new copy of this mask, the new mask will have the same width, height, and set/unset bits as the original
Return type
Mask
Note If a mask subclass needs to copy any instance specific attributes then it should override the __copy__() method. The overridden __copy__() method needs to call super().__copy__() and then copy the required data as in the following example code.
class SubMask(pygame.mask.Mask):
    def __copy__(self):
        new_mask = super().__copy__()
        # Do any SubMask attribute copying here.
        return new_mask
New in pygame 2.0.0.


get_size()
Returns the size of the mask
get_size() -> (width, height)
Returns
the size of the mask, (width, height)
Return type
tuple(int, int)

get_rect()
Returns a Rect based on the size of the mask
get_rect(**kwargs) -> Rect
Returns a new pygame.Rect()pygame object for storing rectangular coordinates object based on the size of this mask. The rect's default position will be (0, 0) and its default width and height will be the same as this mask's. The rect's attributes can be altered via pygame.Rect()pygame object for storing rectangular coordinates attribute keyword arguments/values passed into this method. As an example, a_mask.get_rect(center=(10, 5)) would create a pygame.Rect()pygame object for storing rectangular coordinates based on the mask's size centered at the given position.

Parameters
kwargs (dict) -- pygame.Rect()pygame object for storing rectangular coordinates attribute keyword arguments/values that will be applied to the rect
Returns
a new pygame.Rect()pygame object for storing rectangular coordinates object based on the size of this mask with any pygame.Rect()pygame object for storing rectangular coordinates attribute keyword arguments/values applied to it
Return type
Rect
New in pygame 2.0.0.


get_at()
Gets the bit at the given position
get_at(pos) -> int
Parameters
pos -- the position of the bit to get (x, y)
Returns
1 if the bit is set, 0 if the bit is not set
Return type
int
Raises
IndexError -- if the position is outside of the mask's bounds

set_at()
Sets the bit at the given position
set_at(pos) -> None
set_at(pos, value=1) -> None
Parameters
pos -- the position of the bit to set (x, y)
value (int) -- any nonzero int will set the bit to 1, 0 will set the bit to 0 (default is 1)
Returns
None
Return type
NoneType
Raises
IndexError -- if the position is outside of the mask's bounds

overlap()
Returns the point of intersection
overlap(other, offset) -> (x, y)
overlap(other, offset) -> None
Returns the first point of intersection encountered between this mask and other. A point of intersection is 2 overlapping set bits.

The current algorithm searches the overlapping area in sizeof(unsigned long int) * CHAR_BIT bit wide column blocks (the value of sizeof(unsigned long int) * CHAR_BIT is platform dependent, for clarity it will be referred to as W). Starting at the top left corner it checks bits 0 to W - 1 of the first row ((0, 0) to (W - 1, 0)) then continues to the next row ((0, 1) to (W - 1, 1)). Once this entire column block is checked, it continues to the next one (W to 2 * W - 1). This is repeated until it finds a point of intersection or the entire overlapping area is checked.

Parameters
other (Mask) -- the other mask to overlap with this mask
offset -- the offset of other from this mask, for more details refer to the Mask offset notes
Returns
point of intersection or None if no intersection
Return type
tuple(int, int) or NoneType

overlap_area()
Returns the number of overlapping set bits
overlap_area(other, offset) -> numbits
Returns the number of overlapping set bits between between this mask and other.

This can be useful for collision detection. An approximate collision normal can be found by calculating the gradient of the overlapping area through the finite difference.

dx = mask.overlap_area(other, (x + 1, y)) - mask.overlap_area(other, (x - 1, y))
dy = mask.overlap_area(other, (x, y + 1)) - mask.overlap_area(other, (x, y - 1))
Parameters
other (Mask) -- the other mask to overlap with this mask
offset -- the offset of other from this mask, for more details refer to the Mask offset notes
Returns
the number of overlapping set bits
Return type
int

overlap_mask()
Returns a mask of the overlapping set bits
overlap_mask(other, offset) -> Mask
Returns a Mask, the same size as this mask, containing the overlapping set bits between this mask and other.

Parameters
other (Mask) -- the other mask to overlap with this mask
offset -- the offset of other from this mask, for more details refer to the Mask offset notes
Returns
a newly created Mask with the overlapping bits set
Return type
Mask

fill()
Sets all bits to 1
fill() -> None
Sets all bits in the mask to 1.

Returns
None
Return type
NoneType

clear()
Sets all bits to 0
clear() -> None
Sets all bits in the mask to 0.

Returns
None
Return type
NoneType

invert()
Flips all the bits
invert() -> None
Flips all of the bits in the mask. All the set bits are cleared to 0 and all the unset bits are set to 1.

Returns
None
Return type
NoneType

scale()
Resizes a mask
scale((width, height)) -> Mask
Creates a new Mask of the requested size with its bits scaled from this mask.

Parameters
size -- the width and height (size) of the mask to create
Returns
a new Mask object with its bits scaled from this mask
Return type
Mask
Raises
ValueError -- if width < 0 or height < 0

draw()
Draws a mask onto another
draw(other, offset) -> None
Performs a bitwise OR, drawing othermask onto this mask.

Parameters
other (Mask) -- the mask to draw onto this mask
offset -- the offset of other from this mask, for more details refer to the Mask offset notes
Returns
None
Return type
NoneType

erase()
Erases a mask from another
erase(other, offset) -> None
Erases (clears) all bits set in other from this mask.

Parameters
other (Mask) -- the mask to erase from this mask
offset -- the offset of other from this mask, for more details refer to the Mask offset notes
Returns
None
Return type
NoneType

count()
Returns the number of set bits
count() -> bits
Returns
the number of set bits in the mask
Return type
int

centroid()
Returns the centroid of the set bits
centroid() -> (x, y)
Finds the centroid (the center mass of the set bits) for this mask.

Returns
a coordinate tuple indicating the centroid of the mask, it will return (0, 0) if the mask has no bits set
Return type
tuple(int, int)

angle()
Returns the orientation of the set bits
angle() -> theta
Finds the approximate orientation (from -90 to 90 degrees) of the set bits in the mask. This works best if performed on a mask with only one connected component.

Returns
the orientation of the set bits in the mask, it will return 0.0 if the mask has no bits set
Return type
float
Note See connected_component() for details on how a connected component is calculated.

outline()
Returns a list of points outlining an object
outline() -> [(x, y), ...]
outline(every=1) -> [(x, y), ...]
Returns a list of points of the outline of the first connected component encountered in the mask. To find a connected component, the mask is searched per row (left to right) starting in the top left corner.

The every optional parameter skips set bits in the outline. For example, setting it to 10 would return a list of every 10th set bit in the outline.

Parameters
every (int) -- (optional) indicates the number of bits to skip over in the outline (default is 1)
Returns
a list of points outlining the first connected component encountered, an empty list is returned if the mask has no bits set
Return type
list[tuple(int, int)]
Note See connected_component() for details on how a connected component is calculated.

convolve()
Returns the convolution of this mask with another mask
convolve(other) -> Mask
convolve(other, output=None, offset=(0, 0)) -> Mask
Convolve this mask with the given other Mask.

Parameters
other (Mask) -- mask to convolve this mask with
output (Mask or NoneType) -- (optional) mask for output (default is None)
offset -- the offset of other from this mask, (default is (0, 0))
Returns
a Mask with the (i - offset[0], j - offset[1]) bit set, if shifting other (such that its bottom right corner is at (i, j)) causes it to overlap with this mask
If an output Mask is specified, the output is drawn onto it and it is returned. Otherwise a mask of size (MAX(0, width + other mask's width - 1), MAX(0, height + other mask's height - 1)) is created and returned.
Return type
Mask

connected_component()
Returns a mask containing a connected component
connected_component() -> Mask
connected_component(pos) -> Mask
A connected component is a group (1 or more) of connected set bits (orthogonally and diagonally). The SAUF algorithm, which checks 8 point connectivity, is used to find a connected component in the mask.

By default this method will return a Mask containing the largest connected component in the mask. Optionally, a bit coordinate can be specified and the connected component containing it will be returned. If the bit at the given location is not set, the returned Mask will be empty (no bits set).

Parameters
pos -- (optional) selects the connected component that contains the bit at this position
Returns
a Mask object (same size as this mask) with the largest connected component from this mask, if this mask has no bits set then an empty mask will be returned
If the pos parameter is provided then the mask returned will have the connected component that contains this position. An empty mask will be returned if the pos parameter selects an unset bit.
Return type
Mask
Raises
IndexError -- if the optional pos parameter is outside of the mask's bounds

connected_components()
Returns a list of masks of connected components
connected_components() -> [Mask, ...]
connected_components(minimum=0) -> [Mask, ...]
Provides a list containing a Mask object for each connected component.

Parameters
minimum (int) -- (optional) indicates the minimum number of bits (to filter out noise) per connected component (default is 0, which equates to no minimum and is equivalent to setting it to 1, as a connected component must have at least 1 bit set)
Returns
a list containing a Mask object for each connected component, an empty list is returned if the mask has no bits set
Return type
list[Mask]
Note See connected_component() for details on how a connected component is calculated.

get_bounding_rects()
Returns a list of bounding rects of connected components
get_bounding_rects() -> [Rect, ...]
Provides a list containing a bounding rect for each connected component.

Returns
a list containing a bounding rect for each connected component, an empty list is returned if the mask has no bits set
Return type
list[Rect]
Note See connected_component() for details on how a connected component is calculated.

to_surface()
Returns a surface with the mask drawn on it
to_surface() -> Surface
to_surface(surface=None, setsurface=None, unsetsurface=None, setcolor=(255, 255, 255, 255), unsetcolor=(0, 0, 0, 255), dest=(0, 0)) -> Surface
Draws this mask on the given surface. Set bits (bits set to 1) and unset bits (bits set to 0) can be drawn onto a surface.

Parameters
surface (Surface or None) -- (optional) Surface to draw mask onto, if no surface is provided one will be created (default is None, which will cause a surface with the parameters Surface(size=mask.get_size(), flags=SRCALPHA, depth=32) to be created, drawn on, and returned)
setsurface (Surface or None) -- (optional) use this surface's color values to draw set bits (default is None), if this surface is smaller than the mask any bits outside its bounds will use the setcolor value
unsetsurface (Surface or None) -- (optional) use this surface's color values to draw unset bits (default is None), if this surface is smaller than the mask any bits outside its bounds will use the unsetcolor value
setcolor (Color or str or int or tuple(int, int, int, [int]) or list(int, int, int, [int]) or None) -- (optional) color to draw set bits (default is (255, 255, 255, 255), white), use None to skip drawing the set bits, the setsurface parameter (if set) will takes precedence over this parameter
unsetcolor (Color or str or int or tuple(int, int, int, [int]) or list(int, int, int, [int]) or None) -- (optional) color to draw unset bits (default is (0, 0, 0, 255), black), use None to skip drawing the unset bits, the unsetsurface parameter (if set) will takes precedence over this parameter
dest (Rect or tuple(int, int) or list(int, int) or Vector2(int, int)) -- (optional) surface destination of where to position the topleft corner of the mask being drawn (default is (0, 0)), if a Rect is used as the dest parameter, its x and y attributes will be used as the destination, NOTE1: rects with a negative width or height value will not be normalized before using their x and y values, NOTE2: this destination value is only used to position the mask on the surface, it does not offset the setsurface and unsetsurface from the mask, they are always aligned with the mask (i.e. position (0, 0) on the mask always corresponds to position (0, 0) on the setsurface and unsetsurface)
Returns
the surface parameter (or a newly created surface if no surface parameter was provided) with this mask drawn on it
Return type
Surface
Raises
ValueError -- if the setsurface parameter or unsetsurface parameter does not have the same format (bytesize/bitsize/alpha) as the surface parameter
Note To skip drawing the set bits, both setsurface and setcolor must be None. The setsurface parameter defaults to None, but setcolor defaults to a color value and therefore must be set to None.
Note To skip drawing the unset bits, both unsetsurface and unsetcolor must be None. The unsetsurface parameter defaults to None, but unsetcolor defaults to a color value and therefore must be set to None.
New in pygame 2.0.0.


