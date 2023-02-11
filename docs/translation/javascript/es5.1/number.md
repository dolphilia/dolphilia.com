# Number Objects

Number ( [ value ] )

new Number ( [ value ] )

Number.prototype
Number.MAX_VALUE
Number.MIN_VALUE
Number.NaN
Number.NEGATIVE_INFINITY
Number.POSITIVE_INFINITY

Number.prototype.constructor
Number.prototype.toString ( [ radix ] )
Number.prototype.toLocaleString()
Number.prototype.valueOf ( )
Number.prototype.toFixed (fractionDigits)
Number.prototype.toExponential (fractionDigits)
Number.prototype.toPrecision (precision)








15.7.1 The Number Constructor Called as a Function

When Number is called as a function rather than as a constructor, it performs a type conversion.

15.7.1.1 Number ( [ value ] )

Returns a Number value (not a Number object) computed by ToNumber(value) if value was supplied, else returns +0.

15.7.2 The Number Constructor

When Number is called as part of a new expression it is a constructor: it initialises the newly created object.

15.7.2.1 new Number ( [ value ] )

The [[Prototype]] internal property of the newly constructed object is set to the original Number prototype object, the one that is the initial value of Number.prototype (15.7.3.1).

The [[Class]] internal property of the newly constructed object is set to "Number".

The [[PrimitiveValue]] internal property of the newly constructed object is set to ToNumber(value) if value was supplied, else to +0.

The [[Extensible]] internal property of the newly constructed object is set to true.

15.7.3 Properties of the Number Constructor

The value of the [[Prototype]] internal property of the Number constructor is the Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 1), the Number constructor has the following properties:

15.7.3.1 Number.prototype

The initial value of Number.prototype is the Number prototype object (15.7.4).

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.7.3.2 Number.MAX_VALUE

The value of Number.MAX_VALUE is the largest positive finite value of the Number type, which is approximately 1.7976931348623157 × 10308.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.7.3.3 Number.MIN_VALUE

The value of Number.MIN_VALUE is the smallest positive value of the Number type, which is approximately 5 × 10‑324.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.7.3.4 Number.NaN

The value of Number.NaN is NaN.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.7.3.5 Number.NEGATIVE_INFINITY

The value of Number.NEGATIVE_INFINITY is −∞.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.7.3.6 Number.POSITIVE_INFINITY

The value of Number.POSITIVE_INFINITY is +∞.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.7.4 Properties of the Number Prototype Object

The Number prototype object is itself a Number object (its [[Class]] is "Number") whose value is +0.

The value of the [[Prototype]] internal property of the Number prototype object is the standard built-in Object prototype object (15.2.4).

Unless explicitly stated otherwise, the methods of the Number prototype object defined below are not generic and the this value passed to them must be either a Number value or an Object for which the value of the [[Class]] internal property is "Number".

In the following descriptions of functions that are properties of the Number prototype object, the phrase “this Number object” refers to either the object that is the this value for the invocation of the function or, if Type(this value) is Number, an object that is created as if by the expression new Number(this value) where Number is the standard built-in constructor with that name. Also, the phrase “this Number value” refers to either the Number value represented by this Number object, that is, the value of the [[PrimitiveValue]] internal property of this Number object or the this value if its type is Number. A TypeError exception is thrown if the this value is neither an object for which the value of the [[Class]] internal property is "Number" or a value whose type is Number.

15.7.4.1 Number.prototype.constructor

The initial value of Number.prototype.constructor is the built-in Number constructor.

15.7.4.2 Number.prototype.toString ( [ radix ] )

The optional radix should be an integer value in the inclusive range 2 to 36. If radix not present or is undefined the Number 10 is used as the value of radix. If ToInteger(radix) is the Number 10 then this Number value is given as an argument to the ToString abstract operation; the resulting String value is returned.

If ToInteger(radix) is not an integer between 2 and 36 inclusive throw a RangeError exception. If ToInteger(radix) is an integer from 2 to 36, but not 10, the result is a String representation of this Number value using the specified radix. Letters a-z are used for digits with values 10 through 35. The precise algorithm is implementation-dependent if the radix is not 10, however the algorithm should be a generalisation of that specified in 9.8.1.

