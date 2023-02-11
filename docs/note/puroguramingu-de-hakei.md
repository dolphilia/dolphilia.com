# プログラミングで波形を生成する

コンピュータは歴史的に見ても音との相性が良いとは言いがたいところがありました。とくにインターネット上での音声の扱いは難しく再生には Flash や QuickTimePlayer などのプラグインを必要としていました。そのため、音に関するプログラミングは文章や画像と比べると扱いにくさを感じるかもしれません。

でも、ずっとそうだったわけではありません。NECの作ったPC-98シリーズでは音楽のプログラムを作って演奏することができました。任天堂のファミコンには３種類の波形とノイズを出力するための命令が用意されていました。そして現在、以前と比べると音がずっと扱いやすくなっています。音楽ファイルをブラウザ上で再生できるようになりました。動画も再生できます。

サウンドプログラミングで最初にぶつかる壁があります。それはどうやって音を鳴らすかという点です。この記事では３つのプログラミング言語を例に解説します。この記事を作成するうえで、次のソースコードを参考にしました。http://jsdo.it/haii/aMdC（作者：haii、ライセンス：MIT License）

## C言語で波形を生成する

C言語はコンピュータを作る基礎となったプログラミング言語です。C言語そのものには音を再生する機能はありません。そこで波形を生成して再生するために、２通つの方法が用いられます。１つ目はWAVなどのファイルを直接作って出力する方法で、２つ目はOpenALなどを利用してサウンド出力装置を操作する方法です。

1. C言語の基本

WAVファイルを作成して出力するとは、ハードディスクなどの記憶装置にWAVのデータが保存されるということです。まずメモリ上にWAVファイルを生成し、それを記憶装置に保存します。そして保存されたWAVファイルを一般的な再生ソフトを使って再生します。

C言語では、最初に読み込まれるmainという関数があります。

```c
int main(void) { ... }
```

関数とは幾つかの処理をひとまとまりにしたようなものです。main関数はプログラムを実行したら最初に読み込まれる箇所です。C言語で関数は、まず戻り値の型を記述して、関数名と引数の型と名前を記述します。戻り値は処理をしたあとの結果として帰る値で、引数は関数が使われる場面によって変わる値、数学の関数 f(x) の x のようなものです。

```
戻り値 関数名(引数) { ...処理... }
```

プログラムで戻り値はintで引数はvoidとなっています。intは数値を表す型で、voidは何もないことを表しています

```c
int main(void) { ... return 0; }
```

さらにプログラムを展開すると、main関数の末尾に return 0; という記述があります。その処理で 0 という戻り値を結果として返しています。0 そのものに固有の意味はありませんが、ここでは正常にプログラムが終了したことを表しています。

2. WAVファイル生成のための変数

```c
int main(void) {
    int size = 88200;
    int channel = 1;
    int bytesPerSec = 44100;
    int bitsPerSample = 16;
    int offset = 44;
    ...
    return 0;
}
```

この関数は、変数の宣言で始まります。それぞれプログラムでの役割を持っています。size は波形データのサイズ（バイト単位）、channel は音声ファイルのチャンネル数（1がモノラルで2がステレオ）、bytesPerSec はサンプリング周波数、bitsPerSampleはビット数を表します。これらはWAVファイルのヘッダーを記述するのに必要な情報です。ヘッダーにはそのファイルのサイズやチャンネル数など基本的な情報が含まれています。offset という変数はヘッダーのサイズを表しています。WAVファイルのヘッダーのサイズは44バイトです。

```c
int main(void) {
    int size = 88200;
    int channel = 1;
    int bytesPerSec = 44100;
    int bitsPerSample = 16;
    int offset = 44;
    unsigned char bytes[offset + size];
    ...
    return 0;
}
```

bytes はヘッダーと波形データの両方を収めるための変数です。このプログラムでもっとも重要な変数です。unsigned char という型は、符号なしでサイズは１バイトであることを表しています。offset はヘッダーサイズを size は波形データのサイズで、その合計の数の配列を作成しています。

2. データをメモリに書き込むための3つの関数

WAVのヘッダーに１バイトずつ直接書き込むことは可能ですが、プログラムを簡潔にするために３つの関数が作られています。

