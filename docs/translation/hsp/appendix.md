# 付録


## プリプロセッサ

|    API     |             説明              |
| ---------- | ----------------------------- |
| \#define   | 新規マクロを登録する          |
| \#func     | 外部DLL呼び出し命令登録       |
| \#cfunc    | 外部DLL呼び出し関数登録       |
| \#include  | 別ファイルを結合              |
| \#addition | 別ファイルを結合2             |
| \#uselib   | 外部DLLの指定                 |
| \#global   | モジュールの終了              |
| \#module   | モジュールの開始              |
| \#deffunc  | 新規命令を登録する            |
| \#defcfunc | 新規関数を登録する            |
| \#pack     | PACKFILE追加ファイル指定      |
| \#epack    | PACKFILE暗号化ファイル指定    |
| \#packopt  | 自動作成オプション指定        |
| \#const    | マクロ名の定数定義            |
| \#undef    | マクロ名の取り消し            |
| \#if       | 数値からコンパイル制御        |
| \#ifdef    | マクロ定義からコンパイル制御  |
| \#ifndef   | マクロ定義からコンパイル制御2 |
| \#else     | コンパイル制御を反転          |
| \#endif    | コンパイル制御ブロック終了    |
| \#modfunc  | 新規命令を割り当てる          |
| \#modcfunc | 新規関数を割り当てる          |
| \#modinit  | モジュール初期化処理の登録    |
| \#modterm  | モジュール解放処理の登録      |
| \#regcmd   | 拡張プラグインの登録          |
| \#cmd      | 拡張キーワードの登録          |
| \#usecom   | 外部COMインターフェースの指定 |
| \#comfunc  | 外部COM呼び出し命令登録       |
| \#enum     | マクロ名の定数を列挙          |
| \#runtime  | ランタイムファイルの設定      |
| \#cmpopt   | コンパイル時の設定            |
| \#bootopt  | ランタイム起動時の設定        |
| \#aht      | AHTファイルヘッダを記述       |
| \#ahtmes   | AHTメッセージの出力           |


## システム変数

|     API      |                   説明                   |
| ------------ | ---------------------------------------- |
| hspstat      | HSPランタイムの情報                      |
| hspver       | HSPのバージョン番号                      |
| cnt          | ループのカウンター                       |
| err          | HSPのエラーコード                        |
| stat         | 色々な命令のステータス値                 |
| mousex       | マウスカーソルのX座標                    |
| mousey       | マウスカーソルのY座標                    |
| mousew       | マウスカーソルのホイール値               |
| strsize      | 読み出しバイト数                         |
| refstr       | 色々な命令のステータス文字列             |
| looplev      | repeatのネストレベル                     |
| sublev       | サブルーチンのネストレベル               |
| iparam       | 割り込み要因を示す値                     |
| wparam       | 割り込み時のwParam                       |
| lparam       | 割り込み時のlParam                       |
| hwnd         | 現在のウィンドウハンドル                 |
| hdc          | 現在のデバイスコンテキスト               |
| hinstance    | 現在のインスタンスハンドル               |
| refdval      | 色々な命令のステータス実数値             |
| thismod      | 現在の有効なモジュール変数               |
| notemax      | メモリノートパッドの行数                 |
| notesize     | メモリノートパッドの文字数               |
| ginfo_mx     | スクリーン上のマウスカーソルX座標        |
| ginfo_my     | スクリーン上のマウスカーソルY座標        |
| ginfo_act    | アクティブなウィンドウID                 |
| ginfo_sel    | 操作先ウィンドウID                       |
| ginfo_wx1    | ウィンドウの左上X座標                    |
| ginfo_wy1    | ウィンドウの左上Y座標                    |
| ginfo_wx2    | ウィンドウの右下X座標                    |
| ginfo_wy2    | ウィンドウの右下Y座標                    |
| ginfo_vx     | ウィンドウのスクロールX座標              |
| ginfo_vy     | ウィンドウのスクロールY座標              |
| ginfo_sizex  | ウィンドウ全体のXサイズ                  |
| ginfo_sizey  | ウィンドウ全体のYサイズ                  |
| ginfo_winx   | 画面の描画エリアXサイズ                  |
| ginfo_winy   | 画面の描画エリアYサイズ                  |
| ginfo_sx     | 画面の初期化Xサイズ                      |
| ginfo_sy     | 画面の初期化Yサイズ                      |
| ginfo_mesx   | メッセージの出力Xサイズ                  |
| ginfo_mesy   | メッセージの出力Yサイズ                  |
| ginfo_r      | 現在設定されているカラーコードR          |
| ginfo_g      | 現在設定されているカラーコードG          |
| ginfo_b      | 現在設定されているカラーコードB          |
| ginfo_paluse | デスクトップのカラーモード               |
| ginfo_dispx  | デスクトップ全体のXサイズ                |
| ginfo_dispy  | デスクトップ全体のYサイズ                |
| ginfo_cx     | カレントポジションのX座標                |
| ginfo_cy     | カレントポジションのY座標                |
| ginfo_intid  | メッセージ割り込み時のウィンドウID       |
| ginfo_newid  | 未使用ウィンドウID                       |
| ginfo_accx   | 加速度センサー値(X)                      |
| ginfo_accy   | 加速度センサー値(Y)                      |
| ginfo_accz   | 加速度センサー値(Z)                      |
| dir_cur      | カレントディレクトリ(フォルダ)           |
| dir_exe      | 実行ファイルがあるディレクトリ(フォルダ) |
| dir_win      | Windowsディレクトリ(フォルダ)            |
| dir_sys      | Windowsシステムディレクトリ(フォルダ)    |
| dir_cmdline  | コマンドライン文字列                     |
| dir_desktop  | デスクトップディレクトリ(フォルダ)       |
| dir_mydoc    | マイドキュメントディレクトリ(フォルダ)   |
| dir_tv       | HSPTVディレクトリ(フォルダ)              |

