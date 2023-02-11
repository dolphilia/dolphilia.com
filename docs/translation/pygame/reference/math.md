# pygame.math

ベクタークラスのための pygame モジュール

|         API         |                   説明                   |
| ------------------- | ---------------------------------------- |
| pygame.math.clamp   | 最小値と最大値にクランプされた値を返す。 |
| pygame.math.Vector2 | 2次元ベクトル                            |
| pygame.math.Vector3 | 3次元ベクトル                            |

The pygame math module currently provides Vector classes in two and three dimensions, Vector2 and Vector3 respectively.

They support the following numerical operations: vec+vec, vec-vec, vec*number, number*vec, vec/number, vec//number, vec+=vec, vec-=vec, vec*=number, vec/=number, vec//=number.

All these operations will be performed elementwise. In addition vec*vec will perform a scalar-product (a.k.a. dot-product). If you want to multiply every element from vector v with every element from vector w you can use the elementwise method: v.elementwise() * w

The coordinates of a vector can be retrieved or set using attributes or subscripts

v = pygame.Vector3()

v.x = 5
v[1] = 2 * v.x
print(v[1]) # 10

v.x == v[0]
v.y == v[1]
v.z == v[2]
Multiple coordinates can be set using slices or swizzling

v = pygame.Vector2()
v.xy = 1, 2
v[:] = 1, 2
New in pygame 1.9.2pre.

Changed in pygame 1.9.4: Removed experimental notice.

Changed in pygame 1.9.4: Allow scalar construction like GLSL Vector2(2) == Vector2(2.0, 2.0)

Changed in pygame 1.9.4: pygame.mathpygame module for vector classes required import. More convenient pygame.Vector2 and pygame.Vector3.

pygame.math.clamp()
returns value clamped to min and max.
clamp(value, min, max) -> float
Clamps a numeric value so that it's no lower than min, and no higher than max.

New in pygame 2.1.3.


pygame.math.Vector2
a 2-Dimensional Vector
Vector2() -> Vector2
Vector2(int) -> Vector2
Vector2(float) -> Vector2
Vector2(Vector2) -> Vector2
Vector2(x, y) -> Vector2
Vector2((x, y)) -> Vector2
pygame.math.Vector2.dot
calculates the dot- or scalar-product with the other vector
pygame.math.Vector2.cross
calculates the cross- or vector-product
pygame.math.Vector2.magnitude
returns the Euclidean magnitude of the vector.
pygame.math.Vector2.magnitude_squared
returns the squared magnitude of the vector.
pygame.math.Vector2.length
returns the Euclidean length of the vector.
pygame.math.Vector2.length_squared
returns the squared Euclidean length of the vector.
pygame.math.Vector2.normalize
returns a vector with the same direction but length 1.
pygame.math.Vector2.normalize_ip
normalizes the vector in place so that its length is 1.
pygame.math.Vector2.is_normalized
tests if the vector is normalized i.e. has length == 1.
pygame.math.Vector2.scale_to_length
scales the vector to a given length.
pygame.math.Vector2.reflect
returns a vector reflected of a given normal.
pygame.math.Vector2.reflect_ip
reflect the vector of a given normal in place.
pygame.math.Vector2.distance_to
calculates the Euclidean distance to a given vector.
pygame.math.Vector2.distance_squared_to
calculates the squared Euclidean distance to a given vector.
pygame.math.Vector2.move_towards
returns a vector moved toward the target by a given distance.
pygame.math.Vector2.move_towards_ip
moves the vector toward its target at a given distance.
pygame.math.Vector2.lerp
returns a linear interpolation to the given vector.
pygame.math.Vector2.slerp
returns a spherical interpolation to the given vector.
pygame.math.Vector2.elementwise
The next operation will be performed elementwise.
pygame.math.Vector2.rotate
rotates a vector by a given angle in degrees.
pygame.math.Vector2.rotate_rad
rotates a vector by a given angle in radians.
pygame.math.Vector2.rotate_ip
rotates the vector by a given angle in degrees in place.
pygame.math.Vector2.rotate_ip_rad
rotates the vector by a given angle in radians in place.
pygame.math.Vector2.rotate_rad_ip
rotates the vector by a given angle in radians in place.
pygame.math.Vector2.angle_to
calculates the angle to a given vector in degrees.
pygame.math.Vector2.as_polar
returns a tuple with radial distance and azimuthal angle.
pygame.math.Vector2.from_polar
Sets x and y from a polar coordinates tuple.
pygame.math.Vector2.project
projects a vector onto another.
pygame.math.Vector2.copy
Returns a copy of itself.
pygame.math.Vector2.clamp_magnitude
Returns a copy of a vector with the magnitude clamped between max_length and min_length.
pygame.math.Vector2.clamp_magnitude_ip
Clamps the vector's magnitude between max_length and min_length
pygame.math.Vector2.update
Sets the coordinates of the vector.
pygame.math.Vector2.epsilon
Determines the tolerance of vector calculations.
Some general information about the Vector2 class.

