# グローバル

- 値
    - NaN
    - Infinity
    - undefined
- 関数
    - eval (x)
    - parseInt (string , radix)
    - parseFloat (string)
    - isNaN (number)
    - isFinite (number)
- URI関数
    - decodeURI (encodedURI)
    - decodeURIComponent (encodedURIComponent)
    - encodeURI (uri)
    - encodeURIComponent (uriComponent)
- コンストラクタ
    - Object ( ... )
    - Function ( ... )
    - Array ( ... )
    - String ( ... )
    - Boolean ( ... )
    - Number ( ... )
    - Date ( ... )
    - RegExp ( ... )
    - Error ( ... )
    - EvalError ( ... )
    - RangeError ( ... )
    - ReferenceError ( ... )
    - SyntaxError ( ... )
    - TypeError ( ... )
    - URIError ( ... )
- その他
    - Math
    - JSON

---

一意のグローバルオブジェクトは、制御がどの実行コンテキストに入る前にも作成されます。

特に指定がない限り、グローバル・オブジェクトの標準的な組み込みプロパティは、属性 {[[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: true} を持ちます。

グローバル・オブジェクトは、[[Construct]]内部プロパティを持たないため、new 演算子でグローバル・オブジェクトをコンストラクタとして使用することはできません。

グローバル・オブジェクトは、[[Call]]内部プロパティを持たないため、グローバル・オブジェクトを関数として呼び出すことはできません。

グローバル・オブジェクトの [[Prototype]] および [[Class]] 内部プロパティの値は、実装に依存します。

この仕様で定義されたプロパティに加えて、グローバル・オブジェクトは、追加のホスト定義プロパティを持つことができます。例えば、HTML 文書オブジェクトモデルでは、グローバルオブジェクトのウィンドウプロパティはグローバルオブジェクト自身です。

## グローバルオブジェクトのバリュープロパティ



__NaN__:

The value of NaN is NaN (see 8.5). This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

__Infinity__:

The value of Infinity is +∞ (see 8.5). This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

__undefined__:

The value of undefined is undefined (see 8.1). This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

## グローバルオブジェクトの関数プロパティ



__eval (x)__:

When the eval function is called with one argument x, the following steps are taken:

If Type(x) is not String, return x.
Let prog be the ECMAScript code that is the result of parsing x as a Program. If the parse fails, throw a SyntaxError exception (but see also clause 16).
Let evalCtx be the result of establishing a new execution context (10.4.2) for the eval code prog.
Let result be the result of evaluating the program prog.
Exit the running execution context evalCtx, restoring the previous execution context.
If result.type is normal and its completion value is a value V, then return the value V.
If result.type is normal and its completion value is empty, then return the value undefined.
Otherwise, result.type must be throw. Throw result.value as an exception.

Direct Call to Eval:

A direct call to the eval function is one that is expressed as a CallExpression that meets the following two conditions:

The Reference that is the result of evaluating the MemberExpression in the CallExpression has an environment record as its base value and its reference name is "eval".

The result of calling the abstract operation GetValue with that Reference as the argument is the standard built-in function defined in 15.1.2.1.

__parseInt (string , radix)__:

The parseInt function produces an integer value dictated by interpretation of the contents of the string argument according to the specified radix. Leading white space in string is ignored. If radix is undefined or 0, it is assumed to be 10 except when the number begins with the character pairs 0x or 0X, in which case a radix of 16 is assumed. If radix is 16, the number may also optionally begin with the character pairs 0x or 0X.

When the parseInt function is called, the following steps are taken:

Let inputString be ToString(string).
Let S be a newly created substring of inputString consisting of the first character that is not a StrWhiteSpaceChar and all characters following that character. (In other words, remove leading white space.) If inputString does not contain any such characters, let S be the empty string.
Let sign be 1.
If S is not empty and the first character of S is a minus sign -, let sign be −1.
If S is not empty and the first character of S is a plus sign + or a minus sign -, then remove the first character from S.
Let R = ToInt32(radix).
Let stripPrefix be true.
If R ≠ 0, then
If R < 2 or R > 36, then return NaN.
If R ≠ 16, let stripPrefix be false.
Else, R = 0
Let R = 10.
If stripPrefix is true, then
If the length of S is at least 2 and the first two characters of S are either “0x” or “0X”, then remove the first two characters from S and let R = 16.
If S contains any character that is not a radix-R digit, then let Z be the substring of S consisting of all characters before the first such character; otherwise, let Z be S.
If Z is empty, return NaN.
Let mathInt be the mathematical integer value that is represented by Z in radix-R notation, using the letters A-Z and a-z for digits with values 10 through 35. (However, if R is 10 and Z contains more than 20 significant digits, every significant digit after the 20th may be replaced by a 0 digit, at the option of the implementation; and if R is not 2, 4, 8, 10, 16, or 32, then mathInt may be an implementation-dependent approximation to the mathematical integer value that is represented by Z in radix-R notation.)
Let number be the Number value for mathInt.
Return sign × number.
NOTEparseInt may interpret only a leading portion of string as an integer value; it ignores any characters that cannot be interpreted as part of the notation of an integer, and no indication is given that any such characters were ignored.

__parseFloat (string)__:

The parseFloat function produces a Number value dictated by interpretation of the contents of the string argument as a decimal literal.

When the parseFloat function is called, the following steps are taken:

Let inputString be ToString(string).
Let trimmedString be a substring of inputString consisting of the leftmost character that is not a StrWhiteSpaceChar and all characters to the right of that character. (In other words, remove leading white space.) If inputString does not contain any such characters, let trimmedString be the empty string.
If neither trimmedString nor any prefix of trimmedString satisfies the syntax of a StrDecimalLiteral (see 9.3.1), return NaN.
Let numberString be the longest prefix of trimmedString, which might be trimmedString itself, that satisfies the syntax of a StrDecimalLiteral.
Return the Number value for the MV of numberString.
NOTEparseFloat may interpret only a leading portion of string as a Number value; it ignores any characters that cannot be interpreted as part of the notation of an decimal literal, and no indication is given that any such characters were ignored.

__isNaN (number)__:

Returns true if the argument coerces to NaN, and otherwise returns false.

If ToNumber(number) is NaN, return true.
Otherwise, return false.
NOTE A reliable way for ECMAScript code to test if a value X is a NaN is an expression of the form X !== X. The result will be true if and only if X is a NaN.

__isFinite (number)__:

Returns false if the argument coerces to NaN, +∞, or −∞, and otherwise returns true.

If ToNumber(number) is NaN, +∞, or −∞, return false.
Otherwise, return true.

## URIハンドリング関数プロパティ


Uniform Resource Identifiers, or URIs, are Strings that identify resources (e.g. web pages or files) and transport protocols by which to access them (e.g. HTTP or FTP) on the Internet. The ECMAScript language itself does not provide any support for using URIs except for functions that encode and decode URIs as described in 15.1.3.1, 15.1.3.2, 15.1.3.3 and 15.1.3.4.

NOTE Many implementations of ECMAScript provide additional functions and methods that manipulate web pages; these functions are beyond the scope of this standard.

A URI is composed of a sequence of components separated by component separators. The general form is:

Scheme : First / Second ; Third ? Fourth

where the italicised names represent components and “:”, “/”, “;” and “?” are reserved characters used as separators. The encodeURI and decodeURI functions are intended to work with complete URIs; they assume that any reserved characters in the URI are intended to have special meaning and so are not encoded. The encodeURIComponent and decodeURIComponent functions are intended to work with the individual component parts of a URI; they assume that any reserved characters represent text and so must be encoded so that they are not interpreted as reserved characters when the component is part of a complete URI.

The following lexical grammar specifies the form of encoded URIs.

Syntax

uri :::
uriCharactersopt
uriCharacters :::
uriCharacter uriCharactersopt
uriCharacter :::
uriReserved
uriUnescaped
uriEscaped
uriReserved ::: one of
; / ? : @ & = + $ ,
uriUnescaped :::
uriAlpha
DecimalDigit
uriMark
uriEscaped :::
% HexDigit HexDigit
uriAlpha ::: one of
a b c d e f g h i j k l m n o p q r s t u v w x y z
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
uriMark ::: one of
- _ . ! ~ * ' ( )
NOTE The above syntax is based upon RFC 2396 and does not reflect changes introduced by the more recent RFC 3986.

When a character to be included in a URI is not listed above or is not intended to have the special meaning sometimes given to the reserved characters, that character must be encoded. The character is transformed into its UTF-8 encoding, with surrogate pairs first converted from UTF-16 to the corresponding code point value. (Note that for code units in the range [0,127] this results in a single octet with the same value.) The resulting sequence of octets is then transformed into a String with each octet represented by an escape sequence of the form “%xx”.

The encoding and escaping process is described by the abstract operation Encode taking two String arguments string and unescapedSet.

Let strLen be the number of characters in string.
Let R be the empty String.
Let k be 0.
Repeat
If k equals strLen, return R.
Let C be the character at position k within string.
If C is in unescapedSet, then
Let S be a String containing only the character C.
Let R be a new String value computed by concatenating the previous value of R and S.
Else, C is not in unescapedSet
If the code unit value of C is not less than 0xDC00 and not greater than 0xDFFF, throw a URIError exception.
If the code unit value of C is less than 0xD800 or greater than 0xDBFF, then
Let V be the code unit value of C.
Else,
Increase k by 1.
If k equals strLen, throw a URIError exception.
Let kChar be the code unit value of the character at position k within string.
If kChar is less than 0xDC00 or greater than 0xDFFF, throw a URIError exception.
Let V be (((the code unit value of C) – 0xD800) × 0x400 + (kChar – 0xDC00) + 0x10000).
Let Octets be the array of octets resulting by applying the UTF-8 transformation to V, and let L be the array size.
Let j be 0.
Repeat, while j < L
Let jOctet be the value at position j within Octets.
Let S be a String containing three characters “%XY” where XY are two uppercase hexadecimal digits encoding the value of jOctet.
Let R be a new String value computed by concatenating the previous value of R and S.
Increase j by 1.
Increase k by 1.
The unescaping and decoding process is described by the abstract operation Decode taking two String arguments string and reservedSet.

Let strLen be the number of characters in string.
Let R be the empty String.
Let k be 0.
Repeat
If k equals strLen, return R.
Let C be the character at position k within string.
If C is not ‘%’, then
Let S be the String containing only the character C.
Else, C is ‘%’
Let start be k.
If k + 2 is greater than or equal to strLen, throw a URIError exception.
If the characters at position (k+1) and (k + 2) within string do not represent hexadecimal digits, throw a URIError exception.
Let B be the 8-bit value represented by the two hexadecimal digits at position (k + 1) and (k + 2).
Increment k by 2.
If the most significant bit in B is 0, then
Let C be the character with code unit value B.
If C is not in reservedSet, then
Let S be the String containing only the character C.
Else, C is in reservedSet
Let S be the substring of string from position start to position k included.
Else, the most significant bit in B is 1
Let n be the smallest non-negative number such that (B << n) & 0x80 is equal to 0.
If n equals 1 or n is greater than 4, throw a URIError exception.
Let Octets be an array of 8-bit integers of size n.
Put B into Octets at position 0.
If k + (3 × (n – 1)) is greater than or equal to strLen, throw a URIError exception.
Let j be 1.
Repeat, while j < n
Increment k by 1.
If the character at position k is not ‘%’, throw a URIError exception.
If the characters at position (k +1) and (k + 2) within string do not represent hexadecimal digits, throw a URIError exception.
Let B be the 8-bit value represented by the two hexadecimal digits at position (k + 1) and (k + 2).
If the two most significant bits in B are not 10, throw a URIError exception.
Increment k by 2.
Put B into Octets at position j.
Increment j by 1.
Let V be the value obtained by applying the UTF-8 transformation to Octets, that is, from an array of octets into a 21-bit value. If Octets does not contain a valid UTF-8 encoding of a Unicode code point throw an URIError exception.
If V is less than 0x10000, then
Let C be the character with code unit value V.
If C is not in reservedSet, then
Let S be the String containing only the character C.
Else, C is in reservedSet
Let S be the substring of string from position start to position k included.
Else, V is ≥ 0x10000
Let L be (((V – 0x10000) & 0x3FF) + 0xDC00).
Let H be ((((V – 0x10000) >> 10) & 0x3FF) + 0xD800).
Let S be the String containing the two characters with code unit values H and L.
Let R be a new String value computed by concatenating the previous value of R and S.
Increase k by 1.
NOTE This syntax of Uniform Resource Identifiers is based upon RFC 2396 and does not reflect the more recent RFC 3986 which replaces RFC 2396. A formal description and implementation of UTF-8 is given in RFC 3629.

In UTF-8, characters are encoded using sequences of 1 to 6 octets. The only octet of a "sequence" of one has the higher-order bit set to 0, the remaining 7 bits being used to encode the character value. In a sequence of n octets, n>1, the initial octet has the n higher-order bits set to 1, followed by a bit set to 0. The remaining bits of that octet contain bits from the value of the character to be encoded. The following octets all have the higher-order bit set to 1 and the following bit set to 0, leaving 6 bits in each to contain bits from the character to be encoded. The possible UTF-8 encodings of ECMAScript characters are specified in Table 21.

Table 21 — UTF-8 Encodings
Code Unit Value	Representation	1st Octet	2nd Octet	3rd Octet	4th Octet
0x0000 - 0x007F	00000000 0zzzzzzz	0zzzzzzz			
0x0080 - 0x07FF	00000yyy yyzzzzzz	110yyyyy	10zzzzzz		
0x0800 - 0xD7FF	xxxxyyyy yyzzzzzz	1110xxxx	10yyyyyy	10zzzzzz	
0xD800 - 0xDBFF

followed by

0xDC00 – 0xDFFF

110110vv vvwwwwxx

followed by

110111yy yyzzzzzz

11110uuu	10uuwwww	10xxyyyy	10zzzzzz
0xD800 - 0xDBFF

not followed by

0xDC00 – 0xDFFF

causes URIError				
0xDC00 – 0xDFFF	causes URIError				
0xE000 - 0xFFFF	xxxxyyyy yyzzzzzz	1110xxxx	10yyyyyy	10zzzzzz	
Where

uuuuu = vvvv + 1

to account for the addition of 0x10000 as in Surrogates, section 3.7, of the Unicode Standard.

The range of code unit values 0xD800-0xDFFF is used to encode surrogate pairs; the above transformation combines a UTF-16 surrogate pair into a UTF-32 representation and encodes the resulting 21-bit value in UTF-8. Decoding reconstructs the surrogate pair.

RFC 3629 prohibits the decoding of invalid UTF-8 octet sequences. For example, the invalid sequence C0 80 must not decode into the character U+0000. Implementations of the Decode algorithm are required to throw a URIError when encountering such invalid sequences.

__decodeURI (encodedURI)__:

The decodeURI function computes a new version of a URI in which each escape sequence and UTF-8 encoding of the sort that might be introduced by the encodeURI function is replaced with the character that it represents. Escape sequences that could not have been introduced by encodeURI are not replaced.

When the decodeURI function is called with one argument encodedURI, the following steps are taken:

Let uriString be ToString(encodedURI).
Let reservedURISet be a String containing one instance of each character valid in uriReserved plus “#”.
Return the result of calling Decode(uriString, reservedURISet)
NOTE The character “#” is not decoded from escape sequences even though it is not a reserved URI character.

__decodeURIComponent (encodedURIComponent)__:

The decodeURIComponent function computes a new version of a URI in which each escape sequence and UTF-8 encoding of the sort that might be introduced by the encodeURIComponent function is replaced with the character that it represents.

When the decodeURIComponent function is called with one argument encodedURIComponent, the following steps are taken:

Let componentString be ToString(encodedURIComponent).
Let reservedURIComponentSet be the empty String.
Return the result of calling Decode(componentString, reservedURIComponentSet)

__encodeURI (uri)__:

The encodeURI function computes a new version of a URI in which each instance of certain characters is replaced by one, two, three, or four escape sequences representing the UTF-8 encoding of the character.

When the encodeURI function is called with one argument uri, the following steps are taken:

Let uriString be ToString(uri).
Let unescapedURISet be a String containing one instance of each character valid in uriReserved and uriUnescaped plus “#”.
Return the result of calling Encode(uriString, unescapedURISet)
NOTE The character “#” is not encoded to an escape sequence even though it is not a reserved or unescaped URI character.

__encodeURIComponent (uriComponent)__:

The encodeURIComponent function computes a new version of a URI in which each instance of certain characters is replaced by one, two, three, or four escape sequences representing the UTF-8 encoding of the character.

When the encodeURIComponent function is called with one argument uriComponent, the following steps are taken:

Let componentString be ToString(uriComponent).
Let unescapedURIComponentSet be a String containing one instance of each character valid in uriUnescaped.
Return the result of calling Encode(componentString, unescapedURIComponentSet)

## グローバルオブジェクトのコンストラクタプロパティ

- Object ( . . . )
- Function ( . . . )
- Array ( . . . )
- String ( . . . )
- Boolean ( . . . )
- Number ( . . . )
- Date ( . . . )
- RegExp ( . . . )
- Error ( . . . )
- EvalError ( . . . )
- RangeError ( . . . )
- ReferenceError ( . . . )
- SyntaxError ( . . . )
- TypeError ( . . . )
- URIError ( . . . )

## グローバルオブジェクトのその他のプロパティ

- Math
- JSON