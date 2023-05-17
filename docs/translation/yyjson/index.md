# はじめに

ANSI Cで書かれた高性能なJSONライブラリです。

# 特徴
- **高速**：最新のCPUでギガバイト/秒のJSONデータの読み書きが可能です。
- **ポータブル**：ANSI C (C89)に準拠しています。
- **標準**：[RFC 8259](https://tools.ietf.org/html/rfc8259)標準に厳密に準拠します。
- **安全性**：完全なJSON形式、数値形式、UTF-8バリデーションを実現。
- **正確さ**: `int64`、`uint64`、`double`の数値を正確に読み書きできる。
- **柔軟性**：無制限のJSONレベル、`u0000`と非ヌル末端文字列をサポートします。
- **拡張可能**：コメント、末尾カンマ、nan/inf、カスタムメモリアロケータを許可するオプションがあります。
- **開発者に優しい**: `h` と `c` ファイルが1つだけなので、簡単に統合できます。

# 制限事項
- 配列やオブジェクトはリンクリストのような[データ構造](https://ibireme.github.io/yyjson/doc/doxygen/html/md_doc__data_structure.html)として格納されており、インデックスやキーで要素にアクセスすることはイテレータよりも遅いです。
- オブジェクトはキーの複製が可能で、キーの順序は保持される。
- JSONのパース結果は不変であり、変更には「不変コピー」が必要である。

# パフォーマンス
ベンチマークプロジェクトとデータセット[yyjson_benchmark](https://github.com/ibireme/yyjson_benchmark)

simdjsonの新しい`On Demand` APIは、ほとんどのJSONフィールドがコンパイル時に既知であれば、より高速です。
このベンチマークプロジェクトはDOM APIのみをチェックしており、新しいベンチマークは後で追加される予定です。

#### AWS EC2 (AMD EPYC 7R32, gcc 9.3)

|twitter.json|parse (GB/s)|stringify (GB/s)|
|---|---|---|
|yyjson(insitu)|1.80|1.51|
|yyjson|1.72|1.42|
|simdjson|1.52|0.61|
|sajson|1.16|   |
|rapidjson(insitu)|0.77|   |
|rapidjson(utf8)|0.26|0.39|
|cjson|0.32|0.17|
|jansson|0.05|0.11|


#### iPhone (Apple A14, clang 12)

|twitter.json|parse (GB/s)|stringify (GB/s)|
|---|---|---|
|yyjson(insitu)|3.51|2.41|
|yyjson|2.39|2.01|
|simdjson|2.19|0.80|
|sajson|1.74||
|rapidjson(insitu)|0.75| |
|rapidjson(utf8)|0.30|0.58|
|cjson|0.48|0.33|
|jansson|0.09|0.24|

インタラクティブチャートによるベンチマークレポートの充実（2020-12-12更新）

|Platform|CPU|Compiler|OS|Report|
|---|---|---|---|---|
|Intel NUC 8i5|Core i5-8259U|msvc 2019|Windows 10 2004|[Charts](https://ibireme.github.io/yyjson_benchmark/reports/Intel_NUC_8i5_msvc_2019.html)|
|Intel NUC 8i5|Core i5-8259U|clang 10.0|Ubuntu 20.04|[Charts](https://ibireme.github.io/yyjson_benchmark/reports/Intel_NUC_8i5_clang_10.html)|
|Intel NUC 8i5|Core i5-8259U|gcc 9.3|Ubuntu 20.04|[Charts](https://ibireme.github.io/yyjson_benchmark/reports/Intel_NUC_8i5_gcc_9.html)|
|AWS EC2 c5a.large|AMD EPYC 7R32|gcc 9.3|Ubuntu 20.04|[Charts](https://ibireme.github.io/yyjson_benchmark/reports/EC2_c5a.large_gcc_9.html)|
|AWS EC2 t4g.medium|Graviton2 (ARM64)|gcc 9.3|Ubuntu 20.04|[Charts](https://ibireme.github.io/yyjson_benchmark/reports/EC2_t4g.medium_gcc_9.html)|
|Apple iPhone 12 Pro|A14 (ARM64)|clang 12.0|iOS 14|[Charts](https://ibireme.github.io/yyjson_benchmark/reports/Apple_A14_clang_12.html)|

### より良いパフォーマンスのために、yyjsonは以下のものを好みます：
* 最新のプロセッサで
    * 高い命令レベル並列性
    * 優れた分岐予測機能
    * 不整列メモリアクセスに対する低いペナルティ
* 優れたオプティマイザーを備えた最新のコンパイラー。


# サンプルコード

### JSON文字列を読み込む
```c
const char *json = "{\"name\":\"Mash\",\"star\":4,\"hits\":[2,2,1,3]}";

// JSONを読み込んでrootを取得する
yyjson_doc *doc = yyjson_read(json, strlen(json), 0);
yyjson_val *root = yyjson_doc_get_root(doc);

// root["name"]を取得
yyjson_val *name = yyjson_obj_get(root, "name");
printf("name: %s\n", yyjson_get_str(name));
printf("name length:%d\n", (int)yyjson_get_len(name));

// root["star"]を取得
yyjson_val *star = yyjson_obj_get(root, "star");
printf("star: %d\n", (int)yyjson_get_int(star));

// root["hits"]を取得し、配列を反復処理する。
yyjson_val *hits = yyjson_obj_get(root, "hits");
size_t idx, max;
yyjson_val *hit;
yyjson_arr_foreach(hits, idx, max, hit) {
    printf("hit%d: %d\n", (int)idx, (int)yyjson_get_int(hit));
}

// docを解放する
yyjson_doc_free(doc);

// すべての関数はNULL入力を受け入れ、エラー時にはNULLを返します。
```

### JSON文字列を書き込む
```c
// ミュータブルなdocを作成する
yyjson_mut_doc *doc = yyjson_mut_doc_new(NULL);
yyjson_mut_val *root = yyjson_mut_obj(doc);
yyjson_mut_doc_set_root(doc, root);

// root["name"]とroot["star"]を設定する。
yyjson_mut_obj_add_str(doc, root, "name", "Mash");
yyjson_mut_obj_add_int(doc, root, "star", 4);

// root["hits"]を配列で設定する。
int hits_arr[] = {2, 2, 1, 3};
yyjson_mut_val *hits = yyjson_mut_arr_with_sint32(doc, hits_arr, 4);
yyjson_mut_obj_add_val(doc, root, "hits", hits);

// 文字列へ、ミニ化
const char *json = yyjson_mut_write(doc, 0, NULL);
if (json) {
    printf("json: %s\n", json); // {"name":"Mash","star":4,"hits":[2,2,1,3]}
    free((void *)json);
}

// ドックを解放する
yyjson_mut_doc_free(doc);
```

### JSONファイルをオプションで読み込む
```c
// コメントと末尾のカンマを許容してJSONファイルを読み込む。
yyjson_read_flag flg = YYJSON_READ_ALLOW_COMMENTS | YYJSON_READ_ALLOW_TRAILING_COMMAS;
yyjson_read_err err;
yyjson_doc *doc = yyjson_read_file("/tmp/config.json", flg, NULL, &err);

// ルートオブジェクトを反復処理する
if (doc) {
    yyjson_val *obj = yyjson_doc_get_root(doc);
    yyjson_obj_iter iter;
    yyjson_obj_iter_init(obj, &iter);
    yyjson_val *key, *val;
    while ((key = yyjson_obj_iter_next(&iter))) {
        val = yyjson_obj_iter_get_val(key);
        printf("%s: %s\n", yyjson_get_str(key), yyjson_get_type_desc(val));
    }
} else {
    printf("read error (%u): %s at position: %ld\n", err.code, err.msg, err.pos);
}

// docを解放する
yyjson_doc_free(doc);
```

### オプションでJSONファイルを書く
```c
// JSONファイルをミュータブルドックとして読み込む
yyjson_doc *idoc = yyjson_read_file("/tmp/config.json", 0, NULL, NULL);
yyjson_mut_doc *doc = yyjson_doc_mut_copy(idoc, NULL);
yyjson_mut_val *obj = yyjson_mut_doc_get_root(doc);

// ルートオブジェクトのNULL値を削除する
yyjson_mut_obj_iter iter;
yyjson_mut_obj_iter_init(obj, &iter);
yyjson_mut_val *key, *val;
while ((key = yyjson_mut_obj_iter_next(&iter))) {
    val = yyjson_mut_obj_iter_get_val(key);
    if (yyjson_mut_is_null(val)) {
        yyjson_mut_obj_iter_remove(&iter);
    }
}

// jsonをきれいに書く、unicodeをエスケープする
yyjson_write_flag flg = YYJSON_WRITE_PRETTY | YYJSON_WRITE_ESCAPE_UNICODE;
yyjson_write_err err;
yyjson_mut_write_file("/tmp/config.json", doc, flg, NULL, &err);
if (err.code) {
    printf("write error (%u): %s\n", err.code, err.msg);
}

// docを解放する
yyjson_doc_free(idoc);
yyjson_mut_doc_free(doc);
```

# ドキュメンテーション
* [ホームページ](https://ibireme.github.io/yyjson/doc/doxygen/html/)
    * [ビルドとテスト](https://ibireme.github.io/yyjson/doc/doxygen/html/md_doc__build_and_test.html)
    * [APIとサンプルコード](https://ibireme.github.io/yyjson/doc/doxygen/html/md_doc__a_p_i.html)
    * [データ構造](https://ibireme.github.io/yyjson/doc/doxygen/html/md_doc__data_structure.html)
    * [チェンジログ](https://ibireme.github.io/yyjson/doc/doxygen/html/md__c_h_a_n_g_e_l_o_g.html)

# TODO
* [x] ドキュメントページを追加する。
* [x] CIとcodecovのためのGitHubワークフローを追加。
* [x] テストの追加：valgrind、sanitizer。
* [x] ドキュメントから値を問い合わせるためのJSONポインタをサポートします。
* [x] ファザーを追加する。
* [x] JSON リーダとライタに `RAW` 型を追加した。
* [ ] JSONリーダー、ライターのストリーミングAPIを追加。
* [ ] パフォーマンスに関するドキュメントを追加する。
* [ ] 32ビットプロセッサー用にパフォーマンスを最適化します。

# ライセンス
このプロジェクトはMITライセンスで公開されています。
