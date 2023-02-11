# pygame.gfxdraw

図形を描くための pygame モジュール

|               API               |                     説明                      |
| ------------------------------- | --------------------------------------------- |
| pygame.gfxdraw.pixel            | 画素を描く                                    |
| pygame.gfxdraw.hline            | 横線を引く                                    |
| pygame.gfxdraw.vline            | たてをひく                                    |
| pygame.gfxdraw.line             | 線を引く                                      |
| pygame.gfxdraw.rectangle        | 矩形を描く                                    |
| pygame.gfxdraw.box              | 矩形を塗りつぶす                              |
| pygame.gfxdraw.circle           | 円を描く                                      |
| pygame.gfxdraw.aacircle         | アンチエイリアスの円を描く                    |
| pygame.gfxdraw.filled_circle    | 円を描く                                      |
| pygame.gfxdraw.ellipse          | だ円を描く                                    |
| pygame.gfxdraw.aaellipse        | アンチエイリアスのかかった楕円を描く          |
| pygame.gfxdraw.filled_ellipse   | だ円を描く                                    |
| pygame.gfxdraw.arc              | 弧を描く                                      |
| pygame.gfxdraw.pie              | パイを描く                                    |
| pygame.gfxdraw.trigon           | を描く                                        |
| pygame.gfxdraw.aatrigon         | アンチエイリアスのかかった三角形/四角形を描く |
| pygame.gfxdraw.filled_trigon    | 三角形を塗りつぶす                            |
| pygame.gfxdraw.polygon          | 多角形を描く                                  |
| pygame.gfxdraw.aapolygon        | アンチエイリアスのかかったポリゴンを描画する  |
| pygame.gfxdraw.filled_polygon   | 塗りつぶし多角形を描画する                    |
| pygame.gfxdraw.textured_polygon | テクスチャ付きポリゴンを描画する              |
| pygame.gfxdraw.bezier           | ベジェ曲線を描く                              |

EXPERIMENTAL!: This API may change or disappear in later pygame releases. If you use this, your code may break with the next pygame release.

The pygame package does not import gfxdraw automatically when loaded, so it must imported explicitly to be used.

import pygame
import pygame.gfxdraw
For all functions the arguments are strictly positional and integers are accepted for coordinates and radii. The color argument can be one of the following formats:

a pygame.Colorpygame object for color representations object
an (RGB) triplet (tuple/list)
an (RGBA) quadruplet (tuple/list)
The functions rectangle() and box() will accept any (x, y, w, h) sequence for their rect argument, though pygame.Rectpygame object for storing rectangular coordinates instances are preferred.

To draw a filled antialiased shape, first use the antialiased (aa*) version of the function, and then use the filled (filled_*) version. For example:

col = (255, 0, 0)
surf.fill((255, 255, 255))
pygame.gfxdraw.aacircle(surf, x, y, 30, col)
pygame.gfxdraw.filled_circle(surf, x, y, 30, col)
Note For threading, each of the functions releases the GIL during the C part of the call.
Note See the pygame.drawpygame module for drawing shapes module for alternative draw methods. The pygame.gfxdraw module differs from the pygame.drawpygame module for drawing shapes module in the API it uses and the different draw functions available. pygame.gfxdraw wraps the primitives from the library called SDL_gfx, rather than using modified versions.
New in pygame 1.9.0.

pygame.gfxdraw.pixel()
draw a pixel
pixel(surface, x, y, color) -> None
Draws a single pixel, at position (x ,y), on the given surface.

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the pixel
y (int) -- y coordinate of the pixel
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.hline()
draw a horizontal line
hline(surface, x1, x2, y, color) -> None
Draws a straight horizontal line ((x1, y) to (x2, y)) on the given surface. There are no endcaps.

Parameters
surface (Surface) -- surface to draw on
x1 (int) -- x coordinate of one end of the line
x2 (int) -- x coordinate of the other end of the line
y (int) -- y coordinate of the line
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.vline()
draw a vertical line
vline(surface, x, y1, y2, color) -> None
Draws a straight vertical line ((x, y1) to (x, y2)) on the given surface. There are no endcaps.

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the line
y1 (int) -- y coordinate of one end of the line
y2 (int) -- y coordinate of the other end of the line
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.line()
draw a line
line(surface, x1, y1, x2, y2, color) -> None
Draws a straight line ((x1, y1) to (x2, y2)) on the given surface. There are no endcaps.

