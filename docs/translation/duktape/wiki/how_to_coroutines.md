# コルーチンの使い方

## 基本的な仕組みの簡単な例

スポーン、リジューム、イールドの基本的な仕組みの簡単な例です。

```js
// coroutine.js
function yielder(x) {
    var yield = Duktape.Thread.yield;

    print('yielder starting');
    print('yielder arg:', x);

    print('resumed with', yield(1));
    print('resumed with', yield(2));
    print('resumed with', yield(3));

    print('yielder ending');
    return 123;
}

var t = new Duktape.Thread(yielder);

print('resume test');
print('yielded with', Duktape.Thread.resume(t, 'foo'));
print('yielded with', Duktape.Thread.resume(t, 'bar'));
print('yielded with', Duktape.Thread.resume(t, 'quux'));
print('yielded with', Duktape.Thread.resume(t, 'baz'));
print('finished');
```

dukコマンドラインツールで実行すると、次のように表示されます。

```sh
$ duk coroutine.js
resume test
yielder starting
yielder arg: foo
yielded with 1
resumed with bar
yielded with 2
resumed with quux
yielded with 3
resumed with baz
yielder ending
yielded with 123
finished
```