## プログラム制御

|    API    |                    説明                    |
| --------- | ------------------------------------------ |
| await     | 一定の時間で待つ                           |
| exec      | Windowsのファイルを実行する                |
| end       | プログラム終了                             |
| gosub     | 指定ラベルにサブルーチンジャンプ           |
| goto      | 指定ラベルにジャンプ                       |
| if        | 条件を満たしていればその行の命令を実行     |
| loop      | ループの始まりに戻る                       |
| onexit    | 終了時にジャンプ                           |
| return    | サブルーチンから復帰                       |
| run       | 指定したファイルに制御を移す               |
| stop      | プログラム中断                             |
| wait      | 実行を一定時間中断する                     |
| repeat    | ループの始まりの場所を示す                 |
| break     | ループから抜ける                           |
| continue  | ループをやり直す                           |
| onkey     | キー割り込み実行指定                       |
| onclick   | クリック割り込み実行指定                   |
| onerror   | エラー発生時にジャンプ                     |
| exgoto    | 指定ラベルに条件ジャンプ                   |
| on        | 数値による分岐                             |
| while     | while繰り返し開始                          |
| wend      | while繰り返し終了                          |
| until     | do繰り返し終了                             |
| do        | do繰り返し開始                             |
| for       | 指定回数繰り返し開始                       |
| next      | 指定回数繰り返し終了                       |
| switch    | 比較ブロック開始                           |
| swend     | 比較ブロック終了                           |
| default   | デフォルト比較指定                         |
| case      | 比較値指定                                 |
| swbreak   | 比較実行脱出指定                           |
| _continue | マクロループをやり直す                     |
| _break    | マクロループを脱出する                     |
| foreach   | 変数の要素数だけ繰り返す                   |
| oncmd     | Windowsメッセージ割り込み実行指定          |
| else      | 条件を満たしていなければその行の命令を実行 |


## 標準マクロ

|       API        |                          説明                           |
| ---------------- | ------------------------------------------------------- |
| gmode_sub        | 色減算合成コピーモード                                  |
| gmode_add        | 色加算合成コピーモード                                  |
| gmode_gdi        | 通常のコピーモード                                      |
| gmode_rgb0       | 透明色付きコピーモード                                  |
| gmode_mem        | メモリ間コピーモード                                    |
| gmode_alpha      | 半透明合成コピーモード                                  |
| gmode_rgb0alpha  | 透明色付き半透明合成コピーモード                        |
| gmode_pixela     | ピクセルアルファブレンドコピーモード                    |
| objinfo_mode     | モードおよびオプションデータを取得                      |
| objinfo_bmscr    | オブジェクトが配置されているBMSCR構造体のポインタを取得 |
| objinfo_hwnd     | ウィンドウオブジェクトのハンドルを取得                  |
| screen_normal    | 通常のウィンドウを作成                                  |
| screen_palette   | パレットモードのウィンドウを作成                        |
| screen_hide      | 非表示のウィンドウを作成                                |
| screen_fixedsize | サイズ固定ウィンドウを作成                              |
| screen_tool      | ツールウィンドウを作成                                  |
| screen_frame     | 深い縁のあるウィンドウを作成                            |
| font_normal      | 通常のスタイルでフォント設定                            |
| font_bold        | 太文字でフォント設定                                    |
| font_italic      | イタリック体でフォント設定                              |
| font_underline   | 下線付きでフォント設定                                  |
| font_strikeout   | 打ち消し線付きでフォント設定                            |
| font_antialias   | アンチエイリアスでフォント設定                          |
| objmode_normal   | HSP標準フォントを設定                                   |
| objmode_guifont  | デフォルトGUIフォントを設定                             |
| objmode_usefont  | font命令で選択されているフォントを設定                  |
| objmode_usecolor | objcolor命令で選択されている色を設定                    |
| msgothic         | MSゴシックフォント                                      |
| msmincho         | MS明朝フォント                                          |
| and              | 論理積(演算子)                                          |
| or               | 論理和(演算子)                                          |
| xor              | 排他的論理和(演算子)                                    |
| not              | 否定(演算子)                                            |
| M_PI             | 円周率                                                  |
| rad2deg          | ラジアンを度に変換                                      |
| deg2rad          | 度をラジアンに変換                                      |


