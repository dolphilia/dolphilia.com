# 型定義

型エイリアス（typedefというキーワードで宣言されるためtypedefと呼ばれることが多い）は、型を参照する簡潔な方法である。以下は、IntListという型エイリアスを宣言して使用する例である：

```dart
typedef IntList = List<int>;
IntList il = [1, 2, 3];
```

型エイリアスは型パラメーターを持つことができる：

```dart
typedef ListMapper<X> = Map<X, List<X>>;
Map<String, List<String>> m1 = {}; // 詳細.
ListMapper<String> m2 = {}; // 同じことだが、より短く、より明確に。
```

::: info Version note
2.13以前では、型定義は関数型に限られていた。新しい型定義を使用するには、少なくとも2.13の言語バージョンが必要です。
:::

ほとんどの場面で、関数には型定義ではなくインライン関数型を使うことをお勧めする。しかし、関数の型定義はまだ有用である：

```dart
typedef Compare<T> = int Function(T a, T b);

int sort(int a, int b) => a - b;

void main() {
  assert(sort is Compare<int>); // True!
}