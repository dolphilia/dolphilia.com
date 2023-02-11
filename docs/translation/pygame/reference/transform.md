# pygame.transform

サーフェスを変換する pygame モジュール

|                   API                    |                                                説明                                                |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| pygame.transform.flip                    | タテヨコ反転                                                                                       |
| pygame.transform.scale                   | 新しい解像度にリサイズする                                                                         |
| pygame.transform.scale_by                | スカラーを使用して新しい解像度にリサイズします。                                                   |
| pygame.transform.rotate                  | 画像を回転させる                                                                                   |
| pygame.transform.rotozoom                | フィルタリングによる拡大・縮小、回転                                                               |
| pygame.transform.scale2x                 | スペシャライズド・イメージダブラー                                                                 |
| pygame.transform.smoothscale             | 表面を任意の大きさに滑らかに拡大する                                                               |
| pygame.transform.smoothscale_by          | スカラーを使用して新しい解像度にリサイズします。                                                   |
| pygame.transform.get_smoothscale_backend | 使用中のスムーススケールフィルタのバージョンを返します。GENERIC', 'MMX', または 'SSE'.             |
| pygame.transform.set_smoothscale_backend | smoothscale filter のバージョンを設定します。GENERIC', 'MMX', または 'SSE' のいずれか。            |
| pygame.transform.chop                    | 内部領域を削除した画像のコピーを取得する                                                           |
| pygame.transform.laplacian               | 面のエッジを見つける                                                                               |
| pygame.transform.average_surfaces        | 多数の表面から平均的な表面を求める。                                                               |
| pygame.transform.average_color           | は、表面の平均色を求める                                                                           |
| pygame.transform.threshold               | は、'search_color' または 'search_surf' の閾値内にあるサーフェイスのピクセル数とその数を求めます。 |

A Surface transform is an operation that moves or resizes the pixels. All these functions take a Surface to operate on and return a new Surface with the results.

Some of the transforms are considered destructive. These means every time they are performed they lose pixel data. Common examples of this are resizing and rotating. For this reason, it is better to re-transform the original surface than to keep transforming an image multiple times. (For example, suppose you are animating a bouncing spring which expands and contracts. If you applied the size changes incrementally to the previous images, you would lose detail. Instead, always begin with the original image and scale to the desired size.)

Changed in pygame 2.0.2: transform functions now support keyword arguments.

pygame.transform.flip()
flip vertically and horizontally
flip(surface, flip_x, flip_y) -> Surface
This can flip a Surface either vertically, horizontally, or both. The arguments flip_x and flip_y are booleans that control whether to flip each axis. Flipping a Surface is non-destructive and returns a new Surface with the same dimensions.


pygame.transform.scale()
resize to new resolution
scale(surface, size, dest_surface=None) -> Surface
Resizes the Surface to a new size, given as (width, height). This is a fast scale operation that does not sample the results.

An optional destination surface can be used, rather than have it create a new one. This is quicker if you want to repeatedly scale something. However the destination must be the same size as the size (width, height) passed in. Also the destination surface must be the same format.


pygame.transform.scale_by()
resize to new resolution, using scalar(s)
scale_by(surface, factor, dest_surface=None) -> Surface
Same as scale(), but scales by some factor, rather than taking the new size explicitly. For example, transform.scale_by(surf, 3) will triple the size of the surface in both dimensions. Optionally, the scale factor can be a sequence of two numbers, controlling x and y scaling separately. For example, transform.scale_by(surf, (2, 1)) doubles the image width but keeps the height the same.

New in pygame 2.1.3.


pygame.transform.rotate()
rotate an image
rotate(surface, angle) -> Surface
Unfiltered counterclockwise rotation. The angle argument represents degrees and can be any floating point value. Negative angle amounts will rotate clockwise.

Unless rotating by 90 degree increments, the image will be padded larger to hold the new size. If the image has pixel alphas, the padded area will be transparent. Otherwise pygame will pick a color that matches the Surface colorkey or the topleft pixel value.


pygame.transform.rotozoom()
filtered scale and rotation
rotozoom(surface, angle, scale) -> Surface
This is a combined scale and rotation transform. The resulting Surface will be a filtered 32-bit Surface. The scale argument is a floating point value that will be multiplied by the current resolution. The angle argument is a floating point value that represents the counterclockwise degrees to rotate. A negative rotation angle will rotate clockwise.


