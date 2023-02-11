# ((o)) Duktape Wiki

[原文](https://wiki.duktape.org/home)

Duktapeの公式Wikiへようこそ!

## ドキュメンテーション

- [Duktapeプログラミングガイド](https://dolphilia.github.io/japanese_translation/duktape/guide/): http://duktape.org/guide.html - 過去のバージョン: 1.5 1.4 1.3 1.2 1.1 1.0
- [Duktape APIリファレンス](https://dolphilia.github.io/japanese_translation/duktape/api/): http://duktape.org/api.html - 過去のバージョン: 1.5 1.4 1.3 1.2 1.1 1.0


## はじめに

- [ライン処理](process_lines.md)
- [プライマリーテスト](prime_test.md)


## How-To

- [致命的なエラーの処理方法](how_to_handle_fatal_errors.md)
- [値スタック型の扱い方](how_to_work_with_calue_stack_types.md)
- [関数呼び出しの方法](how_to_make_function_calls.md)
- [仮想プロパティの使い方](how_to_use_virtual_properties.md)
- [ファイナライゼーションの使い方](how_to_use_finalization.md)
- バッファの扱い方 (Duktape 1.x、[Duktape 2.x](how_to_work_with_buffers_in_duktape_2x.md))
- [lightfuncsの使い方](how_to_work_with_lightfuncs.md)
- [モジュールの使い方](how_to_modules.md)
- [コルーチンの使い方](how_to_coroutines.md)
- [ロギングの使い方](how_to_use_logging.md)
- [ネイティブコードでオブジェクト参照を持続させる方法](how_to_persist_object_references_in_native_code.md)
- [ネイティブのコンストラクタ関数の書き方](how_to_write_a_native_constructor_function.md)
- [配列の反復処理](how_to_iterate_over_an_array.md)
- [エラー・オブジェクトを拡張する](how_to_augment_error_objects.md)
- [Duktapeバイトコードのデコード方法](how_to_decode_duktape_bytecode.md)
- [非BMP文字を扱うには](how_to_work_with_non-bmp_characters.md)
- [グローバル・オブジェクトへの参照を取得する方法](how_to_get_a_reference_to_the_global_object.md)
- [ベアメタルプラットフォームで動作させる方法](how_to_run_on_bare_metal_platforms.md)
- [デバッグ・プリントを有効にする方法](how_to_enable_debug_prints.md)
- [Duktape用のエディターを設定する方法](how_to_configure_your_editor_for_duktape.md)


## よくある質問

- [Duktapeを開発するための設定](development_setup_for_developing_duktape.md)
- [トラブルシューティングの基本](troubleshooting_basics.md)
- [内部プロトタイプと外部プロトタイプ](internal_and_external_prototype.md)
- [API Cタイプ](api_c_types.md)
- [ES5以降の機能](post-es5_features.md)


## コンフィグと機能オプション

- [ビルドのためのDuktapeの設定](congifuring_duktape_for_build.md)
- duk_config.h で使用される[設定オプション](config_options.md) (DUK_USE_xxx)
- コンパイラのコマンドラインオプションとして使用される機能オプション (DUK_OPT_XXX) (Duktape 1.3 まで), https://github.com/svaarala/duktape/tree/master/config/feature-options を参照。


## 移植性と互換性

- 様々なコンパイラとターゲットに対する[移植性](portability.md)の注意、コンパイルとトラブルシューティングのヒント
- プラットフォーム
- アーキテクチャー
- コンパイラ
- 標準ライブラリ: musl, uclibc
- [TypeScriptとの互換性](compatibility_with_typescript.md)


## パフォーマンス

- http://duktape.org/benchmarks.html
- [パフォーマンスを最適化する方法](how_to_optimize_performance.md)
- Duktape 1.3.0のパフォーマンス測定
- Duktape 1.4.0のパフォーマンス測定
- Duktape 1.5.0のパフォーマンス測定
- Duktape 2.0.0のパフォーマンス測定
- Duktape 2.1.0のパフォーマンス測定
- Duktape 2.2.0のパフォーマンス測定
- Duktape 2.3.0の性能測定
- Duktape 2.4.0のパフォーマンス測定
- Duktape 2.5.0のパフォーマンス測定


## ロー・メモリの最適化

- ロー・メモリー環境: low-memory.rst
- ローメモリ設定オプションの提案: low-memory.yaml
- ハイブリッドプールアロケータの例: alloc-hybrid


## その他

- [Duktapeを使ったプロジェクト](projects_using_duktape.md)
- [デバッグ・クライアント](debug_clients.md)


## 寄稿、著作権、ライセンス

- https://github.com/svaarala/duktape-wiki