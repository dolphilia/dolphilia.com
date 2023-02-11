# HGIMG4共通

__対応__:

- Win

__対応の補足__:

HGIMG4DXはDirectX9、HGIMG4はOpenGL3.1環境で動作



## fvseti {#fvseti}

整数値からベクトル設定

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入される変数名
(x,y,z) = 整数値

__説明__:

(x,y,z)で指定された整数値をベクトルとしてFV値に代入する。

__参照__:

fvset
fvadd
fvsub
fvmul
fvdiv
fvdir
fvmin
fvmax
fvouter
fvinner
fvface
fvunit



## fvset {#fvset}

ベクトル設定

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入される変数名
(x,y,z) = 計算値(実数値)

__説明__:

(x,y,z)で指定された小数値(X,Y,Z)をベクトルとしてFV値に代入する。

__参照__:

fvseti
fvadd
fvsub
fvmul
fvdiv
fvdir
fvmin
fvmax
fvouter
fvinner
fvface
fvunit



## fvadd {#fvadd}

ベクトル加算

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 計算値(実数値)

__説明__:

(x,y,z)で指定された小数値(X,Y,Z)をFV値に加算する。

__参照__:

fvseti
fvset
fvsub
fvmul
fvdiv
fvmin
fvmax



## fvsub {#fvsub}

ベクトル減算

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 計算値(実数値)

__説明__:

(x,y,z)で指定された小数値(X,Y,Z)をFV値から減算する。

__参照__:

fvseti
fvset
fvadd
fvmul
fvdiv
fvmin
fvmax



## fvmul {#fvmul}

ベクトル乗算

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 計算値(実数値)

__説明__:

(x,y,z)で指定された小数値(X,Y,Z)をFV値に並列で乗算する。

__参照__:

fvseti
fvset
fvadd
fvsub
fvdiv
fvmin
fvmax



## fvdiv {#fvdiv}

ベクトル除算

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 計算値(実数値)

__説明__:

(x,y,z)で指定された小数値(X,Y,Z)をFV値に並列で除算する。

__参照__:

fvseti
fvset
fvadd
fvsub
fvmul
fvmin
fvmax



## fvdir {#fvdir}

ベクトル回転

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 回転角度(実数値)

__説明__:

fvで指定された変数に格納されているFV値をX,Y,Z角度として、
小数値(X,Y,Z)で指定されたベクトルを回転させた結果を、変数fvに代入します。

__参照__:

fvset
fvdir
fvface



## fvface {#fvface}

座標から角度を得る

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = X,Y,Z座標値(実数値)

__説明__:

fvで指定された変数に格納されているベクトル(FV値)を基点とするX,Y,Z座標から、指定されたX,Y,Z座標を直線で見るためのX,Y,Z回転角度を求めて変数fvに代入します。

__参照__:

fvset
fvdir



## fvmin {#fvmin}

ベクトルの要素を最小値で切り詰める

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 比較値(実数値)

__説明__:

fvで指定された変数に格納されているFV値の各要素を、パラメーターで指定された値(X,Y,Z)が最小値になるように切り詰めます。
FV値の各要素に対して最小値を適用する場合に使用します。

__参照__:

fvseti
fvset
fvadd
fvsub
fvmul
fvdiv
fvmax



## fvmax {#fvmax}

ベクトルの要素を最大値で切り詰める

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 比較値(実数値)

__説明__:

fvで指定された変数に格納されているFV値の各要素を、パラメーターで指定された値(X,Y,Z)が最大値になるように切り詰めます。
FV値の各要素に対して最大値を適用する場合に使用します。

__参照__:

fvseti
fvset
fvadd
fvsub
fvmul
fvdiv
fvmin



## fvouter {#fvouter}

ベクトル外積

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 演算するベクトル値(実数値)

__説明__:

fvで指定された変数に格納されているFV値と、小数値(X,Y,Z)で指定するベクトルの外積を求めて代入します。

__参照__:

fvseti
fvset
fvinner



## fvinner {#fvinner}

ベクトル内積

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,x,y,z
fv      = FV値が代入されている変数名
(x,y,z) = 演算するベクトル値(実数値)

__説明__:

fvで指定された変数に格納されているFV値と、小数値(X,Y,Z)で指定するベクトルの内積を求めてfv.0に代入します。

__参照__:

fvseti
fvset
fvouter



## fvunit {#fvunit}

ベクトル正規化

__グループ__:

拡張画面制御命令

__パラメーター__:

fv
fv      = FV値が代入されている変数名

__説明__:

fvで指定された変数に格納されているベクトル(FV値)を正規化します。

__参照__:

fvseti
fvset



## fsin {#fsin}

サインを求める

__グループ__:

拡張画面制御命令

__パラメーター__:

fval,frot
fval    = 実数値が代入される変数名
frot    = 回転角度(ラジアン)

__説明__:

frotで指定された角度のサイン値をfvalで指定した変数に代入します。
角度の単位はラジアン(2π=360度)になります。

__参照__:

fcos
fsqr
froti




## fcos {#fcos}

コサインを求める

__グループ__:

拡張画面制御命令

__パラメーター__:

fval,frot
fval    = 実数値が代入される変数名
frot    = 回転角度(ラジアン)

__説明__:

frotで指定された角度のコサイン値をfvalで指定した変数に代入します。
角度の単位はラジアン(2π=360度)になります。

__参照__:

fsin
fsqr
froti




## fsqr {#fsqr}

平方根を求める

__グループ__:

拡張画面制御命令

__パラメーター__:

fval,fprm
fval    = 実数値が代入される変数名
fprm    = 演算に使われる値(実数)

__説明__:

fprmで指定された値の平方根をfvalで指定した変数に代入します。

