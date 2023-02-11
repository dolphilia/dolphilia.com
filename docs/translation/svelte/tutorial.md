# チュートリアル

## はじめに

### 基本

Svelteチュートリアルへようこそ。このチュートリアルでは、高速で小さなWebアプリケーションを簡単に構築するために必要なすべてのことを学びます。

また、APIドキュメントやサンプルを参考にすることもできますし、ローカルでマシンをハックするのが億劫な場合は、60秒のクイックスタートもあります。

#### Svelteとは？

Svelteは、高速なWebアプリケーションを構築するためのツールです。

ReactやVueなどのJavaScriptフレームワークと似ており、洗練されたインタラクティブなユーザーインターフェースを簡単に構築することを目的としています。

しかし、決定的な違いがあります。Svelteは、実行時にアプリケーションのコードを解釈するのではなく、ビルド時に理想的なJavaScriptに変換します。つまり、フレームワークの抽象化によるパフォーマンスコストを支払う必要がなく、アプリの初回ロード時にペナルティが発生することもないのです。

Svelteは、アプリ全体を構築することも、既存のコードベースに段階的に追加することも可能です。また、従来のフレームワークに依存することなく、どこでも動作するスタンドアロンパッケージとしてコンポーネントを出荷することができます。

#### このチュートリアルの使用方法

Svelteを理解するために、HTML、CSS、JavaScriptの基本的な知識が必要です。

チュートリアルを進めていくと、新しい機能を説明するためのミニ演習が表示されます。チュートリアルを進めていくと、新しい機能を説明するためのミニエクササイズが表示されます。必要であれば、上のドロップダウンから移動することができます（「入門/基本」をクリック）。

各チュートリアルの章には「Show me」ボタンがあり、説明に行き詰まったときにクリックすることができます。このボタンに頼り過ぎないようにしてください。提案されたコードブロックをどこに置けばいいかを考え、それをエディターに手入力することで、より早く習得することができます。

#### コンポーネントを理解する

Svelteでは、アプリケーションは1つまたは複数のコンポーネントから構成されます。コンポーネントとは、再利用可能な自己完結型のコードブロックのことで、一緒に属するHTML、CSS、JavaScriptをカプセル化し、.svelteファイルに書き込んだものです。コードエディタにある'hello world'の例は、単純なコンポーネントです。


### データの追加

静的なマークアップをレンダリングするだけのコンポーネントは、あまり面白くありません。何かデータを追加してみましょう。

まず、コンポーネントにscriptタグを追加して、name変数を宣言します。

```html
<script>
	let name = 'world';
</script>

<h1>Hello world!</h1>
```

そして、マークアップの中でnameを参照することができる。

```html
<h1>Hello {name}!</h1>
```

中括弧の中には、好きなJavaScriptを入れることができる。nameをname.toUpperCase()に変更すると、よりシャイな挨拶ができる。


### Dynamic attricutes

中括弧は、テキストを制御するのと同じように、要素の属性を制御するために使用することができます。

この画像にはsrc属性がありません。

```html
<img src={src}>
```

そのほうがいい。しかし、Svelteは警告を発しているのだ。

```
A11y: <img> element should have an alt attribute
```

ウェブアプリケーションを構築する場合、視覚や動作に障害がある人、強力なハードウェアや良好なインターネット接続を持たない人など、できるだけ多くのユーザーがアクセスできるようにすることが重要です。アクセシビリティ（a11yと略す）を正しく理解することは必ずしも容易ではありませんが、Svelteは、アクセシビリティに欠けるマークアップを記述した場合に警告することで、その実現を支援します。

この場合、スクリーンリーダーを使用している人や、インターネット接続が遅い、または不安定で画像をダウンロードできない人のために、画像を説明するalt属性が不足しているのです。追加してみよう。

```
<img src={src} alt="A man dances.">
```

属性の中では中括弧を使うことができるんだ。"{name} dances." に変更してみてください。- は、`<script>`ブロックの中でname変数を宣言することを忘れないでください。

#### 短縮形属性

src={src}のように、名前と値が同じである属性はよくあることです。Svelteでは、このような場合に便利な省略記法を用意しています。

```html
<img {src} alt="A man dances.">
```


### スタイリング

HTMLと同じように、`<style>` タグをコンポーネントに追加することができます。ここでは、`<p>`要素にスタイルを追加してみましょう。

```html
<p>This is a paragraph.</p>

<style>
	p {
		color: purple;
		font-family: 'Comic Sans MS', cursive;
		font-size: 2em;
	}
</style>
```

重要なのは、これらのルールはコンポーネントにスコープされていることです。次のステップで説明するように、誤ってアプリ内の他の場所で `<p>` 要素のスタイルを変更することはありません。


### ネストされたコンポーネント

アプリ全体を1つのコンポーネントに収めるのは非現実的です。その代わり、他のファイルからコンポーネントをインポートして、まるで要素を含むかのように使用することができます。

右側のエディタ（上のバー）をクリックすると、App.svelteとNested.svelteという2つのファイルが表示されるようになりました。

それぞれの.svelteファイルには、再利用可能な自己完結型のコードブロックであるコンポーネントが含まれており、一緒になっているHTML、CSS、JavaScriptをカプセル化しています。

App.svelteに`<script>`タグを追加して、Nested.svelteをアプリにインポートしてみましょう...。

```html
<script>
	import Nested from './Nested.svelte';
</script>
```

...そして、アプリのマークアップでコンポーネントNestedを使用します。

```html
<p>This is a paragraph.</p>
<Nested/>
```

Nested.svelteに`<p>`要素があっても、App.svelteのスタイルが漏れてこないことに注意してください。

また、コンポーネント名Nestedが大文字になっていることにも注目してください。これは、ユーザー定義のコンポーネントと通常のHTMLタグを区別できるようにするために採用された規則です。


### HTMLタグ

通常、文字列はプレーンテキストとして挿入され、`<`や`>`などの文字は特別な意味を持ちません。

しかし、時にはHTMLを直接コンポーネントにレンダリングする必要がある場合があります。例えば、あなたが今読んでいる単語はマークダウンファイルの中にあり、HTMLの塊としてこのページに取り込まれます。

Svelteでは、特別な{@html ...}タグを使用してこれを行います。

```html
<p>{@html string}</p>
```

Svelteは、DOMに挿入される前に{@html ...}内の式のサニタイズ処理を行いません。言い換えれば、この機能を使用する場合、信頼できないソースから来たHTMLを手動でエスケープすることが重要で、そうでなければユーザをXSS攻撃にさらす危険性があります。


### アプリを作る

このチュートリアルは、コンポーネントの書き方に慣れるためのものです。しかし、ある時点で、自分のテキストエディタで快適にコンポーネントを書き始めたいと思うでしょう。

まず、Svelteとビルドツールを統合する必要があります。SvelteKitを使うと、Viteとvite-plugin-svelteをセットアップすることができますので、おすすめです。

```sh
npm create svelte@latest myapp
```

また、コミュニティによって維持されている統合機能も数多くあります。

ウェブ開発の経験が浅く、これらのツールを使用したことがない場合でも心配はいりません。Svelte for new developers という簡単なステップバイステップのガイドを用意しましたので、そちらを参考にしてください。

また、テキストエディタの設定も必要です。公式のVS Codeエクステンションだけでなく、多くの一般的なエディタ用のプラグインも用意されています。

そして、プロジェクトの設定が完了したら、Svelteコンポーネントの使用は簡単です。コンパイラは各コンポーネントを通常のJavaScriptクラスとして扱います。

```js
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		// we'll learn about props later
		answer: 42
	}
});
```

その後、必要であればコンポーネントAPIを使ってアプリとやり取りすることができます。



## 反応性

### 課題

Svelteの核となるのは、イベントなどに応じてDOMをアプリケーションの状態と同期させるための強力なリアクティブシステムです。

これを実現するためには、まずイベントハンドラを作成する必要があります。9行目を次のように書き換えてください。

```html
<button on:click={incrementCount}>
```

incrementCount関数の内部では、countの値を変更するだけでよい。

```js
function incrementCount() {
	count += 1;
}
```

Svelteはこの課題を、DOMの更新が必要であることを伝えるいくつかのコードで「計測」します。


### 宣言文

Svelteの反応性は、前のセクションで示したようにDOMとアプリケーションの変数の同期を保つだけでなく、反応宣言を使って変数同士の同期を保つことができます。これは次のようなものです。

```js
let count = 0;
$: doubled = count * 2;
```

ちょっと異質に見えるかもしれませんが、ご心配なく。Svelteは、「参照する値が変わるたびにこのコードを再実行する」という意味で解釈しているのです。一度慣れてしまえば、もう元には戻れない。

マークアップに2倍速を使ってみよう。

```html
<p>{count} doubled is {doubled}</p>
```

