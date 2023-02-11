# Object

- 関数
    - Object ( [ value ] )
- コンストラクタ
    - new Object ( [ value ] )
- プロパティ
    - Object.prototype
    - Object.getPrototypeOf ( O )
    - Object.getOwnPropertyDescriptor ( O, P )
    - Object.getOwnPropertyNames ( O )
    - Object.create ( O [, Properties] )
    - Object.defineProperty ( O, P, Attributes )
    - Object.defineProperties ( O, Properties )
    - Object.seal ( O )
    - Object.freeze ( O )
    - Object.preventExtensions ( O )
    - Object.isSealed ( O )
    - Object.isFrozen ( O )
    - Object.isExtensible ( O )
    - Object.keys ( O )
- プロトタイプ
    - Object.prototype.constructor
    - Object.prototype.toString ( )
    - Object.prototype.toLocaleString ( )
    - Object.prototype.valueOf ( )
    - Object.prototype.hasOwnProperty (V)
    - Object.prototype.isPrototypeOf (V)


## 関数として呼び出されるオブジェクトのコンストラクタ

When Object is called as a function rather than as a constructor, it performs a type conversion.

### Object ( [ value ] )

When the Object function is called with no arguments or with one argument value, the following steps are taken:

If value is null, undefined or not supplied, create and return a new Object object exactly as if the standard built-in Object constructor had been called with the same arguments (15.2.2.1).
Return ToObject(value).

## オブジェクトのコンストラクタ

When Object is called as part of a new expression, it is a constructor that may create an object.

### new Object ( [ value ] )

When the Object constructor is called with no arguments or with one argument value, the following steps are taken:

If value is supplied, then
If Type(value) is Object, then
If the value is a native ECMAScript object, do not create a new object but simply return value.
If the value is a host object, then actions are taken and a result is returned in an implementation-dependent manner that may depend on the host object.
If Type(value) is String, return ToObject(value).
If Type(value) is Boolean, return ToObject(value).
If Type(value) is Number, return ToObject(value).
Assert: The argument value was not supplied or its type was Null or Undefined.
Let obj be a newly created native ECMAScript object.
Set the [[Prototype]] internal property of obj to the standard built-in Object prototype object (15.2.4).
Set the [[Class]] internal property of obj to "Object".
Set the [[Extensible]] internal property of obj to true.
Set all the internal methods of obj as specified in 8.12.
Return obj.

## オブジェクト コンストラクタのプロパティ

The value of the [[Prototype]] internal property of the Object constructor is the standard built-in Function prototype object.

Besides the internal properties and the length property (whose value is 1), the Object constructor has the following properties:

### Object.prototype

The initial value of Object.prototype is the standard built-in Object prototype object (15.2.4).

