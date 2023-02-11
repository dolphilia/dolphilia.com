# 数学

__対応__:

- Win
- Mac
- Cli
- Let


## M_LOG2E {#M_LOG2E}

2を底とするネイピア数の対数


__説明__:

2を底とするネイピア数の対数を表す定数です。
2を底とするネイピア数の対数とは、log2(m_e)のことを指します。


__グループ__:

数学定数


__例__:

```
#include "hspmath.as"
	a = 10.0
	mes "2を底とするaの対数は" + log2(a) + "です。"
	mes "これはlogf(a) * m_log2eとしても求められます：" + (logf(a) * m_log2e) + "\n"

	mes "このようにm_log2eを「eを底とする対数」にかけることで、"
	mes "「2を底とする対数」を得ることができます。"
	stop
```


__参照__:

M_LOG10E
M_E
log2

%type
ユーザー定義マクロ

## M_LOG10E {#M_LOG10E}

10を底とするネイピア数の対数

__説明__:

10を底とするネイピア数の対数を表す定数です。
10を底とするネイピア数の対数とは、log10(m_e)のことを指します。

__グループ__:

数学定数

__例__:

```
#include "hspmath.as"
	a = m_e
	mes "10を底とするaの対数は" + log10(a) + "です。"
	mes "これはlogf(a) * m_log10eとしても求められます：" + (logf(a) * m_log10e) + "\n"

	mes "このようにm_log10eを「eを底とする対数」にかけることで、"
	mes "「10を底とする対数」を得ることができます。"
	stop
```

__参照__:

M_LOG2E
log10
M_E


%type
ユーザー定義マクロ

## M_LN2 {#M_LN2}

ネイピア数を底とした2の対数


__説明__:

ネイピア数を底とした2の対数を表す定数です。
ネイピア数を底とした2の対数とは、logf(2)のことを指します。


__グループ__:

数学定数


__参照__:

M_LN10



%type
ユーザー定義マクロ

## M_LN10 {#M_LN10}

ネイピア数を底とした10の対数


__説明__:

ネイピア数を底とした10の対数を表す定数です。
ネイピア数を底とした10の対数とは、logf(10)のことを指します。


__グループ__:

数学定数


__参照__:

M_LN2


%type
ユーザー定義マクロ

## M_E {#M_E}

ネイピア数


__説明__:

ネイピア数（自然対数の底）eを表す定数です。


__参照__:

M_PI
M_LOG2E
M_LOG10E


__グループ__:

数学定数

%url
http://ja.wikipedia.org/wiki/%E3%83%8D%E3%82%A4%E3%83%94%E3%82%A2%E6%95%B0


%type
ユーザー定義マクロ

## M_SQRTPI {#M_SQRTPI}

円周率の平方根


__説明__:

円周率の平方根を表す定数です。


__参照__:

sqrt
M_PI
M_SQRT2
M_SQRT3


__グループ__:

数学定数


%type
ユーザー定義マクロ

## M_SQRT2 {#M_SQRT2}

2の平方根


__説明__:

2の平方根を表す定数です。


__参照__:

sqrt
M_SQRTPI
M_SQRT3


__グループ__:

数学定数



%type
ユーザー定義マクロ

## M_SQRT3 {#M_SQRT3}

3の累乗根


__説明__:

3の累乗根を表す定数です。


__参照__:

sqrt
M_SQRTPI
M_SQRT2


__グループ__:

数学定数


%type
ユーザー定義マクロ

## DBL_DIG {#DBL_DIG}

10進数で有効な桁数


__説明__:

10進数で有効な桁数を表す定数です。


__グループ__:

doubleの限度



%type
ユーザー定義マクロ

## DBL_EPSILON {#DBL_EPSILON}

1.0とその次に大きい値との差


__説明__:

1.0とその次に大きい値との差を表す定数です。


__グループ__:

doubleの限度



%type
ユーザー定義マクロ

## DBL_MANT_DIG {#DBL_MANT_DIG}

仮数部のbit数


__説明__:

実数型の数値を表す際に用いる仮数部のbit数を表す定数です。


__グループ__:

doubleの限度


%type
ユーザー定義マクロ

## DBL_MAX {#DBL_MAX}

実数の最大値


__説明__:

実数で表現できる最大値を表す定数です。


__グループ__:

doubleの限度


__参照__:

INT_MAX



%type
ユーザー定義マクロ

