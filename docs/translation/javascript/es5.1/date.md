# Date

Date ( [ year [, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] ] ] )

new Date (year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )
new Date (value)
new Date ( )

Date.prototype
Date.parse (string)
Date.UTC (year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )
Date.now ( )

Date.prototype.constructor
Date.prototype.toString ( )
Date.prototype.toDateString ( )
Date.prototype.toTimeString ( )
Date.prototype.toLocaleString ( )
Date.prototype.toLocaleDateString ( )
Date.prototype.toLocaleTimeString ( )
Date.prototype.valueOf ( )
Date.prototype.getTime ( )
Date.prototype.getFullYear ( )
Date.prototype.getUTCFullYear ( )
Date.prototype.getMonth ( )
Date.prototype.getUTCMonth ( )
Date.prototype.getDate ( )
Date.prototype.getUTCDate ( )
Date.prototype.getDay ( )
Date.prototype.getUTCDay ( )
Date.prototype.getHours ( )
Date.prototype.getUTCHours ( )
Date.prototype.getMinutes ( )
Date.prototype.getUTCMinutes ( )
Date.prototype.getSeconds ( )
Date.prototype.getUTCSeconds ( )
Date.prototype.getMilliseconds ( )
Date.prototype.getUTCMilliseconds ( )
Date.prototype.getTimezoneOffset ( )
Date.prototype.setTime (time)
Date.prototype.setMilliseconds (ms)
Date.prototype.setUTCMilliseconds (ms)
Date.prototype.setSeconds (sec [, ms ] )
Date.prototype.setUTCSeconds (sec [, ms ] )
Date.prototype.setMinutes (min [, sec [, ms ] ] )
Date.prototype.setUTCMinutes (min [, sec [, ms ] ] )
Date.prototype.setHours (hour [, min [, sec [, ms ] ] ] )
Date.prototype.setUTCHours (hour [, min [, sec [, ms ] ] ] )
Date.prototype.setDate (date)
Date.prototype.setUTCDate (date)
Date.prototype.setMonth (month [, date ] )
Date.prototype.setUTCMonth (month [, date ] )
Date.prototype.setFullYear (year [, month [, date ] ] )
Date.prototype.setUTCFullYear (year [, month [, date ] ] )
Date.prototype.toUTCString ( )
Date.prototype.toISOString ( )
Date.prototype.toJSON ( key )











15.9.1 Overview of Date Objects and Definitions of Abstract Operators

The following functions are abstract operations that operate on time values (defined in 15.9.1.1). Note that, in every case, if any argument to one of these functions is NaN, the result will be NaN.

15.9.1.1 Time Values and Time Range

A Date object contains a Number indicating a particular instant in time to within a millisecond. Such a Number is called a time value. A time value may also be NaN, indicating that the Date object does not represent a specific instant of time.

Time is measured in ECMAScript in milliseconds since 01 January, 1970 UTC. In time values leap seconds are ignored. It is assumed that there are exactly 86,400,000 milliseconds per day. ECMAScript Number values can represent all integers from –9,007,199,254,740,992 to 9,007,199,254,740,992; this range suffices to measure times to millisecond precision for any instant that is within approximately 285,616 years, either forward or backward, from 01 January, 1970 UTC.

The actual range of times supported by ECMAScript Date objects is slightly smaller: exactly –100,000,000 days to 100,000,000 days measured relative to midnight at the beginning of 01 January, 1970 UTC. This gives a range of 8,640,000,000,000,000 milliseconds to either side of 01 January, 1970 UTC.

The exact moment of midnight at the beginning of 01 January, 1970 UTC is represented by the value +0.

15.9.1.2 Day Number and Time within Day

A given time value t belongs to day number

Day(t) = floor(t / msPerDay)
where the number of milliseconds per day is

msPerDay = 86400000
The remainder is called the time within the day:

TimeWithinDay(t) = t modulo msPerDay
15.9.1.3 Year Number

ECMAScript uses an extrapolated Gregorian system to map a day number to a year number and to determine the month and date within that year. In this system, leap years are precisely those which are (divisible by 4) and ((not divisible by 100) or (divisible by 400)). The number of days in year number y is therefore defined by

DaysInYear(y) = 365 if (y modulo 4) ≠ 0
= 366 if (y modulo 4) = 0 and (y modulo 100) ≠ 0
= 365 if (y modulo 100) = 0 and (y modulo 400) ≠ 0
= 366 if (y modulo 400) = 0
All non-leap years have 365 days with the usual number of days per month and leap years have an extra day in February. The day number of the first day of year y is given by:

DayFromYear(y) = 365 × (y−1970) + floor((y−1969)/4) − floor((y−1901)/100) + floor((y−1601)/400)
The time value of the start of a year is:

