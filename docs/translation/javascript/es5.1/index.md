# ECMAScript ES5.1 組み込みオブジェクト対応表

- [参考](https://262.ecma-international.org/5.1/)
- [MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects)

__記号__:

- ❌ ES5.1では非対応
- ⚠️ 非推奨

## 目次

__グローバル__:

- 値プロパティ
    - NaN
    - Infinity
    - undefined
    - ❌ 非対応
        - globalThis
- 関数プロパティ
    - eval (x)
    - parseInt (string , radix)
    - parseFloat (string)
    - isNaN (number)
    - isFinite (number)
    - decodeURI (encodedURI)
    - decodeURIComponent (encodedURIComponent)
    - encodeURI (uri)
    - encodeURIComponent (uriComponent)
    - ❌ 非対応
        - ⚠️ uneval()
        - ⚠️ escape()
        - ⚠️ unescape()
- 基本オブジェクト
    - Object
    - Function
    - Boolean
    - ❌ 非対応
        - Symbol
- エラーオブジェクト
    - Error
    - EvalError
    - RangeError
    - ReferenceError
    - SyntaxError
    - TypeError
    - URIError
    - ❌ 非対応
        - AggregateError
        - InternalError
- 数値と日付
    - Number
    - Math
    - Date
    - ❌ 非対応
        - BigInt
- テキスト処理
    - String
    - RegExp
- 索引付きコレクション
    - Array
    - ❌ 非対応
        - Int8Array
        - Uint8Array
        - Uint8ClampedArray
        - Int16Array
        - Uint16Array
        - Int32Array
        - Uint32Array
        - Float32Array
        - Float64Array
        - BigInt64Array
        - BigUint64Array
- キー付きコレクション
    - ❌ 非対応
        - Map
        - Set
        - WeakMap
        - WeakSet
- 構造化データ
    - JSON
    - ❌ 非対応
        - ArrayBuffer
        - SharedArrayBuffer
        - Atomics
        - DataView
- 制御抽象化オブジェクト
    - ❌ 非対応
        - Promise
        - Generator
        - GeneratorFunction
        - AsyncFunction
        - AsyncGenerator (en-US)
        - AsyncGeneratorFunction (en-US)
- リフレクション
    - ❌ 非対応
        - Reflect
        - Proxy
- 国際化
    - ❌ 非対応
        - Intl
        - Intl.Collator
        - Intl.DateTimeFormat
        - Intl.ListFormat
        - Intl.NumberFormat
        - Intl.PluralRules
        - Intl.RelativeTimeFormat
        - Intl.Locale
- WebAssembly
    - ❌ 非対応
        - WebAssembly
        - WebAssembly.Module
        - WebAssembly.Instance
        - WebAssembly.Memory
        - WebAssembly.Table
        - WebAssembly.CompileError
        - WebAssembly.LinkError
        - WebAssembly.RuntimeError
- その他
    - arguments

## 基本オブジェクト

__Object__:

- コンストラクター
    - Object ( [ value ] )
    - new Object ( [ value ] )
- 静的プロパティ
    - Object.prototype
- 静的メソッド
    - Object.create ( O [, Properties] )
    - Object.defineProperty ( O, P, Attributes )
    - Object.defineProperties ( O, Properties )
    - Object.freeze ( O )
    - Object.getOwnPropertyDescriptor ( O, P )
    - Object.getOwnPropertyNames ( O )
    - Object.getPrototypeOf ( O )
    - Object.isExtensible ( O )
    - Object.isFrozen ( O )
    - Object.isSealed ( O )
    - Object.keys ( O )
    - Object.preventExtensions ( O )
    - Object.seal ( O )
    - ❌ 非対応
        - Object.assign()
        - Object.entries()
        - Object.fromEntries()
        - Object.getOwnPropertyDescriptors()
        - Object.getOwnPropertySymbols()
        - Object.is()
        - Object.setPrototypeOf()
        - Object.values()
- インスタンスプロパティ
    - Object.prototype.constructor
    - ❌ 非対応
        - ⚠️ Object.prototype.\_\_proto\_\_
- インスタンスメソッド
    - Object.prototype.hasOwnProperty (V)
    - Object.prototype.isPrototypeOf (V)
    - Object.prototype.toLocaleString ( )
    - Object.prototype.toString ( )
    - Object.prototype.valueOf ( )
    - ❌ 非対応
        - Object.prototype.propertyIsEnumerable()
        - ⚠️ Object.prototype.\_\_defineGetter\_\_()
        - ⚠️ Object.prototype.\_\_defineSetter\_\_()
        - ⚠️ Object.prototype.\_\_lookupGetter\_\_()
        - ⚠️ Object.prototype.\_\_lookupSetter\_\_()

__Function__:

- コンストラクター
    - Function (p1, p2, … , pn, body)
    - new Function (p1, p2, … , pn, body)
- 静的プロパティ
    - Function.prototype
    - Function.length
    - ❌ 非対応
        - Function.name
        - ⚠️ Function.arguments
        - ⚠️ Function.caller
        - ⚠️ Function.displayName
- インスタンスプロパティ
    - Function.prototype.constructor
- インスタンスメソッド
    - Function.prototype.apply (thisArg, argArray)
    - Function.prototype.bind (thisArg [, arg1 [, arg2, …]])
    - Function.prototype.call (thisArg [ , arg1 [ , arg2, … ] ] )
    - Function.prototype.toString ( )

__Boolean__:

- コンストラクター
    - Boolean (value)
    - new Boolean (value)
- 静的プロパティ
    - Boolean.prototype
- インスタンスプロパティ
    - Boolean.prototype.constructor
- インスタンスメソッド
    - Boolean.prototype.toString ( )
    - Boolean.prototype.valueOf ( )

__基本オブジェクト__:

- ❌ 非対応
    - Symbol

## エラーオブジェクト

__Error__:

- エラーの型
    - EvalError
    - RangeError
    - ReferenceError
    - SyntaxError
    - TypeError
    - URIError
    - ❌ 非対応
        - InternalError
- コンストラクター
    - Error (message)
    - new Error (message)
- 静的プロパティ
    - Error.prototype
- 静的メソッド
    - ❌ 非対応
        - (標準外のV8の関数) Error.captureStackTrace()
- インスタンスプロパティ
    - Error.prototype.constructor
    - Error.prototype.name
    - Error.prototype.message
    - ❌ 非対応
        - (標準外の Microsoft のプロパティ) Error.prototype.description
        - (標準外の Microsoft のプロパティ) Error.prototype.number
        - (標準外の Mozilla のプロパティ) Error.prototype.fileName
        - (標準外の Mozilla のプロパティ) Error.prototype.lineNumber
        - (標準外の Mozilla のプロパティ) Error.prototype.columnNumber
        - (標準外の Mozilla のプロパティ) Error.prototype.stack
- インスタンスメソッド
    - Error.prototype.toString ( )

__その他のエラーオブジェクト__:

- Error
- EvalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError
- ❌ 非対応
  - AggregateError
  - InternalError


## 数値と日付

__Number__:

- コンストラクター
    - Number ( [ value ] )
    - new Number ( [ value ] )
- 静的プロパティ
    - Number.prototype
    - Number.MAX_VALUE
    - Number.MIN_VALUE
    - Number.NaN
    - Number.NEGATIVE_INFINITY
    - Number.POSITIVE_INFINITY
    - ❌ 非対応
        - Number.EPSILON
        - Number.MIN_SAFE_INTEGER
- 静的メソッド
    - ❌ 非対応
        - Number.isNaN()
        - Number.isFinite()
        - Number.isInteger()
        - Number.isSafeInteger()
        - Number.parseFloat(string)
        - Number.parseInt(string, [radix])
- インスタンスプロパティ
    - Number.prototype.constructor
- インスタンスメソッド
    - Number.prototype.toString ( [ radix ] )
    - Number.prototype.toLocaleString()
    - Number.prototype.valueOf ( )
    - Number.prototype.toFixed (fractionDigits)
    - Number.prototype.toExponential (fractionDigits)
    - Number.prototype.toPrecision (precision)

__Math__:

- 静的プロパティ
    - E
    - LN10
    - LN2
    - LOG2E
    - LOG10E
    - PI
    - SQRT1_2
    - SQRT2
- 静的メソッド
    - abs (x)
    - acos (x)
    - asin (x)
    - atan (x)
    - atan2 (y, x)
    - ceil (x)
    - cos (x)
    - exp (x)
    - floor (x)
    - log (x)
    - max ( [ value1 [ , value2 [ , … ] ] ] )
    - min ( [ value1 [ , value2 [ , … ] ] ] )
    - pow (x, y)
    - random ( )
    - round (x)
    - sin (x)
    - sqrt (x)
    - tan (x)
    - ❌ 非対応
        - Math.acosh(x)
        - Math.asinh(x)
        - Math.atanh(x)
        - Math.cbrt(x)
        - Math.clz32(x)
        - Math.cosh(x)
        - Math.expm1(x)
        - Math.fround(x)
        - Math.hypot([x[, y[, …]]])
        - Math.imul(x, y)
        - Math.log1p(x)
        - Math.log10(x)
        - Math.log2(x)
        - Math.sign(x)
        - Math.sinh(x)
        - Math.tanh(x)
        - Math.trunc(x)

__Date__:

- コンストラクター
    - Date ( [ year [, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] ] ] )
    - new Date (year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )
    - new Date (value)
    - new Date ( )