Changed in pygame 2.1.3: Inherited methods of vector subclasses now correctly return an instance of the subclass instead of the superclass

dot()
calculates the dot- or scalar-product with the other vector
dot(Vector2) -> float

cross()
calculates the cross- or vector-product
cross(Vector2) -> float
calculates the third component of the cross-product.


magnitude()
returns the Euclidean magnitude of the vector.
magnitude() -> float
calculates the magnitude of the vector which follows from the theorem: vec.magnitude() == math.sqrt(vec.x**2 + vec.y**2)


magnitude_squared()
returns the squared magnitude of the vector.
magnitude_squared() -> float
calculates the magnitude of the vector which follows from the theorem: vec.magnitude_squared() == vec.x**2 + vec.y**2. This is faster than vec.magnitude() because it avoids the square root.


length()
returns the Euclidean length of the vector.
length() -> float
calculates the Euclidean length of the vector which follows from the Pythagorean theorem: vec.length() == math.sqrt(vec.x**2 + vec.y**2)


length_squared()
returns the squared Euclidean length of the vector.
length_squared() -> float
calculates the Euclidean length of the vector which follows from the Pythagorean theorem: vec.length_squared() == vec.x**2 + vec.y**2. This is faster than vec.length() because it avoids the square root.


normalize()
returns a vector with the same direction but length 1.
normalize() -> Vector2
Returns a new vector that has length equal to 1 and the same direction as self.


normalize_ip()
normalizes the vector in place so that its length is 1.
normalize_ip() -> None
Normalizes the vector so that it has length equal to 1. The direction of the vector is not changed.


is_normalized()
tests if the vector is normalized i.e. has length == 1.
is_normalized() -> Bool
Returns True if the vector has length equal to 1. Otherwise it returns False.


scale_to_length()
scales the vector to a given length.
scale_to_length(float) -> None
Scales the vector so that it has the given length. The direction of the vector is not changed. You can also scale to length 0. If the vector is the zero vector (i.e. has length 0 thus no direction) a ValueError is raised.


reflect()
returns a vector reflected of a given normal.
reflect(Vector2) -> Vector2
Returns a new vector that points in the direction as if self would bounce of a surface characterized by the given surface normal. The length of the new vector is the same as self's.


reflect_ip()
reflect the vector of a given normal in place.
reflect_ip(Vector2) -> None
Changes the direction of self as if it would have been reflected of a surface with the given surface normal.


distance_to()
calculates the Euclidean distance to a given vector.
distance_to(Vector2) -> float

distance_squared_to()
calculates the squared Euclidean distance to a given vector.
distance_squared_to(Vector2) -> float

move_towards()
returns a vector moved toward the target by a given distance.
move_towards(Vector2, float) -> Vector2
Returns a Vector which is moved towards the given Vector by a given distance and does not overshoot past its target Vector. The first parameter determines the target Vector, while the second parameter determines the delta distance. If the distance is in the negatives, then it will move away from the target Vector.

New in pygame 2.1.3.


move_towards_ip()
moves the vector toward its target at a given distance.
move_towards_ip(Vector2, float) -> None
Moves itself toward the given Vector at a given distance and does not overshoot past its target Vector. The first parameter determines the target Vector, while the second parameter determines the delta distance. If the distance is in the negatives, then it will move away from the target Vector.

New in pygame 2.1.3.


