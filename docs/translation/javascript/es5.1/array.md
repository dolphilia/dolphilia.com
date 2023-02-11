
# Array


Array ( [ item1 [ , item2 [ , … ] ] ] )

new Array ( [ item0 [ , item1 [ , … ] ] ] )
new Array (len)

Array.prototype
Array.isArray ( arg )

Array.prototype.constructor
Array.prototype.toString ( )
Array.prototype.toLocaleString ( )
Array.prototype.concat ( [ item1 [ , item2 [ , … ] ] ] )
Array.prototype.join (separator)
Array.prototype.pop ( )
Array.prototype.push ( [ item1 [ , item2 [ , … ] ] ] )
Array.prototype.reverse ( )
Array.prototype.shift ( )
Array.prototype.slice (start, end)
Array.prototype.sort (comparefn)
Array.prototype.splice (start, deleteCount [ , item1 [ , item2 [ , … ] ] ] )
Array.prototype.unshift ( [ item1 [ , item2 [ , … ] ] ] )
Array.prototype.indexOf ( searchElement [ , fromIndex ] )
Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
Array.prototype.every ( callbackfn [ , thisArg ] )
Array.prototype.some ( callbackfn [ , thisArg ] )
Array.prototype.forEach ( callbackfn [ , thisArg ] )
Array.prototype.map ( callbackfn [ , thisArg ] )
Array.prototype.filter ( callbackfn [ , thisArg ] )
Array.prototype.reduce ( callbackfn [ , initialValue ] )
Array.prototype.reduceRight ( callbackfn [ , initialValue ] )

配列インスタンスのプロパティ
[[DefineOwnProperty]] ( P, Desc, Throw )
length





Array objects give special treatment to a certain class of property names. A property name P (in the form of a String value) is an array index if and only if ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal to 232−1. A property whose property name is an array index is also called an element. Every Array object has a length property whose value is always a nonnegative integer less than 232. The value of the length property is numerically greater than the name of every property whose name is an array index; whenever a property of an Array object is created or changed, other properties are adjusted as necessary to maintain this invariant. Specifically, whenever a property is added whose name is an array index, the length property is changed, if necessary, to be one more than the numeric value of that array index; and whenever the length property is changed, every property whose name is an array index whose value is not smaller than the new length is automatically deleted. This constraint applies only to own properties of an Array object and is unaffected by length or array index properties that may be inherited from its prototypes.

An object, O, is said to be sparse if the following algorithm returns true:

Let len be the result of calling the [[Get]] internal method of O with argument "length".
For each integer i in the range 0≤i<ToUint32(len)
Let elem be the result of calling the [[GetOwnProperty]] internal method of O with argument ToString(i).
If elem is undefined, return true.
Return false.
15.4.1 The Array Constructor Called as a Function

When Array is called as a function rather than as a constructor, it creates and initialises a new Array object. Thus the function call Array(…) is equivalent to the object creation expression new Array(…) with the same arguments.

15.4.1.1 Array ( [ item1 [ , item2 [ , … ] ] ] )

When the Array function is called the following steps are taken:

Create and return a new Array object exactly as if the standard built-in constructor Array was used in a new expression with the same arguments (15.4.2).
15.4.2 The Array Constructor

When Array is called as part of a new expression, it is a constructor: it initialises the newly created object.

15.4.2.1 new Array ( [ item0 [ , item1 [ , … ] ] ] )

This description applies if and only if the Array constructor is given no arguments or at least two arguments.

The [[Prototype]] internal property of the newly constructed object is set to the original Array prototype object, the one that is the initial value of Array.prototype (15.4.3.1).

The [[Class]] internal property of the newly constructed object is set to "Array".

The [[Extensible]] internal property of the newly constructed object is set to true.

The length property of the newly constructed object is set to the number of arguments.

