
## スタックタイプ {#stack_types}

### 概要

| Type | Type constant | Type mask constant | Description |
| ---- | ---- | ----- | -----|
| (none)    | DUK_TYPE_NONE      | DUK_TYPE_MASK_NONE      | no type (missing value, invalid index, etc) |
| undefined | DUK_TYPE_UNDEFINED | DUK_TYPE_MASK_UNDEFINED | undefined |
| null      | DUK_TYPE_NULL      | DUK_TYPE_MASK_NULL      | null |
| boolean   | DUK_TYPE_BOOLEAN   | DUK_TYPE_MASK_BOOLEAN   | true and false |
| number    | DUK_TYPE_NUMBER    | DUK_TYPE_MASK_NUMBER    | IEEE double |
| string    | DUK_TYPE_STRING    | DUK_TYPE_MASK_STRING    | immutable (plain) string or (plain) Symbol |
| object    | DUK_TYPE_OBJECT    | DUK_TYPE_MASK_OBJECT    | object with properties |
| buffer    | DUK_TYPE_BUFFER    | DUK_TYPE_MASK_BUFFER    | mutable (plain) byte buffer, fixed/dynamic/external; mimics an Uint8Array |
| pointer   | DUK_TYPE_POINTER   | DUK_TYPE_MASK_POINTER   | opaque pointer (void *) |
| lightfunc | DUK_TYPE_LIGHTFUNC | DUK_TYPE_MASK_LIGHTFUNC | plain Duktape/C function pointer (non-object); mimics a Function |


### メモリ割り当て

以下のスタックタイプは、追加のヒープ割り当てを伴います。

- 文字列: 1回の割り当てで、ヒープと文字列ヘッダが結合され、その後に不変の文字列データが続きます。外部文字列が使用される場合（デフォルトでは有効ではありません、一般的に低メモリ環境では）、文字列データは外部である可能性もあります。
- オブジェクト：1つのアロケーションは、ヒープとオブジェクトヘッダを組み合わせたものに使用され、もう1つのアロケーションはオブジェクトプロパティに使用されます。プロパティの割り当てには、配列エントリと通常のプロパティの両方が含まれ、オブジェクトが十分に大きい場合は、検索を高速化するためにハッシュテーブルが含まれます。
- バッファ：固定バッファの場合、単一のアロケーションは、ヒープとバッファヘッダを組み合わせたものを含み、その後に変更可能な固定サイズのバッファが続きます。動的バッファの場合、現在のバッファは別々に割り当てられます。外部バッファの場合、単一のヒープオブジェクトが割り当てられ、ユーザバッファを指します。

文字列とバッファはプリミティブ (pass-by-value) 型とみなされますが、メモリ割り当ての観点からはヒープで割り当てられる型です。


### ポインタの安定性

Duktapeによって割り当てられたヒープ・オブジェクトは、安定したポインターを持ちます：ガベージ・コレクションの観点から到達可能である間は、オブジェクトはメモリー内で再配置されません。これはメイン・ヒープ・オブジェクトの場合ですが、ダイナミック・プロパティ・ テーブルやダイナミック・バッファ・データ領域のような、オブジェクトに関連する追加割 り当てについては、必ずしもそうとは限りません。ヒープオブジェクトは、到達可能なスレッドのバリュースタックに存在するか、グローバルオブジェクトを通じて到達可能である場合などに到達可能です。ヒープオブジェクトが到達不可能になると、そのオブジェクトを参照するユーザCコードによって保持されるポインタは安全でなくなり、もはや再参照されるべきではなくなります。

実際には、ユーザコードが直接参照するヒープ割り当てデータは、文字列、固定バッファ、ダイナミックバッファだけです。文字列と固定バッファのデータ領域は安定しています。Duktape/C関数が戻った後でも、文字列や固定バッファがガベージコレクションの観点から常に到達可能である限り、そのデータを参照するCポインタを保持することは安全です。ただし、Duktape/Cのバリュースタック引数などについては、特別な取り決めがない限り、この限りではありません。

ダイナミックバッファのデータ領域は安定したポインタを持ちません。バッファ自体は安定したアドレスを持つヒープヘッダを持っていますが、現在のバッファは別に割り当てられ、バッファのサイズが変更されたときに再配置される可能性があります。Duktape/C関数が戻った後にポインタを保持するのは、おそらく避けた方が良いでしょう（バッファがサイズ変更されていないことを確認する簡単な方法がないため）。

外部バッファの場合、データ・ポインタの安定性は、ポインタを設定・更新するユーザ・コードに依存します。


### タイプマスク

タイプ・マスクを使用すると、呼び出し側のコードで、ある型が特定の型セットに属しているかどうかを簡単にチェックできます。例えば、あるスタック値が数値、文字列、またはオブジェクトであることをチェックするためです。

