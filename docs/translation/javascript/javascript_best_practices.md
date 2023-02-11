# （W3C Wiki）JavaScriptベストプラクティス（日本語訳）

[原文](https://www.w3.org/wiki/JavaScript_best_practices)

## はじめに

ベストプラクティスの記事を書くのは、かなり厄介な仕事です。多くの人にとって、これから読もうとしていることはとても明白で、ただ単に賢明なことであるように見えるでしょう。

しかし、何年もウェブを見て回り、他の開発者からコードを渡された経験から、ウェブ上の生きたコードでは常識は実際にはかなり稀で、プロジェクトの途中で締め切りが迫ってくると、「常識的で論理的にすべきこと」は優先順位リストのかなり下の方に追いやられてしまうことを知りました。

そこで私は、この記事を作成することで、それを簡単にすることにしました。これは、私が長年にわたって蓄積してきたベストプラクティスと良いアドバイスをまとめたもので、その多くは苦労して学んだものです（実験とその類）。以下のアドバイスを心に刻み、頭の片隅に置いておくと、何も考えずに適用できるようになります。読んだことに疑問を持ち、より良い解決策を見つけるために努力することは、良いことです。しかし、私はこの原則に従うことで、より効果的な開発者になり、他の開発者が私の仕事をより簡単にベースとすることができるようになったことを実感しています。

## 物事を名前で呼ぶ - 簡単で短く、読みやすい変数名と関数名

これは当たり前のことですが、JavaScriptではx1、fe2、xbqneといった変数や、逆にincrementorForMainLoopWhichSpansFromTenToTwenty、createNewMemberIfAgeOverTwentyOneAndMoonIsFullといった変数名をよく目にするのは怖いことですね。

良い変数名や関数名は、理解しやすく、何が起こっているのかを教えてくれるものであるべきで、それ以上でも以下でもありません。良い変数名や関数名は、何が起こっているのかをわかりやすく伝えるものであるべきで、それ以上でも以下でもないのです。isLegalDrinkingAge()という関数は、isOverEighteen()よりも意味があります。なぜなら、飲酒の法定年齢は国によって異なり、年齢によって制限される飲酒以外のことも考慮しなければならないからです。

ハンガリー記法は、採用するのに適した変数命名法です（他にも検討すべき命名法があります）。その利点は、何かが何であるかだけではなく、何が想定されているかがわかるということです。

例えば、familyNameという変数があり、それが文字列であると仮定した場合、「ハンガリー語」でsFamilyNameと書きます。memberというオブジェクトはoMemberとなり、isLegalというブール値はbIsLegalとなる。これはある人にとっては非常に有益ですが、他の人にとっては余分なオーバーヘッドに見えるでしょう。

英語にこだわるのもいい考えです。プログラミング言語は英語で書かれているので、これを論理的なステップとして、残りのコードも英語にしてみてはどうでしょう。韓国語やスロベニア語のコードのデバッグに時間を費やした経験から、非ネイティブスピーカーにとってはあまり楽しいことではないと断言できる。

あなたのコードを物語として見てください。一行一行読んで、何が起こっているのか理解できれば上出来です。もし、ロジックの流れについて行くのにスケッチブックが必要なら、あなたのコードには少し工夫が必要です。現実世界と比較したければ、Dostojewskiを読んでみてください。14人のロシア人の名前が出てくるページで迷いましたが、そのうちの4人は仮名でした。そのようなコードを書かないでください。

## グローバルを避ける

グローバル変数や関数名は、信じられないほど悪い考えです。なぜなら、ページに含まれるすべてのJavaScriptファイルは、同じスコープで実行されるからです。もしあなたのコードにグローバル変数や関数がある場合、同じ変数名や関数名を含むスクリプトがあなたのコードより後に含まれていると、あなたの変数や関数が上書きされてしまうからです。

グローバルの使用を避けるには、いくつかの回避策があります。例えば、次のような3つの関数と1つの変数があるとします。

```js
var current = null;
function init(){...}
function change(){...}
function verify(){...}
```

オブジェクトリテラルを使用することで、上書きからそれらを保護することができます。

```js
var myNameSpace = {
  current:null,
  init:function(){...},
  change:function(){...},
  verify:function(){...}
}
```

init()はmyNameSpace.init()、currentはmyNameSpace.currentといった具合に、メインオブジェクトの名前を経由して関数を呼び出したり変数の値を変更する必要があります。init()はmyNameSpace.init()、currentはmyNameSpace.currentなどです。

このような場合、全体を無名関数でラップして、スコープを保護する方が簡単です。また、関数名()から関数名:関数()に構文を切り替える必要もなくなります。このトリックは、モジュールパターンと呼ばれています。

```js
myNameSpace = function(){
  var current = null;
  function init(){...}
  function change(){...}
  function verify(){...}
}();
```

繰り返しになりますが、この方法にも問題がないわけではありません。どれも、もう外部からは全く利用できないのです。もし、公開したいのであれば、公開したいものをreturn文で包む必要がある。

```js
myNameSpace = function(){
  var current = null;
  function verify(){...}
  return{
    init:function(){...}
    change:function(){...}
  }
}();
```

これでは、一方から他方へのリンクと構文の変更という点で、かなり振り出しに戻ることになります。そこで、私は次のような方法を好んで使っています（これを「明解なモジュールパターン」と名付けました）。

```js
myNameSpace = function(){
  var current = null;
  function init(){...}
  function change(){...}
  function verify(){...}
  return{
    init:init,
    change:change
  }
}();
```

プロパティやメソッドを返す代わりに、それらへのポインタを返すだけです。これにより、myNameSpaceの名前を介することなく、他の場所から関数を呼び出したり、変数にアクセスしたりすることが容易になります。

また、内部リンクのために長い、説明的な名前を付けたいが、外部には短い名前を付けたいという場合に、関数のパブリックエイリアスを持つことができるということです。

```js
myNameSpace = function(){
  var current = null;
  function init(){...}
  function change(){...}
  function verify(){...}
  return{
    init:init,
    set:change
  }
}();
```

myNameSpace.set()を呼び出すと、change()メソッドが呼び出されるようになりました。

変数や関数を外部から利用する必要がない場合は、構文全体を別の括弧でくくるだけで、名前を付けずに実行することができます。

(function(){
  var current = null;
  function init(){...}
  function change(){...}
  function verify(){...}
})();

これにより、外部からはアクセスできないが、内部で変数や関数を共有することは非常に容易な、整然とした小さなパッケージにすべてが収められる。

## 厳格なコーディングスタイルにこだわる

ブラウザは、JavaScriptの構文に関して非常に寛容です。しかし、このことが、ブラウザに依存したずさんなコードを書く理由になってはいけません。

あなたのコードの構文の質をチェックする最も簡単な方法は、JSLint を通して実行することです - 構文の警告とその意味について詳細なレポートを提供する JavaScript 検証ツールです。人々は、あなたがコードを保存するときに自動的にlintを行うエディタの拡張機能（例えば、TextMateのJSツール）を書いてきました。

JSLintは、返す結果について少し神経質で、開発者のDouglas Crockfordが言うように、あなたの感情を傷つけることがあります。しかし、TextMate JSバンドルをインストールし、私のコードをJSLintの精査にかけるようになってから、より良いコードを書くことができるようになりました。

クリーンで有効なコードは、修正すべき混乱したバグを減らし、他の開発者に引き継ぎやすく、コードのセキュリティも向上させることができます。コードを動作させるためにハックに頼っていると、同じハックを利用したセキュリティエクスプロイトが存在する可能性があります。さらに、ブラウザのハッキングが修正されると、あなたのコードは次のバージョンのブラウザでは動作しなくなります。

有効なコードとは、スクリプトで他の形式に変換できることも意味します。ハッキングされたコードでは、人間が変換する必要があります。

## 必要な分だけコメントし、それ以上にはしない

コメントは、他の開発者（そして、数ヶ月後に他の作業をした後で自分のコードに戻った場合、自分自身）に対するメッセージです。コメントを使用するかどうかについては、長年にわたって多くの議論が交わされてきました。主な論点は、良いコードは自分自身を説明するべきだというものです。

私がこの議論の欠点と考えるのは、説明というのは非常に主観的なものであるということです。すべての開発者が、あるコードが何をしているのかを全く同じ説明から理解することは期待できません。

コメントは、あなたが正しく行えば、誰も傷つけることはありません。この記事の最後のポイントに戻りますが、もしあなたのコメントがエンドユーザーの目に触れるコードになるのであれば、何かがうまくいっていないのだとしましょう。

繰り返しになりますが、コツは「節度」です。コメントする場合は、/* */という記法を使いましょう。一行のコメントで//を使用すると、コメントを削除せずにコードをミニマイズする場合に問題が発生する可能性があり、一般的に汎用性が低くなります。

もし、コードの一部をコメントアウトして、後で使ったり、デバッグしたりする場合は、とても便利なトリックがあります。

```js
module = function(){
  var current = null;
  function init(){
  };
/*
  function show(){
    current = 1;
  };
  function hide(){
    show();
  };
*/
  return{init:init,show:show,current:current}
}();
```

閉じた星形のスラッシュの前に2つのスラッシュを付けると、ブロック全体のコメントやアンコメントができるように設定されます。

```js
module = function(){
  var current = null;
  function init(){
  };
/*
  function show(){
    current = 1;
  };
  function hide(){
    show();
  };
// */
  return{init:init,show:show,current:current}
}();
```

上のブロックのようにコードを設定した場合、冒頭のスラッシュスターの前にスラッシュを追加すると、複数行のコメントが2つの1行コメントに変わり、その間のコードが「非表示」になって実行されるようになります。スラッシュを取り除くと、再びコメントアウトされます。

大規模なアプリケーションでは、JavaDocスタイルのコメント文書は非常に理にかなっています。コードを書くことによって、製品の全体的な文書に種をまいているのです。Yahoo User Interfaceライブラリの成功は、一部これに起因していますし、あなたの製品に同じドキュメントを構築するために使用できるツールもあります。JavaDocについては、念のためここで触れておきます。


## 他の技術との混合を避ける

JavaScriptとDOMを使えば、ドキュメントに必要なものをすべて作ることは可能ですが、それは必ずしも最も効果的な方法とは言えません。次のコードは、入力フィールドのクラスが「必須」で何も入力されていないとき、すべての入力フィールドを赤枠で囲んでいます。

```js
var f = document.getElementById('mainform');
var inputs = f.getElementsByTagName('input');
for(var i=0,j=inputs.length;i<j;i++){
  if(inputs[i].className === 'mandatory' &&
     inputs[i].value === ''){
    inputs[i].style.borderColor = '#f00';
    inputs[i].style.borderStyle = 'solid';
    inputs[i].style.borderWidth = '1px';
  }
}
```

しかし、この方法では、後でスタイルを変更する必要がある場合、JavaScriptを使用して、その変更を適用する必要があることを意味します。変更が複雑であればあるほど、これを編集するのは難しくなります。さらに、すべてのJavaScript開発者がCSSに精通していたり、興味を持っているわけではないので、結果が出るまで何度も行き来することになる。エラー時に「error」というクラスを要素に追加することで、スタイリング情報をCSSの内部に保持させることができ、より適切な表現が可能になる。

```js
var f = document.getElementById('mainform');
var inputs = f.getElementsByTagName('input');
for(var i=0,j=inputs.length;i<j;i++){
  if(inputs[i].className === 'mandatory' &&
     inputs[i].value === ''){
    inputs[i].className += ' error';
  }
}
```

これは、CSSがドキュメントを通してカスケードすることを意図しているため、より効率的です。例えば、ある文書で特定のクラスを持つすべての DIV を非表示にしたいとします。すべての DIV をループして、そのクラスをチェックし、スタイルコレクションを変更することができます。新しいブラウザでは、CSSセレクタエンジンを使用して、スタイルコレクションを変更することができます。しかし、最も簡単な方法は、JavaScript を使用して親要素にクラスを設定し、CSS で element.triggerclass div.selectorclass{} のようなシンタックスを使用することです。実際にDIVを隠す作業は、CSSデザイナーに任せてください。

## ショートカット表記は意味がある場合に使用する

ショートカット表記は厄介なテーマです。一方ではコードを小さく保つことができますが、他方ではショートカットに気づかない開発者が出てきて、あなたの後を引き継ぐのが難しくなるかもしれません。ここでは、できること（そしてすべきこと）の小さなリストを紹介します。

オブジェクトは、おそらくJavaScriptの中で最も汎用性の高いものです。古くからある書き方としては、次のようなものがあります。

```js
var cow = new Object();
cow.colour = 'brown';
cow.commonQuestion = 'What now?';
cow.moo = function(){
  console.log('moo');
}
cow.feet = 4;
cow.accordingToLarson = 'will take over the world';
```

しかし、これでは、プロパティやメソッドごとにオブジェクト名を繰り返すことになり、煩わしさを感じるかもしれません。その代わりに、以下のような構成にする方がずっと理にかなっています。オブジェクト・リテラルとも呼ばれます。

```js
var cow = {
  colour:'brown',
  commonQuestion:'What now?',
  moo:function(){
    console.log('moo);
  },
  feet:4,
  accordingToLarson:'will take over the world'
};
```

JavaScriptでは配列が混乱の元となります。多くのスクリプトで、以下のようにArrayを定義しているのを見かけると思います。

```js
var awesomeBands = new Array();
awesomeBands[0] = 'Bad Religion';
awesomeBands[1] = 'Dropkick Murphys';
awesomeBands[2] = 'Flogging Molly';
awesomeBands[3] = 'Red Hot Chili Peppers';
awesomeBands[4] = 'Pornophonique';
```

これは無駄な繰り返しが多いので、[ ]配列のショートカットを使えば、もっと早く書けます。

```js
var awesomeBands = [
  'Bad Religion',
  'Dropkick Murphys',
  'Flogging Molly',
  'Red Hot Chili Peppers',
  'Pornophonique'
];
```

チュートリアルの中で「連想配列」という言葉を目にすることがあると思います。これは誤用で、インデックスではなく名前の付いたプロパティを持つ配列は実際にはオブジェクトであり、そのように定義されるべきものです。

条件は「三項記法」を使って短縮することができます。例えば、次の構文は、ある変数が他の変数の値によって1または-1となることを定義しています。

```js
var direction;
if(x > 100){
  direction = 1;
} else {
  direction = -1;
}
```

これを1行に短縮することができます。

```js
var direction = (x > 100) ? 1 : -1;
```

クエスチョンマークの前が条件、その直後の値が真の場合、コロンの後が偽の場合である。3項表記は入れ子にすることもできるが、可読性を保つためにそれは避けたい。

もうひとつ、JavaScriptでよくあるのは、変数が定義されていない場合にあらかじめ値を与えておくことで、次のような使い方がある。

```js
if(v){
  var x = v;
} else {
  var x = 10;
}
```

そのショートカット表記がダブルパイプキャラクターです。

```js
var x = v || 10;
```

これは、vが定義されていない場合、xに自動的に10という値を与えるもので、とても簡単です。

## モジュール化 - 1つのタスクに1つの機能

これは一般的なプログラミングのベストプラクティスです。一度に一つの仕事をこなす関数を作ることで、他の開発者がデバッグやコードの変更をしやすくなり、どのコードブロックがどの関数を実行しているかを調べる必要がなくなります。

これは、一般的なタスクのためのヘルパー関数を作成する場合にも当てはまります。同じことを複数の関数で行う場合は、汎用的なヘルパー関数を作成し、その機能を必要な場所で再利用するのがよいでしょう。

また、関数の中でコードを分岐させるよりも、一方から入って一方から出るほうが理にかなっています。例えば、新しいリンクを作成するためのヘルパー関数を書きたいとします。このようにすることができます。

```js
function addLink(text,url,parentElement){
  var newLink = document.createElement('a');
  newLink.setAttribute('href',url);
  newLink.appendChild(document.createTextNode(text));
  parentElement.appendChild(newLink);
}
```

これは問題なく動作しますが、リンクを適用する要素によって異なる属性を追加する必要があることに気づくかもしれません。例えば

```js
function addLink(text,url,parentElement){
  var newLink = document.createElement('a');
  newLink.setAttribute('href',url);
  newLink.appendChild(document.createTextNode(text));
  if(parentElement.id === 'menu'){
    newLink.className = 'menu-item';
  }
  if(url.indexOf('mailto:')!==-1){
    newLink.className = 'mail';
  }
  parentElement.appendChild(newLink);
}
```

これでは、関数がより特殊になり、さまざまな状況に適用することが難しくなります。よりすっきりした方法は、リンクを返し、余分なケースはそれを必要とするメイン関数でカバーすることです。これにより、addLink() はより一般的な createLink() となります。

```js
function createLink(text,url){
  var newLink = document.createElement('a');
  newLink.setAttribute('href',url);
  newLink.appendChild(document.createTextNode(text));
  return newLink;
}

function createMenu(){
  var menu = document.getElementById('menu');
  var items = [
    {t:'Home',u:'index.html'},
    {t:'Sales',u:'sales.html'},
    {t:'Contact',u:'contact.html'}
  ];
  for(var i=0;i<items.length;i++){
    var item = createLink(items.t,items.u);
    item.className = 'menu-item';
    menu.appendChild(item);
  }
}
```

すべての関数がひとつのタスクだけを実行するようにすれば、 アプリケーションの構造をすべて含むメインの init() 関数を作成することができます。そうすれば、ドキュメントの残りの部分をスキャンして依存関係を調べることなく、簡単にアプリケーションを変更したり機能を削除したりすることができます。

## 段階的に強化する

開発手法としてのプログレッシブエンハンスメントについては、Graceful Degradation vs. Progressive Enhancementで詳しく解説しています。要するに、利用可能な技術に関係なく動作するコードを書くということです。JavaScriptの場合、スクリプトが使えないときでも（たとえばBlackBerryの場合、あるいは過剰なセキュリティポリシーのため）、Web製品はユーザーがあるゴールに到達できるようにすべきであり、ユーザーがオンにできない、あるいはしたくないJavaScriptがないことを理由にブロックしてはいけない、ということを意味します。

JavaScriptを使わなくても簡単に解決できる問題に対して、膨大に複雑なJavaScriptのソリューションを構築してしまうことは、驚くほど多いのです。私が遭遇した一例は、ウェブ、画像、ニュースなど、さまざまなデータを検索できるページ上の検索ボックスでした。

オリジナルのバージョンでは、異なるデータのオプションは、検索を実行するバックエンドの異なるスクリプトを指すように、フォームのアクション属性を書き換えるリンクになっていました。

問題は、JavaScriptをオフにした場合、リンクは表示されますが、フォームのアクションが変更されないため、すべての検索が標準的なウェブ結果を返すということでした。解決策はとてもシンプルで、リンクの代わりにラジオボタンのグループとして選択肢を用意し、バックエンドのスクリプトを使って異なる専門的な検索スクリプトにフォーカスを当てました。

これにより、検索が正しく行われるようになっただけでなく、何人のユーザーがどのオプションを選択したかを簡単に追跡できるようになりました。正しいHTML構造を用いることで、フォームアクションを切り替えるためのJavaScriptとクリックトラッキングのスクリプトの両方を取り除くことができ、環境に関係なく、すべてのユーザーが使えるようになりました。

コンフィギュレーションと翻訳を可能にする

コードの保守性とクリーンさを維持するための最も成功したヒントの1つは、時間の経過とともに変更される可能性があるすべてのものを含む設定オブジェクトを作成することです。このオブジェクトには、作成した要素で使用するテキスト（ボタンの値や画像の代替テキストなど）、CSSのクラス名とID、作成したインターフェースの一般的なパラメータが含まれます。

例えば、簡単な YouTube プレイヤーは以下のような設定オブジェクトを持っています。

```js
/*
  This is the configuration of the player. Most likely you will
  never have to change anything here, but it is good to be able 
  to, isn't it? 
*/
config = {
  CSS:{
    /* 
      IDs used in the document. The script will get access to 
      the different elements of the player with these IDs, so 
      if you change them in the HTML below, make sure to also 
      change the name here!
    */
    IDs:{
      container:'eytp-maincontainer',
      canvas:'eytp-playercanvas',
      player:'eytp-player',
      controls:'eytp-controls',

      volumeField:'eytp-volume',
      volumeBar:'eytp-volumebar',

      playerForm:'eytp-playerform',
      urlField:'eytp-url',

      sizeControl:'eytp-sizecontrol',

      searchField:'eytp-searchfield',
      searchForm:'eytp-search',
      searchOutput:'eytp-searchoutput'
      /* 
        Notice there should never be a comma after the last 
        entry in the list as otherwise MSIE will throw  a fit!
      */
    },
    /*
      These are the names of the CSS classes, the player adds
      dynamically to the volume bar in certain 
      situations.
    */
    classes:{
      maxvolume:'maxed',
      disabled:'disabled'
      /* 
        Notice there should never be a comma after the last 
        entry in the list as otherwise MSIE will throw  a fit!
      */
    }
  },
  /* 
    That is the end of the CSS definitions, from here on 
    you can change settings of the player itself. 
  */
  application:{
    /*
      The YouTube API base URL. This changed during development of this,
      so I thought it useful to make it a parameter.
    */
    youtubeAPI:'http://gdata.youtube.com/apiplayer/cl.swf',
    /* 
      The YouTube Developer key,
      please replace this with your own when you host the player!!!!!
    */
    devkey:'AI39si7d...Y9fu_cQ',
    /*
      The volume increase/decrease in percent and the volume message 
      shown in a hidden form field (for screen readers). The $x in the 
      message will be replaced with the real value.
    */
    volumeChange:10,
    volumeMessage:'volume $x percent',
    /*
      Amount of search results and the error message should there 
      be no results.
    */
    searchResults:6,
    loadingMessage:'Searching, please wait',
    noVideosFoundMessage:'No videos found : (',
    /*
      Amount of seconds to repeat when the user hits the rewind 
      button.
    */
    secondsToRepeat:10,
    /*
      Movie dimensions.
    */
    movieWidth:400,
    movieHeight:300
    /* 
      Notice there should never be a comma after the last 
      entry in the list as otherwise MSIE will throw  a fit!
    */
  }  
}
```

これをモジュールパターンの一部として公開すれば、実装者がモジュールを初期化する前に必要なものだけをオーバーライドすることも可能になります。

コードのメンテナンスをシンプルに保つことが最も重要で、将来のメンテナンス担当者があなたのコードをすべて読み、どこを変更する必要があるかを探す必要をなくします。もしそれが明白でなければ、あなたのソリューションは完全に捨て去られるか、ハッキングされるかのどちらかでしょう。ハックされたソリューションは、アップグレードが必要になったときにパッチを当てることができず、コードの再利用ができなくなります。

## 重いネストを避ける

コードを入れ子にすることで、そのロジックが説明され、読みやすくなります。しかし、入れ子にしすぎると、何をしようとしているのかが分からなくなることもあります。コードの読者が水平方向にスクロールする必要はありませんし、コードエディターが長い行を折り返したときに混乱することもありません（この場合、せっかくのインデントが無意味になります）。

ネストのもう一つの問題は、変数名とループである。通常、最初のループはiをイテレータ変数として開始するので、j,k,lと続けていくことになります。これでは、すぐに面倒なことになってしまいます。

```js
function renderProfiles(o){
  var out = document.getElementById(‘profiles’);
  for(var i=0;i<o.members.length;i++){
    var ul = document.createElement(‘ul’);
    var li = document.createElement(‘li’);
    li.appendChild(document.createTextNode(o.members[i].name));
    var nestedul = document.createElement(‘ul’);
    for(var j=0;j<o.members[i].data.length;j++){
      var datali = document.createElement(‘li’);
      datali.appendChild(
        document.createTextNode(
          o.members[i].data[j].label + ‘ ‘ +
          o.members[i].data[j].value
        )
      );
      nestedul.appendChild(datali);
    }
    li.appendChild(nestedul);
  } 
  out.appendChild(ul);
}
```

ここでは、一般的な（本当に使い捨ての）変数名ulとliを使っているので、ネストされたリスト項目にはnestedulとdataliが必要です。リストのネストがさらに深くなれば、さらに多くの変数名が必要になり、その繰り返しとなります。各メンバーのネストされたリストを作成する作業を独自の関数に置き、これを適切なデータで呼び出す方がより理にかなっています。これによって、ループの中にループができるのを防ぐこともできます。addMemberData()関数はかなり汎用的で、別の機会に便利になる可能性が非常に高いです。これらの考えを踏まえて、私なら以下のようにコードを書き換えます。

```js
function renderProfiles(o){
  var out = document.getElementById(‘profiles’);
  for(var i=0;i<o.members.length;i++){
    var ul = document.createElement(‘ul’);
    var li = document.createElement(‘li’);
    li.appendChild(document.createTextNode(data.members[i].name));
    li.appendChild(addMemberData(o.members[i]));
  } 
  out.appendChild(ul);
}
function addMemberData(member){
  var ul = document.createElement(‘ul’);
  for(var i=0;i<member.data.length;i++){
    var li = document.createElement(‘li’);
    li.appendChild(
      document.createTextNode(
        member.data[i].label + ‘ ‘ +
        member.data[i].value
      )
    );
  }
  ul.appendChild(li);
  return ul;
}
```

## ループの最適化

ループは正しくやらないと非常に遅くなることがあります。よくある間違いは、反復のたびに配列の長さ属性を読み込むことです。

```js
var names = ['George','Ringo','Paul','John'];
for(var i=0;i<names.length;i++){
  doSomeThingWith(names[i]);
}
```

つまり、ループが実行されるたびに、JavaScriptは配列の長さを読み取る必要があるのです。長さの値を別の変数に格納することで、それを回避することができます。

```js
var names = ['George','Ringo','Paul','John'];
var all = names.length;
for(var i=0;i<all;i++){
  doSomeThingWith(names[i]);
}
```

これを実現するさらに短い方法は、ループ前のステートメントで2つ目の変数を作成することです。


```js
var names = ['George','Ringo','Paul','John'];
for(var i=0,j=names.length;i<j;i++){
  doSomeThingWith(names[i]);
}
```

もうひとつ、計算の多いコードはループの外に置くようにしましょう。これには正規表現や、さらに重要なこととして DOM 操作が含まれます。ループの中でDOMノードを作成することはできますが、ドキュメントに挿入することは避けてください。DOMのベストプラクティスについては、次のセクションで詳しく説明します。

## DOMアクセスは最小限にとどめる

ブラウザで DOM にアクセスすることは、コストがかかることです。DOM は非常に複雑な API であり、ブラウザでのレンダリングに多くの時間を取られることがあります。これは、複雑なウェブアプリケーションを実行するときに、コンピュータがすでに他の作業で最大限の負荷がかかっているときに見られます。変更に時間がかかったり、途中で表示されたり、といった具合にです。

コードを高速化し、ブラウザの速度を低下させないようにするには、DOMへのアクセスを最小限に抑えるようにします。常に要素を作成して適用するのではなく、文字列をDOM要素に変換するツール関数を用意し、生成処理の最後にこの関数を呼び出すことで、ブラウザのレンダリングを継続的にではなく、一度に妨害することができます。

## ブラウザの気まぐれに屈しない

特定のブラウザに特化したコードを書くと、コードのメンテナンスが難しくなり、すぐに古くなってしまいます。ウェブを見ていると、特定のブラウザを前提としたスクリプトがたくさんあり、新しいバージョンや別のブラウザが登場するとすぐに動作しなくなります。

これは時間と労力の無駄です。私たちは、1つのブラウザのためではなく、この記事のコースで説明したように、合意された標準に基づいてコードを構築すべきなのです。ウェブはすべての人のためにあるのであって、最先端の設定を持つエリート集団のユーザーのためのものではありません。ブラウザ市場の動きが速くなると、あなたは自分のコードに戻り、それを修正し続けなければならなくなります。これでは、効果も楽しみもありません。

もし、あるブラウザでしか動作しない素晴らしいコードをどうしても使いたいなら、そのコードを独自のスクリプト文書に入れ、ブラウザとバージョンで名前を付けましょう。そうすれば、このブラウザが古くなったときに、この機能を簡単に見つけて削除することができます。

## どんなデータも信用しない

コードとデータのセキュリティについて話すとき、心に留めておくべき主要なポイントの1つは、どんなデータも信用しないことです。これは、システムをハッキングしようとする悪人についてだけでなく、単純な使い勝手から始まるものです。ユーザーは常に不正なデータを入力します。それは、ユーザーが愚かだからではなく、忙しかったり、注意散漫だったり、指示された文言に惑わされたりしているからです。例えば、私はホテルの部屋を6日間ではなく、1ヶ月間予約しました。

要するに、システムに入るすべてのデータがきれいで、必要なものであることを確認することです。これは、URLから取得したパラメータを書き出すバックエンドで最も重要なことである。JavaScriptでは、関数に送られるパラメータの種類をテストすることが非常に重要です（typeofキーワードを使用します）。以下の例は、membersがArrayでない場合、エラーになります（例えば、文字列の場合、文字列の各文字に対応するリスト項目を作成することになります）。

```js
function buildMemberList(members){
  var all = members.length;
  var ul = document.createElement('ul');
  for(var i=0;i<all;i++){
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(members[i].name));
    ul.appendChild(li);
  }
  return ul;
}
```

これを動作させるためには、membersの型を確認し、配列であることを確認する必要があります。

```js
function buildMemberList(members){
  if(typeof members === 'object' && 
     typeof members.slice === 'function'){
    var all = members.length;
    var ul = document.createElement('ul');
    for(var i=0;i<all;i++){
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(members[i].name));
      ul.appendChild(li);
    }
    return ul;
  }
}
```

配列はオブジェクトであることを教えてくれるから厄介だ。配列であることを確認するために、配列だけが持つメソッドの一つを確認します。

また、DOMから情報を読み取って比較せずに使用することも、非常に安全でない行為です。例えば、私は以前、JavaScriptの機能が壊れる原因となるコードをデバッグしなければならなかったことがあります。そのコードは、なぜか私には理解できないのですが、ページ要素の innerHTML からユーザー名を読み取り、そのデータをパラメータとして関数を呼び出していました。ユーザー名にはUTF-8の任意の文字が使用でき、これには引用符やシングルクォートも含まれます。これらは文字列を終了させるので、残りの部分は誤ったデータになってしまいます。さらに、FirebugやOpera DragonFlyなどのツールを使ってHTMLを変更したユーザーは、ユーザー名を任意のものに変更し、このデータを関数に注入することができます。

クライアント側だけでバリデーションを行うフォームも同様です。以前、選択項目を書き換えて別の選択肢を用意し、利用できないメールアドレスにサインアップしたことがあります。バックエンドでフォームがチェックされなかったので、処理は滞りなく行われました。

DOMアクセスについては、到達して変更しようとする要素が本当に利用可能か、期待するものであるかを確認してください。そうでなければ、コードが失敗したり、奇妙なレンダリングバグを引き起こす可能性があります。

## JavaScriptで機能を追加し、コンテンツを作り過ぎないようにする

ここでの他の例でもわかるように、JavaScriptで多くのHTMLを構築することは、かなり大変で薄っぺらなものになります。特に Internet Explorer では、読み込み中のドキュメントを変更したり、innerHTML でコンテンツを操作したりすると、あらゆる種類のトラブルに巻き込まれる可能性があります (不幸と悲惨の物語については、Google で "operation aborted error" を検索してください)。

ページのメンテナンスという点では、HTMLで多くのマークアップを作成することは非常に悪い考えです。なぜなら、すべてのメンテナンス担当者があなたと同じレベルのスキルを持っているとは限らず、あなたのコードを本当に台無しにしてしまう可能性があるからです。

私は、JavaScriptに大きく依存するアプリケーションを構築しなければならないとき、HTMLテンプレートを使用し、このテンプレートをAjaxで読み込む方がはるかに理にかなっていることに気づきました。そうすれば、メンテナンス担当者は、JavaScriptのコードに干渉することなく、HTMLの構造や最も重要なテキストを変更することができます。唯一の難点は、どのIDが必要なのか、また、特定のHTML構成が定義した順序である必要があるのかどうかを伝えることです。インラインのHTMLコメントでそれを行うことができます（そして、テンプレートを読み込むときにコメントを取り除くことができます。例として、Easy YouTube テンプレートのソースを確認してください。

スクリプトでは、正しいHTMLコンテナが利用可能になった時点でテンプレートをロードし、その後setupPlayer()メソッド内のイベントハンドラを適用しています。

```js
var playercontainer = document.getElementById('easyyoutubeplayer');
if(playercontainer){
  ajax('template.html');
}; 

function ajax(url){
  var request;
  try{
    request = new XMLHttpRequest();
  }catch(error){
    try{
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(error){
      return true;
    }
  }
  request.open('get',url,true);
  request.onreadystatechange = function(){
    if(request.readyState == 4){
      if(request.status){ 
        if(request.status === 200 || request.status === 304){
          if(url === 'template.html'){
            setupPlayer(request.responseText);
          }
        }
      }else{
        alert('Error: Could not find template...');
      }
    }
  };
  request.setRequestHeader('If-Modified-Since','Wed, 05 Apr 2006 00:00:00  GMT');
  request.send(null);
};
```

こうすることで、JavaScriptのコードを変更することなく、好きなようにプレーヤーを翻訳し、変更することができるようになるのです。

## 巨人の肩の上に立つ

ここ数年、JavaScriptのライブラリやフレームワークがWeb開発市場を席巻していることは否定できません。そして、それは決して悪いことではありません - 正しく使用されるならば。優れたJavaScriptライブラリの目的はただ一つ、クロスブラウザの不整合に対処し、ブラウザサポートの穴を埋めることで、開発者としてのあなたの生活を楽にすることです。JavaScript ライブラリは、予測可能で機能するベースラインを提供します。

まずはライブラリなしでJavaScriptを学び、何が起こっているのかを本当に理解するのがよいでしょう。ブラウザの問題ではなく、再現可能なバグを利用することで、問題を少なくすることができます。

私の個人的なお気に入りはYahoo User Interface library（YUI）、次いでjQuery、Dojo、Prototypeだが、他にも良いライブラリがたくさんあるので、自分と自分の製品に最も適したものを見つけると良いだろう。

どのライブラリも相性が良いのですが、同じプロジェクトで複数のライブラリを使用するのは良いアイデアではありません。これは、余計な複雑さとメンテナンスのレベルを増やすことになります。

## 開発コードはライブコードではない

最後に、JavaScriptそのものについてではなく、開発戦略の残りの部分にどのように組み込んでいくかという点について述べたいと思います。JavaScriptの変更はWebアプリケーションのパフォーマンスと機能に即座に影響を与えるため、メンテナンスへの影響にかかわらず、コードを可能な限り最適化したくなるものです。

JavaScriptのパフォーマンスを向上させるために適用できる巧妙なトリックはたくさんあります。しかしそのほとんどは、コードの理解や保守を困難にするという欠点があります。

安全で動作するJavaScriptを書くためには、このサイクルを断ち切り、他の開発者ではなくマシンのためにコードを最適化することをやめる必要があります。ほとんどの場合 - 他の言語では非常に一般的なことですが、JavaScript ユーザーの間ではあまり知られていないことです。ビルドスクリプトは、空白やコメントを削除したり、文字列をArrayルックアップに置き換えたり（MSIEが文字列のインスタンスごとに文字列オブジェクトを作成するのを避けるため - 条件付きでも）、JavaScriptをブラウザで動かすために必要な他のすべての小さな微調整を行うことができます。

最初のコードを、他の開発者が理解しやすく、拡張しやすくすることにもっと集中すれば、完璧なビルドスクリプトを作ることができます。早急に最適化し続ければ、そこに到達することはできません。自分自身やブラウザのためにビルドするのではなく、あなたの後を継ぐ次の開発者のためにビルドしましょう。

## 概要

JavaScript の主なトリックは、安易な道を選ばないことです。JavaScript は素晴らしく多機能な言語であり、その実行環境は非常に寛容であるため、一見うまくいっているように見えるずさんなコードを書くのは簡単なことです。しかし、この同じコードが数ヶ月後にあなたを苦しめることになるでしょう。

JavaScriptの開発は、ウェブデベロッパーとして仕事をしたいのであれば、端的な知識エリアから絶対必要なものへと変化しています。もしあなたが今すぐ始めようとしているなら、ラッキーです。私や他の多くの人がすでにほとんどの間違いを犯し、すべての試行錯誤を独学で行っているので、今その知識を伝えることができるのです。

> この資料は以前、Opera Web Standards Curriculumの一部として公開されたもので、42: JavaScript best practicesとして、Christian Heilmannによって書かれたものがあります。オリジナルと同様、Creative Commons Attribution, Non Commercial - Share Alike 2.5 licenseの下で公開されています。