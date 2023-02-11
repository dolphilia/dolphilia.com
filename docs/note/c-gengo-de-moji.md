# C言語で文字コードShift-JISをUTF8に変換する

個人的な必要があって文字コードShift-JISをUTF8に変換するC言語プログラムを書きました。この記事ではその覚え書きとしてソースコードの解説を記します。

[[TOC]]

## テスト環境

- OS: macOS 12.5.1
- チップ: Apple M1 Pro
- コンパイラ: clang

ソースコード自体の文字コードはUTF-8で作成しており、ターミナルもUTF-8環境で行なっています。変換元となるテキストファイルだけをShift-JISで作成しています。

## ソースコード全文

ヘッダーファイルも含めた全データについてはGitHubを参照してください。

以下はCソースの全文です。

```c
#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <stdbool.h>
#include <stdarg.h>
#include "table_sjis.h"
#include "table_utf8.h"

void println(const char* str, ...) {
    va_list args;
    va_start(args, str);
    vprintf(str, args);
    printf("\n");
    va_end(args);
}

FILE* file_open_read(char* filename) {
    FILE* file_ptr = fopen(filename, "r");
    if (file_ptr == NULL) {
        println("ファイルオープンに失敗しました"); // ファイルオープンエラーの処理
        exit(0);
    }
    return file_ptr;
}

void file_seek_end(FILE* file_ptr) {
    bool is_error = fseek(file_ptr, 0, SEEK_END);
    if (is_error) { // ファイルサイズの取得
        println("fseek(fp, 0, SEEK_END)に失敗しました"); // fseek エラーの処理
        exit(0);
    }
}

void file_seek_set(FILE* file_ptr) {
    bool is_error = fseek(file_ptr, 0L, SEEK_SET);
    if (is_error) {
        println("fseek(fp, 0, SEEK_SET)に失敗しました"); // fseek エラーの処理
        exit(0);
    }
}

int32_t get_file_length(FILE* file_ptr) {
    int32_t length = 0;
    file_seek_end(file_ptr);
    length = ftell(file_ptr);
    file_seek_set(file_ptr);
    return length;
}

uint8_t* memory_alloc(int32_t size) {
    uint8_t* memory = (unsigned char*)malloc(size);
    if (memory == NULL) {
        println("メモリ割り当てに失敗しました"); // メモリ割り当てエラーの処理
        exit(0);
    }
    return memory;
}

void file_read(FILE* file_ptr, uint8_t* data, int32_t size) {
    bool is_error = fread(data, 1, size, file_ptr) < size;
    if (is_error) {
        println("ファイルの読み取りに失敗しました"); // ファイル読み取りエラーの処理
        exit(0);
    }
}

uint8_t* get_file_raw_data(char* filename, int32_t* size) {
    FILE *file_ptr;
    uint8_t* raw_data;
    file_ptr = file_open_read(filename);
    *size = get_file_length(file_ptr);
    raw_data = memory_alloc(*size); // ファイル全体を格納するメモリを割り当てる 
    file_read(file_ptr, raw_data, *size);
    fclose(file_ptr);
    return raw_data;
}

// 1バイトのutf8コードをchar配列に格納する
void utf8_1byte_to_char(char* str,uint32_t utf8_code) {
    uint32_t tmp_utf8 = utf8_code;
    str[1] = '\0';
    str[0] = (uint8_t)tmp_utf8;
}

// 2バイトのutf8コードをchar配列に格納する
void utf8_2byte_to_char(char* str, uint32_t utf8_code) {
    uint32_t tmp_utf8 = utf8_code;
    str[2] = '\0';
    str[1] = (uint8_t)tmp_utf8;
    tmp_utf8 = tmp_utf8 >> 8;
    str[0] = (uint8_t)tmp_utf8;
}

// 3バイトのutf8コードをchar配列に格納する
void utf8_3byte_to_char(char* str, uint32_t utf8_code) {
    uint32_t tmp_utf8 = utf8_code;
    str[3] = '\0';
    str[2] = (uint8_t)tmp_utf8;
    tmp_utf8 = tmp_utf8 >> 8;
    str[1] = (uint8_t)tmp_utf8;
    tmp_utf8 = tmp_utf8 >> 8;
    str[0] = (uint8_t)tmp_utf8;
}

void utf8_to_char(char* str, uint32_t utf8_code) {
    if (utf8_code < 0x80) {
        utf8_1byte_to_char(str, utf8_code);
    } else if (utf8_code <= 0xF1A0) {
        utf8_2byte_to_char(str, utf8_code);
    } else {
        utf8_3byte_to_char(str, utf8_code);
    }
}

int search_sjis_index(uint32_t* table, uint32_t sjis_code) { //指定したSJISコードにマッチする位置を返す
    int table_len = sizeof(table_sjis) / sizeof(uint32_t);
    for (int i = 0; i < table_len; i++) {
        if (sjis_code == table_sjis[i]) {
            return i;
        }
    }
    //printf("\n%d\n",sjis_code);
    return 0;
}

void print_utf8_from_sjis(uint32_t* table, uint32_t sjis_code) {
    int index = search_sjis_index(table, sjis_code);
    if (index) {
        char str[4] = "";
        utf8_to_char(str, table_utf8[index]);
        printf("%s", str);
    } else { // マッチしなかった場合は変換せずに格納する
        char str[4] = "";
        utf8_to_char(str, sjis_code);
        printf("%s", str);
    }
}

uint32_t get_2byte_from_raw_data(uint8_t* data, int offset) {
    uint32_t code = 0;
    code += data[offset + 0]; // ２バイト分流し込む
    code = code << 8;
    code += data[offset + 1];
    return code;
}

void print_sjis_data(uint8_t* data, int32_t size) {
    for(int offset = 0; offset < size; ) {
        if (data[offset] >= 0x81) { // 1バイト目が0x81以上なら２バイト文字
            uint32_t sjis_code = 0;
            sjis_code = get_2byte_from_raw_data(data, offset);
            offset += 2;
            print_utf8_from_sjis(table_sjis, sjis_code);
        } else { // 1バイト目が0x81未満なら１バイト文字
            uint32_t sjis_code = 0;
            sjis_code += data[offset]; // ２バイト分流し込む
            offset += 1;
            print_utf8_from_sjis(table_sjis, sjis_code);
        }
    }
}

int main() {
    uint8_t* data;
    int32_t size;
    data = get_file_raw_data("sjis.txt", &size);
    print_sjis_data(data, size);
    free(data);
    return 0;
}
```