Parameters
surface (Surface) -- surface to draw on
x1 (int) -- x coordinate of one end of the line
y1 (int) -- y coordinate of one end of the line
x2 (int) -- x coordinate of the other end of the line
y2 (int) -- y coordinate of the other end of the line
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.rectangle()
draw a rectangle
rectangle(surface, rect, color) -> None
Draws an unfilled rectangle on the given surface. For a filled rectangle use box().

Parameters
surface (Surface) -- surface to draw on
rect (Rect) -- rectangle to draw, position and dimensions
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType
Note The rect.bottom and rect.right attributes of a pygame.Rectpygame object for storing rectangular coordinates always lie one pixel outside of its actual border. Therefore, these values will not be included as part of the drawing.

pygame.gfxdraw.box()
draw a filled rectangle
box(surface, rect, color) -> None
Draws a filled rectangle on the given surface. For an unfilled rectangle use rectangle().

Parameters
surface (Surface) -- surface to draw on
rect (Rect) -- rectangle to draw, position and dimensions
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType
Note The rect.bottom and rect.right attributes of a pygame.Rectpygame object for storing rectangular coordinates always lie one pixel outside of its actual border. Therefore, these values will not be included as part of the drawing.
Note The pygame.Surface.fill()fill Surface with a solid color method works just as well for drawing filled rectangles. In fact pygame.Surface.fill()fill Surface with a solid color can be hardware accelerated on some platforms with both software and hardware display modes.

pygame.gfxdraw.circle()
draw a circle
circle(surface, x, y, r, color) -> None
Draws an unfilled circle on the given surface. For a filled circle use filled_circle().

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the circle
y (int) -- y coordinate of the center of the circle
r (int) -- radius of the circle
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.aacircle()
draw an antialiased circle
aacircle(surface, x, y, r, color) -> None
Draws an unfilled antialiased circle on the given surface.

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the circle
y (int) -- y coordinate of the center of the circle
r (int) -- radius of the circle
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.filled_circle()
draw a filled circle
filled_circle(surface, x, y, r, color) -> None
Draws a filled circle on the given surface. For an unfilled circle use circle().

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the circle
y (int) -- y coordinate of the center of the circle
r (int) -- radius of the circle
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.ellipse()
draw an ellipse
ellipse(surface, x, y, rx, ry, color) -> None
Draws an unfilled ellipse on the given surface. For a filled ellipse use filled_ellipse().

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the ellipse
y (int) -- y coordinate of the center of the ellipse
rx (int) -- horizontal radius of the ellipse
ry (int) -- vertical radius of the ellipse
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.aaellipse()
draw an antialiased ellipse
aaellipse(surface, x, y, rx, ry, color) -> None
Draws an unfilled antialiased ellipse on the given surface.

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the ellipse
y (int) -- y coordinate of the center of the ellipse
rx (int) -- horizontal radius of the ellipse
ry (int) -- vertical radius of the ellipse
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.filled_ellipse()
draw a filled ellipse
filled_ellipse(surface, x, y, rx, ry, color) -> None
Draws a filled ellipse on the given surface. For an unfilled ellipse use ellipse().

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the ellipse
y (int) -- y coordinate of the center of the ellipse
rx (int) -- horizontal radius of the ellipse
ry (int) -- vertical radius of the ellipse
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.arc()
draw an arc
arc(surface, x, y, r, start_angle, stop_angle, color) -> None
Draws an arc on the given surface. For an arc with its endpoints connected to its center use pie().

The two angle arguments are given in degrees and indicate the start and stop positions of the arc. The arc is drawn in a clockwise direction from the start_angle to the stop_angle. If start_angle == stop_angle, nothing will be drawn

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the arc
y (int) -- y coordinate of the center of the arc
r (int) -- radius of the arc
start_angle (int) -- start angle in degrees
stop_angle (int) -- stop angle in degrees
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType
Note This function uses degrees while the pygame.draw.arc()draw an elliptical arc function uses radians.