## DBL_MAX_10_EXP {#DBL_MAX_10_EXP}

10進数での指数部の最大値


__説明__:

指数部の最大値を表す定数です。


__参照__:

DBL_MIN_10_EXP
DBL_MAX_EXP


__グループ__:

doubleの限度



%type
ユーザー定義マクロ

## DBL_MAX_EXP {#DBL_MAX_EXP}

2進数での指数部の最大値


__説明__:

指数部の最大値を表す定数です。


__グループ__:

doubleの限度


__参照__:

DBL_MAX_10_EXP
INT_MAX


%type
ユーザー定義マクロ

## DBL_MIN {#DBL_MIN}

0を超える最小の値


__説明__:

0を超える最小の値を表す定数です。


__グループ__:

doubleの限度



%type
ユーザー定義マクロ

## DBL_MIN_10_EXP {#DBL_MIN_10_EXP}

10進数での指数部の最小値


__説明__:

指数部の最小値を表す定数です。


__参照__:

DBL_MAX_10_EXP
DBL_MIN_EXP


__グループ__:

doubleの限度



%type
ユーザー定義マクロ

## DBL_MIN_EXP {#DBL_MIN_EXP}

2進数での指数部の最小値


__説明__:

指数部の最小値を表す定数です。


__参照__:

DBL_MIN_10_EXP


__グループ__:

doubleの限度



%type
ユーザー定義マクロ

## INT_DIGIT {#INT_DIGIT}

2進数で有効な桁数


__説明__:

2進数で有効な桁数を表す定数です。


__参照__:

INT_DIGIT10


__グループ__:

intの限度



%type
ユーザー定義マクロ

## INT_DIGIT10 {#INT_DIGIT10}

10進数で有効な桁数


__説明__:

10進数で有効な桁数を表す定数です。


__参照__:

INT_DIGIT


__グループ__:

intの限度



%type
ユーザー定義マクロ

## INT_MAX {#INT_MAX}

最大値


__説明__:

整数で表現できる最大値を表す定数です。


__参照__:

DBL_MAX
INT_MIN


__グループ__:

intの限度



%type
ユーザー定義マクロ

## INT_MIN {#INT_MIN}

最小値


__説明__:

整数で表現できる最小の値を表す定数です。


__参照__:

INT_MAX


__グループ__:

intの限度






## pow {#pow}

累乗（べき乗）を求める


__パラメーター__:

(p1, p2)
p1 : 底（0以上）
p2 : 指数


__説明__:

p1をp2乗した値を求めます。結果は実数で与えられます。

p1は必ず正でなければなりません。負の場合はエラーにはなりませんが、非数（-1.#IND00）が返ります。

p2は正負どちらでも構いません。また、実数を指定することも可能です。


__例__:

#include "hspmath.as"
	repeat 5, -2
		mes "10の" + cnt + "乗は" + pow(10, cnt) + "です。"
	loop
	stop

__参照__:

powf
logf



## log10 {#log10}

10を底とした対数（常用対数）


__パラメーター__:

(p1)
p1 : 真数


__説明__:

10を底とするp1の対数を求めます。結果は実数で与えられます。


__参照__:

M_LOG10E
logf
log2

## log2 {#log2}

2を底とした対数


__パラメーター__:

(p1)
p1 : 真数


__説明__:

2を底とするp1の対数を求めます。結果は実数で与えられます。


__参照__:

M_LOG2E
logf
log10

## asin {#asin}

サインの逆関数（アークサイン）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のアークサイン（逆正弦）値を返します。
結果は実数型かつラジアン、-M_PI/2〜M_PI/2（度数法で-90°〜90°）の範囲で与えられます。


__参照__:

acos
atan

%url
http://ja.wikipedia.org/wiki/%E9%80%86%E4%B8%89%E8%A7%92%E9%96%A2%E6%95%B0

## acos {#acos}

コサインの逆関数（アークコサイン）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のアークコサイン（逆余弦）値を返します。
結果は実数型かつラジアン、0〜M_PI（度数法で0°〜180°）の範囲で与えられます。


__参照__:

asin
atan

%url
http://ja.wikipedia.org/wiki/%E9%80%86%E4%B8%89%E8%A7%92%E9%96%A2%E6%95%B0

## sinh {#sinh}

双曲線正弦関数（ハイパボリックサイン）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のハイパボリックサイン（双曲線正弦）値を返します。
結果は実数で与えられます。