lerp()
returns a linear interpolation to the given vector.
lerp(Vector2, float) -> Vector2
Returns a Vector which is a linear interpolation between self and the given Vector. The second parameter determines how far between self and other the result is going to be. It must be a value between 0 and 1 where 0 means self and 1 means other will be returned.


slerp()
returns a spherical interpolation to the given vector.
slerp(Vector2, float) -> Vector2
Calculates the spherical interpolation from self to the given Vector. The second argument - often called t - must be in the range [-1, 1]. It parametrizes where - in between the two vectors - the result should be. If a negative value is given the interpolation will not take the complement of the shortest path.


elementwise()
The next operation will be performed elementwise.
elementwise() -> VectorElementwiseProxy
Applies the following operation to each element of the vector.


rotate()
rotates a vector by a given angle in degrees.
rotate(angle) -> Vector2
Returns a vector which has the same length as self but is rotated counterclockwise by the given angle in degrees. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_rad()
rotates a vector by a given angle in radians.
rotate_rad(angle) -> Vector2
Returns a vector which has the same length as self but is rotated counterclockwise by the given angle in radians. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.0.0.


rotate_ip()
rotates the vector by a given angle in degrees in place.
rotate_ip(angle) -> None
Rotates the vector counterclockwise by the given angle in degrees. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_ip_rad()
rotates the vector by a given angle in radians in place.
rotate_ip_rad(angle) -> None
DEPRECATED: Use rotate_rad_ip() instead.

New in pygame 2.0.0.

Deprecated since pygame 2.1.1.


rotate_rad_ip()
rotates the vector by a given angle in radians in place.
rotate_rad_ip(angle) -> None
Rotates the vector counterclockwise by the given angle in radians. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.1.1.


angle_to()
calculates the angle to a given vector in degrees.
angle_to(Vector2) -> float
Returns the angle from self to the passed Vector2 that would rotate self to be aligned with the passed Vector2 without crossing over the negative x-axis.

angle_to image
Example demonstrating the angle returned


as_polar()
returns a tuple with radial distance and azimuthal angle.
as_polar() -> (r, phi)
Returns a tuple (r, phi) where r is the radial distance, and phi is the azimuthal angle.


from_polar()
Sets x and y from a polar coordinates tuple.
from_polar((r, phi)) -> None
Sets x and y from a tuple (r, phi) where r is the radial distance, and phi is the azimuthal angle.


project()
projects a vector onto another.
project(Vector2) -> Vector2
Returns the projected vector. This is useful for collision detection in finding the components in a certain direction (e.g. in direction of the wall). For a more detailed explanation see Wikipedia.

New in pygame 2.0.2.


copy()
Returns a copy of itself.
copy() -> Vector2
Returns a new Vector2 having the same dimensions.

New in pygame 2.1.1.


clamp_magnitude()
Returns a copy of a vector with the magnitude clamped between max_length and min_length.
clamp_magnitude(max_length) -> Vector2
clamp_magnitude(min_length, max_length) -> Vector2
PLEASE NOTE: This method is considered experimental for now and is subject to potential changes in future versions.

Returns a new copy of a vector with the magnitude clamped between max_length and min_length. If only one argument is passed, it is taken to be the max_length

This function raises ValueError if min_length is greater than max_length, or if either of these values are negative.

New in pygame 2.1.3.


clamp_magnitude_ip()
Clamps the vector's magnitude between max_length and min_length
clamp_magnitude_ip(max_length) -> None
clamp_magnitude_ip(min_length, max_length) -> None
PLEASE NOTE: This method is considered experimental for now and is subject to potential changes in future versions.

Clamps the vector's magnitude between max_length and min_length. If only one argument is passed, it is taken to be the max_length

This function raises ValueError if min_length is greater than max_length, or if either of these values are negative.

New in pygame 2.1.3.


update()
Sets the coordinates of the vector.
update() -> None
update(int) -> None
update(float) -> None
update(Vector2) -> None
update(x, y) -> None
update((x, y)) -> None
Sets coordinates x and y in place.

New in pygame 1.9.5.


