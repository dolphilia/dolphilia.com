# pygameリファレンス

## ショートカット

- よく使うもの:
    - Color
    - display
    - draw
    - event
    - font
    - image
    - key
    - locals
    - mixer
    - mouse
    - Rect
    - Surface
    - time
    - music
    - pygame
- 高度なもの:
    - cursors
    - joystick
    - mask
    - sprite
    - transform
    - BufferProxy
    - freetype
    - gfxdraw
    - midi
    - PixelArray
    - pixelcopy
    - sndarray
    - surfarray
    - math
- その他:
    - camera
    - context
    - controller
    - examples
    - fastevent
    - scrap
    - tests
    - touch
    - version


## よく使うもの:

### Color

色表現オブジェクト

|            API             |                     説明                     |
| -------------------------- | -------------------------------------------- |
| pygame.Color.r             | Color の赤の値を取得または設定する。         |
| pygame.Color.g             | Color の緑の値を取得または設定する。         |
| pygame.Color.b             | Color の青色の値を取得または設定する。       |
| pygame.Color.a             | Color のアルファ値を取得または設定する。     |
| pygame.Color.cmy           | Color の CMY 表現を取得または設定する。      |
| pygame.Color.hsva          | Color の HSVA 表現を取得または設定します。   |
| pygame.Color.hsla          | Color の HSLA 表現を取得または設定する。     |
| pygame.Color.i1i2i3        | Color の I1I2I3 表現を取得または設定する。   |
| pygame.Color.normalize     | Color の正規化された RGBA 値を返します。     |
| pygame.Color.correct_gamma | カラーに特定のガンマ値を適用します。         |
| pygame.Color.set_length    | Colorの要素数を1,2,3,4で設定します。         |
| pygame.Color.lerp          | 指定されたColorへの線形補間を返します。      |
| pygame.Color.premul_alpha  | r,g,b 成分にアルファ値を乗じた色を返します。 |
| pygame.Color.update        | 色の要素を設定する                           |

### display

ディスプレイウィンドウとスクリーンを制御する

|                 API                  |                           説明                           |
| ------------------------------------ | -------------------------------------------------------- |
| pygame.display.init                  | ディスプレイモジュールの初期化                           |
| pygame.display.quit                  | ディスプレイモジュールの初期化を解除する                 |
| pygame.display.get_init              | 表示モジュールが初期化された場合、True を返します。      |
| pygame.display.set_mode              | 表示用のウィンドウや画面を初期化する                     |
| pygame.display.get_surface           | 現在設定されている表示面への参照を取得する               |
| pygame.display.flip                  | フルディスプレイのSurfaceをスクリーンにアップデート      |
| pygame.display.update                | ソフトウェア表示用画面の一部を更新                       |
| pygame.display.get_driver            | pygameディスプレイバックエンドの名前を取得します。       |
| pygame.display.Info                  | 映像表示情報オブジェクトの作成                           |
| pygame.display.get_wm_info           | 現在のウィンドウシステムに関する情報を取得する           |
| pygame.display.get_desktop_sizes     | アクティブなデスクトップのサイズを取得                   |
| pygame.display.list_modes            | 利用可能なフルスクリーンモードの一覧を取得する           |
| pygame.display.mode_ok               | ディスプレイモードに最適な色深度を選ぶ                   |
| pygame.display.gl_get_attribute      | 現在のディスプレイのOpenGLフラグの値を取得します。       |
| pygame.display.gl_set_attribute      | 表示モードのOpenGL表示属性を要求する                     |
| pygame.display.get_active            | 画面上に表示されているとき、True を返す。                |
| pygame.display.iconify               | 表示面のアイコン化                                       |
| pygame.display.toggle_fullscreen     | フルスクリーン表示とウィンドウ表示の切り替え             |
| pygame.display.set_gamma             | ハードウェアガンマランプの変更                           |
| pygame.display.set_gamma_ramp        | カスタムルックアップによるハードウェアガンマランプの変更 |
| pygame.display.set_icon              | 表示ウィンドウのシステムイメージを変更する               |
| pygame.display.set_caption           | 現在のウィンドウのキャプションを設定する                 |
| pygame.display.get_caption           | 現在のウィンドウのキャプションを取得する                 |
| pygame.display.set_palette           | インデックス表示用カラーパレットの設定                   |
| pygame.display.get_num_displays      | 表示件数を返す                                           |
| pygame.display.get_window_size       | ウィンドウまたは画面の大きさを返す                       |
| pygame.display.get_allow_screensaver | スクリーンセーバーの実行を許可するかどうかを返す。       |
| pygame.display.set_allow_screensaver | スクリーンセーバーの実行可否を設定する                   |

### draw

図形を描く

|         API         |                                 説明                                 |
| ------------------- | -------------------------------------------------------------------- |
| pygame.draw.rect    | 矩形を描く                                                           |
| pygame.draw.polygon | 多角形を描く                                                         |
| pygame.draw.circle  | 円を描く                                                             |
| pygame.draw.ellipse | だ円を描く                                                           |
| pygame.draw.arc     | えんちょうせんをひく                                                 |
| pygame.draw.line    | 直線を引く                                                           |
| pygame.draw.lines   | 複数の連続した直線を引く                                             |
| pygame.draw.aaline  | アンチエイリアスの直線を描く                                         |
| pygame.draw.aalines | アンチエイリアスのかかった連続した複数の直線セグメントを描画します。 |

### event

イベントとキューを操作する

|           API            |                                  説明                                  |
| ------------------------ | ---------------------------------------------------------------------- |
| pygame.event.pump        | pygame のイベントハンドラを内部で処理する                              |
| pygame.event.get         | キューからイベントを取得する                                           |
| pygame.event.poll        | キューから1つのイベントを取得する                                      |
| pygame.event.wait        | 待ち行列から単一のイベントを待つ                                       |
| pygame.event.peek        | イベントタイプがキューで待機しているかどうかのテスト                   |
| pygame.event.clear       | キューからすべてのイベントを削除する                                   |
| pygame.event.event_name  | イベントIDから文字列名を取得する                                       |
| pygame.event.set_blocked | どのイベントをキューに入れるかを制御する                               |
| pygame.event.set_allowed | どのイベントをキューに入れるかを制御する                               |
| pygame.event.get_blocked | ある種のイベントがキューからブロックされているかどうかをテストします。 |
| pygame.event.set_grab    | 他のアプリケーションとの入力デバイスの共有制御                         |
| pygame.event.get_grab    | プログラムが入力デバイスを共有しているかどうかをテストする             |
| pygame.event.post        | 新しいイベントをキューに入れる                                         |
| pygame.event.custom_type | カスタムユーザイベントタイプの作成                                     |
| pygame.event.Event       | イベントを表現するための pygame オブジェクト。                         |

### font

フォントの読み込みとレンダリング

|               API               |                      説明                      |
| ------------------------------- | ---------------------------------------------- |
| pygame.font.init                | フォントモジュールの初期化                     |
| pygame.font.quit                | フォントモジュールの非初期化                   |
| pygame.font.get_init            | フォントモジュールが初期化されている場合はtrue |
| pygame.font.get_default_font    | デフォルトフォントのファイル名を取得する       |
| pygame.font.get_sdl_ttf_version | SDL_ttf のバージョンを取得します。             |
| pygame.font.get_fonts           | すべての利用可能なフォントを取得する           |
| pygame.font.match_font          | システム上で特定のフォントを見つける           |
| pygame.font.SysFont             | システムフォントからFontオブジェクトを作成する |
| pygame.font.Font                | ファイルから新しいFontオブジェクトを作成する   |


#### pygame.font.Font

|                API                 |                                   説明                                   |
| ---------------------------------- | ------------------------------------------------------------------------ |
| pygame.font.Font.bold              | フォントを（擬似）太字で表示するかどうかを取得または設定します。         |
| pygame.font.Font.italic            | フォントを（擬似）イタリック体で表示するかどうかを取得または設定します。 |
| pygame.font.Font.underline         | フォントに下線を引くかどうかを取得または設定します。                     |
| pygame.font.Font.strikethrough     | フォントに取り消し線を表示するかどうかを取得または設定します。           |
| pygame.font.Font.render            | 新しいSurfaceにテキストを描画する                                        |
| pygame.font.Font.size              | テキストをレンダリングするのに必要な容量を決定する                       |
| pygame.font.Font.set_underline     | テキストにアンダーラインを引くかどうかを制御します。                     |
| pygame.font.Font.get_underline     | テキストに下線を引くかどうかをチェックします。                           |
| pygame.font.Font.set_strikethrough | テキストを取り消し線付きで表示するかどうかを制御します。                 |
| pygame.font.Font.get_strikethrough | テキストに取り消し線が表示されるかどうかをチェックします。               |
| pygame.font.Font.set_bold          | 太字のフェイクレンダリングを有効にする                                   |
| pygame.font.Font.get_bold          | テキストを太字にするかどうかをチェックします。                           |
| pygame.font.Font.set_italic        | イタリック体の偽レンダリングを有効にする                                 |
| pygame.font.Font.metrics           | 渡された文字列の各文字のメトリクスを取得します。                         |
| pygame.font.Font.get_italic        | テキストをイタリック体として表示するかどうかをチェックします。           |
| pygame.font.Font.get_linesize      | フォントテキストの行間を取得する                                         |
| pygame.font.Font.get_height        | フォントの高さを取得する                                                 |
| pygame.font.Font.get_ascent        | 聳え立つ                                                                 |
| pygame.font.Font.get_descent       | フォントの下降を取得する                                                 |

### image

画像転送

