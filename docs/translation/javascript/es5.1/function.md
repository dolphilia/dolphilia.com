# Function

関数として呼び出される関数コンストラクタ
Function (p1, p2, … , pn, body)

関数コンストラクタ
new Function (p1, p2, … , pn, body)

関数コンストラクタのプロパティ
Function.prototype
Function.length

関数プロトタイプオブジェクトのプロパティ
Function.prototype.constructor
Function.prototype.toString ( )
Function.prototype.apply (thisArg, argArray)
Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )
Function.prototype.bind (thisArg [, arg1 [, arg2, …]])





## 15.3.1 The Function Constructor Called as a Function

When Function is called as a function rather than as a constructor, it creates and initialises a new Function object. Thus the function call Function(…) is equivalent to the object creation expression new Function(…) with the same arguments.

# 15.3.1.1 Function (p1, p2, … , pn, body)

When the Function function is called with some arguments p1, p2, … , pn, body (where n might be 0, that is, there are no “p” arguments, and where body might also not be provided), the following steps are taken:

Create and return a new Function object as if the standard built-in constructor Function was used in a new expression with the same arguments (15.3.2.1).

# 15.3.2 The Function Constructor

When Function is called as part of a new expression, it is a constructor: it initialises the newly created object.

# 15.3.2.1 new Function (p1, p2, … , pn, body)

The last argument specifies the body (executable code) of a function; any preceding arguments specify formal parameters.

When the Function constructor is called with some arguments p1, p2, … , pn, body (where n might be 0, that is, there are no “p” arguments, and where body might also not be provided), the following steps are taken:

Let argCount be the total number of arguments passed to this function invocation.
Let P be the empty String.
If argCount = 0, let body be the empty String.
Else if argCount = 1, let body be that argument.
Else, argCount > 1
Let firstArg be the first argument.
Let P be ToString(firstArg).
Let k be 2.
Repeat, while k < argCount
Let nextArg be the k’th argument.
Let P be the result of concatenating the previous value of P, the String "," (a comma), and ToString(nextArg).
Increase k by 1.
Let body be the k’th argument.
Let body be ToString(body).
If P is not parsable as a FormalParameterListopt then throw a SyntaxError exception.
If body is not parsable as FunctionBody then throw a SyntaxError exception.
If body is strict mode code (see 10.1.1) then let strict be true, else let strict be false.
If strict is true, throw any exceptions specified in 13.1 that apply.
Return a new Function object created as specified in 13.2 passing P as the FormalParameterListopt and body as the FunctionBody. Pass in the Global Environment as the Scope parameter and strict as the Strict flag.
A prototype property is automatically created for every function, to provide for the possibility that the function will be used as a constructor.

NOTE It is permissible but not necessary to have one argument for each formal parameter to be specified. For example, all three of the following expressions produce the same result:

new Function("a", "b", "c", "return a+b+c")
new Function("a, b, c", "return a+b+c")
new Function("a,b", "c", "return a+b+c")

# 15.3.3 Properties of the Function Constructor

The Function constructor is itself a Function object and its [[Class]] is "Function". The value of the [[Prototype]] internal property of the Function constructor is the standard built-in Function prototype object (15.3.4).

The value of the [[Extensible]] internal property of the Function constructor is true.

The Function constructor has the following properties:

## 15.3.3.1 Function.prototype

The initial value of Function.prototype is the standard built-in Function prototype object (15.3.4).

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

## 15.3.3.2 Function.length

This is a data property with a value of 1. This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

# 15.3.4 Properties of the Function Prototype Object

The Function prototype object is itself a Function object (its [[Class]] is "Function") that, when invoked, accepts any arguments and returns undefined.

The value of the [[Prototype]] internal property of the Function prototype object is the standard built-in Object prototype object (15.2.4). The initial value of the [[Extensible]] internal property of the Function prototype object is true.

The Function prototype object does not have a valueOf property of its own; however, it inherits the valueOf property from the Object prototype Object.

The length property of the Function prototype object is 0.

15.3.4.1 Function.prototype.constructor

