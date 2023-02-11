# String


String ( [ value ] )

new String ( [ value ] )

String.prototype
String.fromCharCode ( [ char0 [ , char1 [ , … ] ] ] )

String.prototype.constructor
String.prototype.toString ( )
String.prototype.valueOf ( )
String.prototype.charAt (pos)
String.prototype.charCodeAt (pos)
String.prototype.concat ( [ string1 [ , string2 [ , … ] ] ] )
String.prototype.indexOf (searchString, position)
String.prototype.lastIndexOf (searchString, position)
String.prototype.localeCompare (that)
String.prototype.match (regexp)
String.prototype.replace (searchValue, replaceValue)
String.prototype.search (regexp)
String.prototype.split (separator, limit)
String.prototype.substring (start, end)
String.prototype.toLowerCase ( )
String.prototype.toLocaleLowerCase ( )
String.prototype.toUpperCase ( )
String.prototype.toLocaleUpperCase ( )
String.prototype.trim ( )

length
[[GetOwnProperty]] ( P )




15.5.1 The String Constructor Called as a Function

When String is called as a function rather than as a constructor, it performs a type conversion.

15.5.1.1 String ( [ value ] )

Returns a String value (not a String object) computed by ToString(value). If value is not supplied, the empty String "" is returned.

15.5.2 The String Constructor

When String is called as part of a new expression, it is a constructor: it initialises the newly created object.

15.5.2.1 new String ( [ value ] )

The [[Prototype]] internal property of the newly constructed object is set to the standard built-in String prototype object that is the initial value of String.prototype (15.5.3.1).

The [[Class]] internal property of the newly constructed object is set to "String".

The [[Extensible]] internal property of the newly constructed object is set to true.

The [[PrimitiveValue]] internal property of the newly constructed object is set to ToString(value), or to the empty String if value is not supplied.

15.5.3 Properties of the String Constructor

The value of the [[Prototype]] internal property of the String constructor is the standard built-in Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 1), the String constructor has the following properties:

15.5.3.1 String.prototype

The initial value of String.prototype is the standard built-in String prototype object (15.5.4).

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.5.3.2 String.fromCharCode ( [ char0 [ , char1 [ , … ] ] ] )

Returns a String value containing as many characters as the number of arguments. Each argument specifies one character of the resulting String, with the first argument specifying the first character, and so on, from left to right. An argument is converted to a character by applying the operation ToUint16 (9.7) and regarding the resulting 16-bit integer as the code unit value of a character. If no arguments are supplied, the result is the empty String.

The length property of the fromCharCode function is 1.

15.5.4 Properties of the String Prototype Object

The String prototype object is itself a String object (its [[Class]] is "String") whose value is an empty String.

The value of the [[Prototype]] internal property of the String prototype object is the standard built-in Object prototype object (15.2.4).

15.5.4.1 String.prototype.constructor

The initial value of String.prototype.constructor is the built-in String constructor.

15.5.4.2 String.prototype.toString ( )

Returns this String value. (Note that, for a String object, the toString method happens to return the same thing as the valueOf method.)

The toString function is not generic; it throws a TypeError exception if its this value is not a String or a String object. Therefore, it cannot be transferred to other kinds of objects for use as a method.

15.5.4.3 String.prototype.valueOf ( )

Returns this String value.

The valueOf function is not generic; it throws a TypeError exception if its this value is not a String or String object. Therefore, it cannot be transferred to other kinds of objects for use as a method.

15.5.4.4 String.prototype.charAt (pos)

Returns a String containing the character at position pos in the String resulting from converting this object to a String. If there is no character at that position, the result is the empty String. The result is a String value, not a String object.

If pos is a value of Number type that is an integer, then the result of x.charAt(pos) is equal to the result of x.substring(pos, pos+1).

When the charAt method is called with one argument pos, the following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let position be ToInteger(pos).
Let size be the number of characters in S.
If position < 0 or position ≥ size, return the empty String.
Return a String of length 1, containing one character from S, namely the character at position position, where the first (leftmost) character in S is considered to be at position 0, the next one at position 1, and so on.
NOTE The charAt function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.5 String.prototype.charCodeAt (pos)

