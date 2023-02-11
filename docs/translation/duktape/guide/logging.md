
## ロギング {#logging}

Duktapeの配布物には、小さなフットプリントと適度なパフォーマンス、そしてリダイレクト可能な出力を持つロギング・フレームワークが含まれています。このフレームワークはDuktape 1.xではビルトインでしたが、Duktape 2.xではオプションとして追加されました。

基本的な使用例です。

```javascript
var val1 = 'foo';
var val2 = 123;
var val3 = new Date(123456789e3);

var logger = new Duktape.Logger();  // or new Duktape.Logger('logger name')
logger.info('three values:', val1, val2, val3);
```


この例では、以下のような内容が標準エラー出力に出力されます。

```sh
2014-10-17T19:26:42.141Z INF test.js: three values: foo 123 1973-11-29 23:33:09.000+02:00
```


詳しくはWikiの記事How to use loggingとlogging.rstを参照してください。


