# Edit Link

Edit Link は、GitHub や GitLab などの Git 管理サービス上でページを編集するためのリンクを表示します。有効にするには、設定に themeConfig.editLink オプションを追加します。

```js
export default {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
    }
  }
}
```

patternオプションはリンクのURL構造を定義し、:pathはページパスに置換されることになります。

デフォルトでは、これはdocページの下部に "Edit this page "というリンクテキストを追加します。このテキストは、textオプションを定義することによってカスタマイズすることができます。

```js
export default {
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    }
  }
}
```