TimeFromYear(y) = msPerDay × DayFromYear(y)
A time value determines a year by:

YearFromTime(t) = the largest integer y (closest to positive infinity) such that TimeFromYear(y) ≤ t
The leap-year function is 1 for a time within a leap year and otherwise is zero:

InLeapYear(t) = 0 if DaysInYear(YearFromTime(t)) = 365
= 1 if DaysInYear(YearFromTime(t)) = 366
15.9.1.4 Month Number

Months are identified by an integer in the range 0 to 11, inclusive. The mapping MonthFromTime(t) from a time value t to a month number is defined by:

MonthFromTime(t) = 0 if 0 ≤ DayWithinYear(t) < 31
= 1 if 31 ≤ DayWithinYear (t) < 59+InLeapYear(t)
= 2 if 59+InLeapYear(t) ≤ DayWithinYear (t) < 90+InLeapYear(t)
= 3 if 90+InLeapYear(t) ≤ DayWithinYear (t) < 120+InLeapYear(t)
= 4 if 120+InLeapYear(t) ≤ DayWithinYear (t) < 151+InLeapYear(t)
= 5 if 151+InLeapYear(t) ≤ DayWithinYear (t) < 181+InLeapYear(t)
= 6 if 181+InLeapYear(t) ≤ DayWithinYear (t) < 212+InLeapYear(t)
= 7 if 212+InLeapYear(t) ≤ DayWithinYear (t) < 243+InLeapYear(t)
= 8 if 243+InLeapYear(t) ≤ DayWithinYear (t) < 273+InLeapYear(t)
= 9 if 273+InLeapYear(t) ≤ DayWithinYear (t) < 304+InLeapYear(t)
= 10 if 304+InLeapYear(t) ≤ DayWithinYear (t) < 334+InLeapYear(t)
= 11 if 334+InLeapYear(t) ≤ DayWithinYear (t) < 365+InLeapYear(t)
where

DayWithinYear(t) = Day(t)−DayFromYear(YearFromTime(t))
A month value of 0 specifies January; 1 specifies February; 2 specifies March; 3 specifies April; 4 specifies May; 5 specifies June; 6 specifies July; 7 specifies August; 8 specifies September; 9 specifies October; 10 specifies November; and 11 specifies December. Note that MonthFromTime(0) = 0, corresponding to Thursday, 01 January, 1970.

15.9.1.5 Date Number

A date number is identified by an integer in the range 1 through 31, inclusive. The mapping DateFromTime(t) from a time value t to a month number is defined by:

DateFromTime(t) = DayWithinYear(t)+1 if MonthFromTime(t)=0
= DayWithinYear(t)−30 if MonthFromTime(t)=1
= DayWithinYear(t)−58−InLeapYear(t) if MonthFromTime(t)=2
= DayWithinYear(t)−89−InLeapYear(t) if MonthFromTime(t)=3
= DayWithinYear(t)−119−InLeapYear(t) if MonthFromTime(t)=4
= DayWithinYear(t)−150−InLeapYear(t) if MonthFromTime(t)=5
= DayWithinYear(t)−180−InLeapYear(t) if MonthFromTime(t)=6
= DayWithinYear(t)−211−InLeapYear(t) if MonthFromTime(t)=7
= DayWithinYear(t)−242−InLeapYear(t) if MonthFromTime(t)=8
= DayWithinYear(t)−272−InLeapYear(t) if MonthFromTime(t)=9
= DayWithinYear(t)−303−InLeapYear(t) if MonthFromTime(t)=10
= DayWithinYear(t)−333−InLeapYear(t) if MonthFromTime(t)=11
15.9.1.6 Week Day

The weekday for a particular time value t is defined as

WeekDay(t) = (Day(t) + 4) modulo 7
A weekday value of 0 specifies Sunday; 1 specifies Monday; 2 specifies Tuesday; 3 specifies Wednesday; 4 specifies Thursday; 5 specifies Friday; and 6 specifies Saturday. Note that WeekDay(0) = 4, corresponding to Thursday, 01 January, 1970.

15.9.1.7 Local Time Zone Adjustment

An implementation of ECMAScript is expected to determine the local time zone adjustment. The local time zone adjustment is a value LocalTZA measured in milliseconds which when added to UTC represents the local standard time. Daylight saving time is not reflected by LocalTZA. The value LocalTZA does not vary with time but depends only on the geographic location.

15.9.1.8 Daylight Saving Time Adjustment

An implementation of ECMAScript is expected to determine the daylight saving time algorithm. The algorithm to determine the daylight saving time adjustment DaylightSavingTA(t), measured in milliseconds, must depend only on four things:

(1) the time since the beginning of the year

t – TimeFromYear(YearFromTime(t))
(2) whether t is in a leap year