Returns a Number (a nonnegative integer less than 216) representing the code unit value of the character at position pos in the String resulting from converting this object to a String. If there is no character at that position, the result is NaN.

When the charCodeAt method is called with one argument pos, the following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let position be ToInteger(pos).
Let size be the number of characters in S.
If position < 0 or position ≥ size, return NaN.
Return a value of Number type, whose value is the code unit value of the character at position position in the String S, where the first (leftmost) character in S is considered to be at position 0, the next one at position 1, and so on.
NOTE The charCodeAt function is intentionally generic; it does not require that its this value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.

15.5.4.6 String.prototype.concat ( [ string1 [ , string2 [ , … ] ] ] )

When the concat method is called with zero or more arguments string1, string2, etc., it returns a String consisting of the characters of this object (converted to a String) followed by the characters of each of string1, string2, etc. (where each argument is converted to a String). The result is a String value, not a String object. The following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let args be an internal list that is a copy of the argument list passed to this function.
Let R be S.
Repeat, while args is not empty
Remove the first element from args and let next be the value of that element.
Let R be the String value consisting of the characters in the previous value of R followed by the characters of ToString(next).
Return R.
The length property of the concat method is 1.

NOTE The concat function is intentionally generic; it does not require that its this value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.

15.5.4.7 String.prototype.indexOf (searchString, position)

If searchString appears as a substring of the result of converting this object to a String, at one or more positions that are greater than or equal to position, then the index of the smallest such position is returned; otherwise, ‑1 is returned. If position is undefined, 0 is assumed, so as to search all of the String.

The indexOf method takes two arguments, searchString and position, and performs the following steps:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let searchStr be ToString(searchString).
Let pos be ToInteger(position). (If position is undefined, this step produces the value 0).
Let len be the number of characters in S.
Let start be min(max(pos, 0), len).
Let searchLen be the number of characters in searchStr.
Return the smallest possible integer k not smaller than start such that k+ searchLen is not greater than len, and for all nonnegative integers j less than searchLen, the character at position k+j of S is the same as the character at position j of searchStr; but if there is no such integer k, then return the value -1.
The length property of the indexOf method is 1.

NOTE The indexOf function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.8 String.prototype.lastIndexOf (searchString, position)

If searchString appears as a substring of the result of converting this object to a String at one or more positions that are smaller than or equal to position, then the index of the greatest such position is returned; otherwise, ‑1 is returned. If position is undefined, the length of the String value is assumed, so as to search all of the String.

The lastIndexOf method takes two arguments, searchString and position, and performs the following steps:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let searchStr be ToString(searchString).
Let numPos be ToNumber(position). (If position is undefined, this step produces the value NaN).
If numPos is NaN, let pos be +∞; otherwise, let pos be ToInteger(numPos).
Let len be the number of characters in S.
Let start min(max(pos, 0), len).
Let searchLen be the number of characters in searchStr.
Return the largest possible nonnegative integer k not larger than start such that k+ searchLen is not greater than len, and for all nonnegative integers j less than searchLen, the character at position k+j of S is the same as the character at position j of searchStr; but if there is no such integer k, then return the value -1.
The length property of the lastIndexOf method is 1.

NOTE The lastIndexOf function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.9 String.prototype.localeCompare (that)

When the localeCompare method is called with one argument that, it returns a Number other than NaN that represents the result of a locale-sensitive String comparison of the this value (converted to a String) with that (converted to a String). The two Strings are S and That. The two Strings are compared in an implementation-defined fashion. The result is intended to order String values in the sort order specified by the system default locale, and will be negative, zero, or positive, depending on whether S comes before That in the sort order, the Strings are equal, or S comes after That in the sort order, respectively.

Before perform the comparisons the following steps are performed to prepare the Strings:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let That be ToString(that).
The localeCompare method, if considered as a function of two arguments this and that, is a consistent comparison function (as defined in 15.4.4.11) on the set of all Strings.