- 静的プロパティ
    - Date.prototype
- 静的メソッド
    - Date.parse (string)
    - Date.UTC (year, month [, date [, hours [, minutes [, seconds [, ms ] ] ] ] ] )
    - Date.now ( )
- インスタンスプロパティ
    - Date.prototype.constructor
- インスタンスメソッド
    - Date.prototype.getDate ( )
    - Date.prototype.getDay ( )
    - Date.prototype.getFullYear ( )
    - Date.prototype.getHours ( )
    - Date.prototype.getMilliseconds ( )
    - Date.prototype.getMinutes ( )
    - Date.prototype.getMonth ( )
    - Date.prototype.getSeconds ( )
    - Date.prototype.getTime ( )
    - Date.prototype.getTimezoneOffset ( )
    - Date.prototype.getUTCDate ( )
    - Date.prototype.getUTCDay ( )
    - Date.prototype.getUTCFullYear ( )
    - Date.prototype.getUTCHours ( )
    - Date.prototype.getUTCMilliseconds ( )
    - Date.prototype.getUTCMinutes ( )
    - Date.prototype.getUTCMonth ( )
    - Date.prototype.getUTCSeconds ( )
    - Date.prototype.setDate (date)
    - Date.prototype.setFullYear (year [, month [, date ] ] )
    - Date.prototype.setHours (hour [, min [, sec [, ms ] ] ] )
    - Date.prototype.setMilliseconds (ms)
    - Date.prototype.setMinutes (min [, sec [, ms ] ] )
    - Date.prototype.setMonth (month [, date ] )
    - Date.prototype.setSeconds (sec [, ms ] )
    - Date.prototype.setTime (time)
    - Date.prototype.setUTCDate (date)
    - Date.prototype.setUTCFullYear (year [, month [, date ] ] )
    - Date.prototype.setUTCHours (hour [, min [, sec [, ms ] ] ] )
    - Date.prototype.setUTCMilliseconds (ms)
    - Date.prototype.setUTCMinutes (min [, sec [, ms ] ] )
    - Date.prototype.setUTCMonth (month [, date ] )
    - Date.prototype.setUTCSeconds (sec [, ms ] )
    - Date.prototype.toDateString ( )
    - Date.prototype.toISOString ( )
    - Date.prototype.toJSON ( key )
    - Date.prototype.toLocaleDateString ( )
    - Date.prototype.toLocaleString ( )
    - Date.prototype.toLocaleTimeString ( )
    - Date.prototype.toString ( )
    - Date.prototype.toTimeString ( )
    - Date.prototype.toUTCString ( )
    - Date.prototype.valueOf ( )
    - ❌ 非対応
        - ⚠️ Date.prototype.getYear()
        - ⚠️ Date.prototype.setYear()
        - ⚠️ Date.prototype.toJSON ( key )

