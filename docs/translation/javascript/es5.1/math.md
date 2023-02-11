# Math

E
LN10
LN2
LOG2E
LOG10E
PI
SQRT1_2
SQRT2

abs (x)
acos (x)
asin (x)
atan (x)
atan2 (y, x)
ceil (x)
cos (x)
exp (x)
floor (x)
log (x)
max ( [ value1 [ , value2 [ , … ] ] ] )
min ( [ value1 [ , value2 [ , … ] ] ] )
pow (x, y)
random ( )
round (x)
sin (x)
sqrt (x)
tan (x)





The Math object is a single object that has some named properties, some of which are functions.

The value of the [[Prototype]] internal property of the Math object is the standard built-in Object prototype object (15.2.4). The value of the [[Class]] internal property of the Math object is "Math".

The Math object does not have a [[Construct]] internal property; it is not possible to use the Math object as a constructor with the new operator.

The Math object does not have a [[Call]] internal property; it is not possible to invoke the Math object as a function.

NOTE In this specification, the phrase “the Number value for x” has a technical meaning defined in 8.5.

15.8.1 Value Properties of the Math Object

15.8.1.1 E

The Number value for e, the base of the natural logarithms, which is approximately 2.7182818284590452354.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.8.1.2 LN10

The Number value for the natural logarithm of 10, which is approximately 2.302585092994046.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.8.1.3 LN2

The Number value for the natural logarithm of 2, which is approximately 0.6931471805599453.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.8.1.4 LOG2E

The Number value for the base-2 logarithm of e, the base of the natural logarithms; this value is approximately 1.4426950408889634.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

NOTE The value of Math.LOG2E is approximately the reciprocal of the value of Math.LN2.

15.8.1.5 LOG10E

The Number value for the base-10 logarithm of e, the base of the natural logarithms; this value is approximately 0.4342944819032518.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

NOTE The value of Math.LOG10E is approximately the reciprocal of the value of Math.LN10.

15.8.1.6 PI

The Number value for π, the ratio of the circumference of a circle to its diameter, which is approximately 3.1415926535897932.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.8.1.7 SQRT1_2

The Number value for the square root of ½, which is approximately 0.7071067811865476.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

NOTE The value of Math.SQRT1_2 is approximately the reciprocal of the value of Math.SQRT2.

15.8.1.8 SQRT2

The Number value for the square root of 2, which is approximately 1.4142135623730951.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.8.2 Function Properties of the Math Object

Each of the following Math object functions applies the ToNumber abstract operator to each of its arguments (in left-to-right order if there is more than one) and then performs a computation on the resulting Number value(s).

In the function descriptions below, the symbols NaN, −0, +0, −∞ and +∞ refer to the Number values described in 8.5.

NOTE The behaviour of the functions acos, asin, atan, atan2, cos, exp, log, pow, sin, sqrt, and tan is not precisely specified here except to require specific results for certain argument values that represent boundary cases of interest. For other argument values, these functions are intended to compute approximations to the results of familiar mathematical functions, but some latitude is allowed in the choice of approximation algorithms. The general intent is that an implementer should be able to use the same mathematical library for ECMAScript on a given hardware platform that is available to C programmers on that platform.

