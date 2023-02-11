# JSON

parse ( text [ , reviver ] )
stringify ( value [ , replacer [ , space ] ] )



The JSON object is a single object that contains two functions, parse and stringify, that are used to parse and construct JSON texts. The JSON Data Interchange Format is described in RFC 4627 <http://www.ietf.org/rfc/rfc4627.txt>. The JSON interchange format used in this specification is exactly that described by RFC 4627 with two exceptions:

The top level JSONText production of the ECMAScript JSON grammar may consist of any JSONValue rather than being restricted to being a JSONObject or a JSONArray as specified by RFC 4627.

Conforming implementations of JSON.parse and JSON.stringify must support the exact interchange format described in this specification without any deletions or extensions to the format. This differs from RFC 4627 which permits a JSON parser to accept non-JSON forms and extensions.

The value of the [[Prototype]] internal property of the JSON object is the standard built-in Object prototype object (15.2.4). The value of the [[Class]] internal property of the JSON object is "JSON". The value of the [[Extensible]] internal property of the JSON object is set to true.

The JSON object does not have a [[Construct]] internal property; it is not possible to use the JSON object as a constructor with the new operator.

The JSON object does not have a [[Call]] internal property; it is not possible to invoke the JSON object as a function.

15.12.1 The JSON Grammar

JSON.stringify produces a String that conforms to the following JSON grammar. JSON.parse accepts a String that conforms to the JSON grammar.

15.12.1.1 The JSON Lexical Grammar

JSON is similar to ECMAScript source text in that it consists of a sequence of characters conforming to the rules of SourceCharacter. The JSON Lexical Grammar defines the tokens that make up a JSON text similar to the manner that the ECMAScript lexical grammar defines the tokens of an ECMAScript source text. The JSON Lexical grammar only recognises the white space character specified by the production JSONWhiteSpace. The JSON lexical grammar shares some productions with the ECMAScript lexical grammar. All nonterminal symbols of the grammar that do not begin with the characters “JSON” are defined by productions of the ECMAScript lexical grammar.

Syntax

JSONWhiteSpace ::

<TAB>
<CR>
<LF>
<SP>
JSONString ::
" JSONStringCharactersopt "
JSONStringCharacters ::
JSONStringCharacter JSONStringCharactersopt
JSONStringCharacter ::

SourceCharacter but not one of " or \ or U+0000 through U+001F
\ JSONEscapeSequence
JSONEscapeSequence ::
JSONEscapeCharacter
UnicodeEscapeSequence
JSONEscapeCharacter :: one of
" / \ b f n r t
JSONNumber ::
-opt DecimalIntegerLiteral JSONFractionopt ExponentPartopt
JSONFraction ::
. DecimalDigits
JSONNullLiteral ::
NullLiteral
JSONBooleanLiteral ::
BooleanLiteral
15.12.1.2 The JSON Syntactic Grammar

The JSON Syntactic Grammar defines a valid JSON text in terms of tokens defined by the JSON lexical grammar. The goal symbol of the grammar is JSONText.

Syntax

JSONText :
JSONValue
JSONValue :
JSONNullLiteral
JSONBooleanLiteral
JSONObject
JSONArray
JSONString
JSONNumber
JSONObject :
{ }
{ JSONMemberList }
JSONMember :
JSONString : JSONValue
JSONMemberList :
JSONMember
JSONMemberList , JSONMember
JSONArray :
[ ]
[ JSONElementList ]
JSONElementList :
JSONValue
JSONElementList , JSONValue
15.12.2 parse ( text [ , reviver ] )

The parse function parses a JSON text (a JSON-formatted String) and produces an ECMAScript value. The JSON format is a restricted form of ECMAScript literal. JSON objects are realized as ECMAScript objects. JSON arrays are realized as ECMAScript arrays. JSON strings, numbers, booleans, and null are realized as ECMAScript Strings, Numbers, Booleans, and null. JSON uses a more limited set of white space characters than WhiteSpace and allows Unicode code points U+2028 and U+2029 to directly appear in JSONString literals without using an escape sequence. The process of parsing is similar to 11.1.4 and 11.1.5 as constrained by the JSON grammar.

