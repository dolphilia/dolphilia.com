# Footer

themeConfig.footerが存在する場合、VitePressはページ下部にグローバルフッターを表示します。

```ts
export default {
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  }
}
```

```ts
export interface Footer {
  // 著作権の直前に表示されるメッセージ。
  message?: string

  // 実際の著作権表示文です。
  copyright?: string
}
```

上記の設定は、HTMLの文字列にも対応しています。そのため、例えばフッターテキストに何らかのリンクを設定したい場合、以下のように設定を調整することができます。

```ts
export default {
  themeConfig: {
    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2019-present <a href="https://github.com/yyx990803">Evan You</a>'
    }
  }
}
```

なお、SideBarが表示されているときは、フッターは表示されません。