```c
void writeString(unsigned char *bytes, char val[]) {
    for (int i = 0, len = strlen(val); i < len; i++, *bytes++) {
        *bytes = val[i];
    }
}
```

１つ目が文字列を文字列分だけバイト列に書き込む関数です。１つ目の引数として符号なしのchar型へのポインタを、２つ目の引数に文字列を受け取ります。ここでのポインタはbytesデータへのオフセットの役割をします。書き込みたい位置のbytesポインタを受け取るので、そのポインタを１ずつ加算してデータへのオフセットを１バイトずつずらしていきます。そこに２つ目の引数の該当する文字を１字ずつ書き込みます。文字列の長さを取得するのに strlen() という関数を使っていますが、これを使用するためには string.h をインクルードする必要があります。

```c
void writeInt32(unsigned char *bytes, long val) {
    for (int i=0; i < 4; i++, *bytes++) {
        *bytes = val & 255;
        val = val >> 8;
    }
}
```

32ビットつまり4バイト書き込むための関数です。１つ目の引数は先ほどの引数と同じで、２つ目の引数に４バイトの符号付き整数 long型を受け取ります。３行目の *bytes = val & 255; は、整数値の8ビット分を取得しています。2進数での8の位までを取得しています。

& は論理積を表していて、論理積は比較した両方のビットが1の場合だけ1にし、それ以外では0にします。255は、2進数（ビット）で表すと11111111となり、16進数では0xffとなります。255を2バイト整数かつ16進数で表すと0xff00となり、２進数では９の位以降が0となります。論理積ではどちらかが 0 であれば 0 とするので、この計算によって8ビット分だけを取得することができます。

val = val >> 8; で、ビットを右へ 8 ビットシフトしています。これは9の位から右にあるビットを１のくらいまでずらして持ってきたことになります。そのため２回目のループで論理積を求めるときは元の９〜１６の位の値を取得することができ、３回目、４回目も同じく次の位の８ビット分を取得する、という仕組みになっています。

```c
void writeInt16(unsigned char *bytes, short val) {
    for (int i=0; i < 2; i++, *bytes++) {
        *bytes = val & 255;
        val = val >> 8;
    }
}
```

２バイト分を書き込む関数です。仕組みは３つ目の関数と同じです。これら３つの関数を使って、WAVデータのためのバイト列を作っていきます。

3. WAVファイルのヘッダー部分を書き込む

```c
int main(void) {
    int size = 88200;
    int channel = 1;
    int bytesPerSec = 44100;
    int bitsPerSample = 16;
    int offset = 44;
    unsigned char bytes[offset + size];

    writeString(&bytes[0], RIFF);                 // RIFF ヘッダ
    writeInt32(&bytes[4], offset + size - 8);       // ファイルサイズ - 8
    writeString(&bytes[8], WAVE);                 // WAVE ヘッダ
    writeString(&bytes[12], fmt );                // fmt チャンク
    writeInt32(&bytes[16], 16);                     // fmt チャンクのバイト数
    writeInt16(&bytes[20], 1);                      // フォーマットID
    writeInt16(&bytes[22], channel);                // チャンネル数
    writeInt32(&bytes[24], bytesPerSec);            // サンプリングレート
    writeInt32(&bytes[28], bytesPerSec * (bitsPerSample >> 3) * channel); // データ速度
    writeInt16(&bytes[32], (bitsPerSample >> 3) * channel); // ブロックサイズ
    writeInt16(&bytes[34], bitsPerSample);          // サンプルあたりのビット数
    writeString(&bytes[36], data);                // data チャンク
    writeInt32(&bytes[40], size);                   // 波形データのバイト数

    ...

    return 0;
}
```

それぞれコメントで説明されているデータを書き込んでゆきます。bytes配列のポインタをオフセット値として渡して、オフセット値からbytesにデータを書き込んでいます。コメント部分は参考にしたソースコードのものをそのまま引用しています。

4. 波形生成してデータを書き込む