The actual return values are implementation-defined to permit implementers to encode additional information in the value, but the function is required to define a total ordering on all Strings and to return 0 when comparing Strings that are considered canonically equivalent by the Unicode standard.

If no language-sensitive comparison at all is available from the host environment, this function may perform a bitwise comparison.

NOTE 1 The localeCompare method itself is not directly suitable as an argument to Array.prototype.sort because the latter requires a function of two arguments.

NOTE 2 This function is intended to rely on whatever language-sensitive comparison functionality is available to the ECMAScript environment from the host environment, and to compare according to the rules of the host environment’s current locale. It is strongly recommended that this function treat Strings that are canonically equivalent according to the Unicode standard as identical (in other words, compare the Strings as if they had both been converted to Normalised Form C or D first). It is also recommended that this function not honour Unicode compatibility equivalences or decompositions.

NOTE 3 The second parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

NOTE 4 The localeCompare function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.10 String.prototype.match (regexp)

When the match method is called with argument regexp, the following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
If Type(regexp) is Object and the value of the [[Class]] internal property of regexp is "RegExp", then let rx be regexp;
Else, let rx be a new RegExp object created as if by the expression new RegExp(regexp) where RegExp is the standard built-in constructor with that name.
Let global be the result of calling the [[Get]] internal method of rx with argument "global".
Let exec be the standard built-in function RegExp.prototype.exec (see 15.10.6.2)
If global is not true, then
Return the result of calling the [[Call]] internal method of exec with rx as the this value and argument list containing S.
Else, global is true
Call the [[Put]] internal method of rx with arguments "lastIndex" and 0.
Let A be a new array created as if by the expression new Array() where Array is the standard built-in constructor with that name.
Let previousLastIndex be 0.
Let n be 0.
Let lastMatch be true.
Repeat, while lastMatch is true
Let result be the result of calling the [[Call]] internal method of exec with rx as the this value and argument list containing S.
If result is null, then set lastMatch to false.
Else, result is not null
Let thisIndex be the result of calling the [[Get]] internal method of rx with argument "lastIndex".
If thisIndex = previousLastIndex then
Call the [[Put]] internal method of rx with arguments "lastIndex" and thisIndex+1.
Set previousLastIndex to thisIndex+1.
Else, set previousLastIndex to thisIndex.
Let matchStr be the result of calling the [[Get]] internal method of result with argument "0".
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(n), the Property Descriptor {[[Value]]: matchStr, [[Writable]]: true, [[Enumerable]]: true, [[configurable]]: true}, and false.
Increment n.
If n = 0, then return null.
Return A.
NOTE The match function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.11 String.prototype.replace (searchValue, replaceValue)

First set string according to the following steps:

Call CheckObjectCoercible passing the this value as its argument.
Let string be the result of calling ToString, giving it the this value as its argument.
If searchValue is a regular expression (an object whose [[Class]] internal property is "RegExp"), do the following: If searchValue.global is false, then search string for the first match of the regular expression searchValue. If searchValue.global is true, then search string for all matches of the regular expression searchValue. Do the search in the same manner as in String.prototype.match, including the update of searchValue.lastIndex. Let m be the number of left capturing parentheses in searchValue (using NcapturingParens as specified in 15.10.2.1).

If searchValue is not a regular expression, let searchString be ToString(searchValue) and search string for the first occurrence of searchString. Let m be 0.

If replaceValue is a function, then for each matched substring, call the function with the following m + 3 arguments. Argument 1 is the substring that matched. If searchValue is a regular expression, the next m arguments are all of the captures in the MatchResult (see 15.10.2.1). Argument m + 2 is the offset within string where the match occurred, and argument m + 3 is string. The result is a String value derived from the original input by replacing each matched substring with the corresponding return value of the function call, converted to a String if need be.