|                API                 |                                      説明                                       |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| pygame.image.load                  | ファイル（またはファイル類似オブジェクト）から新しい画像をロードする。          |
| pygame.image.save                  | 画像をファイル（またはファイル的オブジェクト）に保存する                        |
| pygame.image.get_sdl_image_version | 使用している SDL_Image ライブラリのバージョン番号を取得します。                 |
| pygame.image.get_extended          | 拡張画像形式が読み込めるかどうかのテスト                                        |
| pygame.image.tostring              | 画像をバイトバッファに転送する                                                  |
| pygame.image.tobytes               | 画像をバイトバッファに転送する                                                  |
| pygame.image.fromstring            | バイトバッファから新しいSurfaceを作成する                                       |
| pygame.image.frombytes             | バイトバッファから新しいSurfaceを作成する                                       |
| pygame.image.frombuffer            | バイトバッファ内のデータを共有する Surface を新規に作成する。                   |
| pygame.image.load_basic            | ファイル（またはファイルのようなオブジェクト）から新しいBMP画像をロードします。 |
| pygame.image.load_extended         | ファイル（またはファイル類似オブジェクト）から画像を読み込む                    |
| pygame.image.save_extended         | png/jpg イメージをファイル（またはファイル的オブジェクト）に保存する。          |

### key

キーボード

|              API               |                                      説明                                       |
| ------------------------------ | ------------------------------------------------------------------------------- |
| pygame.key.get_focused         | ディスプレイがシステムからキーボード入力を受け取っている場合、true を返します。 |
| pygame.key.get_pressed         | すべてのキーボードボタンの状態を取得する                                        |
| pygame.key.get_mods            | どのモディファイアキーが押されているかを判断する                                |
| pygame.key.set_mods            | どのモディファイアキーが押されるかを一時的に設定する                            |
| pygame.key.set_repeat          | ホールドされたキーの繰り返しを制御する                                          |
| pygame.key.get_repeat          | ホールドキーの繰り返しを見る                                                    |
| pygame.key.name                | キー識別子の名前を取得する                                                      |
| pygame.key.key_code            | キー名からキー識別子を取得する                                                  |
| pygame.key.start_text_input    | Unicodeテキスト入力イベントの処理を開始                                         |
| pygame.key.stop_text_input     | Unicodeテキスト入力イベントの処理を停止する                                     |
| pygame.key.set_text_input_rect | は、候補リストの位置を制御します。                                              |

### locals



### mixer

サウンドをロードして再生する

|                API                 |                                    説明                                    |
| ---------------------------------- | -------------------------------------------------------------------------- |
| pygame.mixer.init                  | ミキサーモジュールの初期化                                                 |
| pygame.mixer.pre_init              | ミキサーの初期化引数を設定します。                                         |
| pygame.mixer.quit                  | ミキサーのアンイニシャライズ                                               |
| pygame.mixer.get_init              | ミキサーが初期化されているかどうかのテスト                                 |
| pygame.mixer.stop                  | 全音階の再生を停止する                                                     |
| pygame.mixer.pause                 | 全音声チャネルの再生を一時的に停止する                                     |
| pygame.mixer.unpause               | 一時停止した音声チャンネルの再生を再開する                                 |
| pygame.mixer.fadeout               | すべての音のボリュームをフェードアウトさせてから停止させる                 |
| pygame.mixer.set_num_channels      | 総再生チャンネル数を設定する                                               |
| pygame.mixer.get_num_channels      | 総再生チャンネル数を取得                                                   |
| pygame.mixer.set_reserved          | リザーブチャンネルを自動的に使用しない                                     |
| pygame.mixer.find_channel          | あぼーんする                                                               |
| pygame.mixer.get_busy              | 音が混ざっているかどうかを調べる                                           |
| pygame.mixer.get_sdl_mixer_version | ミキサーの SDL バージョンを取得します。                                    |
| pygame.mixer.Sound                 | ファイルまたはバッファオブジェクトから新規サウンドオブジェクトを作成する。 |
| pygame.mixer.Channel               | 再生を制御するためのChannelオブジェクトを作成する                          |

#### pygame.mixer.Sound

|                 API                 |                       説明                       |
| ----------------------------------- | ------------------------------------------------ |
| pygame.mixer.Sound.play             | 音声再生開始                                     |
| pygame.mixer.Sound.stop             | 音声の再生を停止する                             |
| pygame.mixer.Sound.fadeout          | フェードアウト後、音を止めて再生する             |
| pygame.mixer.Sound.set_volume       | このサウンドの再生音量を設定する                 |
| pygame.mixer.Sound.get_volume       | 再生音量を得る                                   |
| pygame.mixer.Sound.get_num_channels | このサウンドが何回流れているか数えてみてください |
| pygame.mixer.Sound.get_length       | サウンドの長さを取得する                         |
| pygame.mixer.Sound.get_raw          | サウンドサンプルのバイト列コピーを返します。     |

#### pygame.mixer.Channel

|                API                |                            説明                            |
| --------------------------------- | ---------------------------------------------------------- |
| pygame.mixer.Channel.play         | 特定のチャンネルで音声を再生する                           |
| pygame.mixer.Channel.stop         | チャンネル再生を停止する                                   |
| pygame.mixer.Channel.pause        | チャンネルの再生を一時的に停止する                         |
| pygame.mixer.Channel.unpause      | チャンネル再生の一時停止を再開する                         |
| pygame.mixer.Channel.fadeout      | フェードアウト後の停止再生チャンネル                       |
| pygame.mixer.Channel.set_volume   | 再生中のチャンネルの音量を設定する                         |
| pygame.mixer.Channel.get_volume   | 再生中のチャンネルの音量を取得する                         |
| pygame.mixer.Channel.get_busy     | チャンネルがアクティブかどうかチェックする                 |
| pygame.mixer.Channel.get_sound    | 現在再生中のサウンドを取得                                 |
| pygame.mixer.Channel.queue        | をキューに入れ、サウンドオブジェクトを現在の               |
| pygame.mixer.Channel.get_queue    | キューイングされているサウンドを返す                       |
| pygame.mixer.Channel.set_endevent | 再生停止時にチャンネルからイベントが送信されるようにする   |
| pygame.mixer.Channel.get_endevent | 再生が停止したときにチャンネルが送信するイベントを取得する |

### mouse

マウスを操作する

|           API            |                          説明                          |
| ------------------------ | ------------------------------------------------------ |
| pygame.mouse.get_pressed | マウスボタンの状態を取得する                           |
| pygame.mouse.get_pos     | マウスカーソルの位置を取得する                         |
| pygame.mouse.get_rel     | マウスの移動量を取得する                               |
| pygame.mouse.set_pos     | マウスカーソルの位置を設定する                         |
| pygame.mouse.set_visible | マウスカーソルの表示/非表示                            |
| pygame.mouse.get_visible | マウスカーソルの現在の可視性状態を取得する             |
| pygame.mouse.get_focused | ディスプレイにマウスが入力されているかどうかを確認する |
| pygame.mouse.set_cursor  | マウスカーソルを新しいカーソルに設定する               |
| pygame.mouse.get_cursor  | 現在のマウスカーソルを取得する                         |

### Rect

矩形座標を格納するオブジェクト。

|              API              |                               説明                               |
| ----------------------------- | ---------------------------------------------------------------- |
| pygame.Rect.copy              | 矩形をコピーする                                                 |
| pygame.Rect.move              | 矩形を移動させる                                                 |
| pygame.Rect.move_ip           | は矩形を移動させます。                                           |
| pygame.Rect.inflate           | 矩形の大きさを拡大または縮小する                                 |
| pygame.Rect.inflate_ip        | 矩形のサイズを拡大または縮小します。                             |
| pygame.Rect.update            | 矩形の位置と大きさを設定します。                                 |
| pygame.Rect.clamp             | 矩形を別の矩形の内側に移動します。                               |
| pygame.Rect.clamp_ip          | 矩形を別の矩形の内側に移動させます。                             |
| pygame.Rect.clip              | 矩形を内側に切り取る                                             |
| pygame.Rect.clipline          | 矩形内に線を引く                                                 |
| pygame.Rect.union             | ２つの矩形を一つにする                                           |
| pygame.Rect.union_ip          | ２つの矩形を即座に一つにする                                     |
| pygame.Rect.unionall          | 複数の矩形を融合する                                             |
| pygame.Rect.unionall_ip       | 複数の矩形を即座に融合する                                       |
| pygame.Rect.fit               | アスペクト比を持つ矩形のリサイズと移動                           |
| pygame.Rect.normalize         | 現在のネガティブサイズ                                           |
| pygame.Rect.contains          | ある矩形が別の矩形の中にあるかどうかをテストする                 |
| pygame.Rect.collidepoint      | 点が矩形の内側にあるかどうかをテストする                         |
| pygame.Rect.colliderect       | 2つの矩形が重なるかどうかをテストする                            |
| pygame.Rect.collidelist       | リスト内の1つの矩形が交差しているかどうかをテストする            |
| pygame.Rect.collidelistall    | リスト内のすべての矩形が交差しているかどうかをテストする         |
| pygame.Rect.collideobjects    | リスト内のオブジェクトが交差しているかどうかをテストする         |
| pygame.Rect.collideobjectsall | リスト内のすべてのオブジェクトが交差しているかどうかをテストする |
| pygame.Rect.collidedict       | 辞書の中のある矩形が交差しているかどうかをテストする             |
| pygame.Rect.collidedictall    | 辞書に含まれるすべての矩形が交差しているかどうかをテストする     |

### Surface

画像を表現する