The toString function is not generic; it throws a TypeError exception if its this value is not a Number or a Number object. Therefore, it cannot be transferred to other kinds of objects for use as a method.

15.7.4.3 Number.prototype.toLocaleString()

Produces a String value that represents this Number value formatted according to the conventions of the host environment’s current locale. This function is implementation-dependent, and it is permissible, but not encouraged, for it to return the same thing as toString.

NOTE The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

15.7.4.4 Number.prototype.valueOf ( )

Returns this Number value.

The valueOf function is not generic; it throws a TypeError exception if its this value is not a Number or a Number object. Therefore, it cannot be transferred to other kinds of objects for use as a method.

15.7.4.5 Number.prototype.toFixed (fractionDigits)

Return a String containing this Number value represented in decimal fixed-point notation with fractionDigits digits after the decimal point. If fractionDigits is undefined, 0 is assumed. Specifically, perform the following steps:

Let f be ToInteger(fractionDigits). (If fractionDigits is undefined, this step produces the value 0).
If f < 0 or f > 20, throw a RangeError exception.
Let x be this Number value.
If x is NaN, return the String "NaN".
Let s be the empty String.
If x < 0, then
Let s be "-".
Let x = –x.
If x ≥ 1021, then
Let m = ToString(x).
Else, x < 1021
Let n be an integer for which the exact mathematical value of n ÷ 10f – x is as close to zero as possible. If there are two such n, pick the larger n.
If n = 0, let m be the String "0". Otherwise, let m be the String consisting of the digits of the decimal representation of n (in order, with no leading zeroes).
If f ≠ 0, then
Let k be the number of characters in m.
If k ≤ f, then
Let z be the String consisting of f+1–k occurrences of the character ‘0’.
Let m be the concatenation of Strings z and m.
Let k = f + 1.
Let a be the first k–f characters of m, and let b be the remaining f characters of m.
Let m be the concatenation of the three Strings a, ".", and b.
Return the concatenation of the Strings s and m.
The length property of the toFixed method is 1.

If the toFixed method is called with more than one argument, then the behaviour is undefined (see clause 15).

An implementation is permitted to extend the behaviour of toFixed for values of fractionDigits less than 0 or greater than 20. In this case toFixed would not necessarily throw RangeError for such values.

NOTE The output of toFixed may be more precise than toString for some values because toString only prints enough significant digits to distinguish the number from adjacent number values. For example,

(1000000000000000128).toString() returns "1000000000000000100",
while (1000000000000000128).toFixed(0) returns "1000000000000000128".

15.7.4.6 Number.prototype.toExponential (fractionDigits)

Return a String containing this Number value represented in decimal exponential notation with one digit before the significand's decimal point and fractionDigits digits after the significand's decimal point. If fractionDigits is undefined, include as many significand digits as necessary to uniquely specify the Number (just like in ToString except that in this case the Number is always output in exponential notation). Specifically, perform the following steps:

Let x be this Number value.
Let f be ToInteger(fractionDigits).
If x is NaN, return the String "NaN".
Let s be the empty String.
If x < 0, then
Let s be "-".
Let x = –x.
If x = +∞, then
Return the concatenation of the Strings s and "Infinity".
If fractionDigits is not undefined and (f < 0 or f > 20), throw a RangeError exception.
If x = 0, then
Let f = 0.
Let m be the String consisting of f+1 occurrences of the character ‘0’.
Let e = 0.
Else, x ≠ 0
If fractionDigits is not undefined, then
Let e and n be integers such that 10f ≤ n < 10f+1 and for which the exact mathematical value of n × 10e–f – x is as close to zero as possible. If there are two such sets of e and n, pick the e and n for which n × 10e–f is larger.
Else, fractionDigits is undefined
Let e, n, and f be integers such that f ≥ 0, 10f ≤ n < 10f+1, the number value for n × 10e–f is x, and f is as small as possible. Note that the decimal representation of n has f+1 digits, n is not divisible by 10, and the least significant digit of n is not necessarily uniquely determined by these criteria.
Let m be the String consisting of the digits of the decimal representation of n (in order, with no leading zeroes).
If f ≠ 0, then
Let a be the first character of m, and let b be the remaining f characters of m.
Let m be the concatenation of the three Strings a, ".", and b.
If e = 0, then
Let c = "+".
Let d = "0".
Else
If e > 0, then let c = "+".
Else, e ≤ 0
Let c = "-".
Let e = –e.
Let d be the String consisting of the digits of the decimal representation of e (in order, with no leading zeroes).
Let m be the concatenation of the four Strings m, "e", c, and d.
Return the concatenation of the Strings s and m.
The length property of the toExponential method is 1.