pygame.gfxdraw.pie()
draw a pie
pie(surface, x, y, r, start_angle, stop_angle, color) -> None
Draws an unfilled pie on the given surface. A pie is an arc() with its endpoints connected to its center.

The two angle arguments are given in degrees and indicate the start and stop positions of the pie. The pie is drawn in a clockwise direction from the start_angle to the stop_angle. If start_angle == stop_angle, a straight line will be drawn from the center position at the given angle, to a length of the radius.

Parameters
surface (Surface) -- surface to draw on
x (int) -- x coordinate of the center of the pie
y (int) -- y coordinate of the center of the pie
r (int) -- radius of the pie
start_angle (int) -- start angle in degrees
stop_angle (int) -- stop angle in degrees
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.trigon()
draw a trigon/triangle
trigon(surface, x1, y1, x2, y2, x3, y3, color) -> None
Draws an unfilled trigon (triangle) on the given surface. For a filled trigon use filled_trigon().

A trigon can also be drawn using polygon() e.g. polygon(surface, ((x1, y1), (x2, y2), (x3, y3)), color)

Parameters
surface (Surface) -- surface to draw on
x1 (int) -- x coordinate of the first corner of the trigon
y1 (int) -- y coordinate of the first corner of the trigon
x2 (int) -- x coordinate of the second corner of the trigon
y2 (int) -- y coordinate of the second corner of the trigon
x3 (int) -- x coordinate of the third corner of the trigon
y3 (int) -- y coordinate of the third corner of the trigon
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.aatrigon()
draw an antialiased trigon/triangle
aatrigon(surface, x1, y1, x2, y2, x3, y3, color) -> None
Draws an unfilled antialiased trigon (triangle) on the given surface.

An aatrigon can also be drawn using aapolygon() e.g. aapolygon(surface, ((x1, y1), (x2, y2), (x3, y3)), color)

Parameters
surface (Surface) -- surface to draw on
x1 (int) -- x coordinate of the first corner of the trigon
y1 (int) -- y coordinate of the first corner of the trigon
x2 (int) -- x coordinate of the second corner of the trigon
y2 (int) -- y coordinate of the second corner of the trigon
x3 (int) -- x coordinate of the third corner of the trigon
y3 (int) -- y coordinate of the third corner of the trigon
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.filled_trigon()
draw a filled trigon/triangle
filled_trigon(surface, x1, y1, x2, y2, x3, y3, color) -> None
Draws a filled trigon (triangle) on the given surface. For an unfilled trigon use trigon().

A filled_trigon can also be drawn using filled_polygon() e.g. filled_polygon(surface, ((x1, y1), (x2, y2), (x3, y3)), color)

Parameters
surface (Surface) -- surface to draw on
x1 (int) -- x coordinate of the first corner of the trigon
y1 (int) -- y coordinate of the first corner of the trigon
x2 (int) -- x coordinate of the second corner of the trigon
y2 (int) -- y coordinate of the second corner of the trigon
x3 (int) -- x coordinate of the third corner of the trigon
y3 (int) -- y coordinate of the third corner of the trigon
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType

pygame.gfxdraw.polygon()
draw a polygon
polygon(surface, points, color) -> None
Draws an unfilled polygon on the given surface. For a filled polygon use filled_polygon().

The adjacent coordinates in the points argument, as well as the first and last points, will be connected by line segments. e.g. For the points [(x1, y1), (x2, y2), (x3, y3)] a line segment will be drawn from (x1, y1) to (x2, y2), from (x2, y2) to (x3, y3), and from (x3, y3) to (x1, y1).

Parameters
surface (Surface) -- surface to draw on
points (tuple(coordinate) or list(coordinate)) -- a sequence of 3 or more (x, y) coordinates, where each coordinate in the sequence must be a tuple/list/pygame.math.Vector2a 2-Dimensional Vector of 2 ints/floats (float values will be truncated)
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType
Raises
ValueError -- if len(points) < 3 (must have at least 3 points)
IndexError -- if len(coordinate) < 2 (each coordinate must have at least 2 items)