もちろん、マークアップで{count * 2}と書くこともできます。リアクティブな値は、複数回参照する必要がある場合や、他のリアクティブな値に依存する値がある場合に、特に価値が高くなる。


### ステートメント

リアクティブな値を宣言するだけでなく、任意のステートメントをリアクティブに実行することもできる。例えば、countの値が変化するたびにログを記録することができる。

```js
$: console.log('the count is ' + count);
```

ブロックを使って簡単にステートメントをグループ化することができます。

```js
$: {
	console.log('the count is ' + count);
	alert('I SAID THE COUNT IS ' + count);
}
```

ifブロックのようなものの前に$:をつけることもできます。

```js
$: if (count >= 10) {
	alert('count is dangerously high!');
	count = 9;
}
```


### 配列とオブジェクトの更新

Svelteの反応性は代入がトリガーとなります。配列やオブジェクトを変更するメソッドは、それ自体では更新をトリガーしません。

この例では、「数値を追加する」ボタンをクリックすると、addNumber関数が呼び出され、配列に数値が追加されますが、sumの再計算はトリガーされません。

これを解決する一つの方法は、それ自体に数値を代入して、コンパイラに変更したことを伝えることです。

```js
function addNumber() {
	numbers.push(numbers.length + 1);
	numbers = numbers;
}
```

ES6の拡散構文を使えば、もっと簡潔に書くこともできます。

```js
function addNumber() {
	numbers = [...numbers, numbers.length + 1];
}
```

pop, shift, splice などの配列メソッドや、Map.set, Set.add などのオブジェクトメソッドも同じルールです。

配列やオブジェクトのプロパティへの代入、例えば obj.foo += 1 や array[i] = x は、値そのものへの代入と同じように働きます。

```js
function addNumber() {
	numbers[numbers.length] = numbers.length + 1;
}
```

しかし、このような参考文献への間接的なアサインは......。

```js
const foo = obj.foo;
foo.bar = 'baz';
```

または

```js
function quox(thing) {
	thing.foo.bar = 'baz';
}
quox(obj);
```

...は、obj = obj.foo.barと続けない限り、obj.foo.barに対する反応性を発動させない。

単純な経験則ですが、更新された変数は、代入の左側に直接表示されなければなりません。



## プロップ

### プロップの宣言

ここまでは、内部状態のみを扱ってきました。つまり、与えられたコンポーネントの中でのみアクセス可能な値です。

実際のアプリケーションでは、あるコンポーネントからその子コンポーネントにデータを渡す必要があります。そのためには、プロパティを宣言する必要があります。一般的には「プロップ」と短縮されます。Svelteでは、exportキーワードを使用してこれを行います。Nested.svelteコンポーネントを編集してください。

```js
<script>
	export let answer;
</script>
```

$: と同じように、これは最初はちょっと変に感じるかもしれません。JavaScriptモジュールでは、通常exportはこのように動作しないのです。すぐに自然に使えるようになりますよ。


### 初期設定値

Nested.svelteでは、propsにデフォルト値を簡単に指定することができます。

```html
<script>
	export let answer = 'a mystery';
</script>
```

今、回答プロップなしで2番目のコンポーネントを追加すると、デフォルトにフォールバックします。

```html
<Nested answer={42}/>
<Nested/>
```


### スプレッドプロップス

プロパティのオブジェクトがある場合、それぞれを指定する代わりに、それらをコンポーネント上に「スプレッド」することができます。

```html
<Info {...pkg}/>
```

逆に、exportで宣言されていないものも含め、コンポーネントに渡されたすべてのpropを参照する必要がある場合は、$$propsに直接アクセスすることで可能です。Svelteが最適化しにくいので、一般的にはお勧めしませんが、稀に便利な場合もあります。



## ロジック

### ifブロック

HTMLには条件分岐やループなどのロジックを表現する方法がない。Svelteにはあります。

あるマークアップを条件付きでレンダリングするには、ifブロックで囲みます。

