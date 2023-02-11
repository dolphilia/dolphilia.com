# Error

Error (message)

new Error (message)

Error.prototype

Error.prototype.constructor
Error.prototype.name
Error.prototype.message
Error.prototype.toString ( )

EvalError
RangeError
ReferenceError
SyntaxError
TypeError
URIError

NativeError (message)

new NativeError (message)

NativeError.prototype

NativeError.prototype.constructor
NativeError.prototype.name
NativeError.prototype.message








Instances of Error objects are thrown as exceptions when runtime errors occur. The Error objects may also serve as base objects for user-defined exception classes.

15.11.1 The Error Constructor Called as a Function

When Error is called as a function rather than as a constructor, it creates and initialises a new Error object. Thus the function call Error(…) is equivalent to the object creation expression new Error(…) with the same arguments.

15.11.1.1 Error (message)

The [[Prototype]] internal property of the newly constructed object is set to the original Error prototype object, the one that is the initial value of Error.prototype (15.11.3.1).

The [[Class]] internal property of the newly constructed object is set to "Error".

The [[Extensible]] internal property of the newly constructed object is set to true.

If the argument message is not undefined, the message own property of the newly constructed object is set to ToString(message).

15.11.2 The Error Constructor

When Error is called as part of a new expression, it is a constructor: it initialises the newly created object.

15.11.2.1 new Error (message)

The [[Prototype]] internal property of the newly constructed object is set to the original Error prototype object, the one that is the initial value of Error.prototype (15.11.3.1).

The [[Class]] internal property of the newly constructed Error object is set to "Error".

The [[Extensible]] internal property of the newly constructed object is set to true.

If the argument message is not undefined, the message own property of the newly constructed object is set to ToString(message).

15.11.3 Properties of the Error Constructor

The value of the [[Prototype]] internal property of the Error constructor is the Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 1), the Error constructor has the following property:

15.11.3.1 Error.prototype

The initial value of Error.prototype is the Error prototype object (15.11.4).

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.11.4 Properties of the Error Prototype Object

The Error prototype object is itself an Error object (its [[Class]] is "Error").

The value of the [[Prototype]] internal property of the Error prototype object is the standard built-in Object prototype object (15.2.4).

15.11.4.1 Error.prototype.constructor

The initial value of Error.prototype.constructor is the built-in Error constructor.

15.11.4.2 Error.prototype.name

The initial value of Error.prototype.name is "Error".

15.11.4.3 Error.prototype.message

The initial value of Error.prototype.message is the empty String.

15.11.4.4 Error.prototype.toString ( )

The following steps are taken:

Let O be the this value.
If Type(O) is not Object, throw a TypeError exception.
Let name be the result of calling the [[Get]] internal method of O with argument "name".
If name is undefined, then let name be "Error"; else let name be ToString(name).
Let msg be the result of calling the [[Get]] internal method of O with argument "message".
If msg is undefined, then let msg be the empty String; else let msg be ToString(msg).
If msg is undefined, then let msg be the empty String; else let msg be ToString(msg).
If name is the empty String, return msg.
If msg is the empty String, return name.
Return the result of concatenating name, ":", a single space character, and msg.
15.11.5 Properties of Error Instances

Error instances inherit properties from the Error prototype object and their [[Class]] internal property value is "Error". Error instances have no special properties.

15.11.6 Native Error Types Used in This Standard

One of the NativeError objects below is thrown when a runtime error is detected. All of these objects share the same structure, as described in 15.11.7.

15.11.6.1 EvalError

This exception is not currently used within this specification. This object remains for compatibility with previous editions of this specification.

15.11.6.2 RangeError

Indicates a numeric value has exceeded the allowable range. See 15.4.2.2, 15.4.5.1, 15.7.4.2, 15.7.4.5, 15.7.4.6, 15.7.4.7, and 15.9.5.43.

15.11.6.3 ReferenceError

Indicate that an invalid reference value has been detected. See 8.7.1, 8.7.2, 10.2.1, 10.2.1.1.4, 10.2.1.2.4, and 11.13.1.

15.11.6.4 SyntaxError

Indicates that a parsing error has occurred. See 11.1.5, 11.3.1, 11.3.2, 11.4.1, 11.4.4, 11.4.5, 11.13.1, 11.13.2, 12.2.1, 12.10.1, 12.14.1, 13.1, 15.1.2.1, 15.3.2.1, 15.10.2.2, 15.10.2.5, 15.10.2.9, 15.10.2.15, 15.10.2.19, 15.10.4.1, and 15.12.2.