|               API                |                                  説明                                  |
| -------------------------------- | ---------------------------------------------------------------------- |
| pygame.Surface.blit              | 描き重ねる                                                             |
| pygame.Surface.blits             | 描き重ねる                                                             |
| pygame.Surface.convert           | 画像のピクセル形式を変更する                                           |
| pygame.Surface.convert_alpha     | 画像のピクセルフォーマットを変更する（ピクセル単位のアルファを含む）。 |
| pygame.Surface.copy              | Surfaceの新しいコピーを作成する                                        |
| pygame.Surface.fill              | Surfaceをベタで塗りつぶす                                              |
| pygame.Surface.scroll            | サーフェスイメージを所定の位置に移動させる                             |
| pygame.Surface.set_colorkey      | 透明なカラーキーを設定する                                             |
| pygame.Surface.get_colorkey      | 現在の透明なカラーキーを取得する                                       |
| pygame.Surface.set_alpha         | フルサーフェイスイメージのアルファ値を設定する                         |
| pygame.Surface.get_alpha         | 現在のサーフェスの透明度の値を取得します。                             |
| pygame.Surface.lock              | ピクセル・アクセス用にサーフェス・メモリをロックする                   |
| pygame.Surface.unlock            | Surfaceのメモリをピクセルアクセスから解放                              |
| pygame.Surface.mustlock          | サーフェスのロックが必要かどうかのテスト                               |
| pygame.Surface.get_locked        | Surfaceが現在ロックされているかどうかをテストする                      |
| pygame.Surface.get_locks         | サーフェスのロックを取得する                                           |
| pygame.Surface.get_at            | 一画素の色値を取得する                                                 |
| pygame.Surface.set_at            | 1つのピクセルの色値を設定する                                          |
| pygame.Surface.get_at_mapped     | 1画素のマッピングされた色値を取得する                                  |
| pygame.Surface.get_palette       | 8ビットSurfaceのカラーインデックスパレットを取得する                   |
| pygame.Surface.get_palette_at    | パレット内の単一のエントリの色を取得する                               |
| pygame.Surface.set_palette       | 8ビットSurfaceのカラーパレットを設定する                               |
| pygame.Surface.set_palette_at    | 8ビットSurfaceパレットで、1つのインデックスに色を設定します。          |
| pygame.Surface.map_rgb           | 色をマッピングされた色値に変換する                                     |
| pygame.Surface.unmap_rgb         | マッピングされた整数の色値を Color に変換します。                      |
| pygame.Surface.set_clip          | サーフェスの現在のクリッピングエリアを設定します。                     |
| pygame.Surface.get_clip          | サーフェスの現在のクリッピングエリアを取得する                         |
| pygame.Surface.subsurface        | 親を参照する新しいサーフェスを作成する                                 |
| pygame.Surface.get_parent        | サブサーフェスの親を探す                                               |
| pygame.Surface.get_abs_parent    | サブサーフェスのトップレベルの親を見つける                             |
| pygame.Surface.get_offset        | おやのなかにあるこのせいめんをさがす                                   |
| pygame.Surface.get_abs_offset    | トップレベル親内の子サブサーフェスの絶対位置を求める                   |
| pygame.Surface.get_size          | サーフェスの寸法を取得する                                             |
| pygame.Surface.get_width         | サーフェスの幅を取得する                                               |
| pygame.Surface.get_height        | サーフェスの高さを取得する                                             |
| pygame.Surface.get_rect          | サーフェスの長方形の面積を取得する                                     |
| pygame.Surface.get_bitsize       | Surface ピクセル形式のビット深度を取得する                             |
| pygame.Surface.get_bytesize      | Surface ピクセルあたりの使用バイト数を取得する                         |
| pygame.Surface.get_flags         | Surfaceに使用される追加フラグを取得する                                |
| pygame.Surface.get_pitch         | Surface1行あたりの使用バイト数を取得する                               |
| pygame.Surface.get_masks         | 色とマッピングされた整数の間の変換に必要なビットマスク。               |
| pygame.Surface.set_masks         | 色とマッピングされた整数の間の変換に必要なビットマスクを設定します。   |
| pygame.Surface.get_shifts        | 色とマッピングされた整数の間の変換に必要なビットシフト量               |
| pygame.Surface.set_shifts        | 色とマッピングされた整数の間の変換に必要なビットシフトを設定します。   |
| pygame.Surface.get_losses        | 色とマッピングされた整数の間の変換に使用される有効ビット               |
| pygame.Surface.get_bounding_rect | データを含む最小の矩形を見つける                                       |
| pygame.Surface.get_view          | Surfaceのピクセルのバッファービューを返します。                        |
| pygame.Surface.get_buffer        | Surfaceのピクセルのためのバッファオブジェクトを取得します。            |
| pygame.Surface._pixels_address   | 画素バッファアドレス                                                   |

### time

時間監視

|          API          |                      説明                      |
| --------------------- | ---------------------------------------------- |
| pygame.time.get_ticks | ミリ秒単位で時間を取得する                     |
| pygame.time.wait      | 一定時間、プログラムを一時停止する             |
| pygame.time.delay     | 一定時間、プログラムを一時停止する             |
| pygame.time.set_timer | イベントキューに繰り返しイベントを作成する     |
| pygame.time.Clock     | 時間を記録するためのオブジェクトを作成します。 |

#### pygame.time.Clock

|               API                |               説明               |
| -------------------------------- | -------------------------------- |
| pygame.time.Clock.tick           | 時計を更新する                   |
| pygame.time.Clock.tick_busy_loop | 時計を更新する                   |
| pygame.time.Clock.get_time       | 前刻の使用時間                   |
| pygame.time.Clock.get_rawtime    | 前刻の実時間                     |
| pygame.time.Clock.get_fps        | クロックフレームレートを計算する |


### music

ストリーミングオーディオを制御する

|               API               |                            説明                            |
| ------------------------------- | ---------------------------------------------------------- |
| pygame.mixer.music.load         | 音楽ファイルを読み込んで再生する                           |
| pygame.mixer.music.unload       | 現在ロードされている音楽をアンロードしてリソースを解放する |
| pygame.mixer.music.play         | 音楽ストリームの再生開始                                   |
| pygame.mixer.music.rewind       | リスタートミュージック                                     |
| pygame.mixer.music.stop         | 音楽再生を停止する                                         |
| pygame.mixer.music.pause        | 音楽再生一時停止                                           |
| pygame.mixer.music.unpause      | レジューム・ポーズド・ミュージック                         |
| pygame.mixer.music.fadeout      | フェードアウトして音楽再生を停止する                       |
| pygame.mixer.music.set_volume   | 音楽の音量を設定する                                       |
| pygame.mixer.music.get_volume   | 音量を上げる                                               |
| pygame.mixer.music.get_busy     | 音楽ストリームが再生されているかどうかを確認する           |
| pygame.mixer.music.set_pos      | おどりばを設定する                                         |
| pygame.mixer.music.get_pos      | 音楽の再生時間を確保する                                   |
| pygame.mixer.music.queue        | をキューに入れ、その後にサウンドファイルが続きます。       |
| pygame.mixer.music.set_endevent | 再生停止時に音楽からイベントが送られるようにする           |
| pygame.mixer.music.get_endevent | 再生が停止したときにチャンネルが送信するイベントを取得する |

### pygame

トップレベルのpygameパッケージ

|           API            |                                      説明                                      |
| ------------------------ | ------------------------------------------------------------------------------ |
| pygame.init              | インポートされたすべての pygame モジュールを初期化します。                     |
| pygame.quit              | すべての pygame モジュールの初期化を解除します。                               |
| pygame.get_init          | pygameが現在初期化されている場合、Trueを返します。                             |
| pygame.error             | 標準的な pygame の例外                                                         |
| pygame.get_error         | 現在のエラーメッセージを取得する                                               |
| pygame.set_error         | 現在のエラーメッセージを設定する                                               |
| pygame.get_sdl_version   | SDLのバージョン番号を取得する                                                  |
| pygame.get_sdl_byteorder | SDL のバイトオーダーを取得する                                                 |
| pygame.register_quit     | pygame が終了するときに呼び出される関数を登録します。                          |
| pygame.encode_string     | Unicodeまたはbytesオブジェクトをエンコードする                                 |
| pygame.encode_file_path  | Unicodeまたはbytesオブジェクトをファイルシステムのパスとしてエンコードします。 |

## 高度なもの:

### pygame.cursors

カーソルリソース

|           API           |                       説明                       |
| ----------------------- | ------------------------------------------------ |
| pygame.cursors.compile  | 単純な文字列からバイナリカーソルデータを作成する |
| pygame.cursors.load_xbm | XBMファイルからカーソルデータを読み込む          |
| pygame.cursors.Cursor   | カーソルを表す pygame オブジェクト。             |

#### pygame.cursors.Cursor

|            API             |           説明           |
| -------------------------- | ------------------------ |
| pygame.cursors.Cursor.copy |                          |
| pygame.cursors.Cursor.type | カーソルの種類を取得する |
| pygame.cursors.Cursor.data | カーソルデータの取得     |

### pygame.joystick

ジョイスティック、ゲームパッド、トラックボールと対話する

|            API            |                              説明                              |
| ------------------------- | -------------------------------------------------------------- |
| pygame.joystick.init      | ジョイスティックモジュールを初期化する。                       |
| pygame.joystick.quit      | ジョイスティックモジュールをアンイニシャライズする。           |
| pygame.joystick.get_init  | ジョイスティックモジュールが初期化されていればTrueを返します。 |
| pygame.joystick.get_count | ジョイスティックの本数を返します。                             |
| pygame.joystick.Joystick  | ジョイスティックオブジェクトを新規に作成します。               |