__参照__:

fsin
fcos
froti




## str2fv {#str2fv}

文字列をベクトルに変換

__グループ__:

拡張画面制御命令

__パラメーター__:

fv,"x,y,z"
fv      = FV値が代入される変数名
"x,y,z" = 「,」で区切られた実数値が格納された文字列

__説明__:

"x,y,z"で指定された文字列情報を「,」で区切られたX,Y,Z小数値として読み出し、fvで指定された変数に格納します。
それぞれの項目が正しく数値として認識できない(不正な)文字列があった場合には、それ以降の項目も含めて0.0が代入されます。

__参照__:

fv2str
str2f
f2str
f2i



## fv2str {#fv2str}

ベクトルを文字列に変換

__グループ__:

拡張画面制御命令

__パラメーター__:

fv
fv      = FV値が代入されている変数名

__説明__:

fvで指定された変数に格納されているベクトル(FV値)を文字列に変換してシステム変数refstrに結果を返します。

__参照__:

str2fv
str2f
f2str
f2i



## str2f {#str2f}

文字列を小数値に変換

__グループ__:

拡張画面制御命令

__パラメーター__:

fval,"fval"
fval    = 実数値が代入される変数名
"fval"  = 実数値が格納された文字列

__説明__:

"fval"で指定された文字列情報を小数値として読み出し、fvalで指定された変数に格納します。

__参照__:

fv2str
str2fv
f2str
f2i



## f2str {#f2str}

小数値を文字列に変換

__グループ__:

拡張画面制御命令

__パラメーター__:

sval,fval
sval    = 文字列が代入される変数名
fval    = 変換元の実数値

__説明__:

fvalで指定された小数値を文字列に変換して、valで指定された文字列型の変数に結果を返します。

__参照__:

fv2str
str2fv
str2f
f2i



## delobj {#delobj}

オブジェクトの削除

__グループ__:

拡張画面制御命令

__パラメーター__:

ObjID
ObjID  : オブジェクトID

__説明__:

指定されたオブジェクトを削除します。

__参照__:

regobj



## setpos {#setpos}

posグループ情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 設定する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
posグループ(表示座標)に(x,y,z)で指定された値を設定します。
(x,y,z)には、実数または整数値を指定することができます。


__参照__:

setang
setangr
setscale
setdir
setefx
setwork



## setang {#setang}

angグループ情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 設定する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
angグループ(表示角度)に(x,y,z)で指定された値を設定します。
(x,y,z)には、実数または整数値を指定することができます。
角度の単位はラジアンになります。
(回転する順番はX->Y->Zとなります。他の順番で回転させるための、setangy、setangz命令が用意されています。)
整数で角度を設定するためのsetangr命令も用意されています。


__参照__:

setpos
setangr
setscale
setdir
setefx
setwork



## setangr {#setangr}

angグループ情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 設定する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
angグループ(表示角度)に(x,y,z)で指定された値を設定します。
(x,y,z)には、実数または整数値を指定することができます。
角度の単位は整数で0〜255で一周する値を使用します。
ラジアンで角度を設定するためのsetang命令も用意されています。


__参照__:

setpos
setang
setscale
setdir
setefx
setwork



## setscale {#setscale}

scaleグループ情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 設定する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
scaleグループ(表示倍率)に(x,y,z)で指定された値を設定します。
(x,y,z)には、実数または整数値を指定することができます。


__参照__:

setpos
setang
setangr
setdir
setefx
setwork



## setdir {#setdir}

dirグループ情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 設定する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
dirグループ(移動ベクトル)に(x,y,z)で指定された値を設定します。
(x,y,z)には、実数または整数値を指定することができます。
移動ベクトルに登録された値は、オブジェクトの自動移動モード(OBJ_MOVE)時に参照されます。


__参照__:

setpos
setang
setangr
setscale
setefx
setwork



## setwork {#setwork}

workグループ情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 設定する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
workグループ(ワーク値)に(x,y,z)で指定された値を設定します。
(x,y,z)には、実数または整数値を指定することができます。


__参照__:

setpos
setang
setangr
setscale
setdir
setefx
setwork2



## addpos {#addpos}

posグループ情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 加算する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
posグループ(表示座標)に(x,y,z)で指定された値を設定します。
(x,y,z)には、実数または整数値を指定することができます。


__参照__:

addang
addangr
addscale
adddir
addefx
addwork



## addang {#addang}

angグループ情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 加算する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
angグループ(表示角度)に(x,y,z)で指定された値を加算します。
(x,y,z)には、実数または整数値を指定することができます。
角度の単位はラジアンになります。
整数で角度を設定するためのsetangr命令も用意されています。


__参照__:

addpos
addangr
addscale
adddir
addefx
addwork



## addangr {#addangr}

angグループ情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 加算する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
angグループ(表示角度)に(x,y,z)で指定された値を加算します。
(x,y,z)には、実数または整数値を指定することができます。
角度の単位は整数で0〜255で一周する値を使用します。
ラジアンで角度を設定するためのsetang命令も用意されています。


__参照__:

addpos
addang
addscale
adddir
addefx
addwork



## addscale {#addscale}

scaleグループ情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 加算する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
scaleグループ(表示倍率)に(x,y,z)で指定された値を加算します。
(x,y,z)には、実数または整数値を指定することができます。


__参照__:

addpos
addang
addangr
adddir
addefx
addwork



## adddir {#adddir}

dirグループ情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 加算する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
dirグループ(移動ベクトル)に(x,y,z)で指定された値を加算します。
(x,y,z)には、実数または整数値を指定することができます。


__参照__:

addpos
addang
addangr
addscale
addefx
addwork



## addwork {#addwork}