```html
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

試しに、コンポーネントを更新して、ボタンをクリックしてみてください。


### elseブロック

if user.loggedIn と if !user.loggedIn の2つの条件は互いに排他的なので、elseブロックを使ってこのコンポーネントを少し簡略化することができます。

```html
{#if user.loggedIn}
	<button on:click={toggle}>
		Log out
	</button>
{:else}
	<button on:click={toggle}>
		Log in
	</button>
{/if}
```

`#`の文字は常にブロックの開始タグを示します。`/`文字は常にブロックの閉じタグを示します。else}のような `:` 文字は、ブロック継続タグを示します。SvelteがHTMLに追加するほとんどの構文はすでに学んでいますので、ご心配なく。


### else-ifブロック

複数の条件をelse ifで「連鎖」させることができる。

```html
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
```

### eachブロック

データのリストをループする必要がある場合は、eachブロックを使用します。

```html
<ul>
	{#each cats as cat}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
			{cat.name}
		</a></li>
	{/each}
</ul>
```

式（この場合はcats）は任意の配列または配列に似たオブジェクト（つまりlengthプロパティを持つ）であることが可能です。一般的な反復記号は，each [... iterable] でループさせることができる．

次のように、第2引数として現在のインデックスを取得することができます。

```html
{#each cats as cat, i}
	<li><a target="_blank" href="https://www.youtube.com/watch?v={cat.id}" rel="noreferrer">
		{i + 1}: {cat.name}
	</a></li>
{/each}
```

必要であれば、cats を { id, name } とするデストラクチャリングも可能です。- として、cat.id と cat.name を id と name に置き換えます。


### Keyed each ブロック

デフォルトでは、eachブロックの値を変更すると、ブロックの末尾にある項目を追加・削除し、変更された値を更新するようになっています。これは、あなたが望むことではないのかもしれません。

説明するよりも、その理由を示す方が簡単です。Remove first thing' ボタンを数回クリックすると、何が起こるかわかります。最初の `<Thing>` コンポーネントを削除するのではなく、最後の DOM ノードを削除します。そして、残りのDOMノードにある名前の値を更新しますが、絵文字は更新しません。

その代わりに、最初の `<Thing>` コンポーネントとその DOM ノードだけを削除して、他のものは影響を受けないようにしたいと思います。

そのために、各ブロックに一意な識別子（または「キー」）を指定する。

```html
{#each things as thing (thing.id)}
	<Thing name={thing.name}/>
{/each}
```

ここで、(thing.id)はキーであり、コンポーネントが更新されたときにどのDOMノードを変更すべきかをSvelteに伝えるものです。

Svelteは内部的にMapを使用しているため、キーとして任意のオブジェクトを使用することができます。しかし、文字列や数値を使用する方が一般的に安全です。なぜなら、APIサーバーからの新鮮なデータで更新する場合などに、同一性が参照関係なしに持続するからです。


### Awaitブロック

ほとんどのWebアプリケーションは、ある時点で非同期データを処理する必要があります。Svelteを使えば、マークアップの中で直接プロミスの値を待つことが簡単にできるようになります。

```html
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
```

最新の約束事のみを考慮するため、レースコンディションを気にする必要がない。

もしプロミスが拒否できないことが分かっている場合は、catchブロックを省略することができます。また、プロミスが解決するまで何も表示したくない場合は、最初のブロックを省略することができます。

```html
{#await promise then number}
	<p>the number is {number}</p>
{/await}
```



## イベント

### DOMイベント

すでに簡単に見てきたように、on: ディレクティブを使用すると、要素上の任意のイベントをリッスンすることができます。

```html
<div on:mousemove={handleMousemove}>
	The mouse position is {m.x} x {m.y}
</div>
```


### インラインハンドラ

イベントハンドラをインラインで宣言することもできます。

```html
<div on:mousemove="{e => m = { x: e.clientX, y: e.clientY }}">
	The mouse position is {m.x} x {m.y}
</div>
```

引用符は任意ですが、環境によってはシンタックスハイライトに便利です。

フレームワークによっては、パフォーマンス上の理由からインラインイベントハンドラを避けるよう推奨されている場合があります。特にループの内部では注意が必要です。Svelteではそのようなアドバイスはありません。コンパイラは、どのような形式を選択しても、常に正しい処理を行います。


### イベントモディファイア

DOM イベントハンドラには、その振る舞いを変更する修飾子をつけることができます。例えば、once 修飾子を持つハンドラは一度だけ実行されます。

```html
<script>
	function handleClick() {
		alert('no more alerts')
	}
</script>

<button on:click|once={handleClick}>
	Click me
</button>
```

モディファイアの全リストです。

- preventDefault - ハンドラを実行する前に event.preventDefault() をコールします。例えば、クライアントサイドのフォーム処理に便利です。
- stopPropagation - event.stopPropagation()を呼び出し、イベントが次の要素に到達するのを防ぎます。
- passive - タッチ/ホイールイベント時のスクロールのパフォーマンスを向上させます（Svelteは、安全な場所に自動的に追加します）。
- nonpassive - 明示的にpassive: falseを設定します。
- capture - バブリングフェーズではなく、キャプチャフェーズでハンドラを起動する (MDN docs)
- once - ハンドラを最初に実行した後に削除します。
- self - event.targetが要素自身の場合にのみ、ハンドラをトリガします。
- trusted - event.isTrustedがtrueのときのみハンドラをトリガする。つまり、イベントがユーザーアクションによってトリガーされた場合。

on:click|once|capture={...}のように修飾子を連鎖させることができます。


### コンポーネントイベント

コンポーネントは、イベントをディスパッチすることもできます。これを行うには、イベントディスパッチャを作成する必要があります。Inner.svelte を更新してください。

```html
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function sayHello() {
		dispatch('message', {
			text: 'Hello!'
		});
	}
</script>
```

createEventDispatcher は、コンポーネントが最初にインスタンス化されたときに呼び出される必要があります - setTimeout コールバックなどの内部で後から実行することはできません。これは、ディスパッチをコンポーネントのインスタンスにリンクします。
App コンポーネントは、on:message ディレクティブによって Inner コンポーネントによってディスパッチされたメッセージをリスンしていることに注意してください。このディレクティブは、on: の後にディスパッチするイベント名（この場合、message）を付けた属性です。

この属性がないと、メッセージはディスパッチされますが、アプリはそれに反応しません。on:message属性を削除して、もう一度ボタンを押してみてください。

また、イベント名を他のものに変えてみることもできます。例えば、Inner.svelteの dispatch('message') を dispatch('myevent') に変更し、App.svelteコンポーネントの属性名を on:message から on:myevent に変更します。


### イベント転送

DOM イベントとは異なり、コンポーネントイベントはバブルではありません。深くネストされたコンポーネントのイベントをリスニングしたい場合は、中間コンポーネントがイベントを転送する必要があります。

この場合、前章と同じ App.svelte と Inner.svelte がありますが、`<Inner/>` を含む Outer.svelte コンポーネントが存在することになります。

この問題を解決する一つの方法は、Outer.svelteにcreateEventDispatcherを追加し、メッセージイベントをリスニングし、そのハンドラを作成することです。

```html
<script>
	import Inner from './Inner.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	function forward(event) {
		dispatch('message', event.detail);
	}
</script>

<Inner on:message={forward}/>
```

しかし、これは多くのコードを書くことになるので、Svelteは同等の略記法を用意しています。値なしのon:messageイベント指示は、「すべてのメッセージイベントを転送する」ことを意味します。

```html
<script>
	import Inner from './Inner.svelte';
</script>

<Inner on:message/>
```


### DOMイベント転送

イベント転送は、DOMイベントに対しても機能します。

`<CustomButton>` がクリックされた時に通知を受けたい - そのためには、CustomButton.svelte で `<button>` 要素のクリックイベントを転送すればよいのです。

```html
<button on:click>
	Click me
</button>
```


## バインディング

### テキスト入力

Svelteのデータフローは原則としてトップダウンで、親コンポーネントは子コンポーネントにpropsを設定でき、コンポーネントは要素に属性を設定できますが、その逆はできません。

しかし、時にはこのルールを破ることが有効な場合があります。このコンポーネントの `<input>` 要素の場合、name の値を event.target.value に設定する on:input イベントハンドラを追加できますが、これはちょっと...お決まりの方法ですね。他のフォーム要素では、これから見るようにさらに悪くなります。

その代わり、bind:valueディレクティブを使うことができます。

```html
<input bind:value={name}>
```

これは、nameの値を変更すると入力値が更新されるだけでなく、入力値を変更するとnameも更新されることを意味する。


### 数値入力

DOMでは、すべてが文字列です。type="number "やtype="range "といった数値入力を扱う際には、この文字列は役に立ちません。なぜなら、入力値を使う前に、入力値を強制することを忘れないようにしなければならないからです。

bind:valueを使えば、Svelteがそれを代行してくれます。

```html
<input type=number bind:value={a} min=0 max=10>
<input type=range bind:value={a} min=0 max=10>
```

### チェックボックス入力

チェックボックスは状態を切り替えるために使用されます。input.valueにバインドするのではなく、input.checkedにバインドします。

```html
<input type=checkbox bind:checked={yes}>
```

### グループ入力

同じ値に関連する複数の入力がある場合、value属性とともにbind:groupを使用することができます。同じグループのラジオ入力は相互に排他的であり、同じグループのチェックボックス入力は選択された値の配列を形成します。

各入力にbind:groupを追加します。

```html
<input type=radio bind:group={scoops} name="scoops" value={1}>
```

この場合、チェックボックスの入力を各ブロックに移動することで、よりシンプルなコードにすることができます。まず、`<script>` ブロックにメニュー変数を追加します...

```html
let menu = [
	'Cookies and cream',
	'Mint choc chip',
	'Raspberry ripple'
];
```

...その後、2番目のセクションを交換します。

```html
<h2>Flavours</h2>

{#each menu as flavour}
	<label>
		<input type=checkbox bind:group={flavours} name="flavours" value={flavour}>
		{flavour}
	</label>
{/each}
```

アイスクリームメニューの新たな展開が容易にできるようになったのです。


### テキストエリア入力

`<textarea>` 要素は、Svelte のテキスト入力と同様の動作をします - bind:value を使用します。

```html
<textarea bind:value={value}></textarea>
```

このように、名前が一致する場合には、省略形を用いることもできる。

```html
<textarea bind:value></textarea>
```

これは、textareasだけでなく、すべてのバインディングに適用されます。


### Select バインディング

bind:value は `<select>` 要素でも使うことができます。20行目を更新。

```html
<select bind:value={selected} on:change="{() => answer = ''}">
```

なお、`<option>` の値は文字列ではなくオブジェクトであることに注意してください。Svelteは気にしません。

selectedの初期値を設定していないので、バインディングは自動的にデフォルト値（リストの最初の値）に設定します。バインディングが初期化されるまで、selectedは未定義のままなので、テンプレート内でselected.idなどをやみくもに参照することはできません。ユースケースが許すのであれば、この問題を回避するために初期値を設定することもできます。


### Select multiple

selectはmultiple属性を持つことができ、その場合、単一の値を選択するのではなく、配列に入力されます。

先ほどのアイスクリームの例に戻ると、チェックボックスを `<select multiple>` で置き換えることができます。

```html
<h2>Flavours</h2>

<select multiple bind:value={flavours}>
	{#each menu as flavour}
		<option value={flavour}>
			{flavour}
		</option>
	{/each}
</select>
```

コントロールキー（MacOSではコマンドキー）を押しながら、複数の選択肢を選ぶことができます。


### コンテンタブルバインディング

contenteditable="true" 属性を持つ要素は、textContent と innerHTML のバインディングをサポートしています。

```html
<div
	contenteditable="true"
	bind:innerHTML={html}
></div>
```


### Each block バインディング

eachブロックの中でプロパティにバインドすることも可能です。

```html
{#each todos as todo}
	<div class:done={todo.done}>
		<input
			type=checkbox
			bind:checked={todo.done}
		>

		<input
			placeholder="What needs to be done?"
			bind:value={todo.text}
		>
	</div>
{/each}
```

これらの `<input>` 要素を操作すると、配列が変更されることに注意してください。もし、イミュータブルなデータを扱いたいのであれば、これらのバインディングを避け、代わりにイベントハンドラを使用すべきです。


### メディア要素

`<audio>` と `<video>` 要素には、バインドすることができるいくつかのプロパティがあります。この例では、そのうちのいくつかを紹介します。

62行目で、currentTime={time}、duration、pausedのバインディングを追加しています。

```html
<video
	poster="https://sveltejs.github.io/assets/caminandes-llamigos.jpg"
	src="https://sveltejs.github.io/assets/caminandes-llamigos.mp4"
	on:mousemove={handleMove}
	on:touchmove|preventDefault={handleMove}
	on:mousedown={handleMousedown}
	on:mouseup={handleMouseup}
	bind:currentTime={time}
	bind:duration
	bind:paused>
	<track kind="captions">
</video>
```

bind:duration は bind:duration={duration} と同じです。

これで、ビデオをクリックすると、時間、継続時間、一時停止が適宜更新されます。つまり、それらを使ってカスタムコントロールを構築することができるのです。

通常、Web上ではtimeupdateイベントをリッスンすることでcurrentTimeを追跡します。しかし、これらのイベントの発生頻度が低すぎるため、UIがぎこちなくなってしまう。Svelteでは、requestAnimationFrameを使用してcurrentTimeをチェックすることで、より良い方法を実現している。

`<audio>` と `<video>` のバインディングの完全なセットは以下の通りです - 6つの読み取り専用のバインディング...

- duration (readonly) — 動画の総時間を秒単位で表したもの
- buffered (readonly) — {start, end} オブジェクトの配列
- seekable (readonly) — 同上
- played (readonly) — 同上
- seeking (readonly) — boolean
- ended (readonly) — boolean

...そして5つの2ウェイバインディング。

- currentTime — ビデオの現在の位置（秒単位
- playbackRate — 動画の再生速度（1が「通常」）。
- paused — これは自明のことであろう
- volume — 0から1までの値
- muted — ブール値で、true を指定するとミュートされます。

動画には、さらに videoWidth と videoHeight を readonly で指定することができる。


### Dimensions

すべてのブロックレベル要素はclientWidth, clientHeight, offsetWidth, offsetHeightのバインディングを持っています。

```html
<div bind:clientWidth={w} bind:clientHeight={h}>
	<span style="font-size: {size}px">{text}</span>
</div>
```

これらのバインディングは読み取り専用で、wとhの値を変更しても何の効果もない。

要素は、これに似た手法で計測されます。多少のオーバーヘッドが発生するので、大量の要素に使用するのはお勧めしません。

display: インライン要素はこの手法では測定できません。また、他の要素を含むことができない要素 (`<canvas>` など) も測定できません。また、他の要素を含むことができない要素 (`<canvas>` など) も測定できません。このような場合は、代わりにラッパー要素を測定する必要があります。


### This

readonly の this バインディングはすべての要素（およびコンポーネント）に適用され、レンダリングされた要素への参照を取得することができます。たとえば、`<canvas>` 要素への参照を取得することができます。

```html
<canvas
	bind:this={canvas}
	width={32}
	height={32}
></canvas>
```

canvas の値はコンポーネントがマウントされるまで未定義であるため、このロジックを onMount ライフサイクル関数内に置くことに注意してください。


### コンポーネントバインディング

DOM 要素のプロパティにバインドできるのと同じように、コンポーネントのプロップにバインドすることができます。例えば、この `<Keypad>` コンポーネントの value プロパティには、あたかもフォーム要素のようにバインドすることができます。

```html
<Keypad bind:value={pin} on:submit={handleSubmit}/>
```

これで、ユーザーがキーパッドを操作すると、親コンポーネントのpinの値が即座に更新されるようになりました。

コンポーネントバインディングの使用は控えめに。コンポーネントバインディングが多すぎると、アプリケーション内のデータの流れを追跡するのが難しくなります。


### コンポーネントインスタンスへのバインディング

DOM 要素にバインドするのと同じように、コンポーネントのインスタンスそのものにバインドすることができます。例えば、 `<InputField>` のインスタンスを、DOM 要素をバインドするときと同じように、field という変数にバインドすることができます。

```html
<script>
	let field;
</script>

<InputField bind:this={field} />
```

これで、field を使ってこのコンポーネントをプログラムで操作できるようになりました。

```html
<button on:click="{() => field.focus()}">
	Focus field
</button>
```

なお、ボタンが最初にレンダリングされるときにはfieldは未定義であり、エラーを投げるので、{field.focus}はできない。


## ライフサイクル

### onMount

すべてのコンポーネントは、作成時に始まり、破棄時に終了するライフサイクルを持ちます。そのライフサイクルの中で、重要なタイミングでコードを実行できる関数がいくつかあります。

最も頻繁に使用するのは onMount で、これはコンポーネントが最初に DOM にレンダリングされた後に実行されます。先ほど、レンダリング後に `<canvas>` 要素と対話する必要があったときに、この関数を簡単に使用しました。

ここでは、ネットワーク経由でデータをロードする onMount ハンドラを追加します。

```js
<script>
	import { onMount } from 'svelte';

	let photos = [];

	onMount(async () => {
		const res = await fetch(`/tutorial/api/album`);
		photos = await res.json();
	});
</script>
```

サーバサイドレンダリング (SSR) のため、フェッチを `<script>` のトップレベルではなく、onMount に置くことを推奨しています。onDestroy を除いて、ライフサイクル関数は SSR の間は実行されないので、コンポーネントが DOM にマウントされた時点で遅延ロードされるべきデータのフェッチを回避することができます。

ライフサイクル関数は、コンポーネントの初期化中にコールバックがコンポーネントインスタンスにバインドされるように呼び出す必要があります（例えば、setTimeoutではありません）。

onMountコールバックが関数を返す場合、その関数はコンポーネントが破棄されるときに呼び出されます。


### onDestroy

コンポーネントが破壊されたときにコードを実行するには、onDestroyを使用します。

例えば、コンポーネントの初期化時にsetInterval関数を追加し、それが不要になったらクリーンアップすることができます。こうすることで、メモリリークを防ぐことができる。

```js
<script>
	import { onDestroy } from 'svelte';

	let counter = 0;
	const interval = setInterval(() => counter += 1, 1000);

	onDestroy(() => clearInterval(interval));
</script>
```

コンポーネントの初期化時にライフサイクル関数を呼び出すことは重要ですが、どこから呼び出すかは重要ではありません。そこで、もし望めば、間隔ロジックをutils.jsのヘルパー関数に抽象化することができる...

```js
import { onDestroy } from 'svelte';

export function onInterval(callback, milliseconds) {
	const interval = setInterval(callback, milliseconds);

	onDestroy(() => {
		clearInterval(interval);
	});
}
```

...そして、それを私たちのコンポーネントにインポートしてください。

```js
<script>
	import { onInterval } from './utils.js';

	let counter = 0;
	onInterval(() => counter += 1, 1000);
</script>
```

タイマーを数回開いたり閉じたりして、カウンターが回り続け、CPU負荷が上昇することを確認してください。これは、以前のタイマーが削除されていないため、メモリーリークが発生していることが原因です。例題を解く前に、ページを更新することを忘れないでください。


### beforeUpdate と afterUpdate

beforeUpdate関数は、DOMが更新される直前の作業をスケジュールします。afterUpdateは、これと対になる関数で、DOMがデータと同期した後にコードを実行するために使用します。

この関数は、要素のスクロール位置の更新など、純粋にステートドリブンな方法では実現が困難なことを命令的に実行するのに便利です。

この Eliza チャットボットは、チャットウィンドウをスクロールし続けなければならないので、使い勝手が悪いです。それを解決しましょう。

```js
let div;
let autoscroll;

beforeUpdate(() => {
	autoscroll = div && (div.offsetHeight + div.scrollTop) > (div.scrollHeight - 20);
});

afterUpdate(() => {
	if (autoscroll) div.scrollTo(0, div.scrollHeight);
});
```

beforeUpdateはコンポーネントがマウントされる前に最初に実行されるので、プロパティを読み込む前にdivの存在をチェックする必要があることに注意してください。


### tick

tick 関数は他のライフサイクル関数とは異なり、コンポーネントが最初に初期化されたときだけでなく、いつでも呼び出すことができます。保留中の状態変化が DOM に適用されるとすぐに（または保留中の状態変化がない場合はすぐに）解決されるプロミスを返します。

Svelteでコンポーネントの状態を更新しても、すぐにDOMが更新されるわけではありません。その代わり、次のマイクロタスクまで待機し、他のコンポーネントを含め、適用する必要がある他の変更があるかどうかを確認します。こうすることで、不要な作業を回避し、ブラウザがより効率的にバッチ処理を行うことができます。

この例でその挙動を見ることができます。テキストの範囲を選択して、タブキーを押してください。`<textarea>` の値が変わるので、現在の選択範囲はクリアされ、カーソルは厄介にも末尾にジャンプしてしまいます。これを解決するには、tick... をインポートします。

```js
import { tick } from 'svelte';
```

...そして、handleKeydown の最後に this.selectionStart と this.selectionEnd を設定する直前に実行します。

```js
await tick();
this.selectionStart = selectionStart;
this.selectionEnd = selectionEnd;
```


## Stores

### 書き込み可能なストア

アプリケーションの状態が、すべてアプリケーションのコンポーネント階層の中にあるわけではありません。時には、無関係な複数のコンポーネントや、通常のJavaScriptモジュールからアクセスする必要がある値もあるでしょう。

Svelteでは、これをストアで実現します。ストアは単純にオブジェクトで、ストアの値が変更されたときに関係者に通知するためのsubscribeメソッドを備えています。App.svelteでは、countがストアであり、count.subscribeコールバックでcountValueをセットしています。

stores.jsタブをクリックすると、countの定義が表示されます。これは書き込み可能なストアであり、subscribeに加えてsetとupdateのメソッドを持っていることを意味します。

次にIncrementer.svelteタブを開いて、+ボタンの配線を行います。

```js
function increment() {
	count.update(n => n + 1);
}
```

ボタンをクリックすると、カウントが更新されるはずです。Decrementer.svelteの場合は逆を実行します。

最後に、Resetter.svelteで、resetを実装します。

```js
function reset() {
	count.set(0);
}
```


### オートサブスクリプション

前の例のアプリは動作しますが、微妙なバグがあります。ストアは購読されていますが、購読を解除されることはありません。このコンポーネントは何度もインスタンス化され、破棄された場合、メモリリークを引き起こします。

まずはApp.svelteでunsubscribeを宣言するところから始めましょう。

```js
const unsubscribe = count.subscribe(value => {
	countValue = value;
});
```

subscribe メソッドを呼び出すと、unsubscribe 関数が返される。

これで、unsubscribe を宣言しましたが、onDestroy ライフサイクルフックなどを通じて、まだ呼び出される必要があります。

```html
<script>
	import { onDestroy } from 'svelte';
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';

	let countValue;

	const unsubscribe = count.subscribe(value => {
		countValue = value;
	});

	onDestroy(unsubscribe);
</script>

<h1>The count is {countValue}</h1>
```

しかし、特にコンポーネントが複数のストアを購読している場合は、少し煩雑になり始めます。その代わり、Svelteにはトリックがあります。ストア名の前に$をつけることで、ストアの値を参照することができるのです。

```html
<script>
	import { count } from './stores.js';
	import Incrementer from './Incrementer.svelte';
	import Decrementer from './Decrementer.svelte';
	import Resetter from './Resetter.svelte';
</script>

<h1>The count is {$count}</h1>
```

自動サブスクリプションは、コンポーネントの最上位スコープで宣言（またはインポート）されているストア変数に対してのみ機能します。

イベントハンドラやリアクティブ宣言など、`<script>` 内の任意の場所で使用することができます。

イベントハンドラやリアクティブ宣言など、`<script>` 内の任意の場所で使用できます。これは事実上の予約文字です。Svelteは、独自の変数を$の接頭辞で宣言することを禁止しています。


### リーダブルストア

すべてのストアが、そのストアを参照している人から書き込み可能であるべきではありません。例えば、マウスの位置やユーザーの位置情報を表すストアがあったとして、それらの値を「外から」設定できるのは意味がありません。そのような場合のために、読み取り可能なストアを用意しています。

stores.jsタブをクリックしてください。readableの最初の引数は初期値で、まだ持っていない場合はnullかundefinedにすることができる。第2引数は、設定されたコールバックを受け取り、stop関数を返すstart関数です。start関数は、ストアが最初の購読者を獲得したときに呼び出され、stop関数は、最後の購読者が購読を停止したときに呼び出されます。

```js
export const time = readable(new Date(), function start(set) {
	const interval = setInterval(() => {
		set(new Date());
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
```


### 派生ストア

derivedを使用すると、1つまたは複数の他のストアの値を基にしたストアを作成できます。先ほどの例から、ページを開いた時間を派生させたストアを作成することができます。

```js
export const elapsed = derived(
	time,
	$time => Math.round(($time - start) / 1000)
);
```

複数の入力からストアを派生させることも可能で、値を返す代わりに明示的に設定することもできる（これは非同期に値を派生させる場合に有効）。詳細はAPIリファレンスを参照すること。


### カスタムストア

オブジェクトがsubscribeメソッドを正しく実装している限り、それはストアである。それ以上は何でもありだ。したがって、ドメイン固有のロジックを持つカスタムストアを作成することは非常に簡単である。

例えば、先ほどの count ストアに increment, decrement, reset メソッドを追加し、set と update を表示しないようにすることができます。

```js
function createCount() {
	const { subscribe, set, update } = writable(0);

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 1),
		reset: () => set(0)
	};
}
```

### ストアバインディング

ストアが書き込み可能な場合、つまり set メソッドがある場合は、ローカルコンポーネントの状態と同じようにその値にバインドすることができます。

この例では、書き込み可能なストア名と、派生したストアの挨拶文があります。`<input>` 要素を更新します。

```html
<input bind:value={$name}>
```

入力値を変更すると、nameとその依存関係がすべて更新されるようになりました。

また、コンポーネント内に値を保存するために直接代入することもできます。`<button>` 要素を追加します。

```html
<button on:click="{() => $name += '!'}">
	Add exclamation mark!
</button>
```

name += '!' の代入は name.set($name + '!') と同じ意味です。


## モーション

### Tweened

値を設定し、DOMが自動的に更新されるのを見るのはクールです。もっとクールなことは？その値をトゥイーンさせることです。Svelteには、アニメーションを用いて変化を伝えるスマートなユーザーインターフェイスを構築するためのツールが用意されています。

まずは、プログレスストアをトゥイーン値に変更するところから始めましょう。

```html
<script>
	import { tweened } from 'svelte/motion';

	const progress = tweened(0);
</script>
```

ボタンをクリックすると、プログレスバーがアニメーションして新しい値を表示します。しかし、これは少しロボット的で満足のいくものではありません。イージング機能を追加する必要があります。

```html
<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0, {
		duration: 400,
		easing: cubicOut
	});
</script>
```

svelte/easing モジュールには Penner のイージング方程式が含まれていますが、p と t を 0 から 1 の間の値とする独自の `p => t` 関数を提供することもできます。

tweenedで利用可能なオプションのフルセットです。

- delay - トゥイーンが始まるまでのミリ秒です。
- duration - トゥイーンの継続時間（ミリ秒）、または `(from, to) => milliseconds` 関数で、より大きな値の変化に対してより長いトゥイーンを指定します。
- easing - `p => t` 関数です。
- interpolate - 任意の値の間を補間するためのカスタム `(from, to) => t => value` 関数です。デフォルトでは、Svelteは数字、日付、同じ形の配列やオブジェクトの間を補間します（数字と日付、または他の有効な配列やオブジェクトだけを含む限り）。色文字列や変換行列を補間したい場合は、カスタムインターポレーターを指定します。

これらのオプションは、progress.set と progress.update に第2引数として渡すこともできます。setメソッドとupdateメソッドは、トゥイーンが完了したときに解決されるプロミスを返します。


### Spring

spring関数は、tweenedの代わりに、頻繁に変化する値に対してより効果的に機能することが多い。

この例では、円の座標と大きさを表す2つのストアがあります。これらをスプリングに変換してみましょう。

```html
<script>
	import { spring } from 'svelte/motion';

	let coords = spring({ x: 50, y: 50 });
	let size = spring(10);
</script>
```

どちらのスプリングもデフォルトで剛性とダンピングの値が設定されており、スプリングの「バネ性」をコントロールします。初期値を指定することができます。

```js
let coords = spring({ x: 50, y: 50 }, {
	stiffness: 0.1,
	damping: 0.25
});
```

マウスを動かして、スライダーをドラッグして、スプリングの挙動にどのような影響を与えるかを感じてみてください。スプリングが動いている間でも、値を調整することができることに注意してください。

詳しくはAPIリファレンスを参照してください。


## トランジション

### transitionディレクティブ

DOMへの要素の出入りを優雅に遷移させることで、より魅力的なユーザインタフェースを作ることができます。Svelteでは、transitionディレクティブにより、これを非常に簡単に行うことができます。

まず、svelte/transition...からfade関数をインポートします。

```html
<script>
	import { fade } from 'svelte/transition';
	let visible = true;
</script>
```

...そして、それを `<p>` 要素に追加してください。

```html
<p transition:fade>Fades in and out</p>
```


### パラメータの追加

トランジション関数には、パラメータを指定することができます。フェードトランジションをフライに置き換える...

```html
<script>
	import { fly } from 'svelte/transition';
	let visible = true;
</script>
```

...そして、それをいくつかのオプションとともに `<p>` に適用します。

```html
<p transition:fly="{{ y: 200, duration: 2000 }}">
	Flies in and out
</p>
```

遷移は可逆的であることに注意してください。遷移中にチェックボックスを切り替えると、始まりや終わりではなく、現在のポイントから遷移します。


### In と out

transition ディレクティブの代わりに、要素に in ディレクティブまたは out ディレクティブ、あるいは両方を一緒に指定することができます。インポート fade が fly と並ぶ...

```js
import { fade, fly } from 'svelte/transition';
```

...その後、トランジションディレクティブをインとアウトの別々のディレクティブに置き換えます。

```html
<p in:fly="{{ y: 200, duration: 2000 }}" out:fade>
	Flies in, fades out
</p>
```

この場合、遷移は逆ではありません。


### Custom CSS transitions

svelte/transitionモジュールには、いくつかの組み込みトランジションがありますが、自分で作成することも非常に簡単です。例として、フェードトランジションのソースはこれです。

```js
function fade(node, {
	delay = 0,
	duration = 400
}) {
	const o = +getComputedStyle(node).opacity;

	return {
		delay,
		duration,
		css: t => `opacity: ${t * o}`
	};
}
```

この関数は2つの引数（トランジションが適用されるノードと、渡された任意のパラメータ）を取り、以下のプロパティを持つことができるトランジションオブジェクトを返します。

- delay — 遷移開始のミリ秒前
- duration — 遷移の長さ（単位：ミリ秒
- easing — `a p => t` イージング機能 (トゥイーンの章を参照)
- css — `a (t, u) => css`関数、ここでu === 1 - t
- tick — `a (t, u) =>` ノードに何らかの効果を与える{...}関数

t値は、イントロの始まりとアウトロの終わりで0、イントロの終わりとアウトロの始まりで1になります。

ほとんどの場合、tickプロパティではなく、cssプロパティを返すべきです。CSSアニメーションは、可能な限りジャンキングを防ぐためにメインスレッドから実行されるからです。Svelteは、トランジションを「シミュレート」してCSSアニメーションを作成し、それを実行させます。

例えば、フェード遷移は以下のようなCSSアニメーションを生成します。

```css
0% { opacity: 0 }
10% { opacity: 0.1 }
20% { opacity: 0.2 }
/* ... */
100% { opacity: 1 }
```

でも、もっともっとクリエイティブになれるはず。本当にありがたいものを作ろう。

```html
<script>
	import { fade } from 'svelte/transition';
	import { elasticOut } from 'svelte/easing';

	let visible = true;

	function spin(node, { duration }) {
		return {
			duration,
			css: t => {
				const eased = elasticOut(t);

				return `
					transform: scale(${eased}) rotate(${eased * 1080}deg);
					color: hsl(
						${Math.trunc(t * 360)},
						${Math.min(100, 1000 - 1000 * t)}%,
						${Math.min(50, 500 - 500 * t)}%
					);`
			}
		};
	}
</script>
```

大きな力には、大きな責任が伴うことを忘れないでください。


### カスタムJSトランジション

遷移はできるだけCSSで行うのが一般的ですが、タイプライター効果など、JavaScriptでないと実現できない効果もあります。

```js
function typewriter(node, { speed = 1 }) {
	const valid = (
		node.childNodes.length === 1 &&
		node.childNodes[0].nodeType === Node.TEXT_NODE
	);

	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent;
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		tick: t => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
}
```


### トランジションイベント

トランジションがいつ始まり、いつ終わるのかを知ることは、とても便利なことです。Svelteは、他のDOMイベントと同様に聞くことができるイベントをディスパッチします。

```html
<p
	transition:fly="{{ y: 200, duration: 2000 }}"
	on:introstart="{() => status = 'intro started'}"
	on:outrostart="{() => status = 'outro started'}"
	on:introend="{() => status = 'intro ended'}"
	on:outroend="{() => status = 'outro ended'}"
>
	Flies in and out
</p>
```


### ローカルトランジション

通常、トランジションはコンテナブロックが追加されたり破壊されたりしたときに、要素に対して実行されます。この例では、リスト全体の可視性を切り替えると、個々のリスト要素にもトランジションが適用されます。

そこで、個々のアイテムが追加・削除されたとき、つまりユーザーがスライダーをドラッグしたときにのみ、トランジションを発生させるようにします。

これを実現するには、トランジションが設定されたブロックが追加または削除されたときにのみ再生される、ローカルトランジションを使用します。

```html
<div transition:slide|local>
	{item}
</div>
```


### Deferredトランジション

Svelteのトランジションエンジンで特に強力なのは、トランジションを延期して、複数の要素間で連携させる機能です。

例えば、この2つのTodoリストでは、Todoをトグルすると反対側のリストへ移動します。現実の世界では、オブジェクトはこのように動作しません。消えて別の場所に現れるのではなく、一連の中間位置を移動します。モーションは、アプリの中で何が起こっているかをユーザーに理解してもらうのに、大きな助けとなります。

この効果は、クロスフェード機能を使って実現できます。クロスフェード機能は、送信と受信という2つのトランジションを作成します。ある要素が「送信」されると、対応する要素が「受信」されるのを探し、その要素を相手の位置に変換してフェードアウトさせるトランジションを生成します。要素が「受信」されると、その逆が起こる。対応する要素がない場合は、フォールバックトランジションが使用されます。

65行目の `<label>` 要素を見つけて、送信トランジションと受信トランジションを追加します。

```html
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
>
```

次の `<label>` 要素にも同じことをします。

```html
<label
	class="done"
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
>
```

これで、アイテムを切り替えると、新しい場所にスムーズに移動するようになりました。非移行のアイテムはまだぎこちなく飛び跳ねていますが、これは次の章で修正します。


### キーブロック

キーブロックは、式の値が変わると、その内容を破棄して再作成する。

```html
{#key value}
	<div transition:fade>{value}</div>
{/key}
```

これは、ある要素が DOM に入るときや出るときだけでなく、値が変化するたびにトランジションを再生させたい場合に便利です。

数値に応じて `<span>` 要素をキーブロックで囲みます。これにより、インクリメントボタンを押すたびにアニメーションが再生されるようになります。




## アニメーション

### animate ディレクティブ

前章では、遅延遷移を利用して、あるTodoリストから他のTodoリストへ要素が移動する際の動きの錯覚を表現しました。

このイリュージョンを完成させるには、遷移しない要素に動きをつける必要があります。そのために、 animate ディレクティブを使用します。

まず、svelte/animate から flip 関数（flip は 'First, Last, Invert, Play' の略）をインポートします。

```js
import { flip } from 'svelte/animate';
```

Then add it to the `<label>` elements:

```html
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip
>
```

この場合、動きが少し遅いので、durationパラメータを追加します。

```html
<label
	in:receive="{{key: todo.id}}"
	out:send="{{key: todo.id}}"
	animate:flip="{{duration: 200}}"
>
```

duration は d => milliseconds の関数で、d は要素が移動しなければならないピクセル数です。
すべての遷移とアニメーションは、JavaScript ではなく CSS で適用されていることに注意してください。



## アクション

### useディレクティブ

アクションは、基本的に要素レベルのライフサイクル機能です。以下のようなことに役立ちます。

- サードパーティライブラリとのインターフェイス
- 遅延ロードされた画像
- ツールチップ
- カスタムイベントハンドラの追加

このアプリでは、ユーザーが外をクリックするとオレンジ色のモーダルが閉じるようにしたいのです。outclick イベント用のイベント ハンドラがありますが、これはネイティブの DOM イベントではありません。このイベントを自分でディスパッチする必要があります。まず、clickOutside 関数をインポートしてください...

```js
import { clickOutside } from "./click_outside.js";
```

...その後、エレメントで使用します。

```html
<div class="box" use:clickOutside on:outclick="{() => (showModal = false)}">
	Click outside me!
</div>
```

click_outside.js ファイルを開いてください。transition関数と同様に、アクション関数はnode（アクションが適用される要素）といくつかのオプションのパラメータを受け取り、アクションオブジェクトを返します。このオブジェクトはdestroy関数を持つことができ、要素がアンマウントされたときに呼び出されます。

ユーザーがオレンジ色の枠の外をクリックしたときに、outclick イベントを発生させたいと思います。一つの実装として、次のようなものが考えられる。

```js
export function clickOutside(node) {
	const handleClick = (event) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent("outclick"));
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}
```

clickOutside関数を更新し、ボタンをクリックしてモーダルを表示し、その外側をクリックしてモーダルを閉じます。


### パラメータの追加

トランジションやアニメーションと同様に、アクションは引数を取ることができ、アクション関数はその引数が属する要素とともに呼び出されます。

ここでは、ユーザーがボタンを一定時間押し続けるたびに、同じ名前のイベントを発生させる longpress アクションを使用しています。現在、longpress.js ファイルに切り替えると、このイベントが 500ms にハードコードされていることがわかります。

アクション関数を変更して、第2引数として継続時間を受け取り、その継続時間をsetTimeoutの呼び出しに渡すことができます。

```js
export function longpress(node, duration) {
	// ...

	const handleMousedown = () => {
		timer = setTimeout(() => {
			node.dispatchEvent(
				new CustomEvent('longpress')
			);
		}, duration);
	};

	// ...
}
```

App.svelteに戻ると、durationの値をアクションに渡せるようになります。

```html
<button use:longpress={duration}
```

これで、イベントは2秒後にしか発生しなくなり、ほぼ成功しました。しかし、継続時間を下にスライドさせると、まだ2秒かかることになります。

これを変更するには、longpress.js に update メソッドを追加します。これは、引数が変更されるたびに呼び出されます。

```js
return {
	update(newDuration) {
		duration = newDuration;
	},
	// ...
};
```

アクションに複数の引数を渡す必要がある場合は、use:longpress={duration, spiciness}}のように1つのオブジェクトにまとめます。