epsilon
Determines the tolerance of vector calculations.
Both Vector classes have a value named epsilon that defaults to 1e-6. This value acts as a numerical margin in various methods to account for floating point arithmetic errors. Specifically, epsilon is used in the following places:

comparing Vectors (== and !=)
the is_normalized method (if the square of the length is within epsilon of 1, it's normalized)
slerping (a Vector with a length of <epsilon is considered a zero vector, and can't slerp with that)
reflection (can't reflect over the zero vector)
projection (can't project onto the zero vector)
rotation (only used when rotating by a multiple of 90 degrees)
While it's possible to change epsilon for a specific instance of a Vector, all the other Vectors will retain the default value. Changing epsilon on a specific instance however could lead to some asymmetric behavior where symmetry would be expected, such as

u = pygame.Vector2(0, 1)
v = pygame.Vector2(0, 1.2)
u.epsilon = 0.5 # don't set it nearly this large

print(u == v) # >> True
print(v == u) # >> False
You'll probably never have to change epsilon from the default value, but in rare situations you might find that either the margin is too large or too small, in which case changing epsilon slightly might help you out.



pygame.math.Vector3
a 3-Dimensional Vector
Vector3() -> Vector3
Vector3(int) -> Vector3
Vector3(float) -> Vector3
Vector3(Vector3) -> Vector3
Vector3(x, y, z) -> Vector3
Vector3((x, y, z)) -> Vector3
pygame.math.Vector3.dot
calculates the dot- or scalar-product with the other vector
pygame.math.Vector3.cross
calculates the cross- or vector-product
pygame.math.Vector3.magnitude
returns the Euclidean magnitude of the vector.
pygame.math.Vector3.magnitude_squared
returns the squared Euclidean magnitude of the vector.
pygame.math.Vector3.length
returns the Euclidean length of the vector.
pygame.math.Vector3.length_squared
returns the squared Euclidean length of the vector.
pygame.math.Vector3.normalize
returns a vector with the same direction but length 1.
pygame.math.Vector3.normalize_ip
normalizes the vector in place so that its length is 1.
pygame.math.Vector3.is_normalized
tests if the vector is normalized i.e. has length == 1.
pygame.math.Vector3.scale_to_length
scales the vector to a given length.
pygame.math.Vector3.reflect
returns a vector reflected of a given normal.
pygame.math.Vector3.reflect_ip
reflect the vector of a given normal in place.
pygame.math.Vector3.distance_to
calculates the Euclidean distance to a given vector.
pygame.math.Vector3.distance_squared_to
calculates the squared Euclidean distance to a given vector.
pygame.math.Vector3.move_towards
returns a vector moved toward the target by a given distance.
pygame.math.Vector3.move_towards_ip
moves the vector toward its target at a given distance.
pygame.math.Vector3.lerp
returns a linear interpolation to the given vector.
pygame.math.Vector3.slerp
returns a spherical interpolation to the given vector.
pygame.math.Vector3.elementwise
The next operation will be performed elementwise.
pygame.math.Vector3.rotate
rotates a vector by a given angle in degrees.
pygame.math.Vector3.rotate_rad
rotates a vector by a given angle in radians.
pygame.math.Vector3.rotate_ip
rotates the vector by a given angle in degrees in place.
pygame.math.Vector3.rotate_ip_rad
rotates the vector by a given angle in radians in place.
pygame.math.Vector3.rotate_rad_ip
rotates the vector by a given angle in radians in place.
pygame.math.Vector3.rotate_x
rotates a vector around the x-axis by the angle in degrees.
pygame.math.Vector3.rotate_x_rad
rotates a vector around the x-axis by the angle in radians.
pygame.math.Vector3.rotate_x_ip
rotates the vector around the x-axis by the angle in degrees in place.
pygame.math.Vector3.rotate_x_ip_rad
rotates the vector around the x-axis by the angle in radians in place.
pygame.math.Vector3.rotate_x_rad_ip
rotates the vector around the x-axis by the angle in radians in place.
pygame.math.Vector3.rotate_y
rotates a vector around the y-axis by the angle in degrees.
pygame.math.Vector3.rotate_y_rad
rotates a vector around the y-axis by the angle in radians.
pygame.math.Vector3.rotate_y_ip
rotates the vector around the y-axis by the angle in degrees in place.
pygame.math.Vector3.rotate_y_ip_rad
rotates the vector around the y-axis by the angle in radians in place.
pygame.math.Vector3.rotate_y_rad_ip
rotates the vector around the y-axis by the angle in radians in place.
pygame.math.Vector3.rotate_z
rotates a vector around the z-axis by the angle in degrees.
pygame.math.Vector3.rotate_z_rad
rotates a vector around the z-axis by the angle in radians.
pygame.math.Vector3.rotate_z_ip
rotates the vector around the z-axis by the angle in degrees in place.
pygame.math.Vector3.rotate_z_ip_rad
rotates the vector around the z-axis by the angle in radians in place.
pygame.math.Vector3.rotate_z_rad_ip
rotates the vector around the z-axis by the angle in radians in place.
pygame.math.Vector3.angle_to
calculates the angle to a given vector in degrees.
pygame.math.Vector3.as_spherical
returns a tuple with radial distance, inclination and azimuthal angle.
pygame.math.Vector3.from_spherical
Sets x, y and z from a spherical coordinates 3-tuple.
pygame.math.Vector3.project
projects a vector onto another.
pygame.math.Vector3.copy
Returns a copy of itself.
pygame.math.Vector3.clamp_magnitude
Returns a copy of a vector with the magnitude clamped between max_length and min_length.
pygame.math.Vector3.clamp_magnitude_ip
Clamps the vector's magnitude between max_length and min_length
pygame.math.Vector3.update
Sets the coordinates of the vector.
pygame.math.Vector3.epsilon
Determines the tolerance of vector calculations.
Some general information about the Vector3 class.

Changed in pygame 2.1.3: Inherited methods of vector subclasses now correctly return an instance of the subclass instead of the superclass

dot()
calculates the dot- or scalar-product with the other vector
dot(Vector3) -> float

cross()
calculates the cross- or vector-product
cross(Vector3) -> Vector3
calculates the cross-product.


magnitude()
returns the Euclidean magnitude of the vector.
magnitude() -> float
calculates the magnitude of the vector which follows from the theorem: vec.magnitude() == math.sqrt(vec.x**2 + vec.y**2 + vec.z**2)


magnitude_squared()
returns the squared Euclidean magnitude of the vector.
magnitude_squared() -> float
calculates the magnitude of the vector which follows from the theorem: vec.magnitude_squared() == vec.x**2 + vec.y**2 + vec.z**2. This is faster than vec.magnitude() because it avoids the square root.


length()
returns the Euclidean length of the vector.
length() -> float
calculates the Euclidean length of the vector which follows from the Pythagorean theorem: vec.length() == math.sqrt(vec.x**2 + vec.y**2 + vec.z**2)


length_squared()
returns the squared Euclidean length of the vector.
length_squared() -> float
calculates the Euclidean length of the vector which follows from the Pythagorean theorem: vec.length_squared() == vec.x**2 + vec.y**2 + vec.z**2. This is faster than vec.length() because it avoids the square root.


normalize()
returns a vector with the same direction but length 1.
normalize() -> Vector3
Returns a new vector that has length equal to 1 and the same direction as self.


normalize_ip()
normalizes the vector in place so that its length is 1.
normalize_ip() -> None
Normalizes the vector so that it has length equal to 1. The direction of the vector is not changed.


is_normalized()
tests if the vector is normalized i.e. has length == 1.
is_normalized() -> Bool
Returns True if the vector has length equal to 1. Otherwise it returns False.


scale_to_length()
scales the vector to a given length.
scale_to_length(float) -> None
Scales the vector so that it has the given length. The direction of the vector is not changed. You can also scale to length 0. If the vector is the zero vector (i.e. has length 0 thus no direction) a ValueError is raised.


reflect()
returns a vector reflected of a given normal.
reflect(Vector3) -> Vector3
Returns a new vector that points in the direction as if self would bounce of a surface characterized by the given surface normal. The length of the new vector is the same as self's.


reflect_ip()
reflect the vector of a given normal in place.
reflect_ip(Vector3) -> None
Changes the direction of self as if it would have been reflected of a surface with the given surface normal.


distance_to()
calculates the Euclidean distance to a given vector.
distance_to(Vector3) -> float

distance_squared_to()
calculates the squared Euclidean distance to a given vector.
distance_squared_to(Vector3) -> float

move_towards()
returns a vector moved toward the target by a given distance.
move_towards(Vector3, float) -> Vector3
Returns a Vector which is moved towards the given Vector by a given distance and does not overshoot past its target Vector. The first parameter determines the target Vector, while the second parameter determines the delta distance. If the distance is in the negatives, then it will move away from the target Vector.

New in pygame 2.1.3.


move_towards_ip()
moves the vector toward its target at a given distance.
move_towards_ip(Vector3, float) -> None
Moves itself toward the given Vector at a given distance and does not overshoot past its target Vector. The first parameter determines the target Vector, while the second parameter determines the delta distance. If the distance is in the negatives, then it will move away from the target Vector.

New in pygame 2.1.3.


lerp()
returns a linear interpolation to the given vector.
lerp(Vector3, float) -> Vector3
Returns a Vector which is a linear interpolation between self and the given Vector. The second parameter determines how far between self an other the result is going to be. It must be a value between 0 and 1, where 0 means self and 1 means other will be returned.


slerp()
returns a spherical interpolation to the given vector.
slerp(Vector3, float) -> Vector3
Calculates the spherical interpolation from self to the given Vector. The second argument - often called t - must be in the range [-1, 1]. It parametrizes where - in between the two vectors - the result should be. If a negative value is given the interpolation will not take the complement of the shortest path.


elementwise()
The next operation will be performed elementwise.
elementwise() -> VectorElementwiseProxy
Applies the following operation to each element of the vector.


rotate()
rotates a vector by a given angle in degrees.
rotate(angle, Vector3) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise by the given angle in degrees around the given axis. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_rad()
rotates a vector by a given angle in radians.
rotate_rad(angle, Vector3) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise by the given angle in radians around the given axis. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.0.0.


rotate_ip()
rotates the vector by a given angle in degrees in place.
rotate_ip(angle, Vector3) -> None
Rotates the vector counterclockwise around the given axis by the given angle in degrees. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_ip_rad()
rotates the vector by a given angle in radians in place.
rotate_ip_rad(angle, Vector3) -> None
DEPRECATED: Use rotate_rad_ip() instead.

New in pygame 2.0.0.

Deprecated since pygame 2.1.1.


rotate_rad_ip()
rotates the vector by a given angle in radians in place.
rotate_rad_ip(angle, Vector3) -> None
Rotates the vector counterclockwise around the given axis by the given angle in radians. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.1.1.


rotate_x()
rotates a vector around the x-axis by the angle in degrees.
rotate_x(angle) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise around the x-axis by the given angle in degrees. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_x_rad()
rotates a vector around the x-axis by the angle in radians.
rotate_x_rad(angle) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise around the x-axis by the given angle in radians. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.0.0.


rotate_x_ip()
rotates the vector around the x-axis by the angle in degrees in place.
rotate_x_ip(angle) -> None
Rotates the vector counterclockwise around the x-axis by the given angle in degrees. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_x_ip_rad()
rotates the vector around the x-axis by the angle in radians in place.
rotate_x_ip_rad(angle) -> None
DEPRECATED: Use rotate_x_rad_ip() instead.

New in pygame 2.0.0.

Deprecated since pygame 2.1.1.


rotate_x_rad_ip()
rotates the vector around the x-axis by the angle in radians in place.
rotate_x_rad_ip(angle) -> None
Rotates the vector counterclockwise around the x-axis by the given angle in radians. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.1.1.


rotate_y()
rotates a vector around the y-axis by the angle in degrees.
rotate_y(angle) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise around the y-axis by the given angle in degrees. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_y_rad()
rotates a vector around the y-axis by the angle in radians.
rotate_y_rad(angle) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise around the y-axis by the given angle in radians. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.0.0.


rotate_y_ip()
rotates the vector around the y-axis by the angle in degrees in place.
rotate_y_ip(angle) -> None
Rotates the vector counterclockwise around the y-axis by the given angle in degrees. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_y_ip_rad()
rotates the vector around the y-axis by the angle in radians in place.
rotate_y_ip_rad(angle) -> None
DEPRECATED: Use rotate_y_rad_ip() instead.

New in pygame 2.0.0.

Deprecated since pygame 2.1.1.


rotate_y_rad_ip()
rotates the vector around the y-axis by the angle in radians in place.
rotate_y_rad_ip(angle) -> None
Rotates the vector counterclockwise around the y-axis by the given angle in radians. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.1.1.


rotate_z()
rotates a vector around the z-axis by the angle in degrees.
rotate_z(angle) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise around the z-axis by the given angle in degrees. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_z_rad()
rotates a vector around the z-axis by the angle in radians.
rotate_z_rad(angle) -> Vector3
Returns a vector which has the same length as self but is rotated counterclockwise around the z-axis by the given angle in radians. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.0.0.


rotate_z_ip()
rotates the vector around the z-axis by the angle in degrees in place.
rotate_z_ip(angle) -> None
Rotates the vector counterclockwise around the z-axis by the given angle in degrees. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).


rotate_z_ip_rad()
rotates the vector around the z-axis by the angle in radians in place.
rotate_z_ip_rad(angle) -> None
DEPRECATED: Use rotate_z_rad_ip() instead.

Deprecated since pygame 2.1.1.


rotate_z_rad_ip()
rotates the vector around the z-axis by the angle in radians in place.
rotate_z_rad_ip(angle) -> None
Rotates the vector counterclockwise around the z-axis by the given angle in radians. The length of the vector is not changed. (Note that due to pygame's inverted y coordinate system, the rotation will look clockwise if displayed).

New in pygame 2.1.1.


angle_to()
calculates the angle to a given vector in degrees.
angle_to(Vector3) -> float
Returns the angle between self and the given vector.


as_spherical()
returns a tuple with radial distance, inclination and azimuthal angle.
as_spherical() -> (r, theta, phi)
Returns a tuple (r, theta, phi) where r is the radial distance, theta is the inclination angle and phi is the azimuthal angle.


from_spherical()
Sets x, y and z from a spherical coordinates 3-tuple.
from_spherical((r, theta, phi)) -> None
Sets x, y and z from a tuple (r, theta, phi) where r is the radial distance, theta is the inclination angle and phi is the azimuthal angle.


project()
projects a vector onto another.
project(Vector3) -> Vector3
Returns the projected vector. This is useful for collision detection in finding the components in a certain direction (e.g. in direction of the wall). For a more detailed explanation see Wikipedia.

New in pygame 2.0.2.


copy()
Returns a copy of itself.
copy() -> Vector3
Returns a new Vector3 having the same dimensions.

New in pygame 2.1.1.


clamp_magnitude()
Returns a copy of a vector with the magnitude clamped between max_length and min_length.
clamp_magnitude(max_length) -> Vector3
clamp_magnitude(min_length, max_length) -> Vector3
PLEASE NOTE: This method is considered experimental for now and is subject to potential changes in future versions.

Returns a new copy of a vector with the magnitude clamped between max_length and min_length. If only one argument is passed, it is taken to be the max_length

This function raises ValueError if min_length is greater than max_length, or if either of these values are negative.

New in pygame 2.1.3.


clamp_magnitude_ip()
Clamps the vector's magnitude between max_length and min_length
clamp_magnitude_ip(max_length) -> None
clamp_magnitude_ip(min_length, max_length) -> None
PLEASE NOTE: This method is considered experimental for now and is subject to potential changes in future versions.

Clamps the vector's magnitude between max_length and min_length. If only one argument is passed, it is taken to be the max_length

This function raises ValueError if min_length is greater than max_length, or if either of these values are negative.

New in pygame 2.1.3.


update()
Sets the coordinates of the vector.
update() -> None
update(int) -> None
update(float) -> None
update(Vector3) -> None
update(x, y, z) -> None
update((x, y, z)) -> None
Sets coordinates x, y, and z in place.

New in pygame 1.9.5.


epsilon
Determines the tolerance of vector calculations.
With lengths within this number, vectors are considered equal. For more information see pygame.math.Vector2.epsilonDetermines the tolerance of vector calculations.



