# 電子ブックやPDFの生成

HonKitはウェブサイトを生成するだけでなく、電子書籍（ePub・Mobi・PDF）としてコンテンツを出力することができます。

```
# Generate a PDF file
$ honkit pdf ./ ./mybook.pdf

# Generate an ePub file
$ honkit epub ./ ./mybook.epub

# Generate a Mobi file
$ honkit mobi ./ ./mybook.mobi
```

### ebook-convertのインストール

電子書籍(epub, mobi, pdf)を生成するには`ebook-convert`が必要です。

##### OS X

[キャリバーアプリケーション](https://calibre-ebook.com/download)をダウンロードします。`calibre.app`をアプリケーションフォルダに移動した後、電子書籍変換ツールへのシンボリックリンクを作成します。

```
$ sudo ln -s /Applications/calibre.app/Contents/MacOS/ebook-convert /usr/local/bin
```

`usr/bin` は、$PATH にある任意のディレクトリに置き換えることができます。

### カバー

カバーはすべての電子書籍のフォーマットに使用されています。

表紙を付けるには、本のルートディレクトリに **`cover.jpg`** ファイルを配置します。**cover_small.jpg`**を追加すると、より小さいバージョンの表紙を指定することができます。表紙は **JPEG** ファイルである必要があります。

良い表紙は、以下のガイドラインを尊重する必要があります。

* サイズは `cover.jpg` が1800x2360ピクセル、 `cover_small.jpg` が200x262ピクセルです。
* ボーダーなし
* 書籍のタイトルがはっきりと見える
* 重要なテキストは小さなバージョンで表示されるようにします。
