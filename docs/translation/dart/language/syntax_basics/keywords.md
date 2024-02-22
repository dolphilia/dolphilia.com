# キーワード

次の表は、Dart言語が特別に扱う単語の一覧です。

|||||
|-|-|-|-|
| abstract   | else                 | import     | show    |
| as         | enum                 | in                | static  |
| assert            | export        | interface  | super          |
| async      | extends              | is                | switch         |
| await      | extension     | late       | sync    |
| base       | external      | library    | this           |
| break             | factory       | mixin      | throw          |
| case              | false                | new               | true           |
| catch             | final (variable)     | null              | try            |
| class             | final (class) | on         | type    |
| const             | finally              | operator   | typedef |
| continue          | for                  | part       | var            |
| covariant  | Function      | required   | void           |
| default           | get           | rethrow           | when           |
| deferred   | hide          | return            | while          |
| do                | if                   | sealed     | with           |
| dynamic    | implements    | set        | yield   |

これらの単語を識別子として使うことは避ける。ただし、必要に応じて、上付き文字でマークされたキーワードを識別子にすることができる：

- 上付き文字1の単語は文脈キーワードで、特定の場所でのみ意味を持つ。これらはどこでも有効な識別子である。
- 上付き文字2の単語は組み込み識別子です。これらのキーワードはほとんどの場所で有効な識別子ですが、クラス名や型名、インポート接頭辞としては使えません。
- 上付き文字3は、非同期サポートに関連する限定予約語です。awaitやyieldは、async、async*、sync*でマークされた関数本体では識別子として使用できません。

表中の他の単語はすべて予約語であり、識別子にすることはできません。