#### pygame.joystick.Joystick

|                   API                    |                        説明                        |
| ---------------------------------------- | -------------------------------------------------- |
| pygame.joystick.Joystick.init            | ジョイスティックの初期化                           |
| pygame.joystick.Joystick.quit            | ジョイスティックのアンイニシャライズ               |
| pygame.joystick.Joystick.get_init        | ジョイスティックが初期化されているか確認する       |
| pygame.joystick.Joystick.get_id          | デバイスインデックスを取得する（非推奨）           |
| pygame.joystick.Joystick.get_instance_id | ジョイスティックのインスタンスIDを取得する         |
| pygame.joystick.Joystick.get_guid        | ジョイスティックのGUIDを取得する                   |
| pygame.joystick.Joystick.get_power_level | デバイスのおおよその電源状態を把握する             |
| pygame.joystick.Joystick.get_name        | ジョイスティックのシステム名を取得する             |
| pygame.joystick.Joystick.get_numaxes     | ジョイスティックの軸数を取得する                   |
| pygame.joystick.Joystick.get_axis        | 軸の現在位置を取得する                             |
| pygame.joystick.Joystick.get_numballs    | ジョイスティックのトラックボール数を取得する       |
| pygame.joystick.Joystick.get_ball        | トラックボールの相対位置を取得する                 |
| pygame.joystick.Joystick.get_numbuttons  | ジョイスティックのボタン数を取得する               |
| pygame.joystick.Joystick.get_button      | 現在のボタンの状態を取得する                       |
| pygame.joystick.Joystick.get_numhats     | ジョイスティックのハットコントロールの数を取得する |
| pygame.joystick.Joystick.get_hat         | ハットの位置を取得する                             |
| pygame.joystick.Joystick.rumble          | ゴロゴロ効果開始                                   |
| pygame.joystick.Joystick.stop_rumble     | ランブルエフェクトの再生を停止する                 |

### pygame.mask

イメージマスク

|            API             |                          説明                           |
| -------------------------- | ------------------------------------------------------- |
| pygame.mask.from_surface   | 与えられたサーフェスからマスクを作成します              |
| pygame.mask.from_threshold | 閾値処理によるマスクの作成 Surfaces                     |
| pygame.mask.Mask           | 2次元ビットマスクを表現するための pygame オブジェクト。 |

#### pygame.mask.Mask

|                  API                  |                     説明                     |
| ------------------------------------- | -------------------------------------------- |
| pygame.mask.Mask.copy                 | マスクの新しいコピーを返します。             |
| pygame.mask.Mask.get_size             | マスクの大きさを返す                         |
| pygame.mask.Mask.get_rect             | マスクのサイズに応じたRectを返します。       |
| pygame.mask.Mask.get_at               | 指定された位置のビットを取得する             |
| pygame.mask.Mask.set_at               | 指定された位置のビットを設定する             |
| pygame.mask.Mask.overlap              | 交点を返す                                   |
| pygame.mask.Mask.overlap_area         | 重複するセットビットの数を返します。         |
| pygame.mask.Mask.overlap_mask         | オーバーラップするセットビットのマスクを返す |
| pygame.mask.Mask.fill                 | すべてのビットを1に設定                      |
| pygame.mask.Mask.clear                | すべてのビットを0に設定                      |
| pygame.mask.Mask.invert               | すべてのビットを反転させる                   |
| pygame.mask.Mask.scale                | マスクのリサイズ                             |
| pygame.mask.Mask.draw                 | マスクを別のマスクに描画する                 |
| pygame.mask.Mask.erase                | 別のマスクからマスクを消去する               |
| pygame.mask.Mask.count                | セットされたビットの数を返します。           |
| pygame.mask.Mask.centroid             | セットされたビットのセントロイドを返す       |
| pygame.mask.Mask.angle                | 設定されたビットの向きを返す                 |
| pygame.mask.Mask.outline              | オブジェクトの外形を示す点のリストを返す     |
| pygame.mask.Mask.convolve             | このマスクと別のマスクの畳み込みを返す       |
| pygame.mask.Mask.connected_component  | 連結成分を含むマスクを返す                   |
| pygame.mask.Mask.connected_components | 連結成分のマスクのリストを返す               |
| pygame.mask.Mask.get_bounding_rects   | 連結成分の外接矩形のリストを返す             |
| pygame.mask.Mask.to_surface           | マスクが描かれたサーフェイスを返します。     |

### pygame.sprite

基本的なゲームオブジェクトクラスを持つ

|                API                 |                                               説明                                                |
| ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| pygame.sprite.Sprite               | 可視化されたゲームオブジェクトのためのシンプルな基本クラスです。                                  |
| pygame.sprite.DirtySprite          | Spriteのサブクラスで、より多くの属性と機能を持つ。                                                |
| pygame.sprite.Group                | 複数のスプライトオブジェクトを保持・管理するためのコンテナクラスです。                            |
| pygame.sprite.RenderPlain          | pygame.sprite.Groupと同じです。                                                                   |
| pygame.sprite.RenderClear          | pygame.sprite.Groupと同じです。                                                                   |
| pygame.sprite.RenderUpdates        | ダーティアップデートを追跡するグループサブクラス。                                                |
| pygame.sprite.OrderedUpdates       | スプライトを追加順に描画するRenderUpdatesのサブクラスです。                                       |
| pygame.sprite.LayeredUpdates       | LayeredUpdatesは、OrderedUpdatesと同様にレイヤーを処理し描画するスプライトグループです。          |
| pygame.sprite.LayeredDirty         | LayeredDirtyグループは、DirtySpriteオブジェクトのためのものです。LayeredUpdatesのサブクラスです。 |
| pygame.sprite.GroupSingle          | スプライトを1つだけ保持するグループコンテナ。                                                     |
| pygame.sprite.spritecollide        | グループ内で他のスプライトと交差しているスプライトを探す。                                        |
| pygame.sprite.collide_rect         | 2つのスプライト間の衝突判定（rectsを使用）。                                                      |
| pygame.sprite.collide_rect_ratio   | 2つのスプライト間の衝突判定。比率に合わせた矩形を使用。                                           |
| pygame.sprite.collide_circle       | 2つのスプライト間の衝突判定を、円を用いて行う。                                                   |
| pygame.sprite.collide_circle_ratio | 2つのスプライトの衝突を、比率に応じて拡大縮小された円を使って検出する。                           |
| pygame.sprite.collide_mask         | マスクによる2つのスプライトの衝突判定。                                                           |
| pygame.sprite.groupcollide         | 2つのグループ間で衝突するスプライトをすべて検索します。                                           |
| pygame.sprite.spritecollideany     | スプライトがグループ内の何かと交差しているかどうかを簡単にテストします。                          |

#### pygame.sprite.Sprite

|             API             |                     説明                     |
| --------------------------- | -------------------------------------------- |
| pygame.sprite.Sprite.update | スプライトの動作を制御するメソッド           |
| pygame.sprite.Sprite.add    | スプライトをグループに追加する               |
| pygame.sprite.Sprite.remove | グループからスプライトを削除する             |
| pygame.sprite.Sprite.kill   | すべてのグループからスプライトを削除します。 |
| pygame.sprite.Sprite.alive  | スプライトはどのグループにも属しているか     |
| pygame.sprite.Sprite.groups | このスプライトを含むグループのリスト         |

#### pygame.sprite.Group

|             API             |                           説明                           |
| --------------------------- | -------------------------------------------------------- |
| pygame.sprite.Group.sprites | このグループに含まれるスプライトのリスト                 |
| pygame.sprite.Group.copy    | グループと重複する                                       |
| pygame.sprite.Group.add     | このグループにスプライトを追加する                       |
| pygame.sprite.Group.remove  | グループからスプライトを削除する                         |
| pygame.sprite.Group.has     | グループにスプライトが含まれているかどうかを判定します。 |
| pygame.sprite.Group.update  | 含まれるスプライトのupdateメソッドを呼び出す             |
| pygame.sprite.Group.draw    | スプライトの画像を吹き飛ばす                             |
| pygame.sprite.Group.clear   | スプライトの上に背景を描画する                           |
| pygame.sprite.Group.empty   | すべてのスプライトを削除                                 |

#### pygame.sprite.RenderUpdates

|               API                |                          説明                          |
| -------------------------------- | ------------------------------------------------------ |
| pygame.sprite.RenderUpdates.draw | スプライトの画像をブリットし、変化した部分を追跡する。 |

#### pygame.sprite.LayeredUpdates

|                         API                          |                               説明                               |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| pygame.sprite.LayeredUpdates.add                     | スプライトをグループに追加します．                               |
| pygame.sprite.LayeredUpdates.sprites                 | スプライトの順序付きリスト（先頭が後ろ、最後が上）を返します。   |
| pygame.sprite.LayeredUpdates.draw                    | すべてのスプライトを正しい順序で、渡された表面に描画します。     |
| pygame.sprite.LayeredUpdates.get_sprites_at          | は、その位置にあるすべてのスプライトを含むリストを返します。     |
| pygame.sprite.LayeredUpdates.get_sprite              | グループスプライトのうち、idxの位置にあるスプライトを返します。  |
| pygame.sprite.LayeredUpdates.remove_sprites_of_layer | レイヤーからすべてのスプライトを削除し、リストとして返します。   |
| pygame.sprite.LayeredUpdates.layers                  | 定義された（ユニークな）レイヤーのリストを、下から順に返します。 |
| pygame.sprite.LayeredUpdates.change_layer            | スプライトのレイヤーを変更します。                               |
| pygame.sprite.LayeredUpdates.get_layer_of_sprite     | スプライトが現在いるレイヤーを返します。                         |
| pygame.sprite.LayeredUpdates.get_top_layer           | トップレイヤーを返す                                             |
| pygame.sprite.LayeredUpdates.get_bottom_layer        | 最下層を返します                                                 |
| pygame.sprite.LayeredUpdates.move_to_front           | スプライトを前面レイヤーに移動させる                             |
| pygame.sprite.LayeredUpdates.move_to_back            | スプライトを一番下のレイヤーに移動します                         |
| pygame.sprite.LayeredUpdates.get_top_sprite          | 一番上のスプライトを返す                                         |
| pygame.sprite.LayeredUpdates.get_sprites_from_layer  | レイヤーのすべてのスプライトを、追加された順に返します。         |
| pygame.sprite.LayeredUpdates.switch_layer            | レイヤー1からレイヤー2へのスプライトの切り替えを行います。       |