workグループ情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 加算する値 (デフォルト=0)


__説明__:

オブジェクトの持つパラメーターを設定します。
workグループ(ワーク値)に(x,y,z)で指定された値を加算します。
(x,y,z)には、実数または整数値を指定することができます。


__参照__:

addpos
addang
addangr
addscale
adddir
addefx



## getpos {#getpos}

posグループ情報を取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
posグループ(表示座標)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、実数型の変数として設定されます。
命令の最後に「i」を付加することで、整数値として値を取得することができます。


__参照__:

getposi
getang
getangr
getscale
getdir
getefx
getwork



## getscale {#getscale}

scaleグループ情報を取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
scaleグループ(表示倍率)の内容が(x,y,z)で指定された変数に代入されますます。
(x,y,z)は、実数型の変数として設定されます。
命令の最後に「i」を付加することで、整数値として値を取得することができます。


__参照__:

getscalei
getpos
getang
getangr
getdir
getefx
getwork



## getdir {#getdir}

dirグループ情報を取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
dirグループ(移動ベクトル)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、実数型の変数として設定されます。
命令の最後に「i」を付加することで、整数値として値を取得することができます。


__参照__:

getdiri
getpos
getang
getangr
getscale
getefx
getwork



## getwork {#getwork}

workグループ情報を取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
workグループ(ワーク値)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、実数型の変数として設定されます。
命令の最後に「i」を付加することで、整数値として値を取得することができます。


__参照__:

getworki
getpos
getang
getangr
getscale
getdir
getefx



## getposi {#getposi}

posグループ情報を整数で取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
posグループ(表示座標)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、整数型の変数として設定されます。


__参照__:

getpos
getangi
getangri
getscalei
getdiri
getefxi
getworki



## getscalei {#getscalei}

scaleグループ情報を整数で取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
scaleグループ(表示倍率)の内容が(x,y,z)で指定された変数に代入されますます。
(x,y,z)は、整数型の変数として設定されます。


__参照__:

getscale
getposi
getangi
getangri
getdiri
getefxi
getworki



## getdiri {#getdiri}

dirグループ情報を整数で取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
dirグループ(移動ベクトル)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、整数型の変数として設定されます。


__参照__:

getdir
getposi
getangi
getangri
getscalei
getefxi
getworki



## getworki {#getworki}

workグループ情報を整数で取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
workグループ(ワーク値)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、整数型の変数として設定されます。


__参照__:

getwork
getposi
getangi
getangri
getscalei
getdiri
getefxi



## selpos {#selpos}

移動座標をMOC情報に設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id
id     : オブジェクトID

__説明__:

MOC設定命令の対象となるMOCグループをpos(座標)に設定します
idは、オブジェクトIDとなります。

__参照__:

selmoc
selang
selscale
seldir
selefx
selcam
selcpos
selcang
selcint



## selang {#selang}

回転角度をMOC情報に設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id
id     : オブジェクトID

__説明__:

MOC設定命令の対象となるMOCグループをang(回転角度)に設定します
idは、オブジェクトIDとなります。

__参照__:

selmoc
selpos
selscale
seldir
selefx
selcam
selcpos
selcang
selcint



## selscale {#selscale}

スケールをMOC情報に設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id
id     : オブジェクトID

__説明__:

MOC設定命令の対象となるMOCグループをscale(スケール)に設定します
idは、オブジェクトIDとなります。

__参照__:

selmoc
selpos
selang
selefx
seldir
selcam
selcpos
selcang
selcint



## seldir {#seldir}

移動量をMOC情報に設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id
id     : オブジェクトID

__説明__:

MOC設定命令の対象となるMOCグループをdir(移動量)に設定します
idは、オブジェクトIDとなります。

__参照__:

selmoc
selpos
selang
selscale
selefx
selcam
selcpos
selcang
selcint



## selwork {#selwork}

オブジェクトワークをMOC情報に設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id
id     : オブジェクトID

__説明__:

MOC設定命令の対象となるMOCグループをwork(ワーク)に設定します
idは、オブジェクトIDとなります。

__参照__:

selmoc
selpos
selang
selscale
selefx
selcam
selcpos
selcang
selcint



## objset3 {#objset3}

MOC情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

x,y,z
x   : 設定する値
y   : 設定する値2
z   : 設定する値3


__説明__:

MOC情報を設定します。
オフセット番号0から3つのパラメータが対象になります。

__参照__:

objset3
objadd3
objset3r
objsetf3
objaddf3



## objsetf3 {#objsetf3}

MOC情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

fx,fy,fz
fx  : 設定する値(実数値)
fy  : 設定する値2(実数値)
fz  : 設定する値3(実数値)


__説明__:

MOC情報を設定します。
オフセット番号0から3つのパラメータが対象になります。

__参照__:

objset3
objadd3
objset3r
objsetf3
objaddf3



## objadd3 {#objadd3}

MOC情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

x,y,z
x   : 加算する値
y   : 加算する値2
z   : 加算する値3


__説明__:

MOC情報に設定されている値にx,y,zを加算します。
オフセット番号0から3つのパラメータが対象になります。

__参照__:

objset3
objadd3r
objset3r
objsetf3
objaddf3



## objaddf3 {#objaddf3}

MOC情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

fx,fy,fz
fx  : 加算する値(実数値)
fy  : 加算する値2(実数値)
fz  : 加算する値3(実数値)


__説明__:

MOC情報に設定されている値にfx,fy,fzを加算します。
オフセット番号0から3つのパラメータが対象になります。

__参照__:

objset3
objadd3
objset3r
objsetf3
objaddf3



## objadd3r {#objadd3r}

MOC情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

ofs,fx,fy,fz
ofs : MOCのオフセット番号
fx  : 加算する値(整数角度値)
fy  : 加算する値2(整数角度値)
fz  : 加算する値3(整数角度値)

__説明__:

MOC情報に設定されている値にfx,fy,fzを加算します。
ただし整数値(256で１回転)をラジアン単位に変換したパラメーターを加算します。
角度を指定するパラメーター以外では正常な値にならないので注意してください。

__参照__:

objset3
objadd3
objset3r
objsetf3
objaddf3



## objset3r {#objset3r}

MOC情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

x,y,z
x   : 設定する値
y   : 設定する値2
z   : 設定する値3


__説明__:

MOC情報に角度情報を設定します。
オフセット番号0から3つのパラメータが対象になります。
整数値(256で１回転)をラジアン単位に変換してパラメーターを書き込みます。
角度を指定するパラメーター以外では正常な値にならないので注意してください。

__参照__:

objset3
objadd3
objset3r
objsetf3
objaddf3



## setobjmode {#setobjmode}

オブジェクトのモード設定

__グループ__:

拡張画面制御命令

__パラメーター__:

ObjID,mode,sw
ObjID    : オブジェクトID
mode     : モード値
sw       : 設定スイッチ

__説明__:

指定されたオブジェクトのモードを変更します。
モード値は、regobj命令で指定するものと同様です。
swは、以下のように動作します。

```

	sw = 0 : 指定したモード値を追加
	sw = 1 : 指定したモード値を削除
	sw = 2 : 指定したモード値だけを設定

```


__参照__:

regobj
setobjmodel



## setcoli {#setcoli}

オブジェクトのコリジョン設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,mygroup,enegroup
id       : オブジェクトID
mygroup  : 自分が属するグループ値
enegroup : 衝突を検出する対象となるグループ値

__説明__:

オブジェクトに対してコリジョングループ情報を設定します。
コリジョングループ値は、1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768の中から1つだけを選択可能です。

__参照__:

getcoli
findobj
nextobj



## getcoli {#getcoli}

オブジェクトのコリジョン判定

__グループ__:

拡張画面制御命令

__パラメーター__:

val,id,distance
val      : 結果が代入される変数名
id       : オブジェクトID
distance : 衝突を検出する範囲(実数値)

__説明__:

指定したオブジェクトが持つコリジョン情報をもとに、そのオブジェクトが衝突している別なオブジェクトのIDを調べます。
distanceは、衝突する範囲(半径)を実数値で指定します。
衝突が検出された場合は、変数にオブジェクトIDが代入されます。
何も衝突が検出されなかった場合は、-1が代入されます。

HGIMG4では、distanceにマイナス値を指定した場合、3Dモデルが持つ衝突範囲(バウンディングボックス)にdistanceを掛けた値をもとに衝突検出を行ないます。
たとえば、-1.5を指定した場合は、衝突範囲を1.5倍に拡大した状態で、衝突検出が行なわれます。また、より正確な衝突の情報を作成するために、gppcontact命令を使用することが可能です。

__参照__:

setcoli
findobj
nextobj
gppcontact



## getobjcoli {#getobjcoli}

オブジェクトのグループ取得

__グループ__:

拡張画面制御命令

__パラメーター__:

var,id,group
var      : 結果が代入される変数名
id(0)    : オブジェクトID
group(0) : グループID

__説明__:

指定したオブジェクトが所属するグループ値(コリジョングループなど)を取得し、varで指定された変数に代入します。
グループ値は、以下のものになります。

```

グループID   内容
---------------------------------------
  0          コリジョングループ(setcoliで設定)
  1          衝突対象グループ(setcoliで設定)
  2          レンダリンググループ(setobjrenderで設定)
  3          ライティンググループ(setobjrenderで設定)

```



__参照__:

setcoli
getcoli
setobjrender



## setobjrender {#setobjrender}

オブジェクトのレンダリンググループ設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id,rendergroup,lightgroup
id(0)           : オブジェクトID
rendergroup(1)  : レンダリンググループ値
lightgroup(1)   : ライティンググループ値

__説明__:

オブジェクトに対してレンダリンググループ、ライティンググループ情報を設定します。
レンダリンググループ値は、カメラからレンダリングした際に表示のON/OFFを設定するための値です。カメラが持つレンダリンググループ値と同一である場合は、表示が有効となります。
通常は、オブジェクト、カメラともにグループ1が設定されています。特定のカメラからの表示のみ表示を無効にしたい場合などに利用できます。
ライティンググループ値は、特定のライトに対して有効/無効を切り替えるものです。ライトが持つライティンググループ値と異なる場合は、ライトが無効となります。

それぞれのグループ値は、1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768の中から任意のビットを組み合わせて指定可能です。


__参照__:

setcoli
getobjcoli



## findobj {#findobj}

オブジェクト検索

__グループ__:

拡張画面制御命令

__パラメーター__:

exmode,group
exmode(0) : 検索を除外するモード
group(0)  : 検索対象コリジョングループ値

__説明__:

有効なオブジェクトを列挙します。
コリジョングループ値を指定した場合は、特定のコリジョングループに属するオブジェクトだけを検索します。
コリジョングループ値が0の場合は、すべてのオブジェクトが検索対象となります。
最初にfindobjを実行して、次にnextobj命令で該当するオブジェクトを検索することができます。
また、exmodeで指定したモード(regobjで指定するモード値と同じ)は検索から除外されます。

__参照__:

setcoli
nextobj



## nextobj {#nextobj}

次のオブジェクト検索

__グループ__:

拡張画面制御命令

__パラメーター__:

val
val      : 結果が代入される変数名

__説明__:

findobj命令で指定された条件をもとにオブジェクトを検索します。
検索されると、変数にオブジェクトIDが代入されます。
検索対象がなくなった時には-1が代入されます。

__参照__:

setcoli
findobj



## setborder {#setborder}

オブジェクト有効範囲設定

__グループ__:

拡張画面制御命令

__パラメーター__:

fx,fy,fz,option
( fx,fy,fz ) : ボーダー領域の設定値(実数値)
option(0) : 設定オプション(0〜2)

__説明__:

ボーダー領域(オブジェクト有効範囲)を設定します。
optionパラメーターにより、( fx,fy,fz )に設定する内容が変わります。
optionパラメーターを省略するか、または0の場合は、
( 0,0,0 )を中心にした、( fx,fy,fz )サイズの立方体がボーダー領域となります。
optionパラメーターが1の場合は、( fx,fy,fz )の座標を数値が小さい側のボーダー領域として設定します。
optionパラメーターが2の場合は、( fx,fy,fz )の座標を数値が大きい側のボーダー領域として設定します。


__参照__:

regobj
setobjmode



## selmoc {#selmoc}

MOC情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

id, mocofs
id     : オブジェクトID
mocofs : MOCのグループ指定

__説明__:

MOC設定命令の対象となるMOCグループを指定します。
idは、オブジェクトIDとなります。
通常は、selpos,selang,selscale,seldir命令をお使いください。

__参照__:

selpos
selang
selscale
seldir
selcam
selcpos
selcang
selcint



## objgetfv {#objgetfv}

MOC情報を取得

__グループ__:

拡張画面制御命令

__パラメーター__:

fv
fv      = FV値が代入される変数名

__説明__:

MOCに設定されている値を変数fvに代入します。

__参照__:

objsetfv
fvset
fvadd
fvsub
fvmul
fvdiv



## objsetfv {#objsetfv}

MOC情報を設定

__グループ__:

拡張画面制御命令

__パラメーター__:

fv
fv      = FV値が代入されている変数名

__説明__:

変数fvの内容をMOCに設定します。

__参照__:

objgetfv
fvset
fvadd
fvsub
fvmul
fvdiv



## objaddfv {#objaddfv}

MOC情報を加算

__グループ__:

拡張画面制御命令

__パラメーター__:

fv
fv      = FV値が代入されている変数名

__説明__:

変数fvの内容をMOCに加算します。

__参照__:

objgetfv
fvset
fvadd
fvsub
fvmul
fvdiv



## objexist {#objexist}

オブジェクトIDが有効か調べる

__グループ__:

拡張画面制御命令

__パラメーター__:

p1
p1(0) : オブジェクトID

__説明__:

p1で指定されたオブジェクトIDが有効であるか調べます。
オブジェクトIDが有効(登録済み)の場合は、システム変数statに0が代入されます。
オブジェクトIDが無効(未登録)の場合は、システム変数statに-1が代入されます。


__参照__:

regobj
delobj




## event_wait {#event_wait}

待ち時間イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,p1
id      : イベントID
p1(0)   : 待ち時間(フレーム)

__説明__:

idで指定しているイベントIDに、待ち時間イベントを追加します。
待ち時間イベントは、p1で指定されたフレーム数だけ次のイベントに進むことを保留します。


__参照__:

newevent
setevent



## event_jump {#event_jump}

ジャンプイベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,p1,p2
id      : イベントID
p1(0)   : ジャンプ先のイベント番号
p2(0)   : ジャンプ無視の確率(%)

__説明__:

idで指定しているイベントIDに、ジャンプイベントを追加します。
ジャンプイベントは、指定されたイベント番号から実行を続けることを指示します。
イベントリストの中でのgoto命令にあたります。
p1で指定するイベント番号は、イベントに追加された順番に0,1,2…と数えたものになります。
p2で、ジャンプ無視の確率(%)を設定することができます。
0または省略された場合は、必ず(無条件)でジャンプを行ないます。
それ以外の場合は、乱数をもとに1〜100%の確率でジャンプを行ない、
ジャンプしなかった場合は次のイベントに進みます。


__参照__:

newevent
setevent



## event_prmset {#event_prmset}

パラメーター設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,p1,p2
id      : イベントID
p1(0)   : パラメーターID(PRMSET_*)
p2(0)   : 設定される値

__説明__:

idで指定しているイベントIDに、パラメーター設定イベントを追加します。
パラメーター設定イベントは、p1で指定されたパラメーターIDにp2の値を設定します。
(それまでに設定されていた内容は消去されます)
パラメーターIDには、以下の名前を使用することができます。

```

パラメーターID   内容
---------------------------------------
PRMSET_MODE      動作モード
PRMSET_FLAG      存在フラグ
PRMSET_SHADE     シェーディングモード
PRMSET_TIMER     タイマー
PRMSET_MYGROUP   コリジョングループ値
PRMSET_COLGROUP  対象グループ値

```



__参照__:

event_prmon
event_prmoff
newevent
setevent



## event_prmon {#event_prmon}

パラメータービット設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,p1,p2
id      : イベントID
p1(0)   : パラメーターID(PRMSET_*)
p2(0)   : 設定されるビット

__説明__:

idで指定しているイベントIDに、パラメータービット設定イベントを追加します。
パラメータービット設定イベントは、p1で指定されたパラメーターIDにp2のビットを設定します。
(それまでに設定されていた内容は保持されたまま、新しい値のビットだけが有効になります)
パラメーターIDの詳細については、event_prmset命令を参照してください。


__参照__:

event_prmset
event_prmoff
newevent
setevent



## event_prmoff {#event_prmoff}

パラメータービット消去イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,p1,p2
id      : イベントID
p1(0)   : パラメーターID(PRMSET_*)
p2(0)   : 消去されるビット

__説明__:

idで指定しているイベントIDに、パラメータービット消去イベントを追加します。
パラメータービット消去イベントは、p1で指定されたパラメーターIDから、
p2のビットだけを消去します。
パラメーターIDの詳細については、event_prmset命令を参照してください。


__参照__:

event_prmset
event_prmon
newevent
setevent



## event_setpos {#event_setpos}

posグループ設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x1,y1,z1,x2,y2,z2
id         : イベントID
(x1,y1,z1) : 設定される値(下限値)
(x2,y2,z2) : 設定される値(上限値)

__説明__:

idで指定しているイベントIDに、グループ設定イベントを追加します。
グループ設定イベントは、オブジェクトが持っているパラメーターを設定します。
(x1,y1,z1)と(x2,y2,z2)を指定すると、それぞれの範囲内にある値を乱数で作成します。
(x2,y2,z2)を省略して、(x1,y1,z1)だけを指定した場合はそのまま値が設定されます。


__参照__:

event_setang
event_setangr
event_setscale
event_setdir
event_setefx
event_setwork
newevent
setevent



## event_setang {#event_setang}

angグループ設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x1,y1,z1,x2,y2,z2
id         : イベントID
(x1,y1,z1) : 設定される値(下限値)
(x2,y2,z2) : 設定される値(上限値)

__説明__:

idで指定しているイベントIDに、グループ設定イベントを追加します。
グループ設定イベントは、オブジェクトが持っているパラメーターを設定します。
(x1,y1,z1)と(x2,y2,z2)を指定すると、それぞれの範囲内にある値を乱数で作成します。
(x2,y2,z2)を省略して、(x1,y1,z1)だけを指定した場合はそのまま値が設定されます。


__参照__:

event_setpos
event_setangr
event_setscale
event_setdir
event_setefx
event_setwork
newevent
setevent



## event_setangr {#event_setangr}

angグループ設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x1,y1,z1,x2,y2,z2
id         : イベントID
(x1,y1,z1) : 設定される値(下限値)
(x2,y2,z2) : 設定される値(上限値)

__説明__:

idで指定しているイベントIDに、グループ設定イベントを追加します。
グループ設定イベントは、オブジェクトが持っているパラメーターを設定します。
(x1,y1,z1)と(x2,y2,z2)を指定すると、それぞれの範囲内にある値を乱数で作成します。
(x2,y2,z2)を省略して、(x1,y1,z1)だけを指定した場合はそのまま値が設定されます。


__参照__:

event_setpos
event_setang
event_setscale
event_setdir
event_setefx
event_setwork
newevent
setevent



## event_setscale {#event_setscale}

scaleグループ設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x1,y1,z1,x2,y2,z2
id         : イベントID
(x1,y1,z1) : 設定される値(下限値)
(x2,y2,z2) : 設定される値(上限値)

__説明__:

idで指定しているイベントIDに、グループ設定イベントを追加します。
グループ設定イベントは、オブジェクトが持っているパラメーターを設定します。
(x1,y1,z1)と(x2,y2,z2)を指定すると、それぞれの範囲内にある値を乱数で作成します。
(x2,y2,z2)を省略して、(x1,y1,z1)だけを指定した場合はそのまま値が設定されます。


__参照__:

event_setpos
event_setang
event_setangr
event_setdir
event_setefx
event_setwork
newevent
setevent



## event_setdir {#event_setdir}

dirグループ設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x1,y1,z1,x2,y2,z2
id         : イベントID
(x1,y1,z1) : 設定される値(下限値)
(x2,y2,z2) : 設定される値(上限値)

__説明__:

idで指定しているイベントIDに、グループ設定イベントを追加します。
グループ設定イベントは、オブジェクトが持っているパラメーターを設定します。
(x1,y1,z1)と(x2,y2,z2)を指定すると、それぞれの範囲内にある値を乱数で作成します。
(x2,y2,z2)を省略して、(x1,y1,z1)だけを指定した場合はそのまま値が設定されます。


__参照__:

event_setpos
event_setang
event_setangr
event_setscale
event_setefx
event_setwork
newevent
setevent



## event_setwork {#event_setwork}

workグループ設定イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x1,y1,z1,x2,y2,z2
id         : イベントID
(x1,y1,z1) : 設定される値(下限値)
(x2,y2,z2) : 設定される値(上限値)

__説明__:

idで指定しているイベントIDに、グループ設定イベントを追加します。
グループ設定イベントは、オブジェクトが持っているパラメーターを設定します。
(x1,y1,z1)と(x2,y2,z2)を指定すると、それぞれの範囲内にある値を乱数で作成します。
(x2,y2,z2)を省略して、(x1,y1,z1)だけを指定した場合はそのまま値が設定されます。


__参照__:

event_setpos
event_setang
event_setangr
event_setscale
event_setdir
event_setefx
newevent
setevent



## event_pos {#event_pos}

posグループ変化イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,frame,x1,y1,z1,sw
id         : イベントID
frame      : 変化までのフレーム数
(x1,y1,z1) : 設定される値
sw(1)      : 補間オプション

__説明__:

idで指定しているイベントIDに、グループ変化イベントを追加します。
グループ変化イベントは、オブジェクトが持っているパラメーターの時間による変化を設定します。
frameで指定したフレーム数が経過した時に(x1,y1,z1)の値になります。
swの補間オプションは、以下の値を指定することができます。

```

	sw = 0 : リニア補間(絶対値)
	sw = 1 : スプライン補間(絶対値)
	sw = 2 : リニア補間(相対値)
	sw = 3 : スプライン補間(相対値)

```

swを省略した場合には、絶対値スプラインが設定されます。
swの値に16を加算した場合は、(x1,y1,z1)で設定される値の替わりにオブジェクトが持つworkグループの値を使用して変化を設定します。


__参照__:

event_ang
event_angr
event_scale
event_dir
event_efx
event_work
newevent
setevent



## event_ang {#event_ang}

angグループ変化イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,frame,x1,y1,z1,sw
id         : イベントID
frame      : 変化までのフレーム数
(x1,y1,z1) : 設定される値
sw(0)      : 補間オプション

__説明__:

idで指定しているイベントIDに、グループ変化イベントを追加します。
グループ変化イベントは、オブジェクトが持っているパラメーターの時間による変化を設定します。
frameで指定したフレーム数が経過した時に(x1,y1,z1)の値になります。
swの補間オプションは、以下の値を指定することができます。

```

	sw = 0 : リニア補間(絶対値)
	sw = 1 : スプライン補間(絶対値)
	sw = 2 : リニア補間(相対値)
	sw = 3 : スプライン補間(相対値)

```

swを省略した場合には、絶対値リニアが設定されます。
swの値に16を加算した場合は、(x1,y1,z1)で設定される値の替わりにオブジェクトが持つworkグループの値を使用して変化を設定します。
(角度の指定は、setang命令と同様で、回転する順番はX->Y->Zとなります。他の順番で回転させるための、event_angy、event_angz命令が用意されています。)



__参照__:

event_pos
event_angr
event_scale
event_dir
event_efx
event_work
newevent
setevent



## event_angr {#event_angr}

angグループ変化イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,frame,x1,y1,z1
id         : イベントID
frame      : 変化までのフレーム数
(x1,y1,z1) : 設定される値

__説明__:

idで指定しているイベントIDに、グループ変化イベントを追加します。
グループ変化イベントは、オブジェクトが持っているパラメーターの時間による変化を設定します。
frameで指定したフレーム数が経過した時に(x1,y1,z1)の値になります。
swの補間オプションは、以下の値を指定することができます。

```

	sw = 0 : リニア補間(絶対値)
	sw = 1 : スプライン補間(絶対値)
	sw = 2 : リニア補間(相対値)
	sw = 3 : スプライン補間(相対値)

```

swを省略した場合には、絶対値リニアが設定されます。
swの値に16を加算した場合は、(x1,y1,z1)で設定される値の替わりにオブジェクトが持つworkグループの値を使用して変化を設定します。


__参照__:

event_pos
event_ang
event_scale
event_dir
event_efx
event_work
newevent
setevent



## event_scale {#event_scale}

scaleグループ変化イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,frame,x1,y1,z1,sw
id         : イベントID
frame      : 変化までのフレーム数
(x1,y1,z1) : 設定される値
sw(0)      : 補間オプション

__説明__:

idで指定しているイベントIDに、グループ変化イベントを追加します。
グループ変化イベントは、オブジェクトが持っているパラメーターの時間による変化を設定します。
frameで指定したフレーム数が経過した時に(x1,y1,z1)の値になります。
swの補間オプションは、以下の値を指定することができます。

```

	sw = 0 : リニア補間(絶対値)
	sw = 1 : スプライン補間(絶対値)
	sw = 2 : リニア補間(相対値)
	sw = 3 : スプライン補間(相対値)

```

swを省略した場合には、絶対値リニアが設定されます。
swの値に16を加算した場合は、(x1,y1,z1)で設定される値の替わりにオブジェクトが持つworkグループの値を使用して変化を設定します。


__参照__:

event_pos
event_ang
event_angr
event_dir
event_efx
event_work
newevent
setevent



## event_dir {#event_dir}

dirグループ変化イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,frame,x1,y1,z1,sw
id         : イベントID
frame      : 変化までのフレーム数
(x1,y1,z1) : 設定される値
sw(0)      : 補間オプション

__説明__:

idで指定しているイベントIDに、グループ変化イベントを追加します。
グループ変化イベントは、オブジェクトが持っているパラメーターの時間による変化を設定します。
frameで指定したフレーム数が経過した時に(x1,y1,z1)の値になります。
swの補間オプションは、以下の値を指定することができます。

```

	sw = 0 : リニア補間(絶対値)
	sw = 1 : スプライン補間(絶対値)
	sw = 2 : リニア補間(相対値)
	sw = 3 : スプライン補間(相対値)

```

swを省略した場合には、絶対値リニアが設定されます。
swの値に16を加算した場合は、(x1,y1,z1)で設定される値の替わりにオブジェクトが持つworkグループの値を使用して変化を設定します。


__参照__:

event_pos
event_ang
event_angr
event_scale
event_efx
event_work
newevent
setevent



## event_work {#event_work}

workグループ変化イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,frame,x1,y1,z1,sw
id         : イベントID
frame      : 変化までのフレーム数
(x1,y1,z1) : 設定される値
sw(0)      : 補間オプション

__説明__:

idで指定しているイベントIDに、グループ変化イベントを追加します。
グループ変化イベントは、オブジェクトが持っているパラメーターの時間による変化を設定します。
frameで指定したフレーム数が経過した時に(x1,y1,z1)の値になります。
swの補間オプションは、以下の値を指定することができます。

```

	sw = 0 : リニア補間(絶対値)
	sw = 1 : スプライン補間(絶対値)
	sw = 2 : リニア補間(相対値)
	sw = 3 : スプライン補間(相対値)

```

swを省略した場合には、絶対値リニアが設定されます。


__参照__:

event_pos
event_ang
event_angr
event_scale
event_dir
event_efx
newevent
setevent



## event_addpos {#event_addpos}

posグループ加算イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : イベントID
(x,y,z) : 加算される値

