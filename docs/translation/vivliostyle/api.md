# Core API リファレンス

[[TOC]]

## constants

### `constants.PageProgression`

Enum `PageProgression` はページ進行の方向を表す。`PageProgression` はメンバとして `LTR` と `RTL` を持つ。

### `constants.PageSide`

Enum `PageSide` はページのサイドを表す。`PageSide` にはメンバとして `LEFT` と `RIGHT` が存在する。

### `constants.ReadyState`

Enum `ReadyState` はビューワの準備状態を表す。`ReadyState` はメンバとして `LOADING`、`INTERACTIVE`、`COMPLETE` を持っている。

## plugin

### `plugin.registerHook(name, fn)`

指定された名前のフックに関数を登録します。登録された関数は、コアコードから適切なタイミングで呼び出されます。関数に渡される引数はフックに依存する。複数の関数が登録されている場合、登録された順番に呼び出される。

###### パラメータ

- `name` (string) — フックの名称
- `fn` (function) — フックに登録する関数。

### `plugin.removeHook(name, fn)`

同じ関数が複数回登録されていても、最初に登録されたものだけを削除します。

###### パラメータ

- `name` (string) — フックの名称
- `fn` (function) — フックから取り外す機能

## profile

### `profile.profiler.registerStartTiming(name, timestamp)`

あるイベントの開始タイミングを登録する。

###### パラメータ

- `name` (string) — イベントの名称
- `timestamp` (number, optional) — 指定された場合、"now "ではなく、実際のイベントのタイムスタンプとして使用される。

### `profile.profiler.registerEndTiming(name, timestamp)`

あるイベントの終了タイミングを登録する。

###### パラメータ

- `name` (string) — イベントの名称
- `timestamp` (number, optional) — 指定された場合、"now "ではなく、実際のイベントのタイムスタンプとして使用される。

### `profile.profiler.printTimings()`

登録した時間（開始／終了／継続）を記録します。
数値はすべてms単位で表示されます。

### `profile.profiler.disable()`

プロファイリングを無効にする。

### `profile.profiler.enable()`

プロファイリングを有効にする。

## core-viewer

### `new CoreViewer(settings, options)`