### pygame.sprite.LayeredDirty


|                       API                       |                                            説明                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| pygame.sprite.LayeredDirty.draw                 | すべてのスプライトを正しい順序で、渡された表面に描画します。                               |
| pygame.sprite.LayeredDirty.clear                | 背景を設定するために使用されます。                                                         |
| pygame.sprite.LayeredDirty.repaint_rect         | 与えられた領域を再塗装する                                                                 |
| pygame.sprite.LayeredDirty.set_clip             | 描画する領域をクリップします。None（デフォルト）を渡すだけで、クリップがリセットされます。 |
| pygame.sprite.LayeredDirty.get_clip             | 描画する領域をクリップします。None（デフォルト）を渡すだけで、クリップがリセットされます。 |
| pygame.sprite.LayeredDirty.change_layer         | スプライトのレイヤーを変更します。                                                         |
| pygame.sprite.LayeredDirty.set_timing_treshold  | 閾値をミリ秒単位で設定します。                                                             |
| pygame.sprite.LayeredDirty.set_timing_threshold | 閾値をミリ秒単位で設定します。                                                             |

### pygame.transform

サーフェスを変換する

|                   API                    |                                                説明                                                |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------- |
| pygame.transform.flip                    | タテヨコ反転                                                                                       |
| pygame.transform.scale                   | 新しい解像度にリサイズする                                                                         |
| pygame.transform.scale_by                | スカラーを使用して新しい解像度にリサイズします。                                                   |
| pygame.transform.rotate                  | 画像を回転させる                                                                                   |
| pygame.transform.rotozoom                | フィルタリングによる拡大・縮小、回転                                                               |
| pygame.transform.scale2x                 | スペシャライズド・イメージダブラー                                                                 |
| pygame.transform.smoothscale             | 表面を任意の大きさに滑らかに拡大する                                                               |
| pygame.transform.smoothscale_by          | スカラーを使用して新しい解像度にリサイズします。                                                   |
| pygame.transform.get_smoothscale_backend | 使用中のスムーススケールフィルタのバージョンを返します。GENERIC', 'MMX', または 'SSE'.             |
| pygame.transform.set_smoothscale_backend | smoothscale filter のバージョンを設定します。GENERIC', 'MMX', または 'SSE' のいずれか。            |
| pygame.transform.chop                    | 内部領域を削除した画像のコピーを取得する                                                           |
| pygame.transform.laplacian               | 面のエッジを見つける                                                                               |
| pygame.transform.average_surfaces        | 多数の表面から平均的な表面を求める。                                                               |
| pygame.transform.average_color           | は、表面の平均色を求める                                                                           |
| pygame.transform.threshold               | は、'search_color' または 'search_surf' の閾値内にあるサーフェイスのピクセル数とその数を求めます。 |

### pygame.BufferProxy

配列プロトコルで表面バッファをエクスポートするオブジェクト

|            API            |                                説明                                 |
| ------------------------- | ------------------------------------------------------------------- |
| pygame.BufferProxy.parent | ラップされた輸出用オブジェクトを返す。                              |
| pygame.BufferProxy.length | エクスポートされるバッファのサイズ（バイト）。                      |
| pygame.BufferProxy.raw    | エクスポートされたバッファを1バイトのブロックとしてコピーしたもの。 |
| pygame.BufferProxy.write  | オブジェクトバッファに生バイトを書き込む。                          |

### pygame.freetype

フォントの読み込みとレンダリング

|                  API                   |                                     説明                                      |
| -------------------------------------- | ----------------------------------------------------------------------------- |
| pygame.freetype.get_error              | 最新のFreeTypeエラーを返します。                                              |
| pygame.freetype.get_version            | FreeType のバージョンを返します。                                             |
| pygame.freetype.init                   | 基盤となる FreeType ライブラリを初期化する。                                  |
| pygame.freetype.quit                   | 基盤となるFreeTypeライブラリをシャットダウンします。                          |
| pygame.freetype.get_init               | FreeType モジュールが現在初期化されている場合、True を返す。                  |
| pygame.freetype.was_init               | 廃止されました。代わりに get_init() を使用する。                              |
| pygame.freetype.get_cache_size         | グリフケースサイズを返す                                                      |
| pygame.freetype.get_default_resolution | デフォルトのピクセルサイズを1インチあたりのドット数で返します。               |
| pygame.freetype.set_default_resolution | モジュールのデフォルトのピクセルサイズを1インチあたりのドット数で設定します。 |
| pygame.freetype.SysFont                | システムフォントからFontオブジェクトを作成する                                |
| pygame.freetype.get_default_font       | デフォルトフォントのファイル名取得                                            |
| pygame.freetype.Font                   | サポートされているフォントファイルから新しいFontインスタンスを作成します。    |

#### pygame.freetype.Font

|                     API                     |                                         説明                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| pygame.freetype.Font.name                   | 適切なフォント名。                                                                   |
| pygame.freetype.Font.path                   | フォントファイルのパス                                                               |
| pygame.freetype.Font.size                   | レンダリング時に使用されるデフォルトのポイントサイズ                                 |
| pygame.freetype.Font.get_rect               | レンダリングされたテキストのサイズとオフセットを返す                                 |
| pygame.freetype.Font.get_metrics            | 与えられたテキストに対するグリフメトリクスを返す                                     |
| pygame.freetype.Font.height                 | フォントの高さ（未補正）をフォント単位で指定します。                                 |
| pygame.freetype.Font.ascender               | フォントの未補正上昇値をフォント単位で表したもの                                     |
| pygame.freetype.Font.descender              | フォントの未補正下降量をフォント単位で表したもの                                     |
| pygame.freetype.Font.get_sized_ascender     | フォントの上昇率をピクセル単位で指定します。                                         |
| pygame.freetype.Font.get_sized_descender    | フォントの縮小下降をピクセル単位で表す。                                             |
| pygame.freetype.Font.get_sized_height       | フォントの高さをピクセル単位でスケーリングしたもの                                   |
| pygame.freetype.Font.get_sized_glyph_height | フォントのスケーリングされたバウンディングボックスの高さをピクセル単位で指定します。 |
| pygame.freetype.Font.get_sizes              | 埋め込みビットマップの利用可能なサイズを返します。                                   |
| pygame.freetype.Font.render                 | レンダリングしたテキストをサーフェスとして返す                                       |
| pygame.freetype.Font.render_to              | 既存のサーフェスにテキストをレンダリングする                                         |
| pygame.freetype.Font.render_raw             | レンダリングしたテキストをバイト列で返す                                             |
| pygame.freetype.Font.render_raw_to          | テキストをint型の配列にレンダリングする                                              |
| pygame.freetype.Font.style                  | フォントのスタイルフラグ                                                             |
| pygame.freetype.Font.underline              | フォントの下線スタイルフラグの状態                                                   |
| pygame.freetype.Font.strong                 | フォントの強スタイルフラグの状態                                                     |
| pygame.freetype.Font.oblique                | フォントの斜体フラグの状態                                                           |
| pygame.freetype.Font.wide                   | フォントのワイドスタイルフラグの状態                                                 |
| pygame.freetype.Font.strength               | ストロングフォントスタイルまたはワイドフォントスタイルに関連する強度                 |
| pygame.freetype.Font.underline_adjustment   | アンダーライン位置の調整係数                                                         |
| pygame.freetype.Font.fixed_width            | フォントが固定幅であるかどうかを取得する                                             |
| pygame.freetype.Font.fixed_sizes            | フォントで利用可能なビットマップサイズの数                                           |
| pygame.freetype.Font.scalable               | フォントがスケーラブルであるかどうかを取得する                                       |
| pygame.freetype.Font.use_bitmap_strikes     | アウトラインフォントファイルで埋め込みビットマップを使用できるようにしました。       |
| pygame.freetype.Font.antialiased            | フォントのアンチエイリアスモード                                                     |
| pygame.freetype.Font.kerning                | 文字カーニングモード                                                                 |
| pygame.freetype.Font.vertical               | フォント垂直モード                                                                   |
| pygame.freetype.Font.rotation               | テキスト回転（左回り                                                                 |
| pygame.freetype.Font.fgcolor                | デフォルトの前景色                                                                   |
| pygame.freetype.Font.bgcolor                | デフォルトの背景色                                                                   |
| pygame.freetype.Font.origin                 | テキストオリジンモードへのフォントレンダリング                                       |
| pygame.freetype.Font.pad                    | 水増しバウンダリモード                                                               |
| pygame.freetype.Font.ucs4                   | UCS-4 モードを有効にする                                                             |
| pygame.freetype.Font.resolution             | 画素解像度（ドット/インチ                                                            |

### pygame.gfxdraw

図形を描く

