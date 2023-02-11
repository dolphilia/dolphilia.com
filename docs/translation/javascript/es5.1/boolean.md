# Boolean

Boolean (value)

new Boolean (value)

Boolean.prototype

Boolean.prototype.constructor
Boolean.prototype.toString ( )
Boolean.prototype.valueOf ( )



15.6.1 The Boolean Constructor Called as a Function

When Boolean is called as a function rather than as a constructor, it performs a type conversion.

15.6.1.1 Boolean (value)

Returns a Boolean value (not a Boolean object) computed by ToBoolean(value).

15.6.2 The Boolean Constructor

When Boolean is called as part of a new expression it is a constructor: it initialises the newly created object.

15.6.2.1 new Boolean (value)

The [[Prototype]] internal property of the newly constructed object is set to the original Boolean prototype object, the one that is the initial value of Boolean.prototype (15.6.3.1).

The [[Class]] internal property of the newly constructed Boolean object is set to "Boolean".

The [[PrimitiveValue]] internal property of the newly constructed Boolean object is set to ToBoolean(value).

The [[Extensible]] internal property of the newly constructed object is set to true.

15.6.3 Properties of the Boolean Constructor

The value of the [[Prototype]] internal property of the Boolean constructor is the Function prototype object (15.3.4).

Besides the internal properties and the length property (whose value is 1), the Boolean constructor has the following property:

15.6.3.1 Boolean.prototype

The initial value of Boolean.prototype is the Boolean prototype object (15.6.4).

This property has the attributes { [[Writable]]: false, [[Enumerable]]: false, [[Configurable]]: false }.

15.6.4 Properties of the Boolean Prototype Object

The Boolean prototype object is itself a Boolean object (its [[Class]] is "Boolean") whose value is false.

The value of the [[Prototype]] internal property of the Boolean prototype object is the standard built-in Object prototype object (15.2.4).

15.6.4.1 Boolean.prototype.constructor

The initial value of Boolean.prototype.constructor is the built-in Boolean constructor.

15.6.4.2 Boolean.prototype.toString ( )

The following steps are taken:

Let B be the this value.
If Type(B) is Boolean, then let b be B.
Else if Type(B) is Object and the value of the [[Class]] internal property of B is "Boolean", then let b be the value of the [[PrimitiveValue]] internal property of B.
Else throw a TypeError exception.
If b is true, then return "true"; else return "false".
15.6.4.3 Boolean.prototype.valueOf ( )

The following steps are taken:

Let B be the this value.
If Type(B) is Boolean, then let b be B.
Else if Type(B) is Object and the value of the [[Class]] internal property of B is "Boolean", then let b be the value of the [[PrimitiveValue]] internal property of B.
Else throw a TypeError exception.
Return b.
15.6.5 Properties of Boolean Instances

Boolean instances inherit properties from the Boolean prototype object and their [[Class]] internal property value is "Boolean". Boolean instances also have a [[PrimitiveValue]] internal property.

The [[PrimitiveValue]] internal property is the Boolean value represented by this Boolean object.