The optional reviver parameter is a function that takes two parameters, (key and value). It can filter and transform the results. It is called with each of the key/value pairs produced by the parse, and its return value is used instead of the original value. If it returns what it received, the structure is not modified. If it returns undefined then the property is deleted from the result.

Let JText be ToString(text).
Parse JText using the grammars in 15.12.1. Throw a SyntaxError exception if JText did not conform to the JSON grammar for the goal symbol JSONText.
Let unfiltered be the result of parsing and evaluating JText as if it was the source text of an ECMAScript Program but using JSONString in place of StringLiteral. Note that since JText conforms to the JSON grammar this result will be either a primitive value or an object that is defined by either an ArrayLiteral or an ObjectLiteral.
If IsCallable(reviver) is true, then
Let root be a new object created as if by the expression new Object(), where Object is the standard built-in constructor with that name.
Call the [[DefineOwnProperty]] internal method of root with the empty String, the PropertyDescriptor {[[Value]]: unfiltered, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false as arguments.
Return the result of calling the abstract operation Walk, passing root and the empty String. The abstract operation Walk is described below.
Else
Return unfiltered.
The abstract operation Walk is a recursive abstract operation that takes two parameters: a holder object and the String name of a property in that object. Walk uses the value of reviver that was originally passed to the above parse function.

Let val be the result of calling the [[Get]] internal method of holder with argument name.
If val is an object, then
If the [[Class]] internal property of val is "Array"
Set I to 0.
Let len be the result of calling the [[Get]] internal method of val with argument "length".
Repeat while I < len,
Let newElement be the result of calling the abstract operation Walk, passing val and ToString(I).
If newElement is undefined, then
Call the [[Delete]] internal method of val with ToString(I) and false as arguments.
Else
Call the [[DefineOwnProperty]] internal method of val with arguments ToString(I), the Property Descriptor {[[Value]]: newElement, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Add 1 to I.
Else
Let keys be an internal List of String values consisting of the names of all the own properties of val whose [[Enumerable]] attribute is true. The ordering of the Strings should be the same as that used by the Object.keys standard built-in function.
For each String P in keys do,
Let newElement be the result of calling the abstract operation Walk, passing val and P.
If newElement is undefined, then
Call the [[Delete]] internal method of val with P and false as arguments.
Else
Call the [[DefineOwnProperty]] internal method of val with arguments P, the Property Descriptor {[[Value]]: newElement, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Return the result of calling the [[Call]] internal method of reviver passing holder as the this value and with an argument list consisting of name and val.
It is not permitted for a conforming implementation of JSON.parse to extend the JSON grammars. If an implementation wishes to support a modified or extended JSON interchange format it must do so by defining a different parse function.

NOTE In the case where there are duplicate name Strings within an object, lexically preceding values for the same key shall be overwritten.

15.12.3 stringify ( value [ , replacer [ , space ] ] )

The stringify function returns a String in JSON format representing an ECMAScript value. It can take three parameters. The first parameter is required. The value parameter is an ECMAScript value, which is usually an object or array, although it can also be a String, Boolean, Number or null. The optional replacer parameter is either a function that alters the way objects and arrays are stringified, or an array of Strings and Numbers that acts as a white list for selecting the object properties that will be stringified. The optional space parameter is a String or Number that allows the result to have white space injected into it to improve human readability.

These are the steps in stringifying an object:

Let stack be an empty List.
Let indent be the empty String.
Let PropertyList and ReplacerFunction be undefined.
If Type(replacer) is Object, then
If IsCallable(replacer) is true, then
Let ReplacerFunction be replacer.
Else if the [[Class]] internal property of replacer is "Array", then
Let PropertyList be an empty internal List
For each value v of a property of replacer that has an array index property name. The properties are enumerated in the ascending array index order of their names.
Let item be undefined.
If Type(v) is String then let item be v.
Else if Type(v) is Number then let item be ToString(v).
Else if Type(v) is Object then,
If the [[Class]] internal property of v is "String" or "Number" then let item be ToString(v).
If item is not undefined and item is not currently an element of PropertyList then,
Append item to the end of PropertyList.
If Type(space) is Object then,
If the [[Class]] internal property of space is "Number" then,
Let space be ToNumber(space).
Else if the [[Class]] internal property of space is "String" then,
Let space be ToString(space).
If Type(space) is Number
Let space be min(10, ToInteger(space)).
Set gap to a String containing space space characters. This will be the empty String if space is less than 1.
Else if Type(space) is String
If the number of characters in space is 10 or less, set gap to space otherwise set gap to a String consisting of the first 10 characters of space.
Else
Set gap to the empty String.
Let wrapper be a new object created as if by the expression new Object(), where Object is the standard built-in constructor with that name.
Call the [[DefineOwnProperty]] internal method of wrapper with arguments the empty String, the Property Descriptor {[[Value]]: value, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Return the result of calling the abstract operation Str with the empty String and wrapper.
The abstract operation Str(key, holder) has access to ReplacerFunction from the invocation of the stringify method. Its algorithm is as follows:

Let value be the result of calling the [[Get]] internal method of holder with argument key.
If Type(value) is Object, then
Let toJSON be the result of calling the [[Get]] internal method of value with argument "toJSON".
If IsCallable(toJSON) is true
Let value be the result of calling the [[Call]] internal method of toJSON passing value as the this value and with an argument list consisting of key.
If ReplacerFunction is not undefined, then
Let value be the result of calling the [[Call]] internal method of ReplacerFunction passing holder as the this value and with an argument list consisting of key and value.
If Type(value) is Object then,
If the [[Class]] internal property of value is "Number" then,
Let value be ToNumber(value).
Else if the [[Class]] internal property of value is "String" then,
Let value be ToString(value).
Else if the [[Class]] internal property of value is "Boolean" then,
Let value be the value of the [[PrimitiveValue]] internal property of value.
If value is null then return "null".
If value is true then return "true".
If value is false then return "false".
If Type(value) is String, then return the result of calling the abstract operation Quote with argument value.
If Type(value) is Number
If value is finite then return ToString(value).
Else, return "null".
If Type(value) is Object, and IsCallable(value) is false
If the [[Class]] internal property of value is "Array" then
Return the result of calling the abstract operation JA with argument value.
Else, return the result of calling the abstract operation JO with argument value.
Return undefined.
The abstract operation Quote(value) wraps a String value in double quotes and escapes characters within it.

Let product be the double quote character.
For each character C in value
If C is the double quote character or the backslash character
Let product be the concatenation of product and the backslash character.
Let product be the concatenation of product and C.
Else if C is backspace, formfeed, newline, carriage return, or tab
Let product be the concatenation of product and the backslash character.
Let abbrev be the character corresponding to the value of C as follows:
backspace	"b"
formfeed	"f"
newline	"n"
carriage return	"r"
tab	"t"
Let product be the concatenation of product and abbrev.
Else if C is a control character having a code unit value less than the space character
Let product be the concatenation of product and the backslash character.
Let product be the concatenation of product and "u".
Let hex be the result of converting the numeric code unit value of C to a String of four hexadecimal digits.
Let product be the concatenation of product and hex.
Else
Let product be the concatenation of product and C.
Let product be the concatenation of product and the double quote character.
Return product.
The abstract operation JO(value) serializes an object. It has access to the stack, indent, gap, PropertyList, ReplacerFunction, and space of the invocation of the stringify method.

If stack contains value then throw a TypeError exception because the structure is cyclical.
Append value to stack.
Let stepback be indent.
Let indent be the concatenation of indent and gap.
If PropertyList is not undefined, then
Let K be PropertyList.
Else
Let K be an internal List of Strings consisting of the names of all the own properties of value whose [[Enumerable]] attribute is true. The ordering of the Strings should be the same as that used by the Object.keys standard built-in function.
Let partial be an empty List.
For each element P of K.
Let strP be the result of calling the abstract operation Str with arguments P and value.
If strP is not undefined
Let member be the result of calling the abstract operation Quote with argument P.
Let member be the concatenation of member and the colon character.
If gap is not the empty String
Let member be the concatenation of member and the space character.
Let member be the concatenation of member and strP.
Append member to partial.
If partial is empty, then
Let final be "{}".
Else
If gap is the empty String
Let properties be a String formed by concatenating all the element Strings of partial with each adjacent pair of Strings separated with the comma character. A comma is not inserted either before the first String or after the last String.
Let final be the result of concatenating "{", properties, and "}".
Else gap is not the empty String
Let separator be the result of concatenating the comma character, the line feed character, and indent.
Let properties be a String formed by concatenating all the element Strings of partial with each adjacent pair of Strings separated with separator. The separator String is not inserted either before the first String or after the last String.
Let final be the result of concatenating "{", the line feed character, indent, properties, the line feed character, stepback, and "}".
Remove the last element of stack.
Let indent be stepback.
Return final.
The abstract operation JA(value) serializes an array. It has access to the stack, indent, gap, and space of the invocation of the stringify method. The representation of arrays includes only the elements between zero and array.length – 1 inclusive. Named properties are excluded from the stringification. An array is stringified as an open left bracket, elements separated by comma, and a closing right bracket.

If stack contains value then throw a TypeError exception because the structure is cyclical.
Append value to stack.
Let stepback be indent.
Let indent be the concatenation of indent and gap.
Let partial be an empty List.
Let len be the result of calling the [[Get]] internal method of value with argument "length".
Let index be 0.
Repeat while index < len
Let strP be the result of calling the abstract operation Str with arguments ToString(index) and value.
If strP is undefined
Append "null" to partial.
Else
Append strP to partial.
Increment index by 1.
If partial is empty ,then
Let final be "[]".
Else
If gap is the empty String
Let properties be a String formed by concatenating all the element Strings of partial with each adjacent pair of Strings separated with the comma character. A comma is not inserted either before the first String or after the last String.
Let final be the result of concatenating "[", properties, and "]".
Else
Let separator be the result of concatenating the comma character, the line feed character, and indent.
Let properties be a String formed by concatenating all the element Strings of partial with each adjacent pair of Strings separated with separator. The separator String is not inserted either before the first String or after the last String.
Let final be the result of concatenating "[", the line feed character, indent, properties, the line feed character, stepback, and "]".
Remove the last element of stack.
Let indent be stepback.
Return final.
NOTE 1 JSON structures are allowed to be nested to any depth, but they must be acyclic. If value is or contains a cyclic structure, then the stringify function must throw a TypeError exception. This is an example of a value that cannot be stringified:

a = [];
a[0] = a;
my_text = JSON.stringify(a); // This must throw an TypeError.
NOTE 2 Symbolic primitive values are rendered as follows:

The null value is rendered in JSON text as the String null.
The undefined value is not rendered.
The true value is rendered in JSON text as the String true.
The false value is rendered in JSON text as the String false.
NOTE 3 String values are wrapped in double quotes. The characters " and \ are escaped with \ prefixes. Control characters are replaced with escape sequences \uHHHH, or with the shorter forms, \b (backspace), \f (formfeed), \n (newline), \r (carriage return), \t (tab).

NOTE 4 Finite numbers are stringified as if by calling ToString(number). NaN and Infinity regardless of sign are represented as the String null.

NOTE 5 Values that do not have a JSON representation (such as undefined and functions) do not produce a String. Instead they produce the undefined value. In arrays these values are represented as the String null. In objects an unrepresentable value causes the property to be excluded from stringification.

NOTE 6 An object is rendered as an opening left brace followed by zero or more properties, separated with commas, closed with a right brace. A property is a quoted String representing the key or property name, a colon, and then the stringified property value. An array is rendered as an opening left bracket followed by zero or more values, separated with commas, closed with a right bracket.