## 拡張マクロ

|      API       |                説明                |
| -------------- | ---------------------------------- |
| \_debug        | デバッグモード時                   |
| \_\_hsp30\_\_  | ver3.0以降使用時                   |
| \_\_file\_\_   | 使用時点で解析されているファイル名 |
| \_\_line\_\_   | 使用時点で解析されている行番号     |
| \_\_date\_\_   | 使用時点の日付                     |
| \_\_time\_\_   | 使用時点の時刻                     |
| \_\_hspver\_\_ | HSPバージョン番号                  |


## 基本関数

|    API    |                  説明                  |
| --------- | -------------------------------------- |
| int       | 整数値に変換                           |
| rnd       | 乱数を発生                             |
| strlen    | 文字列の長さを調べる                   |
| length    | 配列の1次元要素数を返す                |
| length2   | 配列の2次元要素数を返す                |
| length3   | 配列の3次元要素数を返す                |
| length4   | 配列の4次元要素数を返す                |
| vartype   | 変数の型を返す                         |
| varptr    | 変数データのポインタを返す             |
| varsize   | 変数データのバッファサイズを返す       |
| gettime   | 時間・日付を取得する                   |
| str       | 文字列に変換                           |
| dirinfo   | ディレクトリ情報の取得                 |
| double    | 実数値に変換                           |
| sin       | サイン値を返す                         |
| cos       | コサイン値を返す                       |
| tan       | タンジェント値を返す                   |
| atan      | アークタンジェント値を返す             |
| sqrt      | ルート値を返す                         |
| sysinfo   | システム情報の取得                     |
| peek      | バッファから1byte読み出し              |
| wpeek     | バッファから2byte読み出し              |
| lpeek     | バッファから4byte読み出し              |
| callfunc  | 外部関数の呼び出し                     |
| absf      | 実数の絶対値を返す                     |
| abs       | 整数の絶対値を返す                     |
| logf      | 対数を返す                             |
| expf      | 指数を返す                             |
| limit     | 一定範囲内の整数を返す                 |
| limitf    | 一定範囲内の実数を返す                 |
| varuse    | 変数の使用状況を返す                   |
| libptr    | 外部呼出しコマンドの情報アドレスを得る |
| comevdisp | COMイベントの内容を確認                |
| powf      | 累乗（べき乗）を求める                 |
| getease   | イージング値を整数で取得               |
| geteasef  | イージング値を実数で取得               |


## 画面制御

|   API    |                   説明                   |
| -------- | ---------------------------------------- |
| cls      | 画面クリア                               |
| mes      | メッセージ表示                           |
| print    | メッセージ表示                           |
| title    | タイトルバー設定                         |
| dialog   | ダイアログを開く                         |
| bgscr    | 枠のないウィンドウを初期化               |
| bmpsave  | 画面イメージセーブ                       |
| boxf     | 矩形を塗りつぶす                         |
| buffer   | 仮想画面を初期化                         |
| chgdisp  | 画像解像度を変更する                     |
| color    | カラー設定                               |
| font     | フォント設定                             |
| gcopy    | 画面コピー                               |
| gmode    | 画面コピーモード設定                     |
| gsel     | 描画先指定、ウィンドウ最前面、非表示設定 |
| gzoom    | 変倍して画面コピー                       |
| palcolor | 描画パレット設定                         |
| palette  | パレット設定                             |
| pget     | 1dotの点を取得                           |
| picload  | 画像ファイルをロード                     |
| pos      | カレントポジション設定                   |
| pset     | 1dotの点を表示                           |
| redraw   | 再描画の設定                             |
| screen   | ウィンドウを初期化                       |
| width    | ウィンドウサイズ設定                     |
| sysfont  | システムフォント選択                     |
| line     | 直線を描画                               |
| circle   | 円を描画する                             |
| syscolor | システムカラーを設定する                 |
| hsvcolor | HSV形式でカラーを設定する                |
| rgbcolor | RGB形式でカラーを設定する                |
| ginfo    | ウィンドウ情報の取得                     |
| grect    | 回転する矩形で塗りつぶす                 |
| grotate  | 矩形画像を回転してコピー                 |
| gsquare  | 任意の四角形を描画                       |
| objinfo  | ウィンドウオブジェクト情報の取得         |
| axobj    | ActiveXコントロールの配置                |
| winobj   | ウィンドウオブジェクトの配置             |
| sendmsg  | ウィンドウメッセージの送信               |
| groll    | ウィンドウの描画基点とスケールを設定     |
| gradf    | 矩形をグラデーションで塗りつぶす         |
| celload  | 画像ファイルをバッファにロード           |
| celdiv   | 画像素材の分割サイズを設定               |
| celput   | 画像素材を描画                           |


## オブジェクト