InLeapYear(t)
(3) the week day of the beginning of the year

WeekDay(TimeFromYear(YearFromTime(t)))
and (4) the geographic location.

The implementation of ECMAScript should not try to determine whether the exact time was subject to daylight saving time, but just whether daylight saving time would have been in effect if the current daylight saving time algorithm had been used at the time. This avoids complications such as taking into account the years that the locale observed daylight saving time year round.

If the host environment provides functionality for determining daylight saving time, the implementation of ECMAScript is free to map the year in question to an equivalent year (same leap-year-ness and same starting week day for the year) for which the host environment provides daylight saving time information. The only restriction is that all equivalent years should produce the same result.

15.9.1.9 Local Time

Conversion from UTC to local time is defined by

LocalTime(t) = t + LocalTZA + DaylightSavingTA(t)
Conversion from local time to UTC is defined by

UTC(t) = t – LocalTZA – DaylightSavingTA(t – LocalTZA)
Note that UTC(LocalTime(t)) is not necessarily always equal to t.

15.9.1.10 Hours, Minutes, Second, and Milliseconds

The following functions are useful in decomposing time values:

HourFromTime(t) = floor(t / msPerHour) modulo HoursPerDay
MinFromTime(t) = floor(t / msPerMinute) modulo MinutesPerHour
SecFromTime(t) = floor(t / msPerSecond) modulo SecondsPerMinute
msFromTime(t) = t modulo msPerSecond
where

HoursPerDay = 24
MinutesPerHour = 60
SecondsPerMinute = 60
msPerSecond = 1000
msPerMinute = 60000 = msPerSecond × SecondsPerMinute
msPerHour = 3600000 = msPerMinute × MinutesPerHour
15.9.1.11 MakeTime (hour, min, sec, ms)

The operator MakeTime calculates a number of milliseconds from its four arguments, which must be ECMAScript Number values. This operator functions as follows:

If hour is not finite or min is not finite or sec is not finite or ms is not finite, return NaN.
Let h be ToInteger(hour).
Let m be ToInteger(min).
Let s be ToInteger(sec).
Let milli be ToInteger(ms).
Let t be h * msPerHour + m * msPerMinute + s * msPerSecond + milli, performing the arithmetic according to IEEE 754 rules (that is, as if using the ECMAScript operators * and +).
Return t.
15.9.1.12 MakeDay (year, month, date)

The operator MakeDay calculates a number of days from its three arguments, which must be ECMAScript Number values. This operator functions as follows:

If year is not finite or month is not finite or date is not finite, return NaN.
Let y be ToInteger(year).
Let m be ToInteger(month).
Let dt be ToInteger(date).
Let ym be y + floor(m /12).
Let mn be m modulo 12.
Find a value t such that YearFromTime(t) == ym and MonthFromTime(t) == mn and DateFromTime(t) == 1; but if this is not possible (because some argument is out of range), return NaN.
Return Day(t) + dt − 1.
15.9.1.13 MakeDate (day, time)

The operator MakeDate calculates a number of milliseconds from its two arguments, which must be ECMAScript Number values. This operator functions as follows:

If day is not finite or time is not finite, return NaN.
Return day × msPerDay + time.
15.9.1.14 TimeClip (time)

The operator TimeClip calculates a number of milliseconds from its argument, which must be an ECMAScript Number value. This operator functions as follows:

If time is not finite, return NaN.
If abs(time) > 8.64 x 1015, return NaN.
Return an implementation-dependent choice of either ToInteger(time) or ToInteger(time) + (+0). (Adding a positive zero converts −0 to +0.)
NOTE The point of step 3 is that an implementation is permitted a choice of internal representations of time values, for example as a 64-bit signed integer or as a 64-bit floating-point value. Depending on the implementation, this internal representation may or may not distinguish −0 and +0.

15.9.1.15 Date Time String Format

ECMAScript defines a string interchange format for date-times based upon a simplification of the ISO 8601 Extended Format. The format is as follows: YYYY-MM-DDTHH:mm:ss.sssZ

Where the fields are as follows:

YYYY is the decimal digits of the year 0000 to 9999 in the Gregorian calendar.

- “-” (hyphen) appears literally twice in the string.

MM is the month of the year from 01 (January) to 12 (December).

DD is the day of the month from 01 to 31.

T “T” appears literally in the string, to indicate the beginning of the time element.

HH is the number of complete hours that have passed since midnight as two decimal digits from 00 to 24.

: “:” (colon) appears literally twice in the string.

mm is the number of complete minutes since the start of the hour as two decimal digits from 00 to 59.

ss is the number of complete seconds since the start of the minute as two decimal digits from 00 to 59.

. “.” (dot) appears literally in the string.

sss is the number of complete milliseconds since the start of the second as three decimal digits.