## 高度なスタイリング

### classディレクティブ

他の属性と同様に、JavaScriptの属性でクラスを指定することができます（こちら）。

```html
<button
	class="{current === 'foo' ? 'selected' : ''}"
	on:click="{() => current = 'foo'}"
>foo</button>
```

これはUI開発でよくあるパターンなので、Svelteではこれを簡略化するための特別なディレクティブを用意しています。

```html
<button
	class:selected="{current === 'foo'}"
	on:click="{() => current = 'foo'}"
>foo</button>
```

selectedクラスは、式の値が真である場合は要素に追加され、偽である場合は削除されます。


### Shorthand class ディレクティブ

多くの場合、クラスの名前は、それが依存する値の名前と同じになります。

```html
<div class:big={big}>
	<!-- ... -->
</div>
```

そのような場合は、省略形を使うことができます。

```html
<div class:big>
	<!-- ... -->
</div>
```


### インラインスタイル

### Styleディレクティブ

スタイルタグの中にスタイルを追加する以外に、style属性を使って個々の要素にスタイルを追加することもできます。通常はCSSでスタイルを指定しますが、CSSのカスタムプロパティと組み合わせることで、動的なスタイルに便利です。

段落要素に次のstyle属性を追加します：style="color: {color}; --opacity:{bgOpacity};"

