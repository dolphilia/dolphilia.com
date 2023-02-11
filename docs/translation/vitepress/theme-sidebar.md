# Sidebar

サイドバーは、あなたのドキュメントのメインナビゲーションブロックです。サイドバーメニューはthemeConfig.sidebarで設定することができます。

```js
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          ...
        ]
      }
    ]
  }
}
```

## 基本

サイドバーメニューの最も単純な形式は、リンクの単一の配列で渡されます。最初のレベルのアイテムはサイドバーのための「セクション」を定義します。これはセクションのタイトルであるテキストと、実際のナビゲーションリンクである項目を含みます。

```js
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Section Title A',
        items: [
          { text: 'Item A', link: '/item-a' },
          { text: 'Item B', link: '/item-b' },
          ...
        ]
      },
      {
        text: 'Section Title B',
        items: [
          { text: 'Item C', link: '/item-c' },
          { text: 'Item D', link: '/item-d' },
          ...
        ]
      }
    ]
  }
}
```

リンクの末尾にスラッシュを付けると、対応するディレクトリのindex.mdを表示します。

```js
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          // This shows `/guide/index.md` page.
          { text: 'Introduction', link: '/guide/' }
        ]
      }
    ]
  }
}
```

## 複数のサイドバー

ページのパスによって、異なるサイドバーを表示することができます。例えば、このサイトのように、「ガイド」ページと「設定」ページのように、ドキュメント内のコンテンツに別々のセクションを作成することができます。

そのためには、まず、希望するセクションごとに、ページをディレクトリに整理してください。

```
.
├─ guide/
│  ├─ index.md
│  ├─ one.md
│  └─ two.md
└─ config/
   ├─ index.md
   ├─ three.md
   └─ four.md
```

次に、設定を更新して、各セクションのサイドバーを定義します。今回は、配列の代わりにオブジェクトを渡してください。

```js
export default {
  themeConfig: {
    sidebar: {
      // このサイドバーは、ユーザが `guide` ディレクトリの下にいるときに表示されます。
      '/guide/': [
        {
          text: 'Guide',
          items: [
            // これは `/guide/index.md` ページを表示しています。
            { text: 'Index', link: '/guide/' }, // /guide/index.md
            { text: 'One', link: '/guide/one' }, // /guide/one.md
            { text: 'Two', link: '/guide/two' } // /guide/two.md
          ]
        }
      ],

      // このサイドバーは、ユーザが `config` ディレクトリの下にいるときに表示されます。
      '/config/': [
        {
          text: 'Config',
          items: [
            // This shows `/config/index.md` page.
            { text: 'Index', link: '/config/' }, // /config/index.md
            { text: 'Three', link: '/config/three' }, // /config/three.md
            { text: 'Four', link: '/config/four' } // /config/four.md
          ]
        }
      ]
    }
  }
}
```

## 折りたたみ可能なサイドバーグループ

サイドバーグループに折りたたみ可能なオプションを追加することで、各セクションの表示/非表示を切り替えるトグルボタンを表示します。

```js
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Section Title A',
        collapsible: true,
        items: [...]
      },
      {
        text: 'Section Title B',
        collapsible: true,
        items: [...]
      }
    ]
  }
}
```

すべてのセクションは、デフォルトで「開いて」います。もし、最初のページロード時にそれらを「閉じる」ようにしたい場合は、collapsedオプションをtrueに設定します。

```js
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Section Title A',
        collapsible: true,
        collapsed: true,
        items: [...]
      }
    ]
  }
}
```