|    API    |                   説明                   |
| --------- | ---------------------------------------- |
| button    | ボタン表示                               |
| chkbox    | チェックボックス表示                     |
| clrobj    | オブジェクトをクリア                     |
| combox    | コンボボックス表示                       |
| input     | 入力ボックス表示                         |
| listbox   | リストボックス表示                       |
| mesbox    | メッセージボックス表示                   |
| objprm    | オブジェクトの内容を変更                 |
| objsize   | オブジェクトサイズ設定                   |
| objsel    | オブジェクトに入力フォーカスを設定       |
| objmode   | オブジェクトモード設定                   |
| objcolor  | オブジェクトのカラー設定                 |
| objenable | オブジェクトの有効・無効を設定           |
| objskip   | オブジェクトのフォーカス移動モードを設定 |
| objimage  | カスタムボタンの設定                     |
| layerobj  | レイヤーオブジェクトを追加               |


## 文字列

|     API     |               説明               |
| ----------- | -------------------------------- |
| getstr      | バッファから文字列読み出し       |
| noteadd     | 指定行の追加・変更               |
| notedel     | 行の削除                         |
| noteget     | 指定行を読み込み                 |
| noteinfo    | メモリノートパッド情報取得       |
| notesel     | 対象バッファ指定                 |
| noteunsel   | 対象バッファの復帰               |
| strmid      | 文字列の一部を取り出す           |
| instr       | 文字列の検索をする               |
| notesave    | 対象バッファ保存                 |
| noteload    | 対象バッファ読み込み             |
| getpath     | パスの一部を取得                 |
| strf        | 書式付き文字列を変換             |
| cnvwtos     | unicodeを通常文字列に変換        |
| cnvstow     | 通常文字列をunicodeに変換        |
| strtrim     | 指定した文字だけを取り除く       |
| split       | 文字列から分割された要素を代入   |
| strrep      | 文字列の置換をする               |
| notefind    | メモリノートパッド検索           |
| cnvatos     | ANSI文字列を通常文字列に変換     |
| cnvstoa     | 通常文字列をANSI文字列に変換     |
| strexchange | スクリプト内の文字列を置き換える |


## 数学

|      API       |                            説明                            |
| -------------- | ---------------------------------------------------------- |
| M_LOG2E        | 2を底とするネイピア数の対数                                |
| M_LOG10E       | 10を底とするネイピア数の対数                               |
| M_LN2          | ネイピア数を底とした2の対数                                |
| M_LN10         | ネイピア数を底とした10の対数                               |
| M_E            | ネイピア数                                                 |
| M_SQRTPI       | 円周率の平方根                                             |
| M_SQRT2        | 2の平方根                                                  |
| M_SQRT3        | 3の累乗根                                                  |
| DBL_DIG        | 10進数で有効な桁数                                         |
| DBL_EPSILON    | 1.0とその次に大きい値との差                                |
| DBL_MANT_DIG   | 仮数部のbit数                                              |
| DBL_MAX        | 実数の最大値                                               |
| DBL_MAX_10_EXP | 10進数での指数部の最大値                                   |
| DBL_MAX_EXP    | 2進数での指数部の最大値                                    |
| DBL_MIN        | 0を超える最小の値                                          |
| DBL_MIN_10_EXP | 10進数での指数部の最小値                                   |
| DBL_MIN_EXP    | 2進数での指数部の最小値                                    |
| INT_DIGIT      | 2進数で有効な桁数                                          |
| INT_DIGIT10    | 10進数で有効な桁数                                         |
| INT_MAX        | 最大値                                                     |
| INT_MIN        | 最小値                                                     |
| pow            | 累乗（べき乗）を求める                                     |
| log10          | 10を底とした対数（常用対数）                               |
| log2           | 2を底とした対数                                            |
| asin           | サインの逆関数（アークサイン）                             |
| acos           | コサインの逆関数（アークコサイン）                         |
| sinh           | 双曲線正弦関数（ハイパボリックサイン）                     |
| cosh           | 双曲線余弦関数（ハイパボリックコサイン）                   |
| tanh           | 双曲線正接関数（ハイパボリックタンジェント）               |
| asinh          | 双曲線正弦関数の逆関数（アークハイパボリックサイン）       |
| acosh          | 双曲線余弦関数の逆関数（アークハイパボリックコサイン）     |
| atanh          | 双曲線正接関数の逆関数（アークハイパボリックタンジェント） |
| isfinite       | 有限／無限・非数の判定                                     |
| isnan          | 非数の判定                                                 |
| round          | 四捨五入                                                   |
| sgn            | 符号                                                       |
| intf           | 0の方向へ丸め                                              |
| floor          | 負の方向へ丸め                                             |
| ceil           | 正の方向へ丸め                                             |
| fmod           | モジュロ                                                   |
| distance2      | 2点の距離を求める                                          |


## 入出力

