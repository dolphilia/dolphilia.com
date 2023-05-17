API
===

本書は、yyjsonライブラリのすべてのAPIの使用方法と例をまとめたものです。


# APIデザイン

## APIプレフィックス

すべての公開関数と構造体には `yyjson_` が、すべての定数には `YYJSON_` が接頭辞として付きます。

## イミュータブル/ミュータブルデータのためのAPI

ライブラリには、イミュータブルとミュータブルの2種類のデータ構造があります：

|type|immutable|mutable|
|---|---|---|
|document|yyjson_doc|yyjson_mut_doc|
|value|yyjson_val|yyjson_mut_val|


JSONを読むとき、yyjsonは不変の文書と値を返す;<br/>。
JSONを構築するとき、yyjsonはミュータブルなドキュメントと値を作成します;<br/>。
ドキュメントは、そのすべてのJSON値と文字列のメモリを保持する。<br/>

ほとんどのイミュータブルなAPIでは、例えば `yyjson_` の後に `mut` を追加するだけで、ミュータブルなバージョンを取得することが可能です：
```c
char *yyjson_write(yyjson_doc *doc, ...);
char *yyjson_mut_write(yyjson_mut_doc *doc, ...);

bool yyjson_is_str(yyjson_val *val);
bool yyjson_mut_is_str(yyjson_mut_val *val);
```

また、ライブラリには、immutableとmutableの間で値を変換する関数がいくつか用意されています:<br/>。

```c
// doc -> mut_doc
yyjson_mut_doc *yyjson_doc_mut_copy(yyjson_doc *doc, ...);
// val -> mut_val
yyjson_mut_val *yyjson_val_mut_copy(yyjson_val *val, ...);

// mut_doc -> doc
yyjson_doc *yyjson_mut_doc_imut_copy(yyjson_mut_doc *doc, ...);
// mut_val -> val
yyjson_doc *yyjson_mut_val_imut_copy(yyjson_mut_val *val, ...);
```

## 文字列用API
本ライブラリはヌルターミネーター(`\0`)のある文字列とない文字列をサポートしています。<br/>
ヌル終端記号のない文字列を使いたいときや、文字列の長さを明示的に知りたいときは、例えば `n` で終わる関数を使うことができる：
```c
// null-terminatorが必要です。
bool yyjson_equals_str(yyjson_val *val, const char *str);
// null-terminatorはオプションです。
bool yyjson_equals_strn(yyjson_val *val, const char *str, size_t len);
```

JSONを作成するとき、yyjsonはパフォーマンスを向上させるために文字列を定数として扱います。文字列が変更される場合は、例えば `cpy` を持つ関数を使って、文字列をドキュメントにコピーする必要があります：
```c
// 参照のみ、ヌル文字で終端する必要があります。
yyjson_mut_val *yyjson_mut_str(yyjson_mut_doc *doc, const char *str);
// 参照のみ、Null-terminatedはオプションです。
yyjson_mut_val *yyjson_mut_strn(yyjson_mut_doc *doc, const char *str, size_t len);

// コピーされ、Null-terminatedが必要です。
yyjson_mut_val *yyjson_mut_strcpy(yyjson_mut_doc *doc, const char *str);
// コピーされた、Null-terminatedはオプションです。
yyjson_mut_val *yyjson_mut_strncpy(yyjson_mut_doc *doc, const char *str, size_t len);
```



---------------
# JSONを読む
JSONを読み込むための4つの関数が用意されています<br/>。
各関数はUTF-8データまたはファイルの入力を受け付けます<br/>。
成功した場合はドキュメントを、失敗した場合はNULLを返します。

## 文字列からJSONを読み込む
`dat`はUTF-8の文字列で、ヌルターミネーターは不要です。<br/>
`len` は `dat` のバイト長です。<br/>
`flg` はリーダフラグであり、必要なければ0を渡す。<br/>
入力が無効な場合、`NULL`が返される。

```c
yyjson_doc *yyjson_read(const char *dat, 
                        size_t len, 
                        yyjson_read_flag flg);
```
サンプルコードです：

```c
const char *str = "[1,2,3,4]";
yyjson_doc *doc = yyjson_read(str, strlen(str), 0);
if (doc) {...}
yyjson_doc_free(doc);
```

## ファイルからJSONを読み込む

`path`はJSONファイルのパスです。<br/>
`flg` はリーダーフラグで、必要ない場合は 0 を渡す。<br/>
`alc` はメモリアロケータであり、必要ない場合は NULL を渡す。<br/>
`err` はエラーメッセージを受け取るためのポインタであり、必要なければ NULL を渡してください。<br/>
入力が無効な場合は `NULL` が返される。

```c
yyjson_doc *yyjson_read_file(const char *path,
                             yyjson_read_flag flg,
                             const yyjson_alc *alc,
                             yyjson_read_err *err);
```

サンプルコードです：

```c
yyjson_doc *doc = yyjson_read_file("/tmp/test.json", 0, NULL, NULL);
if (doc) {...}
yyjson_doc_free(doc);
```

## ファイルポインタからJSONを読み込む

`fp`はファイルポインタです。データはFILEの現在位置から末尾まで読み込まれる。<br/>
`flg` はリーダーフラグであり、必要ない場合は 0 を渡します。<br/>
`alc` はメモリアロケータで、必要なければ NULL を渡します。詳細は `memory allocator` を参照してください。<br/>
`err` はエラーメッセージを受け取るためのポインタであり、必要なければ NULL を渡してください。<br/>
入力が無効な場合は `NULL` が返される。

```c
yyjson_doc *yyjson_read_fp(FILE *fp,
                           yyjson_read_flag flg,
                           const yyjson_alc *alc,
                           yyjson_read_err *err);
```

サンプルコードです：

```c
FILE *fp = fdopen(fd, "rb"); // POSIXファイルディスクリプタ(fd)
yyjson_doc *doc = yyjson_read_fp(fp, 0, NULL, NULL);
if (fp) fclose(fp);
if (doc) {...}
yyjson_doc_free(doc);
```

## オプションでJSONを読み込む
`dat` は UTF-8 文字列です。`YYJSON_READ_INSITU` フラグを使用しない場合は const 文字列を渡すことができます。<br/> 
`len` は `dat` の長さをバイト数で表したものです。<br/> 
`flg` はリーダーフラグであり、必要ない場合は 0 を渡す。<br/> 
`alc` はメモリアロケータであり、必要ない場合は NULL を渡します。<br/> 
`err` はエラーメッセージを受け取るためのポインタです。必要なければ NULL を渡してください。<br/> 

```c
yyjson_doc *yyjson_read_opts(char *dat, 
                             size_t len, 
                             yyjson_read_flag flg,
                             const yyjson_alc *alc, 
                             yyjson_read_err *err);
```

サンプルコードです：

```c
const char *dat = your_file.bytes;
size_t len = your_file.size;

yyjson_read_flag flg = YYJSON_READ_ALLOW_COMMENTS | YYJSON_READ_ALLOW_INF_AND_NAN;
yyjson_err err;
yyjson_doc *doc = yyjson_read_opts((char *)dat, len, flg, NULL, &err);

if (doc) {...}
else printf("read error: %s code: %u at position: %ld\n", err.msg, err.code, err.pos);

yyjson_doc_free(doc);
```

## リーダーフラグ
本ライブラリは、JSONリーダー用のフラグを提供します。<br/>
単一のフラグを使用することも、ビット演算子 `|` を用いて複数のフラグを組み合わせることもできます。

● **YYJSON_READ_NOFLAG = 0**

JSONリーダー（RFC-8259またはECMA-404準拠）用のデフォルトフラグです：

- 正の整数を `uint64_t` として読み込む。
- 負の整数を `int64_t` として読み込む。
- 浮動小数点数を正しく丸めながら `double` として読み込む。
- `uint64_t` や `int64_t` に収まらない整数を `double` として読み込む。
- 実数が無限大の場合、エラーを報告する。
- 文字列が無効なUTF-8文字またはBOMを含む場合、エラーを報告する。
- 末尾のカンマ、コメント、`inf`と`nan`リテラルでエラーを報告する。

● **YYJSON_READ_INSITU**

入力データをその場で読み込む<br/>。
このオプションは、リーダーが入力データを修正して文字列値を格納するために使用することを可能にし、読み取り速度をわずかに向上させることができます。呼び出し側は、文書を解放する前に入力データを保持する必要があります。入力データは少なくとも `YYJSON_PADDING_SIZE` バイトでパディングされなければならない。例：`[1,2]`は`[1,2]⇦、入力長は5であるべきである。

サンプルコードです：

```c
size_t dat_len = ...;
char *buf = malloc(dat_len + YYJSON_PADDING_SIZE); // (len + 4）より大きなバッファを作成する。
read_from_socket(buf, ...);
memset(buf + file_size, 0, YYJSON_PADDING_SIZE); // データ後に4バイトのパディングを設定する