素晴らしい！これで、考えられる値ごとにクラスを作ることなく、入力に応じて変化する変数を使用して段落にスタイルを設定することができます。


## Component composition

### スロット

要素がが子を持てるように...

```html
<div>
	<p>I'm a child of the div</p>
</div>
```

...コンポーネントも同様です。しかし、コンポーネントが子供を受け入れる前に、子供をどこに置くかを知っておく必要があります。これは `<slot>` 要素で行います。これをBox.svelteの中に入れる。

```html
<div class="box">
	<slot></slot>
</div>
```

物を入れられるようになりました。

```html
<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>
```


### スロットのフォールバック

コンポーネントは、`<slot>` 要素の中にコンテンツを入れることで、空のままのスロットにフォールバックを指定することができます。

```html
<div class="box">
	<slot>
		<em>no content was provided</em>
	</slot>
</div>
```

これで、子要素を持たない `<Box>` のインスタンスを作成できるようになりました。

```html
<Box>
	<h2>Hello!</h2>
	<p>This is a box. It can contain anything.</p>
</Box>

<Box/>
```


### ネームドスロット

前の例では、デフォルトのスロットが含まれており、コンポーネントの直接の子をレンダリングしていました。時には、この `<ContactCard>` のように、配置をより細かく制御する必要がある場合があります。そのような場合には、名前付きスロットを使用することができます。