```c
if (duk_get_type_mask(ctx, -3) & (DUK_TYPE_MASK_NUMBER |
                                  DUK_TYPE_MASK_STRING |
                                  DUK_TYPE_MASK_OBJECT)) {
    printf("type is number, string, or object\n");
}
```


さらに便利にタイプのセットをマッチングさせるための特定のAPIコールがあります。

```c
if (duk_check_type_mask(ctx, -3, DUK_TYPE_MASK_NUMBER |
                                 DUK_TYPE_MASK_STRING |
                                 DUK_TYPE_MASK_OBJECT)) {
    printf("type is number, string, or object\n");
}
```


これらは、代替品よりも高速でコンパクトです。

```c
// alt 1
if (duk_is_number(ctx, -3) || duk_is_string(ctx, -3) || duk_is_object(ctx, -3)) {
    printf("type is number, string, or object\n");
}

// alt 2
int t = duk_get_type(ctx, -3);
if (t == DUK_TYPE_NUMBER || t == DUK_TYPE_STRING || t == DUK_TYPE_OBJECT) {
    printf("type is number, string, or object\n");
}
```


### None

none 型は実際には型ではなく、値が存在しないこと、スタックインデックスが無効であること等を示すために API で使用されます。


### Undefined(未定義)

undefined型は ECMAScript の未定義に対応し、ヌルとは区別されます。

アクティブなバリュースタックの範囲外から読み込まれた値は、undefinedとして読み返される。


### Null

Null 型は ECMAScript の null にマップされます。


### Boolean

Boolean型は、C API では整数として表現されます：ゼロは偽、非ゼロは真です。

API 呼び出しの引数として boolean 値を与える場合、0 以外の値はすべて "true" 値として扱われます。APIコールが真偽値を返す場合、常に値1が "true "の値として使用される。これにより、ある種のC言語のイディオムが使用できるようになる。例えば、以下のように、APIコールの戻り値から直接ビットマスクを構築することができる。

```c
/* this works and generates nice code */
int bitmask = (duk_get_boolean(ctx, -3) << 2) |
              (duk_get_boolean(ctx, -2) << 1) |
              duk_get_boolean(ctx, -1);

/* more verbose variant not relying on "true" being represented by 1 */
int bitmask = ((duk_get_boolean(ctx, -3) ? 1 : 0) << 2) |
              ((duk_get_boolean(ctx, -2) ? 1 : 0) << 1) |
              (duk_get_boolean(ctx, -1) ? 1 : 0);

/* another verbose variant */
int bitmask = (duk_get_boolean(ctx, -3) ? (1 << 2) : 0) |
              (duk_get_boolean(ctx, -2) ? (1 << 1) : 0) |
              (duk_get_boolean(ctx, -1) ? 1 : 0);
```

### 数値

数値型は IEEE の double であり、±無限大と NaN 値を含む。ゼロの符号も保存される。IEEE doubleは、53ビットまでのすべての整数を正確に表現する。

IEEE doubleは、NaN値に対して追加の信号ビットを持つことができる。これらのビットは、Duktape内部のタグ付き型表現（8バイトのパック値使用時）で使用されるため、Duktape APIにおけるNaN値は正規化されます。具体的には、あるNaN値をバリュースタックにプッシュすると、別の（正規化された）NaN値が出てくることがあります。NaN がそのままの形で保存されることを当てにしないように。


### 文字列

文字列スタックタイプは、プレーン文字列とプレーンシンボル（ES2015 で導入）の両方を表現するために使用されます。文字列は、ある長さの任意のバイト列であり、内部に NUL (0x00) 値を含むことができます。文字列は、C言語のコーディングの便宜上、常に自動的にNULで終端されます。NULターミネーターは文字列の長さの一部としてカウントされません。例えば、文字列 "foo" はバイト長 3 で、メモリには { 'f', 'o', 'o', '\0' } という形式で格納されます。NUL終端が保証されているため、アプリケーションで内部NULが問題にならない限り、文字列は常に単純なconst char *を使って指定することができます。呼び出し側のコードは、Duktapeが保持する文字列データを直接参照することができます。このような文字列データ・ポインタは、Duktapeヒープ内で文字列に到達可能である限り有効です（そして安定しています）。

文字列は効率化のために内部化されており、ある文字列のコピーは一度に1つだけ存在します。文字列は不変であり、Cコードを呼び出しても絶対に変更してはいけません。変更すると、診断が困難な非常に不可思議な問題が発生します。