pygame.transform.scale2x()
specialized image doubler
scale2x(surface, dest_surface=None) -> Surface
This will return a new image that is double the size of the original. It uses the AdvanceMAME Scale2X algorithm which does a 'jaggie-less' scale of bitmap graphics.

This really only has an effect on simple images with solid colors. On photographic and antialiased images it will look like a regular unfiltered scale.

An optional destination surface can be used, rather than have it create a new one. This is quicker if you want to repeatedly scale something. However the destination must be twice the size of the source surface passed in. Also the destination surface must be the same format.


pygame.transform.smoothscale()
scale a surface to an arbitrary size smoothly
smoothscale(surface, size, dest_surface=None) -> Surface
Uses one of two different algorithms for scaling each dimension of the input surface as required. For shrinkage, the output pixels are area averages of the colors they cover. For expansion, a bilinear filter is used. For the x86-64 and i686 architectures, optimized MMX routines are included and will run much faster than other machine types. The size is a 2 number sequence for (width, height). This function only works for 24-bit or 32-bit surfaces. An exception will be thrown if the input surface bit depth is less than 24.

New in pygame 1.8.


pygame.transform.smoothscale_by()
resize to new resolution, using scalar(s)
smoothscale_by(surface, factor, dest_surface=None) -> Surface
Same as smoothscale(), but scales by some factor, rather than taking the new size explicitly. For example, transform.smoothscale_by(surf, 3) will triple the size of the surface in both dimensions. Optionally, the scale factor can be a sequence of two numbers, controlling x and y scaling separately. For example, transform.smoothscale_by(surf, (2, 1)) doubles the image width but keeps the height the same.

New in pygame 2.1.3.


pygame.transform.get_smoothscale_backend()
return smoothscale filter version in use: 'GENERIC', 'MMX', or 'SSE'
get_smoothscale_backend() -> string
Shows whether or not smoothscale is using MMX or SSE acceleration. If no acceleration is available then "GENERIC" is returned. For a x86 processor the level of acceleration to use is determined at runtime.

This function is provided for pygame testing and debugging.


pygame.transform.set_smoothscale_backend()
set smoothscale filter version to one of: 'GENERIC', 'MMX', or 'SSE'
set_smoothscale_backend(backend) -> None
Sets smoothscale acceleration. Takes a string argument. A value of 'GENERIC' turns off acceleration. 'MMX' uses MMX instructions only. 'SSE' allows SSE extensions as well. A value error is raised if type is not recognized or not supported by the current processor.

This function is provided for pygame testing and debugging. If smoothscale causes an invalid instruction error then it is a pygame/SDL bug that should be reported. Use this function as a temporary fix only.


pygame.transform.chop()
gets a copy of an image with an interior area removed
chop(surface, rect) -> Surface
Extracts a portion of an image. All vertical and horizontal pixels surrounding the given rectangle area are removed. The corner areas (diagonal to the rect) are then brought together. (The original image is not altered by this operation.)

NOTE: If you want a "crop" that returns the part of an image within a rect, you can blit with a rect to a new surface or copy a subsurface.


pygame.transform.laplacian()
find edges in a surface
laplacian(surface, dest_surface=None) -> Surface
Finds the edges in a surface using the laplacian algorithm.

New in pygame 1.8.


pygame.transform.average_surfaces()
find the average surface from many surfaces.
average_surfaces(surfaces, dest_surface=None, palette_colors=1) -> Surface
Takes a sequence of surfaces and returns a surface with average colors from each of the surfaces.

palette_colors - if true we average the colors in palette, otherwise we average the pixel values. This is useful if the surface is actually greyscale colors, and not palette colors.

Note, this function currently does not handle palette using surfaces correctly.

New in pygame 1.8.

New in pygame 1.9: palette_colors argument


pygame.transform.average_color()
finds the average color of a surface
average_color(surface, rect=None, consider_alpha=False) -> Color
Finds the average color of a Surface or a region of a surface specified by a Rect, and returns it as a Color. If consider_alpha is set to True, then alpha is taken into account (removing the black artifacts).

New in pygame 2.1.2: consider_alpha argument