The 0 property of the newly constructed object is set to item0 (if supplied); the 1 property of the newly constructed object is set to item1 (if supplied); and, in general, for as many arguments as there are, the k property of the newly constructed object is set to argument k, where the first argument is considered to be argument number 0. These properties all have the attributes {[[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}.

15.4.2.2 new Array (len)

The [[Prototype]] internal property of the newly constructed object is set to the original Array prototype object, the one that is the initial value of Array.prototype (15.4.3.1). The [[Class]] internal property of the newly constructed object is set to "Array". The [[Extensible]] internal property of the newly constructed object is set to true.

If the argument len is a Number and ToUint32(len) is equal to len, then the length property of the newly constructed object is set to ToUint32(len). If the argument len is a Number and ToUint32(len) is not equal to len, a RangeError exception is thrown.

If the argument len is not a Number, then the length property of the newly constructed object is set to 1 and the 0 property of the newly constructed object is set to len with attributes {[[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}.

15.4.3 Properties of the Array Constructor

The value of the [[Prototype]] internal property of the Array constructor is the Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 1), the Array constructor has the following properties:

15.4.3.1 Array.prototype

The initial value of Array.prototype is the Array prototype object (15.4.4).

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.4.3.2 Array.isArray ( arg )

The isArray function takes one argument arg, and returns the Boolean value true if the argument is an object whose class internal property is "Array"; otherwise it returns false. The following steps are taken:

If Type(arg) is not Object, return false.
If the value of the [[Class]] internal property of arg is "Array", then return true.
Return false.
15.4.4 Properties of the Array Prototype Object

The value of the [[Prototype]] internal property of the Array prototype object is the standard built-in Object prototype object (15.2.4).

The Array prototype object is itself an array; its [[Class]] is "Array", and it has a length property (whose initial value is +0) and the special [[DefineOwnProperty]] internal method described in 15.4.5.1.

In following descriptions of functions that are properties of the Array prototype object, the phrase “this object” refers to the object that is the this value for the invocation of the function. It is permitted for the this to be an object for which the value of the [[Class]] internal property is not "Array".

NOTE The Array prototype object does not have a valueOf property of its own; however, it inherits the valueOf property from the standard built-in Object prototype Object.

15.4.4.1 Array.prototype.constructor

The initial value of Array.prototype.constructor is the standard built-in Array constructor.

15.4.4.2 Array.prototype.toString ( )

When the toString method is called, the following steps are taken:

Let array be the result of calling ToObject on the this value.
Let func be the result of calling the [[Get]] internal method of array with argument "join".
If IsCallable(func) is false, then let func be the standard built-in method Object.prototype.toString (15.2.4.2).
Return the result of calling the [[Call]] internal method of func providing array as the this value and an empty arguments list.
NOTE The toString function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the toString function can be applied successfully to a host object is implementation-dependent.

15.4.4.3 Array.prototype.toLocaleString ( )

The elements of the array are converted to Strings using their toLocaleString methods, and these Strings are then concatenated, separated by occurrences of a separator String that has been derived in an implementation-defined locale-specific way. The result of calling this function is intended to be analogous to the result of toString, except that the result of this function is intended to be locale-specific.

The result is calculated as follows:

Let array be the result of calling ToObject passing the this value as the argument.
Let arrayLen be the result of calling the [[Get]] internal method of array with argument "length".
Let len be ToUint32(arrayLen).
Let separator be the String value for the list-separator String appropriate for the host environment’s current locale (this is derived in an implementation-defined way).
If len is zero, return the empty String.
Let firstElement be the result of calling the [[Get]] internal method of array with argument "0".
If firstElement is undefined or null, then
Let R be the empty String.
Else
Let elementObj be ToObject(firstElement).
Let func be the result of calling the [[Get]] internal method of elementObj with argument "toLocaleString".
If IsCallable(func) is false, throw a TypeError exception.
Let R be the result of calling the [[Call]] internal method of func providing elementObj as the this value and an empty arguments list.
Let k be 1.
Repeat, while k < len
Let S be a String value produced by concatenating R and separator.
Let nextElement be the result of calling the [[Get]] internal method of array with argument ToString(k).
If nextElement is undefined or null, then
Let R be the empty String.
Else
Let elementObj be ToObject(nextElement).
Let func be the result of calling the [[Get]] internal method of elementObj with argument "toLocaleString".
If IsCallable(func) is false, throw a TypeError exception.
Let R be the result of calling the [[Call]] internal method of func providing elementObj as the this value and an empty arguments list.
Let R be a String value produced by concatenating S and R.
Increase k by 1.
Return R.
NOTE 1 The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

NOTE 2 The toLocaleString function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the toLocaleString function can be applied successfully to a host object is implementation-dependent.

15.4.4.4 Array.prototype.concat ( [ item1 [ , item2 [ , … ] ] ] )

When the concat method is called with zero or more arguments item1, item2, etc., it returns an array containing the array elements of the object followed by the array elements of each argument in order.

The following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let A be a new array created as if by the expression new Array() where Array is the standard built-in constructor with that name.
Let n be 0.
Let items be an internal List whose first element is O and whose subsequent elements are, in left to right order, the arguments that were passed to this function invocation.
Repeat, while items is not empty
Remove the first element from items and let E be the value of the element.
If the value of the [[Class]] internal property of E is "Array", then
Let k be 0.
Let len be the result of calling the [[Get]] internal method of E with argument "length".
Repeat, while k < len
Let P be ToString(k).
Let exists be the result of calling the [[HasProperty]] internal method of E with P.
If exists is true, then
Let subElement be the result of calling the [[Get]] internal method of E with argument P.
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(n), Property Descriptor {[[Value]]: subElement, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increase n by 1.
Increase k by 1.
Else, E is not an Array
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(n), Property Descriptor {[[Value]]: E, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increase n by 1.
Return A.
The length property of the concat method is 1.

NOTE The concat function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the concat function can be applied successfully to a host object is implementation-dependent.

15.4.4.5 Array.prototype.join (separator)

The elements of the array are converted to Strings, and these Strings are then concatenated, separated by occurrences of the separator. If no separator is provided, a single comma is used as the separator.

The join method takes one argument, separator, and performs the following steps:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let len be ToUint32(lenVal).
If separator is undefined, let separator be the single-character String ",".
Let sep be ToString(separator).
If len is zero, return the empty String.
Let element0 be the result of calling the [[Get]] internal method of O with argument "0".
If element0 is undefined or null, let R be the empty String; otherwise, Let R be ToString(element0).
Let k be 1.
Repeat, while k < len
Let S be the String value produced by concatenating R and sep.
Let element be the result of calling the [[Get]] internal method of O with argument ToString(k).
If element is undefined or null, Let next be the empty String; otherwise, let next be ToString(element).
Let R be a String value produced by concatenating S and next.
Increase k by 1.
Return R.
The length property of the join method is 1.

NOTE The join function is intentionally generic; it does not require that its this value be an Array object. Therefore, it can be transferred to other kinds of objects for use as a method. Whether the join function can be applied successfully to a host object is implementation-dependent.

15.4.4.6 Array.prototype.pop ( )

The last element of the array is removed from the array and returned.

Let O be the result of calling ToObject passing the this value as the argument.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let len be ToUint32(lenVal).
If len is zero,
Call the [[Put]] internal method of O with arguments "length", 0, and true.
Return undefined.
Else, len > 0
Let indx be ToString(len–1).
Let element be the result of calling the [[Get]] internal method of O with argument indx.
Call the [[Delete]] internal method of O with arguments indx and true.
Call the [[Put]] internal method of O with arguments "length", indx, and true.
Return element.
NOTE The pop function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the pop function can be applied successfully to a host object is implementation-dependent.

15.4.4.7 Array.prototype.push ( [ item1 [ , item2 [ , … ] ] ] )

The arguments are appended to the end of the array, in the order in which they appear. The new length of the array is returned as the result of the call.

When the push method is called with zero or more arguments item1, item2, etc., the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let n be ToUint32(lenVal).
Let items be an internal List whose elements are, in left to right order, the arguments that were passed to this function invocation.
Repeat, while items is not empty
Remove the first element from items and let E be the value of the element.
Call the [[Put]] internal method of O with arguments ToString(n), E, and true.
Increase n by 1.
Call the [[Put]] internal method of O with arguments "length", n, and true.
Return n.
The length property of the push method is 1.

NOTE The push function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the push function can be applied successfully to a host object is implementation-dependent.

15.4.4.8 Array.prototype.reverse ( )

The elements of the array are rearranged so as to reverse their order. The object is returned as the result of the call.

Let O be the result of calling ToObject passing the this value as the argument.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let len be ToUint32(lenVal).
Let middle be floor(len/2).
Let lower be 0.
Repeat, while lower ≠ middle
Let upper be len− lower −1.
Let upperP be ToString(upper).
Let lowerP be ToString(lower).
Let lowerValue be the result of calling the [[Get]] internal method of O with argument lowerP.
Let upperValue be the result of calling the [[Get]] internal method of O with argument upperP .
Let lowerExists be the result of calling the [[HasProperty]] internal method of O with argument lowerP.
Let upperExists be the result of calling the [[HasProperty]] internal method of O with argument upperP.
If lowerExists is true and upperExists is true, then
Call the [[Put]] internal method of O with arguments lowerP, upperValue, and true .
Call the [[Put]] internal method of O with arguments upperP, lowerValue, and true .
Else if lowerExists is false and upperExists is true, then
Call the [[Put]] internal method of O with arguments lowerP, upperValue, and true .
Call the [[Delete]] internal method of O, with arguments upperP and true.
Else if lowerExists is true and upperExists is false, then
Call the [[Delete]] internal method of O, with arguments lowerP and true .
Call the [[Put]] internal method of O with arguments upperP, lowerValue, and true .
Else, both lowerExists and upperExists are false
No action is required.
Increase lower by 1.
Return O .
NOTE The reverse function is intentionally generic; it does not require that its this value be an Array object. Therefore, it can be transferred to other kinds of objects for use as a method. Whether the reverse function can be applied successfully to a host object is implementation-dependent.

15.4.4.9 Array.prototype.shift ( )

The first element of the array is removed from the array and returned.

Let O be the result of calling ToObject passing the this value as the argument.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let len be ToUint32(lenVal).
If len is zero, then
Call the [[Put]] internal method of O with arguments "length", 0, and true.
Return undefined.
Let first be the result of calling the [[Get]] internal method of O with argument "0".
Let k be 1.
Repeat, while k < len
Let from be ToString(k).
Let to be ToString(k–1).
Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from.
If fromPresent is true, then
Let fromVal be the result of calling the [[Get]] internal method of O with argument from.
Call the [[Put]] internal method of O with arguments to, fromVal, and true.
Else, fromPresent is false
Call the [[Delete]] internal method of O with arguments to and true.
Increase k by 1.
Call the [[Delete]] internal method of O with arguments ToString(len–1) and true.
Call the [[Put]] internal method of O with arguments "length", (len–1) , and true.
Return first.
NOTE The shift function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the shift function can be applied successfully to a host object is implementation-dependent.

15.4.4.10 Array.prototype.slice (start, end)

The slice method takes two arguments, start and end, and returns an array containing the elements of the array from element start up to, but not including, element end (or through the end of the array if end is undefined). If start is negative, it is treated as length+start where length is the length of the array. If end is negative, it is treated as length+end where length is the length of the array. The following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let A be a new array created as if by the expression new Array() where Array is the standard built-in constructor with that name.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let len be ToUint32(lenVal).
Let relativeStart be ToInteger(start).
If relativeStart is negative, let k be max((len + relativeStart),0); else let k be min(relativeStart, len).
If end is undefined, let relativeEnd be len; else let relativeEnd be ToInteger(end).
If relativeEnd is negative, let final be max((len + relativeEnd),0); else let final be min(relativeEnd, len).
Let n be 0.
Repeat, while k < final
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(n), Property Descriptor {[[Value]]: kValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increase k by 1.
Increase n by 1.
Return A.
The length property of the slice method is 2.

NOTE The slice function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the slice function can be applied successfully to a host object is implementation-dependent.

15.4.4.11 Array.prototype.sort (comparefn)

The elements of this array are sorted. The sort is not necessarily stable (that is, elements that compare equal do not necessarily remain in their original order). If comparefn is not undefined, it should be a function that accepts two arguments x and y and returns a negative value if x < y, zero if x = y, or a positive value if x > y.

Let obj be the result of calling ToObject passing the this value as the argument.

Let len be the result of applying Uint32 to the result of calling the [[Get]] internal method of obj with argument "length".

If comparefn is not undefined and is not a consistent comparison function for the elements of this array (see below), the behaviour of sort is implementation-defined.

Let proto be the value of the [[Prototype]] internal property of obj. If proto is not null and there exists an integer j such that all of the conditions below are satisfied then the behaviour of sort is implementation-defined:

obj is sparse (15.4)
0 ≤ j < len
The result of calling the [[HasProperty]] internal method of proto with argument ToString(j) is true.
The behaviour of sort is also implementation defined if obj is sparse and any of the following conditions are true:

The [[Extensible]] internal property of obj is false.

Any array index property of obj whose name is a nonnegative integer less than len is a data property whose [[Configurable]] attribute is false.

The behaviour of sort is also implementation defined if any array index property of obj whose name is a nonnegative integer less than len is an accessor property or is a data property whose [[Writable]] attribute is false.

Otherwise, the following steps are taken.

Perform an implementation-dependent sequence of calls to the [[Get]] , [[Put]], and [[Delete]] internal methods of obj and to SortCompare (described below), where the first argument for each call to [[Get]], [[Put]], or [[Delete]] is a nonnegative integer less than len and where the arguments for calls to SortCompare are results of previous calls to the [[Get]] internal method. The throw argument to the [[Put]] and [[Delete]] internal methods will be the value true. If obj is not sparse then [[Delete]] must not be called.
Return obj.
The returned object must have the following two properties.

There must be some mathematical permutation π of the nonnegative integers less than len, such that for every nonnegative integer j less than len, if property old[j] existed, then new[π(j)] is exactly the same value as old[j],. But if property old[j] did not exist, then new[π(j)] does not exist.

Then for all nonnegative integers j and k, each less than len, if SortCompare(j,k) < 0 (see SortCompare below), then π(j) < π(k).

Here the notation old[j] is used to refer to the hypothetical result of calling the [[Get]] internal method of obj with argument j before this function is executed, and the notation new[j] to refer to the hypothetical result of calling the [[Get]] internal method of obj with argument j after this function has been executed.

A function comparefn is a consistent comparison function for a set of values S if all of the requirements below are met for all values a, b, and c (possibly the same value) in the set S: The notation a <CF b means comparefn(a,b) < 0; a =CF b means comparefn(a,b) = 0 (of either sign); and a >CF b means comparefn(a,b) > 0.

Calling comparefn(a,b) always returns the same value v when given a specific pair of values a and b as its two arguments. Furthermore, Type(v) is Number, and v is not NaN. Note that this implies that exactly one of a <CF b, a =CF b, and a >CF b will be true for a given pair of a and b.

Calling comparefn(a,b) does not modify the this object.

a =CF a (reflexivity)

If a =CF b, then b =CF a (symmetry)

If a =CF b and b =CF c, then a =CF c (transitivity of =CF)

If a <CF b and b <CF c, then a <CF c (transitivity of <CF)

If a >CF b and b >CF c, then a >CF c (transitivity of >CF)

NOTE The above conditions are necessary and sufficient to ensure that comparefn divides the set S into equivalence classes and that these equivalence classes are totally ordered.

When the SortCompare abstract operation is called with two arguments j and k, the following steps are taken:

Let jString be ToString(j).
Let kString be ToString(k).
Let hasj be the result of calling the [[HasProperty]] internal method of obj with argument jString.
Let hask be the result of calling the [[HasProperty]] internal method of obj with argument kString.
If hasj and hask are both false, then return +0.
If hasj is false, then return 1.
If hask is false, then return –1.
Let x be the result of calling the [[Get]] internal method of obj with argument jString.
Let y be the result of calling the [[Get]] internal method of obj with argument kString.
If x and y are both undefined, return +0.
If x is undefined, return 1.
If y is undefined, return −1.
If the argument comparefn is not undefined, then
If IsCallable(comparefn) is false, throw a TypeError exception.
Return the result of calling the [[Call]] internal method of comparefn passing undefined as the this value and with arguments x and y.
Let xString be ToString(x).
Let yString be ToString(y).
If xString < yString, return −1.
If xString > yString, return 1.
Return +0.
NOTE 1 Because non-existent property values always compare greater than undefined property values, and undefined always compares greater than any other value, undefined property values always sort to the end of the result, followed by non-existent property values.

NOTE 2 The sort function is intentionally generic; it does not require that its this value be an Array object. Therefore, it can be transferred to other kinds of objects for use as a method. Whether the sort function can be applied successfully to a host object is implementation-dependent.

15.4.4.12 Array.prototype.splice (start, deleteCount [ , item1 [ , item2 [ , … ] ] ] )

When the splice method is called with two or more arguments start, deleteCount and (optionally) item1, item2, etc., the deleteCount elements of the array starting at array index start are replaced by the arguments item1, item2, etc. An Array object containing the deleted elements (if any) is returned. The following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let A be a new array created as if by the expression new Array()where Array is the standard built-in constructor with that name.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let len be ToUint32(lenVal).
Let relativeStart be ToInteger(start).
If relativeStart is negative, let actualStart be max((len + relativeStart),0); else let actualStart be min(relativeStart, len).
Let actualDeleteCount be min(max(ToInteger(deleteCount),0), len – actualStart).
Let k be 0.
Repeat, while k < actualDeleteCount
Let from be ToString(actualStart+k).
Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from.
If fromPresent is true, then
Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(k), Property Descriptor {[[Value]]: fromValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increment k by 1.
Let items be an internal List whose elements are, in left to right order, the portion of the actual argument list starting with item1. The list will be empty if no such items are present.
Let itemCount be the number of elements in items.
If itemCount < actualDeleteCount, then
Let k be actualStart.
Repeat, while k < (len – actualDeleteCount)
Let from be ToString(k+actualDeleteCount).
Let to be ToString(k+itemCount).
Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from.
If fromPresent is true, then
Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
Call the [[Put]] internal method of O with arguments to, fromValue, and true.
Else, fromPresent is false
Call the [[Delete]] internal method of O with arguments to and true.
Increase k by 1.
Let k be len.
Repeat, while k > (len – actualDeleteCount + itemCount)
Call the [[Delete]] internal method of O with arguments ToString(k–1) and true.
Decrease k by 1.
Else if itemCount > actualDeleteCount, then
Let k be (len – actualDeleteCount).
Repeat, while k > actualStart
Let from be ToString(k + actualDeleteCount – 1).
Let to be ToString(k + itemCount – 1)
Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from.
If fromPresent is true, then
Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
Call the [[Put]] internal method of O with arguments to, fromValue, and true.
Else, fromPresent is false
Call the [[Delete]] internal method of O with argument to and true.
Decrease k by 1.
Let k be actualStart.
Repeat, while items is not empty
Remove the first element from items and let E be the value of that element.
Call the [[Put]] internal method of O with arguments ToString(k), E, and true.
Increase k by 1.
Call the [[Put]] internal method of O with arguments "length", (len – actualDeleteCount + itemCount), and true.
Return A.
The length property of the splice method is 2.

NOTE The splice function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the splice function can be applied successfully to a host object is implementation-dependent.

15.4.4.13 Array.prototype.unshift ( [ item1 [ , item2 [ , … ] ] ] )

The arguments are prepended to the start of the array, such that their order within the array is the same as the order in which they appear in the argument list.

When the unshift method is called with zero or more arguments item1, item2, etc., the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenVal be the result of calling the [[Get]] internal method of O with argument "length".
Let len be ToUint32(lenVal).
Let argCount be the number of actual arguments.
Let k be len.
Repeat, while k > 0,
Let from be ToString(k–1).
Let to be ToString(k+argCount –1).
Let fromPresent be the result of calling the [[HasProperty]] internal method of O with argument from.
If fromPresent is true, then
Let fromValue be the result of calling the [[Get]] internal method of O with argument from.
Call the [[Put]] internal method of O with arguments to, fromValue, and true.
Else, fromPresent is false
Call the [[Delete]] internal method of O with arguments to, and true.
Decrease k by 1.
Let j be 0.
Let items be an internal List whose elements are, in left to right order, the arguments that were passed to this function invocation.
Repeat, while items is not empty
Remove the first element from items and let E be the value of that element.
Call the [[Put]] internal method of O with arguments ToString(j), E, and true.
Increase j by 1.
Call the [[Put]] internal method of O with arguments "length", len+argCount, and true.
Return len+argCount.
The length property of the unshift method is 1.

NOTE The unshift function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the unshift function can be applied successfully to a host object is implementation-dependent.

15.4.4.14 Array.prototype.indexOf ( searchElement [ , fromIndex ] )

indexOf compares searchElement to the elements of the array, in ascending order, using the internal Strict Equality Comparison Algorithm (11.9.6), and if found at one or more positions, returns the index of the first such position; otherwise, -1 is returned.

The optional second argument fromIndex defaults to 0 (i.e. the whole array is searched). If it is greater than or equal to the length of the array, -1 is returned, i.e. the array will not be searched. If it is negative, it is used as the offset from the end of the array to compute fromIndex. If the computed index is less than 0, the whole array will be searched.

When the indexOf method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If len is 0, return -1.
If argument fromIndex was passed let n be ToInteger(fromIndex); else let n be 0.
If n ≥ len, return -1.
If n ≥ 0, then
Let k be n.
Else, n<0
Let k be len - abs(n).
If k is less than 0, then let k be 0.
Repeat, while k<len
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument ToString(k).
If kPresent is true, then
Let elementK be the result of calling the [[Get]] internal method of O with the argument ToString(k).
Let same be the result of applying the Strict Equality Comparison Algorithm to searchElement and elementK.
If same is true, return k.
Increase k by 1.
Return -1.
The length property of the indexOf method is 1.

NOTE The indexOf function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the indexOf function can be applied successfully to a host object is implementation-dependent.

15.4.4.15 Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )

lastIndexOf compares searchElement to the elements of the array in descending order using the internal Strict Equality Comparison Algorithm (11.9.6), and if found at one or more positions, returns the index of the last such position; otherwise, -1 is returned.

The optional second argument fromIndex defaults to the array's length minus one (i.e. the whole array is searched). If it is greater than or equal to the length of the array, the whole array will be searched. If it is negative, it is used as the offset from the end of the array to compute fromIndex. If the computed index is less than 0, -1 is returned.

When the lastIndexOf method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If len is 0, return -1.
If argument fromIndex was passed let n be ToInteger(fromIndex); else let n be len-1.
If n ≥ 0, then let k be min(n, len – 1).
Else, n < 0
Let k be len - abs(n).
Repeat, while k≥ 0
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument ToString(k).
If kPresent is true, then
Let elementK be the result of calling the [[Get]] internal method of O with the argument ToString(k).
Let same be the result of applying the Strict Equality Comparison Algorithm to searchElement and elementK.
If same is true, return k.
Decrease k by 1.
Return -1.
The length property of the lastIndexOf method is 1.

NOTE The lastIndexOf function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the lastIndexOf function can be applied successfully to a host object is implementation-dependent.

15.4.4.16 Array.prototype.every ( callbackfn [ , thisArg ] )

callbackfn should be a function that accepts three arguments and returns a value that is coercible to the Boolean value true or false. every calls callbackfn once for each element present in the array, in ascending order, until it finds one where callbackfn returns false. If such an element is found, every immediately returns false. Otherwise, if callbackfn returned true for all elements, every will return true. callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array.

If a thisArg parameter is provided, it will be used as the this value for each invocation of callbackfn. If it is not provided, undefined is used instead.

callbackfn is called with three arguments: the value of the element, the index of the element, and the object being traversed.

every does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.

The range of elements processed by every is set before the first call to callbackfn. Elements which are appended to the array after the call to every begins will not be visited by callbackfn. If existing elements of the array are changed, their value as passed to callbackfn will be the value at the time every visits them; elements that are deleted after the call to every begins and before being visited are not visited. every acts like the "for all" quantifier in mathematics. In particular, for an empty array, it returns true.

When the every method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If IsCallable(callbackfn) is false, throw a TypeError exception.
If thisArg was supplied, let T be thisArg; else let T be undefined.
Let k be 0.
Repeat, while k < len
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Let testResult be the result of calling the [[Call]] internal method of callbackfn with T as the this value and argument list containing kValue, k, and O.
If ToBoolean(testResult) is false, return false.
Increase k by 1.
Return true.
The length property of the every method is 1.

NOTE The every function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the every function can be applied successfully to a host object is implementation-dependent.

15.4.4.17 Array.prototype.some ( callbackfn [ , thisArg ] )

callbackfn should be a function that accepts three arguments and returns a value that is coercible to the Boolean value true or false. some calls callbackfn once for each element present in the array, in ascending order, until it finds one where callbackfn returns true. If such an element is found, some immediately returns true. Otherwise, some returns false. callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array.

If a thisArg parameter is provided, it will be used as the this value for each invocation of callbackfn. If it is not provided, undefined is used instead.

callbackfn is called with three arguments: the value of the element, the index of the element, and the object being traversed.

some does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.

The range of elements processed by some is set before the first call to callbackfn. Elements that are appended to the array after the call to some begins will not be visited by callbackfn. If existing elements of the array are changed, their value as passed to callbackfn will be the value at the time that some visits them; elements that are deleted after the call to some begins and before being visited are not visited. some acts like the "exists" quantifier in mathematics. In particular, for an empty array, it returns false.

When the some method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If IsCallable(callbackfn) is false, throw a TypeError exception.
If thisArg was supplied, let T be thisArg; else let T be undefined.
Let k be 0.
Repeat, while k < len
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Let testResult be the result of calling the [[Call]] internal method of callbackfn with T as the this value and argument list containing kValue, k, and O.
If ToBoolean(testResult) is true, return true.
Increase k by 1.
Return false.
The length property of the some method is 1.

NOTE The some function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the some function can be applied successfully to a host object is implementation-dependent.

15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )

callbackfn should be a function that accepts three arguments. forEach calls callbackfn once for each element present in the array, in ascending order. callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array.

If a thisArg parameter is provided, it will be used as the this value for each invocation of callbackfn. If it is not provided, undefined is used instead.

callbackfn is called with three arguments: the value of the element, the index of the element, and the object being traversed.

forEach does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.

The range of elements processed by forEach is set before the first call to callbackfn. Elements which are appended to the array after the call to forEach begins will not be visited by callbackfn. If existing elements of the array are changed, their value as passed to callback will be the value at the time forEach visits them; elements that are deleted after the call to forEach begins and before being visited are not visited.

When the forEach method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If IsCallable(callbackfn) is false, throw a TypeError exception.
If thisArg was supplied, let T be thisArg; else let T be undefined.
Let k be 0.
Repeat, while k < len
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Call the [[Call]] internal method of callbackfn with T as the this value and argument list containing kValue, k, and O.
Increase k by 1.
Return undefined.
The length property of the forEach method is 1.

NOTE The forEach function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the forEach function can be applied successfully to a host object is implementation-dependent.

15.4.4.19 Array.prototype.map ( callbackfn [ , thisArg ] )

callbackfn should be a function that accepts three arguments. map calls callbackfn once for each element in the array, in ascending order, and constructs a new Array from the results. callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array.

If a thisArg parameter is provided, it will be used as the this value for each invocation of callbackfn. If it is not provided, undefined is used instead.

callbackfn is called with three arguments: the value of the element, the index of the element, and the object being traversed.

map does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.

The range of elements processed by map is set before the first call to callbackfn. Elements which are appended to the array after the call to map begins will not be visited by callbackfn. If existing elements of the array are changed, their value as passed to callbackfn will be the value at the time map visits them; elements that are deleted after the call to map begins and before being visited are not visited.

When the map method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If IsCallable(callbackfn) is false, throw a TypeError exception.
If thisArg was supplied, let T be thisArg; else let T be undefined.
Let A be a new array created as if by the expression new Array(len) where Array is the standard built-in constructor with that name and len is the value of len.
Let k be 0.
Repeat, while k < len
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Let mappedValue be the result of calling the [[Call]] internal method of callbackfn with T as the this value and argument list containing kValue, k, and O.
Call the [[DefineOwnProperty]] internal method of A with arguments Pk, Property Descriptor {[[Value]]: mappedValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increase k by 1.
Return A.
The length property of the map method is 1.

NOTE The map function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the map function can be applied successfully to a host object is implementation-dependent.

15.4.4.20 Array.prototype.filter ( callbackfn [ , thisArg ] )

callbackfn should be a function that accepts three arguments and returns a value that is coercible to the Boolean value true or false. filter calls callbackfn once for each element in the array, in ascending order, and constructs a new array of all the values for which callbackfn returns true. callbackfn is called only for elements of the array which actually exist; it is not called for missing elements of the array.

If a thisArg parameter is provided, it will be used as the this value for each invocation of callbackfn. If it is not provided, undefined is used instead.

callbackfn is called with three arguments: the value of the element, the index of the element, and the object being traversed.

filter does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.

The range of elements processed by filter is set before the first call to callbackfn. Elements which are appended to the array after the call to filter begins will not be visited by callbackfn. If existing elements of the array are changed their value as passed to callbackfn will be the value at the time filter visits them; elements that are deleted after the call to filter begins and before being visited are not visited.

When the filter method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If IsCallable(callbackfn) is false, throw a TypeError exception.
If thisArg was supplied, let T be thisArg; else let T be undefined.
Let A be a new array created as if by the expression new Array() where Array is the standard built-in constructor with that name.
Let k be 0.
Let to be 0.
Repeat, while k < len
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Let selected be the result of calling the [[Call]] internal method of callbackfn with T as the this value and argument list containing kValue, k, and O.
If ToBoolean(selected) is true, then
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(to), Property Descriptor {[[Value]]: kValue, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increase to by 1.
Increase k by 1.
Return A.
The length property of the filter method is 1.

NOTE The filter function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the filter function can be applied successfully to a host object is implementation-dependent.

15.4.4.21 Array.prototype.reduce ( callbackfn [ , initialValue ] )

callbackfn should be a function that takes four arguments. reduce calls the callback, as a function, once for each element present in the array, in ascending order.

callbackfn is called with four arguments: the previousValue (or value from the previous call to callbackfn), the currentValue (value of the current element), the currentIndex, and the object being traversed. The first time that callback is called, the previousValue and currentValue can be one of two values. If an initialValue was provided in the call to reduce, then previousValue will be equal to initialValue and currentValue will be equal to the first value in the array. If no initialValue was provided, then previousValue will be equal to the first value in the array and currentValue will be equal to the second. It is a TypeError if the array contains no elements and initialValue is not provided.

reduce does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.

The range of elements processed by reduce is set before the first call to callbackfn. Elements that are appended to the array after the call to reduce begins will not be visited by callbackfn. If existing elements of the array are changed, their value as passed to callbackfn will be the value at the time reduce visits them; elements that are deleted after the call to reduce begins and before being visited are not visited.

When the reduce method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If IsCallable(callbackfn) is false, throw a TypeError exception.
If len is 0 and initialValue is not present, throw a TypeError exception.
Let k be 0.
If initialValue is present, then
Set accumulator to initialValue.
Else, initialValue is not present
Let kPresent be false.
Repeat, while kPresent is false and k < len
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let accumulator be the result of calling the [[Get]] internal method of O with argument Pk.
Increase k by 1.
If kPresent is false, throw a TypeError exception.
Repeat, while k < len
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Let accumulator be the result of calling the [[Call]] internal method of callbackfn with undefined as the this value and argument list containing accumulator, kValue, k, and O.
Increase k by 1.
Return accumulator.
The length property of the reduce method is 1.

NOTE The reduce function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the reduce function can be applied successfully to a host object is implementation-dependent.

15.4.4.22 Array.prototype.reduceRight ( callbackfn [ , initialValue ] )

callbackfn should be a function that takes four arguments. reduceRight calls the callback, as a function, once for each element present in the array, in descending order.

callbackfn is called with four arguments: the previousValue (or value from the previous call to callbackfn), the currentValue (value of the current element), the currentIndex, and the object being traversed. The first time the function is called, the previousValue and currentValue can be one of two values. If an initialValue was provided in the call to reduceRight, then previousValue will be equal to initialValue and currentValue will be equal to the last value in the array. If no initialValue was provided, then previousValue will be equal to the last value in the array and currentValue will be equal to the second-to-last value. It is a TypeError if the array contains no elements and initialValue is not provided.

reduceRight does not directly mutate the object on which it is called but the object may be mutated by the calls to callbackfn.

The range of elements processed by reduceRight is set before the first call to callbackfn. Elements that are appended to the array after the call to reduceRight begins will not be visited by callbackfn. If existing elements of the array are changed by callbackfn, their value as passed to callbackfn will be the value at the time reduceRight visits them; elements that are deleted after the call to reduceRight begins and before being visited are not visited.

When the reduceRight method is called with one or two arguments, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let lenValue be the result of calling the [[Get]] internal method of O with the argument "length".
Let len be ToUint32(lenValue).
If IsCallable(callbackfn) is false, throw a TypeError exception.
If len is 0 and initialValue is not present, throw a TypeError exception.
Let k be len-1.
If initialValue is present, then
Set accumulator to initialValue.
Else, initialValue is not present
Let kPresent be false.
Repeat, while kPresent is false and k ≥ 0
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let accumulator be the result of calling the [[Get]] internal method of O with argument Pk.
Decrease k by 1.
If kPresent is false, throw a TypeError exception.
Repeat, while k ≥ 0
Let Pk be ToString(k).
Let kPresent be the result of calling the [[HasProperty]] internal method of O with argument Pk.
If kPresent is true, then
Let kValue be the result of calling the [[Get]] internal method of O with argument Pk.
Let accumulator be the result of calling the [[Call]] internal method of callbackfn with undefined as the this value and argument list containing accumulator, kValue, k, and O.
Decrease k by 1.
Return accumulator.
The length property of the reduceRight method is 1.

NOTE The reduceRight function is intentionally generic; it does not require that its this value be an Array object. Therefore it can be transferred to other kinds of objects for use as a method. Whether the reduceRight function can be applied successfully to a host object is implementation-dependent.

15.4.5 Properties of Array Instances

Array instances inherit properties from the Array prototype object and their [[Class]] internal property value is "Array". Array instances also have the following properties.

15.4.5.1 [[DefineOwnProperty]] ( P, Desc, Throw )

Array objects use a variation of the [[DefineOwnProperty]] internal method used for other native ECMAScript objects (8.12.9).

Assume A is an Array object, Desc is a Property Descriptor, and Throw is a Boolean flag.

In the following algorithm, the term “Reject” means “If Throw is true, then throw a TypeError exception, otherwise return false.”

When the [[DefineOwnProperty]] internal method of A is called with property P, Property Descriptor Desc, and Boolean flag Throw, the following steps are taken:

Let oldLenDesc be the result of calling the [[GetOwnProperty]] internal method of A passing "length" as the argument. The result will never be undefined or an accessor descriptor because Array objects are created with a length data property that cannot be deleted or reconfigured.
Let oldLen be oldLenDesc.[[Value]].
If P is "length", then
If the [[Value]] field of Desc is absent, then
Return the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", Desc, and Throw as arguments.
Let newLenDesc be a copy of Desc.
Let newLen be ToUint32(Desc.[[Value]]).
If newLen is not equal to ToNumber( Desc.[[Value]]), throw a RangeError exception.
Set newLenDesc.[[Value] to newLen.
If newLen ≥oldLen, then
Return the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", newLenDesc, and Throw as arguments.
Reject if oldLenDesc.[[Writable]] is false.
If newLenDesc.[[Writable]] is absent or has the value true, let newWritable be true.
Else,
Need to defer setting the [[Writable]] attribute to false in case any elements cannot be deleted.
Let newWritable be false.
Set newLenDesc.[[Writable] to true.
Let succeeded be the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", newLenDesc, and Throw as arguments.
If succeeded is false, return false.
While newLen < oldLen repeat,
Set oldLen to oldLen – 1.
Let deleteSucceeded be the result of calling the [[Delete]] internal method of A passing ToString(oldLen) and false as arguments.
If deleteSucceeded is false, then
Set newLenDesc.[[Value] to oldLen+1.
If newWritable is false, set newLenDesc.[[Writable] to false.
Call the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", newLenDesc, and false as arguments.
Reject.
If newWritable is false, then
Call the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", Property Descriptor{[[Writable]]: false}, and false as arguments. This call will always return true.
Return true.
Else if P is an array index (15.4), then
Let index be ToUint32(P).
Reject if index ≥ oldLen and oldLenDesc.[[Writable]] is false.
Let succeeded be the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing P, Desc, and false as arguments.
Reject if succeeded is false.
If index ≥ oldLen
Set oldLenDesc.[[Value]] to index + 1.
Call the default [[DefineOwnProperty]] internal method (8.12.9) on A passing "length", oldLenDesc, and false as arguments. This call will always return true.
Return true.
Return the result of calling the default [[DefineOwnProperty]] internal method (8.12.9) on A passing P, Desc, and Throw as arguments.
15.4.5.2 length

The length property of this Array object is a data property whose value is always numerically greater than the name of every deletable property whose name is an array index.

The length property initially has the attributes { [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }.

NOTE Attempting to set the length property of an Array object to a value that is numerically less than or equal to the largest numeric property name of an existing array indexed non-deletable property of the array will result in the length being set to a numeric value that is one greater than that largest numeric property name. See 15.4.5.1.