|               API               |                     説明                      |
| ------------------------------- | --------------------------------------------- |
| pygame.gfxdraw.pixel            | 画素を描く                                    |
| pygame.gfxdraw.hline            | 横線を引く                                    |
| pygame.gfxdraw.vline            | たてをひく                                    |
| pygame.gfxdraw.line             | 線を引く                                      |
| pygame.gfxdraw.rectangle        | 矩形を描く                                    |
| pygame.gfxdraw.box              | 矩形を塗りつぶす                              |
| pygame.gfxdraw.circle           | 円を描く                                      |
| pygame.gfxdraw.aacircle         | アンチエイリアスの円を描く                    |
| pygame.gfxdraw.filled_circle    | 円を描く                                      |
| pygame.gfxdraw.ellipse          | だ円を描く                                    |
| pygame.gfxdraw.aaellipse        | アンチエイリアスのかかった楕円を描く          |
| pygame.gfxdraw.filled_ellipse   | だ円を描く                                    |
| pygame.gfxdraw.arc              | 弧を描く                                      |
| pygame.gfxdraw.pie              | パイを描く                                    |
| pygame.gfxdraw.trigon           | を描く                                        |
| pygame.gfxdraw.aatrigon         | アンチエイリアスのかかった三角形/四角形を描く |
| pygame.gfxdraw.filled_trigon    | 三角形を塗りつぶす                            |
| pygame.gfxdraw.polygon          | 多角形を描く                                  |
| pygame.gfxdraw.aapolygon        | アンチエイリアスのかかったポリゴンを描画する  |
| pygame.gfxdraw.filled_polygon   | 塗りつぶし多角形を描画する                    |
| pygame.gfxdraw.textured_polygon | テクスチャ付きポリゴンを描画する              |
| pygame.gfxdraw.bezier           | ベジェ曲線を描く                              |

### pygame.midi

midi の入出力に対応

|                API                |                             説明                             |
| --------------------------------- | ------------------------------------------------------------ |
| pygame.midi.init                  | MIDIモジュールの初期化                                       |
| pygame.midi.quit                  | MIDIモジュールのアンイニシャライズ                           |
| pygame.midi.get_init              | midiモジュールが現在初期化されている場合、Trueを返します。   |
| pygame.midi.Input                 | Inputは、MIDI機器からのMIDI入力を取得するために使用します。  |
| pygame.midi.Output                | 出力は、出力デバイスにミディを送るために使用します           |
| pygame.midi.get_count             | は、デバイスの数を取得します。                               |
| pygame.midi.get_default_input_id  | デフォルトの入力デバイス番号を取得                           |
| pygame.midi.get_default_output_id | デフォルトの出力デバイス番号を取得                           |
| pygame.midi.get_device_info       | MIDI 機器に関する情報を返します。                            |
| pygame.midi.midis2events          | midi イベントを pygame イベントに変換します。                |
| pygame.midi.time                  | PortMidiタイマーの現在時刻をms単位で返します。               |
| pygame.midi.frequency_to_midi     | 周波数をMIDIノートに変換します。最も近いMIDI音符に丸めます。 |
| pygame.midi.midi_to_frequency     | MIDIノートを周波数に変換します。                             |
| pygame.midi.midi_to_ansi_note     | MIDI番号に対応するAnsiノート名を返します。                   |
| pygame.midi.MidiException         | pygame.midiの関数やクラスが発生させることができる例外です。  |

#### pygame.midi.Input

|           API           |                               説明                               |
| ----------------------- | ---------------------------------------------------------------- |
| pygame.midi.Input.close | MIDIストリームを閉じ、保留中のバッファをすべてフラッシュします。 |
| pygame.midi.Input.poll  | データがある場合はTrueを、ない場合はFalseを返す。                |
| pygame.midi.Input.read  | バッファから num_events 個の MIDI イベントを読み込む。           |

#### pygame.midi.Output

|                API                |                                     説明                                     |
| --------------------------------- | ---------------------------------------------------------------------------- |
| pygame.midi.Output.abort          | 発信メッセージの即時終了                                                     |
| pygame.midi.Output.close          | MIDIストリームを閉じ、保留中のバッファをすべてフラッシュします。             |
| pygame.midi.Output.note_off       | MIDIノートをオフにします（ノートはオンである必要があります）。               |
| pygame.midi.Output.note_on        | MIDIノートをオンにします（ノートはオフでなければなりません）。               |
| pygame.midi.Output.set_instrument | 0～127の値で楽器を選択します。                                               |
| pygame.midi.Output.pitch_bend     | チャンネルのピッチを変更する。                                               |
| pygame.midi.Output.write          | 出力にMIDIデータのリストを書き込む                                           |
| pygame.midi.Output.write_short    | 出力に最大3バイトのMIDIデータを書き込みます。                                |
| pygame.midi.Output.write_sys_ex   | はタイムスタンプ付きのシステム・エクスクルーシブなMIDIメッセージを書き込む。 |

### pygame.PixelArray

表面のピクセルに直接アクセスするためのオブジェクト

|              API               |                         説明                          |
| ------------------------------ | ----------------------------------------------------- |
| pygame.PixelArray.surface      | PixelArrayが使用するSurfaceを取得します。             |
| pygame.PixelArray.itemsize     | 画素配列項目のバイトサイズを返します。                |
| pygame.PixelArray.ndim         | 次元数を返します。                                    |
| pygame.PixelArray.shape        | 配列のサイズを返します。                              |
| pygame.PixelArray.strides      | 配列の各次元に対応するバイトオフセットを返す。        |
| pygame.PixelArray.make_surface | 現在のPixelArrayから新しいSurfaceを作成します。       |
| pygame.PixelArray.replace      | PixelArray 内の渡された色を別の色に置き換えます。     |
| pygame.PixelArray.extract      | PixelArrayから渡された色を抽出する。                  |
| pygame.PixelArray.compare      | PixelArray を別のものと比較する。                     |
| pygame.PixelArray.transpose    | X軸とY軸を交換する。                                  |
| pygame.PixelArray.close        | PixelArray をクローズし、Surface ロックを解除します。 |

### pygame.pixelcopy

一般的なピクセル配列のコピー

|                API                |                        説明                        |
| --------------------------------- | -------------------------------------------------- |
| pygame.pixelcopy.surface_to_array | 表面のピクセルを配列オブジェクトにコピーする       |
| pygame.pixelcopy.array_to_surface | 配列オブジェクトをサーフェスにコピーする           |
| pygame.pixelcopy.map_array        | 表面形式を使用して、配列を別の配列にコピーします。 |
| pygame.pixelcopy.make_surface     | 配列を新しい表面にコピーする                       |

### pygame.sndarray

サウンドサンプルデータにアクセスする

|              API               |                           説明                           |
| ------------------------------ | -------------------------------------------------------- |
| pygame.sndarray.array          | サウンドサンプルを配列にコピーする                       |
| pygame.sndarray.samples        | 参照 サウンドサンプルを配列に格納                        |
| pygame.sndarray.make_sound     | 配列をSoundオブジェクトに変換する                        |
| pygame.sndarray.use_arraytype  | サウンドアレイに使用するアレイシステムを設定します。     |
| pygame.sndarray.get_arraytype  | 現在アクティブな配列の種類を取得します。                 |
| pygame.sndarray.get_arraytypes | 現在サポートされているアレイシステムの種類を取得します。 |

### pygame.surfarray

配列インタフェースを用いて表面ピクセルデータにアクセスする

|               API               |                           説明                           |
| ------------------------------- | -------------------------------------------------------- |
| pygame.surfarray.array2d        | 画素を2次元配列にコピーする                              |
| pygame.surfarray.pixels2d       | 画素を2次元配列に参照する                                |
| pygame.surfarray.array3d        | ピクセルを3次元配列にコピーする                          |
| pygame.surfarray.pixels3d       | 画素を3次元配列に参照する                                |
| pygame.surfarray.array_alpha    | 画素のアルファ値を2次元配列にコピーします。              |
| pygame.surfarray.pixels_alpha   | 参照画素のアルファを2次元配列にする                      |
| pygame.surfarray.array_red      | 赤の画素を2次元配列にコピーする                          |
| pygame.surfarray.pixels_red     | 参照画素の赤を2次元配列に変換する。                      |
| pygame.surfarray.array_green    | 緑色の画素を2次元配列にコピーする                        |
| pygame.surfarray.pixels_green   | 参照画素の緑を2次元配列にする。                          |
| pygame.surfarray.array_blue     | 青色のピクセルを2次元配列にコピーする                    |
| pygame.surfarray.pixels_blue    | 参照画素の青を2次元配列にする。                          |
| pygame.surfarray.array_colorkey | カラーキーの値を2次元配列にコピーします。                |
| pygame.surfarray.make_surface   | 配列を新しい表面にコピーする                             |
| pygame.surfarray.blit_array     | 配列の値から直接ブリットする                             |
| pygame.surfarray.map_array      | 3次元配列から2次元配列へのマッピング                     |
| pygame.surfarray.use_arraytype  | サーフェスアレイに使用するアレイシステムを設定します。   |
| pygame.surfarray.get_arraytype  | 現在アクティブな配列の種類を取得します。                 |
| pygame.surfarray.get_arraytypes | 現在サポートされているアレイシステムの種類を取得します。 |

### pygame.math

ベクタークラス

|         API         |                   説明                   |
| ------------------- | ---------------------------------------- |
| pygame.math.clamp   | 最小値と最大値にクランプされた値を返す。 |
| pygame.math.Vector2 | 2次元ベクトル                            |
| pygame.math.Vector3 | 3次元ベクトル                            |