This property has the attributes {[[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

### Object.getPrototypeOf ( O )

When the getPrototypeOf function is called with argument O, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
Return the value of the [[Prototype]] internal property of O.

### Object.getOwnPropertyDescriptor ( O, P )

When the getOwnPropertyDescriptor function is called, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
Let name be ToString(P).
Let desc be the result of calling the [[GetOwnProperty]] internal method of O with argument name.
Return the result of calling FromPropertyDescriptor(desc) (8.10.4).

### Object.getOwnPropertyNames ( O )

When the getOwnPropertyNames function is called, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
Let array be the result of creating a new object as if by the expression new Array () where Array is the standard built-in constructor with that name.
Let n be 0.
For each named own property P of O
Let name be the String value that is the name of P.
Call the [[DefineOwnProperty]] internal method of array with arguments ToString(n), the PropertyDescriptor {[[Value]]: name, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increment n by 1.
Return array.
NOTE If O is a String instance, the set of own properties processed in step 4 includes the implicit properties defined in 15.5.5.2 that correspond to character positions within the object’s [[PrimitiveValue]] String.

### Object.create ( O [, Properties] )

The create function creates a new object with a specified prototype. When the create function is called, the following steps are taken:

If Type(O) is not Object or Null throw a TypeError exception.
Let obj be the result of creating a new object as if by the expression new Object() where Object is the standard built-in constructor with that name
Set the [[Prototype]] internal property of obj to O.
If the argument Properties is present and not undefined, add own properties to obj as if by calling the standard built-in function Object.defineProperties with arguments obj and Properties.
Return obj.

### Object.defineProperty ( O, P, Attributes )

The defineProperty function is used to add an own property and/or update the attributes of an existing own property of an object. When the defineProperty function is called, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
Let name be ToString(P).
Let desc be the result of calling ToPropertyDescriptor with Attributes as the argument.
Call the [[DefineOwnProperty]] internal method of O with arguments name, desc, and true.
Return O.

### Object.defineProperties ( O, Properties )

The defineProperties function is used to add own properties and/or update the attributes of existing own properties of an object. When the defineProperties function is called, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
Let props be ToObject(Properties).
Let names be an internal list containing the names of each enumerable own property of props.
Let descriptors be an empty internal List.
For each element P of names in list order,
Let descObj be the result of calling the [[Get]] internal method of props with P as the argument.
Let desc be the result of calling ToPropertyDescriptor with descObj as the argument.
Append the pair (a two element List) consisting of P and desc to the end of descriptors.
For each pair from descriptors in list order,
Let P be the first element of pair.
Let desc be the second element of pair.
Call the [[DefineOwnProperty]] internal method of O with arguments P, desc, and true.
Return O.
If an implementation defines a specific order of enumeration for the for-in statement, that same enumeration order must be used to order the list elements in step 3 of this algorithm.

### Object.seal ( O )

When the seal function is called, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
For each named own property name P of O,
Let desc be the result of calling the [[GetOwnProperty]] internal method of O with P.
If desc.[[Configurable]] is true, set desc.[[Configurable]] to false.
Call the [[DefineOwnProperty]] internal method of O with P, desc, and true as arguments.
Set the [[Extensible]] internal property of O to false.
Return O.

### Object.freeze ( O )

When the freeze function is called, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
For each named own property name P of O,
Let desc be the result of calling the [[GetOwnProperty]] internal method of O with P.
If IsDataDescriptor(desc) is true, then
If desc.[[Writable]] is true, set desc.[[Writable]] to false.
If desc.[[Configurable]] is true, set desc.[[Configurable]] to false.
Call the [[DefineOwnProperty]] internal method of O with P, desc, and true as arguments.
Set the [[Extensible]] internal property of O to false.
Return O.

### Object.preventExtensions ( O )

When the preventExtensions function is called, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
Set the [[Extensible]] internal property of O to false.
Return O.

### Object.isSealed ( O )

When the isSealed function is called with argument O, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
For each named own property name P of O,
Let desc be the result of calling the [[GetOwnProperty]] internal method of O with P.
If desc.[[Configurable]] is true, then return false.
If the [[Extensible]] internal property of O is false, then return true.
Otherwise, return false.

### Object.isFrozen ( O )

When the isFrozen function is called with argument O, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
For each named own property name P of O,
Let desc be the result of calling the [[GetOwnProperty]] internal method of O with P.
If IsDataDescriptor(desc) is true then
If desc.[[Writable]] is true, return false.
If desc.[[Configurable]] is true, then return false.
If the [[Extensible]] internal property of O is false, then return true.
Otherwise, return false.

### Object.isExtensible ( O )

When the isExtensible function is called with argument O, the following steps are taken:

If Type(O) is not Object throw a TypeError exception.
Return the Boolean value of the [[Extensible]] internal property of O.

### Object.keys ( O )

When the keys function is called with argument O, the following steps are taken:

If the Type(O) is not Object, throw a TypeError exception.
Let n be the number of own enumerable properties of O
Let array be the result of creating a new Object as if by the expression new Array(n) where Array is the standard built-in constructor with that name.
Let index be 0.
For each own enumerable property of O whose name String is P
Call the [[DefineOwnProperty]] internal method of array with arguments ToString(index), the PropertyDescriptor {[[Value]]: P, [[Writable]]: true, [[Enumerable]]: true, [[Configurable]]: true}, and false.
Increment index by 1.
Return array.
If an implementation defines a specific order of enumeration for the for-in statement, that same enumeration order must be used in step 5 of this algorithm.

## オブジェクトのプロパティ プロトタイプ オブジェクト

The value of the [[Prototype]] internal property of the Object prototype object is null, the value of the [[Class]] internal property is "Object", and the initial value of the [[Extensible]] internal property is true.

### Object.prototype.constructor

The initial value of Object.prototype.constructor is the standard built-in Object constructor.

### Object.prototype.toString ( )

When the toString method is called, the following steps are taken:

If the this value is undefined, return "[object Undefined]".
If the this value is null, return "[object Null]".
Let O be the result of calling ToObject passing the this value as the argument.
Let class be the value of the [[Class]] internal property of O.
Return the String value that is the result of concatenating the three Strings "[object ", class, and "]".

### Object.prototype.toLocaleString ( )

When the toLocaleString method is called, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
Let toString be the result of calling the [[Get]] internal method of O passing "toString" as the argument.
If IsCallable(toString) is false, throw a TypeError exception.
Return the result of calling the [[Call]] internal method of toString passing O as the this value and no arguments.
NOTE 1 This function is provided to give all Objects a generic toLocaleString interface, even though not all may use it. Currently, Array, Number, and Date provide their own locale-sensitive toLocaleString methods.

NOTE 2 The first parameter to this function is likely to be used in a future version of this standard; it is recommended that implementations do not use this parameter position for anything else.

### Object.prototype.valueOf ( )

When the valueOf method is called, the following steps are taken:

Let O be the result of calling ToObject passing the this value as the argument.
If O is the result of calling the Object constructor with a host object (15.2.2.1), then
Return either O or another value such as the host object originally passed to the constructor. The specific result that is returned is implementation-defined.
Return O.

### Object.prototype.hasOwnProperty (V)

When the hasOwnProperty method is called with argument V, the following steps are taken:

Let P be ToString(V).
Let O be the result of calling ToObject passing the this value as the argument.
Let desc be the result of calling the [[GetOwnProperty]] internal method of O passing P as the argument.
If desc is undefined, return false.
Return true.
NOTE 1 Unlike [[HasProperty]] (8.12.6), this method does not consider objects in the prototype chain.

NOTE 2 The ordering of steps 1 and 2 is chosen to ensure that any exception that would have been thrown by step 1 in previous editions of this specification will continue to be thrown even if the this value is undefined or null.

### Object.prototype.isPrototypeOf (V)

When the isPrototypeOf method is called with argument V, the following steps are taken:

If V is not an object, return false.
Let O be the result of calling ToObject passing the this value as the argument.
Repeat
Let V be the value of the [[Prototype]] internal property of V.
if V is null, return false
If O and V refer to the same object, return true.
NOTE The ordering of steps 1 and 2 is chosen to preserve the behaviour specified by previous editions of this specification for the case where V is not an object and the this value is undefined or null.

### Object.prototype.propertyIsEnumerable (V)

When the propertyIsEnumerable method is called with argument V, the following steps are taken:

Let P be ToString(V).
Let O be the result of calling ToObject passing the this value as the argument.
Let desc be the result of calling the [[GetOwnProperty]] internal method of O passing P as the argument.
If desc is undefined, return false.
Return the value of desc.[[Enumerable]].
NOTE 1 This method does not consider objects in the prototype chain.

NOTE 2 The ordering of steps 1 and 2 is chosen to ensure that any exception that would have been thrown by step 1 in previous editions of this specification will continue to be thrown even if the this value is undefined or null.

## オブジェクトインスタンスのプロパティ

Object instances have no special properties beyond those inherited from the Object prototype object.