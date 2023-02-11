# バリュースタックタイプの操作方法

## 読み取り値

以下の表は、特定の型（例：文字列）の値を読み取るためのAPIコールをまとめたものである。

|   Value stack entry type   |    duk_get_xxx()    | duk_get_xxx_default() | duk_require_xxx() |   duk_opt_xxx()    | duk_to_xxx() |
| -------------------------- | ------------------- | --------------------- | ----------------- | ------------------ | ------------ |
| none (index out of bounds) | default (automatic) | default (explicit)    | TypeError         | default (explicit) | TypeError    |
| undefined                  | default (automatic) | default (explicit)    | TypeError         | default (explicit) | coercion     |
| null                       | default (automatic) | default (explicit)    | TypeError         | TypeError          | coercion     |
| Matching type              | as is               | as is                 | as is             | as is              | as is        |
| Non-matching type          | default (automatic) | default (explicit)    | TypeError         | TypeError          | coercion     |

文字列の値の具体例。

|   Value stack entry type   | duk_get_string() | duk_get_string_default() | duk_require_string() |  duk_opt_string()  |                    duk_to_string()                    |
| -------------------------- | ---------------- | ------------------------ | -------------------- | ------------------ | ----------------------------------------------------- |
| none (index out of bounds) | NULL             | default (explicit)       | TypeError            | default (explicit) | TypeError                                             |
| undefined                  | NULL             | default (explicit)       | TypeError            | default (explicit) | "undefined"                                           |
| null                       | NULL             | default (explicit)       | TypeError            | TypeError          | "null"                                                |
| boolean                    | NULL             | default (explicit)       | TypeError            | TypeError          | "true"                                                |
| number                     | NULL             | default (explicit)       | TypeError            | TypeError          | "123.4"                                               |
| string                     | "hello"          | "hello"                  | "hello"              | "hello"            |                                                       |
| object                     | NULL             | default (explicit)       | TypeError            | TypeError          | "[object Object]"                                     |
| buffer                     | NULL             | default (explicit)       | TypeError            | TypeError          | "[object ArrayBuffer]"                                |
| pointer                    | NULL             | default (explicit)       | TypeError            | TypeError          | "0xdeadbeef"                                          |
| lightfunc                  | NULL             | default (explicit)       | TypeError            | TypeError          | "function light_08062727_0a11() { [lightfunc code] }" |


> Notes: 整数ゲッターは、APIの返り値に対して double から integer への強制変換を行います。この強制は、値スタック上の数値を変更しないので、double のままである。