Although the choice of algorithms is left to the implementation, it is recommended (but not specified by this standard) that implementations use the approximation algorithms for IEEE 754 arithmetic contained in fdlibm, the freely distributable mathematical library from Sun Microsystems (http://www.netlib.org/fdlibm).

15.8.2.1 abs (x)

Returns the absolute value of x; the result has the same magnitude as x but has positive sign.

If x is NaN, the result is NaN.
If x is −0, the result is +0.
If x is −∞, the result is +∞.
15.8.2.2 acos (x)

Returns an implementation-dependent approximation to the arc cosine of x. The result is expressed in radians and ranges from +0 to +π.

If x is NaN, the result is NaN.
If x is greater than 1, the result is NaN.
If x is less than −1, the result is NaN.
If x is exactly 1, the result is +0.
15.8.2.3 asin (x)

Returns an implementation-dependent approximation to the arc sine of x. The result is expressed in radians and ranges from −π/2 to +π/2.

If x is NaN, the result is NaN.
If x is greater than 1, the result is NaN.
If x is less than –1, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
15.8.2.4 atan (x)

Returns an implementation-dependent approximation to the arc tangent of x. The result is expressed in radians and ranges from −π/2 to +π/2.

If x is NaN, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
If x is +∞, the result is an implementation-dependent approximation to +π/2.
If x is −∞, the result is an implementation-dependent approximation to −π/2.
15.8.2.5 atan2 (y, x)

Returns an implementation-dependent approximation to the arc tangent of the quotient y/x of the arguments y and x, where the signs of y and x are used to determine the quadrant of the result. Note that it is intentional and traditional for the two-argument arc tangent function that the argument named y be first and the argument named x be second. The result is expressed in radians and ranges from −π to +π.

If either x or y is NaN, the result is NaN.
If y>0 and x is +0, the result is an implementation-dependent approximation to +π/2.
If y>0 and x is −0, the result is an implementation-dependent approximation to +π/2.
If y is +0 and x>0, the result is +0.
If y is +0 and x is +0, the result is +0.
If y is +0 and x is −0, the result is an implementation-dependent approximation to +π.
If y is +0 and x<0, the result is an implementation-dependent approximation to +π.
If y is −0 and x>0, the result is −0.
If y is −0 and x is +0, the result is −0.
If y is −0 and x is −0, the result is an implementation-dependent approximation to −π.
If y is −0 and x<0, the result is an implementation-dependent approximation to −π.
If y<0 and x is +0, the result is an implementation-dependent approximation to −π/2.
If y<0 and x is −0, the result is an implementation-dependent approximation to −π/2.
If y>0 and y is finite and x is +∞, the result is +0.
If y>0 and y is finite and x is −∞, the result if an implementation-dependent approximation to +π.
If y<0 and y is finite and x is +∞, the result is −0.
If y<0 and y is finite and x is −∞, the result is an implementation-dependent approximation to −π.
If y is +∞ and x is finite, the result is an implementation-dependent approximation to +π/2.
If y is −∞ and x is finite, the result is an implementation-dependent approximation to −π/2.
If y is +∞ and x is +∞, the result is an implementation-dependent approximation to +π/4.
If y is +∞ and x is −∞, the result is an implementation-dependent approximation to +3π/4.
If y is −∞ and x is +∞, the result is an implementation-dependent approximation to −π/4.
If y is −∞ and x is −∞, the result is an implementation-dependent approximation to −3π/4.
15.8.2.6 ceil (x)

Returns the smallest (closest to −∞) Number value that is not less than x and is equal to a mathematical integer. If x is already an integer, the result is x.

If x is NaN, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
If x is +∞, the result is +∞.
If x is −∞, the result is −∞.
If x is less than 0 but greater than -1, the result is −0.
The value of Math.ceil(x) is the same as the value of -Math.floor(-x).

15.8.2.7 cos (x)

Returns an implementation-dependent approximation to the cosine of x. The argument is expressed in radians.

If x is NaN, the result is NaN.
If x is +0, the result is 1.
If x is −0, the result is 1.
If x is +∞, the result is NaN.
If x is −∞, the result is NaN.
15.8.2.8 exp (x)

Returns an implementation-dependent approximation to the exponential function of x (e raised to the power of x, where e is the base of the natural logarithms).

If x is NaN, the result is NaN.
If x is +0, the result is 1.
If x is −0, the result is 1.
If x is +∞, the result is +∞.
If x is −∞, the result is +0.
15.8.2.9 floor (x)

Returns the greatest (closest to +∞) Number value that is not greater than x and is equal to a mathematical integer. If x is already an integer, the result is x.

If x is NaN, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
If x is +∞, the result is +∞.
If x is −∞, the result is −∞.
If x is greater than 0 but less than 1, the result is +0.
NOTE The value of Math.floor(x) is the same as the value of -Math.ceil(-x).

15.8.2.10 log (x)

Returns an implementation-dependent approximation to the natural logarithm of x.
If x is NaN, the result is NaN.
If x is less than 0, the result is NaN.
If x is +0 or −0, the result is −∞.
If x is 1, the result is +0.
If x is +∞, the result is +∞.
15.8.2.11 max ( [ value1 [ , value2 [ , … ] ] ] )

Given zero or more arguments, calls ToNumber on each of the arguments and returns the largest of the resulting values.

If no arguments are given, the result is −∞.
If any value is NaN, the result is NaN.
The comparison of values to determine the largest value is done as in 11.8.5 except that +0 is considered to be larger than −0.
The length property of the max method is 2.

15.8.2.12 min ( [ value1 [ , value2 [ , … ] ] ] )

Given zero or more arguments, calls ToNumber on each of the arguments and returns the smallest of the resulting values.

If no arguments are given, the result is +∞.
If any value is NaN, the result is NaN.
The comparison of values to determine the smallest value is done as in 11.8.5 except that +0 is considered to be larger than −0.
The length property of the min method is 2.

15.8.2.13 pow (x, y)

Returns an implementation-dependent approximation to the result of raising x to the power y.

If y is NaN, the result is NaN.
If y is +0, the result is 1, even if x is NaN.
If y is −0, the result is 1, even if x is NaN.
If x is NaN and y is nonzero, the result is NaN.
If abs(x)>1 and y is +∞, the result is +∞.
If abs(x)>1 and y is −∞, the result is +0.
If abs(x)==1 and y is +∞, the result is NaN.
If abs(x)==1 and y is −∞, the result is NaN.
If abs(x)<1 and y is +∞, the result is +0.
If abs(x)<1 and y is −∞, the result is +∞.
If x is +∞ and y>0, the result is +∞.
If x is +∞ and y<0, the result is +0.
If x is −∞ and y>0 and y is an odd integer, the result is −∞.
If x is −∞ and y>0 and y is not an odd integer, the result is +∞.
If x is −∞ and y<0 and y is an odd integer, the result is −0.
If x is −∞ and y<0 and y is not an odd integer, the result is +0.
If x is +0 and y>0, the result is +0.
If x is +0 and y<0, the result is +∞.
If x is −0 and y>0 and y is an odd integer, the result is −0.
If x is −0 and y>0 and y is not an odd integer, the result is +0.
If x is −0 and y<0 and y is an odd integer, the result is −∞.
If x is −0 and y<0 and y is not an odd integer, the result is +∞.
If x<0 and x is finite and y is finite and y is not an integer, the result is NaN.
15.8.2.14 random ( )

Returns a Number value with positive sign, greater than or equal to 0 but less than 1, chosen randomly or pseudo randomly with approximately uniform distribution over that range, using an implementation-dependent algorithm or strategy. This function takes no arguments.

15.8.2.15 round (x)

Returns the Number value that is closest to x and is equal to a mathematical integer. If two integer Number values are equally close to x, then the result is the Number value that is closer to +∞. If x is already an integer, the result is x.

If x is NaN, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
If x is +∞, the result is +∞.
If x is −∞, the result is −∞.
If x is greater than 0 but less than 0.5, the result is +0.
If x is less than 0 but greater than or equal to -0.5, the result is −0.
NOTE 1Math.round(3.5) returns 4, but Math.round(–3.5) returns –3.

NOTE 2 The value of Math.round(x) is the same as the value of Math.floor(x+0.5), except when x is −0 or is less than 0 but greater than or equal to -0.5; for these cases Math.round(x) returns −0, but Math.floor(x+0.5) returns +0.

15.8.2.16 sin (x)

Returns an implementation-dependent approximation to the sine of x. The argument is expressed in radians.

If x is NaN, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
If x is +∞ or −∞, the result is NaN.
15.8.2.17 sqrt (x)

Returns an implementation-dependent approximation to the square root of x.

If x is NaN, the result is NaN.
If x is less than 0, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
If x is +∞, the result is +∞.
15.8.2.18 tan (x)

Returns an implementation-dependent approximation to the tangent of x. The argument is expressed in radians.

If x is NaN, the result is NaN.
If x is +0, the result is +0.
If x is −0, the result is −0.
If x is +∞ or −∞, the result is NaN.