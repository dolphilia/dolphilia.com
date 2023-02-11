# clean-code-javascript

- [原文](https://github.com/ryanmcdermott/clean-code-javascript)
- [日本語訳](https://github.com/mitsuruog/clean-code-javascript/)

## Table of Contents

1. [Introduction](#introduction)
2. [Variables](#variables)
3. [Functions](#functions)
4. [Objects and Data Structures](#objects-and-data-structures)
5. [Classes](#classes)
6. [SOLID](#solid)
7. [Testing](#testing)
8. [Concurrency](#concurrency)
9. [Error Handling](#error-handling)
10. [Formatting](#formatting)
11. [Comments](#comments)
12. [Translation](#translation)

## はじめに

![ソフトウェア品質評価は、コードを読むときにどれだけ多くの罵声を浴びせたかのカウントであるというユーモラスなイメージ。](https://www.osnews.com/images/comics/wtfm.jpg)

Robert C. Martinの著書[_Clean Code_](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)にあるソフトウェア工学の原則を、JavaScript用にアレンジしたものです。これはスタイルガイドではありません。JavaScriptで[読みやすく、再利用可能で、リファクタブル](https://github.com/ryanmcdermott/3rs-of-software-architecture)なソフトウェアを作るためのガイドです。

ここに書かれているすべての原則に厳密に従わなければならないわけではありませんし、普遍的に同意されるものはさらに少ないでしょう。これらはガイドラインであり、それ以上のものではありませんが、 _Clean Code_ の著者たちによる長年の経験をもとに体系化されたものです。

私たちのソフトウェアエンジニアリングの技術は、50年余りの歴史があり、まだ多くのことを学んでいます。ソフトウェアアーキテクチャがアーキテクチャそのものと同じくらい古くなったとき、もしかしたら私たちはより難しいルールに従わなければならないかもしれません。今のところ、これらのガイドラインは、あなたやあなたのチームが作成するJavaScriptコードの品質を評価するための試金石となるようにしましょう。

もうひとつ、これらを知ったからといって、すぐに優れたソフトウェア開発者になれるわけではありませんし、何年もこれと一緒に仕事をすれば、間違いを犯さなくなるというわけでもありません。すべてのコードは、濡れた粘土が最終的な形になっていくように、最初のドラフトとして始まります。最後に、仲間と一緒にレビューするときに不完全な部分を削り取るのです。初稿に改良が必要だからといって、自分を責めないでください。そのかわり、コードに磨きをかけましょう。

## **Variables**

### 意味のある発音しやすい変数名を使用する

**Bad:**

```javascript
const yyyymmdstr = moment().format("YYYY/MM/DD");
```

**Good:**

```javascript
const currentDate = moment().format("YYYY/MM/DD");
```

**[⬆ back to top](#table-of-contents)**

### 同じ種類の変数には、同じ語彙を使用する

**Bad:**

```javascript
getUserInfo();
getClientData();
getCustomerRecord();
```

**Good:**

```javascript
getUser();
```

**[⬆ back to top](#table-of-contents)**

### 検索可能な名称を使用する

私たちは、これから書くコードよりも多くのコードを読むことになるでしょう。私たちが書くコードは、読みやすく、検索しやすいものであることが重要です。プログラムを理解するために重要な変数に名前をつけないことは、読者を傷つけることになります。検索可能な名前にしましょう。[buddy.js](https://github.com/danielstjules/buddy.js) や [ESLint](https://github.com/eslint/eslint/blob/660e0918933e6e7fede26bc675a0763a6b357c94/docs/rules/no-magic-numbers.md) のようなツールは、名前のない定数を特定するのに役立ちます。

**Bad:**

```javascript
// 86400000は一体何のためにあるのでしょうか？
setTimeout(blastOff, 86400000);
```

**Good:**

```javascript
// 大文字の名前付き定数として宣言する。
const MILLISECONDS_PER_DAY = 60 * 60 * 24 * 1000; //86400000;

setTimeout(blastOff, MILLISECONDS_PER_DAY);
```

**[⬆ back to top](#table-of-contents)**

### 説明変数を使用する

**Bad:**

```javascript
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(
  address.match(cityZipCodeRegex)[1],
  address.match(cityZipCodeRegex)[2]
);
```

**Good:**

```javascript
const address = "One Infinite Loop, Cupertino 95014";
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [_, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```

**[⬆ back to top](#table-of-contents)**

### メンタルマッピングを避ける

暗黙の了解より、明示的な方が良い。

**Bad:**

```javascript
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(l => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // Wait, what is `l` for again?
  dispatch(l);
});
```

**Good:**

```javascript
const locations = ["Austin", "New York", "San Francisco"];
locations.forEach(location => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});
```

**[⬆ back to top](#table-of-contents)**

### 不要なコンテキストを追加しない

クラス名/オブジェクト名が何かを物語っている場合、それを変数名で繰り返してはいけません。

**Bad:**

```javascript
const Car = {
  carMake: "Honda",
  carModel: "Accord",
  carColor: "Blue"
};

function paintCar(car, color) {
  car.carColor = color;
}
```

**Good:**

```javascript
const Car = {
  make: "Honda",
  model: "Accord",
  color: "Blue"
};

function paintCar(car, color) {
  car.color = color;
}
```

**[⬆ back to top](#table-of-contents)**

### ショートサーキットやコンディショナルパラメータの代わりにデフォルトパラメータを使用する

デフォルトのパラメータは、短絡的なものよりもきれいなものであることが多いです。もし、それらを使用した場合、あなたの関数は `undefined` の引数に対してのみデフォルト値を提供することに注意してください。その他の `''`, `""`, `false`, `null`, `0`, `NaN` のような "falsy" 値はデフォルト値で置き換えられることはありません。

**Bad:**

```javascript
function createMicrobrewery(name) {
  const breweryName = name || "Hipster Brew Co.";
  // ...
}
```

**Good:**

```javascript
function createMicrobrewery(name = "Hipster Brew Co.") {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

## **Functions**

### 関数の引数（2つ以下が理想）

関数のパラメータを制限することは、関数のテストを容易にするために非常に重要です。なぜなら、関数のテストを簡単に行うことができるからです。3つ以上あると、それぞれの引数でたくさんの異なるケースをテストしなければならなくなり、組み合わせの爆発につながります。

1つか2つの引数が理想的なケースで、3つは可能な限り避けるべきでしょう。それ以上の場合は、統合する必要があります。通常、2つ以上の引数がある場合、その関数はあまりに多くのことを行おうとしています。そうでない場合は、たいていの場合、より上位のオブジェクトを引数として指定すれば十分でしょう。

JavaScript では、多くのクラス定型文がなくても、その場でオブジェクトを作ることができるので、多くの引数が必要だと感じたら、オブジェクトを使用することができます。

関数がどのようなプロパティを期待しているかを明らかにするために、ES2015/ES6 の構造化構文を使用することができます。これには、いくつかの利点があります。

1. 関数のシグネチャを見れば、どのようなプロパティが使われているのかがすぐにわかる。
2. 名前付きパラメータをシミュレートするために使用できる。
3. 再構造化では、関数に渡された引数オブジェクトの指定されたプリミティブ値をクローンすることもできます。これは、副作用を防ぐのに役立ちます。注意：引数オブジェクトから構造化解除されたオブジェクトや配列は、クローン化されませ ん。
4. リンターは未使用のプロパティについて警告を出しますが、これはデストラクチャリングなしでは不可能なことです。

**Bad:**

```javascript
function createMenu(title, body, buttonText, cancellable) {
  // ...
}

createMenu("Foo", "Bar", "Baz", true);

```

**Good:**

```javascript
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true
});
```

**[⬆ back to top](#table-of-contents)**

### 関数は1つのことを行う必要があります

これは、ソフトウェア工学において最も重要な規則です。関数が複数のことを行う場合、その関数を構成し、テストし、推論することは困難です。関数をたった一つの動作に分離することができれば、リファクタリングが容易になり、コードがよりきれいに読めるようになります。もしあなたがこのガイドから他に何も得なければ、多くの開発者より一歩先を行くことになるでしょう。

**Bad:**

```javascript
function emailClients(clients) {
  clients.forEach(client => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Good:**

```javascript
function emailActiveClients(clients) {
  clients.filter(isActiveClient).forEach(email);
}

function isActiveClient(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```

**[⬆ back to top](#table-of-contents)**

### 関数名は何をするのかを表すべき

**Bad:**

```javascript
function addToDate(date, month) {
  // ...
}

const date = new Date();

// It's hard to tell from the function name what is added
addToDate(date, 1);
```

**Good:**

```javascript
function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);
```

**[⬆ back to top](#table-of-contents)**

### 関数は1レベルの抽象度にとどめるべき

抽象度が2つ以上ある場合、その関数はたいてい過剰な処理をしています。関数を分割することで、再利用性が高まり、テストが容易になります。

**Bad:**

```javascript
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach(token => {
    // lex...
  });

  ast.forEach(node => {
    // parse...
  });
}
```

**Good:**

```javascript
function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const syntaxTree = parse(tokens);
  syntaxTree.forEach(node => {
    // parse...
  });
}

function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(" ");
  const tokens = [];
  REGEXES.forEach(REGEX => {
    statements.forEach(statement => {
      tokens.push(/* ... */);
    });
  });

  return tokens;
}

function parse(tokens) {
  const syntaxTree = [];
  tokens.forEach(token => {
    syntaxTree.push(/* ... */);
  });

  return syntaxTree;
}
```

**[⬆ back to top](#table-of-contents)**

### 重複するコードの削除

コードの重複を極力避ける。コードの重複は、ロジックを変更する必要がある場合に、変更する場所が複数になることを意味するからです。

例えば、レストランを経営していて、トマト、タマネギ、ニンニク、スパイスなどの在庫を管理している場合を想像してみてください。もし、複数のリストがあれば、トマトを使った料理を提供するときに、すべてのリストを更新しなければなりません。リストが1つしかない場合は、更新する場所は1つだけです。

重複するコードがあるのは、2つ以上の微妙に異なるものがあり、それらは多くの点で共通していますが、その違いから、同じことをするのに2つ以上の別々の関数を持たざるを得ないことがよくあります。重複するコードを取り除くということは、このような異なるものの集合をたった一つの関数／モジュール／クラスで扱えるように抽象化することです。

抽象化を正しく行うことは非常に重要であり、_Class_のセクションで説明したSOLIDの原則に従うべきです。間違った抽象化は、重複したコードよりも悪いので、注意が必要です。とはいえ、良い抽象化ができるのであれば、それを実行しましょう。そうしないと、1つのことを変更するたびに複数の場所を更新しなければならないことに気がつきます。

**Bad:**

```javascript
function showDeveloperList(developers) {
  developers.forEach(developer => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach(manager => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```

**Good:**

```javascript
function showEmployeeList(employees) {
  employees.forEach(employee => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    const data = {
      expectedSalary,
      experience
    };

    switch (employee.type) {
      case "manager":
        data.portfolio = employee.getMBAProjects();
        break;
      case "developer":
        data.githubLink = employee.getGithubLink();
        break;
    }

    render(data);
  });
}
```

**[⬆ back to top](#table-of-contents)**

### Object.assignでデフォルトオブジェクトを設定する

**Bad:**

```javascript
const menuConfig = {
  title: null,
  body: "Bar",
  buttonText: null,
  cancellable: true
};

function createMenu(config) {
  config.title = config.title || "Foo";
  config.body = config.body || "Bar";
  config.buttonText = config.buttonText || "Baz";
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}

createMenu(menuConfig);
```

**Good:**

```javascript
const menuConfig = {
  title: "Order",
  // User did not include 'body' key
  buttonText: "Send",
  cancellable: true
};

function createMenu(config) {
  let finalConfig = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true
    },
    config
  );
  return finalConfig
  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```

**[⬆ back to top](#table-of-contents)**

### 関数のパラメータとしてフラグを使用しない

フラグは、この関数が複数のことを行うことをユーザーに知らせます。関数の役割は一つであるべきです。もし関数がブール値に基づいて異なるコード経路をたどる場合は、関数を分割してください。

**Bad:**

```javascript
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Good:**

```javascript
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```

**[⬆ back to top](#table-of-contents)**

### 副作用を避けるために（その1）

関数は、値を受け取って別の値や値を返す以外のことをすると、副作用を発生させます。副作用とは、ファイルに書き込んだり、グローバル変数を変更したり、誤って知らない人に全財産を送金してしまったりすることです。

さて、プログラムには副作用が必要な場合があります。先ほどの例のように、ファイルに書き込む必要があるかもしれません。このような場合、どこで何をするのかを一元管理する必要があります。特定のファイルに書き込むための関数やクラスがいくつもあってはいけません。それを行うサービスを1つ用意します。1つだけです。

主なポイントは、構造を持たずにオブジェクト間で状態を共有したり、何にでも書き込めるミュータブルなデータ型を使用したり、副作用が発生する場所を一元化しないといった、よくある落とし穴を避けることです。これができれば、他の大多数のプログラマーよりも幸せになれるはずです。

**Bad:**

```javascript
// 以下の関数から参照されるグローバル変数。
// もしこの名前を使った別の関数があったら、今度は配列になってしまい、それが壊れる可能性があります。
let name = "Ryan McDermott";

function splitIntoFirstAndLastName() {
  name = name.split(" ");
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
```

**Good:**

```javascript
function splitIntoFirstAndLastName(name) {
  return name.split(" ");
}

const name = "Ryan McDermott";
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
```

**[⬆ back to top](#table-of-contents)**

### 副作用を避けるために（その2）

JavaScriptでは、変更できない値（immutable）と変更可能な値（mutable）があります。オブジェクトと配列は2種類の変更可能な値なので、関数にパラメータとして渡されるときは慎重に扱うことが重要です。JavaScript の関数がオブジェクトのプロパティを変更したり、配列の内容を変更したりすると、他の場所で簡単にバグを引き起こす可能性があります。

例えば、ショッピングカートを表す配列のパラメータを受け取る関数があるとします。その関数がショッピングカートの配列を変更した場合、例えば購入するアイテムを追加した場合、同じ `cart` 配列を使用する他の関数はこの追加の影響を受けることになります。それは素晴らしいことかもしれませんが、しかし悪いことでもあります。悪い状況を想像してみましょう。

ユーザが "Purchase" ボタンをクリックすると、 `purchase` 関数が呼び出され、ネットワークリクエストを生成して `cart` 配列をサーバに送信します。ネットワーク接続に問題があるため、 `purchase` 関数はリクエストを再試行し続けなければなりません。さて、その間にユーザーがネットワークリクエストが始まる前に、実際には欲しくもない商品の "Add to Cart" ボタンを誤ってクリックしてしまったらどうでしょう？もしそうなってネットワークリクエストが始まると、`cart`配列が変更されたので、その購入関数は誤って追加されたアイテムを送信します。

素晴らしい解決策は、 `addItemToCart` 関数が常に `cart` をクローンして、それを編集し、クローンを返すようにすることでしょう。これによって、まだ古いショッピングカートを使用している関数が変更の影響を受けないことを保証します。

この方法には、2つの注意点があります。

1. 実際に入力オブジェクトを変更したい場合もあるかもしれませんが、このプログラミング手法を採用すると、そのようなケースは非常に稀であることがわかります。ほとんどのものは、副作用がないようにリファクタリングすることができるのです

2. 大きなオブジェクトのクローンを作成することは、パフォーマンスの面で非常に高くつくことがあります。幸いなことに、この種のプログラミングアプローチを高速にし、オブジェクトや配列を手動でクローンするほどメモリを消費しないようにする[素晴らしいライブラリ](https://facebook.github.io/immutable-js/)があるので、実際には大きな問題にはなりません。

**Bad:**

```javascript
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};
```

**Good:**

```javascript
const addItemToCart = (cart, item) => {
  return [...cart, { item, date: Date.now() }];
};
```

**[⬆ back to top](#table-of-contents)**

### グローバル関数に書き込まない

なぜなら、他のライブラリと衝突する可能性があり、APIのユーザは実運用で例外が発生するまで何も知らないことになるからです。例えば、JavaScript のネイティブの Array メソッドを拡張して、2 つの配列の差を表示する `diff` メソッドを持ちたいとしたらどうでしょうか。新しい関数を `Array.prototype` に書くことができますが、同じことをしようとする他のライブラリと衝突する可能性があります。もし、他のライブラリが `diff` を使って、配列の最初と最後の要素の差を求めるだけだったらどうでしょうか？このような理由から、ES2015/ES6 クラスを使用して、単に `Array` グローバルを拡張する方がはるかに良いのです。

**Bad:**

```javascript
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter(elem => !hash.has(elem));
};
```

**Good:**

```javascript
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
  }
}
```

**[⬆ back to top](#table-of-contents)**

### 命令型プログラミングより関数型プログラミングを優先

JavaScriptはHaskellのような関数型言語ではありませんが、関数型的な味わいがあります。関数型言語は、よりクリーンでテストがしやすい言語です。できる限り、このスタイルのプログラミングを好むようにしましょう。

**Bad:**

```javascript
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

**Good:**

```javascript
const programmerOutput = [
  {
    name: "Uncle Bobby",
    linesOfCode: 500
  },
  {
    name: "Suzie Q",
    linesOfCode: 1500
  },
  {
    name: "Jimmy Gosling",
    linesOfCode: 150
  },
  {
    name: "Gracie Hopper",
    linesOfCode: 1000
  }
];

const totalOutput = programmerOutput.reduce(
  (totalLines, output) => totalLines + output.linesOfCode,
  0
);
```

**[⬆ back to top](#table-of-contents)**

### 条件分岐のカプセル化

**Bad:**

```javascript
if (fsm.state === "fetching" && isEmpty(listNode)) {
  // ...
}
```

**Good:**

```javascript
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === "fetching" && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### 否定的な条件文は避ける

**Bad:**

```javascript
function isDOMNodeNotPresent(node) {
  // ...
}

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Good:**

```javascript
function isDOMNodePresent(node) {
  // ...
}

if (isDOMNodePresent(node)) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### 条件文は避ける

これは不可能なことのように思える。最初にこれを聞いたとき、ほとんどの人は "どうやって `if` 文なしで何かをすればいいんだ？" と言います。その答えは、多くの場合、ポリモーフィズムを使って同じタスクを達成することができるからです。2つ目の質問は、通常、「それは素晴らしいが、なぜそんなことをしたいのか？その答えは、以前学んだクリーンコードの概念、「関数は1つのことしかしてはいけない」というものです。クラスや関数に `if` ステートメントがある場合、その関数は複数のことを行うことをユーザーに伝えていることになります。忘れないでください、やることはひとつだけです。

**Bad:**

```javascript
class Airplane {
  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case "777":
        return this.getMaxAltitude() - this.getPassengerCount();
      case "Air Force One":
        return this.getMaxAltitude();
      case "Cessna":
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```

**Good:**

```javascript
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```

**[⬆ back to top](#table-of-contents)**

### タイプチェックを避ける（その1）

JavaScriptは型付けされていないので、関数はどんな型の引数でも取ることができます。この自由度の高さが災いして、関数内で型チェックをしたくなることがあります。これを回避する方法はたくさんあります。まず最初に考えるべきは、一貫したAPIです。

**Bad:**

```javascript
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.pedal(this.currentLocation, new Location("texas"));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location("texas"));
  }
}
```

**Good:**

```javascript
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location("texas"));
}
```

**[⬆ back to top](#table-of-contents)**

### タイプチェックを避ける（その2）

文字列や整数などの基本的なプリミティブ値を扱う場合、ポリモーフィズムは使えないが型チェックの必要性を感じるのであれば、TypeScriptの利用を検討すべきだろう。TypeScriptは標準的なJavaScriptの構文の上に静的な型付けを行うことができるため、通常のJavaScriptの優れた代替品となる。通常のJavaScriptを手作業で型チェックすることの問題点は、それをうまく行うには余分な記述が多くなり、偽の「型安全性」が失われた可読性を補うことができないことである。JavaScriptをきれいに保ち、良いテストを書き、良いコードレビューを行いましょう。そうでなければ、これらすべてをTypeScriptで行いましょう（先ほども言ったように、TypeScriptは素晴らしい代替手段です！）。

**Bad:**

```javascript
function combine(val1, val2) {
  if (
    (typeof val1 === "number" && typeof val2 === "number") ||
    (typeof val1 === "string" && typeof val2 === "string")
  ) {
    return val1 + val2;
  }

  throw new Error("Must be of type String or Number");
}
```

**Good:**

```javascript
function combine(val1, val2) {
  return val1 + val2;
}
```

**[⬆ back to top](#table-of-contents)**

### 最適化しすぎない

モダンブラウザは、実行時に多くの最適化を行います。多くの場合、最適化をしているならば、時間を浪費しているだけです。[最適化が不足している箇所を確認するための良いリソースがあります](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)。可能であれば、修正されるまでの間、それらをターゲットにしてください。

**Bad:**

```javascript
// 古いブラウザでは、キャッシュされていない `list.length` を含む各反復処理は、 `list.length` の再計算のためにコストがかかります。モダンブラウザでは、これは最適化されています。
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Good:**

```javascript
for (let i = 0; i < list.length; i++) {
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

### デッドコードの削除

デッドコードは、重複コードと同じくらい悪いものです。コードベースに残しておく理由はありません。呼び出されないのであれば、捨ててしまいましょう。もしまだ必要なら、バージョン履歴の中で安全に保管することができます。

**Bad:**

```javascript
function oldRequestModule(url) {
  // ...
}

function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");
```

**Good:**

```javascript
function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");
```

**[⬆ back to top](#table-of-contents)**

## **Objects and Data Structures**

### ゲッターとセッターを使用する

オブジェクトのデータにアクセスするためにゲッターとセッターを使用することは、単にオブジェクトのプロパティを探すことよりも良い場合があります。「なぜ？」と思うかもしれません。まあ、ここにその理由の未整理なリストがあります。

- オブジェクトのプロパティを取得する以上のことをしたいとき、コードベース内のすべてのアクセサを調べて変更する必要はありません。
- set` を行う際に、バリデーションを簡単に追加できるようにします。
- 内部表現をカプセル化する。
- 取得や設定の際に、ロギングやエラー処理を簡単に追加することができる。
- オブジェクトのプロパティを遅延ロードすることができる (例えば、サーバーから取得する場合)。

**Bad:**

```javascript
function makeBankAccount() {
  // ...

  return {
    balance: 0
    // ...
  };
}

const account = makeBankAccount();
account.balance = 100;
```

**Good:**

```javascript
function makeBankAccount() {
  // this one is private
  let balance = 0;

  // a "getter", made public via the returned object below
  function getBalance() {
    return balance;
  }

  // a "setter", made public via the returned object below
  function setBalance(amount) {
    // ... validate before updating the balance
    balance = amount;
  }

  return {
    // ...
    getBalance,
    setBalance
  };
}

const account = makeBankAccount();
account.setBalance(100);
```

**[⬆ back to top](#table-of-contents)**

### オブジェクトにプライベートメンバを持たせる

これはクロージャによって実現できます（ES5以下の場合）。

**Bad:**

```javascript
const Employee = function(name) {
  this.name = name;
};

Employee.prototype.getName = function getName() {
  return this.name;
};

const employee = new Employee("John Doe");
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: undefined
```

**Good:**

```javascript
function makeEmployee(name) {
  return {
    getName() {
      return name;
    }
  };
}

const employee = makeEmployee("John Doe");
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
delete employee.name;
console.log(`Employee name: ${employee.getName()}`); // Employee name: John Doe
```

**[⬆ back to top](#table-of-contents)**

## **Classes**

### ES5のプレーンな関数よりもES2015/ES6のクラスを優先する。

古典的なES5クラスでは、読みやすいクラスの継承、構築、メソッド定義を得ることは非常に困難です。もし、継承が必要なら（必要ないかもしれませんが）、ES2015/ES6クラスを選択することをお勧めします。しかし、より大きく、より複雑なオブジェクトが必要になるまでは、クラスよりも小さな関数を優先してください。

**Bad:**

```javascript
const Animal = function(age) {
  if (!(this instanceof Animal)) {
    throw new Error("Instantiate Animal with `new`");
  }

  this.age = age;
};

Animal.prototype.move = function move() {};

const Mammal = function(age, furColor) {
  if (!(this instanceof Mammal)) {
    throw new Error("Instantiate Mammal with `new`");
  }

  Animal.call(this, age);
  this.furColor = furColor;
};

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;
Mammal.prototype.liveBirth = function liveBirth() {};

const Human = function(age, furColor, languageSpoken) {
  if (!(this instanceof Human)) {
    throw new Error("Instantiate Human with `new`");
  }

  Mammal.call(this, age, furColor);
  this.languageSpoken = languageSpoken;
};

Human.prototype = Object.create(Mammal.prototype);
Human.prototype.constructor = Human;
Human.prototype.speak = function speak() {};
```

**Good:**

```javascript
class Animal {
  constructor(age) {
    this.age = age;
  }

  move() {
    /* ... */
  }
}

class Mammal extends Animal {
  constructor(age, furColor) {
    super(age);
    this.furColor = furColor;
  }

  liveBirth() {
    /* ... */
  }
}

class Human extends Mammal {
  constructor(age, furColor, languageSpoken) {
    super(age, furColor);
    this.languageSpoken = languageSpoken;
  }

  speak() {
    /* ... */
  }
}
```

**[⬆ back to top](#table-of-contents)**

### メソッドチェイニングを使用する

このパターンはJavaScriptで非常に有用であり、jQueryやLodashなど多くのライブラリで見かけることができます。jQueryやLodashなど多くのライブラリで見ることができます。このパターンによって、コードが表現豊かになり、冗長にならずに済みます。そのため、私はメソッドチェイニングを使用して、あなたのコードがどれだけきれいになるかを見てみましょうと言います。クラス関数では、すべての関数の最後で `this` を返すだけで、その上にさらにクラスメソッドを連鎖させることができます。

**Bad:**

```javascript
class Car {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  setMake(make) {
    this.make = make;
  }

  setModel(model) {
    this.model = model;
  }

  setColor(color) {
    this.color = color;
  }

  save() {
    console.log(this.make, this.model, this.color);
  }
}

const car = new Car("Ford", "F-150", "red");
car.setColor("pink");
car.save();
```

**Good:**

```javascript
class Car {
  constructor(make, model, color) {
    this.make = make;
    this.model = model;
    this.color = color;
  }

  setMake(make) {
    this.make = make;
    // NOTE: Returning this for chaining
    return this;
  }

  setModel(model) {
    this.model = model;
    // NOTE: Returning this for chaining
    return this;
  }

  setColor(color) {
    this.color = color;
    // NOTE: Returning this for chaining
    return this;
  }

  save() {
    console.log(this.make, this.model, this.color);
    // NOTE: Returning this for chaining
    return this;
  }
}

const car = new Car("Ford", "F-150", "red").setColor("pink").save();
```

**[⬆ back to top](#table-of-contents)**

### 継承よりも合成を優先

Gang of Fourによる[_Design Patterns_](https://en.wikipedia.org/wiki/Design_Patterns)で有名になったように、できる限り継承よりもコンポジションを優先すべきなのです。継承を使うべき理由はたくさんありますし、構成を使うべき理由もたくさんあります。この格言の要点は、もしあなたが本能的に継承を選ぶなら、コンポジションで問題をよりよくモデル化できないか考えてみることです。場合によっては、それが可能なこともあります。

では、"どんなときに継承を使えばいいのか？"と疑問に思うかもしれません。それはあなたの目の前の問題によりますが、これは、継承が構成よりも意味をなす場合の適切なリストです。

1. この継承は「has-a」関係ではなく「is-a」関係を表しています（Human->Animal vs. User->UserDetails）。
2. ベースクラスからコードを再利用できる（人間は他の動物と同じように動くことができる）。
3. ベースクラスを変更することで、派生クラスに対してグローバルな変更を行いたい。(すべての動物の移動時のカロリー消費を変更する)。

**Bad:**

```javascript
class Employee {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  // ...
}

// EmployeeがTaxDataを「持っている」ので悪い。EmployeeTaxDataはEmployeeの型ではありません。
class EmployeeTaxData extends Employee {
  constructor(ssn, salary) {
    super();
    this.ssn = ssn;
    this.salary = salary;
  }

  // ...
}
```

**Good:**

```javascript
class EmployeeTaxData {
  constructor(ssn, salary) {
    this.ssn = ssn;
    this.salary = salary;
  }

  // ...
}

class Employee {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  setTaxData(ssn, salary) {
    this.taxData = new EmployeeTaxData(ssn, salary);
  }
  // ...
}
```

**[⬆ back to top](#table-of-contents)**

## **SOLID**

### 単一責任原則（SRP）

クリーンコードで述べられているように、「クラスが変更される理由は1つだけであってはならない」のです。飛行機でスーツケースを一つしか持っていけないときのように、クラスに多くの機能を詰め込みたくなるものです。これの問題は、クラスが概念的にまとまらず、変更する理由をたくさん与えてしまうことです。クラスを変更する回数を最小限にすることは重要です。なぜなら、あまりに多くの機能が一つのクラスに入っていて、その一部を変更した場合、それがコードベース内の他の依存モジュールにどのような影響を与えるか理解するのが難しくなるからです。

**Bad:**

```javascript
class UserSettings {
  constructor(user) {
    this.user = user;
  }

  changeSettings(settings) {
    if (this.verifyCredentials()) {
      // ...
    }
  }

  verifyCredentials() {
    // ...
  }
}
```

**Good:**

```javascript
class UserAuth {
  constructor(user) {
    this.user = user;
  }

  verifyCredentials() {
    // ...
  }
}

class UserSettings {
  constructor(user) {
    this.user = user;
    this.auth = new UserAuth(user);
  }

  changeSettings(settings) {
    if (this.auth.verifyCredentials()) {
      // ...
    }
  }
}
```

**[⬆ back to top](#table-of-contents)**

### オープン/クローズドプリンシプル（OCP)

Bertrand Meyerが述べたように、"ソフトウェアの実体（クラス、モジュール、関数など）は、拡張に対してはオープンであるが、変更に対してはクローズであるべきだ "とされています。とはいえ、どういうことでしょうか？この原則は、基本的には、既存のコードを変更せずに、ユーザーが新しい機能を追加できるようにすることを述べています。

**Bad:**

```javascript
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = "ajaxAdapter";
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = "nodeAdapter";
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    if (this.adapter.name === "ajaxAdapter") {
      return makeAjaxCall(url).then(response => {
        // transform response and return
      });
    } else if (this.adapter.name === "nodeAdapter") {
      return makeHttpCall(url).then(response => {
        // transform response and return
      });
    }
  }
}

function makeAjaxCall(url) {
  // request and return promise
}

function makeHttpCall(url) {
  // request and return promise
}
```

**Good:**

```javascript
class AjaxAdapter extends Adapter {
  constructor() {
    super();
    this.name = "ajaxAdapter";
  }

  request(url) {
    // request and return promise
  }
}

class NodeAdapter extends Adapter {
  constructor() {
    super();
    this.name = "nodeAdapter";
  }

  request(url) {
    // request and return promise
  }
}

class HttpRequester {
  constructor(adapter) {
    this.adapter = adapter;
  }

  fetch(url) {
    return this.adapter.request(url).then(response => {
      // transform response and return
    });
  }
}
```

**[⬆ back to top](#table-of-contents)**

### リスコフ置換原理(LSP)

これは、非常に単純な概念に対する怖い言葉である。正式には、"SがTのサブタイプである場合、T型のオブジェクトは、そのプログラムの望ましい特性（正しさ、実行されるタスクなど）を一切変えることなく、S型のオブジェクトで置き換えてもよい（すなわち、S型のオブジェクトがT型のオブジェクトを代替してもよい）"と定義されています。さらに怖い定義ですね。

これを説明するには、親クラスと子クラスがあれば、間違った結果を得ることなく、親クラスと子クラスが入れ替わって使えるということです。これでもまだ分かりにくいかもしれないので、古典的な四角形と長方形の例を見てみましょう。数学的には正方形は長方形なのですが、継承による「is-a」の関係を使ってモデル化すると、すぐに問題が発生します。

**Bad:**

```javascript
class Rectangle {
  constructor() {
    this.width = 0;
    this.height = 0;
  }

  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }

  setWidth(width) {
    this.width = width;
  }

  setHeight(height) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width) {
    this.width = width;
    this.height = width;
  }

  setHeight(height) {
    this.width = height;
    this.height = height;
  }
}

function renderLargeRectangles(rectangles) {
  rectangles.forEach(rectangle => {
    rectangle.setWidth(4);
    rectangle.setHeight(5);
    const area = rectangle.getArea(); // BAD: Returns 25 for Square. Should be 20.
    rectangle.render(area);
  });
}

const rectangles = [new Rectangle(), new Rectangle(), new Square()];
renderLargeRectangles(rectangles);
```

**Good:**

```javascript
class Shape {
  setColor(color) {
    // ...
  }

  render(area) {
    // ...
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Shape {
  constructor(length) {
    super();
    this.length = length;
  }

  getArea() {
    return this.length * this.length;
  }
}

function renderLargeShapes(shapes) {
  shapes.forEach(shape => {
    const area = shape.getArea();
    shape.render(area);
  });
}

const shapes = [new Rectangle(4, 5), new Rectangle(4, 5), new Square(5)];
renderLargeShapes(shapes);
```

**[⬆ back to top](#table-of-contents)**

### インターフェース分離の原則 (ISP)

JavaScript にはインターフェースがないので、この原則は他の原則ほど厳密には適用されません。しかし、JavaScriptに型システムがないとしても、この原則は重要であり、関連性があります。

ISP は "クライアントは自分が使わないインターフェースに依存することを強制されるべきではない" と述べています。JavaScriptではダックタイピングのため、インターフェイスは暗黙の契約となります。

JavaScriptでこの原則を示す良い例として、大きな設定オブジェクトを必要とするクラスを見てみましょう。クライアントに膨大な量のオプションの設定を要求しないことは有益です。なぜなら、ほとんどの場合、クライアントはすべての設定を必要としないからです。また、オプションとして設定することで、「太ったインターフェース」を防ぐことができます。

**Bad:**

```javascript
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.settings.animationModule.setup();
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName("body"),
  animationModule() {} // Most of the time, we won't need to animate when traversing.
  // ...
});
```

**Good:**

```javascript
class DOMTraverser {
  constructor(settings) {
    this.settings = settings;
    this.options = settings.options;
    this.setup();
  }

  setup() {
    this.rootNode = this.settings.rootNode;
    this.setupOptions();
  }

  setupOptions() {
    if (this.options.animationModule) {
      // ...
    }
  }

  traverse() {
    // ...
  }
}

const $ = new DOMTraverser({
  rootNode: document.getElementsByTagName("body"),
  options: {
    animationModule() {}
  }
});
```

**[⬆ back to top](#table-of-contents)**

### 依存関係逆転原理（DIP）

この原則は、2つの本質的なことを述べています。

1. 高水準モジュールは低水準モジュールに依存してはならない。どちらも抽象化されたものに依存すべきです。
2. 抽象化は詳細に依存すべきではない。詳細は抽象化されたものに依存すべきである。

これは最初は理解しにくいかもしれませんが、AngularJSを扱ったことがある人なら、この原則の実装をDependency Injection（DI）という形で見たことがあると思います。両者は同一の概念ではありませんが、DIPは高レベルのモジュールがその低レベルのモジュールの詳細を知り、設定しないようにします。それをDIによって実現することができる。これの大きな利点は、モジュール間の結合を減らすことができることです。カップリングはコードのリファクタリングが難しくなるため、非常に悪い開発パターンです。

前述したように、JavaScriptにはインターフェースがないので、依存する抽象化は暗黙の契約となります。つまり、あるオブジェクト/クラスが別のオブジェクト/クラスに公開するメソッドとプロパティのことです。以下の例では、暗黙の契約は `InventoryTracker` の Request モジュールは `requestItems` メソッドを持つということです。

**Bad:**

```javascript
class InventoryRequester {
  constructor() {
    this.REQ_METHODS = ["HTTP"];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryTracker {
  constructor(items) {
    this.items = items;

    // BAD: We have created a dependency on a specific request implementation.
    // We should just have requestItems depend on a request method: `request`
    this.requester = new InventoryRequester();
  }

  requestItems() {
    this.items.forEach(item => {
      this.requester.requestItem(item);
    });
  }
}

const inventoryTracker = new InventoryTracker(["apples", "bananas"]);
inventoryTracker.requestItems();
```

**Good:**

```javascript
class InventoryTracker {
  constructor(items, requester) {
    this.items = items;
    this.requester = requester;
  }

  requestItems() {
    this.items.forEach(item => {
      this.requester.requestItem(item);
    });
  }
}

class InventoryRequesterV1 {
  constructor() {
    this.REQ_METHODS = ["HTTP"];
  }

  requestItem(item) {
    // ...
  }
}

class InventoryRequesterV2 {
  constructor() {
    this.REQ_METHODS = ["WS"];
  }

  requestItem(item) {
    // ...
  }
}

// 依存関係を外部で構築し、それらを注入することで、リクエストモジュールを WebSocket を使用する凝った新しいモジュールに簡単に置き換えることができます。
const inventoryTracker = new InventoryTracker(
  ["apples", "bananas"],
  new InventoryRequesterV2()
);
inventoryTracker.requestItems();
```

**[⬆ back to top](#table-of-contents)**

## **Testing**

テストは出荷よりも重要です。もし、テストがなかったり、不十分だったりすると、コードを出荷するたびに、何も壊していないことを確認できなくなります。何をもって十分な量とするかはチーム次第ですが、100%のカバレッジ（すべてのステートメントとブランチ）を持つことは、非常に高い信頼性と開発者の安心感を得るための方法です。つまり、優れたテストフレームワークを持つことに加えて、[優れたカバレッジツール](https://gotwarlost.github.io/istanbul/)を使用する必要があるということです。

テストを書かない言い訳はありません。[優れたJSテストフレームワークはたくさんあります](https://jstherightway.org/#testing-tools)ので、あなたのチームが好むものを見つけてください。自分のチームに合ったものを見つけたら、新しい機能やモジュールを導入するたびに、常にテストを書くことを目指しましょう。もしあなたがテスト駆動開発 (TDD) を好むなら、それは素晴らしいことです。しかし、重要なのは、機能を立ち上げたり、既存の機能をリファクタリングする前に、カバレッジの目標に達しているかどうかを確認することです。

### 1テストにつき1コンセプト

**Bad:**

```javascript
import assert from "assert";

describe("MomentJS", () => {
  it("handles date boundaries", () => {
    let date;

    date = new MomentJS("1/1/2015");
    date.addDays(30);
    assert.equal("1/31/2015", date);

    date = new MomentJS("2/1/2016");
    date.addDays(28);
    assert.equal("02/29/2016", date);

    date = new MomentJS("2/1/2015");
    date.addDays(28);
    assert.equal("03/01/2015", date);
  });
});
```

**Good:**

```javascript
import assert from "assert";

describe("MomentJS", () => {
  it("handles 30-day months", () => {
    const date = new MomentJS("1/1/2015");
    date.addDays(30);
    assert.equal("1/31/2015", date);
  });

  it("handles leap year", () => {
    const date = new MomentJS("2/1/2016");
    date.addDays(28);
    assert.equal("02/29/2016", date);
  });

  it("handles non-leap year", () => {
    const date = new MomentJS("2/1/2015");
    date.addDays(28);
    assert.equal("03/01/2015", date);
  });
});
```

**[⬆ back to top](#table-of-contents)**

## **Concurrency**

### コールバックではなく、プロミスを使用する

コールバックはクリーンではないし、過剰なネストを引き起こす。ES2015/ES6では。
プロミスは組み込みのグローバル型です。ぜひ使ってみてください。

**Bad:**

```javascript
import { get } from "request";
import { writeFile } from "fs";

get(
  "https://en.wikipedia.org/wiki/Robert_Cecil_Martin",
  (requestErr, response, body) => {
    if (requestErr) {
      console.error(requestErr);
    } else {
      writeFile("article.html", body, writeErr => {
        if (writeErr) {
          console.error(writeErr);
        } else {
          console.log("File written");
        }
      });
    }
  }
);
```

**Good:**

```javascript
import { get } from "request-promise";
import { writeFile } from "fs-extra";

get("https://en.wikipedia.org/wiki/Robert_Cecil_Martin")
  .then(body => {
    return writeFile("article.html", body);
  })
  .then(() => {
    console.log("File written");
  })
  .catch(err => {
    console.error(err);
  });
```

**[⬆ back to top](#table-of-contents)**

### Async/Await は Promise よりもさらにクリーンです。

プロミスはコールバックの非常にクリーンな代替手段ですが、ES2017/ES8 では async と await が登場し、さらにクリーンな解決策を提供します。`async` キーワードを先頭に持つ関数さえあれば、関数の `then` チェーンなしで命令的にロジックを記述することができるのです。ES2017/ES8 の機能を今日から活用できる方はぜひ使ってみてください。

**Bad:**

```javascript
import { get } from "request-promise";
import { writeFile } from "fs-extra";

get("https://en.wikipedia.org/wiki/Robert_Cecil_Martin")
  .then(body => {
    return writeFile("article.html", body);
  })
  .then(() => {
    console.log("File written");
  })
  .catch(err => {
    console.error(err);
  });
```

**Good:**

```javascript
import { get } from "request-promise";
import { writeFile } from "fs-extra";

async function getCleanCodeArticle() {
  try {
    const body = await get(
      "https://en.wikipedia.org/wiki/Robert_Cecil_Martin"
    );
    await writeFile("article.html", body);
    console.log("File written");
  } catch (err) {
    console.error(err);
  }
}

getCleanCodeArticle()
```

**[⬆ back to top](#table-of-contents)**

## **Error Handling**

エラーを投げるのは良いことです。ランタイムは、あなたのプログラムの何かがうまくいかなくなったときに、現在のスタックでの関数の実行を停止し、プロセスを（Nodeで）終了させ、スタックトレースでコンソールに通知することで、あなたに知らせてくれるのです。

### キャッチしたエラーを無視しない

捕捉されたエラーに対して何もしないのは、そのエラーを修正したり対応したりする能力を与えないことになります。エラーをコンソール (`console.log`) にログ出力することも、あまり良いことではありません。もしあなたがコードの一部を `try/catch` でラップしているなら、それはそこでエラーが発生するかもしれないと考えていることを意味します。

**Bad:**

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  console.log(error);
}
```

**Good:**

```javascript
try {
  functionThatMightThrow();
} catch (error) {
  // One option (more noisy than console.log):
  console.error(error);
  // Another option:
  notifyUserOfError(error);
  // Another option:
  reportErrorToService(error);
  // OR do all three!
}
```

### 拒否された約束を無視してはいけない

同じ理由で、 `try/catch` によってキャッチされたエラーも無視してはいけません。

**Bad:**

```javascript
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    console.log(error);
  });
```

**Good:**

```javascript
getdata()
  .then(data => {
    functionThatMightThrow(data);
  })
  .catch(error => {
    // One option (more noisy than console.log):
    console.error(error);
    // Another option:
    notifyUserOfError(error);
    // Another option:
    reportErrorToService(error);
    // OR do all three!
  });
```

**[⬆ back to top](#table-of-contents)**

## **Formatting**

フォーマットは主観的なものです。多くの規則がそうであるように、あなたが従わなければならない厳密なルールはありません。重要なのは、フォーマットをめぐって論争をしないことです。これを自動化するための[ツールのトン](https://standardjs.com/rules.html)があります。ぜひ使ってみてください。エンジニアがフォーマットについて議論するのは時間とお金の無駄です。

自動フォーマットには当てはまらないこと(インデント、タブとスペース、二重引用符と単一引用符など)については、こちらを参照してください。

### 大文字小文字を統一する

JavaScript は型付けされていないので、大文字小文字を区別することで、変数や関数などについて多くのことを知ることができます。これらのルールは主観的なものなので、あなたのチームは好きなものを選ぶことができます。重要なのは、何を選んでも、一貫性を保つことです。

**Bad:**

```javascript
const DAYS_IN_WEEK = 7;
const daysInMonth = 30;

const songs = ["Back In Black", "Stairway to Heaven", "Hey Jude"];
const Artists = ["ACDC", "Led Zeppelin", "The Beatles"];

function eraseDatabase() {}
function restore_database() {}

class animal {}
class Alpaca {}
```

**Good:**

```javascript
const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;

const SONGS = ["Back In Black", "Stairway to Heaven", "Hey Jude"];
const ARTISTS = ["ACDC", "Led Zeppelin", "The Beatles"];

function eraseDatabase() {}
function restoreDatabase() {}

class Animal {}
class Alpaca {}
```

**[⬆ back to top](#table-of-contents)**

### Function callers and callees should be close

If a function calls another, keep those functions vertically close in the source
file. Ideally, keep the caller right above the callee. We tend to read code from
top-to-bottom, like a newspaper. Because of this, make your code read that way.

**Bad:**

```javascript
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  lookupPeers() {
    return db.lookup(this.employee, "peers");
  }

  lookupManager() {
    return db.lookup(this.employee, "manager");
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
```

**Good:**

```javascript
class PerformanceReview {
  constructor(employee) {
    this.employee = employee;
  }

  perfReview() {
    this.getPeerReviews();
    this.getManagerReview();
    this.getSelfReview();
  }

  getPeerReviews() {
    const peers = this.lookupPeers();
    // ...
  }

  lookupPeers() {
    return db.lookup(this.employee, "peers");
  }

  getManagerReview() {
    const manager = this.lookupManager();
  }

  lookupManager() {
    return db.lookup(this.employee, "manager");
  }

  getSelfReview() {
    // ...
  }
}

const review = new PerformanceReview(employee);
review.perfReview();
```

**[⬆ back to top](#table-of-contents)**

## **Comments**

### ビジネスロジックが複雑なものだけコメントする。

コメントは謝罪であり、必須ではありません。良いコードは、ほとんど自分自身を文書化します。

**Bad:**

```javascript
function hashIt(data) {
  // The hash
  let hash = 0;

  // Length of string
  const length = data.length;

  // Loop through every character in data
  for (let i = 0; i < length; i++) {
    // Get character code.
    const char = data.charCodeAt(i);
    // Make the hash
    hash = (hash << 5) - hash + char;
    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

**Good:**

```javascript
function hashIt(data) {
  let hash = 0;
  const length = data.length;

  for (let i = 0; i < length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;

    // Convert to 32-bit integer
    hash &= hash;
  }
}
```

**[⬆ back to top](#table-of-contents)**

### コメントアウトされたコードをコードベースに残してはいけない

バージョン管理は理由があって存在する古いコードは履歴に残す。

**Bad:**

```javascript
doStuff();
// doOtherStuff();
// doSomeMoreStuff();
// doSoMuchStuff();
```

**Good:**

```javascript
doStuff();
```

**[⬆ back to top](#table-of-contents)**

### ジャーナルコメントはありません

バージョン管理をすることを忘れないでください。デッドコード、コメント付きコード、特にジャーナルコメントは必要ありません。履歴を取得するには `git log` を使ってください!

**Bad:**

```javascript
/**
 * 2016-12-20: Removed monads, didn't understand them (RM)
 * 2016-10-01: Improved using special monads (JP)
 * 2016-02-03: Removed type-checking (LI)
 * 2015-03-14: Added combine with type-checking (JR)
 */
function combine(a, b) {
  return a + b;
}
```

**Good:**

```javascript
function combine(a, b) {
  return a + b;
}
```

**[⬆ back to top](#table-of-contents)**

### ポジションマーカーを避ける

通常、ノイズを追加するだけです。関数名や変数名、適切なインデントや書式設定が、あなたのコードに視覚的な構造を与えてくれるのです。

**Bad:**

```javascript
////////////////////////////////////////////////////////////////////////////////
// Scope Model Instantiation
////////////////////////////////////////////////////////////////////////////////
$scope.model = {
  menu: "foo",
  nav: "bar"
};

////////////////////////////////////////////////////////////////////////////////
// Action setup
////////////////////////////////////////////////////////////////////////////////
const actions = function() {
  // ...
};
```

**Good:**

```javascript
$scope.model = {
  menu: "foo",
  nav: "bar"
};

const actions = function() {
  // ...
};
```

**[⬆ back to top](#table-of-contents)**

## 翻訳

他の言語でもご利用いただけます。

- ![am](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Armenia.png) **Armenian**: [hanumanum/clean-code-javascript/](https://github.com/hanumanum/clean-code-javascript)
- ![bd](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Bangladesh.png) **Bangla(বাংলা)**: [InsomniacSabbir/clean-code-javascript/](https://github.com/InsomniacSabbir/clean-code-javascript/)
- ![br](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Brazil.png) **Brazilian Portuguese**: [fesnt/clean-code-javascript](https://github.com/fesnt/clean-code-javascript)
- ![cn](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/China.png) **Simplified Chinese**:
  - [alivebao/clean-code-js](https://github.com/alivebao/clean-code-js)
  - [beginor/clean-code-javascript](https://github.com/beginor/clean-code-javascript)
- ![tw](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Taiwan.png) **Traditional Chinese**: [AllJointTW/clean-code-javascript](https://github.com/AllJointTW/clean-code-javascript)
- ![fr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/France.png) **French**: [eugene-augier/clean-code-javascript-fr](https://github.com/eugene-augier/clean-code-javascript-fr)
- ![de](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Germany.png) **German**: [marcbruederlin/clean-code-javascript](https://github.com/marcbruederlin/clean-code-javascript)
- ![id](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Indonesia.png) **Indonesia**: [andirkh/clean-code-javascript/](https://github.com/andirkh/clean-code-javascript/)
- ![it](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Italy.png) **Italian**: [frappacchio/clean-code-javascript/](https://github.com/frappacchio/clean-code-javascript/)
- ![ja](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Japan.png) **Japanese**: [mitsuruog/clean-code-javascript/](https://github.com/mitsuruog/clean-code-javascript/)
- ![kr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/South-Korea.png) **Korean**: [qkraudghgh/clean-code-javascript-ko](https://github.com/qkraudghgh/clean-code-javascript-ko)
- ![pl](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Poland.png) **Polish**: [greg-dev/clean-code-javascript-pl](https://github.com/greg-dev/clean-code-javascript-pl)
- ![ru](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Russia.png) **Russian**:
  - [BoryaMogila/clean-code-javascript-ru/](https://github.com/BoryaMogila/clean-code-javascript-ru/)
  - [maksugr/clean-code-javascript](https://github.com/maksugr/clean-code-javascript)
- ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Spain.png) **Spanish**: [tureey/clean-code-javascript](https://github.com/tureey/clean-code-javascript)
- ![es](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Uruguay.png) **Spanish**: [andersontr15/clean-code-javascript](https://github.com/andersontr15/clean-code-javascript-es)
- ![rs](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Serbia.png) **Serbian**: [doskovicmilos/clean-code-javascript/](https://github.com/doskovicmilos/clean-code-javascript)
- ![tr](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Turkey.png) **Turkish**: [bsonmez/clean-code-javascript](https://github.com/bsonmez/clean-code-javascript/tree/turkish-translation)
- ![ua](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Ukraine.png) **Ukrainian**: [mindfr1k/clean-code-javascript-ua](https://github.com/mindfr1k/clean-code-javascript-ua)
- ![vi](https://raw.githubusercontent.com/gosquared/flags/master/flags/flags/shiny/24/Vietnam.png) **Vietnamese**: [hienvd/clean-code-javascript/](https://github.com/hienvd/clean-code-javascript/)

**[⬆ back to top](#table-of-contents)**