Z is the time zone offset specified as “Z” (for UTC) or either “+” or “-” followed by a time expression HH:mm

This format includes date-only forms:

YYYY
YYYY-MM
YYYY-MM-DD
It also includes “date-time” forms that consist of one of the above date-only forms immediately followed by one of the following time forms with an optional time zone offset appended:

THH:mm
THH:mm:ss
THH:mm:ss.sss
All numbers must be base 10. If the MM or DD fields are absent “01” is used as the value. If the HH, mm, or ss fields are absent “00” is used as the value and the value of an absent sss field is “000”. The value of an absent time zone offset is “Z”.

Illegal values (out-of-bounds as well as syntax errors) in a format string means that the format string is not a valid instance of this format.

NOTE 1 As every day both starts and ends with midnight, the two notations 00:00 and 24:00 are available to distinguish the two midnights that can be associated with one date. This means that the following two notations refer to exactly the same point in time: 1995-02-04T24:00 and 1995-02-05T00:00

NOTE 2 There exists no international standard that specifies abbreviations for civil time zones like CET, EST, etc. and sometimes the same abbreviation is even used for two very different time zones. For this reason, ISO 8601 and this format specifies numeric representations of date and time.

15.9.1.15.1 Extended years

ECMAScript requires the ability to specify 6 digit years (extended years); approximately 285,426 years, either forward or backward, from 01 January, 1970 UTC. To represent years before 0 or after 9999, ISO 8601 permits the expansion of the year representation, but only by prior agreement between the sender and the receiver. In the simplified ECMAScript format such an expanded year representation shall have 2 extra year digits and is always prefixed with a + or – sign. The year 0 is considered positive and hence prefixed with a + sign.

NOTE Examples of extended years:

-283457-03-21T15:00:59.008Z   283458 B.C.
-000001-01-01T00:00:00Z          2 B.C.
+000000-01-01T00:00:00Z         1 B.C.
+000001-01-01T00:00:00Z         1 A.D.
+001970-01-01T00:00:00Z         1970 A.D.
+002009-12-15T00:00:00Z         2009 A.D.
+287396-10-12T08:59:00.992Z 287396 A.D.

15.9.2 The Date Constructor Called as a Function

When Date is called as a function rather than as a constructor, it returns a String representing the current time (UTC).

NOTE The function call Date(…) is not equivalent to the object creation expression new Date(…) with the same arguments.

15.9.2.1 Date ( [ year [, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] ] ] )

All of the arguments are optional; any arguments supplied are accepted but are completely ignored. A String is created and returned as if by the expression (new Date()).toString() where Date is the standard built-in constructor with that name and toString is the standard built-in method Date.prototype.toString.

15.9.3 The Date Constructor

When Date is called as part of a new expression, it is a constructor: it initialises the newly created object.

15.9.3.1 new Date (year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )

When Date is called with two to seven arguments, it computes the date from year, month, and (optionally) date, hours, minutes, seconds and ms.

The [[Prototype]] internal property of the newly constructed object is set to the original Date prototype object, the one that is the initial value of Date.prototype (15.9.4.1).

The [[Class]] internal property of the newly constructed object is set to "Date".

The [[Extensible]] internal property of the newly constructed object is set to true.

The [[PrimitiveValue]] internal property of the newly constructed object is set as follows:

Let y be ToNumber(year).
Let m be ToNumber(month).
If date is supplied then let dt be ToNumber(date); else let dt be 1.
If hours is supplied then let h be ToNumber(hours); else let h be 0.
If minutes is supplied then let min be ToNumber(minutes); else let min be 0.
If seconds is supplied then let s be ToNumber(seconds); else let s be 0.
If ms is supplied then let milli be ToNumber(ms); else let milli be 0.
If y is not NaN and 0 ≤ ToInteger(y) ≤ 99, then let yr be 1900+ToInteger(y); otherwise, let yr be y.
Let finalDate be MakeDate(MakeDay(yr, m, dt), MakeTime(h, min, s, milli)).
Set the [[PrimitiveValue]] internal property of the newly constructed object to TimeClip(UTC(finalDate)).
15.9.3.2 new Date (value)

The [[Prototype]] internal property of the newly constructed object is set to the original Date prototype object, the one that is the initial value of Date.prototype (15.9.4.1).

The [[Class]] internal property of the newly constructed object is set to "Date".

The [[Extensible]] internal property of the newly constructed object is set to true.

The [[PrimitiveValue]] internal property of the newly constructed object is set as follows:

Let v be ToPrimitive(value).
If Type(v) is String, then
Parse v as a date, in exactly the same manner as for the parse method (15.9.4.2); let V be the time value for this date.
Else, let V be ToNumber(v).
Set the [[PrimitiveValue]] internal property of the newly constructed object to TimeClip(V) and return.
15.9.3.3 new Date ( )

