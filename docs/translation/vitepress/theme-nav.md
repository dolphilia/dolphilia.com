# Nav

Navは、ページの上部に表示されるナビゲーションバーです。サイトタイトル、グローバルメニューリンクなどが含まれます。

## サイトタイトルとロゴ

デフォルトでは、config.titleの値を参照したサイトのタイトルがナビに表示されます。ナビに表示される内容を変更したい場合は、themeConfig.siteTitleオプションでカスタムテキストを定義することができます。

```js
export default {
  themeConfig: {
    siteTitle: 'My Custom Title'
  }
}
```

サイトのロゴがある場合、その画像へのパスを渡すことで表示することができます。ロゴは直接public内に配置し、その絶対パスを定義する必要があります。

```js
export default {
  themeConfig: {
    logo: '/my-logo.svg'
  }
}
```

ロゴを追加すると、サイトタイトルと一緒に表示されます。ロゴだけで十分で、サイトタイトルのテキストを隠したい場合は、siteTitleオプションにfalseを設定してください。

```js
export default {
  themeConfig: {
    logo: '/my-logo.svg',
    siteTitle: false
  }
}
```

また、alt属性を追加したり、ダーク/ライトモードに応じてカスタマイズしたい場合は、ロゴとしてオブジェクトを渡すことができます。詳しくは themeConfig.logo を参照してください。

## ナビゲーションリンク

themeConfig.navのオプションで、ナビにリンクを追加することができます。

```js
export default {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Configs', link: '/configs' },
      { text: 'Changelog', link: 'https://github.com/...' }
    ]
  }
}
```

textはnavに表示される実際のテキスト、linkはテキストがクリックされたときに移動するリンクです。リンクのパスは、.mdの接頭辞を除いた実際のファイルを指定し、常に/で始まるようにします。

ナビリンクはドロップダウンメニューにすることもできます。これを行うには、リンクオプションにitemsキーを設定します。

```js
export default {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' }
        ]
      }
    ]
  }
}
```

なお、ドロップダウンメニューのタイトル（上の例ではDropdown Menu）は、ドロップダウンダイアログを開くためのボタンとなるため、リンクプロパティを持つことはできません。

さらにネストした項目を渡すことで、ドロップダウン・メニューの項目に「セクション」を追加することもできます。

```js
export default {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // セクションのタイトルです。
            text: 'Section A Title',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' }
            ]
          }
        ]
      },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // また、タイトルを省略することも可能です。
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' }
            ]
          }
        ]
      }
    ]
  }
}
```

### リンクの "アクティブ "状態をカスタマイズする

ナビメニューのアイテムは、現在のページがマッチするパスの下にあるときにハイライトされます。マッチするパスをカスタマイズしたい場合は、activeMatchプロパティと正規表現を文字列で定義してください。

```js
export default {
  themeConfig: {
    nav: [
      // This link gets active state when the user is
      // on `/config/` path.
      {
        text: 'Guide',
        link: '/guide',
        activeMatch: '/config/'
      }
    ]
  }
}
```

> 警告: activeMatch は正規表現文字列であることが期待されていますが、文字列として定義する必要があります。実際の RegExp オブジェクトはビルド時にシリアライズできないため、ここでは使用できません。

## ソーシャルリンク

ソーシャルリンクを参照する。