yyjson_doc *doc = yyjson_read_opts(buf, dat_len, YYJSON_READ_INSITU, NULL, NULL);
if (doc) {...}
yyjson_doc_free(doc);
free(buf); // 入力されたデータは、ドキュメントの後に解放される必要があります。
```

● **YYJSON_READ_STOP_WHEN_DONE**

JSONドキュメントの後に追加のコンテンツがある場合、エラーを発行する代わりに、完了したら停止します。<br/>。
このオプションは、[NDJSON](https://en.wikipedia.org/wiki/JSON_streaming)のように、大きなデータの中の小さなJSONの断片をパースするために使用されます。<br/>

サンプルコードです：

```c
// など、複数のJSONを持つ単一ファイル：
// [1,2,3] [4,5,6] {"a":"b"}

size_t file_size = ...;
char *dat = malloc(file_size + 4);
your_read_file(dat, file);
memset(dat + file_size, 0, 4); // add padding
    
char *hdr = dat;
char *end = dat + file_size;
yyjson_read_flag flg = YYJSON_READ_INSITU | YYJSON_READ_STOP_WHEN_DONE;

while (true) {
    yyjson_doc *doc = yyjson_read_opts(hdr, end - hdr, flg, NULL, NULL);
    if (!doc) break;
    your_doc_process(doc);
    hdr += yyjson_doc_get_read_size(doc); // move to next position
    yyjson_doc_free(doc);
}
free(dat);
```

● **YYJSON_READ_ALLOW_TRAILING_COMMAS**

オブジェクトや配列の末尾にカンマを1つ付けることができるようにする：

```
{
    "a": 1,
    "b": 2,
}

[
    "a",
    "b",
]
```

● **YYJSON_READ_ALLOW_COMMENTS**

C言語スタイルの1行コメントや複数行コメントを許可する、といった具合です：

```
{
    "name": "Harry", // single line comment
    "id": /* multiple line comment */ 123
}
```

● **YYJSON_READ_ALLOW_INF_AND_NAN**

1e999, NaN, Inf, -Infinity などの nan/inf 数値またはリテラル（大文字小文字を区別しない）を許可する：

```
{
    "large": 123e999,
    "nan1": NaN,
    "nan2": nan,
    "inf1:" Inf,
    "inf2": -Infinity
}
```

● **YYJSON_READ_NUMBER_AS_RAW**

数値をパースせずに生の文字列として読み込むので、任意の大きさの数値を保持することができます。

これらの関数を使用して、生の文字列を抽出することができます：
```c
bool yyjson_is_raw(yyjson_val *val);
const char *yyjson_get_raw(yyjson_val *val);
size_t yyjson_get_len(yyjson_val *val)
```

● **YYJSON_READ_ALLOW_INVALID_UNICODE**

文字列のパース時に無効なユニコードを読み込めるようにする（例：非標準）：

```
"\x80xyz"
"\xF0\x81\x81\x81"
```

無効な文字が文字列の値に現れることは許されますが、無効なエスケープシーケンスがエラーとして報告されることは変わりません。このフラグは、正しくエンコードされた文字列の性能には影響しません。

***警告***: このオプションを使用すると、JSON値の文字列が不正なエンコーディングを含む可能性があるため、セキュリティリスクを回避するためにこれらの文字列を慎重に扱う必要があります。


---------------
# JSONの書き込み
JSONを書き込むための4つの関数が用意されており、各関数はJSON文書またはルート値の入力を受け付け、UTF-8の文字列またはファイルを返します。

## JSONを文字列に書き込む
`doc/val`はJSONのドキュメントまたはルートの値で、NULLを渡すとNULLの結果が得られる。<br/>
`flg` はライターフラグで、必要なければ0を渡します。詳細は `ライターフラグ` を参照してください。<br/>
`len` は出力の長さ (ヌルターミネータを含まない) を受け取るためのポインタである。<br/>
この関数は新しいJSON文字列を返し、エラーが発生した場合はNULLを返す。<br/>
文字列はUTF-8としてエンコードされ、ヌルターミネーターが付きます。<br/>
不要になったらfree()やalc->free()を使って解放する必要があります。

```c
// doc -> str
char *yyjson_write(const yyjson_doc *doc, yyjson_write_flag flg, size_t *len);
// mut_doc -> str
char *yyjson_mut_write(const yyjson_mut_doc *doc, yyjson_write_flag flg, size_t *len);
// val -> str
char *yyjson_val_write(const yyjson_val *val, yyjson_write_flag flg, size_t *len);
// mut_val -> str
char *yyjson_mut_val_write(const yyjson_mut_val *val, yyjson_write_flag flg, size_t *len);
```

サンプルコード1：

```c
yyjson_doc *doc = yyjson_read("[1,2,3]", 7, 0);
char *json = yyjson_write(doc, YYJSON_WRITE_PRETTY, NULL);
printf("%s\n", json);
free(json);
```

サンプルコード2：
```c
yyjson_mut_doc *doc = yyjson_mut_doc_new(NULL);
yyjson_mut_val *arr = yyjson_mut_arr(doc);
yyjson_mut_doc_set_root(doc, arr);
yyjson_mut_arr_add_int(doc, arr, 1);
yyjson_mut_arr_add_int(doc, arr, 2);
yyjson_mut_arr_add_int(doc, arr, 3);
    