ContactCard.svelte で、各スロットに name 属性を追加してください。

```html
<article class="contact-card">
	<h2>
		<slot name="name">
			<span class="missing">Unknown name</span>
		</slot>
	</h2>

	<div class="address">
		<slot name="address">
			<span class="missing">Unknown address</span>
		</slot>
	</div>

	<div class="email">
		<slot name="email">
			<span class="missing">Unknown email</span>
		</slot>
	</div>
</article>
```

次に、`<ContactCard>` コンポーネントの中に、対応する slot="..." 属性を持つ要素を追加します。

```html
<ContactCard>
	<span slot="name">
		P. Sherman
	</span>

	<span slot="address">
		42 Wallaby Way<br>
		Sydney
	</span>
</ContactCard>
```


### スロットの内容を確認する

場合によっては、親があるスロットのコンテンツを渡したかどうかで、コンポーネントの一部を制御したいことがあります。例えば、そのスロットの周囲にラッパーがあり、スロットが空の場合はそれをレンダリングしないようにしたい場合です。あるいは、スロットが存在する場合にのみクラスを適用したい場合もあるでしょう。これは、特別な変数$$slotsのプロパティをチェックすることによって行うことができます。

slotsは、親コンポーネントから渡されたスロットの名前をキーとするオブジェクトです。親コンポーネントがスロットを空にすると、$$slotsにはそのスロットの項目がありません。

