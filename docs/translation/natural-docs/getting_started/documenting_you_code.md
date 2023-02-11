# Natural Docsによるコードの文書化（日本語訳）

[原文](https://www.naturaldocs.org/getting_started/documenting_your_code/)

## 基本

いよいよコードの文書化を開始するときが来ました。文書化を非常に簡単かつ苦痛にならないようにするため、すぐに飛び込んでみましょう。

```c
// Function: Multiply
// Multiplies two integers and returns the result.
int Multiply (int x, int y)
    {  return x * y;  }
```

必要なのはこれだけです。Natural Docsを実行するとこのような出力が表示されます。

```
Multiply

int Multiply (	
int 	x,
int 	y
)

Multiplies two integers and returns the result.
```

各コメントは簡単なものから詳細なものまで自由に作ることができます。以下は、より凝ったものです。明らかにやりすぎですが、あくまでデモンストレーションです。

```c
/* Function: Multiply

   Multiplies two integers.

   Parameters:

      x - The first integer.
      y - The second integer.

   Returns:

      The two integers multiplied together.

   See Also:

      Divide
*/

int Multiply (int x, int y)
   {  return x * y;  }
```

```
Multiply

int Multiply (	
int 	x,
int 	y
)

Multiplies two integers.

Parameters
x
int
The first integer.
y
int
The second integer.

Returns
The two integers multiplied together.

See Also
Divide
```

それでもあまり怖くはないでしょう？ コメントも出力と同じように読みやすいものです。タグが散乱しているわけでもなく、構造も非常に自然です。見ただけでわかると思いますが、とりあえず1つずつ見ていきましょう。

```c
Function: Multiply
```

コメントはどれも「キーワード: タイトル」という形式の行から始まることになります。キーワードはたくさんありますが、それらはあなたが期待する通りのものです。関数、クラス、変数など。また同義語や略語も多く、Functionの代わりにFunc・Procedure・Methodなどを使うこともできます。このように何も覚えなくても記述しているものをそのまま使えるように設計されています。キーワードリストに目を通すことができますが、あまり頻繁に参照する必要はないでしょう。

この行のもう一つの部分はタイトルです。これはあなたが文書化しているもの、この場合は関数名Multiplyと一致させる必要があります。Natural Docsはプログラミング言語の大文字と小文字を区別しないので、正確に一致させないと出力にプロトタイプ（関数宣言を示す小さな灰色のボックス）が表示されない可能性があることに注意してください。タイトルにパラメータを含める必要はありません。  むしろ、そうしないほうがよいでしょう。

コメント記号は /** などの特別なものを使う必要はありません。重要なのは「キーワード: タイトル」の行で始まることだけです。

```
Parameters:

Returns:

See Also:
```

また、行を飛ばしてコロンでテキストを終了させることによっても見出しを定義することができます。他のドキュメントシステムに慣れていると選べる見出しはほんの一握りだと思うかもしれませんが、この方法でフォーマットされたテキストはすべて見出しになります。もし、Dependenciesという見出しを付けたいのであれば、そのまま追加してください。ただタイトルケース（本のタイトルのようにほとんどの単語を大文字にすること）を使用する必要があることに注意してください。

```
x - The first integer.
y - The second integer.
```

これはいわゆる定義リストと呼ばれるものです。行を飛ばすまで止まらないので複数の行を使って定義を終わらせることができます。


```
x - The first integer.
y - The second integer with a long description.
    This is still part of the description.

This is a new paragraph because we skipped a line
and didn't indent.
```

2行目は1行目と同じようにずっとインデントする必要はありませんが、少なくともスペース2つ分インデントする必要があります。

```
<Divide>
```

これがNatural Docsでのリンクの仕方で角括弧を使います。これについては後で詳しく説明しますが、今はクールなものをお見せします。下の出力でマウスをその上に持っていってください。

```
Divide
```

生成されたドキュメントのいたるところでこのようなことが書かれていますね。

## クラスと範囲

しかし、有用性に疑問のあるクラス全体がある場合はどうでしょうか。各要素のすぐ上にNatural Docsのコメントを付けて個々の関数をドキュメント化したのと同じように、クラスとそのメンバーをドキュメント化することができます。この例では管理しやすいように短い説明文に戻します。

```cpp
// Class: Counter
// A class that manages an incrementing counter.
public class Counter
   {
   // Constructor: Counter
   // Initializes the object.
   public Counter ()
      {  value = 0;  }

   // Function: Increment
   // Adds one to the counter.
   public void Increment ()
      {  value++;  }

   // Property: Value
   // Returns the value of the counter.
   public int Value
      {
      get
         {  return value;  }
      }

   // Variable: value
   // The value of the counter.
   private int value;
   }
```

すべて同じでClass、Property、VariableをFunctionキーワードに置き換えただけです。Constructorも使いましたが、これもFunctionと同じように簡単に使うことができます。どちらも同じものを表すキーワードなので問題ありません。

### 対象範囲

ソースコード自体と同様にNatural Docsのコメントにはスコープがあります。ValueとIncrementはコードにあるようにクラスCounterの一部と見なされます。なぜこれが重要なのでしょうか。リンクです。あるコメントから別のコメントへのリンクは、ある関数が別の関数を呼び出す方法と同様の規則があります。ValueはIncrementと同じクラスなので、そのコメントは単に`<Increment>`でリンクすることができます。しかし、別のクラスからIncrementにリンクする場合は、代わりに`<Counter.Increment>`が必要です。実際には、3つの最も一般的なクラス/メンバの記法を使用できます。`<Counter.Increment>`、`<Counter::Increment>`、そして`<Counter->Increment>`です。

プログラミング言語が完全な言語サポートを持っている場合、スコープはコードによって決定され、自動的に適用されます。しかし、基本的な言語サポートしかない場合は、以下のルールに従います。

- Class のコメント（または Starts Scope と書かれたもの）の後に表示されるコメントは、そのクラスの一部となります。
- Section コメント（または Ends Scope と書かれたもの）の後に表示されるコメントはすべて、再びグローバルになります。
- Fileコメント（またはAlways Globalと書かれたもの）は、何があってもグローバルであり、他のコメントには影響しません。

これを知らなくても同じことを書いていて、そのまま通用した可能性があります。通常は全く考える必要はないでしょう。しかし、何かがあなたの期待通りに動作しない場合に備えて、これらのルールを意識しておくのは良いことです。[リファレンスの全文](https://www.naturaldocs.org/reference/scope)はもっと詳しく書かれています。

あなたは今、ドキュメントを書き始めるのに十分な知識を持っています。もっと学べることはありますが、それらは付加的なものです。

## その他の書式

### 段落、太字、下線

これらの構文は非常に簡単です。

```
*Bold text*

_Underlined text_

Paragraphs are broken by skipping lines.  So the two
lines above each have their own paragraph, but these
three lines are all part of the same one.
```

```
Bold text
Underlined text
Paragraphs are broken by skipping lines.  So the two lines above each have their own paragraph, but these three lines are all part of the same one.
```

複数の単語に下線を引く場合、それぞれのスペースにアンダースコアを使うこともできますし、上記のように端につけることもできます。どちらの方法も有効です。

### 箇条書きリスト

行頭にダッシュやアスタリスクを付けると、箇条書きにすることができます。内容は複数行にまたがることがあるので、終わらせるには1行飛ばす必要があります。

```
- Bullet one.
- Bullet two.
  Bullet two continued.
- Bullet three.

Some text after the bullet list.
```

```
Bullet one.
Bullet two.  Bullet two continued.
Bullet three.
Some text after the bullet list.
```

各レベルが前のレベルより少なくとも2スペース以上インデントされていれば、複数のレベルを持つことができます。また、1つの箇条書きの中に複数の段落があっても、そこから少なくとも2つのスペースでインデントされていれば問題ありません。

```
* Level one.

  * Level two, first paragraph.
    Level two, first paragraph continued.

    Level two, second paragraph.

      * Level three.
```

```
Level one.
Level two, first paragraph.  Level two, first paragraph continued.
Level two, second paragraph.
Level three.
```

### 定義リスト

定義リストは「項目 - 定義」という形式の行です。箇条書きのリストと同様、行を飛ばすまで続き、インデントされていれば定義の中に複数の段落を持つことができます。

```
Item 1 - The first paragraph.
         The first paragraph continued.

         The second paragraph

Item 2 - The first paragraph.
  The first paragraph continued.

  The second paragraph.

Some text after the definition list.
```

```
Item 1	
The first paragraph.  The first paragraph continued.
The second paragraph
Item 2	
The first paragraph.  The first paragraph continued.
The second paragraph.
Some text after the definition list.
```

関数を文書化し、パラメータ（またはパラメータ、引数など）という見出しの下に定義リストを置くとNatural Docsは自動的にプロトタイプでそれぞれを検索し、リストにそのタイプを含めます。

```c
/* Function: MyFunction
 *
 * Parameters:
 *
 *    x - Description of x.
 *    y - Description of y.
 *    z - Description of z.
 */
void MyFunction (int x, string y, Counter z)
   { ... }
```

```
Parameters
x
int
Description of x.
y
string
Description of y.
z
Counter
Description of z.
```

Counterのような文書化されたタイプの場合、その定義へのリンクとなり、マウスを乗せると概要がポップアップ表示されます。

### コードとテキスト図

コードのセクションを追加するには、少なくとも3つのダッシュ・等号・またはアンダースコアで行を開始し、「Code」を続けてください。同じ記号が3つ以上並ぶ別の行が現れるまで続けられます。

```
This is a normal paragraph.

--- Code
int x = 12;
int y = 0;
---

This is a normal paragraph.
```

```
This is a normal paragraph.

int x = 12;
int y = 0;

This is a normal paragraph.
```

必要なら3文字以上使ってもよいですし、また、その方が視覚的にはっきりするのであれば、キーワードの後にもっと続けても構いません。

また、Codeの代わりに言語名を指定すると、正しいシンタックスハイライトが使用されます。また、Textを使用するとハイライトを全く使用せず、各ブロックを個別に閉じることなく、あるモードから別のモードへ切り替えることができます。

```
This is a normal paragraph.

======= C# =======
int x = 12;
int y = 0;
====== Perl ======
my $x = 12;
my $y = 0;
====== Text ======
This is plain text
==================

This is a normal paragraph.
```

```
This is a normal paragraph.

int x = 12;
int y = 0;

my $x = 12;
my $y = 0;

This is plain text

This is a normal paragraph.
```

もし、ここやあそこに簡単な行を入れたいだけなら、それぞれの行を「>」「|」または「:」で始めることができます。ただし、ハイライトはされません。

```
This is a normal paragraph.

> int x = 12;
> int y = 0;

This is a normal paragraph.
```

```
This is a normal paragraph.

int x = 12;
int y = 0;

This is a normal paragraph.
```

## リンクの詳細

リンクにはまだ続きがあります。URLやメールアドレスにリンクすることができますが、この場合、角括弧は任意です。

```
Visit <http://www.website.com> or send messages to email@address.com.
```

```
Visit http://​www​.website​.com or send messages to email@address.com.
```

テキスト、「at」、そしてアドレスを角括弧に入れることで、名前付きリンクを作成することができます。この形式だと、文章の中で自然に読むことができます。また、「at」の代わりにコロンを使用することもできます。

```
Visit <the website: http://www.website.com> or <e-mail me at email@address.com>.
```

```
Visit the website or e-mail me.
```

電子メールアドレスは、見た目は通常のリンクと同じですが、HTMLが難読化されており、スパム・クローラーから保護することができます。

### 複数形と所有格

通常のリンクについては、文章になじみやすいように、角括弧の中に複数形や所有格を入れることができます。言い換えれば、`<Object>`sのような使いにくい構文を使用する必要はありません（それもサポートされています）。単純に`<Objects>`と書けば、シンボルObjectにうまくリンクしてくれます。複数形や所有格など、どのような形でも扱うことができます。冗談ではありません。Foxes, Fox's, Foxes', Children, Mice, Alumni, Indices, Amoebae, Teeth, などなど、とにかく試してみてください。

## 追加ドキュメント

時にはコード要素に直接対応しないドキュメントを含めたいことがあります。例えば、ライセンス情報やアーキテクチャの注記を含めたい場合です。これには2つの方法があります。

### 単体でのコメント

あなたが書くコメントのほとんどは、ソースコードの要素に直接対応するものですが、そうでなければならないというわけではありません。利用可能なキーワードのいずれかを選び、そのキーワードで独立したコメントを作成することができます。例えば:

```cpp
/* Class: Counter
 * A class that manages an incrementing counter.
 */
public class Counter
   {
   /* About: Thread Safety
    * This class is not designed to be thread safe.
    */

   /* Constructor: Counter
    * Initializes the object.
    */
   public Counter ()
      {  value = 0;  }

   ...
```

余分なコメントは関数と同じように出力に追加されます。

```
Thread Safety
This class is not designed to be thread safe.
```

スコープのため、コメントは実際には上記のようにCounterの一部とみなされることを忘れないでください。あなたは、`<Counter.Thread Safety>`で、Counter の外側からそれにリンクすることになります。この考えには慣れが必要かもしれませんが、もし余分なコメントが1つのクラスだけに適用されるなら、それは実際にそれを行う最も適切な方法です。プロジェクト全体に適用されるライセンスのようなものであれば、関数をそこに移動するのと同じように、それをグローバルにするためにクラスの上に置くことになります。

### テキストファイル

また、テキストファイルを使用して追加のドキュメントを追加することもできます。拡張子が.txtのファイルをソースフォルダに置き、「キーワード: タイトル」行で始めると、その内容はソースコード内のコメントと同じように扱われるようになります。つまり、複数の「keyword: title」行を使用して複数の内容を定義したり、ソースコード内のコメントとリンクしたり、利用可能なすべての書式オプションを使用することができるのです。

```
Title: License

   This file is licensed under the GPL.

   I can link to <Counter> and <Counter.Increment>, and the
   documentation in that class can even link back with <License>.


About: Second Topic

   I can create a *second* topic in here too, complete with
   formatting.
```

「タイトル」のように「キーワード: タイトル」の行で始めることを忘れてはいけません。上記の「License」のように「keyword: title」行で始めることを忘れてはなりません。これはNatural Docsが通常のテキストファイルと区別する方法です。

## リストの文書化

もう一つ知っておくと便利なことがあります。例えば、定数のような小さなドキュメントをたくさん持っているとします。それぞれに個別のコメントを書くのは、いくら圧縮しても非常に面倒です。

```c
// Constant: COUNTER_NORMAL
// Causes the counter to increment normally.
const int COUNTER_NORMAL = 0;

// Constant: COUNTER_ODD
// Causes the counter to only increment in odd numbers.
const int COUNTER_ODD = 1;

// Constant: COUNTER_EVEN
// Causes the counter to only increment in even numbers.
const int COUNTER_EVEN = 2;
```

キーワードリストを見て、ほとんどすべてのキーワードが複数形であることにお気づきでしょうか。これは、リストコメントと呼ばれるものを作成するために使用されます。複数形のキーワードを使ってコメントを定義すると、その中の定義リストに表示されるものは、あたかもそれぞれがコメントを持っているかのようにリンク可能になります。例えば:

```c
/* Constants: Counter Modes

   COUNTER_NORMAL - Causes the counter to increment normally.
   COUNTER_ODD    - Causes the counter to only increment in odd numbers.
   COUNTER_EVEN   - Causes the counter to only increment in even numbers.
*/
const int COUNTER_NORMAL = 0;
const int COUNTER_ODD = 1;
const int COUNTER_EVEN = 2;
```

これで`<COUNTER_ODD>`と書けば、最初の例と同じように動作するようになります。

enumキーワードを使用すると、自動的に同様の動作をするため、特別です。これによりenumとその値の両方が同じ場所で文書化されます。

```c
/* Enum: CounterMode

   Normal - Causes the counter to increment normally.
   Odd    - Causes the counter to only increment in odd numbers.
   Even   - Causes the counter to only increment in even numbers.
*/
enum CounterMode { Normal, Odd, Even };
```

CounterModeだけでなく、CounterMode.Oddへのリンクも可能になりました。