If the toExponential method is called with more than one argument, then the behaviour is undefined (see clause 15).

An implementation is permitted to extend the behaviour of toExponential for values of fractionDigits less than 0 or greater than 20. In this case toExponential would not necessarily throw RangeError for such values.

NOTE For implementations that provide more accurate conversions than required by the rules above, it is recommended that the following alternative version of step 9.b.i be used as a guideline:

Let e, n, and f be integers such that f ≥ 0, 10f ≤ n < 10f+1, the number value for n × 10e–f is x, and f is as small as possible. If there are multiple possibilities for n, choose the value of n for which n × 10e–f is closest in value to x. If there are two such possible values of n, choose the one that is even.
15.7.4.7 Number.prototype.toPrecision (precision)

Return a String containing this Number value represented either in decimal exponential notation with one digit before the significand's decimal point and precision–1 digits after the significand's decimal point or in decimal fixed notation with precision significant digits. If precision is undefined, call ToString (9.8.1) instead. Specifically, perform the following steps:

Let x be this Number value.
If precision is undefined, return ToString(x).
Let p be ToInteger(precision).
If x is NaN, return the String "NaN".
Let s be the empty String.
If x < 0, then
Let s be "-".
Let x = –x.
If x = +∞, then
Return the concatenation of the Strings s and "Infinity".
If p < 1 or p > 21, throw a RangeError exception.
If x = 0, then
Let m be the String consisting of p occurrences of the character ‘0’.
Let e = 0.
Else x ≠ 0,
Let e and n be integers such that 10p–1 ≤ n < 10p and for which the exact mathematical value of n × 10e–p+1 – x is as close to zero as possible. If there are two such sets of e and n, pick the e and n for which n × 10e–p+1 is larger.
Let m be the String consisting of the digits of the decimal representation of n (in order, with no leading zeroes).
If e < –6 or e ≥ p, then
Let a be the first character of m, and let b be the remaining p–1 characters of m.
Let m be the concatenation of the three Strings a, ".", and b.
If e = 0, then
Let c = "+" and d = "0".
Else e ≠ 0,
If e > 0, then
Let c = "+".
Else e < 0,
Let c = "-".
Let e = –e.
Let d be the String consisting of the digits of the decimal representation of e (in order, with no leading zeroes).
Let m be the concatenation of the five Strings s, m, "e", c, and d.
If e = p–1, then return the concatenation of the Strings s and m.
If e ≥ 0, then
Let m be the concatenation of the first e+1 characters of m, the character ‘.’, and the remaining p– (e+1) characters of m.
Else e < 0,
Let m be the concatenation of the String "0.", –(e+1) occurrences of the character ‘0’, and the String m.
Return the concatenation of the Strings s and m.
The length property of the toPrecision method is 1.

If the toPrecision method is called with more than one argument, then the behaviour is undefined (see clause 15).

An implementation is permitted to extend the behaviour of toPrecision for values of precision less than 1 or greater than 21. In this case toPrecision would not necessarily throw RangeError for such values.

15.7.5 Properties of Number Instances

Number instances inherit properties from the Number prototype object and their [[Class]] internal property value is "Number". Number instances also have a [[PrimitiveValue]] internal property.

The [[PrimitiveValue]] internal property is the Number value represented by this Number object.