この例では、`<Project>`のインスタンスは両方ともコメント用のコンテナと通知ドットをレンダリングしていますが、コメントを持っているのは片方だけであることに注意してください。親である`<App>`がコメントスロットにコンテンツを渡したときだけ、これらの要素を表示するように$$slotを使用したいのです。

Project.svelte で、`<article>` の class:has-discussion ディレクティブを更新してください。

```html
<article class:has-discussion={$$slots.comments}>
```

次に、コメントスロットとそれを包む `<div>` を、$$slot をチェックする if ブロックで囲みます。

```html
{#if $$slots.comments}
	<div class="discussion">
		<h3>Comments</h3>
		<slot name="comments"></slot>
	</div>
{/if}
```

これで、`<App>` がコメントスロットを空にしたときに、コメントコンテナと通知ドットがレンダリングされないようになりました。


### スロットのプロップ

このアプリでは、マウスが現在その上にあるかどうかを追跡する `<Hoverable>` コンポーネントを使用しています。そのデータを親コンポーネントに戻して、スロットされたコンテンツを更新できるようにする必要があります。

このために、スロットプロップスを使用します。Hoverable.svelteで、ホバリング値をスロットに渡します。

```html
<div on:mouseenter={enter} on:mouseleave={leave}>
	<slot hovering={hovering}></slot>
</div>
```

また、{hovering}という略記も使えることを忘れないでください。

次に、`<Hoverable>` コンポーネントのコンテンツにホバリングを適用するために、let ディレクティブを使用します。

