# コンフィギュレーション

何も設定しなければページは最小限でユーザはサイト内を移動する方法がありません。サイトをカスタマイズするために、まずdocsディレクトリの中に.vitepressディレクトリを作りましょう。ここにすべてのVitePress固有のファイルが配置されます。あなたのプロジェクト構造はおそらくこのようなものでしょう。

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  └─ index.md
└─ package.json
```

VitePressサイトの設定に不可欠なファイルは.vitepress/config.jsでJavaScriptのオブジェクトをエクスポートする必要があります。

```js
export default {
  title: 'VitePress',
  description: 'Just playing around.'
}
```

上記の例では、サイトのタイトルに「VitePress」、説明のメタタグに「Just playing around」を設定しています。

VitePressの機能については、Theme:Introductionで解説しており、設定ファイルの中で特定の機能を設定する方法を紹介しています。

また、すべてのコンフィギュレーションリファレンスはConfigsにあります。