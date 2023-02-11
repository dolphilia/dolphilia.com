# RegExp (正規表現)

RegExp(pattern, flags)

new RegExp(pattern, flags)

RegExp.prototype

RegExp.prototype.constructor
RegExp.prototype.exec(string)
RegExp.prototype.test(string)
RegExp.prototype.toString()

source
global
ignoreCase
multiline
lastIndex





A RegExp object contains a regular expression and the associated flags.

NOTE The form and functionality of regular expressions is modelled after the regular expression facility in the Perl 5 programming language.

15.10.1 Patterns

The RegExp constructor applies the following grammar to the input pattern String. An error occurs if the grammar cannot interpret the String as an expansion of Pattern.

Syntax

Pattern ::
Disjunction
Disjunction ::
Alternative
Alternative | Disjunction
Alternative ::
[empty]
Alternative Term
Term ::
Assertion
Atom
Atom Quantifier
Assertion ::
^
$
\ b
\ B
( ? = Disjunction )
( ? ! Disjunction )
Quantifier ::
QuantifierPrefix
QuantifierPrefix ?
QuantifierPrefix ::
*
+
?
{ DecimalDigits }
{ DecimalDigits , }
{ DecimalDigits , DecimalDigits }
Atom ::
PatternCharacter
.
\ AtomEscape
CharacterClass
( Disjunction )
( ? : Disjunction )
PatternCharacter ::
SourceCharacter but not one of
^ $ \ . * + ? ( ) [ ] { } |
AtomEscape ::
DecimalEscape
CharacterEscape
CharacterClassEscape
CharacterEscape ::
ControlEscape
c ControlLetter
HexEscapeSequence
UnicodeEscapeSequence
IdentityEscape
ControlEscape :: one of
f n r t v
ControlLetter :: one of
a b c d e f g h i j k l m n o p q r s t u v w x y z
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
IdentityEscape ::
SourceCharacter but not IdentifierPart
<ZWJ>
<ZWNJ>
DecimalEscape ::
DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
CharacterClassEscape :: one of
d D s S w W
CharacterClass ::
[ [lookahead ∉ {^}] ClassRanges ]
[ ^ ClassRanges ]
ClassRanges ::
[empty]
NonemptyClassRanges
NonemptyClassRanges ::
ClassAtom
ClassAtom NonemptyClassRangesNoDash
ClassAtom - ClassAtom ClassRanges
NonemptyClassRangesNoDash ::
ClassAtom
ClassAtomNoDash NonemptyClassRangesNoDash
ClassAtomNoDash - ClassAtom ClassRanges
ClassAtom ::
-
ClassAtomNoDash
ClassAtomNoDash ::
SourceCharacter but not one of \ or ] or -
\ ClassEscape
ClassEscape ::
DecimalEscape
b
CharacterEscape
CharacterClassEscape
15.10.2 Pattern Semantics

A regular expression pattern is converted into an internal procedure using the process described below. An implementation is encouraged to use more efficient algorithms than the ones listed below, as long as the results are the same. The internal procedure is used as the value of a RegExp object’s [[Match]] internal property.

15.10.2.1 Notation

The descriptions below use the following variables:

Input is the String being matched by the regular expression pattern. The notation input[n] means the nth character of input, where n can range between 0 (inclusive) and InputLength (exclusive).

InputLength is the number of characters in the Input String.

