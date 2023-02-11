# ブロックの拡張

テンプレートブロックを拡張することは、作者に追加機能を提供するための最良の方法です。

最も一般的な使用法は、実行時にいくつかのタグ内のコンテンツを処理することです。これは [filters](./filters.md) のようなものですが、単一の式に制限されないので、ステロイドのようなものです。

### 新規ブロックの定義

ブロックはプラグインによって定義され、ブロックはブロックディスクリプタに関連付けられた名前のマップである。ブロックディスクリプタは、少なくとも `process` メソッドを含む必要があります。

```js
module.exports = {
    blocks: {
        tag1: {
            process: function(block) {
                return "Hello "+block.body+", How are you?";
            }
        }
    }
};
```

`process`は、タグを置き換えるhtmlコンテンツを返す必要があります。this` と HonKit API については [Context and APIs](./api.md) を参照してください。

### ブロック引数の扱い

ブロックに引数を渡すことができる。

```
{% tag1 "argument 1", "argument 2", name="Test" %}
これがブロックの本体です。
{% endtag1 %}
```

そして引数は`process`メソッドで簡単にアクセスできます。

```js
module.exports = {
    blocks: {
        tag1: {
            process: function(block) {
                // block.args equals ["argument 1", "argument 2"]
                // block.kwargs equals { "name": "Test" }
            }
        }
    }
};
```

### サブブロックの取り扱い

定義されたブロックは異なるサブブロックに解析することができます。例えばソースを考えてみましょう。

```
{% myTag %}
    本体
    {% subblock1 %}
    サブブロック本体 1
    {% subblock 2 %}
    サブブロック本体 1
{% endmyTag %}
```
