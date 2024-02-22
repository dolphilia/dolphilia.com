# ミックスイン

ミックスインは、複数のクラス階層で再利用できるコードを定義する方法である。メンバの実装を一括して提供することを目的としています。

ミックスインを使用するには、with キーワードの後に 1 つ以上のミックスイン名を続けます。次の例では、ミックスインを使用する 2 つのクラスを示します：

```dart
class Musician extends Performer with Musical {
  // ···
}

class Maestro extends Person with Musical, Aggressive, Demented {
  Maestro(String maestroName) {
    name = maestroName;
    canConduct = true;
  }
}
```

mixin を定義するには mixin 宣言を使います。まれに、mixinとクラスの両方を定義する必要がある場合は、 mixin class 宣言を使用します。

また、生成コンストラクタを宣言してはいけません。

例えば:

```dart
mixin Musical {
  bool canPlayPiano = false;
  bool canCompose = false;
  bool canConduct = false;

  void entertainMe() {
    if (canPlayPiano) {
      print('Playing piano');
    } else if (canConduct) {
      print('Waving hands');
    } else {
      print('Humming to self');
    }
  }
}
```

mixinを使用できる型を制限したい場合があります。たとえば、mixin が定義していないメソッドを呼び出せるかどうかに依存するような場合です。次の例で示すように、on キーワードを使用して必要なスーパークラスを指定することで、mixin の使用を制限することができます：

```dart
class Musician {
  // ...
}
mixin MusicalPerformer on Musician {
  // ...
}
class SingerDancer extends Musician with MusicalPerformer {
  // ...
}
```

先のコードでは、Musician クラスを継承または実装したクラスだけが、MusicalPerformer ミキシンを使用できます。SingerDancer は Musician を継承しているので、SingerDancer は MusicalPerformer をミックスすることができます。

## class, mixin, または mixin class?

::: info Version note
mixinクラスの宣言には、少なくとも3.0以上の言語バージョンが必要です。
:::

mixin宣言はmixinを定義する。クラス宣言はクラスを定義します。mixin クラス宣言は、通常のクラスとしても mixin としても使えるクラスを定義します。

クラスやミックスインに適用される制限は、ミックスイン・クラスにも適用されます：

- mixinはextends句やwith句を持つことができないので、mixinクラスも持つことができない。
- クラスはon節を持つことができないので、mixinクラスもon節を持つことができない。

## abstract mixin クラス

onディレクティブと似たような動作をmixinクラスでも実現できます。mixinクラスを抽象化し、その動作が依存する抽象メソッドを定義します：

```dart
abstract mixin class Musician {
  // No 'on' clause, but an abstract method that other types must define if 
  // they want to use (mix in or extend) Musician: 
  void playInstrument(String instrumentName);

  void playPiano() {
    playInstrument('Piano');
  }
  void playFlute() {
    playInstrument('Flute');
  }
}

class Virtuoso with Musician { // Use Musician as a mixin
  void playInstrument(String instrumentName) {
    print('Plays the $instrumentName beautifully');
  }  
} 

class Novice extends Musician { // Use Musician as a class
  void playInstrument(String instrumentName) {
    print('Plays the $instrumentName poorly');
  }  
}
```

Musician  mixin を abstractと宣言することで、それを使用するすべての型に、その動作が依存する抽象メソッドを定義させることができます。

これは、onディレクティブが、mixinが依存するインターフェースのスーパークラスを指定することで、そのインターフェースにアクセスできるようにするのと似ています。