|    API    |             説明             |
| --------- | ---------------------------- |
| getkey    | キー入力チェック             |
| mouse     | マウスカーソル座標設定       |
| randomize | 乱数発生の初期化             |
| stick     | キー入力情報取得             |
| logmes    | デバッグメッセージ送信       |
| assert    | デバッグウィンドウ表示       |
| mcall     | メソッドの呼び出し           |
| setease   | イージング関数の計算式を設定 |
| sortval   | 配列変数を数値でソート       |
| sortstr   | 配列変数を文字列でソート     |
| sortnote  | メモリノート文字列をソート   |
| sortget   | ソート元のインデックスを取得 |


## ファイル

|   API   |            説明            |
| ------- | -------------------------- |
| bcopy   | ファイルのコピー           |
| chdir   | ディレクトリ移動           |
| delete  | ファイル削除               |
| dirlist | ディレクトリ一覧を取得     |
| exist   | ファイルのサイズ取得       |
| mkdir   | ディレクトリ作成           |
| bload   | バッファにファイルをロード |
| bsave   | バッファをファイルにセーブ |
| memfile | メモリストリーム設定       |
| chdpm   | DPMファイル設定            |


## メモリ

|    API    |              説明              |
| --------- | ------------------------------ |
| alloc     | バッファを確保                 |
| dim       | 配列変数を作成                 |
| dimtype   | 指定タイプの配列変数を作成     |
| poke      | バッファに1byte書き込み        |
| wpoke     | バッファに2byte書き込み        |
| lpoke     | バッファに4byte書き込み        |
| sdim      | 文字列型配列変数を作成         |
| ddim      | 実数型配列変数を作成           |
| memcpy    | メモリブロックのコピー         |
| memset    | メモリブロックのクリア         |
| dup       | クローン変数を作成             |
| dupptr    | ポインタからクローン変数を作成 |
| mref      | 特殊なメモリを変数に割り当てる |
| newmod    | モジュール型変数の作成         |
| delmod    | モジュール型変数の要素削除     |
| memexpand | メモリブロックの再確保         |
| ldim      | ラベル型配列変数を作成         |
| newlab    | ラベル型変数を初期化           |


## マルチメディア

|  API   |           説明           |
| ------ | ------------------------ |
| mci    | MCIにコマンドを送る      |
| mmplay | メディア再生             |
| mmload | メディアファイル読み込み |
| mmstop | メディア再生の停止       |
| mmvol  | 音量の設定               |
| mmpan  | パンニングの設定         |
| mmstat | メディアの状態取得       |


## ユーティリティ

|      API       |                   説明                   |
| -------------- | ---------------------------------------- |
| bmppalette     | bmp画像パレット情報を読み込む            |
| gettimestr     | 現在の時刻を文字列で取得する             |
| getdatestr     | 現在の日付を文字列で取得する             |
| text           | 修飾文字表示の待ち時間を設定する         |
| textmode       | 修飾文字表示の設定を行なう               |
| emes           | 修飾文字を表示                           |
| gfade          | 画面のフェードを行なう                   |
| statictext     | スタティックテキストを配置               |
| statictext_set | スタティックテキストを変更               |
| scrollbar      | スクロールバーを配置                     |
| progbar        | プログレスバーを配置                     |
| progbar_set    | プログレスバーのステップ増分を設定する   |
| progbar_step   | プログレスバーを1ステップ進める          |
| note2array     | 複数行文字列を配列に変換                 |
| array2note     | 配列を複数行文字列に変換                 |
| arraysave      | 文字列型の配列変数をファイルに書き出し   |
| arrayload      | 文字列型の配列変数をファイルから読み込み |


## ソケット通信

|    API    |              説明              |
| --------- | ------------------------------ |
| sockopen  | ソケットを初期化して接続       |
| sockclose | ソケットを切断                 |
| sockput   | データを送信                   |
| sockputc  | データを1byte送信              |
| sockputb  | バッファのデータを送信         |
| sockcheck | データの到着を調べる           |
| sockget   | データを受信                   |
| sockgetc  | データを1byte受信              |
| sockgetb  | バッファにデータを受信         |
| sockmake  | ソケットをサーバーとして初期化 |
| sockwait  | クライアントの着信を待つ       |
| ipget     | ホストのIPアドレスを取得       |


## スプライト