__説明__:

idで指定しているイベントIDに、グループ加算イベントを追加します。
グループ加算イベントは、オブジェクトが持っているパラメーターに(x,y,z)の値を加算します。


__参照__:

event_addang
event_addangr
event_addscale
event_adddir
event_addefx
event_addwork
newevent
setevent



## event_addang {#event_addang}

angグループ加算イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : イベントID
(x,y,z) : 加算される値

__説明__:

idで指定しているイベントIDに、グループ加算イベントを追加します。
グループ加算イベントは、オブジェクトが持っているパラメーターに(x,y,z)の値を加算します。


__参照__:

event_addpos
event_addangr
event_addscale
event_adddir
event_addefx
event_addwork
newevent
setevent



## event_addangr {#event_addangr}

angグループ加算イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : イベントID
(x,y,z) : 加算される値

__説明__:

idで指定しているイベントIDに、グループ加算イベントを追加します。
グループ加算イベントは、オブジェクトが持っているパラメーターに(x,y,z)の値を加算します。


__参照__:

event_addpos
event_addang
event_addscale
event_adddir
event_addefx
event_addwork
newevent
setevent



## event_addscale {#event_addscale}

scaleグループ加算イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : イベントID
(x,y,z) : 加算される値

__説明__:

idで指定しているイベントIDに、グループ加算イベントを追加します。
グループ加算イベントは、オブジェクトが持っているパラメーターに(x,y,z)の値を加算します。


__参照__:

event_addpos
event_addang
event_addangr
event_adddir
event_addefx
event_addwork
newevent
setevent



## event_adddir {#event_adddir}

dirグループ加算イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : イベントID
(x,y,z) : 加算される値

__説明__:

idで指定しているイベントIDに、グループ加算イベントを追加します。
グループ加算イベントは、オブジェクトが持っているパラメーターに(x,y,z)の値を加算します。


__参照__:

event_addpos
event_addang
event_addangr
event_addscale
event_addefx
event_addwork
newevent
setevent



## event_addwork {#event_addwork}

workグループ加算イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : イベントID
(x,y,z) : 加算される値

__説明__:

idで指定しているイベントIDに、グループ加算イベントを追加します。
グループ加算イベントは、オブジェクトが持っているパラメーターに(x,y,z)の値を加算します。


__参照__:

event_addpos
event_addang
event_addangr
event_addscale
event_adddir
event_addefx
newevent
setevent



## setevent {#setevent}

オブジェクトにイベントを設定

__グループ__:

拡張画面制御命令

__パラメーター__:

p1,p2,p3
p1(0)  : オブジェクトID
p2(0)  : イベントID
p3(-1) : イベントスロットID

__説明__:

p1で指定したオブジェクトにp2のイベントを適用します。
あらかじめ、決まった流れの処理(イベント)を登録したイベントリストを用意しておく必要があります。

setevent命令によって設定されるイベントは、オブジェクト１つあたり４つまで同時に適用することが可能です。
p3にイベントを設定するためのイベントスロットID(0から3まで)を指定することができます。
p3を省略するか、-1を指定した場合には0から順番に空いているイベントスロットIDが使用されます。
オブジェクトに設定されたイベントを削除する場合には、p3にイベントスロットIDを指定して、p2をマイナス値にしてください。

イベントの設定に成功した場合には、システム変数statに設定されたイベントスロットIDが代入されます。
イベントの設定に失敗すると、システム変数statに-1が代入されます。



__参照__:

newevent



## delevent {#delevent}

イベントリストを削除

__グループ__:

拡張画面制御命令

__パラメーター__:

p1
p1 : イベントID

__説明__:

p1で指定したイベントリストを削除します。


__参照__:

newevent



## newevent {#newevent}

イベントリストを作成

__グループ__:

拡張画面制御命令

__パラメーター__:

p1
p1 : イベントIDが代入される変数名

__説明__:

新しいイベントIDを取得し、p1で指定した変数に代入します。

新しくイベントを作成する場合には、必ずnewevent命令でイベントIDを取得しておく必要があります。
次に、「event_」で始まるイベントリスト追加命令によって多彩な動作を登録しておくことができます。
一度取得されたイベントIDは、シーンのリセット(hgreset命令)が行なわれるか、
またはdelevent命令によってイベントリストが削除されるまでは保持されます。

こうしてできたイベントは、setevent命令によっていつでもオブジェクトに対して適用することができます。



__参照__:

delevent
setevent



## getang {#getang}

angグループ情報を取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
angグループ(表示角度)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、実数型の変数として設定されます。
命令の最後に「i」を付加することで、整数値として値を取得することができます。


__参照__:

getangi
getpos
getangr
getscale
getdir
getefx
getwork



## getangr {#getangr}

angグループ情報を取得

__グループ__:

拡張画面制御命令

__パラメーター__:

id,x,y,z
id      : オブジェクトID
(x,y,z) : 取得する変数


__説明__:

オブジェクトの持つパラメーターを取得します。
angグループ(表示角度)の内容が(x,y,z)で指定された変数に代入されます。
(x,y,z)は、整数型の変数として設定されます。
角度の単位は整数で0〜255で一周する値を使用します。


__参照__:

getpos
getang
getscale
getdir
getefx
getwork



## event_delobj {#event_delobj}

オブジェクト削除イベントを追加

__グループ__:

拡張画面制御命令

__パラメーター__:

id
id         : イベントID

__説明__:

idで指定しているイベントIDに、オブジェクト削除イベントを追加します。
オブジェクト削除イベントは、現在イベントを実行しているオブジェクトそのものを削除する命令です。

__参照__:

event_regobj
newevent
setevent