```c
int main(void) {
    int size = 88200;
    int channel = 1;
    int bytesPerSec = 44100;
    int bitsPerSample = 16;
    int offset = 44;
    unsigned char bytes[offset + size];

    writeString(&bytes[0], RIFF);                 // RIFF ヘッダ
    writeInt32(&bytes[4], offset + size - 8);       // ファイルサイズ - 8
    writeString(&bytes[8], WAVE);                 // WAVE ヘッダ
    writeString(&bytes[12], fmt );                // fmt チャンク
    writeInt32(&bytes[16], 16);                     // fmt チャンクのバイト数
    writeInt16(&bytes[20], 1);                      // フォーマットID
    writeInt16(&bytes[22], channel);                // チャンネル数
    writeInt32(&bytes[24], bytesPerSec);            // サンプリングレート
    writeInt32(&bytes[28], bytesPerSec * (bitsPerSample >> 3) * channel); // データ速度
    writeInt16(&bytes[32], (bitsPerSample >> 3) * channel); // ブロックサイズ
    writeInt16(&bytes[34], bitsPerSample);          // サンプルあたりのビット数
    writeString(&bytes[36], data);                // data チャンク
    writeInt32(&bytes[40], size);                   // 波形データのバイト数

    for (int i = 0; i < size; i += 2) {
        writeInt16(&bytes[offset + i], sin(i / 4 / M_PI) * 4096);
    }

    ...

    return 0;
}
```

この箇所で波形を生成しています。forループでの変数iはオフセット値としても使用しているので増分が2バイトを表す２になっています。M_PIやsin関数を使用するには math.h をインクルードする必要があります。またコンパイルオプションとして -lm を指定することも必要です。

5. 生成したデータをファイルに書き込む

```c
int main(void) {
    int size = 88200;
    int channel = 1;
    int bytesPerSec = 44100;
    int bitsPerSample = 16;
    int offset = 44;
    unsigned char bytes[offset + size];

    writeString(&bytes[0], RIFF);                 // RIFF ヘッダ
    writeInt32(&bytes[4], offset + size - 8);       // ファイルサイズ - 8
    writeString(&bytes[8], WAVE);                 // WAVE ヘッダ
    writeString(&bytes[12], fmt );                // fmt チャンク
    writeInt32(&bytes[16], 16);                     // fmt チャンクのバイト数
    writeInt16(&bytes[20], 1);                      // フォーマットID
    writeInt16(&bytes[22], channel);                // チャンネル数
    writeInt32(&bytes[24], bytesPerSec);            // サンプリングレート
    writeInt32(&bytes[28], bytesPerSec * (bitsPerSample >> 3) * channel); // データ速度
    writeInt16(&bytes[32], (bitsPerSample >> 3) * channel); // ブロックサイズ
    writeInt16(&bytes[34], bitsPerSample);          // サンプルあたりのビット数
    writeString(&bytes[36], data);                // data チャンク
    writeInt32(&bytes[40], size);                   // 波形データのバイト数

    for (int i = 0; i < size; i += 2) {
        writeInt16(&bytes[offset + i], sin(i / 4 / M_PI) * 4096);
    }

    FILE *fp;
    char *filename = sample.wav;

    if ((fp = fopen(filename, wb)) == NULL) {
        fprintf(stderr, %sのオープンに失敗しました.\\n, filename);
        exit(EXIT_FAILURE);
    }

    fwrite(bytes, sizeof(char), size, fp);
    fclose(fp);

    return 0;
}
```

C言語でファイルを読み込んだり書き込んだりするのに、次のような手順でおこないます。まずファイルポインタの宣言を行ない、次にファイルのオープン、次にファイルの読み書き、そしてファイルのクローズをします。ファイルポインタとはFILE型へのポインタのことで、FILE型にはファイルの入出力を行うのに必要な情報を管理しています。fopen関数によってファイルポインタを取得することができます。

bytes配列に作成したデータは、そのままwavファイルと同等の構造になっています。fwrite関数で、bytes配列の内容をそのままファイルに出力することにより、WAVファイルを作成することができます。

6. C言語でWAVファイルを生成するプログラムの例。