Otherwise, let newstring denote the result of converting replaceValue to a String. The result is a String value derived from the original input String by replacing each matched substring with a String derived from newstring by replacing characters in newstring by replacement text as specified in Table 22. These $ replacements are done left-to-right, and, once such a replacement is performed, the new replacement text is not subject to further replacements. For example, "$1,$2".replace(/(\$(\d))/g, "$$1-$1$2") returns "$1-$11,$1-$22". A $ in newstring that does not match any of the forms below is left as is.

Table 22 — Replacement Text Symbol Substitutions
Characters	Replacement text
$$	$
$&	The matched substring.
$‘	The portion of string that precedes the matched substring.
$’	The portion of string that follows the matched substring.
$n	The nth capture, where n is a single digit in the range 1 to 9 and $n is not followed by a decimal digit. If n≤m and the nth capture is undefined, use the empty String instead. If n>m, the result is implementation-defined.
$nn	The nnth capture, where nn is a two-digit decimal number in the range 01 to 99. If nn≤m and the nnth capture is undefined, use the empty String instead. If nn>m, the result is implementation-defined.
NOTE The replace function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.12 String.prototype.search (regexp)

When the search method is called with argument regexp, the following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let string be the result of calling ToString, giving it the this value as its argument.
If Type(regexp) is Object and the value of the [[Class]] internal property of regexp is "RegExp", then let rx be regexp;
Else, let rx be a new RegExp object created as if by the expression new RegExp(regexp) where RegExp is the standard built-in constructor with that name.
Search the value string from its beginning for an occurrence of the regular expression pattern rx. Let result be a Number indicating the offset within string where the pattern matched, or –1 if there was no match. The lastIndex and global properties of regexp are ignored when performing the search. The lastIndex property of regexp is left unchanged.
Return result.
NOTE The search function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.13 String.prototype.slice (start, end)

The slice method takes two arguments, start and end, and returns a substring of the result of converting this object to a String, starting from character position start and running to, but not including, character position end (or through the end of the String if end is undefined). If start is negative, it is treated as sourceLength+start where sourceLength is the length of the String. If end is negative, it is treated as sourceLength+end where sourceLength is the length of the String. The result is a String value, not a String object. The following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let len be the number of characters in S.
Let intStart be ToInteger(start).
If end is undefined, let intEnd be len; else let intEnd be ToInteger(end).
If intStart is negative, let from be max(len + intStart,0); else let from be min(intStart, len).
If intEnd is negative, let to be max(len + intEnd,0); else let to be min(intEnd, len).
Let span be max(to – from,0).
Return a String containing span consecutive characters from S beginning with the character at position from.
The length property of the slice method is 2.

NOTE The slice function is intentionally generic; it does not require that its this value be a String object. Therefore it can be transferred to other kinds of objects for use as a method.

15.5.4.14 String.prototype.split (separator, limit)

Returns an Array object into which substrings of the result of converting this object to a String have been stored. The substrings are determined by searching from left to right for occurrences of separator; these occurrences are not part of any substring in the returned array, but serve to divide up the String value. The value of separator may be a String of any length or it may be a RegExp object (i.e., an object whose [[Class]] internal property is "RegExp"; see 15.10).

The value of separator may be an empty String, an empty regular expression, or a regular expression that can match an empty String. In this case, separator does not match the empty substring at the beginning or end of the input String, nor does it match the empty substring at the end of the previous separator match. (For example, if separator is the empty String, the String is split up into individual characters; the length of the result array equals the length of the String, and each substring contains one character.) If separator is a regular expression, only the first match at a given position of the this String is considered, even if backtracking could yield a non-empty-substring match at that position. (For example, "ab".split(/a*?/) evaluates to the array ["a","b"], while "ab".split(/a*/) evaluates to the array["","b"].)

If the this object is (or converts to) the empty String, the result depends on whether separator can match the empty String. If it can, the result array contains no elements. Otherwise, the result array contains one element, which is the empty String.

If separator is a regular expression that contains capturing parentheses, then each time separator is matched the results (including any undefined results) of the capturing parentheses are spliced into the output array. For example,