pygame.transform.threshold()
finds which, and how many pixels in a surface are within a threshold of a 'search_color' or a 'search_surf'.
threshold(dest_surface, surface, search_color, threshold=(0,0,0,0), set_color=(0,0,0,0), set_behavior=1, search_surf=None, inverse_set=False) -> num_threshold_pixels
This versatile function can be used for find colors in a 'surf' close to a 'search_color' or close to colors in a separate 'search_surf'.

It can also be used to transfer pixels into a 'dest_surf' that match or don't match.

By default it sets pixels in the 'dest_surf' where all of the pixels NOT within the threshold are changed to set_color. If inverse_set is optionally set to True, the pixels that ARE within the threshold are changed to set_color.

If the optional 'search_surf' surface is given, it is used to threshold against rather than the specified 'set_color'. That is, it will find each pixel in the 'surf' that is within the 'threshold' of the pixel at the same coordinates of the 'search_surf'.

Parameters
dest_surf (pygame.Surfacepygame object for representing images or None) -- Surface we are changing. See 'set_behavior'. Should be None if counting (set_behavior is 0).
surf (pygame.Surfacepygame object for representing images) -- Surface we are looking at.
search_color (pygame.Colorpygame object for color representations) -- Color we are searching for.
threshold (pygame.Colorpygame object for color representations) -- Within this distance from search_color (or search_surf). You can use a threshold of (r,g,b,a) where the r,g,b can have different thresholds. So you could use an r threshold of 40 and a blue threshold of 2 if you like.
set_color (pygame.Colorpygame object for color representations or None) -- Color we set in dest_surf.
set_behavior (int) --
set_behavior=1 (default). Pixels in dest_surface will be changed to 'set_color'.
set_behavior=0 we do not change 'dest_surf', just count. Make dest_surf=None.
set_behavior=2 pixels set in 'dest_surf' will be from 'surf'.
search_surf (pygame.Surfacepygame object for representing images or None) --
search_surf=None (default). Search against 'search_color' instead.
search_surf=Surface. Look at the color in 'search_surf' rather than using 'search_color'.
inverse_set (bool) --
False, default. Pixels outside of threshold are changed.
True, Pixels within threshold are changed.
Return type
int
Returns
The number of pixels that are within the 'threshold' in 'surf' compared to either 'search_color' or search_surf.
Examples
See the threshold tests for a full of examples: https://github.com/pygame/pygame/blob/master/test/transform_test.py

    def test_threshold_dest_surf_not_change(self):
        """the pixels within the threshold.

        All pixels not within threshold are changed to set_color.
        So there should be none changed in this test.
        """
        (w, h) = size = (32, 32)
        threshold = (20, 20, 20, 20)
        original_color = (25, 25, 25, 25)
        original_dest_color = (65, 65, 65, 55)
        threshold_color = (10, 10, 10, 10)
        set_color = (255, 10, 10, 10)

        surf = pygame.Surface(size, pygame.SRCALPHA, 32)
        dest_surf = pygame.Surface(size, pygame.SRCALPHA, 32)
        search_surf = pygame.Surface(size, pygame.SRCALPHA, 32)

        surf.fill(original_color)
        search_surf.fill(threshold_color)
        dest_surf.fill(original_dest_color)

        # set_behavior=1, set dest_surface from set_color.
        # all within threshold of third_surface, so no color is set.

        THRESHOLD_BEHAVIOR_FROM_SEARCH_COLOR = 1
        pixels_within_threshold = pygame.transform.threshold(
            dest_surface=dest_surf,
            surface=surf,
            search_color=None,
            threshold=threshold,
            set_color=set_color,
            set_behavior=THRESHOLD_BEHAVIOR_FROM_SEARCH_COLOR,
            search_surf=search_surf,
        )

        # # Return, of pixels within threshold is correct
        self.assertEqual(w * h, pixels_within_threshold)

        # # Size of dest surface is correct
        dest_rect = dest_surf.get_rect()
        dest_size = dest_rect.size
        self.assertEqual(size, dest_size)

        # The color is not the change_color specified for every pixel As all
        # pixels are within threshold

        for pt in test_utils.rect_area_pts(dest_rect):
            self.assertNotEqual(dest_surf.get_at(pt), set_color)
            self.assertEqual(dest_surf.get_at(pt), original_dest_color)
New in pygame 1.8.

Changed in pygame 1.9.4: Fixed a lot of bugs and added keyword arguments. Test your code.