pygame.gfxdraw.aapolygon()
draw an antialiased polygon
aapolygon(surface, points, color) -> None
Draws an unfilled antialiased polygon on the given surface.

The adjacent coordinates in the points argument, as well as the first and last points, will be connected by line segments. e.g. For the points [(x1, y1), (x2, y2), (x3, y3)] a line segment will be drawn from (x1, y1) to (x2, y2), from (x2, y2) to (x3, y3), and from (x3, y3) to (x1, y1).

Parameters
surface (Surface) -- surface to draw on
points (tuple(coordinate) or list(coordinate)) -- a sequence of 3 or more (x, y) coordinates, where each coordinate in the sequence must be a tuple/list/pygame.math.Vector2a 2-Dimensional Vector of 2 ints/floats (float values will be truncated)
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType
Raises
ValueError -- if len(points) < 3 (must have at least 3 points)
IndexError -- if len(coordinate) < 2 (each coordinate must have at least 2 items)

pygame.gfxdraw.filled_polygon()
draw a filled polygon
filled_polygon(surface, points, color) -> None
Draws a filled polygon on the given surface. For an unfilled polygon use polygon().

The adjacent coordinates in the points argument, as well as the first and last points, will be connected by line segments. e.g. For the points [(x1, y1), (x2, y2), (x3, y3)] a line segment will be drawn from (x1, y1) to (x2, y2), from (x2, y2) to (x3, y3), and from (x3, y3) to (x1, y1).

Parameters
surface (Surface) -- surface to draw on
points (tuple(coordinate) or list(coordinate)) -- a sequence of 3 or more (x, y) coordinates, where each coordinate in the sequence must be a tuple/list/pygame.math.Vector2a 2-Dimensional Vector of 2 ints/floats (float values will be truncated)`
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType
Raises
ValueError -- if len(points) < 3 (must have at least 3 points)
IndexError -- if len(coordinate) < 2 (each coordinate must have at least 2 items)

pygame.gfxdraw.textured_polygon()
draw a textured polygon
textured_polygon(surface, points, texture, tx, ty) -> None
Draws a textured polygon on the given surface. For better performance, the surface and the texture should have the same format.

A per-pixel alpha texture blit to a per-pixel alpha surface will differ from a pygame.Surface.blit()draw one image onto another blit. Also, a per-pixel alpha texture cannot be used with an 8-bit per pixel destination.

The adjacent coordinates in the points argument, as well as the first and last points, will be connected by line segments. e.g. For the points [(x1, y1), (x2, y2), (x3, y3)] a line segment will be drawn from (x1, y1) to (x2, y2), from (x2, y2) to (x3, y3), and from (x3, y3) to (x1, y1).

Parameters
surface (Surface) -- surface to draw on
points (tuple(coordinate) or list(coordinate)) -- a sequence of 3 or more (x, y) coordinates, where each coordinate in the sequence must be a tuple/list/pygame.math.Vector2a 2-Dimensional Vector of 2 ints/floats (float values will be truncated)
texture (Surface) -- texture to draw on the polygon
tx (int) -- x offset of the texture
ty (int) -- y offset of the texture
Returns
None
Return type
NoneType
Raises
ValueError -- if len(points) < 3 (must have at least 3 points)
IndexError -- if len(coordinate) < 2 (each coordinate must have at least 2 items)

pygame.gfxdraw.bezier()
draw a Bezier curve
bezier(surface, points, steps, color) -> None
Draws a Bézier curve on the given surface.

Parameters
surface (Surface) -- surface to draw on
points (tuple(coordinate) or list(coordinate)) -- a sequence of 3 or more (x, y) coordinates used to form a curve, where each coordinate in the sequence must be a tuple/list/pygame.math.Vector2a 2-Dimensional Vector of 2 ints/floats (float values will be truncated)
steps (int) -- number of steps for the interpolation, the minimum is 2
color (Color or tuple(int, int, int, [int])) -- color to draw with, the alpha value is optional if using a tuple (RGB[A])
Returns
None
Return type
NoneType
Raises
ValueError -- if steps < 2
ValueError -- if len(points) < 3 (must have at least 3 points)
IndexError -- if len(coordinate) < 2 (each coordinate must have at least 2 items)