The [[Prototype]] internal property of the newly constructed object is set to the original Date prototype object, the one that is the initial value of Date.prototype (15.9.4.1).

The [[Class]] internal property of the newly constructed object is set to "Date".

The [[Extensible]] internal property of the newly constructed object is set to true.

The [[PrimitiveValue]] internal property of the newly constructed object is set to the time value (UTC) identifying the current time.

15.9.4 Properties of the Date Constructor

The value of the [[Prototype]] internal property of the Date constructor is the Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 7), the Date constructor has the following properties:

15.9.4.1 Date.prototype

The initial value of Date.prototype is the built-in Date prototype object (15.9.5).

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.9.4.2 Date.parse (string)

The parse function applies the ToString operator to its argument and interprets the resulting String as a date and time; it returns a Number, the UTC time value corresponding to the date and time. The String may be interpreted as a local time, a UTC time, or a time in some other time zone, depending on the contents of the String. The function first attempts to parse the format of the String according to the rules called out in Date Time String Format (15.9.1.15). If the String does not conform to that format the function may fall back to any implementation-specific heuristics or implementation-specific date formats. Unrecognisable Strings or dates containing illegal element values in the format String shall cause Date.parse to return NaN.

If x is any Date object whose milliseconds amount is zero within a particular implementation of ECMAScript, then all of the following expressions should produce the same numeric value in that implementation, if all the properties referenced have their initial values:

x.valueOf()
Date.parse(x.toString())
Date.parse(x.toUTCString())
Date.parse(x.toISOString())
However, the expression

Date.parse(x.toLocaleString())

is not required to produce the same Number value as the preceding three expressions and, in general, the value produced by Date.parse is implementation-dependent when given any String value that does not conform to the Date Time String Format (15.9.1.15) and that could not be produced in that implementation by the toString or toUTCString method.

15.9.4.3 Date.UTC (year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )

When the UTC function is called with fewer than two arguments, the behaviour is implementation-dependent. When the UTC function is called with two to seven arguments, it computes the date from year, month and (optionally) date, hours, minutes, seconds and ms. The following steps are taken:

Let y be ToNumber(year).
Let m be ToNumber(month).
If date is supplied then let dt be ToNumber(date); else let dt be 1.
If hours is supplied then let h be ToNumber(hours); else let h be 0.
If minutes is supplied then let min be ToNumber(minutes); else let min be 0.
If seconds is supplied then let s be ToNumber(seconds); else let s be 0.
If ms is supplied then let milli be ToNumber(ms); else let milli be 0.
If y is not NaN and 0 ≤ ToInteger(y) ≤ 99, then let yr be 1900+ToInteger(y); otherwise, let yr be y.
Return TimeClip(MakeDate(MakeDay(yr, m, dt), MakeTime(h, min, s, milli))).
The length property of the UTC function is 7.

NOTE The UTC function differs from the Date constructor in two ways: it returns a time value as a Number, rather than creating a Date object, and it interprets the arguments in UTC rather than as local time.

15.9.4.4 Date.now ( )

The now function return a Number value that is the time value designating the UTC date and time of the occurrence of the call to now.

15.9.5 Properties of the Date Prototype Object

The Date prototype object is itself a Date object (its [[Class]] is "Date") whose [[PrimitiveValue]] is NaN.

The value of the [[Prototype]] internal property of the Date prototype object is the standard built-in Object prototype object (15.2.4).

In following descriptions of functions that are properties of the Date prototype object, the phrase “this Date object” refers to the object that is the this value for the invocation of the function. Unless explicitly noted otherwise, none of these functions are generic; a TypeError exception is thrown if the this value is not an object for which the value of the [[Class]] internal property is "Date". Also, the phrase “this time value” refers to the Number value for the time represented by this Date object, that is, the value of the [[PrimitiveValue]] internal property of this Date object.

15.9.5.1 Date.prototype.constructor

The initial value of Date.prototype.constructor is the built-in Date constructor.

15.9.5.2 Date.prototype.toString ( )

This function returns a String value. The contents of the String are implementation-dependent, but are intended to represent the Date in the current time zone in a convenient, human-readable form.

NOTE For any Date value d whose milliseconds amount is zero, the result of Date.parse(d.toString()) is equal to d.valueOf(). See 15.9.4.2.

15.9.5.3 Date.prototype.toDateString ( )

This function returns a String value. The contents of the String are implementation-dependent, but are intended to represent the “date” portion of the Date in the current time zone in a convenient, human-readable form.

15.9.5.4 Date.prototype.toTimeString ( )

This function returns a String value. The contents of the String are implementation-dependent, but are intended to represent the “time” portion of the Date in the current time zone in a convenient, human-readable form.