#### pygame.math.Vector2

|                   API                   |                                       説明                                        |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| pygame.math.Vector2.dot                 | もう一方のベクトルとの内積またはスカラー積を計算します。                          |
| pygame.math.Vector2.cross               | 交差積またはベクトル積を計算します。                                              |
| pygame.math.Vector2.magnitude           | EuclideanMagnitude関数は、ベクトルのユークリッド法での大きさを返します。          |
| pygame.math.Vector2.magnitude_squared   | ベクトルの大きさの2乗を返します。                                                 |
| pygame.math.Vector2.length              | Euclidean Length関数は、ベクトルのユークリッド方向の長さを返します。              |
| pygame.math.Vector2.length_squared      | ベクトルのユークリッド長を2乗したものを返します。                                 |
| pygame.math.Vector2.normalize           | は同じ方向で長さが1のベクトルを返します。                                         |
| pygame.math.Vector2.normalize_ip        | その長さが1になるように，その場のベクトルを正規化する。                           |
| pygame.math.Vector2.is_normalized       | ベクトルが正規化されているかどうか，すなわち長さが == 1であるかどうかを調べます。 |
| pygame.math.Vector2.scale_to_length     | ベクトルを与えられた長さにスケールします。                                        |
| pygame.math.Vector2.reflect             | 指定された法線を反映したベクトルを返します。                                      |
| pygame.math.Vector2.reflect_ip          | 与えられた法線のベクトルをその場に反映させる。                                    |
| pygame.math.Vector2.distance_to         | 与えられたベクトルに対するユークリッド距離を計算します。                          |
| pygame.math.Vector2.distance_squared_to | 与えられたベクトルに対するユークリッド距離の2乗を計算します。                     |
| pygame.math.Vector2.move_towards        | 指定された距離だけターゲットに向かって移動したベクトルを返します。                |
| pygame.math.Vector2.move_towards_ip     | 指定された距離のターゲットに向かってベクトルを移動させます。                      |
| pygame.math.Vector2.lerp                | 与えられたベクトルに対して線形補間を行う。                                        |
| pygame.math.Vector2.slerp               | 与えられたベクトルに対する球面補間を返します。                                    |
| pygame.math.Vector2.elementwise         | 次の操作は、要素ごとに行われます。                                                |
| pygame.math.Vector2.rotate              | ベクトルを指定された角度（度）だけ回転させます。                                  |
| pygame.math.Vector2.rotate_rad          | ベクトルをラジアン単位で指定した角度だけ回転させます。                            |
| pygame.math.Vector2.rotate_ip           | ベクトルを所定の角度（度）だけ回転させます。                                      |
| pygame.math.Vector2.rotate_ip_rad       | ベクトルをラジアン単位で指定された角度だけ回転させます。                          |
| pygame.math.Vector2.rotate_rad_ip       | ベクトルをラジアン単位で指定された角度だけ回転させます。                          |
| pygame.math.Vector2.angle_to            | 指定されたベクトルに対する角度を度単位で計算します。                              |
| pygame.math.Vector2.as_polar            | 半径方向の距離と方位角のタプルを返す。                                            |
| pygame.math.Vector2.from_polar          | 極座標タプルからxとyを設定する。                                                  |
| pygame.math.Vector2.project             | ベクトルを別のベクトルに投影します。                                              |
| pygame.math.Vector2.copy                | 自分自身のコピーを返す。                                                          |
| pygame.math.Vector2.clamp_magnitude     | 大きさがmax_lengthとmin_lengthの間でクランプされたベクトルのコピーを返す。        |
| pygame.math.Vector2.clamp_magnitude_ip  | ベクトルの大きさを max_length と min_length の間でクランプする。                  |
| pygame.math.Vector2.update              | ベクトルの座標を設定する。                                                        |
| pygame.math.Vector2.epsilon             | ベクトル計算の許容範囲を決定します。                                              |

#### pygame.math.Vector3

|                   API                   |                                       説明                                        |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| pygame.math.Vector3.dot                 | もう一方のベクトルとの内積またはスカラー積を計算します。                          |
| pygame.math.Vector3.cross               | 交差積またはベクトル積を計算します。                                              |
| pygame.math.Vector3.magnitude           | Euclidean Magnitude関数は、ベクトルのユークリッド法での大きさを返します。         |
| pygame.math.Vector3.magnitude_squared   | ベクトルのユークリッド変換後の大きさを2乗した値を返します。                       |
| pygame.math.Vector3.length              | Euclidean Length関数は、ベクトルのユークリッド方向の長さを返します。              |
| pygame.math.Vector3.length_squared      | ベクトルのユークリッド長を2乗したものを返します。                                 |
| pygame.math.Vector3.normalize           | は同じ方向で長さが1のベクトルを返します。                                         |
| pygame.math.Vector3.normalize_ip        | その長さが1になるように，その場のベクトルを正規化する。                           |
| pygame.math.Vector3.is_normalized       | ベクトルが正規化されているかどうか，すなわち長さが == 1であるかどうかを調べます。 |
| pygame.math.Vector3.scale_to_length     | ベクトルを与えられた長さにスケールします。                                        |
| pygame.math.Vector3.reflect             | 指定された法線を反映したベクトルを返します。                                      |
| pygame.math.Vector3.reflect_ip          | 与えられた法線のベクトルをその場に反映させる。                                    |
| pygame.math.Vector3.distance_to         | 与えられたベクトルに対するユークリッド距離を計算します。                          |
| pygame.math.Vector3.distance_squared_to | 与えられたベクトルに対するユークリッド距離の2乗を計算します。                     |
| pygame.math.Vector3.move_towards        | 指定された距離だけターゲットに向かって移動したベクトルを返します。                |
| pygame.math.Vector3.move_towards_ip     | 指定された距離のターゲットに向かってベクトルを移動させます。                      |
| pygame.math.Vector3.lerp                | 与えられたベクトルに対して線形補間を行う。                                        |
| pygame.math.Vector3.slerp               | 与えられたベクトルに対する球面補間を返します。                                    |
| pygame.math.Vector3.elementwise         | 次の操作は、要素ごとに行われます。                                                |
| pygame.math.Vector3.rotate              | ベクトルを指定された角度（度）だけ回転させます。                                  |
| pygame.math.Vector3.rotate_rad          | ベクトルをラジアン単位で指定した角度だけ回転させます。                            |
| pygame.math.Vector3.rotate_ip           | ベクトルを所定の角度（度）だけ回転させます。                                      |
| pygame.math.Vector3.rotate_ip_rad       | ベクトルをラジアン単位で指定された角度だけ回転させます。                          |
| pygame.math.Vector3.rotate_rad_ip       | ベクトルをラジアン単位で指定された角度だけ回転させます。                          |
| pygame.math.Vector3.rotate_x            | ベクトルを x 軸まわりに角度（度）で回転させる。                                   |
| pygame.math.Vector3.rotate_x_rad        | ベクトルを x 軸まわりにラジアン単位で回転させる。                                 |
| pygame.math.Vector3.rotate_x_ip         | ベクトルを x 軸まわりに所定の角度（度）だけ回転させる。                           |
| pygame.math.Vector3.rotate_x_ip_rad     | ベクトルを x 軸まわりにラジアン単位の角度で回転させる。                           |
| pygame.math.Vector3.rotate_x_rad_ip     | ベクトルを x 軸まわりにラジアン単位の角度で回転させる。                           |
| pygame.math.Vector3.rotate_y            | ベクトルを y 軸まわりに角度（度）で回転させる。                                   |
| pygame.math.Vector3.rotate_y_rad        | ベクトルを y 軸まわりにラジアン単位で回転させる。                                 |
| pygame.math.Vector3.rotate_y_ip         | ベクトルを y 軸まわりに所定の角度（度）だけ回転させる。                           |
| pygame.math.Vector3.rotate_y_ip_rad     | ベクトルを y 軸まわりにラジアン単位の角度で回転させる。                           |
| pygame.math.Vector3.rotate_y_rad_ip     | ベクトルを y 軸まわりにラジアン単位の角度で回転させる。                           |
| pygame.math.Vector3.rotate_z            | ベクトルをz軸まわりに角度（度）で回転させる。                                     |
| pygame.math.Vector3.rotate_z_rad        | ベクトルをz軸の周りにラジアン単位で回転させます。                                 |
| pygame.math.Vector3.rotate_z_ip         | ベクトルをz軸まわりに所定の角度（度）だけ回転させる。                             |
| pygame.math.Vector3.rotate_z_ip_rad     | ベクトルをz軸まわりにラジアン単位の角度で回転させる。                             |
| pygame.math.Vector3.rotate_z_rad_ip     | ベクトルをz軸まわりにラジアン単位の角度で回転させる。                             |
| pygame.math.Vector3.angle_to            | 指定されたベクトルに対する角度を度単位で計算します。                              |
| pygame.math.Vector3.as_spherical        | 半径方向の距離、傾き、方位角のタプルを返します。                                  |
| pygame.math.Vector3.from_spherical      | 球座標の3タプルからx,y,zを設定する。                                              |
| pygame.math.Vector3.project             | ベクトルを別のベクトルに投影します。                                              |
| pygame.math.Vector3.copy                | 自分自身のコピーを返す。                                                          |
| pygame.math.Vector3.clamp_magnitude     | 大きさがmax_lengthとmin_lengthの間でクランプされたベクトルのコピーを返します。    |
| pygame.math.Vector3.clamp_magnitude_ip  | ベクトルの大きさを max_length と min_length の間でクランプする。                  |
| pygame.math.Vector3.update              | ベクトルの座標を設定する。                                                        |
| pygame.math.Vector3.epsilon             | ベクトル計算の許容範囲を決定します。                                              |