NcapturingParens is the total number of left capturing parentheses (i.e. the total number of times the Atom :: ( Disjunction ) production is expanded) in the pattern. A left capturing parenthesis is any ( pattern character that is matched by the ( terminal of the Atom :: ( Disjunction ) production.

IgnoreCase is the setting of the RegExp object's ignoreCase property.

Multiline is the setting of the RegExp object’s multiline property.

Furthermore, the descriptions below use the following internal data structures:

A CharSet is a mathematical set of characters.

A State is an ordered pair (endIndex, captures) where endIndex is an integer and captures is an internal array of NcapturingParens values. States are used to represent partial match states in the regular expression matching algorithms. The endIndex is one plus the index of the last input character matched so far by the pattern, while captures holds the results of capturing parentheses. The nth element of captures is either a String that represents the value obtained by the nth set of capturing parentheses or undefined if the nth set of capturing parentheses hasn’t been reached yet. Due to backtracking, many States may be in use at any time during the matching process.

A MatchResult is either a State or the special token failure that indicates that the match failed.

A Continuation procedure is an internal closure (i.e. an internal procedure with some arguments already bound to values) that takes one State argument and returns a MatchResult result. If an internal closure references variables bound in the function that creates the closure, the closure uses the values that these variables had at the time the closure was created. The Continuation attempts to match the remaining portion (specified by the closure's already-bound arguments) of the pattern against the input String, starting at the intermediate state given by its State argument. If the match succeeds, the Continuation returns the final State that it reached; if the match fails, the Continuation returns failure.

A Matcher procedure is an internal closure that takes two arguments -- a State and a Continuation -- and returns a MatchResult result. A Matcher attempts to match a middle subpattern (specified by the closure's already-bound arguments) of the pattern against the input String, starting at the intermediate state given by its State argument. The Continuation argument should be a closure that matches the rest of the pattern. After matching the subpattern of a pattern to obtain a new State, the Matcher then calls Continuation on that new State to test if the rest of the pattern can match as well. If it can, the Matcher returns the State returned by Continuation; if not, the Matcher may try different choices at its choice points, repeatedly calling Continuation until it either succeeds or all possibilities have been exhausted.

An AssertionTester procedure is an internal closure that takes a State argument and returns a Boolean result. The assertion tester tests a specific condition (specified by the closure's already-bound arguments) against the current place in the input String and returns true if the condition matched or false if not.

An EscapeValue is either a character or an integer. An EscapeValue is used to denote the interpretation of a DecimalEscape escape sequence: a character ch means that the escape sequence is interpreted as the character ch, while an integer n means that the escape sequence is interpreted as a backreference to the nth set of capturing parentheses.

15.10.2.2 Pattern

The production Pattern :: Disjunction evaluates as follows:

Evaluate Disjunction to obtain a Matcher m.
Return an internal closure that takes two arguments, a String str and an integer index, and performs the following:
Let Input be the given String str. This variable will be used throughout the algorithms in 15.10.2.
Let InputLength be the length of Input. This variable will be used throughout the algorithms in 15.10.2.
Let c be a Continuation that always returns its State argument as a successful MatchResult.
Let cap be an internal array of NcapturingParens undefined values, indexed 1 through NcapturingParens.
Let x be the State (index, cap).
Call m(x, c) and return its result.
NOTE A Pattern evaluates ("compiles") to an internal procedure value. RegExp.prototype.exec can then apply this procedure to a String and an offset within the String to determine whether the pattern would match starting at exactly that offset within the String, and, if it does match, what the values of the capturing parentheses would be. The algorithms in 15.10.2 are designed so that compiling a pattern may throw a SyntaxError exception; on the other hand, once the pattern is successfully compiled, applying its result internal procedure to find a match in a String cannot throw an exception (except for any host-defined exceptions that can occur anywhere such as out-of-memory).

15.10.2.3 Disjunction

The production Disjunction :: Alternative evaluates by evaluating Alternative to obtain a Matcher and returning that Matcher.

The production Disjunction :: Alternative | Disjunction evaluates as follows:

Evaluate Alternative to obtain a Matcher m1.
Evaluate Disjunction to obtain a Matcher m2.
Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following:
Call m1(x, c) and let r be its result.
If r isn't failure, return r.
Call m2(x, c) and return its result.
NOTE The | regular expression operator separates two alternatives. The pattern first tries to match the left Alternative (followed by the sequel of the regular expression); if it fails, it tries to match the right Disjunction (followed by the sequel of the regular expression). If the left Alternative, the right Disjunction, and the sequel all have choice points, all choices in the sequel are tried before moving on to the next choice in the left Alternative. If choices in the left Alternative are exhausted, the right Disjunction is tried instead of the left Alternative. Any capturing parentheses inside a portion of the pattern skipped by | produce undefined values instead of Strings. Thus, for example,

/a|ab/.exec("abc")
returns the result "a" and not "ab". Moreover,

/((a)|(ab))((c)|(bc))/.exec("abc")
returns the array

["abc", "a", "a", undefined, "bc", undefined, "bc"]
and not

["abc", "ab", undefined, "ab", "c", "c", undefined]
15.10.2.4 Alternative

The production Alternative :: [empty] evaluates by returning a Matcher that takes two arguments, a State x and a Continuation c, and returns the result of calling c(x).

The production Alternative :: Alternative Term evaluates as follows:

Evaluate Alternative to obtain a Matcher m1.
Evaluate Term to obtain a Matcher m2.
Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following:
Create a Continuation d that takes a State argument y and returns the result of calling m2(y, c).
Call m1(x, d) and return its result.
NOTE Consecutive Terms try to simultaneously match consecutive portions of the input String. If the left Alternative, the right Term, and the sequel of the regular expression all have choice points, all choices in the sequel are tried before moving on to the next choice in the right Term, and all choices in the right Term are tried before moving on to the next choice in the left Alternative.

15.10.2.5 Term

The production Term :: Assertion evaluates by returning an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following:

Evaluate Assertion to obtain an AssertionTester t.
Call t(x) and let r be the resulting Boolean value.
If r is false, return failure.
Call c(x) and return its result.
The production Term :: Atom evaluates by evaluating Atom to obtain a Matcher and returning that Matcher.

The production Term :: Atom Quantifier evaluates as follows:

Evaluate Atom to obtain a Matcher m.
Evaluate Quantifier to obtain the three results: an integer min, an integer (or ∞) max, and Boolean greedy.
If max is finite and less than min, then throw a SyntaxError exception.
Let parenIndex be the number of left capturing parentheses in the entire regular expression that occur to the left of this production expansion's Term. This is the total number of times the Atom :: ( Disjunction ) production is expanded prior to this production's Term plus the total number of Atom :: ( Disjunction ) productions enclosing this Term.
Let parenCount be the number of left capturing parentheses in the expansion of this production's Atom. This is the total number of Atom :: ( Disjunction ) productions enclosed by this production's Atom.
Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following:
Call RepeatMatcher(m, min, max, greedy, x, c, parenIndex, parenCount) and return its result.
The abstract operation RepeatMatcher takes eight parameters, a Matcher m, an integer min, an integer (or ∞) max, a Boolean greedy, a State x, a Continuation c, an integer parenIndex, and an integer parenCount, and performs the following:

If max is zero, then call c(x) and return its result.
Create an internal Continuation closure d that takes one State argument y and performs the following:
If min is zero and y's endIndex is equal to x's endIndex, then return failure.
If min is zero then let min2 be zero; otherwise let min2 be min–1.
If max is ∞, then let max2 be ∞; otherwise let max2 be max–1.
Call RepeatMatcher(m, min2, max2, greedy, y, c, parenIndex, parenCount) and return its result.
Let cap be a fresh copy of x's captures internal array.
For every integer k that satisfies parenIndex < k and k ≤ parenIndex+parenCount, set cap[k] to undefined.
Let e be x's endIndex.
Let xr be the State (e, cap).
If min is not zero, then call m(xr, d) and return its result.
If greedy is false, then
Call c(x) and let z be its result.
If z is not failure, return z.
Call m(xr, d) and return its result.
Call m(xr, d) and let z be its result.
If z is not failure, return z.
Call c(x) and return its result.
NOTE 1 An Atom followed by a Quantifier is repeated the number of times specified by the Quantifier. A Quantifier can be non-greedy, in which case the Atom pattern is repeated as few times as possible while still matching the sequel, or it can be greedy, in which case the Atom pattern is repeated as many times as possible while still matching the sequel. The Atom pattern is repeated rather than the input String that it matches, so different repetitions of the Atom can match different input substrings.

NOTE 2 If the Atom and the sequel of the regular expression all have choice points, the Atom is first matched as many (or as few, if non-greedy) times as possible. All choices in the sequel are tried before moving on to the next choice in the last repetition of Atom. All choices in the last (nth) repetition of Atom are tried before moving on to the next choice in the next-to-last (n–1)st repetition of Atom; at which point it may turn out that more or fewer repetitions of Atom are now possible; these are exhausted (again, starting with either as few or as many as possible) before moving on to the next choice in the (n-1)st repetition of Atom and so on.

Compare

/a[a-z]{2,4}/.exec("abcdefghi")
which returns "abcde" with

/a[a-z]{2,4}?/.exec("abcdefghi")
which returns "abc".

Consider also

/(aa|aabaac|ba|b|c)*/.exec("aabaac")
which, by the choice point ordering above, returns the array

["aaba", "ba"]
and not any of:

["aabaac", "aabaac"]
["aabaac", "c"]
The above ordering of choice points can be used to write a regular expression that calculates the greatest common divisor of two numbers (represented in unary notation). The following example calculates the gcd of 10 and 15:

"aaaaaaaaaa,aaaaaaaaaaaaaaa".replace(/^(a+)\1*,\1+$/,"$1")
which returns the gcd in unary notation "aaaaa".

NOTE 3 Step 4 of the RepeatMatcher clears Atom's captures each time Atom is repeated. We can see its behaviour in the regular expression

/(z)((a+)?(b+)?(c))*/.exec("zaacbbbcac")
which returns the array

["zaacbbbcac", "z", "ac", "a", undefined, "c"]
and not

["zaacbbbcac", "z", "ac", "a", "bbb", "c"]
because each iteration of the outermost * clears all captured Strings contained in the quantified Atom, which in this case includes capture Strings numbered 2, 3, 4, and 5.

NOTE 4 Step 1 of the RepeatMatcher's d closure states that, once the minimum number of repetitions has been satisfied, any more expansions of Atom that match the empty String are not considered for further repetitions. This prevents the regular expression engine from falling into an infinite loop on patterns such as:

/(a*)*/.exec("b")
or the slightly more complicated:

/(a*)b\1+/.exec("baaaac")
which returns the array

["b", ""]
15.10.2.6 Assertion

The production Assertion :: ^ evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the following:

Let e be x's endIndex.
If e is zero, return true.
If Multiline is false, return false.
If the character Input[e–1] is one of LineTerminator, return true.
Return false.
The production Assertion :: $ evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the following:

Let e be x's endIndex.
If e is equal to InputLength, return true.
If multiline is false, return false.
If the character Input[e] is one of LineTerminator, return true.
Return false.
The production Assertion :: \ b evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the following:

Let e be x's endIndex.
Call IsWordChar(e–1) and let a be the Boolean result.
Call IsWordChar(e) and let b be the Boolean result.
If a is true and b is false, return true.
If a is false and b is true, return true.
Return false.
The production Assertion :: \ B evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the following:

Let e be x's endIndex.
Call IsWordChar(e–1) and let a be the Boolean result.
Call IsWordChar(e) and let b be the Boolean result.
If a is true and b is false, return false.
If a is false and b is true, return false.
Return true.
The production Assertion :: ( ? = Disjunction ) evaluates as follows:

Evaluate Disjunction to obtain a Matcher m.
Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following steps:
Let d be a Continuation that always returns its State argument as a successful MatchResult.
Call m(x, d) and let r be its result.
If r is failure, return failure.
Let y be r's State.
Let cap be y's captures internal array.
Let xe be x's endIndex.
Let z be the State (xe, cap).
Call c(z) and return its result.
The production Assertion :: ( ? ! Disjunction ) evaluates as follows:

Evaluate Disjunction to obtain a Matcher m.
Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following steps:
Let d be a Continuation that always returns its State argument as a successful MatchResult.
Call m(x, d) and let r be its result.
If r isn't failure, return failure.
Call c(x) and return its result.
The abstract operation IsWordChar takes an integer parameter e and performs the following:

If e == –1 or e == InputLength, return false.
Let c be the character Input[e].
If c is one of the sixty-three characters below, return true.
a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z
A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z
0	1	2	3	4	5	6	7	8	9	_															
Return false.
15.10.2.7 Quantifier

The production Quantifier :: QuantifierPrefix evaluates as follows:

Evaluate QuantifierPrefix to obtain the two results: an integer min and an integer (or ∞) max.
Return the three results min, max, and true.
The production Quantifier :: QuantifierPrefix ? evaluates as follows:

Evaluate QuantifierPrefix to obtain the two results: an integer min and an integer (or ∞) max.
Return the three results min, max, and false.
The production QuantifierPrefix :: * evaluates by returning the two results 0 and ∞.

The production QuantifierPrefix :: + evaluates by returning the two results 1 and ∞.

The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1.

The production QuantifierPrefix :: { DecimalDigits } evaluates as follows:

Let i be the MV of DecimalDigits (see 7.8.3).
Return the two results i and i.
The production QuantifierPrefix :: { DecimalDigits , } evaluates as follows:

Let i be the MV of DecimalDigits.
Return the two results i and ∞.
The production QuantifierPrefix :: { DecimalDigits , DecimalDigits } evaluates as follows:

Let i be the MV of the first DecimalDigits.
Let j be the MV of the second DecimalDigits.
Return the two results i and j.
15.10.2.8 Atom

The production Atom :: PatternCharacter evaluates as follows:

Let ch be the character represented by PatternCharacter.
Let A be a one-element CharSet containing the character ch.
Call CharacterSetMatcher(A, false) and return its Matcher result.
The production Atom :: . evaluates as follows:

Let A be the set of all characters except LineTerminator.
Call CharacterSetMatcher(A, false) and return its Matcher result.
The production Atom :: \ AtomEscape evaluates by evaluating AtomEscape to obtain a Matcher and returning that Matcher.

The production Atom :: CharacterClass evaluates as follows:

Evaluate CharacterClass to obtain a CharSet A and a Boolean invert.
Call CharacterSetMatcher(A, invert) and return its Matcher result.
The production Atom :: ( Disjunction ) evaluates as follows:

Evaluate Disjunction to obtain a Matcher m.
Let parenIndex be the number of left capturing parentheses in the entire regular expression that occur to the left of this production expansion's initial left parenthesis. This is the total number of times the Atom :: ( Disjunction ) production is expanded prior to this production's Atom plus the total number of Atom :: ( Disjunction ) productions enclosing this Atom.
Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following steps:
Create an internal Continuation closure d that takes one State argument y and performs the following steps:
Let cap be a fresh copy of y's captures internal array.
Let xe be x's endIndex.
Let ye be y's endIndex.
Let s be a fresh String whose characters are the characters of Input at positions xe (inclusive) through ye (exclusive).
Set cap[parenIndex+1] to s.
Let z be the State (ye, cap).
Call c(z) and return its result.
Call m(x, d) and return its result.
The production Atom :: ( ? : Disjunction ) evaluates by evaluating Disjunction to obtain a Matcher and returning that Matcher.

The abstract operation CharacterSetMatcher takes two arguments, a CharSet A and a Boolean flag invert, and performs the following:

Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following steps:
Let e be x's endIndex.
If e == InputLength, return failure.
Let ch be the character Input[e].
Let cc be the result of Canonicalize(ch).
If invert is false, then
If there does not exist a member a of set A such that Canonicalize(a) == cc, return failure.
Else invert is true,
If there exists a member a of set A such that Canonicalize(a) == cc, return failure.
Let cap be x's captures internal array.
Let y be the State (e+1, cap).
Call c(y) and return its result.
The abstract operation Canonicalize takes a character parameter ch and performs the following steps:

If IgnoreCase is false, return ch.
Let u be ch converted to upper case as if by calling the standard built-in method String.prototype.toUpperCase on the one-character String ch.
If u does not consist of a single character, return ch.
Let cu be u's character.
If ch's code unit value is greater than or equal to decimal 128 and cu's code unit value is less than decimal 128, then return ch.
Return cu.
NOTE 1 Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match. The result can be used either in a backreference (\ followed by a nonzero decimal number), referenced in a replace String, or returned as part of an array from the regular expression matching internal procedure. To inhibit the capturing behaviour of parentheses, use the form (?: Disjunction ) instead.

NOTE 2 The form (?= Disjunction ) specifies a zero-width positive lookahead. In order for it to succeed, the pattern inside Disjunction must match at the current position, but the current position is not advanced before matching the sequel. If Disjunction can match at the current position in several ways, only the first one is tried. Unlike other regular expression operators, there is no backtracking into a (?= form (this unusual behaviour is inherited from Perl). This only matters when the Disjunction contains capturing parentheses and the sequel of the pattern contains backreferences to those captures.

For example,

/(?=(a+))/.exec("baaabac")
matches the empty String immediately after the first b and therefore returns the array:

["", "aaa"]
To illustrate the lack of backtracking into the lookahead, consider:

/(?=(a+))a*b\1/.exec("baaabac")
This expression returns

["aba", "a"]
and not:

["aaaba", "a"]
NOTE 3 The form (?! Disjunction ) specifies a zero-width negative lookahead. In order for it to succeed, the pattern inside Disjunction must fail to match at the current position. The current position is not advanced before matching the sequel. Disjunction can contain capturing parentheses, but backreferences to them only make sense from within Disjunction itself. Backreferences to these capturing parentheses from elsewhere in the pattern always return undefined because the negative lookahead must fail for the pattern to succeed. For example,

/(.*?)a(?!(a+)b\2c)\2(.*)/.exec("baaabaac")
looks for an a not immediately followed by some positive number n of a's, a b, another n a's (specified by the first \2) and a c. The second \2 is outside the negative lookahead, so it matches against undefined and therefore always succeeds. The whole expression returns the array:

["baaabaac", "ba", undefined, "abaac"]
In case-insignificant matches all characters are implicitly converted to upper case immediately before they are compared. However, if converting a character to upper case would expand that character into more than one character (such as converting "ß" (\u00DF) into "SS"), then the character is left as-is instead. The character is also left as-is if it is not an ASCII character but converting it to upper case would make it into an ASCII character. This prevents Unicode characters such as \u0131 and \u017F from matching regular expressions such as /[a‑z]/i, which are only intended to match ASCII letters. Furthermore, if these conversions were allowed, then /[^\W]/i would match each of a, b, …, h, but not i or s.

15.10.2.9 AtomEscape

The production AtomEscape :: DecimalEscape evaluates as follows:

Evaluate DecimalEscape to obtain an EscapeValue E.
If E is a character, then
Let ch be E's character.
Let A be a one-element CharSet containing the character ch.
Call CharacterSetMatcher(A, false) and return its Matcher result.
E must be an integer. Let n be that integer.
If n=0 or n>NCapturingParens then throw a SyntaxError exception.
Return an internal Matcher closure that takes two arguments, a State x and a Continuation c, and performs the following:
Let cap be x's captures internal array.
Let s be cap[n].
If s is undefined, then call c(x) and return its result.
Let e be x's endIndex.
Let len be s's length.
Let f be e+len.
If f>InputLength, return failure.
If there exists an integer i between 0 (inclusive) and len (exclusive) such that Canonicalize(s[i]) is not the same character as Canonicalize(Input [e+i]), then return failure.
Let y be the State (f, cap).
Call c(y) and return its result.
The production AtomEscape :: CharacterEscape evaluates as follows:

Evaluate CharacterEscape to obtain a character ch.
Let A be a one-element CharSet containing the character ch.
Call CharacterSetMatcher(A, false) and return its Matcher result.
The production AtomEscape :: CharacterClassEscape evaluates as follows:

Evaluate CharacterClassEscape to obtain a CharSet A.
Call CharacterSetMatcher(A, false) and return its Matcher result.
NOTE An escape sequence of the form \ followed by a nonzero decimal number n matches the result of the nth set of capturing parentheses (see 15.10.2.11). It is an error if the regular expression has fewer than n capturing parentheses. If the regular expression has n or more capturing parentheses but the nth one is undefined because it has not captured anything, then the backreference always succeeds.

15.10.2.10 CharacterEscape

The production CharacterEscape :: ControlEscape evaluates by returning the character according to Table 23.

Table 23 — ControlEscape Character Values
ControlEscape	Code Unit	Name	Symbol
t	\u0009	horizontal tab	<HT>
n	\u000A	line feed (new line)	<LF>
v	\u000B	vertical tab	<VT>
f	\u000C	form feed	<FF>
r	\u000D	carriage return	<CR>
The production CharacterEscape :: c ControlLetter evaluates as follows:

Let ch be the character represented by ControlLetter.
Let i be ch's code unit value.
Let j be the remainder of dividing i by 32.
Return the character whose code unit value is j.
The production CharacterEscape :: HexEscapeSequence evaluates by evaluating the CV of the HexEscapeSequence (see 7.8.4) and returning its character result.

The production CharacterEscape :: UnicodeEscapeSequence evaluates by evaluating the CV of the UnicodeEscapeSequence (see 7.8.4) and returning its character result.

The production CharacterEscape :: IdentityEscape evaluates by returning the character represented by IdentityEscape.

15.10.2.11 DecimalEscape

The production DecimalEscape :: DecimalIntegerLiteral [lookahead ∉ DecimalDigit] evaluates as follows:

Let i be the MV of DecimalIntegerLiteral.
If i is zero, return the EscapeValue consisting of a <NUL> character (Unicode value 0000).
Return the EscapeValue consisting of the integer i.
The definition of “the MV of DecimalIntegerLiteral” is in 7.8.3.

NOTE If \ is followed by a decimal number n whose first digit is not 0, then the escape sequence is considered to be a backreference. It is an error if n is greater than the total number of left capturing parentheses in the entire regular expression. \0 represents the <NUL> character and cannot be followed by a decimal digit.

15.10.2.12 CharacterClassEscape

The production CharacterClassEscape :: d evaluates by returning the ten-element set of characters containing the characters 0 through 9 inclusive.

The production CharacterClassEscape :: D evaluates by returning the set of all characters not included in the set returned by CharacterClassEscape :: d .

The production CharacterClassEscape :: s evaluates by returning the set of characters containing the characters that are on the right-hand side of the WhiteSpace (7.2) or LineTerminator (7.3) productions.

The production CharacterClassEscape :: S evaluates by returning the set of all characters not included in the set returned by CharacterClassEscape :: s .

The production CharacterClassEscape :: w evaluates by returning the set of characters containing the sixty-three characters:

a	b	c	d	e	f	g	h	i	j	k	l	m	n	o	p	q	r	s	t	u	v	w	x	y	z
A	B	C	D	E	F	G	H	I	J	K	L	M	N	O	P	Q	R	S	T	U	V	W	X	Y	Z
0	1	2	3	4	5	6	7	8	9	_															
The production CharacterClassEscape :: W evaluates by returning the set of all characters not included in the set returned by CharacterClassEscape :: w .

15.10.2.13 CharacterClass

The production CharacterClass :: [ [lookahead ∉ {^}] ClassRanges ] evaluates by evaluating ClassRanges to obtain a CharSet and returning that CharSet and the Boolean false.

The production CharacterClass :: [ ^ ClassRanges ] evaluates by evaluating ClassRanges to obtain a CharSet and returning that CharSet and the Boolean true.

15.10.2.14 ClassRanges

The production ClassRanges :: [empty] evaluates by returning the empty CharSet.

The production ClassRanges :: NonemptyClassRanges evaluates by evaluating NonemptyClassRanges to obtain a CharSet and returning that CharSet.

15.10.2.15 NonemptyClassRanges

The production NonemptyClassRanges :: ClassAtom evaluates by evaluating ClassAtom to obtain a CharSet and returning that CharSet.

The production NonemptyClassRanges :: ClassAtom NonemptyClassRangesNoDash evaluates as follows:

Evaluate ClassAtom to obtain a CharSet A.
Evaluate NonemptyClassRangesNoDash to obtain a CharSet B.
Return the union of CharSets A and B.
The production NonemptyClassRanges :: ClassAtom - ClassAtom ClassRanges evaluates as follows:

Evaluate the first ClassAtom to obtain a CharSet A.
Evaluate the second ClassAtom to obtain a CharSet B.
Evaluate ClassRanges to obtain a CharSet C.
Call CharacterRange(A, B) and let D be the resulting CharSet.
Return the union of CharSets D and C.
The abstract operation CharacterRange takes two CharSet parameters A and B and performs the following:

If A does not contain exactly one character or B does not contain exactly one character then throw a SyntaxError exception.
Let a be the one character in CharSet A.
Let b be the one character in CharSet B.
Let i be the code unit value of character a.
Let j be the code unit value of character b.
If i > j then throw a SyntaxError exception.
Return the set containing all characters numbered i through j, inclusive.
15.10.2.16 NonemptyClassRangesNoDash

The production NonemptyClassRangesNoDash :: ClassAtom evaluates by evaluating ClassAtom to obtain a CharSet and returning that CharSet.

The production NonemptyClassRangesNoDash :: ClassAtomNoDash NonemptyClassRangesNoDash evaluates as follows:

Evaluate ClassAtomNoDash to obtain a CharSet A.
Evaluate NonemptyClassRangesNoDash to obtain a CharSet B.
Return the union of CharSets A and B.
The production NonemptyClassRangesNoDash :: ClassAtomNoDash - ClassAtom ClassRanges evaluates as follows:

Evaluate ClassAtomNoDash to obtain a CharSet A.
Evaluate ClassAtom to obtain a CharSet B.
Evaluate ClassRanges to obtain a CharSet C.
Call CharacterRange(A, B) and let D be the resulting CharSet.
Return the union of CharSets D and C.
NOTE 1ClassRanges can expand into single ClassAtoms and/or ranges of two ClassAtoms separated by dashes. In the latter case the ClassRanges includes all characters between the first ClassAtom and the second ClassAtom, inclusive; an error occurs if either ClassAtom does not represent a single character (for example, if one is \w) or if the first ClassAtom's code unit value is greater than the second ClassAtom's code unit value.

NOTE 2 Even if the pattern ignores case, the case of the two ends of a range is significant in determining which characters belong to the range. Thus, for example, the pattern /[E-F]/i matches only the letters E, F, e, and f, while the pattern /[E-f]/i matches all upper and lower-case ASCII letters as well as the symbols [, \, ], ^, _, and `.

NOTE 3 A - character can be treated literally or it can denote a range. It is treated literally if it is the first or last character of ClassRanges, the beginning or end limit of a range specification, or immediately follows a range specification.

15.10.2.17 ClassAtom

The production ClassAtom :: - evaluates by returning the CharSet containing the one character -.

The production ClassAtom :: ClassAtomNoDash evaluates by evaluating ClassAtomNoDash to obtain a CharSet and returning that CharSet.

15.10.2.18 ClassAtomNoDash

The production ClassAtomNoDash :: SourceCharacter but not one of \ or ] or - evaluates by returning a one-element CharSet containing the character represented by SourceCharacter.

The production ClassAtomNoDash :: \ ClassEscape evaluates by evaluating ClassEscape to obtain a CharSet and returning that CharSet.

15.10.2.19 ClassEscape

The production ClassEscape :: DecimalEscape evaluates as follows:

Evaluate DecimalEscape to obtain an EscapeValue E.
If E is not a character then throw a SyntaxError exception.
Let ch be E's character.
Return the one-element CharSet containing the character ch.
The production ClassEscape :: b evaluates by returning the CharSet containing the one character <BS> (Unicode value 0008).

The production ClassEscape :: CharacterEscape evaluates by evaluating CharacterEscape to obtain a character and returning a one-element CharSet containing that character.

The production ClassEscape :: CharacterClassEscape evaluates by evaluating CharacterClassEscape to obtain a CharSet and returning that CharSet.

NOTE A ClassAtom can use any of the escape sequences that are allowed in the rest of the regular expression except for \b, \B, and backreferences. Inside a CharacterClass, \b means the backspace character, while \B and backreferences raise errors. Using a backreference inside a ClassAtom causes an error.

15.10.3 The RegExp Constructor Called as a Function

15.10.3.1 RegExp(pattern, flags)

If pattern is an object R whose [[Class]] internal property is "RegExp" and flags is undefined, then return R unchanged. Otherwise call the standard built-in RegExp constructor (15.10.4.1) as if by the expression new RegExp(pattern, flags) and return the object constructed by that constructor.

15.10.4 The RegExp Constructor

When RegExp is called as part of a new expression, it is a constructor: it initialises the newly created object.

15.10.4.1 new RegExp(pattern, flags)

If pattern is an object R whose [[Class]] internal property is "RegExp" and flags is undefined, then let P be the pattern used to construct R and let F be the flags used to construct R. If pattern is an object R whose [[Class]] internal property is "RegExp" and flags is not undefined, then throw a TypeError exception. Otherwise, let P be the empty String if pattern is undefined and ToString(pattern) otherwise, and let F be the empty String if flags is undefined and ToString(flags) otherwise.

If the characters of P do not have the syntactic form Pattern, then throw a SyntaxError exception. Otherwise let the newly constructed object have a [[Match]] internal property obtained by evaluating ("compiling") the characters of P as a Pattern as described in 15.10.2.

If F contains any character other than "g", "i", or "m", or if it contains the same character more than once, then throw a SyntaxError exception.

If a SyntaxError exception is not thrown, then:

Let S be a String in the form of a Pattern equivalent to P, in which certain characters are escaped as described below. S may or may not be identical to P or pattern; however, the internal procedure that would result from evaluating S as a Pattern must behave identically to the internal procedure given by the constructed object's [[Match]] internal property.

The characters / occurring in the pattern shall be escaped in S as necessary to ensure that the String value formed by concatenating the Strings "/", S, "/", and F can be parsed (in an appropriate lexical context) as a RegularExpressionLiteral that behaves identically to the constructed regular expression. For example, if P is "/", then S could be "\/" or "\u002F", among other possibilities, but not "/", because /// followed by F would be parsed as a SingleLineComment rather than a RegularExpressionLiteral. If P is the empty String, this specification can be met by letting S be "(?:)".

The following properties of the newly constructed object are data properties with the attributes that are specified in 15.10.7. The [[Value]] of each property is set as follows:

The source property of the newly constructed object is set to S.

The global property of the newly constructed object is set to a Boolean value that is true if F contains the character "g" and false otherwise.

The ignoreCase property of the newly constructed object is set to a Boolean value that is true if F contains the character "i" and false otherwise.

The multiline property of the newly constructed object is set to a Boolean value that is true if F contains the character "m" and false otherwise.

The lastIndex property of the newly constructed object is set to 0.

The [[Prototype]] internal property of the newly constructed object is set to the standard built-in RegExp prototype object as specified in 15.10.6.

The [[Class]] internal property of the newly constructed object is set to "RegExp".

NOTE If pattern is a StringLiteral, the usual escape sequence substitutions are performed before the String is processed by RegExp. If pattern must contain an escape sequence to be recognised by RegExp, any backslash \ characters must be escaped within the StringLiteral to prevent them being removed when the contents of the StringLiteral are formed.

15.10.5 Properties of the RegExp Constructor

The value of the [[Prototype]] internal property of the RegExp constructor is the standard built-in Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 2), the RegExp constructor has the following properties:

15.10.5.1 RegExp.prototype

The initial value of RegExp.prototype is the RegExp prototype object (15.10.6).

This property shall have the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.10.6 Properties of the RegExp Prototype Object

The value of the [[Prototype]] internal property of the RegExp prototype object is the standard built-in Object prototype object (15.2.4). The RegExp prototype object is itself a regular expression object; its [[Class]] is "RegExp". The initial values of the RegExp prototype object’s data properties (15.10.7) are set as if the object was created by the expression new RegExp() where RegExp is that standard built-in constructor with that name.

The RegExp prototype object does not have a valueOf property of its own; however, it inherits the valueOf property from the Object prototype object.

In the following descriptions of functions that are properties of the RegExp prototype object, the phrase “this RegExp object” refers to the object that is the this value for the invocation of the function; a TypeError exception is thrown if the this value is not an object or an object for which the value of the [[Class]] internal property is not "RegExp".

15.10.6.1 RegExp.prototype.constructor

The initial value of RegExp.prototype.constructor is the standard built-in RegExp constructor.

15.10.6.2 RegExp.prototype.exec(string)

Performs a regular expression match of string against the regular expression and returns an Array object containing the results of the match, or null if string did not match.

The String ToString(string) is searched for an occurrence of the regular expression pattern as follows:

Let R be this RegExp object.
Let S be the value of ToString(string).
Let length be the length of S.
Let lastIndex be the result of calling the [[Get]] internal method of R with argument "lastIndex".
Let i be the value of ToInteger(lastIndex).
Let global be the result of calling the [[Get]] internal method of R with argument "global".
If global is false, then let i = 0.
Let matchSucceeded be false.
Repeat, while matchSucceeded is false
If i < 0 or i > length, then
Call the [[Put]] internal method of R with arguments "lastIndex", 0, and true.
Return null.
Call the [[Match]] internal method of R with arguments S and i.
If [[Match]] returned failure, then
Let i = i+1.
else
Let r be the State result of the call to [[Match]].
Set matchSucceeded to true.
Let e be r's endIndex value.
If global is true,
Call the [[Put]] internal method of R with arguments "lastIndex", e, and true.
Let n be the length of r's captures array. (This is the same value as 15.10.2.1's NCapturingParens.)
Let A be a new array created as if by the expression new Array() where Array is the standard built-in constructor with that name.
Let matchIndex be i.
Call the [[DefineOwnProperty]] internal method of A with arguments "index", Property Descriptor {[[Value]]: matchIndex, [[Writable]: true, [[Enumerable]]: true, [[Configurable]]: true}, and true.
Call the [[DefineOwnProperty]] internal method of A with arguments "input", Property Descriptor {[[Value]]: S, [[Writable]: true, [[Enumerable]]: true, [[Configurable]]: true}, and true.
Call the [[DefineOwnProperty]] internal method of A with arguments "length", Property Descriptor {[[Value]]: n + 1}, and true.
Let matchedSubstr be the matched substring (i.e. the portion of S between offset i inclusive and offset e exclusive).
Call the [[DefineOwnProperty]] internal method of A with arguments "0", Property Descriptor {[[Value]]: matchedSubstr, [[Writable]: true, [[Enumerable]]: true, [[Configurable]]: true}, and true.
For each integer i such that i > 0 and i ≤ n
Let captureI be ith element of r's captures array.
Call the [[DefineOwnProperty]] internal method of A with arguments ToString(i), Property Descriptor {[[Value]]: captureI, [[Writable]: true, [[Enumerable]]: true, [[Configurable]]: true}, and true.
Return A.
15.10.6.3 RegExp.prototype.test(string)

The following steps are taken:

Let match be the result of evaluating the RegExp.prototype.exec (15.10.6.2) algorithm upon this RegExp object using string as the argument.
If match is not null, then return true; else return false.
15.10.6.4 RegExp.prototype.toString()

Return the String value formed by concatenating the Strings "/", the String value of the source property of this RegExp object, and "/"; plus "g" if the global property is true, "i" if the ignoreCase property is true, and "m" if the multiline property is true.

NOTE The returned String has the form of a RegularExpressionLiteral that evaluates to another RegExp object with the same behaviour as this object.

15.10.7 Properties of RegExp Instances

RegExp instances inherit properties from the RegExp prototype object and their [[Class]] internal property value is "RegExp". RegExp instances also have a [[Match]] internal property and a length property.

The value of the [[Match]] internal property is an implementation dependent representation of the Pattern of the RegExp object.

RegExp instances also have the following properties.

15.10.7.1 source

The value of the source property is a String in the form of a Pattern representing the current regular expression. This property shall have the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.10.7.2 global

The value of the global property is a Boolean value indicating whether the flags contained the character “g”. This property shall have the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.10.7.3 ignoreCase

The value of the ignoreCase property is a Boolean value indicating whether the flags contained the character “i”. This property shall have the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.10.7.4 multiline

The value of the multiline property is a Boolean value indicating whether the flags contained the character “m”. This property shall have the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.10.7.5 lastIndex

The value of the lastIndex property specifies the String position at which to start the next match. It is coerced to an integer when used (see 15.10.6.2). This property shall have the attributes { [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }.

NOTE Unlike the other standard built-in properties of RegExp instances, lastIndex is writable.