15.9.5.5 Date.prototype.toLocaleString ( )

This function returns a String value. The contents of the String are implementation-dependent, but are intended to represent the Date in the current time zone in a convenient, human-readable form that corresponds to the conventions of the host environment’s current locale.

NOTE The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

15.9.5.6 Date.prototype.toLocaleDateString ( )

This function returns a String value. The contents of the String are implementation-dependent, but are intended to represent the “date” portion of the Date in the current time zone in a convenient, human-readable form that corresponds to the conventions of the host environment’s current locale.

NOTE The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

15.9.5.7 Date.prototype.toLocaleTimeString ( )

This function returns a String value. The contents of the String are implementation-dependent, but are intended to represent the “time” portion of the Date in the current time zone in a convenient, human-readable form that corresponds to the conventions of the host environment’s current locale.

NOTE The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

15.9.5.8 Date.prototype.valueOf ( )

The valueOf function returns a Number, which is this time value.

15.9.5.9 Date.prototype.getTime ( )

Return this time value.
15.9.5.10 Date.prototype.getFullYear ( )

Let t be this time value.
If t is NaN, return NaN.
Return YearFromTime(LocalTime(t)).
15.9.5.11 Date.prototype.getUTCFullYear ( )

Let t be this time value.
If t is NaN, return NaN.
Return YearFromTime(t).
15.9.5.12 Date.prototype.getMonth ( )

Let t be this time value.
If t is NaN, return NaN.
Return MonthFromTime(LocalTime(t)).
15.9.5.13 Date.prototype.getUTCMonth ( )

Let t be this time value.
If t is NaN, return NaN.
Return MonthFromTime(t).
15.9.5.14 Date.prototype.getDate ( )

Let t be this time value.
If t is NaN, return NaN.
Return DateFromTime(LocalTime(t)).
15.9.5.15 Date.prototype.getUTCDate ( )

Let t be this time value.
If t is NaN, return NaN.
Return DateFromTime(t).
15.9.5.16 Date.prototype.getDay ( )

Let t be this time value.
If t is NaN, return NaN.
Return WeekDay(LocalTime(t)).
15.9.5.17 Date.prototype.getUTCDay ( )

Let t be this time value.
If t is NaN, return NaN.
Return WeekDay(t).
15.9.5.18 Date.prototype.getHours ( )

Let t be this time value.
If t is NaN, return NaN.
Return HourFromTime(LocalTime(t)).
15.9.5.19 Date.prototype.getUTCHours ( )

Let t be this time value.
If t is NaN, return NaN.
Return HourFromTime(t).
15.9.5.20 Date.prototype.getMinutes ( )

Let t be this time value.
If t is NaN, return NaN.
Return MinFromTime(LocalTime(t)).
15.9.5.21 Date.prototype.getUTCMinutes ( )

Let t be this time value.
If t is NaN, return NaN.
Return MinFromTime(t).
15.9.5.22 Date.prototype.getSeconds ( )

Let t be this time value.
If t is NaN, return NaN.
Return SecFromTime(LocalTime(t)).
15.9.5.23 Date.prototype.getUTCSeconds ( )

Let t be this time value.
If t is NaN, return NaN.
Return SecFromTime(t).
15.9.5.24 Date.prototype.getMilliseconds ( )

Let t be this time value.
If t is NaN, return NaN.
Return msFromTime(LocalTime(t)).
15.9.5.25 Date.prototype.getUTCMilliseconds ( )

Let t be this time value.
If t is NaN, return NaN.
Return msFromTime(t).
15.9.5.26 Date.prototype.getTimezoneOffset ( )

Returns the difference between local time and UTC time in minutes.

Let t be this time value.
If t is NaN, return NaN.
Return (t − LocalTime(t)) / msPerMinute.
15.9.5.27 Date.prototype.setTime (time)

Let v be TimeClip(ToNumber(time)).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
15.9.5.28 Date.prototype.setMilliseconds (ms)

Let t be the result of LocalTime(this time value).
Let time be MakeTime(HourFromTime(t), MinFromTime(t), SecFromTime(t), ToNumber(ms)).
Let u be TimeClip(UTC(MakeDate(Day(t), time))).
Set the [[PrimitiveValue]] internal property of this Date object to u.
Return u.
15.9.5.29 Date.prototype.setUTCMilliseconds (ms)

Let t be this time value.
Let time be MakeTime(HourFromTime(t), MinFromTime(t), SecFromTime(t), ToNumber(ms)).
Let v be TimeClip(MakeDate(Day(t), time)).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
15.9.5.30 Date.prototype.setSeconds (sec [, ms ] )

If ms is not specified, this behaves as if ms were specified with the value getMilliseconds().