## その他:

### pygame.camera

カメラ用モジュール

|            API             |                          説明                          |
| -------------------------- | ------------------------------------------------------ |
| pygame.camera.init         | モジュールの初期化                                     |
| pygame.camera.get_backends | このシステムでサポートされているバックエンドを取得する |
| pygame.camera.colorspace   | サーフェス色空間変換                                   |
| pygame.camera.list_cameras | 利用可能なカメラの一覧を返します。                     |
| pygame.camera.Camera       | カメラをセットする                                     |

#### pygame.camera.Camera

|                API                |                          説明                          |
| --------------------------------- | ------------------------------------------------------ |
| pygame.camera.Camera.start        | オープン・初期化し、キャプチャを開始します。           |
| pygame.camera.Camera.stop         | カメラの停止、アンイニシャライズ、クローズ             |
| pygame.camera.Camera.get_controls | ユーザーコントロールの現在値を取得する                 |
| pygame.camera.Camera.set_controls | カメラでサポートされている場合、カメラの設定を変更する |
| pygame.camera.Camera.get_size     | 記録される画像の寸法を返す                             |
| pygame.camera.Camera.query_image  | フレームの準備ができたかどうかをチェックします         |
| pygame.camera.Camera.get_image    | 画像をSurfaceとして取り込む                            |
| pygame.camera.Camera.get_raw      | 変更されていない画像をバイトで返します。               |

### pygame.context

システムに関する追加のコンテキストを提供する

|               API               |                      説明                      |
| ------------------------------- | ---------------------------------------------- |
| pygame.context.get_pref_path    | アプリ用の書き込み可能なフォルダーを取得する   |
| pygame.context.get_pref_locales | システムで設定されている優先ロケールを取得する |

### pygame._sdl2.controller

コントローラを扱うモジュール

|                  API                   |                                                説明                                                |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| pygame._sdl2.controller.init           | コントローラモジュールの初期化                                                                     |
| pygame._sdl2.controller.quit           | コントローラモジュールの初期化を解除します。                                                       |
| pygame._sdl2.controller.get_init       | コントローラモジュールが初期化されている場合、True を返します。                                    |
| pygame._sdl2.controller.set_eventstate | コントローラに関するイベントの現在の状態を設定します。                                             |
| pygame._sdl2.controller.get_eventstate | コントローラに関するイベントの現在の状態を取得します。                                             |
| pygame._sdl2.controller.get_count      | ジョイスティックの接続台数を取得                                                                   |
| pygame._sdl2.controller.is_controller  | 与えられたジョイスティックがゲームコントローラインタフェースでサポートされているかどうかを確認する |
| pygame._sdl2.controller.name_forindex  | コントローラの名前を取得します。                                                                   |
| pygame._sdl2.controller.Controller     | Controllerオブジェクトを新規に作成します。                                                         |

#### pygame._sdl2.controller.Controller

|                       API                        |                               説明                               |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| pygame._sdl2.controller.Controller.quit          | コントローラの初期化                                             |
| pygame._sdl2.controller.Controller.get_init      | コントローラーが初期化されているかを確認する                     |
| pygame._sdl2.controller.Controller.from_joystick | pygame.joystick.JoystickオブジェクトからControllerを作成します。 |
| pygame._sdl2.controller.Controller.attached      | コントローラーが開かれ、現在接続されているかどうかを確認します。 |
| pygame._sdl2.controller.Controller.as_joystick   | pygame.joystick.Joystick()オブジェクトを返します。               |
| pygame._sdl2.controller.Controller.get_axis      | ジョイスティック軸の現在の状態を取得する                         |
| pygame._sdl2.controller.Controller.get_button    | ボタンの現在の状態を取得する                                     |
| pygame._sdl2.controller.Controller.get_mapping   | コントローラに割り当てられたマッピングを取得します。             |
| pygame._sdl2.controller.Controller.set_mapping   | コントローラにマッピングを割り当てる                             |
| pygame._sdl2.controller.Controller.rumble        | ゴロゴロ効果開始                                                 |
| pygame._sdl2.controller.Controller.stop_rumble   | ランブルエフェクトの再生を停止する                               |

### pygame.examples

プログラム例集

|                       API                       |                         説明                          |
| ----------------------------------------------- | ----------------------------------------------------- |
| pygame.examples.aliens.main                     | エイリアンの例をフルで再生する                        |
| pygame.examples.stars.main                      | シンプルなスターフィールドの例を実行する              |
| pygame.examples.chimp.main                      | 動き回るチンパンジーにぶつける                        |
| pygame.examples.moveit.main                     | アニメーションを表示する                              |
| pygame.examples.fonty.main                      | フォントレンダリングの例を実行する                    |
| pygame.examples.freetype_misc.main              | FreeTypeレンダリングの例を実行する                    |
| pygame.examples.vgrade.main                     | たてのグラデーションを表示する                        |
| pygame.examples.eventlist.main                  | pygameのイベントを表示する                            |
| pygame.examples.arraydemo.main                  | 様々なサーフアレー効果を発揮する                      |
| pygame.examples.sound.main                      | 読み込んで演奏する                                    |
| pygame.examples.sound_array_demos.main          | 様々なsndarrayのエフェクトを再生する                  |
| pygame.examples.liquid.main                     | リキッドアニメーションを表示する                      |
| pygame.examples.glcube.main                     | OpenGLを使った3Dキューブアニメーションの表示          |
| pygame.examples.scrap_clipboard.main            | クリップボードにアクセスする                          |
| pygame.examples.mask.main                       | 複数の画像を衝突検出で跳ね返し表示する                |
| pygame.examples.testsprite.main                 | ぎゃあぎゃあ騒ぐ                                      |
| pygame.examples.headless_no_windows_needed.main | 入力ファイルを平滑化したイメージファイルを作成する。  |
| pygame.examples.joystick.main                   | ジョイスティック機能のデモ                            |
| pygame.examples.blend_fill.main                 | surface.fillメソッドの様々なブレンドオプションのデモ  |
| pygame.examples.blit_blends.main                | は、surface.fill の代替となる追加フィルを使用します。 |
| pygame.examples.cursors.main                    | 2種類のカスタムカーソルを表示                         |
| pygame.examples.pixelarray.main                 | 様々なピクセルアレイ生成エフェクトを表示              |
| pygame.examples.scaletest.main                  | smoothscaleを使ったインタラクティブな画像の拡大縮小   |
| pygame.examples.midi.main                       | midiの例を実行する                                    |
| pygame.examples.scroll.main                     | 画像を拡大表示するSurface.scrollのサンプルを実行する  |
| pygame.examples.camera.main                     | カメラで撮影したライブ映像を表示する                  |
| pygame.examples.playmus.main                    | オーディオファイルを再生する                          |

### pygame.fastevent

イベントとキューを操作する

|            API            |                              説明                               |
| ------------------------- | --------------------------------------------------------------- |
| pygame.fastevent.init     | pygame.fasteventの初期化                                        |
| pygame.fastevent.get_init | fasteventモジュールが現在初期化されている場合、Trueを返します。 |
| pygame.fastevent.pump     | pygame のイベントハンドラを内部で処理する                       |
| pygame.fastevent.wait     | イベントを待つ                                                  |
| pygame.fastevent.poll     | イベントを取得する                                              |
| pygame.fastevent.get      | キューからすべてのイベントを取得する                            |
| pygame.fastevent.post     | イベントをキューに入れる                                        |

### pygame.scrap

クリップボードをサポートする

|          API           |                                      説明                                      |
| ---------------------- | ------------------------------------------------------------------------------ |
| pygame.scrap.init      | scrap モジュールを初期化する。                                                 |
| pygame.scrap.get_init  | 現在、scrap モジュールが初期化されている場合、True を返します。                |
| pygame.scrap.get       | 指定された型のデータをクリップボードから取得します。                           |
| pygame.scrap.get_types | 利用可能なクリップボードの種類の一覧を取得します。                             |
| pygame.scrap.put       | データをクリップボードに配置する。                                             |
| pygame.scrap.contains  | 指定された型のデータがクリップボードにあるかどうかを調べます。                 |
| pygame.scrap.lost      | クリップボードの所有権がpygameアプリケーションによって失われたかどうかを示す。 |
| pygame.scrap.set_mode  | クリップボードアクセスモードを設定します。                                     |

### pygame.tests

Pygame ユニットテストスイートパッケージ

|       API        |                     説明                     |
| ---------------- | -------------------------------------------- |
| pygame.tests.run | pygameのユニットテストスイートを実行します。 |


### pygame._sdl2.touch

タッチ入力を扱う

|                API                 |                              説明                              |
| ---------------------------------- | -------------------------------------------------------------- |
| pygame._sdl2.touch.get_num_devices | タッチデバイスの数を取得する                                   |
| pygame._sdl2.touch.get_device      | 指定されたインデックスに対応するタッチデバイスIDを取得します。 |
| pygame._sdl2.touch.get_num_fingers | タッチデバイスの有効な指の数                                   |
| pygame._sdl2.touch.get_finger      | 指を動かす                                                     |

### pygame.version

バージョン情報モジュール

|          API          |                   説明                   |
| --------------------- | ---------------------------------------- |
| pygame.version.ver    | バージョン番号を文字列で指定します。     |
| pygame.version.vernum | バージョンのタプル整数値                 |
| pygame.version.rev    | ビルドのリポジトリリビジョン             |
| pygame.version.SDL    | SDL ライブラリのバージョンのタプル整数値 |