```c
// コンパイルするときの例：gcc test.c -lm -std=c99 -o test

#include <stdio.h>
#include <string.h>
#include <math.h>
#include <stdlib.h>

#define M_PI 3.141592

void writeString(unsigned char *bytes, char val[]) {
    for (int i = 0, len = strlen(val); i < len; i++, *bytes++) {
        *bytes = val[i];
    }
}

void writeInt32(unsigned char *bytes, long val) {
    for (int i=0; i < 4; i++, *bytes++) {
        *bytes = val & 255;
        val = val >> 8;
    }
}

void writeInt16(unsigned char *bytes, short val) {
    for (int i=0; i < 2; i++, *bytes++) {
        *bytes = val & 255;
        val = val >> 8;
    }
}

int main(void) {
    int size = 88200;
    int channel = 1;
    int bytesPerSec = 44100;
    int bitsPerSample = 16;
    int offset = 44;
    unsigned char bytes[offset + size];

    writeString(&bytes[0], RIFF);
    writeInt32(&bytes[4], offset + size - 8);
    writeString(&bytes[8], WAVE);
    writeString(&bytes[12], fmt );
    writeInt32(&bytes[16], 16);
    writeInt16(&bytes[20], 1);
    writeInt16(&bytes[22], channel);
    writeInt32(&bytes[24], bytesPerSec);
    writeInt32(&bytes[28], bytesPerSec * (bitsPerSample >> 3) * channel);
    writeInt16(&bytes[32], (bitsPerSample >> 3) * channel);
    writeInt16(&bytes[34], bitsPerSample);
    writeString(&bytes[36], data);
    writeInt32(&bytes[40], size);

    for (int i = 0; i < size; i += 2) {
        writeInt16(&bytes[offset + i], sin(i / 4 / M_PI) * 4096);
    }

    FILE *fp;
    char *filename = sample.wav;

    if ((fp = fopen(filename, wb)) == NULL) {
        fprintf(stderr, %sのオープンに失敗しました.\\n, filename);
        exit(EXIT_FAILURE);
    }

    fwrite(bytes, sizeof(char), size, fp);
    fclose(fp);

    return 0;
}
```

## HSPで波形を生成して再生する

HSPはゲーム開発で人気のあるプログラミング言語です。機械語にコンパイルせずに逐次実行していくためインタプリタ言語とも呼ばれます。プログラムは上から１行ずつ実行されます。

HSPには１バイト、２バイト、４バイトを書き込む命令が標準で実装されています。またメモリ上にあるファイルを画像あるいは音声として読み込むこともできるので、行数がC言語に比べると短くなります。

```
size = 88200
channel = 1
bytesPerSec = 44100
bitsPerSample = 16
offset = 44
...
```

WAVデータを作成するのに必要な変数を作成します。内容はC言語の例と同様で、それぞれ波形データのサイズ・チャンネル数・サンプリング周波数・ビット数・ヘッダーのサイズです。HSPではプログラムを実行する前にソースをあらかじめ調べて変数を確保する仕組みになっています。変数がプログラム中に宣言なしに現れても 0 が格納された変数として扱われます。型は代入される内容によって自動的に判別されて変換されます。整数を格納すると数値型として機能するので、上記の変数はすべて数値型です。

```
size = 88200
channel = 1
bytesPerSec = 44100
bitsPerSample = 16
offset = 44

sdim bytes, offset + size + 2
...
```

波形データを格納する bytes 変数を作成しています。HSPは必要に応じて自動的に変数のサイズを変更します。しかし変数に直接バイトを書き込むなどの操作をするときは、あらかじめ必要なメモリを確保しておく必要があります。sdim は文字列変数のメモリをあらかじめ確保しておくための命令です。文字列変数はc言語でいう char 型に近いものです。ここではヘッダーサイズと波形データサイズを足して、またオーバーフローのエラーを回避するために２バイト余分に確保します。

```
size = 88200
channel = 1
bytesPerSec = 44100
bitsPerSample = 16
offset = 44

sdim bytes, offset + size + 2

poke bytes, 0, RIFF
lpoke bytes, 4, offset + size - 8
poke bytes, 8, WAVE
poke bytes, 12, fmt 
lpoke bytes, 16, 16
wpoke bytes, 20, 1
wpoke bytes, 22, channel
lpoke bytes, 24, bytesPerSec
lpoke bytes, 28, bytesPerSec * (bitsPerSample / 8) * channel
wpoke bytes, 32, (bitsPerSample / 8) * channel
wpoke bytes, 34, bitsPerSample
poke bytes, 36, data
lpoke bytes, 40, size
...
```