__その他の数値と日付__:

- ❌ 非対応
    - BigInt

## テキスト処理

__String__:

- コンストラクター
    - String ( [ value ] )
    - new String ( [ value ] )
- 静的プロパティ
    - String.prototype
- 静的メソッド
    - String.fromCharCode ( [ char0 [ , char1 [ , … ] ] ] )
    - ❌ 非対応
        - String.fromCodePoint(num1 [, ...[, numN)
        - String.raw()
- インスタンスプロパティ
    - String.prototype.constructor
    - String.prototype.length
- インスタンスメソッド
    - String.prototype.charAt (pos)
    - String.prototype.charCodeAt (pos)
    - String.prototype.concat ( [ string1 [ , string2 [ , … ] ] ] )
    - String.prototype.indexOf (searchString, position)
    - String.prototype.lastIndexOf (searchString, position)
    - String.prototype.localeCompare (that)
    - String.prototype.match (regexp)
    - String.prototype.replace (searchValue, replaceValue)
    - String.prototype.search (regexp)
    - String.prototype.split (separator, limit)
    - ⚠️ String.prototype.substr()
    - String.prototype.substring (start, end)
    - String.prototype.toLocaleLowerCase ( )
    - String.prototype.toLocaleUpperCase ( )
    - String.prototype.toLowerCase ( )
    - String.prototype.toString ( )
    - String.prototype.toUpperCase ( )
    - String.prototype.trim ( )
    - String.prototype.valueOf ( )
    - String.prototype.@@iterator()
    - ❌ 非対応
        - String.prototype.codePointAt(pos)
        - String.prototype.includes(searchString [, position])
        - String.prototype.endsWith(searchString [, length])
        - String.prototype.matchAll(regexp)
        - String.prototype.normalize([form])
        - String.prototype.padEnd(targetLength [, padString])
        - String.prototype.padStart(targetLength [, padString])
        - String.prototype.repeat(count)
        - String.prototype.replaceAll(searchFor, replaceWith)
        - String.prototype.slice(beginIndex[, endIndex])
        - String.prototype.startsWith(searchString [, length])
        - String.prototype.trimStart()
        - String.prototype.trimEnd()

__RegExp(正規表現)__:

- コンストラクター
    - RegExp(pattern, flags)
    - new RegExp(pattern, flags)
- 静的プロパティ
    - RegExp.prototype
    - ❌ 非対応
        - get RegExp[@@species]
- インスタンスプロパティ
    - RegExp.prototype.constructor
    - RegExp.prototype.global
    - RegExp.prototype.ignoreCase
    - RegExp.prototype.multiline
    - RegExp.prototype.source
    - RegExp.prototype.lastIndex
    - ❌ 非対応
        - RegExp.prototype.flags
        - RegExp.prototype.dotAll
        - RegExp.prototype.hasIndices
        - RegExp.prototype.sticky
        - RegExp.prototype.unicode
- インスタンスメソッド
    - RegExp.prototype.exec(string)
    - RegExp.prototype.test(string)
    - RegExp.prototype.toString()
    - ❌ 非対応
        - RegExp.prototype[@@match]()
        - RegExp.prototype[@@matchAll]()
        - RegExp.prototype[@@replace]()
        - RegExp.prototype[@@search]()
        - RegExp.prototype[@@split]()
        - ⚠️ RegExp.prototype.compile()


## 索引付きコレクション

__Array__:

- コンストラクター
    - Array ( [ item1 [ , item2 [ , … ] ] ] )
    - new Array ( [ item0 [ , item1 [ , … ] ] ] )
    - new Array (len)
- 静的プロパティ
    - Array.prototype
    - Array.isArray ( arg )
    - ❌ 非対応
        - Array.from()
        - Array.of()
- インスタンスプロパティ
    - Array.prototype.constructor
    - Array.prototype.length
    - ❌ 非対応
        - Array.prototype[@@unscopables]
- インスタンスメソッド
    - Array.prototype.concat ( [ item1 [ , item2 [ , … ] ] ] )
    - Array.prototype.every ( callbackfn [ , thisArg ] )
    - Array.prototype.filter ( callbackfn [ , thisArg ] )
    - Array.prototype.forEach ( callbackfn [ , thisArg ] )
    - Array.prototype.indexOf ( searchElement [ , fromIndex ] )
    - Array.prototype.join (separator)
    - Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
    - Array.prototype.map ( callbackfn [ , thisArg ] )
    - Array.prototype.pop ( )
    - Array.prototype.push ( [ item1 [ , item2 [ , … ] ] ] )
    - Array.prototype.reduce ( callbackfn [ , initialValue ] )
    - Array.prototype.reduceRight ( callbackfn [ , initialValue ] )
    - Array.prototype.reverse ( )
    - Array.prototype.shift ( )
    - Array.prototype.slice (start, end)
    - Array.prototype.some ( callbackfn [ , thisArg ] )
    - Array.prototype.sort (comparefn)
    - Array.prototype.splice (start, deleteCount [ , item1 [ , item2 [ , … ] ] ] )
    - Array.prototype.toLocaleString ( )
    - Array.prototype.toString ( )
    - Array.prototype.unshift ( [ item1 [ , item2 [ , … ] ] ] )
    - ❌ 非対応
        - Array.prototype.at()
        - Array.prototype.copyWithin()
        - Array.prototype.entries()
        - Array.prototype.fill()
        - Array.prototype.find()
        - Array.prototype.findIndex()
        - Array.prototype.findLast()
        - Array.prototype.findLastIndex()
        - Array.prototype.flat()
        - Array.prototype.flatMap()
        - (試験的)Array.prototype.group() 
        - (試験的)Array.prototype.groupToMap() 
        - Array.prototype.includes()
        - Array.prototype.keys()
        - Array.prototype.values()
        - Array.prototype[@@iterator]()

__その他の索引付きコレクション__:

- ❌ 非対応
    - Int8Array
    - Uint8Array
    - Uint8ClampedArray
    - Int16Array
    - Uint16Array
    - Int32Array
    - Uint32Array
    - Float32Array
    - Float64Array
    - BigInt64Array
    - BigUint64Array

## キー付きコレクション

- ❌ 非対応
    - Map
    - Set
    - WeakMap
    - WeakSet

## 構造化データ

__JSON__:
 
- 静的メソッド
    - JSON.parse ( text [ , reviver ] )
    - JSON.stringify ( value [ , replacer [ , space ] ] )

__その他の構造化データ__:

- ❌ 非対応
    - ArrayBuffer
    - SharedArrayBuffer
    - Atomics
    - DataView

## 制御抽象化オブジェクト

- ❌ 非対応
    - Promise
    - Generator
    - GeneratorFunction
    - AsyncFunction
    - AsyncGenerator (en-US)
    - AsyncGeneratorFunction (en-US)

## リフレクション

- ❌ 非対応
    - Reflect
    - Proxy

## 国際化

- ❌ 非対応
    - Intl
    - Intl.Collator
    - Intl.DateTimeFormat
    - Intl.ListFormat
    - Intl.NumberFormat
    - Intl.PluralRules
    - Intl.RelativeTimeFormat
    - Intl.Locale

## WebAssembly

- ❌ 非対応
    - WebAssembly
    - WebAssembly.Module
    - WebAssembly.Instance
    - WebAssembly.Memory
    - WebAssembly.Table
    - WebAssembly.CompileError
    - WebAssembly.LinkError
    - WebAssembly.RuntimeError

## その他

__arguments__: