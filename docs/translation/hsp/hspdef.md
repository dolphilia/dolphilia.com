# 標準マクロ

__対応__:

- Win
- Mac
- Cli

## gmode_sub {#gmode_sub}

色減算合成コピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードを色減算合成コピーモードに設定できます。


__例__:

	screen 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	gsel 0
	color       : boxf img_width / 5, 0, img_width  * 2 / 5, ginfo_winy
	color 255   : boxf img_width * 2 / 5, 0, img_width * 3 / 5, ginfo_winy
	color ,255  : boxf img_width * 3 / 5, 0, img_width * 4 / 5, ginfo_winy
	color ,,255 : boxf img_width * 4 / 5, 0, img_width, ginfo_winy
	gmode gmode_sub, img_width, img_height, 256
	gcopy 1, 0, 0
	stop


__参照__:

gmode
gmode_rgb0
gmode_mem
gmode_alpha
gmode_add
gmode_gdi
gmode_rgb0alpha
gmode_pixela

## gmode_add {#gmode_add}

色加算合成コピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードを色加算合成コピーモードに設定できます。


__例__:

	screen 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	gsel 0
	color       : boxf img_width / 5, 0, img_width  * 2 / 5, ginfo_winy
	color 255   : boxf img_width * 2 / 5, 0, img_width * 3 / 5, ginfo_winy
	color ,255  : boxf img_width * 3 / 5, 0, img_width * 4 / 5, ginfo_winy
	color ,,255 : boxf img_width * 4 / 5, 0, img_width, ginfo_winy
	gmode gmode_add, img_width, img_height, 256
	gcopy 1, 0, 0
	stop


__参照__:

gmode
gmode_rgb0
gmode_mem
gmode_alpha
gmode_sub
gmode_gdi
gmode_rgb0alpha
gmode_pixela

## gmode_gdi {#gmode_gdi}

通常のコピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードを通常のコピーモードに設定できます。
省略しても同じ結果が得られますので、省略しても構いません。


__例__:

	buffer 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	gsel 0
	gmode gmode_gdi
	gcopy 1, 0, 0, img_width, img_height
	stop


__参照__:

gmode
gmode_rgb0
gmode_mem
gmode_alpha
gmode_add
gmode_sub
gmode_rgb0alpha
gmode_pixela

## gmode_rgb0 {#gmode_rgb0}

透明色付きコピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードを透明色付きコピーモードに設定できます。


__例__:

	screen 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	gsel 0
	gmode gmode_rgb0, img_width, img_height
	gcopy 1, 0, 0
	stop


__参照__:

gmode
gmode_sub
gmode_mem
gmode_alpha
gmode_add
gmode_gdi
gmode_rgb0alpha
gmode_pixela

## gmode_mem {#gmode_mem}

メモリ間コピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードをメモリ間コピーモードに設定できます。


__例__:

	screen 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	gsel 0
	gmode gmode_mem, img_width, img_height
	gcopy 1, 0, 0
	stop


__参照__:

gmode
gmode_rgb0
gmode_sub
gmode_alpha
gmode_add
gmode_gdi
gmode_rgb0alpha
gmode_pixela

## gmode_alpha {#gmode_alpha}

半透明合成コピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードを半透明合成コピーモードに設定できます。


__例__:

	screen 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	gsel 0
	color       : boxf img_width / 5, 0, img_width  * 2 / 5, ginfo_winy
	color 255   : boxf img_width * 2 / 5, 0, img_width * 3 / 5, ginfo_winy
	color ,255  : boxf img_width * 3 / 5, 0, img_width * 4 / 5, ginfo_winy
	color ,,255 : boxf img_width * 4 / 5, 0, img_width, ginfo_winy
	gmode gmode_alpha, img_width, img_height, 128
	gcopy 1, 0, 0
	stop


__参照__:

gmode
gmode_rgb0
gmode_mem
gmode_sub
gmode_add
gmode_gdi
gmode_rgb0alpha
gmode_pixela

## gmode_rgb0alpha {#gmode_rgb0alpha}

透明色付き半透明合成コピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードを透明色付き半透明合成コピーモードに設定できます。


__例__:

	screen 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	gsel 0
	color   0,   0,   0 : boxf img_width / 5, 0, img_width  * 2 / 5, ginfo_winy
	color 255,   0,   0 : boxf img_width * 2 / 5, 0, img_width * 3 / 5, ginfo_winy
	color   0, 255,   0 : boxf img_width * 3 / 5, 0, img_width * 4 / 5, ginfo_winy
	color   0,   0, 255 : boxf img_width * 4 / 5, 0, img_width, ginfo_winy
	gmode gmode_rgb0alpha, img_width, img_height, 128
	color 0, 0, 0
	gcopy 1, 0, 0
	stop


__参照__:

gmode
gmode_rgb0
gmode_mem
gmode_alpha
gmode_add
gmode_gdi
gmode_sub
gmode_pixela

## gmode_pixela {#gmode_pixela}

ピクセルアルファブレンドコピーモード


__説明__:

gmodeの第1引数に指定することで、画面コピーモードをピクセルアルファブレンドコピーモードに設定できます。


__例__:

	screen 1 : picload dir_exe + "/sample/demo/logop.bmp"
	img_width = ginfo_winx
	img_height = ginfo_winy
	screen 1, img_width * 2, img_height : picload dir_exe + "/sample/demo/logop.bmp", 1
	repeat img_width
		hsvcolor cnt * 192 / ( img_width  ), 255, 255
		line img_width + cnt, img_height, img_width + cnt, 0
	loop
	gsel 0
	gmode gmode_pixela, img_width, img_height, 128
	gcopy 1, 0, 0
	stop


__参照__:

gmode
gmode_rgb0
gmode_mem
gmode_alpha
gmode_add
gmode_gdi
gmode_rgb0alpha
gmode_sub

## objinfo_mode {#objinfo_mode}

モードおよびオプションデータを取得


__パラメーター__:

(p1)
p1=0〜 : ウィンドウオブジェクトID


__説明__:

指定したウィンドウオブジェクトのモードおよびオプションデータを返します。


__例__:

	button goto "sample", *dummy
	info = objinfo_mode( stat )
	mes "mode : " + ( info & 0xffff )
	mes "option : " + ( info >> 16 & 0xffff )

*dummy
	stop


__参照__:

objinfo
objinfo_hwnd
objinfo_bmscr

## objinfo_bmscr {#objinfo_bmscr}

オブジェクトが配置されているBMSCR構造体のポインタを取得


__パラメーター__:

(p1)
p1=0〜 : ウィンドウオブジェクトID


__説明__:

指定したウィンドウオブジェクトが配置されているBMSCR構造体のポインタを返します。


__例__:

	button goto "sample", *dummy
	p_bmscr = objinfo_bmscr( stat )
	mes "objectが配置されているBMSCR構造体のポインタ : " + p_bmscr
	mref bmscr, 67
	mes "mrefで得られる値（" + varptr( bmscr ) + "）と同等"

*dummy
	stop


__参照__:

objinfo
objinfo_mode
objinfo_hwnd

## objinfo_hwnd {#objinfo_hwnd}

ウィンドウオブジェクトのハンドルを取得


__パラメーター__:

(p1)
p1=0〜 : ウィンドウオブジェクトID


__説明__:

指定したウィンドウオブジェクトのハンドルを返します。


__例__:

	button goto "sample", *dummy
	obj_hwnd = objinfo_hwnd( stat )
	mes "ウィンドウオブジェクトのハンドル : " + obj_hwnd

*dummy
	stop


__参照__:

objinfo
objinfo_mode
objinfo_bmscr

## screen_normal {#screen_normal}

通常のウィンドウを作成


__説明__:

screen命令の第4引数に指定することで、通常のウィンドウを作成できます。
省略しても同じ結果が得られますので、省略しても構いません。


__例__:

// ウィンドウID0の通常のウィンドウを作成
	screen 0, 640, 480, screen_normal

// 省略しても同じ結果が得られる
	screen 1, 320, 240
	stop


__参照__:

screen
screen_palette
screen_hide
screen_fixedsize
screen_tool
screen_frame


## screen_palette {#screen_palette}

パレットモードのウィンドウを作成


__説明__:

screen命令の第4引数に指定することで、パレットモードのウィンドウを作成できます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// ウィンドウID0のウィンドウをパレットモードで作成
	screen 0, 640, 480, screen_palette
	stop


__参照__:

screen
screen_normal
screen_hide
screen_fixedsize
screen_tool
screen_frame


## screen_hide {#screen_hide}

非表示のウィンドウを作成


__説明__:

screen命令の第4引数に指定することで、非表示のウィンドウを作成できます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// ウィンドウID0のウィンドウを非表示で作成
	screen 0, 640, 480, screen_hide
	stop


__参照__:

screen
screen_normal
screen_palette
screen_fixedsize
screen_tool
screen_frame

## screen_fixedsize {#screen_fixedsize}

サイズ固定ウィンドウを作成


__説明__:

screen命令の第4引数に指定することで、サイズ固定のウィンドウを作成できます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// ウィンドウID0のウィンドウをサイズ固定で作成
	screen 0, 640, 480, screen_fixedsize
	stop


__参照__:

screen
screen_normal
screen_palette
screen_hide
screen_tool
screen_frame

## screen_tool {#screen_tool}

ツールウィンドウを作成


__説明__:

screen命令の第4引数に指定することで、ツールウィンドウを作成できます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// ウィンドウID0のツールウィンドウを作成
	screen 0, 640, 480, screen_tool
	stop


__参照__:

screen
screen_normal
screen_palette
screen_hide
screen_fixedsize
screen_frame


## screen_frame {#screen_frame}

深い縁のあるウィンドウを作成


__説明__:

screen命令の第4引数に指定することで、深い縁のあるウィンドウを作成できます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// ウィンドウIDの深い縁のあるウィンドウを作成
	screen 0, 640, 480, screen_frame
	stop


__参照__:

screen
screen_normal
screen_palette
screen_hide
screen_fixedsize
screen_tool


## font_normal {#font_normal}

通常のスタイルでフォント設定


__説明__:

font命令の第3引数に指定することで、通常のスタイルでフォントを設定することができます。
省略しても同じ結果が得られますので、省略しても構いません。


__例__:

// サイズ12のMSゴシックを設定
	font msgothic, 24, font_normal
	mes "サイズ24のMSゴシック（通常のスタイル）"

// 省略しても同じ結果が得られる
	font msgothic, 24
	mes "サイズ24のMSゴシック（通常のスタイル）"
	stop


__参照__:

font
font_bold
font_italic
font_underline
font_strikeout
font_antialias

## font_bold {#font_bold}

太文字でフォント設定


__説明__:

font命令の第3引数に指定することで、太文字のフォントを設定することができます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// サイズ24のMSゴシックを設定
	font msgothic, 24, font_normal
	mes "サイズ24のMSゴシック（通常のスタイル）"

// サイズ24で太文字のMSゴシックを設定
	font msgothic, 24, font_bold
	mes "サイズ24のMSゴシック（太文字）"
	stop


__参照__:

font
font_normal
font_italic
font_underline
font_strikeout
font_antialias

## font_italic {#font_italic}

イタリック体でフォント設定


__説明__:

font命令の第3引数に指定することで、イタリック体のフォントを設定することができます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// サイズ24のMSゴシックを設定
	font msgothic, 24, font_normal
	mes "サイズ24のMSゴシック（通常のスタイル）"

// サイズ24でイタリック体MSmsゴシックを設定
	font msgothic, 24, font_italic
	mes "サイズ24のMSゴシック（イタリック体）"
	stop


__参照__:

font
font_normal
font_bold
font_underline
font_strikeout
font_antialias

## font_underline {#font_underline}

下線付きでフォント設定


__説明__:

font命令の第3引数に指定することで、下線付きのフォントを設定することができます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// サイズ24のMSゴシックを設定
	font msgothic, 24, font_normal
	mes "サイズ24のMSゴシック（通常のスタイル）"

// サイズ24で下線付きのMSゴシックを設定
	font msgothic, 24, font_underline
	mes "サイズ24のMSゴシック（下線付き）"
	stop


__参照__:

font
font_normal
font_bold
font_italic
font_strikeout
font_antialias

## font_strikeout {#font_strikeout}

打ち消し線付きでフォント設定


__説明__:

font命令の第3引数に指定することで、打ち消し線付きのフォントを設定することができます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// サイズ24のMSゴシックを設定
	font msgothic, 24, font_normal
	mes "サイズ24のMSゴシック（通常のスタイル）"

// サイズ24で打ち消し線付きのMSゴシックを設定
	font msgothic, 24, font_strikeout
	mes "サイズ24のMSゴシック（打ち消し線付き）"
	stop


__参照__:

font
font_normal
font_bold
font_italic
font_underline
font_antialias

## font_antialias {#font_antialias}

アンチエイリアスでフォント設定


__説明__:

font命令の第3引数に指定することで、アンチエイリアスのフォントを設定することができます。
他のマクロと組み合わせて指定する場合は、その和または論理和を指定してください。


__例__:

// サイズ24のMSゴシックを設定
	font msgothic, 24, font_normal
	mes "サイズ24のMSゴシック（通常のスタイル）"

// サイズ24でアンチエイリアスのMSゴシックを設定
	font msgothic, 24, font_antialias
	mes "サイズ24のMSゴシック（アンチエイリアス）"
	stop


__参照__:

font
font_normal
font_bold
font_italic
font_underline
font_strikeout



## objmode_normal {#objmode_normal}

HSP標準フォントを設定


__説明__:

objmode命令の第1引数に指定することで、オブジェクト制御命令で使用されるフォントをHSP標準フォントに設定することができます。
省略しても同じ結果が得られますので、省略しても構いません。


__例__:

	s = "オブジェクト制御命令で使用されるフォントのサンプル"

// オブジェクト制御命令で使用されるフォントをHSP標準フォントに設定
	objmode objmode_normal
	mesbox s, ginfo_winx, ginfo_winy / 2

// 省略しても同じ結果が得られる
	objmode objmode_normal
	mesbox s, ginfo_winx, ginfo_winy / 2

	stop


__参照__:

objmode
objmode_guifont
objmode_usefont
objmode_usecolor


## objmode_guifont {#objmode_guifont}

デフォルトGUIフォントを設定


__説明__:

objmode命令の第1引数に指定することで、オブジェクト制御命令で使用されるフォントをデフォルトGUIフォントに設定することができます。


__例__:

	s = "オブジェクト制御命令で使用されるフォントのサンプル"

// オブジェクト制御命令で使用されるフォントをデフォルトGUIフォントに設定
	objmode objmode_guifont
	mesbox s, ginfo_winx, ginfo_winy

	stop


__参照__:

objmode
objmode_normal
objmode_usefont
objmode_usecolor



## objmode_usefont {#objmode_usefont}

font命令で選択されているフォントを設定


__説明__:

objmode命令の第1引数に指定することで、オブジェクト制御命令で使用されるフォントをfont命令で選択されているフォントに設定することができます。


__例__:

	s = "オブジェクト制御命令で使用されるフォントのサンプル"

// オブジェクト制御命令で使用されるフォントをfont命令で選択されているフォントに設定
	objmode objmode_usefont

	font msmincho, 24
	mesbox s, ginfo_winx, ginfo_winy / 2

	font msgothic, 18, font_italic
	mesbox s, ginfo_winx, ginfo_winy / 2

	stop


__参照__:

objmode
objmode_normal
objmode_guifont
objmode_usecolor



## objmode_usecolor {#objmode_usecolor}

objcolor命令で選択されている色を設定


__説明__:

objmode命令の第1引数に指定することで、オブジェクト制御命令で使用される色をcolor命令、objcolor命令で指定されている色に設定することができます。


__参照__:

objmode
objmode_normal
objmode_guifont
objmode_usefont




## msgothic {#msgothic}

MSゴシックフォント


__グループ__:

システム変数


__説明__:

MSゴシックを示すフォントを示すキーワードです。
font命令で指定するフォント名として使用することができます。


__参照__:

msmincho



## msmincho {#msmincho}

MS明朝フォント


__グループ__:

システム変数


__説明__:

MS明朝を示すフォントを示すキーワードです。
font命令で指定するフォント名として使用することができます。


__参照__:

msgothic



## and {#and}

論理積(演算子)


__グループ__:

標準定義マクロ


__説明__:

論理積を示す演算子「&」と同様に使用することができるマクロです。


__参照__:

or
xor
not



## or {#or}

論理和(演算子)


__グループ__:

標準定義マクロ


__説明__:

論理和を示す演算子「|」と同様に使用することができるマクロです。


__参照__:

and
xor
not



## xor {#xor}

排他的論理和(演算子)


__グループ__:

標準定義マクロ


__説明__:

排他的論理和を示す演算子「^」と同様に使用することができるマクロです。


__参照__:

and
or
not



## not {#not}

否定(演算子)


__グループ__:

標準定義マクロ


__説明__:

否定を示す演算子「!」と同様に使用することができるマクロです。


__参照__:

and
or
xor



## M_PI {#M_PI}

円周率


__説明__:

円周率を表す定数です。3.14159265358979323846が定義されています。


__グループ__:

数学定数


__参照__:

rad2deg
deg2rad




## rad2deg {#rad2deg}

ラジアンを度に変換


__パラメーター__:

(p1)
p1 : 度に変換する角度（ラジアン）


__説明__:

角度の単位をラジアンから度へ変換します。
弧度法で表された角度を度数法での角度に変換するとも言えます。


__例__:

	tmp = M_PI
	mes str(tmp) + "ラジアンは" + rad2deg(tmp) + "°です。"
	stop


__参照__:

M_PI
deg2rad




## deg2rad {#deg2rad}

度をラジアンに変換


__パラメーター__:

(p1)
p1 : ラジアンに変換する角度（度）


__説明__:

角度の単位を度からラジアンへ変換します。
度数法で表された角度を弧度法での角度に変換するとも言えます。


__例__:

	tmp = 90
	mes str(tmp) + "°は" + deg2rad(tmp) + "ラジアンです。"
	stop


__参照__:

M_PI
rad2deg