|     API      |               説明               |
| ------------ | -------------------------------- |
| es_ini       | システムの初期化                 |
| es_area      | スプライト有効エリア設定         |
| es_size      | キャラクタサイズ指定             |
| es_pat       | キャラクタ画像定義               |
| es_link      | アニメーション設定               |
| es_kill      | スプライト削除                   |
| es_clear     | 複数スプライト削除               |
| es_exnew     | 新規スプライト取得               |
| es_new       | 新規スプライト取得               |
| es_get       | スプライト情報取得               |
| es_setp      | スプライトパラメータ設定         |
| es_find      | スプライト検索                   |
| es_check     | 衝突判定取得                     |
| es_offset    | オフセット座標設定               |
| es_set       | スプライト設定                   |
| es_flag      | flag値設定                       |
| es_chr       | chr値設定                        |
| es_type      | type値設定                       |
| es_pos       | スプライト座標設定               |
| es_setrot    | スプライト回転角度・表示倍率設定 |
| es_apos      | スプライト移動設定               |
| es_setgosub  | スプライト表示コールバック設定   |
| es_adir      | スプライト移動方向設定           |
| es_aim       | スプライト参照座標設定           |
| es_draw      | スプライト描画                   |
| es_gravity   | 落下加速度設定                   |
| es_bound     | 弾みやすさ設定                   |
| es_effect    | スプライト特殊効果設定           |
| es_fade      | スプライト点滅・フェード設定     |
| es_move      | スプライト移動                   |
| es_setpri    | スプライト優先順位設定           |
| es_put       | キャラクタ画面表示               |
| es_ang       | 角度取得                         |
| es_cos       | 三角関数                         |
| es_sin       | 三角関数                         |
| es_dist      | 2点間距離算出                    |
| es_bye       | スプライトシステム解放           |
| es_opt       | スプライト反発座標の設定         |
| es_patanim   | まとめてキャラクタ画像定義       |
| es_getpos    | スプライト座標取得               |
| es_bgmap     | BGマップを初期化                 |
| es_putbg     | BGマップを表示                   |
| es_bgmes     | BGマップに文字列を書き込み       |
| es_setparent | スプライトの親設定               |
| es_modaxis   | スプライト情報をまとめて変更     |
| es_arot      | スプライト自動回転ズーム設定     |


## HSP3Dish

|    API     |                  説明                  |
| ---------- | -------------------------------------- |
| setreq     | システムリクエスト設定                 |
| getreq     | システムリクエスト取得                 |
| gfilter    | テクスチャ補間の設定                   |
| mtlist     | ポイントIDリスト取得                   |
| mtinfo     | タッチ情報取得                         |
| devinfo    | デバイス情報文字列取得                 |
| devinfoi   | デバイス情報値取得                     |
| devprm     | デバイス制御用のパラメーター設定       |
| devcontrol | デバイス制御を実行する                 |
| setcls     | 画面クリア設定                         |
| celputm    | 複数のセルをまとめて描画               |
| httpload   | http通信の開始                         |
| httpinfo   | http通信の情報を取得                   |
| gmulcolor  | テクスチャ乗算値の設定                 |
| viewcalc   | 描画時の座標変換を設定                 |
| celbitmap  | 変数バッファを画像データとして適用する |


## HGIMG4共通

|      API       |                  説明                  |
| -------------- | -------------------------------------- |
| fvseti         | 整数値からベクトル設定                 |
| fvset          | ベクトル設定                           |
| fvadd          | ベクトル加算                           |
| fvsub          | ベクトル減算                           |
| fvmul          | ベクトル乗算                           |
| fvdiv          | ベクトル除算                           |
| fvdir          | ベクトル回転                           |
| fvface         | 座標から角度を得る                     |
| fvmin          | ベクトルの要素を最小値で切り詰める     |
| fvmax          | ベクトルの要素を最大値で切り詰める     |
| fvouter        | ベクトル外積                           |
| fvinner        | ベクトル内積                           |
| fvunit         | ベクトル正規化                         |
| fsin           | サインを求める                         |
| fcos           | コサインを求める                       |
| fsqr           | 平方根を求める                         |
| str2fv         | 文字列をベクトルに変換                 |
| fv2str         | ベクトルを文字列に変換                 |
| str2f          | 文字列を小数値に変換                   |
| f2str          | 小数値を文字列に変換                   |
| delobj         | オブジェクトの削除                     |
| setpos         | posグループ情報を設定                  |
| setang         | angグループ情報を設定                  |
| setangr        | angグループ情報を設定                  |
| setscale       | scaleグループ情報を設定                |
| setdir         | dirグループ情報を設定                  |
| setwork        | workグループ情報を設定                 |
| addpos         | posグループ情報を加算                  |
| addang         | angグループ情報を加算                  |
| addangr        | angグループ情報を加算                  |
| addscale       | scaleグループ情報を加算                |
| adddir         | dirグループ情報を加算                  |
| addwork        | workグループ情報を加算                 |
| getpos         | posグループ情報を取得                  |
| getscale       | scaleグループ情報を取得                |
| getdir         | dirグループ情報を取得                  |
| getwork        | workグループ情報を取得                 |
| getposi        | posグループ情報を整数で取得            |
| getscalei      | scaleグループ情報を整数で取得          |
| getdiri        | dirグループ情報を整数で取得            |
| getworki       | workグループ情報を整数で取得           |
| selpos         | 移動座標をMOC情報に設定                |
| selang         | 回転角度をMOC情報に設定                |
| selscale       | スケールをMOC情報に設定                |
| seldir         | 移動量をMOC情報に設定                  |
| selwork        | オブジェクトワークをMOC情報に設定      |
| objset3        | MOC情報を設定                          |
| objsetf3       | MOC情報を設定                          |
| objadd3        | MOC情報を加算                          |
| objaddf3       | MOC情報を加算                          |
| objadd3r       | MOC情報を加算                          |
| objset3r       | MOC情報を設定                          |
| setobjmode     | オブジェクトのモード設定               |
| setcoli        | オブジェクトのコリジョン設定           |
| getcoli        | オブジェクトのコリジョン判定           |
| getobjcoli     | オブジェクトのグループ取得             |
| setobjrender   | オブジェクトのレンダリンググループ設定 |
| findobj        | オブジェクト検索                       |
| nextobj        | 次のオブジェクト検索                   |
| setborder      | オブジェクト有効範囲設定               |
| selmoc         | MOC情報を設定                          |
| objgetfv       | MOC情報を取得                          |
| objsetfv       | MOC情報を設定                          |
| objaddfv       | MOC情報を加算                          |
| objexist       | オブジェクトIDが有効か調べる           |
| event_wait     | 待ち時間イベントを追加                 |
| event_jump     | ジャンプイベントを追加                 |
| event_prmset   | パラメーター設定イベントを追加         |
| event_prmon    | パラメータービット設定イベントを追加   |
| event_prmoff   | パラメータービット消去イベントを追加   |
| event_setpos   | posグループ設定イベントを追加          |
| event_setang   | angグループ設定イベントを追加          |
| event_setangr  | angグループ設定イベントを追加          |
| event_setscale | scaleグループ設定イベントを追加        |
| event_setdir   | dirグループ設定イベントを追加          |
| event_setwork  | workグループ設定イベントを追加         |
| event_pos      | posグループ変化イベントを追加          |
| event_ang      | angグループ変化イベントを追加          |
| event_angr     | angグループ変化イベントを追加          |
| event_scale    | scaleグループ変化イベントを追加        |
| event_dir      | dirグループ変化イベントを追加          |
| event_work     | workグループ変化イベントを追加         |
| event_addpos   | posグループ加算イベントを追加          |
| event_addang   | angグループ加算イベントを追加          |
| event_addangr  | angグループ加算イベントを追加          |
| event_addscale | scaleグループ加算イベントを追加        |
| event_adddir   | dirグループ加算イベントを追加          |
| event_addwork  | workグループ加算イベントを追加         |
| setevent       | オブジェクトにイベントを設定           |
| delevent       | イベントリストを削除                   |
| newevent       | イベントリストを作成                   |
| getang         | angグループ情報を取得                  |
| getangr        | angグループ情報を取得                  |
| event_delobj   | オブジェクト削除イベントを追加         |


