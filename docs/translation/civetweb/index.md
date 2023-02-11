# CivetWeb

**CivetWeb の公式ホームは GitHub にあります。 [https://github.com/civetweb/civetweb](https://github.com/civetweb/civetweb)**

## プロジェクトミッション

プロジェクトのミッションは、CGI、SSL、Luaをオプションでサポートし、使いやすく、強力な、C（C/C++）組み込み可能なWebサーバーを提供することです。

CivetWebは、MITライセンスなので、制限なくイノベーションを起こすことができます。

CivetWebは、開発者が既存のアプリケーションにWebサーバ機能を追加するためのライブラリとして使用することができます。

また、エンドユーザは、WindowsやLinuxのPC上で動作するスタンドアロンのWebサーバとして使用することができます。CivetWeb は単一の実行ファイルとして提供され、インストールは必要ありません。


## 正式版はどこにあるのですか？

CivetWebのバイナリやリリースは、GitHub [https://github.com/civetweb/civetweb/releases](https://github.com/civetweb/civetweb/releases) またはSourceForgeからダウンロードすることができます。[https://sourceforge.net/projects/civetweb/](https://sourceforge.net/projects/civetweb/)

開発者は、GitHubを通じてCivetWebに貢献することができます。[https://github.com/civetweb/civetweb](https://github.com/civetweb/civetweb)

[Git for Windows V2.24のバグ](https://github.com/git-for-windows/git/issues/2435)のため，CivetWebはそれ以前のバージョンで使用する必要があります（[こちら](https://github.com/civetweb/civetweb/issues/812)もご参照ください）。

バグや要望は、GitHubの[https://github.com/civetweb/civetweb/issues](https://github.com/civetweb/civetweb/issues)

新しいリリースはGoogle Groupsで発表されます。[https://groups.google.com/d/forum/civetweb](https://groups.google.com/d/forum/civetweb)

以前は、サポートに関する質問や議論のスレッドは [Google グループ](https://groups.google.com/d/forum/civetweb) にありました。最近の質問や議論は [GitHub issues](https://github.com/civetweb/civetweb/issues) を利用しています。

ソースリリースはGitHubにあります。[https://github.com/civetweb/civetweb/releases](https://github.com/civetweb/civetweb/releases)

非常に簡単な概要はGitHubのページで見ることができます。[https://civetweb.github.io/civetweb/](https://civetweb.github.io/civetweb/)


## クイックスタートドキュメント

- [docs/Installing.md](https://github.com/civetweb/civetweb/blob/master/docs/Installing.md) - インストールガイド（ビルド済みバイナリを使用するエンドユーザー向け）
- [docs/UserManual.md](https://github.com/civetweb/civetweb/blob/master/docs/UserManual.md) - エンドユーザーガイド
- [docs/Building.md](https://github.com/civetweb/civetweb/blob/master/docs/Building.md) -サーバーの構築（クイックスタートガイド）
- [docs/Embedding.md](https://github.com/civetweb/civetweb/blob/master/docs/Embedding.md) - エンベデッド（既存のアプリケーションにHTTPサポートを追加する方法）
- [docs/OpenSSL.md](https://github.com/civetweb/civetweb/blob/master/docs/OpenSSL.md) - OpenSSLを使用したHTTPS（SSL/TLS）対応の追加。
- [API documentation](https://github.com/civetweb/civetweb/tree/master/docs/api) - civetweb アプリケーションプログラミングインタフェースに関する追加ドキュメント ([civetweb.h](https://github.com/civetweb/civetweb/blob/master/include/civetweb.h)).
- [RELEASE_NOTES.md](https://github.com/civetweb/civetweb/blob/master/RELEASE_NOTES.md) - リリースノート
- [SECURITY.md](https://github.com/civetweb/civetweb/blob/master/SECURITY.md) - セキュリティポリシー
- [LICENSE.md](https://github.com/civetweb/civetweb/blob/master/LICENSE.md) - 著作権使用許諾


## 概要

CivetWebは、厳選された機能リストによって、機能性とシンプルさのバランスを保っています。

- 2013年に[Mongoose](https://code.google.com/p/mongoose/)からフォークされましたが、ライセンスがMITから商用+GPLに変更される前です。その後、多くの機能拡張が追加されています。[RELEASE_NOTES.md](https://github.com/civetweb/civetweb/blob/master/RELEASE_NOTES.md)を参照してください。
- リベラルで寛容、営利を目的としない[MITライセンス](https://en.wikipedia.org/wiki/MIT_License)を維持する。
- プロジェクトはGPLのようなコピーレフト・ライセンスに縛られることなく、イノベーションを起こすべきものだからです。
- Windows、Mac、Linux、UNIX、IOS、Android、Buildroot、その他多くのプラットフォームで動作します。
- スクリプトとデータベースをサポート（CGI、Luaサーバーページ、サーバーサイドLuaスクリプト、Lua SQLiteデータベース、サーバーサイドJavaScript）。これにより、すぐに使える強力なWeb開発プラットフォームが、**依存性のない**シングルクリックの実行ファイルで提供されます。0
- CGI、SSI、HTTPダイジェスト(MD5)認証、WebSocket、WebDAVをサポートしています。
- HTTP/2を実験的にサポート。
- [OpenSSL](https://www.openssl.org/)によるHTTPS(SSL/TLS)に対応しました。
- クライアント側のX.509証明書を使った認証にオプションで対応。
- ダウンロード再開、URLリライト、ファイルブラックリスト、IPベースACL。
- Windowsサービスまたはsystemdサービスとして実行可能です。
- クライアントのサブネットまたはURIパターンに基づくダウンロード速度の制限。
- シンプルでクリーンなエンベッディングAPIです。
- ソースは1ファイルになっており、ドロップインコンパイルが可能です。
- エンベッディングの例を含む。
- 任意の HTTP/HTTPS リクエストを送信できる HTTP クライアント。
- Websocketクライアント機能あり（WS/WSS）。


### オプションで付属のソフトウエア

[![Lua](/resources/lua-logo.jpg "Lua Logo")](https://lua.org)
[![LuaFileSystem](/resources/luafilesystem-logo.jpg "LuaFileSystem Logo")](https://keplerproject.github.io/luafilesystem/)
[![LuaSQLite3](/resources/luasqlite-logo.jpg "LuaSQLite3 Logo")](https://lua.sqlite.org/index.cgi/index)
[![Sqlite3](/resources/sqlite3-logo.jpg "Sqlite3 Logo")](https://sqlite.org)
[![LuaXML](/resources/luaxml-logo.jpg "LuaXML Logo")](https://github.com/n1tehawk/LuaXML)
[![Duktape](/resources/duktape-logo.png "Duktape Logo")](https://duktape.org)


### オプションの依存関係

[zlib](https://zlib.net)

[OpenSSL](https://www.openssl.org/)

[Mbed TLS](https://github.com/ARMmbed/mbedtls)


## サポート

このプロジェクトは、インストールも使用も非常に簡単です。[ドキュメント](https://github.com/civetweb/civetweb/blob/master/docs/)を読み、[サンプル](https://github.com/civetweb/civetweb/blob/master/examples/)を見てください。

最近の質問や議論は通常 [GitHub issues](https://github.com/civetweb/civetweb/issues) を使ってください。古い情報は [メーリングリスト](https://groups.google.com/d/forum/civetweb)にありますが、この情報は古くなっている可能性があります。

バグ、機能要求、質問、提案、またはヒントやコツを共有したい場合は、自由に GitHub issue を作成してください。バグに対して課題を作成する場合、問題を再現するのに十分な説明を追加してください - 少なくともCivetWebのバージョンとオペレーティングシステムを追加してください。コントリビューション](https://github.com/civetweb/civetweb/blob/master/docs/Contribution.md) と [セキュリティポリシー](https://github.com/civetweb/civetweb/blob/master/SECURITY.md) のガイドラインも参照してください。

> 注：リンク先のコンテンツについて、私たちは一切の責任や保証を負いません。  これらのページを訪問したり、コミュニティサポートの提案を試したりすることは、ご自身の責任で行ってください。このプロジェクトで提供されるリンク（ソースやドキュメントを含む）は、その情報が役に立つことを期待して提供されるものです。しかし、外部ページの内容については、一切責任を負いません。


## 貢献度

MITライセンスが適用されているものであれば、コントリビューションを歓迎します。

GPL汚染防止のため、Mongooseからコピーした修正をこのプロジェクトに適用しないでください。2013年以降、CivetWebとMongooseは独立して開発されています。現在ではコードベースが異なるので、パッチを安全に転送することはできません。

いくつかのガイドラインは [docs/Contribution.md](https://github.com/civetweb/civetweb/blob/master/docs/Contribution.md) にあります。


## 著者紹介

CivetWebは、2013年8月にMongooseの最後のMITバージョンからフォークされました。それ以来、CivetWebはさまざまな作者によって多くの改良が加えられています(Copyright (c) 2013-2021 the CivetWeb developers, MIT license)。

作者の一覧は [CREDITS.md](https://github.com/civetweb/civetweb/blob/master/CREDITS.md) にあります。

CivetWebは、[Mongooseプロジェクト](https://github.com/cesanta/mongoose)をベースにしています。Mongooseの原作者はSergey Lyubka(2004-2013)で、MITライセンスのもとで公開されていました。しかし、2013年8月16日に[MongooseはGPL V2＋商用ライセンスのデュアルライセンスに再ライセンスされました](https://groups.google.com/forum/#!topic/mongoose-users/aafbOnHonkI)、CiwetWebは「mongooseのMITフォーク」としてThomas Davis (sunsetbrew) により作成されました。ライセンスの変更と CivetWeb のフォークについては Mongoose [Wikipedia](https://en.wikipedia.org/wiki/Mongoose_(web_server)) のページでも言及されていましたが、そこでは時々削除(そしてまた追加)されているようです。

CivetWeb プロジェクトを使用することで、MIT ライセンスの条項が適用され、ここからソースを得ている限り、このコードのいずれにも GPL が課されないことが保証されます。このコードは、MITライセンスの保護により、フリーであり続けるでしょう。