Let t be the result of LocalTime(this time value).
Let s be ToNumber(sec).
If ms is not specified, then let milli be msFromTime(t); otherwise, let milli be ToNumber(ms).
Let date be MakeDate(Day(t), MakeTime(HourFromTime(t), MinFromTime(t), s, milli)).
Let u be TimeClip(UTC(date)).
Set the [[PrimitiveValue]] internal property of this Date object to u.
Return u.
The length property of the setSeconds method is 2.

15.9.5.31 Date.prototype.setUTCSeconds (sec [, ms ] )

If ms is not specified, this behaves as if ms were specified with the value getUTCMilliseconds().

Let t be this time value.
Let s be ToNumber(sec).
If ms is not specified, then let milli be msFromTime(t); otherwise, let milli be ToNumber(ms).
Let date be MakeDate(Day(t), MakeTime(HourFromTime(t), MinFromTime(t), s, milli)).
Let v be TimeClip(date).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
The length property of the setUTCSeconds method is 2.

15.9.5.32 Date.prototype.setMinutes (min [, sec [, ms ] ] )

If sec is not specified, this behaves as if sec were specified with the value getSeconds().

If ms is not specified, this behaves as if ms were specified with the value getMilliseconds().

Let t be the result of LocalTime(this time value).
Let m be ToNumber(min).
If sec is not specified, then let s be SecFromTime(t); otherwise, let s be ToNumber(sec).
If ms is not specified, then let milli be msFromTime(t); otherwise, let milli be ToNumber(ms).
Let date be MakeDate(Day(t), MakeTime(HourFromTime(t), m, s, milli)).
Let u be TimeClip(UTC(date)).
Set the [[PrimitiveValue]] internal property of this Date object to u.
Return u.
The length property of the setMinutes method is 3.

15.9.5.33 Date.prototype.setUTCMinutes (min [, sec [, ms ] ] )

If sec is not specified, this behaves as if sec were specified with the value getUTCSeconds().

If ms is not specified, this function behaves as if ms were specified with the value return by getUTCMilliseconds().

Let t be this time value.
Let m be ToNumber(min).
If sec is not specified, then let s be SecFromTime(t); otherwise, let s be ToNumber(sec).
If ms is not specified, then let milli be msFromTime(t); otherwise, let milli be ToNumber(ms).
Let date be MakeDate(Day(t), MakeTime(HourFromTime(t), m, s, milli)).
Let v be TimeClip(date).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
The length property of the setUTCMinutes method is 3.

15.9.5.34 Date.prototype.setHours (hour [, min [, sec [, ms ] ] ] )

If min is not specified, this behaves as if min were specified with the value getMinutes().

If sec is not specified, this behaves as if sec were specified with the value getSeconds().

If ms is not specified, this behaves as if ms were specified with the value getMilliseconds().

Let t be the result of LocalTime(this time value).
Let h be ToNumber(hour).
If min is not specified, then let m be MinFromTime(t); otherwise, let m be ToNumber(min).
If If sec is not specified, then let s be SecFromTime(t); otherwise, let s be ToNumber(sec).
If ms is not specified, then let milli be msFromTime(t); otherwise, let milli be ToNumber(ms).
Let date be MakeDate(Day(t), MakeTime(h, m, s, milli)).
Let u be TimeClip(UTC(date)).
Set the [[PrimitiveValue]] internal property of this Date object to u.
Return u.
The length property of the setHours method is 4.

15.9.5.35 Date.prototype.setUTCHours (hour [, min [, sec [, ms ] ] ] )

If min is not specified, this behaves as if min were specified with the value getUTCMinutes().

If sec is not specified, this behaves as if sec were specified with the value getUTCSeconds().

If ms is not specified, this behaves as if ms were specified with the value getUTCMilliseconds().

Let t be this time value.
Let h be ToNumber(hour).
If min is not specified, then let m be MinFromTime(t); otherwise, let m be ToNumber(min).
If sec is not specified, then let s be SecFromTime(t); otherwise, let s be ToNumber(sec).
If ms is not specified, then let milli be msFromTime(t); otherwise, let milli be ToNumber(ms).
Let newDate be MakeDate(Day(t), MakeTime(h, m, s, milli)).
Let v be TimeClip(newDate).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
The length property of the setUTCHours method is 4.

15.9.5.36 Date.prototype.setDate (date)

Let t be the result of LocalTime(this time value).
Let dt be ToNumber(date).
Let newDate be MakeDate(MakeDay(YearFromTime(t), MonthFromTime(t), dt), TimeWithinDay(t)).
Let u be TimeClip(UTC(newDate)).
Set the [[PrimitiveValue]] internal property of this Date object to u.
Return u.
15.9.5.37 Date.prototype.setUTCDate (date)