## HGIMG4

|      API      |                      説明                      |
| ------------- | ---------------------------------------------- |
| gpreset       | HGIMG4の初期化                                 |
| gpdraw        | シーン内の全オブジェクトを描画する             |
| gpusescene    | シーンの切り替え                               |
| gpsetprm      | オブジェクトのコアパラメーター設定             |
| gpgetprm      | オブジェクトのコアパラメーター取得             |
| gppostefx     | ポストエフェクト生成                           |
| gpuselight    | ライトオブジェクトの登録                       |
| gpusecamera   | カメラオブジェクトの切り替え                   |
| gpmatprm      | マテリアルのパラメーター設定                   |
| gpmatstate    | マテリアルのステート設定                       |
| gpviewport    | ビューポート設定                               |
| setobjname    | オブジェクトのノード名を設定する               |
| getobjname    | オブジェクトのノード名を取得する               |
| gpcolormat    | カラーマテリアルの生成                         |
| gptexmat      | テクスチャマテリアルの生成                     |
| gpscrmat      | オフスクリーンテクスチャマテリアルの生成       |
| gpusermat     | カスタムマテリアルの生成                       |
| gpclone       | ノードを複製                                   |
| gpnull        | ヌルノードを生成                               |
| gpload        | 3Dモデルノードを生成                           |
| gpplate       | 板ノードを生成                                 |
| gpfloor       | 床ノードを生成                                 |
| gpbox         | 箱ノードを生成                                 |
| gpspr         | 2Dスプライトノード生成                         |
| gplight       | ライトノードを設定                             |
| gpcamera      | カメラノードを設定                             |
| gplookat      | 指定座標に向けてノードを回転                   |
| gppbind       | ノードに標準的な物理特性を設定                 |
| getwork2      | ノードワーク値2を取得                          |
| getwork2i     | ノードワーク値2を取得(整数値)                  |
| selquat       | オブジェク回転情報をMOC情報に設定              |
| selwork2      | オブジェクトワーク2をMOC情報に設定             |
| setwork2      | work2グループ情報を設定                        |
| addwork2      | work2グループ情報を加算                        |
| gpcnvaxis     | 3D座標の変換を行なう                           |
| gppset        | ノードの物理パラメーターを設定                 |
| gpobjpool     | オブジェクトID生成の設定                       |
| gppapply      | ノードに物理的な力を適用する                   |
| gpmatprm1     | マテリアルのパラメーター設定(2)                |
| gpmatprm4     | マテリアルのパラメーター設定(3)                |
| setalpha      | オブジェクトの透明度(α値)設定                  |
| gpgetlog      | HGIMG4エラーログを取得                         |
| gpaddanim     | アニメーションクリップを追加                   |
| gpact         | アニメーションクリップを再生/停止              |
| gpgetanim     | アニメーションクリップ設定を取得               |
| gpsetanim     | アニメーションクリップ設定を更新               |
| gpmatprm16    | マテリアルのパラメーター設定(マトリクス)       |
| gpmatprmt     | マテリアルのパラメーター設定(テクスチャ)       |
| gpusershader  | ユーザーシェーダーの指定                       |
| gpgetmat      | マテリアルIDの取得                             |
| setquat       | quatグループ情報を設定                         |
| getquat       | quatグループ情報を取得                         |
| event_suicide | オブジェクト破棄イベントを追加                 |
| gpsetprmon    | オブジェクトのコアパラメーター設定(ビット追加) |
| gpsetprmoff   | オブジェクトのコアパラメーター設定(ビット削除) |
| setangy       | angグループ情報を設定                          |
| setangz       | angグループ情報を設定                          |
| event_angy    | angグループ変化イベントを追加                  |
| event_angz    | angグループ変化イベントを追加                  |
| event_setangy | angグループ設定イベントを追加                  |
| event_setangz | angグループ設定イベントを追加                  |
| gpresetlight  | カレントライトの初期化                         |
| setobjlight   | オブジェクトにカレントライトを設定             |
| gppcontact    | オブジェクトの物理衝突情報を作成する           |
| gppinfo       | オブジェクトの物理衝突情報を取得する           |
| gppraytest    | ベクトル上の物理衝突情報を取得する             |
| event_fade    | フェード設定イベントを追加                     |
| gpmesh        | 3Dメッシューノードを生成                       |
| gpmeshclear   | カスタム3Dメッシュを初期化                     |
| gpmeshadd     | カスタム3Dメッシュに頂点情報を追加             |
| gpmeshpolygon | カスタム3Dメッシュに面情報を追加               |
| gpnodeinfo    | 3Dモデルの階層情報を取得する                   |