ECMAScript の文字列は、U+0000 から U+FFFF までの任意の 16 ビットのコードポイントを含むことができますが、BMP 以外のコードポイントを表現することはできません。これは、ECMAScriptの標準では文字列がこのように定義されているためです。Duktapeでは、ECMAScriptの文字列はCESU-8エンコーディングでエンコードされています。CESU-8は、サロゲートペアの範囲（U+D800からU+DFFF）のコードポイントを直接エンコードすることができる（UTF-8では禁止）ことを除いて、UTF-8と一致しています。CESU-8 は、UTF-8 と同様、すべての 7 ビ ッ ト ASCII キ ャ ラ ク タ を そ の ま ま符号化 し ますので、 C コ ー ド に と っ ては好都合です。例えば

- U+0041 ("A") は 41 にエンコードされます。
- U+1234 (ETHIOPIC SYLLABLE SEE) は e1 88 b4 にエンコードする。
- U+D812 (高位サロゲート) は ed a0 92 にエンコードされる。これは無効なUTF-8となる。

また、Duktapeは内部で拡張文字列を使用しています。U+10FFFFまでのコードポイントはUTF-8で表現でき、それ以上のコードポイントは32ビットいっぱいまで拡張UTF-8で表現できます。Duktapeが使用する拡張UTF-8のエンコーディングは、以下の表の通りです。先頭バイトは2進数で示し（データビットを示す "x"）、継続バイトは "C "で示します（ビット列10xxxxxxxを示す）。


| Codepoint range | Bits | Byte sequence | Notes |
| ---- | ---- | ---- | ---- |
| U+0000 to U+007F             | 7  | 0xxxxxxx             | |
| U+0080 to U+07FF             | 11 | 110xxxxx C           | |	
| U+0800 to U+FFFF             | 16 | 1110xxxx C C         | U+D800 to U+DFFF allowed (unlike UTF-8) |
| U+1 0000 to U+1F FFFF        | 21 | 11110xxx C C C       | Above U+10FFFF allowed (unlike UTF-8) |
| U+20 0000 to U+3FF FFFF      | 26 | 111110xx C C C C     | |	
| U+400 0000 to U+7FFF FFFF    | 31 | 1111110x C C C C C   | |
| U+8000 0000 to U+F FFFF FFFF | 36 | 11111110 C C C C C C | Only 32 bits used in practice (up to U+FFFF FFFF) |


U+7FFFFFFFF以上のコードポイントに対するエンコーディングの欠点は、先頭バイトが0xFEになることで、ユニコードのバイトオーダーマーカーエンコーディングと矛盾することです。これは、Duktapeの内部使用では実用的な懸念事項ではありません。

最後に、無効な拡張UTF-8バイト・シーケンスは、Symbol値を表すなどの特別な目的で使用されます。無効な拡張UTF-8/CESU-8バイト・シーケンスは、（CESU-8である）標準のECMAScript文字列と衝突することはなく、オブジェクトのプロパティ・テーブル内できれいに分離されたまま残ります。詳しくは Symbols と symbols.rst を参照してください。

無効な拡張 UTF-8 シーケンスを持つ文字列は、C コードからバリュースタックにプッシュでき、ECMAScript 関数に渡すこともできますが、2 つの注意点があります。

- 無効なバイト列が Symbol を表現するために使用される内部フォーマットに一致する場合、その値は ECMAScript コードに対して文字列ではなく Symbol として表示されます。例えば、typeof val は symbol となる。
- 無効なバイト列に対する文字列操作の挙動は十分に定義されておらず、結果は様々で、Duktapeのマイナーバージョンアップでも変更される可能性があります。


### オブジェクト

オブジェクト型には、ECMAScript のオブジェクトや配列、関数、スレッド（コルーチン）、バッファ・オブジェクトが含まれます。言い換えれば、プロパティを持つものはすべてオブジェクトです。プロパティは、文字列のキーと任意の値（未定義を含む）を持つキーと値のペアである。

オブジェクトはガベージコレクションのファイナライゼーションに参加することができます。


### バッファ

プレーン バッファ タイプは、ユーザー データ用の生のバッファです。Uint8Array や Node.js Buffer のような標準的なバッファ・オブジェクト・タイプよりもメモリ効率がよいです。プレーンバッファーのサブタイプは3つあります。



| Buffer sub-type | Data pointer | Resizable | Memory managed by | Description |
| ---- | ---- | ---- | ---- | ---- |
| Fixed | Stable, non-NULL | No | Duktape | バッファのサイズは作成時に固定され、メモリはDuktapeによって自動的に管理されます。固定バッファは、不変の（安定した）非NULLデータポインタを持ちます。 |
| Dynamic | Unstable, may be NULL | Yes | Duktape | バッファサイズは作成後に変更可能、メモリはDuktapeが自動管理。サイズ変更を可能にするために、内部で2つのメモリ割り当てが必要。バッファのサイズを変更すると、データ・ポインタが変更される可能性があります。ゼロ・サイズのバッファは、NULLデータ・ポインタを持つ可能性があります。 |
| External | Unstable, may be NULL | Yes | Duktape and user code | バッファ・データは外部で確保されます。Duktapeはヒープに割り当てられたバッファ・ヘッダ構造を割り当て、管理し ます。一方、データ領域のポインタと長さはユーザー・コードによって明示的に設定 されます。外部バッファは、バッファが Duktape ヒープ外のデータ構造（例えば、グラフィック・ライブラリによって割り当てられたフレーム・バッファ）を指すようにするのに便利です。ゼロ・サイズのバッファは、NULLデータ・ポインタを持つ可能性があります。 |