char *json = yyjson_mut_write(doc, YYJSON_WRITE_PRETTY, NULL);
printf("%s\n", json);
free(json);
```

## JSONをファイルに書き込む
`path`は出力するJSONファイルのパスで、無効な場合はエラーになります。ファイルが空でない場合、内容は破棄される。<br/> 
`doc/val`はJSONドキュメントまたはルートの値で、NULLを渡すとエラーになる。<br/>
`flg` はライターフラグで、必要なければ0を渡す。詳細は `writer flag` を参照。<br/>
`alc` はメモリアロケータであり、必要なければ NULL を渡してください。<br/>
`err` はエラーメッセージを受け取るためのポインタであり、必要なければ NULL を渡してください。<br/>
この関数は成功したら真を、エラーが発生したら偽を返します。<br/>

```c
// doc -> file
bool yyjson_write_file(const char *path, const yyjson_doc *doc, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
// mut_doc -> file
bool yyjson_mut_write_file(const char *path, const yyjson_mut_doc *doc, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
// val -> file
bool yyjson_val_write_file(const char *path, const yyjson_val *val, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
// mut_val -> file
bool yyjson_mut_val_write_file(const char *path, const yyjson_mut_val *val, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
```

サンプルコードです：

```c
yyjson_doc *doc = yyjson_read_file("/tmp/test.json", 0, NULL, NULL);
bool suc = yyjson_write_file("tmp/test.json", doc, YYJSON_WRITE_PRETTY, NULL, NULL);
if (suc) printf("OK");
```

## ファイルポインタにJSONを書き込む
`fp`は出力ファイルへのポインタであり、データはファイルの現在位置に書き込まれる。<br/>
`doc/val`はJSONドキュメントまたはルート値です。NULLを渡すとエラーになります。<br/>
`flg` はライターフラグで、必要なければ0を渡します。詳細は `ライターフラグ` を参照してください。
`alc` はメモリアロケータであり、必要なければ NULL を渡してください。
`err` はエラーメッセージを受け取るためのポインタであり、必要なければ NULL を渡してください。
この関数は成功したら真を、エラーが発生したら偽を返します。<br/>

```c
// doc -> file
bool yyjson_write_fp(FILE *fp, const yyjson_doc *doc, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
// mut_doc -> file
bool yyjson_mut_write_fp(FILE *fp, const yyjson_mut_doc *doc, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
// val -> file
bool yyjson_val_write_fp(FILE *fp, const yyjson_val *val, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
// mut_val -> file
bool yyjson_mut_val_write_fp(FILE *fp, const yyjson_mut_val *val, yyjson_write_flag flg, const yyjson_alc *alc, yyjson_write_err *err);
```

サンプルコードです：

```c
FILE *fp = fdopen(fd, "wb"); // POSIX file descriptor (fd)
bool suc = yyjson_write_fp(fp, doc, YYJSON_WRITE_PRETTY, NULL, NULL);
if (fp) fclose(fp);
if (suc) printf("OK");
```

## オプションでJSONを書き込む
`doc/val`はJSONのドキュメントまたはルートの値であり、NULLを渡すとNULLの結果が得られる。<br/>
`flg` はライターフラグであり、必要なければ 0 を渡す。<br/>
`alc` はメモリアロケータであり、必要なければ NULL を渡す。詳細は `memory allocator` を参照。<br/>
`len` は出力の長さ (ヌルターミネータを含まない) を受け取るためのポインタであり、必要なければ NULL を渡してください。<br/>
`err` はエラーメッセージを受け取るためのポインタです、必要なければ NULL を渡してください。

この関数は、新しいJSON文字列、またはエラーが発生した場合はNULLを返します。<br/>
文字列はUTF-8でエンコードされ、ヌルターミネータが付きます。<br/>
不要になったらfree()またはalc->free()を使って解放する必要があります。

```c
char *yyjson_write_opts(const yyjson_doc *doc, yyjson_write_flag flg, const yyjson_alc *alc, size_t *len, yyjson_write_err *err);

char *yyjson_mut_write_opts(const yyjson_mut_doc *doc, yyjson_write_flag flg, const yyjson_alc *alc, size_t *len, yyjson_write_err *err);

char *yyjson_val_write_opts(const yyjson_val *val, yyjson_write_flag flg, const yyjson_alc *alc, size_t *len, yyjson_write_err *err);

char *yyjson_mut_val_write_opts(const yyjson_mut_val *val, yyjson_write_flag flg, const yyjson_alc *alc, size_t *len, yyjson_write_err *err);
```

Sample code:

```c
yyjson_doc *doc = ...;

// init an allocator with stack memory
char buf[64 * 1024];
yyjson_alc alc;
yyjson_alc_pool_init(&alc, buf, sizeof(buf));

// write
size_t len;
yyjson_write_err err;
char *json = yyjson_write_opts(doc, YYJSON_WRITE_PRETTY | YYJSON_WRITE_ESCAPE_UNICODE, &alc, &len, &err);

// get result
if (json) {
    printf("suc: %lu\n%s\n", len, json);
} else {
    printf("err: %u msg:%s\n", err.code, err.msg);
}
alc.free(alc.ctx, json);
```


## ライターフラグ
本ライブラリは、JSONライターのためのフラグを提供します。
単一のフラグを使用することも、ビット演算子 `|` を用いて複数のフラグを組み合わせることもできます。

● **YYJSON_WRITE_NOFLAG = 0**<br/>

JSONライターのデフォルトフラグです：

- JSONを書く minify.
- inf または nan 数でエラーを報告する。
- 無効なUTF-8文字列のエラーを報告する。
- Unicodeやスラッシュをエスケープしない。

● **YYJSON_WRITE_PRETTY**<br/>

4スペースインデントでJSONをきれいに書く。

● **YYJSON_WRITE_PRETTY_TWO_SPACES**<br/>

2スペースインデントでJSONをきれいに書く。
このフラグは `YYJSON_WRITE_PRETTY` フラグをオーバーライドします。

● **YYJSON_WRITE_ESCAPE_UNICODE**<br/>

unicodeを`XXXXX`とエスケープして、ASCIIのみ出力させるなど：

```json
["Alizée, 😊"]
["Aliz\\u00E9e, \\uD83D\\uDE0A"]
```

● **YYJSON_WRITE_ESCAPE_SLASHES**<br/>

例えば、`/`を`\/`としてエスケープする：

```json
["https://github.com"]
["https:\/\/github.com"]
```

● **YYJSON_WRITE_ALLOW_INF_AND_NAN**<br/>

inf/nan 数を、エラーを報告する代わりに `Infinity` と `NaN` リテラルとして記述する。<br/>

この出力は**NOT**標準JSONであり、例えば他のJSONライブラリによって拒否されるかもしれないことに注意してください：

```js
{"not_a_number":NaN,"large_number":Infinity}
```

● **YYJSON_WRITE_INF_AND_NAN_AS_NULL**<br/>

エラーを報告する代わりに inf/nan 数を `null` リテラルとして書き込みます。<br/>
このフラグは、例えば `YYJSON_WRITE_ALLOW_INF_AND_NAN` フラグをオーバーライドします：

```js
{"not_a_number":null,"large_number":null}
```

● **YYJSON_WRITE_ALLOW_INVALID_UNICODE**<br/>

文字列値のエンコード時に無効なユニコードを許可する。

文字列中の無効な文字は、バイト単位でコピーされる。YYJSON_WRITE_ESCAPE_UNICODE` フラグが設定されている場合、無効な文字は `uFFFD` (置換文字) としてエスケープされます。

このフラグは、正しくエンコードされた文字列のパフォーマンスには影響しない。


---------------
# JSONドキュメントにアクセスする

## JSONドキュメント

以下の機能で、ドキュメントの内容にアクセスすることができます：
```c
// このJSON文書のルート値を取得する。
yyjson_val *yyjson_doc_get_root(yyjson_doc *doc);

// JSONのパース時に何バイト読み込んだかを取得します。
// 例：「[1,2,3]」は7を返す。
size_t yyjson_doc_get_read_size(yyjson_doc *doc);

// このJSON文書に含まれる値の総数を取得する。
// 例：「[1,2,3]」は4個（配列1個と数値3個）を返す。
size_t yyjson_doc_get_val_count(yyjson_doc *doc);
```

ドキュメントは、その内部の値や文字列のためのすべてのメモリを保持しています。不要になったら、ドキュメントを解放して、すべてのメモリを解放する必要があります：
```c
// ドキュメントを解放する。NULLが渡された場合は、何もしない。
void yyjson_doc_free(yyjson_doc *doc);
```

## JSON値

JSON値の型は、以下の関数で判定することができます。

```c
// JSON 値の型とサブタイプを返します。
// 入力がNULLの場合は0を返します。
yyjson_type yyjson_get_type(yyjson_val *val);
yyjson_subtype yyjson_get_subtype(yyjson_val *val);

// 値のタグを返します。詳細は `Data Structures` のドキュメントを参照してください。
uint8_t yyjson_get_tag(yyjson_val *val);

// は、以下のようなタイプの説明を返します：  
// "null", "string", "array", "object", "true", "false",
// "uint", "sint", "real", "unknown"
const char *yyjson_get_type_desc(yyjson_val *val);

// JSON値が指定された型である場合、trueを返す。
// 入力がNULLまたは指定された型でない場合、falseを返す。
bool yyjson_is_null(yyjson_val *val);  // null
bool yyjson_is_true(yyjson_val *val);  // true
bool yyjson_is_false(yyjson_val *val); // false
bool yyjson_is_bool(yyjson_val *val);  // true/false
bool yyjson_is_uint(yyjson_val *val);  // uint64_t
bool yyjson_is_sint(yyjson_val *val);  // int64_t
bool yyjson_is_int(yyjson_val *val);   // uint64_t/int64_t
bool yyjson_is_real(yyjson_val *val);  // double
bool yyjson_is_num(yyjson_val *val);   // uint64_t/int64_t/double
bool yyjson_is_str(yyjson_val *val);   // string
bool yyjson_is_arr(yyjson_val *val);   // array
bool yyjson_is_obj(yyjson_val *val);   // object
bool yyjson_is_ctn(yyjson_val *val);   // array/object
```

JSON値の内容を取得するために、以下の関数を使用することができます。

```c
// `val` が bool 型でない場合は false を返す。
bool yyjson_get_bool(yyjson_val *val);

// uint64_t の値、または `val` が uint 型でない場合は 0 を返す。
uint64_t yyjson_get_uint(yyjson_val *val);

// int64_t の値、または `val` が sint 型でない場合は 0 を返す。
int64_t yyjson_get_sint(yyjson_val *val);

// int 型の値（オーバーフローする可能性がある）、または `val` が uint/sint 型でない場合は 0 を返す。
int yyjson_get_int(yyjson_val *val);

// double 型の値、または `val` が実数型でない場合は 0 を返す。
double yyjson_get_real(yyjson_val *val);

// double value (typecast) を返し、`val` が数値でない場合は 0 を返す。
double yyjson_get_num(yyjson_val *val);

// 文字列の値を返し、`val`が文字列型でない場合はNULLを返す。
const char *yyjson_get_str(yyjson_val *val);

// コンテンツ長（文字列長（バイト）、配列サイズ、オブジェクトサイズ）を返し、長さデータを含まない場合は0を返す。
size_t yyjson_get_len(yyjson_val *val);

// 値が文字列と等しいかどうかを返します。
// 入力がNULLであるか、`val`が文字列でない場合は偽を返す。
bool yyjson_equals_str(yyjson_val *val, const char *str);
bool yyjson_equals_strn(yyjson_val *val, const char *str, size_t len);
```


以下の関数を使用して、JSON値の内容を変更することができます。

警告イミュータブルなドキュメントでは、これらの関数は `immutable` という規約を破るので、このAPIのセットは注意して使う必要があります（例えば、ドキュメントが単一のスレッドでのみアクセスされることを確認する）。

```c
// 値を新しい型と内容に設定します。
// 入力がNULLの場合、または `val` がオブジェクトまたは配列の場合、偽を返す。
bool yyjson_set_raw(yyjson_val *val, const char *raw, size_t len);
bool yyjson_set_null(yyjson_val *val);
bool yyjson_set_bool(yyjson_val *val, bool num);
bool yyjson_set_uint(yyjson_val *val, uint64_t num);
bool yyjson_set_sint(yyjson_val *val, int64_t num);
bool yyjson_set_int(yyjson_val *val, int num);
bool yyjson_set_real(yyjson_val *val, double num);

// 文字列はコピーされず、呼び出し元が保持する必要があります。
bool yyjson_set_str(yyjson_val *val, const char *str);
bool yyjson_set_strn(yyjson_val *val, const char *str, size_t len);
```


## JSON配列

JSON配列にアクセスするには、以下の関数を使用することができます。

インデックスを指定して要素にアクセスすると、線形探索時間がかかる場合があることに注意してください。したがって、配列を反復処理する必要がある場合は、イテレータAPIを使用することが推奨されます。

```c
// この配列の要素数を返します。
// 入力が配列でない場合は0を返します。
size_t yyjson_arr_size(yyjson_val *arr);

// 指定された位置の要素を返す（線形探索時間）。
// インデックスが範囲外であるか、入力が配列でない場合はNULLを返す。
yyjson_val *yyjson_arr_get(yyjson_val *arr, size_t idx);

// この配列の最初の要素を返します（一定時間）。
// 配列が空であるか、intputが配列でない場合はNULLを返します。
yyjson_val *yyjson_arr_get_first(yyjson_val *arr);

// この配列の最後の要素を返します（線形探索時間）。
// 配列が空であるか、intputが配列でない場合はNULLを返します。
yyjson_val *yyjson_arr_get_last(yyjson_val *arr);
```

## JSON 配列イテレーター
配列を走査する方法は2つあります：<br/>。

サンプルコード1（イテレータAPI）：
```c
yyjson_val *arr; // 走査される配列

yyjson_val *val;
yyjson_arr_iter iter = yyjson_arr_iter_with(arr);
while ((val = yyjson_arr_iter_next(&iter))) {
    your_func(val);
}
```

サンプルコード2（foreachマクロ）です：
```c
yyjson_val *arr; // 走査される配列

size_t idx, max;
yyjson_val *val;
yyjson_arr_foreach(arr, idx, max, val) {
    your_func(idx, val);
}
```


また、ミュータブル配列に対応するミュータブルバージョンAPIも用意されています。

サンプルコード1（ミュータブル・イテレータAPI）：
```c
yyjson_mut_val *arr; // 走査される配列

yyjson_mut_val *val;
yyjson_mut_arr_iter iter = yyjson_mut_arr_iter_with(arr);
while ((val = yyjson_mut_arr_iter_next(&iter))) {
    if (your_val_is_unused(val)) {
        // イテレーションの中で現在の値を削除することができます。
        yyjson_mut_arr_iter_remove(&iter); 
    }
}
```

サンプルコード2（ミュータブルforeachマクロ）：
```c
yyjson_mut_val *arr; // 走査される配列

size_t idx, max;
yyjson_mut_val *val;
yyjson_mut_arr_foreach(arr, idx, max, val) {
    your_func(idx, val);
}
```


## JSONオブジェクト
JSONオブジェクトにアクセスするために、以下の関数を使用することができます。

キーによって要素にアクセスすると、線形探索時間がかかる場合があることに注意してください。したがって、オブジェクトを反復処理する必要がある場合は、イテレータAPIを使用することが推奨されます。


```c
// このオブジェクトに含まれるキーと値のペアの数を返します。
// input がオブジェクトでない場合、0 を返す。
size_t yyjson_obj_size(yyjson_val *obj);

// 指定されたキーがマッピングされている値を返します。
// このオブジェクトにキーに対応するマッピングがない場合は NULL を返します。
yyjson_val *yyjson_obj_get(yyjson_val *obj, const char *key);
yyjson_val *yyjson_obj_getn(yyjson_val *obj, const char *key, size_t key_len);

// オブジェクトのキーの順序がコンパイル時に判明している場合、
// を使用すると、オブジェクト全体の検索を回避することができます。
// 例）{ "x":1, "y":2, "z":3 }。
yyjson_val *obj = ...;
yyjson_obj_iter iter = yyjson_obj_iter_with(obj);

yyjson_val *x = yyjson_obj_iter_get(&iter, "x");
yyjson_val *z = yyjson_obj_iter_get(&iter, "z");
```

## JSONオブジェクト・イテレーター
オブジェクトを走査するには、2つの方法があります。

サンプルコード1（イテレータAPI）：
```c
yyjson_val *obj; // 走査されるオブジェクト

yyjson_val *key, *val;
yyjson_obj_iter iter = yyjson_obj_iter_with(obj);
while ((key = yyjson_obj_iter_next(&iter))) {
    val = yyjson_obj_iter_get_val(key);
    your_func(key, val);
}
```

サンプルコード2（foreachマクロ）です：
```c
yyjson_val *obj; // this is your object

size_t idx, max;
yyjson_val *key, *val;
yyjson_obj_foreach(obj, idx, max, key, val) {
    your_func(key, val);
}
```
<br/>

また、ミュータブルオブジェクトをトラバースするミュータブルバージョンAPIもあります:<br/>。

サンプルコード1（ミュータブル・イテレータAPI）：
```c
yyjson_mut_val *obj; // 走査されるオブジェクト

yyjson_mut_val *key, *val;
yyjson_mut_obj_iter iter = yyjson_mut_obj_iter_with(obj);
while ((key = yyjson_mut_obj_iter_next(&iter))) {
    val = yyjson_mut_obj_iter_get_val(key);
    if (your_key_is_unused(key)) {
        // 繰り返しの中で、現在のkvペアを削除することができます。
        yyjson_mut_obj_iter_remove(&iter);
    }
}
```

サンプルコード2（ミュータブルforeachマクロ）：
```c
yyjson_mut_val *obj; // 走査されるオブジェクト

size_t idx, max;
yyjson_val *key, *val;
yyjson_obj_foreach(obj, idx, max, key, val) {
    your_func(key, val);
}
```


---------------
# JSONドキュメントの作成
JSONドキュメントを作成するには `yyjson_mut_doc` と関連するAPIを使用します。<br/>

`yyjson_mut_doc`はすべての文字列と値を保持するために**メモリプール**を使用することに注意してください; プールは全体としてのみ作成、成長、解放することができます。したがって、`yyjson_mut_doc`は既存のドキュメントに変異を加えるよりも、一度だけ書き込みを行うのに適しています。

JSONオブジェクトと配列はリンクされたリストで構成されているので、各`yyjson_mut_val`は1つのオブジェクトまたは配列にしか追加できません。

サンプルコードです：

```c
// このJSONを構築します：
//     {
//        "page": 123,
//        "names": [ "Harry", "Ron", "Hermione" ]
//     }

// ミュータブル・ドキュメントを作成する。
yyjson_mut_doc *doc = yyjson_mut_doc_new(NULL);

// オブジェクトを作成し、その値のメモリはdocが保持する。
yyjson_mut_val *root = yyjson_mut_obj(doc);

// キーとバリューを作成し、ルートオブジェクトに追加します。
yyjson_mut_val *key = yyjson_mut_str(doc, "page");
yyjson_mut_val *num = yyjson_mut_int(doc, 123);
yyjson_mut_obj_add(root, key, num);

// 文字列を3つ作成し、配列オブジェクトに追加します。
yyjson_mut_val *names = yyjson_mut_arr(doc);
yyjson_mut_val *name1 = yyjson_mut_str(doc, "Harry");
yyjson_mut_val *name2 = yyjson_mut_str(doc, "Ron");
yyjson_mut_val *name3 = yyjson_mut_str(doc, "Hermione");
yyjson_mut_arr_append(names, name1);
yyjson_mut_arr_append(names, name2);
yyjson_mut_arr_append(names, name3);

// ❌ 間違いです！値はすでに別のコンテナに追加されています。
yyjson_mut_obj_add(root, key, name1);

// ドキュメントのルート値を設定します。
yyjson_mut_doc_set_root(doc, root);

// JSON文字列に書き込む
const char *json = yyjson_mut_write(doc, 0, NULL);

// ドキュメントのメモリと、そのドキュメントから生み出されるすべての値を解放する。
yyjson_mut_doc_free(doc);
```


## ミュータブル・ドキュメント

JSONドキュメントの作成、変更、コピー、破棄を行うには、以下の関数を使用します。

```c
// 新しいミュータブルJSONドキュメントを作成し、返します。
// エラー時（メモリ割り当ての失敗など）にはNULLを返します。
// alc` が NULL の場合、デフォルトのアロケータが使用される。
yyjson_mut_doc *yyjson_mut_doc_new(yyjson_alc *alc);

// JSONドキュメントを削除し、このドキュメントのメモリとこのドキュメントから作成されたすべての値を解放します。
void yyjson_mut_doc_free(yyjson_mut_doc *doc);

// 内部メモリプールサイズ（文字列長、値数）を設定します。
// 次の文字列や価値創造のためのメモリを確保するために使用することができます。
bool yyjson_mut_doc_set_str_pool_size(yyjson_mut_doc *doc, size_t len);
bool yyjson_mut_doc_set_val_pool_size(yyjson_mut_doc *doc, size_t count);

// この JSON 文書のルート値を取得または設定します。
yyjson_mut_val *yyjson_mut_doc_get_root(yyjson_mut_doc *doc);
void yyjson_mut_doc_set_root(yyjson_mut_doc *doc, yyjson_mut_val *root);

// 入力から新しいミュータブル文書/値をコピーして返す。
// エラー時（メモリ割り当ての失敗など）にはNULLを返します。

// doc -> mut_doc
yyjson_mut_doc *yyjson_doc_mut_copy(yyjson_doc *doc, const yyjson_alc *alc);
// val -> mut_val
yyjson_mut_val *yyjson_val_mut_copy(yyjson_mut_doc *doc,  yyjson_val *val);
// mut_doc -> mut_doc
yyjson_mut_doc *yyjson_mut_doc_mut_copy(yyjson_mut_doc *doc, const yyjson_alc *alc);
// mut_val -> mut_val
yyjson_mut_val *yyjson_mut_val_mut_copy(yyjson_mut_doc *doc, yyjson_mut_val *val);
// mut_doc -> doc
yyjson_doc *yyjson_mut_doc_imut_copy(yyjson_mut_doc *doc, yyjson_alc *alc);
// mut_val -> doc
yyjson_doc *yyjson_mut_val_imut_copy(yyjson_mut_val *val, yyjson_alc *alc);
```

## JSON値の作成
以下の関数を使用して、変更可能なJSON値を作成します。値のメモリはドキュメントに保持されます。

```c
// 新しい値を生成して返す、 エラー時にNULLを返す。
yyjson_mut_val *yyjson_mut_null(yyjson_mut_doc *doc);
yyjson_mut_val *yyjson_mut_true(yyjson_mut_doc *doc);
yyjson_mut_val *yyjson_mut_false(yyjson_mut_doc *doc);
yyjson_mut_val *yyjson_mut_bool(yyjson_mut_doc *doc, bool val);
yyjson_mut_val *yyjson_mut_uint(yyjson_mut_doc *doc, uint64_t num);
yyjson_mut_val *yyjson_mut_sint(yyjson_mut_doc *doc, int64_t num);
yyjson_mut_val *yyjson_mut_int(yyjson_mut_doc *doc, int64_t num);
yyjson_mut_val *yyjson_mut_real(yyjson_mut_doc *doc, double num);

// 文字列の値を作成します。入力文字列はコピーされません。
yyjson_mut_val *yyjson_mut_str(yyjson_mut_doc *doc, const char *str);
yyjson_mut_val *yyjson_mut_strn(yyjson_mut_doc *doc, const char *str, size_t len);

// 文字列値を作成します。入力された文字列はコピーされ、ドキュメントに保持されます。
yyjson_mut_val *yyjson_mut_strcpy(yyjson_mut_doc *doc, const char *str);
yyjson_mut_val *yyjson_mut_strncpy(yyjson_mut_doc *doc, const char *str, size_t len);
```


## JSON配列の作成
ミュータブルJSON配列の作成には、以下の関数を使用します。

```c
// 空のミュータブル配列を作成し、それを返す, エラー時にNULLを返す.
yyjson_mut_val *yyjson_mut_arr(yyjson_mut_doc *doc);

// c array を持つミュータブル配列を作成し、返します。
yyjson_mut_val *yyjson_mut_arr_with_bool(yyjson_mut_doc *doc, bool *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_sint(yyjson_mut_doc *doc, int64_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_uint(yyjson_mut_doc *doc, uint64_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_real(yyjson_mut_doc *doc, double *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_sint8(yyjson_mut_doc *doc, int8_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_sint16(yyjson_mut_doc *doc, int16_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_sint32(yyjson_mut_doc *doc, int32_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_sint64(yyjson_mut_doc *doc, int64_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_uint8(yyjson_mut_doc *doc, uint8_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_uint16(yyjson_mut_doc *doc, uint16_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_uint32(yyjson_mut_doc *doc, uint32_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_uint64(yyjson_mut_doc *doc, uint64_t *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_float(yyjson_mut_doc *doc, float *vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_double(yyjson_mut_doc *doc, double *vals, size_t count);
// サンプルコードです：
int vals[3] = {-1, 0, 1};
yyjson_mut_val *arr = yyjson_mut_arr_with_sint32(doc, vals, 3);

// 文字列を含むミュータブル配列を作成し、返します、 文字列はUTF-8でエンコードされる必要があります。
yyjson_mut_val *yyjson_mut_arr_with_str(yyjson_mut_doc *doc, const char **vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_strn(yyjson_mut_doc *doc, const char **vals, const size_t *lens, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_strcpy(yyjson_mut_doc *doc, const char **vals, size_t count);
yyjson_mut_val *yyjson_mut_arr_with_strncpy(yyjson_mut_doc *doc, const char **vals, const size_t *lens, size_t count);
// サンプルコードです：
const char strs[3] = {"Jan", "Feb", "Mar"};
yyjson_mut_val *arr = yyjson_mut_arr_with_str(doc, strs, 3);
```

## JSON配列の変更

JSON配列の内容を変更するには、以下の関数を使用します。

```c
// 指定されたインデックスの配列に値を挿入します。
// エラー時（例：境界外）にfalseを返す。
// なお、この関数は線形探索時間を要する。
bool yyjson_mut_arr_insert(yyjson_mut_val *arr, yyjson_mut_val *val, size_t idx);

// 配列の末尾に val を挿入する。エラー時には false を返す。
bool yyjson_mut_arr_append(yyjson_mut_val *arr, yyjson_mut_val *val);

// 配列の先頭に val を挿入する。エラー時には false を返す。
bool yyjson_mut_arr_prepend(yyjson_mut_val *arr, yyjson_mut_val *val);

// インデックスにある値を置き換えて古い値を返す，エラー時にはNULLを返す。
// なお、この関数は線形探索時間を要する。
yyjson_mut_val *yyjson_mut_arr_replace(yyjson_mut_val *arr, size_t idx, yyjson_mut_val *val);

// インデックスにある値を削除して返す。
// なお、この関数は線形探索時間を要する。
yyjson_mut_val *yyjson_mut_arr_remove(yyjson_mut_val *arr, size_t idx);

// この配列の最初の値を削除して返します。
yyjson_mut_val *yyjson_mut_arr_remove_first(yyjson_mut_val *arr);

// この配列の最後の値を削除して返します。
yyjson_mut_val *yyjson_mut_arr_remove_last(yyjson_mut_val *arr);

// 配列中の指定された範囲内のすべての値を削除します。
// なお、この関数は線形探索時間を要する。
bool yyjson_mut_arr_remove_range(yyjson_mut_val *arr, size_t idx, size_t len);

// この配列に含まれるすべての値を削除します。
bool yyjson_mut_arr_clear(yyjson_mut_val *arr);

// 便利なAPIです：
// 配列の末尾に値を追加する。エラー時には false を返す。
bool yyjson_mut_arr_add_val(yyjson_mut_val *arr, yyjson_mut_val *val);
bool yyjson_mut_arr_add_null(yyjson_mut_doc *doc, yyjson_mut_val *arr);
bool yyjson_mut_arr_add_true(yyjson_mut_doc *doc, yyjson_mut_val *arr);
bool yyjson_mut_arr_add_false(yyjson_mut_doc *doc, yyjson_mut_val *arr);
bool yyjson_mut_arr_add_bool(yyjson_mut_doc *doc, yyjson_mut_val *arr, bool val);
bool yyjson_mut_arr_add_uint(yyjson_mut_doc *doc, yyjson_mut_val *arr, uint64_t num);
bool yyjson_mut_arr_add_sint(yyjson_mut_doc *doc, yyjson_mut_val *arr, int64_t num);
bool yyjson_mut_arr_add_int(yyjson_mut_doc *doc, yyjson_mut_val *arr, int64_t num);
bool yyjson_mut_arr_add_real(yyjson_mut_doc *doc, yyjson_mut_val *arr, double num);
bool yyjson_mut_arr_add_str(yyjson_mut_doc *doc, yyjson_mut_val *arr, const char *str);
bool yyjson_mut_arr_add_strn(yyjson_mut_doc *doc, yyjson_mut_val *arr, const char *str, size_t len);
bool yyjson_mut_arr_add_strcpy(yyjson_mut_doc *doc, yyjson_mut_val *arr, const char *str);
bool yyjson_mut_arr_add_strncpy(yyjson_mut_doc *doc, yyjson_mut_val *arr, const char *str, size_t len);

// 便利なAPIです：
// 新しい配列を作成し、配列の末尾に追加します。
// 新しい配列、またはエラー時に NULL を返します。
yyjson_mut_val *yyjson_mut_arr_add_arr(yyjson_mut_doc *doc, yyjson_mut_val *arr);

// 便利なAPIです：
// 新しいオブジェクトを作成し、配列の末尾に追加します。
// 新しいオブジェクトを返し、エラーがあればNULLを返す。
yyjson_mut_val *yyjson_mut_arr_add_obj(yyjson_mut_doc *doc, yyjson_mut_val *arr);
```

## JSONオブジェクトの作成
ミュータブルなJSONオブジェクトを作成するには、以下の関数を使用します。<br/>

```c
// ミュータブルオブジェクトを作成し、返します。
yyjson_mut_val *yyjson_mut_obj(yyjson_mut_doc *doc);

// キーと値を持つミュータブルオブジェクトを作成し、返します（エラー時にはNULLを返します）。キーと値はコピーされない。
// 文字列はUTF-8でエンコードされ、ヌルターミネーターが付与されている必要があります。
yyjson_mut_val *yyjson_mut_obj_with_str(yyjson_mut_doc *doc,
                                        const char **keys,
                                        const char **vals,
                                        size_t count);
// サンプルコードです：
const char keys[] = {"name", "type", "id"};
const char *vals[] = {"Harry", "student", "123456"};
yyjson_mut_obj_with_str(doc, keys, vals, 3);

// キーと値のペアを持つミュータブルオブジェクトを作成し、返します（エラー時にはNULLを返します）。キーと値はコピーされない。
// 文字列はUTF-8でエンコードされ、ヌルターミネーターが付与されている必要があります。
yyjson_mut_val *yyjson_mut_obj_with_kv(yyjson_mut_doc *doc,
                                       const char **kv_pairs,
                                       size_t pair_count);
// サンプルコードです：
const char *pairs[] = {"name", "Harry", "type", "student", "id", "123456"};
yyjson_mut_obj_with_kv(doc, pairs, 3);
```

## JSONオブジェクトの修正
JSONオブジェクトの内容を変更するには、以下の関数を使用します。<br/>

```c
// オブジェクトの末尾にキーとバリューのペアを追加する。
// キーは文字列の値でなければならない。
// この機能により、1つのオブジェクトに複数のキーを複製することができます。
bool yyjson_mut_obj_add(yyjson_mut_val *obj, yyjson_mut_val *key,yyjson_mut_val *val);

// オブジェクトにキーとバリューのペアを追加する。
// キーは文字列の値でなければならない。
// この関数は、追加する前に、与えられたキーに対応するすべてのキー-バリューペアを削除することができる。
// なお、この関数は線形探索時間を要する。
bool yyjson_mut_obj_put(yyjson_mut_val *obj, yyjson_mut_val *key, yyjson_mut_val *val);

// 与えられたキーを持つオブジェクトからキーと値のペアを削除する。
// なお、この関数は線形探索時間を要する。
bool yyjson_mut_obj_remove(yyjson_mut_val *obj, yyjson_mut_val *key);

// このオブジェクトのすべてのキーとバリューのペアを削除します。
bool yyjson_mut_obj_clear(yyjson_mut_val *obj);

// 便利なAPIです：
// オブジェクトの末尾にキーと値のペアを追加する。キーはコピーされない。
// なお、これらの関数は、1つのオブジェクトに複数のキーを持たせることができます。
bool yyjson_mut_obj_add_null(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key);
bool yyjson_mut_obj_add_true(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key);
bool yyjson_mut_obj_add_false(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key);
bool yyjson_mut_obj_add_bool(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, bool val);
bool yyjson_mut_obj_add_uint(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, uint64_t val);
bool yyjson_mut_obj_add_sint(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, int64_t val);
bool yyjson_mut_obj_add_int(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, int64_t val);
bool yyjson_mut_obj_add_real(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, double val);
bool yyjson_mut_obj_add_str(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, const char *val);
bool yyjson_mut_obj_add_strn(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, const char *val, size_t len);
bool yyjson_mut_obj_add_strcpy(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, const char *val);
bool yyjson_mut_obj_add_strncpy(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, const char *val, size_t len);

// 便利なAPIです：
// 与えられたキーに対応するすべてのキーとバリューのペアを削除します。
// なお、この関数は線形探索時間を要する。
bool yyjson_mut_obj_remove_str(yyjson_mut_val *obj, const char *key);
bool yyjson_mut_obj_remove_strn(yyjson_mut_val *obj, const char *key, size_t len);

// 便利なAPIです：
// 一致するすべてのキーを新しいキーで置き換えます。
// 少なくとも1つのキーがリネームされた場合、trueを返します。
// この関数は、線形探索時間を要します。
yyjson_api_inline bool yyjson_mut_obj_rename_key(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, const char *new_key);
yyjson_api_inline bool yyjson_mut_obj_rename_keyn(yyjson_mut_doc *doc, yyjson_mut_val *obj, const char *key, size_t len, const char *new_key, size_t new_len);
```


---------------
# JSONポインタとパッチ

## JSONポインタ
`JSONポインタ`によるJSON値のクエリをサポートします。 ([RFC 6901](https://tools.ietf.org/html/rfc6901)).

```c
// `JSONポインタ`はヌル文字で終端された文字列である。
yyjson_val *yyjson_ptr_get(yyjson_val *val, const char *ptr);
yyjson_val *yyjson_doc_ptr_get(yyjson_doc *doc, const char *ptr);
yyjson_mut_val *yyjson_mut_ptr_get(yyjson_mut_val *val, const char *ptr);
yyjson_mut_val *yyjson_mut_doc_ptr_get(yyjson_mut_doc *doc, const char *ptr);

// 文字列の長さを持つ `JSON ポインタ` で、内部に NUL (Unicode U+0000) 文字を許可します。
yyjson_val *yyjson_ptr_getn(yyjson_val *val, const char *ptr, size_t len);
yyjson_val *yyjson_doc_ptr_getn(yyjson_doc *doc, const char *ptr, size_t len);
yyjson_mut_val *yyjson_mut_ptr_getn(yyjson_mut_val *val, const char *ptr, size_t len);
yyjson_mut_val *yyjson_mut_doc_ptr_getn(yyjson_mut_doc *doc, const char *ptr, size_t len);

// 文字列の長さ、コンテキスト、エラー情報を含む `JSON ポインタ`。
yyjson_val *yyjson_ptr_getx(yyjson_val *val, const char *ptr, size_t len, yyjson_ptr_err *err);
yyjson_val *yyjson_doc_ptr_getx(yyjson_doc *doc, const char *ptr, size_t len, yyjson_ptr_err *err);
yyjson_mut_val *yyjson_mut_ptr_getx(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);
yyjson_mut_val *yyjson_mut_doc_ptr_getx(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);
```

例えば、JSONドキュメントがあるとします：
```json
{
    "size" : 3,
    "users" : [
        {"id": 1, "name": "Harry"},
        {"id": 2, "name": "Ron"},
        {"id": 3, "name": "Hermione"}
    ]
}
```
以下のJSON文字列は、付随する値として評価されます：

|Pointer|Matched Value|
|:--|:--|
| `""` | `the whole document` |
| `"/size"`| `3` |
| `"/users/0"` | `{"id": 1, "name": "Harry"}` |
| `"/users/1/name"` | `"Ron"` |
| `"/no_match"` | NULL |
| `"no_slash"` | NULL |
| `"/"` | NULL (match to empty key: root[""]) |

```c
yyjson_doc *doc = ...;
yyjson_val *val = yyjson_doc_ptr_get(doc, "/users/1/name");
printf("%s\n", yyjson_get_str(val)); // Ron

yyjson_ptr_err err;
yyjson_val *val2 = yyjson_doc_ptr_getx(doc, "/", 1, &err);
if (!val2) printf("err %d: %s\n", err.code, err.msg); // err 3: 収まりきらない
```

The library also supports modifying JSON values via `JSON Pointer`.
```c
// 新しい値を追加または挿入します。
bool yyjson_mut_ptr_add(yyjson_mut_val *val, const char *ptr, yyjson_mut_val *new_val, yyjson_mut_doc *doc);
bool yyjson_mut_ptr_addn(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_mut_val *new_val, yyjson_mut_doc *doc);
bool yyjson_mut_ptr_addx(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_mut_val *new_val, yyjson_mut_doc *doc, bool create_parent, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);
                                           
bool yyjson_mut_doc_ptr_add(yyjson_mut_doc *doc, const char *ptr, yyjson_mut_val *new_val);
bool yyjson_mut_doc_ptr_addn(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_mut_val *new_val);
bool yyjson_mut_doc_ptr_addx(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_mut_val *new_val, bool create_parent, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);

// 新しい値を設定する（存在しない場合は追加、存在する場合は置換）。
bool yyjson_mut_ptr_set(yyjson_mut_val *val, const char *ptr, yyjson_mut_val *new_val, yyjson_mut_doc *doc);
bool yyjson_mut_ptr_setn(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_mut_val *new_val, yyjson_mut_doc *doc);
bool yyjson_mut_ptr_setx(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_mut_val *new_val, yyjson_mut_doc *doc, bool create_parent, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);
                                             
bool yyjson_mut_doc_ptr_set(yyjson_mut_doc *doc, const char *ptr, yyjson_mut_val *new_val);
bool yyjson_mut_doc_ptr_setn(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_mut_val *new_val);
bool yyjson_mut_doc_ptr_setx(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_mut_val *new_val, bool create_parent, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);

// 既存の値を置き換える。
yyjson_mut_val *yyjson_mut_ptr_replace(yyjson_mut_val *val, const char *ptr, yyjson_mut_val *new_val);
yyjson_mut_val *yyjson_mut_ptr_replacen(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_mut_val *new_val);
yyjson_mut_val *yyjson_mut_ptr_replacex(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_mut_val *new_val, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);
    
yyjson_mut_val *yyjson_mut_doc_ptr_replace(yyjson_mut_doc *doc, const char *ptr, yyjson_mut_val *new_val);
yyjson_mut_val *yyjson_mut_doc_ptr_replacen(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_mut_val *new_val);
yyjson_mut_val *yyjson_mut_doc_ptr_replacex(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_mut_val *new_val, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);

// 既存の値を削除する。
yyjson_mut_val *yyjson_mut_ptr_remove(yyjson_mut_val *val, const char *ptr);
yyjson_mut_val *yyjson_mut_ptr_removen(yyjson_mut_val *val, const char *ptr, size_t len);
yyjson_mut_val *yyjson_mut_ptr_removex(yyjson_mut_val *val, const char *ptr, size_t len, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);

yyjson_mut_val *yyjson_mut_doc_ptr_remove(yyjson_mut_doc *doc, const char *ptr);
yyjson_mut_val *yyjson_mut_doc_ptr_removen(yyjson_mut_doc *doc, const char *ptr, size_t len);
yyjson_mut_val *yyjson_mut_doc_ptr_removex(yyjson_mut_doc *doc, const char *ptr, size_t len, yyjson_ptr_ctx *ctx, yyjson_ptr_err *err);
```

例えば、こんな感じです：
```c
yyjson_mut_doc *doc = ...;
// doc: {"a":0,"b":[1,2,3]}

yyjson_mut_doc_ptr_set(doc, "/a", yyjson_mut_int(doc, 9));
// now: {"a":9,"b":[1,2,3]}

yyjson_mut_doc_ptr_add(doc, "/b/-", yyjson_mut_int(doc, 4));
// now: {"a":9,"b":[1,2,3,4]}

yyjson_mut_doc_ptr_remove(doc, "/b");
// now: {"a":9}
```

上記の `x` で終わるすべての関数は、結果コンテキスト `ctx` とエラーメッセージ `err` を得るために使用することができる。例えば
```c
// doc: {"a":0,"b":[null,2,3]}
yyjson_mut_doc *doc = ...;

// エラーコードとメッセージを受け取る
yyjson_ptr_err err;
yyjson_mut_doc_ptr_setx(doc, "/b/99", 4, yyjson_mut_int(doc, 99), true, NULL, &err);
if (err.code) printf("err: %s\n", err.msg); // err: cannot resolve

// ターゲット値のコンテキストを取得し、JSONポインタを再パースせずにいくつかの操作を行う。
yyjson_mut_val *val = yyjson_mut_doc_ptr_getx(doc, "/b/0", 4, &ctx, &err);
if (yyjson_mut_is_null(val)) yyjson_ptr_ctx_remove(&ctx);
// now: {"a":0,"b":[2,3]}
```



## JSONパッチ
JSON Patch (RFC 6902)をサポートしています。
仕様と例を示します： <https://tools.ietf.org/html/rfc6902>
```c
// パッチされたJSON値を作成し、返します。
// パッチが適用できなかった場合はNULLを返す。
yyjson_mut_val *yyjson_patch(yyjson_mut_doc *doc,
                             yyjson_val *orig,
                             yyjson_val *patch,
                             yyjson_patch_err *err);

yyjson_mut_val *yyjson_mut_patch(yyjson_mut_doc *doc,
                                 yyjson_mut_val *orig,
                                 yyjson_mut_val *patch,
                                 yyjson_patch_err *err);
```


## JSON マージパッチ
JSON Merge Patch (RFC 7386)をサポートしています。
仕様と例を示します： <https://tools.ietf.org/html/rfc7386>
```c
// マージパッチを施したJSON値を作成し、返します。
// パッチが適用できなかった場合はNULLを返す。
yyjson_mut_val *yyjson_merge_patch(yyjson_mut_doc *doc,
                                   yyjson_val *orig,
                                   yyjson_val *patch);

yyjson_mut_val *yyjson_mut_merge_patch(yyjson_mut_doc *doc,
                                       yyjson_mut_val *orig,
                                       yyjson_mut_val *patch);
```


---------------
# 数値処理

## 数値リーダー
本ライブラリには高性能な数値リーダーが内蔵されており、デフォルトでこれらのルールに従って数値を解析します：<br/>

* 正の整数を `uint64_t` として読み込み、オーバーフローした場合、`double` に変換する。
* 負の整数を `int64_t` として読み込み、オーバーフローした場合は `double` に変換する。
* 浮動小数点数を正しい丸め方で `double` として読み込む（ulpエラーなし）。
* 実数がオーバーフロー（無限大）した場合、エラーを報告する。
* 数値が[JSON](https://www.json.org)の規格と一致しない場合は、エラーを報告します。

`YYJSON_READ_ALLOW_INF_AND_NAN` フラグを使用すると、 `nan` と `inf` の数値/リテラルを許可することができます。また、 `YYJSON_READ_NUMBER_AS_RAW` を使用すると、数値をパースせずに生の文字列として読み込むことができます。詳しくは `Reader flag` を参照。

## ナンバーライター
本ライブラリには高性能なナンバーライターが内蔵されており、デフォルトでこれらのルールに従って数字を書き込むことができます：<br/>

* 正の整数を符号なしで書き込む。
* 負の整数を負の符号付きで書きます。
* 浮動小数点数を[ECMAScript format](https://www.ecma-international.org/ecma-262/11.0/index.html#sec-numeric-types-number-tostring)で記述するが，以下の変更がある．
    * 数値が `Infinity` または `NaN` の場合、エラーを報告する。
    * 入力情報を保持するため、0.0 の負符号を保持する。
    * 指数部の正符号を削除する。
* 浮動小数点数ライターは、正しく丸められた最短の10進数表現を生成する必要があります。

`YYJSON_WRITE_ALLOW_INF_AND_NAN` フラグを使用すると、 inf/nan 数を `Infinity` および `NaN` リテラルとしてエラーなく記述できますが、これは標準の JSON ではありません。また、 `YYJSON_WRITE_INF_AND_NAN_AS_NULL` を使用すると、 inf/nan 数を `null` リテラルとして書き込むことができます。詳しくは `Writer flag` を参照してください。



# テキスト処理

## 文字エンコーディング
本ライブラリは、[RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259#section-8.1)で規定されているBOMなしのUTF-8エンコーディングのみをサポートしています：

> クローズドエコシステムの一部ではないシステム間で交換されるJSONテキストは、UTF-8を使用してエンコードされなければなりません（MUST）。
> 実装は、ネットワークで送信されるJSONテキストの先頭にバイトオーダーマーク（U+FEFF）を追加してはならない（MUST NOT）。

デフォルトでは、yyjsonは入力文字列に対して厳密なUTF-8エンコーディングのバリデーションを実行します。無効な文字に遭遇した場合、エラーが報告されます。

`YYJSON_READ_ALLOW_INVALID_UNICODE` と `YJSON_WRITE_ALLOW_INVALID_UNICODE` フラグを使って、無効なUnicodeエンコーディングを許可することができます。しかし、yyjsonの結果値には無効な文字が含まれている可能性があり、他のコードで使用される可能性があり、セキュリティリスクをもたらす可能性があることに注意する必要があります。

## NUL 文字
このライブラリは、文字列の中にある `NUL` 文字 (別名 `null terminator`, または Unicode `U+0000`, ASCII `0`) をサポートします。

JSONを読み込む場合、`U0000`はアンエスケープされて`NUL`となる。文字列が `NUL` を含む場合、 strlen() で得られる長さは不正確であるため、 yyjson_get_len() を使用して実際の長さを取得する必要があります。

JSONを構築する際、入力文字列はNULL終端として扱われます。文字列の中に `NUL` を含む文字列を渡す必要がある場合は、接尾辞に `n` を付けた API を使用し、実際の長さを渡す必要があります。

例えば、以下のようになります：
```c
// ヌル終端文字列
yyjson_mut_str(doc, str);
yyjson_obj_get(obj, str);

// 任意の文字列、ヌル終端を含むか含まないか
yyjson_mut_strn(doc, str, len);
yyjson_obj_getn(obj, str, len);

// C++の文字列
std::string sstr = ...;
yyjson_obj_getn(obj, sstr.data(), sstr.length());
```



# メモリアロケータ
このライブラリは、libcのメモリ割り当て関数(malloc/realloc/free)を**直接**呼び出すことはない。代わりに、メモリ割り当てが必要な場合、yyjsonのAPIは、呼び出し元がアロケータを渡すことができる`alc`というパラメータを受け取ります。`alc`がNULLの場合、yyjsonはlibcの関数の単純なラッパーであるデフォルトのメモリアロケーターを使用します。

カスタムメモリアロケータを使用すると、メモリ割り当てをより詳細に制御することができますので、以下にいくつかの例を示します：

## 複数のJSONを単一のアロケータで処理する
複数の小さなJSONをパースする必要がある場合、あらかじめバッファが確保された単一のアロケータを使用することで、頻繁なメモリ割り当てを避けることができます。

サンプルコードです：
```c
// 1つのJSONの最大データサイズ
size_t max_json_size = 64 * 1024;
// 1つのJSONの最大メモリ使用量を計算します。
size_t buf_size = yyjson_read_max_memory_usage(max_json_size, 0);
// アロケータ用のバッファを作成する
void *buf = malloc(buf_size);
// アロケータにバッファを設定する
yyjson_alc alc;
yyjson_alc_pool_init(&alc, buf, buf_size);

// 単一のアロケータで複数のJSONを読み込む。
for(int i = 0, i < your_json_file_count; i++) {
    const char *your_json_file_path = ...;
    yyjson_doc *doc = yyjson_read_file(your_json_file_path, 0, &alc, NULL);
    ...
    yyjson_doc_free(doc);
}

// バッファを解放する
free(buf);
```

## スタックメモリアロケータ
JSONが十分に小さい場合、スタックメモリを使用して読み書きを行うことができます。

サンプルコードです：
```c
char buf[128 * 1024]; // スタックバッファ
yyjson_alc alc;
yyjson_alc_pool_init(&alc, buf, sizeof(buf));

yyjson_doc *doc = yyjson_read_opts(dat, len, 0, &alc, NULL);
...
yyjson_doc_free(doc); // メモリはスタック上にあるため、これはオプションです。
```

## サードパーティ製のアロケータライブラリを使う
[jemalloc](https://github.com/jemalloc/jemalloc)、[tcmalloc](https://github.com/google/tcmalloc)、[mimalloc](https://github.com/microsoft/mimalloc)など、yyjson用の高性能なメモリアロケータをサードパーティ製で使用できます。また、以下のコードを参考に、独自のアロケータを実装することもできます。

サンプルコードです：
```c
// Use https://github.com/microsoft/mimalloc

#include <mimalloc.h>

// malloc(size)と同じ
static void *priv_malloc(void *ctx, size_t size) {
    return mi_malloc(size);
}

// realloc(ptr, size)と同じ。
// old_size`は元々割り当てられていたメモリのサイズ
static void *priv_realloc(void *ctx, void *ptr, size_t old_size, size_t size) {
    return mi_realloc(ptr, size);
}

// free(ptr) と同じ
static void priv_free(void *ctx, void *ptr) {
    mi_free(ptr);
}

// アロケータオブジェクト
static const yyjson_alc PRIV_ALC = {
    priv_malloc,
    priv_realloc,
    priv_free,
    NULL // 上記の関数に渡される `ctx` です。
};

// カスタムアロケータで読み込む
yyjson_doc *doc = yyjson_doc_read_opts(dat, len, 0, &PRIV_ALC, NULL);
...
yyjson_doc_free(doc);

// カスタムアロケータで書く
yyjson_alc *alc = &PRIV_ALC;
char *json = yyjson_doc_write(doc, 0, alc, NULL, NULL);
...
alc->free(alc->ctx, json);

```



# スタックメモリーの使用について
JSONの読み書きやJSONポインタの扱いなど、ライブラリのほとんどの関数で固定サイズのスタックメモリを使用します。

しかし、いくつかの関数は再帰を使用しており、オブジェクトレベルが深すぎるとスタックオーバーフローを引き起こす可能性があります。これらの関数には、ヘッダーファイルで以下の警告が表示されています：
> 警告
> この関数は再帰的であり、オブジェクトレベルが深すぎるとスタックオーバーフローを引き起こす可能性があります。



# ヌルチェック
ライブラリの公開APIでは、クラッシュを避けるために、すべての入力パラメータに対して `null check` を行います。

例えば、JSONを読み込む場合、各値のNULLチェックや型チェックは必要ありません：
```c
yyjson_doc *doc = yyjson_read(NULL, 0, 0); // doc is NULL
yyjson_val *val = yyjson_doc_get_root(doc); // val is NULL
const char *str = yyjson_get_str(val); // str is NULL
if (!str) printf("err!");
yyjson_doc_free(doc); // do nothing
```

しかし、値が非NULLで型が一致することが確実な場合は、`unsafe`というプレフィックスAPIを使ってNULLチェックを回避することができます。

例えば、配列やオブジェクトを反復処理する場合、値とキーは非NULLでなければなりません：
```c
size_t idx, max;
yyjson_val *key, *val;
yyjson_obj_foreach(obj, idx, max, key, val) {
    // これは有効なJSONなので、キーは有効な文字列でなければなりません。
    if (unsafe_yyjson_equals_str(key, "id") &&
        unsafe_yyjson_is_uint(val) &&
        unsafe_yyjson_get_uint(val) == 1234) {
        ...
    }
}
```



# スレッドセーフ
ライブラリはグローバル変数を使用しないので、関数の入力パラメータがスレッドセーフであることを保証できれば、関数の呼び出しもスレッドセーフになります。

一般的に、`yyjson_doc` と `yyjson_val` は不変でスレッドセーフ、`yyjson_mut_doc` と `yyjson_mut_val` は可変でありスレッドセーフではありません。



# ロケールに依存しない
ライブラリはロケールに依存しません。

しかし、いくつかの特殊な条件がありますので、注意が必要です：

1. ロケールを変更するためにlibcの `setlocale()` 関数を使用する。
2. あなたの環境がIEEE 754浮動小数点規格を使用していない (例: 一部のIBMメインフレーム)、またはビルド時に `YYJSON_DISABLE_FAST_FP_CONV` を明示的に設定した場合、yyjsonは `strtod() `を使って浮動小数点数をパースする。

これらの条件の **両方** を満たす場合、他のスレッドがJSONをパースしている間に `setlocale()` を呼び出すことは避けるべきです。そうしないと、JSON浮動小数点数のパースでエラーが返されることがあります。