## OBAQ

|     API     |                説明                |
| ----------- | ---------------------------------- |
| qreset      | OBAQ初期化                         |
| qterm       | OBAQ終了処理                       |
| qexec       | OBAQフレーム処理                   |
| qdraw       | OBAQ描画処理                       |
| qview       | ビュー設定                         |
| qsetreq     | システムリクエスト設定             |
| qgetreq     | システムリクエスト取得             |
| qborder     | 外壁を設定                         |
| qgravity    | 重力を設定                         |
| qcnvaxis    | X,Y座標値を変換                    |
| qgetaxis    | 内部座標を取得                     |
| qdel        | オブジェクト削除                   |
| qaddpoly    | 多角形オブジェクト追加             |
| qaddmodel   | 自由設定オブジェクト追加           |
| qtype       | typeパラメーターを設定             |
| qstat       | statパラメーターを設定             |
| qpos        | 位置、角度パラメーターを設定       |
| qspeed      | 速度パラメーターを設定             |
| qweight     | 重さなどのパラメーターを設定       |
| qdamper     | 吸振などのパラメーターを設定       |
| qinertia    | 惰性などのパラメーターを設定       |
| qgroup      | グループパラメーターを設定         |
| qmat        | マテリアルパラメーターを設定       |
| qmat2       | マテリアル詳細パラメーターを設定   |
| qmat3       | マテリアル表示パラメーターを設定   |
| quser       | ユーザー定義データを設定           |
| quser2      | ユーザー定義データを設定2          |
| qfind       | オブジェクト検索                   |
| qnext       | オブジェクト検索結果取得           |
| qcollision  | コリジョン取得開始                 |
| qgetcol     | コリジョン取得                     |
| qgetcol2    | コリジョン詳細情報取得             |
| qgetcol3    | コリジョン詳細情報取得2            |
| qgettype    | typeパラメーターを取得             |
| qgetstat    | statパラメーターを取得             |
| qgetpos     | 位置、角度パラメーターを取得       |
| qgetspeed   | 速度パラメーターを取得             |
| qgetweight  | 重さなどのパラメーターを取得       |
| qgetdamper  | 吸振などのパラメーターを取得       |
| qgetinertia | 惰性などのパラメーターを取得       |
| qgetgroup   | グループパラメーターを取得         |
| qgetmat     | マテリアルパラメーターを取得       |
| qgetmat2    | マテリアル詳細パラメーターを取得   |
| qgetmat3    | マテリアル表示パラメーターを取得   |
| qgetuser    | ユーザー定義データを取得           |
| qgetuser2   | ユーザー定義データを取得2          |
| qpush       | 任意の場所に力を与える             |
| qblast      | 任意の場所から放射状に力を与える   |
| qgetversion | バージョン情報を取得               |
| qinner      | 座標がオブジェクト内にあるかを取得 |
| qgetptr     | システムポインタ値取得             |