```html
<Hoverable let:hovering={hovering}>
	<div class:active={hovering}>
		{#if hovering}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

必要であれば、変数の名前を変更することができます。親コンポーネントでは、activeと呼ぶことにしましょう。

```html
<Hoverable let:hovering={active}>
	<div class:active>
		{#if active}
			<p>I am being hovered upon.</p>
		{:else}
			<p>Hover over me!</p>
		{/if}
	</div>
</Hoverable>
```

これらのコンポーネントはいくつでも持つことができ、スロットプロップはそれらが宣言されたコンポーネントにローカルに残ります。

名前付きスロットはプロップを持つこともできます。コンポーネントそのものではなく、slot="... "属性を持つ要素にletディレクティブを使用してください。



## Context API

### setContext and getContext

コンテキストAPIは、データや関数をpropとして渡したり、多くのイベントをディスパッチすることなく、コンポーネント同士が「会話」するための仕組みを提供する。これは高度な機能だが、便利な機能だ。

MapboxのGLマップを使用したアプリの例を見てみましょう。マーカーを表示するには `<MapMarker>` コンポーネントを使用しますが、各コンポーネントのプロップとして基盤となる Mapbox インスタンスへの参照を渡さなくてもよいようにします。

コンテキスト API には setContext と getContext という 2 つの部分がある。あるコンポーネントが setContext(key, context) を呼び出すと、子コンポーネントは const context = getContext(key) でコンテキストを取得することができる。

まず、コンテキストを設定しよう。Map.svelteでsvelteからimport setContext、mapbox.jsからkeyを取得し、setContextを呼び出す。

```js
import { onDestroy, setContext } from 'svelte';
import { mapbox, key } from './mapbox.js';

setContext(key, {
	getMap: () => map
});
```

コンテキストオブジェクトは、任意のものを指定することができます。ライフサイクル関数と同様に、 setContext と getContext はコンポーネントの初期化時にコールする必要があります。その後に呼び出すと、例えば onMount の内部で呼び出すと、エラーが発生します。この例では、map はコンポーネントがマウントされるまで作成されないので、コンテキストオブジェクトには map 自体ではなく、getMap 関数が含まれています。

一方、MapMarker.svelteでは、Mapboxインスタンスへの参照を取得できるようになった。

```js
import { getContext } from 'svelte';
import { mapbox, key } from './mapbox.js';

const { getMap } = getContext(key);
const map = getMap();
```

マーカーは地図に自分で追加できるようになりました。

より完成度の高い <MapMarker> のバージョンでは、削除やプロップの変更も扱えますが、ここでは文脈を示すだけです。

#### コンテキストキー

mapbox.jsの中に、このような行があります。

```js
const key = Symbol();
```

技術的には、どんな値でもキーとして使用できます。たとえば、setContext('mapbox', ...)とすることができます。 一方、シンボルを使用すると、シンボルは本質的に一意な識別子であるため、多くのコンポーネント層で複数の異なるコンテキストが動作している場合でも、いかなる状況でもキーが衝突しないことが保証されることになる。

#### Contexts vs. stores

コンテキストとストアは似ているように見えます。違いは、ストアはアプリのどの部分でも利用できるのに対し、コンテキストはコンポーネントとその子孫だけが利用できることです。これは、あるコンポーネントの状態が他のコンポーネントの状態に干渉することなく、複数のインスタンスを使用したい場合に便利です。

実際、この二つを一緒に使うこともあります。コンテキストは反応的なものではないので、時間の経過とともに変化する値はストアとして表現されるべきです。

```js
const { these, are, stores } = getContext(...);
```



## Special elements

### `<svelte:self>`

Svelteは様々な組み込み要素を提供しています。最初の `<svelte:self>` は、コンポーネントが自分自身を再帰的に含むことができるようにします。

これは、フォルダのツリー表示のように、フォルダが他のフォルダを含むことができるような場合に便利です。Folder.svelteでは、次のようなことができるようにしたいと思います。

```html
{#if file.files}
	<Folder {...file}/>
{:else}
	<File {...file}/>
{/if}
```

...しかし、それは不可能です。なぜなら、モジュールは自分自身をインポートできないからです。代わりに、`<svelte:self>` を使用します。

```html
{#if file.files}
	<svelte:self {...file}/>
{:else}
	<File {...file}/>
{/if}
```


### `<svelte:component>`

コンポーネントは `<svelte:component>` でカテゴリを完全に変更することができます。一連のifブロックの代わりに...

```html
{#if selected.color === 'red'}
	<RedThing/>
{:else if selected.color === 'green'}
	<GreenThing/>
{:else if selected.color === 'blue'}
	<BlueThing/>
{/if}
```

...1つのダイナミックコンポーネントを持つことができます。

```html
<svelte:component this={selected.component}/>
```

この値は、任意のコンポーネントコンストラクタ、またはfalsy値で、falsyの場合はコンポーネントがレンダリングされません。


### `<svelte:element>`

どのようなDOM要素をレンダリングすればよいのか、事前にわからないことがあります。このような場合には、 `<svelte:element>` が役に立ちます。一連の if ブロックの代わりに...

```html
{#if selected === 'h1'}
	<h1>I'm a h1 tag</h1>
{:else if selected === 'h3'}
	<h3>I'm a h3 tag</h3>
{:else if selected === 'p'}
	<p>I'm a p tag</p>
{/if}
```

...1つのダイナミックコンポーネントを持つことができます。

```html
<svelte:element this={selected}>I'm a {selected} tag</svelte:element>
```

この値は任意の文字列、またはfalsy値で、falsyの場合は要素がレンダリングされない。


### `<svelte:window>`

任意のDOM要素にイベントリスナーを追加できるのと同様に、`<svelte:window>`でwindowオブジェクトにイベントリスナーを追加することができます。

11行目で、キーダウンのリスナーを追加します。

```html
<svelte:window on:keydown={handleKeydown}/>
```

DOM要素と同様に、preventDefaultのようなイベントモディファイアを追加することができます。


### `<scelte:window>` bindings

また、scrollYなど、windowの特定のプロパティにバインドすることも可能です。7行目を更新。

```html
<svelte:window bind:scrollY={y}/>
```

バインド可能なプロパティの一覧は以下の通りです。

- innerWidth
- innerHeight
- outerWidth
- outerHeight
- scrollX
- scrollY
- online — window.navigator.onLine のエイリアス。

scrollX と scrollY 以外は readonly である。


### `<svelte:body>`

`<svelte:window>` と同様に、 `<svelte:body>` 要素は document.body 上で発生するイベントをリスニングすることができます。これは、window 上で発生しない mouseenter と mouseleave イベントで便利です。

mouseenterとmouseleaveのハンドラを`<svelte:body>`タグに追加してください。

```html
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
/>
```


### `<svelte:head>`

`<svelte:head>` 要素を使うと、ドキュメントの `<head>` 内に要素を挿入することができます。

```html
<svelte:head>
	<link rel="stylesheet" href="/tutorial/dark-theme.css">
</svelte:head>
```

サーバーサイドレンダリング（SSR）モードでは、`<svelte:head>`のコンテンツは、残りのHTMLとは別に返されます。


### `<svelte:options>`

<<svelte:options>` 要素は、コンパイラのオプションを指定するためのものです。

ここでは、例としてimmutableオプションを使用します。このアプリでは、`<Todo>` コンポーネントが新しいデータを受信するたびに点滅します。項目の一つをクリックすると、更新された todos 配列が作成され、その done 状態が切り替わります。これにより、他の `<Todo>` アイテムが点滅しますが、結局 DOM には何も変更が加えられていません。

これを最適化するには、`<Todo>` コンポーネントに immutable データを期待するように指示します。つまり、todo の prop を変更しないことを約束し、その代わりに状況が変わるたびに新しい todo オブジェクトを作成します。

これを Todo.svelte ファイルの先頭に追加してください。

```html
<svelte:options immutable={true}/>
```

お好みで `<svelte:options immutable/>` と短縮することも可能です。

これで、Todoをクリックで切り替えると、更新されたコンポーネントだけが点滅するようになりました。

ここで設定できるオプションは以下の通りです。

- immutable={true} — 変更可能なデータを使用しないので、コンパイラは値が変更されたかどうかを判断するために簡単な参照整合性チェックを行うことができます。
- immutable={false} — デフォルト。Svelteはミュータブルオブジェクトが変更されたかどうかに関して、より保守的になります
- accessors={true} — コンポーネントのプロップス用のゲッターとセッターを追加します。
- accessors={false} — デフォルト
- namespace="..." — このコンポーネントが使用される名前空間、通常は "svg" です。
- tag="..." — このコンポーネントをカスタム要素としてコンパイルする際に使用する名前。

これらのオプションの詳細については、APIリファレンスを参照してください。


### `<svelte:fragment>`

`<svelte:fragment>` 要素を使用すると、コンテナDOM要素でラップすることなく、指定したスロットにコンテンツを配置することができます。これにより、ドキュメントのフローレイアウトが損なわれることはありません。

この例では、ボックスに1emのギャップを持つフレックスレイアウトを適用していることに注目してください。

```html
<!-- Box.svelte -->
<div class="box">
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<style>
	.box {		
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
```

しかし、フッターのコンテンツは、divで囲むことで新たなフローレイアウトが生まれ、このリズムに沿った間隔にならない。

これを解決するには、Appコンポーネントの`<div slot="footer">`を変更します。`<div>` を `<svelte:fragment>` に置き換えてください。

```html
<svelte:fragment slot="footer">
	<p>All rights reserved.</p>
	<p>Copyright (c) 2019 Svelte Industries</p>
</svelte:fragment>
```


## モジュールコンテキスト

### 共有コード

これまで見てきたすべての例では、`<script>` ブロックには、各コンポーネントのインスタンスが初期化されるときに実行されるコードが含まれています。大半のコンポーネントでは、これだけで十分です。

ごくたまに、個々のコンポーネントインスタンスの外側でコードを実行する必要がある場合があります。例えば、5つのオーディオプレーヤーを同時に再生することができます。1つを再生すると他のすべてのプレーヤーが停止するような場合です。

これを行うには、`<script context="module">` ブロックを宣言します。その中に含まれるコードは、コンポーネントがインスタンス化されたときではなく、モジュールが最初に評価されたときに、一度だけ実行されます。これをAudioPlayer.svelteの一番上に置きます。

```html
<script context="module">
	let current;
</script>
```

これで、状態管理なしにコンポーネント同士が「会話」できるようになりました。

```js
function stopOthers() {
	if (current && current !== audio) current.pause();
	current = audio;
}
```

### Exports

context="module" のスクリプトブロックからエクスポートされたものは、そのモジュール自体からエクスポートされたものになります。もし、AudioPlayer.svelte...からstopAll関数をエクスポートしたら...

```html
<script context="module">
	const elements = new Set();

	export function stopAll() {
		elements.forEach(element => {
			element.pause();
		});
	}
</script>
```

...それをApp.svelteでインポートすることができます...

```html
<script>
	import AudioPlayer, { stopAll } from './AudioPlayer.svelte';
</script>
```

...そして、それをイベントハンドラで使用します。

```html
<button on:click={stopAll}>
	stop all audio
</button>
```

コンポーネントはデフォルトのエクスポートであるため、デフォルトのエクスポートを持つことはできません。



## デバッギング

### @debug タグ

時には、アプリの中を流れるデータの一部を検査することが有効な場合があります。

マークアップの中でconsole.log(...)を使用するのも一つの方法です。しかし、実行を一時停止したい場合は、{@debug ...}タグに、検査したい値をカンマで区切って指定します。

```html
{@debug user}

<h1>Hello {user.firstname}!</h1>
```

ここでdevtoolsを開いて`<input>`要素とのやりとりを始めると、userの値が変化したときにデバッガが起動することになります。



## 次のステップ

### おめでとうございます

これでSvelteのチュートリアルは終了し、アプリを作り始める準備ができました。各章はいつでも参照できますし（上のタイトルをクリックするとドロップダウンが表示されます）、APIリファレンス、サンプル、ブログで学習を継続することも可能です。Twitterユーザーであれば、@sveltejs経由で最新情報を得ることができます。

ローカル開発環境でのセットアップには、クイックスタートガイドをご覧ください。

ルーティング、サーバーサイドレンダリングなど、より拡張性の高いフレームワークをお探しの場合は、SvelteKitをご覧ください。

最も重要なことは、あなたがSvelteコミュニティの一員になったのですから、私たちのフレンドリーなDiscordチャットルームに参加することです。そこで、仲間のSvelteユーザを見つけることができますし、フレームワークの将来を計画する場所でもあります。