Let t be this time value.
Let dt be ToNumber(date).
Let newDate be MakeDate(MakeDay(YearFromTime(t), MonthFromTime(t), dt), TimeWithinDay(t)).
Let v be TimeClip(newDate).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
15.9.5.38 Date.prototype.setMonth (month [, date ] )

If date is not specified, this behaves as if date were specified with the value getDate().

Let t be the result of LocalTime(this time value).
Let m be ToNumber(month).
If date is not specified, then let dt be DateFromTime(t); otherwise, let dt be ToNumber(date).
Let newDate be MakeDate(MakeDay(YearFromTime(t), m, dt), TimeWithinDay(t)).
Let u be TimeClip(UTC(newDate)).
Set the [[PrimitiveValue]] internal property of this Date object to u.
Return u.
The length property of the setMonth method is 2.

15.9.5.39 Date.prototype.setUTCMonth (month [, date ] )

If date is not specified, this behaves as if date were specified with the value getUTCDate().

Let t be this time value.
Let m be ToNumber(month).
If date is not specified, then let dt be DateFromTime(t); otherwise, let dt be ToNumber(date).
Let newDate be MakeDate(MakeDay(YearFromTime(t), m, dt), TimeWithinDay(t)).
Let v be TimeClip(newDate).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
The length property of the setUTCMonth method is 2.

15.9.5.40 Date.prototype.setFullYear (year [, month [, date ] ] )

If month is not specified, this behaves as if month were specified with the value getMonth().

If date is not specified, this behaves as if date were specified with the value getDate().

Let t be the result of LocalTime(this time value); but if this time value is NaN, let t be +0.
Let y be ToNumber(year).
If month is not specified, then let m be MonthFromTime(t); otherwise, let m be ToNumber(month).
If date is not specified, then let dt be DateFromTime(t); otherwise, let dt be ToNumber(date).
Let newDate be MakeDate(MakeDay(y, m, dt), TimeWithinDay(t)).
Let u be TimeClip(UTC(newDate)).
Set the [[PrimitiveValue]] internal property of this Date object to u.
Return u.
The length property of the setFullYear method is 3.

15.9.5.41 Date.prototype.setUTCFullYear (year [, month [, date ] ] )

If month is not specified, this behaves as if month were specified with the value getUTCMonth().

If date is not specified, this behaves as if date were specified with the value getUTCDate().

Let t be this time value; but if this time value is NaN, let t be +0.
Let y be ToNumber(year).
If month is not specified, then let m be MonthFromTime(t); otherwise, let m be ToNumber(month).
If date is not specified, then let dt be DateFromTime(t); otherwise, let dt be ToNumber(date).
Let newDate be MakeDate(MakeDay(y, m, dt), TimeWithinDay(t)).
Let v be TimeClip(newDate).
Set the [[PrimitiveValue]] internal property of this Date object to v.
Return v.
The length property of the setUTCFullYear method is 3.

15.9.5.42 Date.prototype.toUTCString ( )

This function returns a String value. The contents of the String are implementation-dependent, but are intended to represent the Date in a convenient, human-readable form in UTC.

NOTE The intent is to produce a String representation of a date that is more readable than the format specified in 15.9.1.15. It is not essential that the chosen format be unambiguous or easily machine parsable. If an implementation does not have a preferred human-readable format it is recommended to use the format defined in 15.9.1.15 but with a space rather than a “T” used to separate the date and time elements.

15.9.5.43 Date.prototype.toISOString ( )

This function returns a String value represent the instance in time represented by this Date object. The format of the String is the Date Time string format defined in 15.9.1.15. All fields are present in the String. The time zone is always UTC, denoted by the suffix Z. If the time value of this object is not a finite Number a RangeError exception is thrown.

15.9.5.44 Date.prototype.toJSON ( key )

This function provides a String representation of a Date object for use by JSON.stringify (15.12.3).

When the toJSON method is called with argument key, the following steps are taken:

Let O be the result of calling ToObject, giving it the this value as its argument.
Let tv be ToPrimitive(O, hint Number).
If tv is a Number and is not finite, return null.
Let toISO be the result of calling the [[Get]] internal method of O with argument "toISOString".
If IsCallable(toISO) is false, throw a TypeError exception.
Return the result of calling the [[Call]] internal method of toISO with O as the this value and an empty argument list.
NOTE 1 The argument is ignored.

NOTE 2 The toJSON function is intentionally generic; it does not require that its this value be a Date object. Therefore, it can be transferred to other kinds of objects for use as a method. However, it does require that any such object have a toISOString method. An object is free to use the argument key to filter its stringification.

15.9.6 Properties of Date Instances

Date instances inherit properties from the Date prototype object and their [[Class]] internal property value is "Date". Date instances also have a [[PrimitiveValue]] internal property.

The [[PrimitiveValue]] internal property is time value represented by this Date object.