ヘッダー情報を bytes 変数に書き込みます。ここで使われている３つの命令 poke と wpoke と lpoke はそれぞれ１バイト・２バイト・４バイトを書き込むための命令です。poke は文字列を書き込むことも可能です。命令の引数も３つあり１つ目が書き込み先の変数・２つ目が書き込むバイト単位のオフセット値・３つ目が書き込む数値もしくは文字列となっています。

```
size = 88200
channel = 1
bytesPerSec = 44100
bitsPerSample = 16
offset = 44

sdim bytes, offset + size + 2

poke bytes, 0, RIFF
lpoke bytes, 4, offset + size - 8
poke bytes, 8, WAVE
poke bytes, 12, fmt 
lpoke bytes, 16, 16
wpoke bytes, 20, 1
wpoke bytes, 22, channel
lpoke bytes, 24, bytesPerSec
lpoke bytes, 28, bytesPerSec * (bitsPerSample / 8) * channel
wpoke bytes, 32, (bitsPerSample / 8) * channel
wpoke bytes, 34, bitsPerSample
poke bytes, 36, data
lpoke bytes, 40, size

i = 0.0
repeat
    if i > size : break
    wpoke bytes, offset + i, int(sin(i / 4 / M_PI) * 4096)
    i += 2.0
loop
...
```

波形データを bytes 変数に格納します。HSPではループ制御をするのに repeat – loop を用います。この命令を使うときは無限ループにならないように、ループを抜ける条件をどこかに記述する必要があります。このプログラムでは if i > size : break がそれにあたります。HSPのバージョン3.0以降からは関数も使えるようになり、sin 関数も用意されています。また標準のマクロとして M_PI が用意されています。sin 関数は結果を 0 から 1 の少数として返すので、十分な音量を確保するために 4096 をかけています。

```
size = 88200
channel = 1
bytesPerSec = 44100
bitsPerSample = 16
offset = 44

sdim bytes, offset + size + 2

poke bytes, 0, RIFF
lpoke bytes, 4, offset + size - 8
poke bytes, 8, WAVE
poke bytes, 12, fmt 
lpoke bytes, 16, 16
wpoke bytes, 20, 1
wpoke bytes, 22, channel
lpoke bytes, 24, bytesPerSec
lpoke bytes, 28, bytesPerSec * (bitsPerSample / 8) * channel
wpoke bytes, 32, (bitsPerSample / 8) * channel
wpoke bytes, 34, bitsPerSample
poke bytes, 36, data
lpoke bytes, 40, size

i = 0.0
repeat
    if i > size : break
    wpoke bytes, offset + i, int(sin(i / 4 / M_PI) * 4096)
    i += 2.0
loop

memfile bytes, 0 , size + offset
mmload MEM:a.wav, 0,1
mmplay 0
```

HSPでメモリ上のファイルを再生するための箇所です。memfile で bytes 変数をメモリ上にあるファイルとみなします。mmload はHSP標準の音声ファイルを読み込むための命令で、ファイル名の先頭に MEM: をつけることにより、メモリ上のファイルを参照することができます。ファイル名はダミーのファイル名を指定し、WAVファイルを読み込むので拡張子は wav とします。mmplay 命令は音声を再生するための命令です。

これまでの例をつなげてみます。

```
size = 88200
channel = 1
bytesPerSec = 44100
bitsPerSample = 16
offset = 44

sdim bytes, offset + size + 2

poke bytes, 0, RIFF
lpoke bytes, 4, offset + size - 8
poke bytes, 8, WAVE
poke bytes, 12, fmt 
lpoke bytes, 16, 16
wpoke bytes, 20, 1
wpoke bytes, 22, channel
lpoke bytes, 24, bytesPerSec
lpoke bytes, 28, bytesPerSec * (bitsPerSample / 8) * channel
wpoke bytes, 32, (bitsPerSample / 8) * channel
wpoke bytes, 34, bitsPerSample
poke bytes, 36, data
lpoke bytes, 40, size

i = 0.0
repeat
    if i > size : break
    wpoke bytes, offset + i, int(sin(i / 4 / M_PI) * 4096)
    i += 2.0
loop

memfile bytes, 0 , size + offset
mmload MEM:a.wav, 0,1
mmplay 0
```