VivliostyleのCoreViewerクラスです。[`CoreViewer`](#coreviewer)を作成します。

###### パラメータ

- `settings` ([CoreViewerSettings](#coreviewersettings))
- `options` ([CoreViewerOptions](#corevieweroptions), optional)

### `PageViewMode`

Enum `PageViewMode`.
`PageViewMode` はメンバ `SINGLE_PAGE`、`SPREAD` および `AUTO_SPREAD` を持っています。

### `ZoomType`

Enum `ZoomType`.
`ZoomType` のメンバは `FIT_INSIDE_VIEWPORT` のみである。

## Classes

### `CoreViewer`

#### `CoreViewer.addListener(type, listener)`

指定されたタイプのイベントがディスパッチされたときに呼び出されるリスナー関数を追加します。

###### パラメータ

- `type` (string) — イベントの種類
- `listener` (function) — リスナー機能。

### `CoreViewer.getCurrentPageProgression()`

ビューアの現在のページ進行を返す。ドキュメントが読み込まれていない場合は、null を返す。

###### 戻り値

[PageProgression](#constantspageprogression)

### `CoreViewer.getPageSizes()`

###### 戻り値

Array<{width: number, height: number}>

### `CoreViewer.isTOCVisible()`

TOCが表示されている場合はtrue、非表示の場合はfalse、TOCが利用できない場合はnullを返す。

### `CoreViewer.loadDocument(singleDocumentOptions, documentOptions, viewerOptions)`

Load an HTML or XML document(s).

###### パラメータ

- `singleDocumentOptions` ([SingleDocumentOptions](#singledocumentoptions)|Array<[SingleDocumentOptions](#singledocumentoptions)>)
- `documentOptions` ([DocumentOptions](#documentoptions), optional)
- `viewerOptions` ([CoreViewerOptions](#corevieweroptions), optional)

### `CoreViewer.loadPublication(pubURL, documentOptions, viewerOptions)`

EPUB/WebPub出版物を読み込む。

###### パラメータ

- `pubURL` (string)
- `documentOptions` ([DocumentOptions](#documentoptions), optional)
- `viewerOptions` ([CoreViewerOptions](#corevieweroptions), optional)

### `CoreViewer.navigateToInternalUrl()`

指定された内部URLに移動する。

### `CoreViewer.navigateToPage()`

指定したページに移動します。

### `CoreViewer.queryZoomFactor(type)`

指定されたズームタイプに対応するズームファクターを返します。

###### パラメータ

- `type` ([ZoomType](#zoomtype))

###### 戻り値

number

### `CoreViewer.removeListener(type, listener)`

イベントリスナーを削除する。

###### パラメータ

- `type` (string) — Event type.
- `listener` (function) — Listener function.

### `CoreViewer.setOptions(options)`

ビューアにCoreViewerOptionsを設定します。

###### パラメータ

- `options` ([CoreViewerOptions](#corevieweroptions))

### `CoreViewer.showTOC(opt_show, opt_autohide)`

TOCボックスの表示／非表示

###### パラメータ

- `opt_show` (boolean) - trueの場合、TOCを表示し、falseの場合、TOCを隠します。nullまたは未定義の場合、TOCをトグルします。
- `opt_autohide` (boolean) - trueの場合、TOCアイテムをクリックすると自動的に非表示になります。

## TypeDefs

### `DocumentOptions`

表示されている文書に対するオプション。

- `documentObject` (Document, optional) — ドキュメントのためのドキュメントオブジェクト。提供された場合、ソースを再度パースすることなく直接使用されます。
- `fragment` (string, optional) — 文書中の表示したい位置の断片化識別子（EPUB CFI）。
- `authorStyleSheet` (`Array<string>`, optional) — ドキュメントから参照されるすべての作成者スタイルシートの後に注入される作成者スタイルシートの配列。単一のスタイルシートは、スタイルシートのURLまたはスタイルシートのテキストコンテンツである可能性があります。
- `userStyleSheet` (`Array<string>`, optional) — 注入されるユーザスタイルシートの配列。一つのスタイルシートは、スタイルシートのURLまたはスタイルシートのテキストコンテンツである可能性があります。

### `SingleDocumentOptions`

単一のソースドキュメントに対するオプション。
`SingleDocumentOptions` は以下のメンバを持つオブジェクトであり、そうでなければ `url` を表す文字列である。

- `url` (string) — ドキュメントのURL。
- `startPage` (number, optional) — 指定された場合、ドキュメントの最初のページで `page` ページベースのカウンタが指定された値に設定されます。これは、そのページで `counter-reset: page [specified value - 1]` と指定することと同じである。
- `skipPagesBefore` (number, optional) — 指定された場合、ドキュメントの最初のページのページベースのカウンターを更新する前に、 `page` ページベースのカウンターは指定された値だけ増分されます。このオプションは次の場合には無視されます。`startPageNumber` オプションも指定されます。

### `CoreViewerSettings`

CoreViewerのコンストラクタに渡す必要があるCoreViewerの設定です。

- `viewportElement` (HTMLElement, **required**) — 表示コンテンツのビューポートとして使用される要素。
- `userAgentRootURL` (string, optional) — ビューアリソースファイル（ソースリポジトリの resources/ ディレクトリ以下）が提供されるディレクトリの URL。
- `window` (Window, optional) — ウィンドウオブジェクト。省略された場合は、現在の `window` が使用されます。
- `debug` (boolean, optional) — デバッグフラグ。

### `CoreViewerOptions`

Viewer オブジェクトを構築した後に設定可能な Viewer オプション。

- `autoResize` (boolean, optional) — ウィンドウのサイズ変更時にレイアウトを再実行する default: true
- `fontSize` (number, optional) — デフォルトのフォントサイズ（px） デフォルト：16
- `pageBorderWidth` (number, optional) — 見開きの2ページ間の境界の幅（px）。見開き表示モード時のみ有効 デフォルト：1
- `renderAllPages` (boolean, optional) — ドキュメントロード時に全ページをレンダリングする default: true
- `pageViewMode` (PageViewMode, optional) — ページ表示モード（singlePage / spread / autoSpread）デフォルト：singlePage
- `zoom` (number, optional) — ページを表示する際のズーム倍率。
- `fitToScreen` (boolean, optional) — 画面に合わせた倍率の自動調整 default: false
- `defaultPaperSize` ({width: number, height: number}, optional) — デフォルトの用紙サイズをpxで指定します。page sizeがautoに設定されている場合に有効。デフォルト：undefined（ウィンドウズサイズを用紙サイズとして使用することを意味する）。

## print

### `printHTML`

Webサイト内で印刷する際に、元のレイアウトを崩すことなくvivliostyleでページレイアウトが可能

```js
import { printHTML } from '@vivliostyle/core';

const htmlDoc = `<!doctype html>
<html>
    <head>
        <style>
        ... Add your CSS code here ...
        </style>
    </head>
    <body>
        ... Add your HTML code here ...
    </body>
</html>`;

const config = {
  title: 'My printed page',
  printCallback: (iframeWin) => iframeWin.print(), // optional: only needed if calling something other than window.print() for printing.
};

printHTML(htmlDoc, config);
```