15.11.6.5 TypeError

Indicates the actual type of an operand is different than the expected type. See 8.6.2, 8.7.2, 8.10.5, 8.12.5, 8.12.7, 8.12.8, 8.12.9, 9.9, 9.10, 10.2.1, 10.2.1.1.3, 10.6, 11.2.2, 11.2.3, 11.4.1, 11.8.6, 11.8.7, 11.3.1, 13.2, 13.2.3, 15, 15.2.3.2, 15.2.3.3, 15.2.3.4, 15.2.3.5, 15.2.3.6, 15.2.3.7, 15.2.3.8, 15.2.3.9, 15.2.3.10, 15.2.3.11, 15.2.3.12, 15.2.3.13, 15.2.3.14, 15.2.4.3, 15.3.4.2, 15.3.4.3, 15.3.4.4, 15.3.4.5, 15.3.4.5.2, 15.3.4.5.3, 15.3.5, 15.3.5.3, 15.3.5.4, 15.4.4.3, 15.4.4.11, 15.4.4.16, 15.4.4.17, 15.4.4.18, 15.4.4.19, 15.4.4.20, 15.4.4.21, 15.4.4.22, 15.4.5.1, 15.5.4.2, 15.5.4.3, 15.6.4.2, 15.6.4.3, 15.7.4, 15.7.4.2, 15.7.4.4, 15.9.5, 15.9.5.44, 15.10.4.1, 15.10.6, 15.11.4.4 and 15.12.3.

15.11.6.6 URIError

Indicates that one of the global URI handling functions was used in a way that is incompatible with its definition. See 15.1.3.

15.11.7NativeError Object Structure

When an ECMAScript implementation detects a runtime error, it throws an instance of one of the NativeError objects defined in 15.11.6. Each of these objects has the structure described below, differing only in the name used as the constructor name instead of NativeError, in the name property of the prototype object, and in the implementation-defined message property of the prototype object.

For each error object, references to NativeError in the definition should be replaced with the appropriate error object name from 15.11.6.

15.11.7.1NativeError Constructors Called as Functions

When a NativeError constructor is called as a function rather than as a constructor, it creates and initialises a new object. A call of the object as a function is equivalent to calling it as a constructor with the same arguments.

15.11.7.2NativeError (message)

The [[Prototype]] internal property of the newly constructed object is set to the prototype object for this error constructor. The [[Class]] internal property of the newly constructed object is set to "Error". The [[Extensible]] internal property of the newly constructed object is set to true.

If the argument message is not undefined, the message own property of the newly constructed object is set to ToString(message).

15.11.7.3 The NativeError Constructors

When a NativeError constructor is called as part of a new expression, it is a constructor: it initialises the newly created object.

15.11.7.4 new NativeError (message)

The [[Prototype]] internal property of the newly constructed object is set to the prototype object for this NativeError constructor. The [[Class]] internal property of the newly constructed object is set to "Error". The [[Extensible]] internal property of the newly constructed object is set to true.

If the argument message is not undefined, the message own property of the newly constructed object is set to ToString(message).

15.11.7.5 Properties of the NativeError Constructors

The value of the [[Prototype]] internal property of a NativeError constructor is the Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 1), each NativeError constructor has the following property:

15.11.7.6NativeError.prototype

The initial value of NativeError.prototype is a NativeError prototype object (15.11.7.7). Each NativeError constructor has a separate prototype object.

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.11.7.7 Properties of the NativeError Prototype Objects

Each NativeError prototype object is an Error object (its [[Class]] is "Error").

The value of the [[Prototype]] internal property of each NativeError prototype object is the standard built-in Error prototype object (15.11.4).

15.11.7.8NativeError.prototype.constructor

The initial value of the constructor property of the prototype for a given NativeError constructor is the NativeError constructor function itself (15.11.7).

15.11.7.9NativeError.prototype.name

The initial value of the name property of the prototype for a given NativeError constructor is the name of the constructor (the name used instead of NativeError).

15.11.7.10NativeError.prototype.message

The initial value of the message property of the prototype for a given NativeError constructor is the empty String.

NOTE The prototypes for the NativeError constructors do not themselves provide a toString function, but instances of errors will inherit it from the Error prototype object.

15.11.7.11 Properties of NativeError Instances

NativeError instances inherit properties from their NativeError prototype object and their [[Class]] internal property value is "Error". NativeError instances have no special properties.