これでHSPによるWAV生成プログラムはすべて見たことなります。

## JavaScriptを使って波形を生成して再生する方法

JavaScriptでの音声を再生するプログラムは、haiiさんの作成されたソースコードが分かりやすいので、それを用いて解説したいと思います。この記事ではソースを全文掲載はしないので、必要な方はリンクをたどって入手するようになさってください。

1. audioタグのsrc属性には文字列による音声が使える

ブラウザ上で音を生成するためのいくつかの方法があり、HSPの例と同様の方法がブラウザ上でも行えます。JavaScriptで作成したWAVデータを読み込ませるのにHTML5のaudioタグを用います。普通audioタグは

```js
// バイト配列を文字列に変換
var temp = '';
for (var i = 0; i < 100; i++) {
}
```

生成したWAVデータをBase64のデータに変換するのに btoa 関数が用いられます。そして btoa 関数の引数として扱えるようにまずWAVデータは文字列に変換しています。Base64データはアルファベットや数字や記号を含めた64+1文字を使って作成されます。

ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/
それぞれ左から0から63という数値に対応しています。この64の文字（数値）を組み合わせることにより、元のデータを完全に再現することができるようになります。Base64に変換している箇所は btoa(temp) です。btoaの引数には文字列を使用するので、そのためにバイト配列を文字列に変換する処理を行っています。

Base64変換の仕組みは、まず3バイト（24ビット）を１つのまとまりとします。そのまとまりを6ビットずつに分け４等分します。6ビット数は全部で64の通りの組み合わせがあり、64の文字でそれに対応させることができます。例えば 000001 は A が対応しています。

```js
// audio タグ作成
var audio = document.createElement(''audio'');
audio.controls = true;
audio.src = datauri;
document.body.appendChild(audio);
```

Base64に変換されたデータはAudioタグの src 属性に渡されます。Javascriptの document.createElement メソッドでaudio要素を生成し、document.body.appendChild メソッドで要素をページに追加しています。その際、Javascriptで直接Audioタグの src 属性にBase64形式の音声データを渡しています。

このプログラムではJavascriptでAudio要素を追加していますが、他の方法として document.getElementById(”要素のID”).innerHTML = … ; のようにする方法もあります。この方法では仮に div 要素などを作っておき、Javascriptでその内容をAudioタグに書き換えます。その際は … innerHTML = <audio src=” + datauri +”>; というように、src 属性にBase64に変換した音声データを渡すようにします。

HTML側:

```html
<div id=audio1></div>
```

JavaScript側：

```js
document.getElementById(''audio1'').innerHTML = <audio src='' + datauri + ''></audio>;
```

WAVデータを作成するために、プログラムでは Uint8Arrayというオブジェクトを使用しています。Javascriptでバイナリデータを扱うためのArrayBufferクラスを操作するためのArrayBufferViewの１つです。Uint8Arrayではデータを8ビット符号なし整数として扱うことができます。

```js
var bytes = new Uint8Array(offset + size);
```

bytes はUint8Arrayオブジェクトですが、配列と同じようにアクセスして読み書きすることができます。この配列にWAVファイルのヘッダー44バイトを書き込み、それに続き波形データを書き込みます。

```js
// 波形データ書き込み (サイン波)
var i;
for (i = 0; i < 100; i++) {
    // サイン波の書き込み処理
}
```

44バイトのヘッダー情報が格納されたbytes配列に波形データを書き込んでいます。Math.sin メソッドでサイン波の値を求め、音量を上げるために4096倍しています。もしサイン波ではなく矩形波を書き込みたい場合は、次のように書き換えることができます。

```js
var i;
var n = 0;
for (i = 0; i < 100; i++) {
        writeInt16(bytes, 4000, offset + i);
    else
        writeInt16(bytes, 0, offset + i);
    if (n > 200)
        n = 0;
    n++;
}
```

## まとめ

この記事では波形を生成するプログラムをC言語・HSP・Javascriptでどのように行なうかを学ぶことができました。それにはWAVファイルのヘッダーと波形データを作成することが含まれていました。また、それぞれの言語で問題なくWAVデータを作成できることが分かりました。