__参照__:

cosh
tanh
asinh

%url
http://ja.wikipedia.org/wiki/%E5%8F%8C%E6%9B%B2%E7%B7%9A%E9%96%A2%E6%95%B0

## cosh {#cosh}

双曲線余弦関数（ハイパボリックコサイン）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のハイパボリックコサイン（双曲線余弦）値を返します。
結果は実数で与えられます。


__参照__:

sinh
tanh
acosh

%url
http://ja.wikipedia.org/wiki/%E5%8F%8C%E6%9B%B2%E7%B7%9A%E9%96%A2%E6%95%B0

## tanh {#tanh}

双曲線正接関数（ハイパボリックタンジェント）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のハイパボリックタンジェント（双曲線正接）値を返します。
結果は実数で与えられます。


__参照__:

sinh
cosh
atanh

%url
http://ja.wikipedia.org/wiki/%E5%8F%8C%E6%9B%B2%E7%B7%9A%E9%96%A2%E6%95%B0

## asinh {#asinh}

双曲線正弦関数の逆関数（アークハイパボリックサイン）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のアークハイパボリックサイン（逆双曲線正弦）値を返します。
結果は実数で与えられます。


__参照__:

acosh
atanh
sinh

%url
http://ja.wikipedia.org/wiki/%E5%8F%8C%E6%9B%B2%E7%B7%9A%E9%96%A2%E6%95%B0

## acosh {#acosh}

双曲線余弦関数の逆関数（アークハイパボリックコサイン）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のアークハイパボリックコサイン（逆双曲線余弦）値を返します。
結果は実数で与えられます。


__参照__:

asinh
atanh
cosh

%url
http://ja.wikipedia.org/wiki/%E5%8F%8C%E6%9B%B2%E7%B7%9A%E9%96%A2%E6%95%B0

## atanh {#atanh}

双曲線正接関数の逆関数（アークハイパボリックタンジェント）


__パラメーター__:

(p1)
p1 : 角度値（ラジアン）


__説明__:

p1のアークハイパボリックタンジェント（逆双曲線正接）値を返します。
結果は実数で与えられます。


__参照__:

asinh
acosh
tanh

%url
http://ja.wikipedia.org/wiki/%E5%8F%8C%E6%9B%B2%E7%B7%9A%E9%96%A2%E6%95%B0

## isfinite {#isfinite}

有限／無限・非数の判定


__パラメーター__:

(p1)
p1 : 判定する値


__説明__:

p1が有限の値ならば1を、p1が無限または非数の時は0を返します。

非数とは数値以外の型（文字列やラベル、モジュール型など）を指すものではありません。変数の型を調べる時はvartype関数を使用してください。


__例__:

#include "hspmath.as"
	mes isfinite(10)            // 有限の値
	mes isfinite(sqrt(-1))      // 非数
	mes isfinite(expf(100))     // 有限の値
	mes isfinite(expf(1000))    // 無限大
	stop


__参照__:

isnan
vartype

## isnan {#isnan}

非数の判定


__パラメーター__:

(p1)
p1 : 判定する値


__説明__:

p1が非数の時は1を、それ以外の時は0を返します。

非数とは数値以外の型（文字列やラベル、モジュール型など）を指すものではありません。変数の型を調べる時はvartype関数を使用してください。


__例__:

#include "hspmath.as"
	mes isnan(10)               // 有限の値
	mes isnan(sqrt(-1))         // 非数
	mes isnan(expf(100))        // 有限の値
	mes isnan(expf(1000))       // 無限大
	stop


__参照__:

isfinite
vartype

%url
http://ja.wikipedia.org/wiki/%E9%9D%9E%E6%95%B0

## round {#round}

四捨五入


__パラメーター__:

(p1)
p1 : 四捨五入する値（実数）


__説明__:

p1の小数点以下を四捨五入し、その結果を実数で返します。


__例__:

#include "hspmath.as"
	repeat 10
		tmp = 1.0 + 0.1 * cnt
		mes strf("%0.1fを四捨五入すると", tmp) + strf("%0.1fになります。", round(tmp))
	loop
	stop


__参照__:

intf
floor
ceil

%url
http://ja.wikipedia.org/wiki/%E7%AB%AF%E6%95%B0%E5%87%A6%E7%90%86

## sgn {#sgn}

符号


__パラメーター__:

(p1)
p1 : 符号を判定する値（数値）


__説明__:

数値の符号を判定し、正ならば1を・負ならば-1を・ゼロならば0を返します。


__例__:

#include "hspmath.as"
	tmp = 10
	sign = sgn(tmp)
	if sign == 1 {
		mes str(tmp) + "は正です。"
	} else : if sign == -1 {
		mes str(tmp) + "は負です。"
	} else {
		mes str(tmp) + "はゼロです。"
	}
	stop

## intf {#intf}

0の方向へ丸め


__パラメーター__:

(p1)
p1 : 丸める数値


__説明__:

p1を0の方向に丸めた数値を返します。結果は実数で返されます。

ここで「p1を0の方向に丸める」とは、「p1の小数点以下を切り捨てる」ことを意味します。


__例__:

#include "hspmath.as"
	tmp = -2.5
	while(tmp <= 2.5)
		mes strf("%4.1f", tmp) + "を0の方向へ丸めると、" + strf("%4.1f", intf(tmp)) + "になります。"
		tmp += 0.5
	wend
	stop


__参照__:

round
floor
ceil

%url
http://ja.wikipedia.org/wiki/%E7%AB%AF%E6%95%B0%E5%87%A6%E7%90%86

## floor {#floor}

負の方向へ丸め


__パラメーター__:

(p1)
p1 : 丸める数値


__説明__:

p1を負の方向に丸めた数値を返します。結果は実数で返されます。

ここで「p1を負の方向に丸める」とは、

- p1が正ならば小数点以下を切り捨てる
- p1が負ならば小数点以下を切り上げる

ことを意味します。


__例__:

#include "hspmath.as"
	tmp = -2.5
	while(tmp <= 2.5)
		mes strf("%4.1f", tmp) + "を負の方向へ丸めると、" + strf("%4.1f", floor(tmp)) + "になります。"
		tmp += 0.5
	wend
	stop


__参照__:

round
intf
ceil

%url
http://ja.wikipedia.org/wiki/%E7%AB%AF%E6%95%B0%E5%87%A6%E7%90%86

## ceil {#ceil}

正の方向へ丸め


__パラメーター__:

(p1)
p1 : 丸める数値


__説明__:

p1を正の方向に丸めた数値を返します。結果は実数で返されます。

ここで「p1を正の方向に丸める」とは、

- p1が正ならば小数点以下を切り上げる
- p1が負ならば小数点以下を切り捨てる

ことを意味します。


__例__:

#include "hspmath.as"
	tmp = -2.5
	while(tmp <= 2.5)
		mes strf("%4.1f", tmp) + "を正の方向へ丸めると、" + strf("%4.1f", ceil(tmp)) + "になります。"
		tmp += 0.5
	wend
	stop


__参照__:

round
intf
floor

%url
http://ja.wikipedia.org/wiki/%E7%AB%AF%E6%95%B0%E5%87%A6%E7%90%86

## fmod {#fmod}

モジュロ


__パラメーター__:

(p1, p2)
p1 : 割られる数
p2 : 割る数


__説明__:

p1をp2で割ったときの余りを実数で返します。
\記号による演算とは異なり、実数に対しても有効です。


__例__:

	#include "hspmath.as"
	mes 5 \ 2
	mes fmod(5, 2)      // 戻り値は実数となる
	mes fmod(3.5, 1.2)  // 実数を実数で割ったときの余りも求められる
	stop

%url
http://ja.wikipedia.org/wiki/%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%AD

## distance2 {#distance2}

2点の距離を求める


__パラメーター__:

(p1, p2)
p1, p2 : 点の座標を代入した数値型配列変数


__説明__:

2点A，B間の距離を求めます。

p1とp2には点の座標を直交座標系で代入しておきます。

- p1(0)に点AのX座標
- p1(1)に点AのY座標
- p2(0)に点BのX座標
- p2(1)に点BのY座標

を代入した状態で呼び出してください。
結果は実数で返されます。


__例__:

	#include "hspmath.as"
	point_a = 100, 50       // 点A
	point_b = 500, 400      // 点B
	mes "2点間の距離は" + distance2(point_a, point_b) + "です。"
	line point_a(0), point_a(1), point_b(0), point_b(1)
	color 255  : pset point_a(0), point_a(1)    // 点A
	color ,255 : pset point_b(0), point_b(1)    // 点B
	stop