## ヘッダーの解説

ヘッダー部分のうち、独自のものは次の二行です。

```c
#include "table_sjis.h"
#include "table_utf8.h"
```

table_sjis.hファイルではuint32_t型の配列table_sjis[]を定義しています。table_utf8.hファイルでは同じく’uint32_t’型の配列table_utf8.hを定義しています。

それぞれの配列には文字コードが格納されており、ソースコードでは16進数として表されています。二つの配列は同一のインデックス値で表される文字コードが組になっており、同じ文字を表しています。

つまり、変換したいShift-JIS文字と同じShift-JIS配列の文字コードを検索したとき、そのインデックス値を使うことによりUTF-8配列から対応する文字コードを取得することができるということになります。

これらの配列はunicode.orgで配布されている変換テーブルを参考に作成しました。

## ファイルの読み込み

以下の関数はファイル読み込みのためのものです。

```c
FILE* file_open_read(char* filename)
void file_seek_end(FILE* file_ptr)
void file_seek_set(FILE* file_ptr)
int32_t get_file_length(FILE* file_ptr)
uint8_t* memory_alloc(int32_t size)
void file_read(FILE* file_ptr, uint8_t* data, int32_t size)
uint8_t* get_file_raw_data(char* filename, int32_t* size)
```

get_file_raw_data()関数の第一引数で指定したファイルを開いて読み込み、第二引数で指定した変数にはファイルサイズが格納されます。そしてutf8_t*型の変数のメモリが確保され、そこにデータを格納して返します。

ソースコードでは次のように使用されています。

```c
uint8_t* data;
int32_t size;
data = get_file_raw_data("sjis.txt", &size);
...
free(data);
```

## 文字コードの変換

次の関数は文字コードを変換するためのものです。

```c
void utf8_1byte_to_char(char* str,uint32_t utf8_code)
void utf8_2byte_to_char(char* str, uint32_t utf8_code)
void utf8_3byte_to_char(char* str, uint32_t utf8_code)
void utf8_to_char(char* str, uint32_t utf8_code)
int search_sjis_index(uint32_t* table, uint32_t sjis_code)
void print_utf8_from_sjis(uint32_t* table, uint32_t sjis_code)
uint32_t get_2byte_from_raw_data(uint8_t* data, int offset)
void print_sjis_data(uint8_t* data, int32_t size)
```

utf8_1byte_to_char関数はutf32_t型のUTF-8文字コードから1バイトだけを抽出してchar配列に格納します。2バイト目には終端文字が格納されます。

同様にutf8_2byte_to_char関数は2バイトを抽出して格納し、utf8_3byte_to_charは3バイトを抽出して格納します。

0x80以上が2バイト文字になるのでutf8_to_char関数ではそれを判別して処理を割り振ります。

search_sjis_index関数は指定したShift-JISコードと変換テーブルを比較してマッチするインデックス値を返します。

print_utf8_from_sjis関数はsearch_sjis_index関数で取得したインデックス値を元に、UTF-8テーブルから同じインデックス値の文字コードを出力します。

get_2byte_from_raw_data関数はuint8_t型の配列を処理して、指定したインデックス値から2バイトを取り出してuint32_t型に格納して返します。

print_sjis_data関数はShift-JIS文字列を処理して、1バイト文字か2バイト文字かを判別します。2バイト文字であれば、get_2byte_from_raw_data関数で2バイトを取り出し、print_utf8_from_sjis関数でUTF-8に変換して出力します。1バイト文字であれば、直接1バイトを取り出してprint_utf8_from_sjis関数で出力します。これを文字列の終端まで繰り返します。

## main関数

main関数は次のようになっています。

```c
int main() {
    uint8_t* data;
    int32_t size;
    data = get_file_raw_data("sjis.txt", &size);
    print_sjis_data(data, size);
    free(data);
    return 0;
}
```

get_file_raw_data関数で文字コードがShift-JISのテキストファイルを開いてuint8_t*型の戻り値を取得し、print_sjis_data関数で取得したデータをUTF-8に変換して出力します。

## まとめ

プログラムの解説は以上です。