文字列とは異なり、バッファのデータ領域は自動的にNUL終端とならないため、呼び出し側のコードは現在割り当てられているバッファのサイズを超えるバイトにアクセスしてはいけません。ゼロサイズの動的バッファや外部バッファのデータポインタは NULL である可能性がありますが、固定バッファは常に NULL でないデータポインタを持ちます。

固定バッファと動的バッファは自動的にガベージコレクションされます。これはまた、Cコードが、バッファがDuktapeから到達可能でない限り、バッファ・データ・ポインタを保持してはならないことを意味します（例えば、アクティブなバリュースタックに存在する場合など）。外部バッファのデータ領域は自動的にガベージ・コレクトされないため、ユーザー・コードにはそのライフ・サイクルを管理する責任があります。また、ユーザー・コードは、外部バッファがもはや有効でない（あるいはまだ有効でない）ときに、外部バッファの値がアクセスされないようにする必要があります。

プレーンなバッファは Uint8Array オブジェクトを大きく模倣しており、ArrayBuffer や型付き配列などを扱う際の、非標準的でメモリ効率の良い代替手段となっています。標準のバッファオブジェクトはプレーンバッファの上に実装されており、例えば ArrayBuffer はプレーンバッファにバックアップされています。より詳細な説明は Buffer objects を参照してください。


いくつかの注意点があります。

バッファのインデックスに書き込まれる値は番号強制なので、一文字の値を代入しても期待通りにはいかないことが多い。例えば、 buf[123] = 'x' とすると、 ToNumber('x') = 0 としてバッファに 0 が書き込まれる。分かりやすくするために、 buf[123] = 0x78 のような数値のみを代入すると良い。

例えば、x = buf[123] または buf[123] = x のように、プレーンバッファの値の数値インデックスの読み書きのための高速なパスが存在します。

バッファの仮想プロパティは現在 defineProperty() に実装されていませんので、 defineProperty() でバッファのインデックスやバッファの長さを書き込むことはできません (書き込もうとすると TypeError が発生します)。


### ポインター

ポインター型は生の、解釈されないCポインターで、本質的にはvoid *です。ポインターはネイティブ・オブジェクト（メモリ割り当て、ハンドルなど）を指すために使用できますが、Duktapeはその用途を知らないので、自動的にガベージ・コレクトされることはありません。しかし、1つ以上のポインターをオブジェクトの中に入れて、オブジェクト・ファイナライザーを使って、ポインターに関連するネイティブ・リソースを解放することができます。


### Lightfunc（軽量関数）

lightfunc 型は、Duktape/C の関数ポインタと小さな制御フラグのセットを、ヒープを個別に割り当てる必要のない単一のタグ付き値にパックしたものです。制御フラグ(現在16ビット)は、以下のものをコード化します。(1) Duktape/C関数が期待するスタック引数の数（0～14またはvarargs）、 (2) 仮想長プロパティ値（0～15）、および (3) マジック値（-128～127）です。

Lightfuncsは、Duktape C APIでは別のタグ付きタイプですが、ECMAScriptコードでは、ほとんどFunctionオブジェクトのように振る舞います。通常のFunctionオブジェクトと比較すると、大きな制限があります。

- Lightfuncs は、独自のプロパティを保持することができません。Lightfuncs には、トレースバックに表示される固定の仮想 .name プロパティと、仮想 .length プロパティがあります。その他のプロパティは Function.prototype から継承されます。
- Lightfuncs はコンストラクタ関数として使用できますが、.prototype プロパティを持つことはできません。Object.prototype （デフォルト）を継承しないオブジェクトを構築する必要がある場合は、（a）コンストラクタで明示的にインスタンスを構築して返すか、（b）コンストラクタでデフォルト インスタンスの内部プロトタイプを明示的にオーバーライドする必要があります。
- Lightfunc はアクセサ・プロパティ（ゲッター/セッター）として使用できますが、実際の関数に変換されるため、メモリの利点が失われます。test-dev-lightfunc-accessor.js を参照してください。
- Lightfunc はプリミティブな型なのでファイナライザを持つことができず、参照カウントフィールドを持たず、ガベージコレクションにも参加しません。test-dev-lightfunc-finalizer.js を参照してください。

Lightfuncs は、通常の Function オブジェクトのメモリへの影響が問題となるような、非常に低メモリの環境で有用です。詳しくは Function objects を見てください。