"A<B>bold</B>and<CODE>coded</CODE>".split(/<(\/)?([^<>]+)>/)
evaluates to the array

["A", undefined, "B", "bold", "/", "B", "and", undefined,
 "CODE", "coded", "/", "CODE", ""]
If separator is undefined, then the result array contains just one String, which is the this value (converted to a String). If limit is not undefined, then the output array is truncated so that it contains no more than limit elements.

When the split method is called, the following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let A be a new array created as if by the expression new Array()where Array is the standard built-in constructor with that name.
Let lengthA be 0.
If limit is undefined, let lim = 232–1; else let lim = ToUint32(limit).
Let s be the number of characters in S.
Let p = 0.
If separator is a RegExp object (its [[Class]] is "RegExp"), let R = separator; otherwise let R = ToString(separator).
If lim = 0, return A.
If separator is undefined, then
Call the [[DefineOwnProperty]] internal method of A with arguments "0", Property Descriptor {[[Value]]: S, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Return A.
If s = 0, then
Call SplitMatch(S, 0, R) and let z be its MatchResult result.
If z is not failure, return A.
Call the [[DefineOwnProperty]] internal method of A with arguments "0", Property Descriptor {[[Value]]: S, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Return A.
Let q = p.
Repeat, while q ≠ s
Call SplitMatch(S, q, R) and let z be its MatchResult result.
If z is failure, then let q = q+1.
Else, z is not failure
z must be a State. Let e be z's endIndex and let cap be z's captures array.
If e = p, then let q = q+1.
Else, e ≠ p
Let T be a String value equal to the substring of S consisting of the characters at positions p (inclusive) through q (exclusive).
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(lengthA), Property Descriptor {[[Value]]: T, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increment lengthA by 1.
If lengthA = lim, return A.
Let p = e.
Let i = 0.
Repeat, while i is not equal to the number of elements in cap.
Let i = i+1.
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(lengthA), Property Descriptor {[[Value]]: cap[i], [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increment lengthA by 1.
If lengthA = lim, return A.
Let q = p.
Let T be a String value equal to the substring of S consisting of the characters at positions p (inclusive) through s (exclusive).
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(lengthA), Property Descriptor {[[Value]]: T, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Return A.
The abstract operation SplitMatch takes three parameters, a String S, an integer q, and a String or RegExp R, and performs the following in order to return a MatchResult (see 15.10.2.1):

If R is a RegExp object (its [[Class]] is "RegExp"), then
Call the [[Match]] internal method of R giving it the arguments S and q, and return the MatchResult result.
Type(R) must be String. Let r be the number of characters in R.
Let s be the number of characters in S.
If q+r > s then return the MatchResult failure.
If there exists an integer i between 0 (inclusive) and r (exclusive) such that the character at position q+i of S is different from the character at position i of R, then return failure.
Let cap be an empty array of captures (see 15.10.2.1).
Return the State (q+r, cap). (see 15.10.2.1)
The length property of the split method is 2.

NOTE 1 The split method ignores the value of separator.global for separators that are RegExp objects.

NOTE 2 The split function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.15 String.prototype.substring (start, end)

The substring method takes two arguments, start and end, and returns a substring of the result of converting this object to a String, starting from character position start and running to, but not including, character position end of the String (or through the end of the String is end is undefined). The result is a String value, not a String object.

If either argument is NaN or negative, it is replaced with zero; if either argument is larger than the length of the String, it is replaced with the length of the String.

If start is larger than end, they are swapped.

The following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let len be the number of characters in S.
Let intStart be ToInteger(start).
If end is undefined, let intEnd be len; else let intEnd be ToInteger(end).
Let finalStart be min(max(intStart, 0), len).
Let finalEnd be min(max(intEnd, 0), len).
Let from be min(finalStart, finalEnd).
Let to be max(finalStart, finalEnd).
Return a String whose length is to - from, containing characters from S, namely the characters with indices from through to −1, in ascending order.
The length property of the substring method is 2.

NOTE The substring function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.16 String.prototype.toLowerCase ( )

The following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let L be a String where each character of L is either the Unicode lowercase equivalent of the corresponding character of S or the actual corresponding character of S if no Unicode lowercase equivalent exists.
Return L.
For the purposes of this operation, the 16-bit code units of the Strings are treated as code points in the Unicode Basic Multilingual Plane. Surrogate code points are directly transferred from S to L without any mapping.

The result must be derived according to the case mappings in the Unicode character database (this explicitly includes not only the UnicodeData.txt file, but also the SpecialCasings.txt file that accompanies it in Unicode 2.1.8 and later).

NOTE 1 The case mapping of some characters may produce multiple characters. In this case the result String may not be the same length as the source String. Because both toUpperCase and toLowerCase have context-sensitive behaviour, the functions are not symmetrical. In other words, s.toUpperCase().toLowerCase() is not necessarily equal to s.toLowerCase().

NOTE 2 The toLowerCase function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.17 String.prototype.toLocaleLowerCase ( )

This function works exactly the same as toLowerCase except that its result is intended to yield the correct result for the host environment’s current locale, rather than a locale-independent result. There will only be a difference in the few cases (such as Turkish) where the rules for that language conflict with the regular Unicode case mappings.

NOTE 1 The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

NOTE 2 The toLocaleLowerCase function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.18 String.prototype.toUpperCase ( )

This function behaves in exactly the same way as String.prototype.toLowerCase, except that characters are mapped to their uppercase equivalents as specified in the Unicode Character Database.

NOTE The toUpperCase function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.19 String.prototype.toLocaleUpperCase ( )

This function works exactly the same as toUpperCase except that its result is intended to yield the correct result for the host environment’s current locale, rather than a locale-independent result. There will only be a difference in the few cases (such as Turkish) where the rules for that language conflict with the regular Unicode case mappings.

NOTE 1 The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

NOTE 2 The toLocaleUpperCase function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.4.20 String.prototype.trim ( )

The following steps are taken:

Call CheckObjectCoercible passing the this value as its argument.
Let S be the result of calling ToString, giving it the this value as its argument.
Let T be a String value that is a copy of S with both leading and trailing white space removed. The definition of white space is the union of WhiteSpace and LineTerminator.
Return T.
NOTE The trim function is intentionally generic; it does not require that its this value be a String object. Therefore, it can be transferred to other kinds of objects for use as a method.

15.5.5 Properties of String Instances

String instances inherit properties from the String prototype object and their [[Class]] internal property value is "String". String instances also have a [[PrimitiveValue]] internal property, a length property, and a set of enumerable properties with array index names.

The [[PrimitiveValue]] internal property is the String value represented by this String object. The array index named properties correspond to the individual characters of the String value. A special [[GetOwnProperty]] internal method is used to specify the number, values, and attributes of the array index named properties.

15.5.5.1 length

The number of characters in the String value represented by this String object.

Once a String object is created, this property is unchanging. It has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.5.5.2 [[GetOwnProperty]] ( P )

String objects use a variation of the [[GetOwnProperty]] internal method used for other native ECMAScript objects (8.12.1). This special internal method provides access to named properties corresponding to the individual characters of String objects.

Assume S is a String object and P is a String.

When the [[GetOwnProperty]] internal method of S is called with property name P, the following steps are taken:

Let desc be the result of calling the default [[GetOwnProperty]] internal method (8.12.1) on S with argument P.
If desc is not undefined return desc.
If ToString(abs(ToInteger(P))) is not the same value as P, return undefined.
Let str be the String value of the [[PrimitiveValue]] internal property of S.
Let index be ToInteger(P).
Let len be the number of characters in str.
If len ≤ index, return undefined.
Let resultStr be a String of length 1, containing one character from str, specifically the character at position index, where the first (leftmost) character in str is considered to be at position 0, the next one at position 1, and so on.
Return a Property Descriptor { [[Value]]: resultStr, [[Enumerable]]: true, [[Writable]]: false, [[Configurable]]: false }