The initial value of Function.prototype.constructor is the built-in Function constructor.

15.3.4.2 Function.prototype.toString ( )

An implementation-dependent representation of the function is returned. This representation has the syntax of a FunctionDeclaration. Note in particular that the use and placement of white space, line terminators, and semicolons within the representation String is implementation-dependent.

The toString function is not generic; it throws a TypeError exception if its this value is not a Function object. Therefore, it cannot be transferred to other kinds of objects for use as a method.

15.3.4.3 Function.prototype.apply (thisArg, argArray)

When the apply method is called on an object func with arguments thisArg and argArray, the following steps are taken:

If IsCallable(func) is false, then throw a TypeError exception.
If argArray is null or undefined, then
Return the result of calling the [[Call]] internal method of func, providing thisArg as the this value and an empty list of arguments.
If Type(argArray) is not Object, then throw a TypeError exception.
Let len be the result of calling the [[Get]] internal method of argArray with argument "length".
Let n be ToUint32(len).
Let argList be an empty List.
Let index be 0.
Repeat while index < n
Let indexName be ToString(index).
Let nextArg be the result of calling the [[Get]] internal method of argArray with indexName as the argument.
Append nextArg as the last element of argList.
Set index to index + 1.
Return the result of calling the [[Call]] internal method of func, providing thisArg as the this value and argList as the list of arguments.
The length property of the apply method is 2.

NOTE The thisArg value is passed without modification as the this value. This is a change from Edition 3, where a undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value.

15.3.4.4 Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )

When the call method is called on an object func with argument thisArg and optional arguments arg1, arg2 etc, the following steps are taken:

If IsCallable(func) is false, then throw a TypeError exception.
Let argList be an empty List.
If this method was called with more than one argument then in left to right order starting with arg1 append each argument as the last element of argList
Return the result of calling the [[Call]] internal method of func, providing thisArg as the this value and argList as the list of arguments.
The length property of the call method is 1.

NOTE The thisArg value is passed without modification as the this value. This is a change from Edition 3, where a undefined or null thisArg is replaced with the global object and ToObject is applied to all other values and that result is passed as the this value.

15.3.4.5 Function.prototype.bind (thisArg [, arg1 [, arg2, …]])

The bind method takes one or more arguments, thisArg and (optionally) arg1, arg2, etc, and returns a new function object by performing the following steps:

Let Target be the this value.
If IsCallable(Target) is false, throw a TypeError exception.
Let A be a new (possibly empty) internal list of all of the argument values provided after thisArg (arg1, arg2 etc), in order.
Let F be a new native ECMAScript object .
Set all the internal methods, except for [[Get]], of F as specified in 8.12.
Set the [[Get]] internal property of F as specified in 15.3.5.4.
Set the [[TargetFunction]] internal property of F to Target.
Set the [[BoundThis]] internal property of F to the value of thisArg.
Set the [[BoundArgs]] internal property of F to A.
Set the [[Class]] internal property of F to "Function".
Set the [[Prototype]] internal property of F to the standard built-in Function prototype object as specified in 15.3.3.1.
Set the [[Call]] internal property of F as described in 15.3.4.5.1.
Set the [[Construct]] internal property of F as described in 15.3.4.5.2.
Set the [[HasInstance]] internal property of F as described in 15.3.4.5.3.
If the [[Class]] internal property of Target is "Function", then
Let L be the length property of Target minus the length of A.
Set the length own property of F to either 0 or L, whichever is larger.
Else set the length own property of F to 0.
Set the attributes of the length own property of F to the values specified in 15.3.5.1.
Set the [[Extensible]] internal property of F to true.
Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
Call the [[DefineOwnProperty]] internal method of F with arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false}, and false.
Call the [[DefineOwnProperty]] internal method of F with arguments "arguments", PropertyDescriptor {[[Get]]: thrower, [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false}, and false.
Return F.
The length property of the bind method is 1.

NOTE Function objects created using Function.prototype.bind do not have a prototype property or the [[Code]], [[FormalParameters]], and [[Scope]] internal properties.

15.3.4.5.1 [[Call]]

When the [[Call]] internal method of a function object, F, which was created using the bind function is called with a this value and a list of arguments ExtraArgs, the following steps are taken:

Let boundArgs be the value of F’s [[BoundArgs]] internal property.
Let boundThis be the value of F’s [[BoundThis]] internal property.
Let target be the value of F’s [[TargetFunction]] internal property.
Let args be a new list containing the same values as the list boundArgs in the same order followed by the same values as the list ExtraArgs in the same order.
Return the result of calling the [[Call]] internal method of target providing boundThis as the this value and providing args as the arguments.
15.3.4.5.2 [[Construct]]

When the [[Construct]] internal method of a function object, F that was created using the bind function is called with a list of arguments ExtraArgs, the following steps are taken:

Let target be the value of F’s [[TargetFunction]] internal property.
If target has no [[Construct]] internal method, a TypeError exception is thrown.
Let boundArgs be the value of F’s [[BoundArgs]] internal property.
Let args be a new list containing the same values as the list boundArgs in the same order followed by the same values as the list ExtraArgs in the same order.
Return the result of calling the [[Construct]] internal method of target providing args as the arguments.
15.3.4.5.3 [[HasInstance]] (V)

When the [[HasInstance]] internal method of a function object F, that was created using the bind function is called with argument V, the following steps are taken:

Let target be the value of F’s [[TargetFunction]] internal property.
If target has no [[HasInstance]] internal method, a TypeError exception is thrown.
Return the result of calling the [[HasInstance]] internal method of target providing V as the argument.

## 15.3.5 Properties of Function Instances

In addition to the required internal properties, every function instance has a [[Call]] internal property and in most cases uses a different version of the [[Get]] internal property. Depending on how they are created (see 8.6.2, 13.2, 15, and 15.3.4.5), function instances may have a [[HasInstance]] internal property, a [[Scope]] internal property, a [[Construct]] internal property, a [[FormalParameters]] internal property, a [[Code]] internal property, a [[TargetFunction]] internal property, a [[BoundThis]] internal property, and a [[BoundArgs]] internal property.

The value of the [[Class]] internal property is "Function".

Function instances that correspond to strict mode functions (13.2) and function instances created using the Function.prototype.bind method (15.3.4.5) have properties named “caller” and “arguments” that throw a TypeError exception. An ECMAScript implementation must not associate any implementation specific behaviour with accesses of these properties from strict mode function code.

15.3.5.1 length

The value of the length property is an integer that indicates the “typical” number of arguments expected by the function. However, the language permits the function to be invoked with some other number of arguments. The behaviour of a function when invoked on a number of arguments other than the number specified by its length property depends on the function. This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.3.5.2 prototype

The value of the prototype property is used to initialise the [[Prototype]] internal property of a newly created object before the Function object is invoked as a constructor for that newly created object. This property has the attribute { [[Writable]]: true, [[Enumerable]]: false, [[Configurable]]: false }.

NOTE Function objects created using Function.prototype.bind do not have a prototype property.

15.3.5.3 [[HasInstance]] (V)

Assume F is a Function object.

When the [[HasInstance]] internal method of F is called with value V, the following steps are taken:

If V is not an object, return false.
Let O be the result of calling the [[Get]] internal method of F with property name "prototype".
If Type(O) is not Object, throw a TypeError exception.
Repeat
Let V be the value of the [[Prototype]] internal property of V.
If V is null, return false.
If O and V refer to the same object, return true.
NOTE Function objects created using Function.prototype.bind have a different implementation of [[HasInstance]] defined in 15.3.4.5.3.

15.3.5.4 [[Get]] (P)

Function objects use a variation of the [[Get]] internal method used for other native ECMAScript objects (8.12.3).

Assume F is a Function object. When the [[Get]] internal method of F is called with property name P, the following steps are taken:

Let v be the result of calling the default [[Get]] internal method (8.12.3) on F passing P as the property name argument.
If P is "caller" and v is a strict mode Function object, throw a TypeError exception.
Return v.
NOTE Function objects created using Function.prototype.bind use the default [[Get]] internal method.