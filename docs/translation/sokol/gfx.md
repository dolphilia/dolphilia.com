# sokol_gfx.h

シンプルな 3D API ラッパー

プロジェクトURL: https://github.com/floooh/sokol

コード例: https://github.com/floooh/sokol-samples

このファイルをCまたはC++ファイルにインクルードして実装を作成する前に、

```c
#define SOKOL_IMPL
```

または

```c
#define SOKOL_GFX_IMPL
```

を定義してください。


同じ場所で、レンダリングバックエンドを選択するために、以下のいずれかを定義します。

```c
#define SOKOL_GLCORE33
#define SOKOL_GLES2
#define SOKOL_GLES3
#define SOKOL_D3D11
#define SOKOL_METAL
#define SOKOL_WGPU
#define SOKOL_DUMMY_BACKEND
```

例えば、GL 3.3 Core Profileの場合、次のようになります。

```c
#include ...
#include ...
#define SOKOL_IMPL
#define SOKOL_GLCORE33
#include "sokol_gfx.h"
```

ダミーバックエンドは、プラットフォーム固有のバックエンドコードを空のスタブ関数で置き換えます。これは、コマンドラインで実行する必要があるテストを書くときに便利です。

オプションで、以下の定義を独自の実装で提供します。

- SOKOL_ASSERT(c)             - 独自のアサートマクロ (デフォルト: assert(c))
- SOKOL_UNREACHABLE()         - 到達不可能なコードのためのガードマクロ (デフォルト: assert(false))
- SOKOL_GFX_API_DECL          - 公開関数宣言のプレフィックス (デフォルト: extern)
- SOKOL_API_DECL              - SOKOL_GFX_API_DECLと同じです。
- SOKOL_API_IMPL              - public 関数実装の接頭辞（デフォルト：-）。
- SOKOL_TRACE_HOOKS           - トレースフックコールバックを有効にする (以下、TRACE HOOKS で検索)
- SOKOL_EXTERNAL_GL_LOADER    - 独自のGLローダーを使用していることを示します。この場合、sokol_gfx.hは、いかなるプラットフォームGLヘッダーも含まず、統合されたWin32 GLローダーを無効化します。

sokol_gfx.hがDLLとしてコンパイルされる場合、宣言または実装を含む前に以下を定義してください。

`SOKOL_DLL`

Windowsでは、SOKOL_DLLは、必要に応じて、SOKOL_GFX_API_DECLを__declspec(dllexport) または __declspec(dllimport) として定義します。

非推奨の構造体や関数を使わずにコンパイルしたい場合は、定義します。

`SOKOL_NO_DEPRECATED`

オプションで以下を定義すると、リリースモードでもデバッグチェックとバリデーションを強制的に行うことができます。

`SOKOL_DEBUG`

デフォルトでは、_DEBUG が定義されている場合に定義されます。

## sokol_gfx DOES NOT:

- ウィンドウまたは3D-APIコンテキスト/デバイスを作成する。sokol_gfxが初期化される前にこれを行い、必要な情報（3Dデバイスポインタなど）をsokol_gfxの初期化コールに渡す必要があります。
- レンダリングされたフレームを表示します。これが正確に行われる方法は、通常、ウィンドウと3D-APIコンテキスト/デバイスの作成方法に依存します。
- 統一されたシェーダー言語を提供する代わりに、3D-API固有のシェーダーソースコードまたはシェーダーバイトコードを提供する必要があります（「公式」オフラインシェーダークロスコンパイラーについては、こちらを参照してください）。

- https://github.com/floooh/sokol-tools/blob/master/docs/sokol-shdc.md)


## ステップバイステップ

を呼び出して sokol_gfx を初期化し、ウィンドウと 3D-API コンテキスト/デバイスを作成した後、これを呼び出します。

```c
sg_setup(const sg_desc*)
```

リソースオブジェクト（少なくともバッファ、シェーダ、パイプライン、オプションでイメージとパス）を作成します。

```c
sg_buffer sg_make_buffer(const sg_buffer_desc*)
sg_image sg_make_image(const sg_image_desc*)
sg_shader sg_make_shader(const sg_shader_desc*)
sg_pipeline sg_make_pipeline(const sg_pipeline_desc*)
sg_pass sg_make_pass(const sg_pass_desc*)
```

デフォルトフレームバッファへのレンダリングを開始します。

```c
sg_begin_default_pass(const sg_pass_action* action, int width, int height)
```

...または、その代わりに。

```c
sg_begin_default_passf(const sg_pass_action* action, float width, float height)
```

...フレームバッファの幅と高さをfloat値として受け取ります。

または、オフスクリーンフレームバッファへのレンダリングを開始します。

```c
sg_begin_pass(sg_pass pass, const sg_pass_action* action)
```

で次の描画呼び出しのためのパイプラインの状態を設定します。

```c
sg_apply_pipeline(sg_pipeline pip)
```

sg_bindings 構造体に、次の描画呼び出しのためのリソースバインディング（1〜N個の頂点バッファ、0個または1個のインデックスバッファ、頂点シェーダおよびフラグメントシェーダステージでそれぞれテクスチャとして使用する0〜N個のイメージオブジェクト）を詰め、以下を呼び出します。

```c
sg_apply_bindings(const sg_bindings* bindings)
```

でリソースバインディングを更新します。

オプションでシェーダーユニフォームデータを更新する。

```c
sg_apply_uniforms(sg_shader_stage stage, int ub_index, const sg_range* data)
```

sg_apply_uniforms() に渡されるユニフォームデータの期待されるメモリレイアウトについて学ぶために、セクション 'UNIFORM DATA LAYOUT' を読んでみてください。

で描画呼び出しをキックオフします。

```c
sg_draw(int base_element, int num_elements, int num_instances)
```

sg_draw() 関数は、プリミティブをレンダリングするすべての異なる方法(インデックス付きレンダリングと非インデックス付きレンダリング、インスタンス付きレンダリングと非インスタンス付きレンダリング)を1つの呼び出しで統一しています。インデックス付きレンダリングの場合、base_element と num_element は、現在結合されているインデックスバッファのインデックスを指定します。インデックスなしレンダリングの場合、base_element と num_elements は、現在結合されている頂点バッファの頂点を指定します。インスタンスレンダリングを行うには、レンダリングパイプラインがインスタンス用に設定され（下記の sg_pipeline_desc 参照）、インスタンス毎のデータを含む別の頂点バッファがバインドされ、num_instancesパラメータが> 1 でなければなりません。

現在のレンダリングパスを終了します。

```c
sg_end_pass()
```

を呼び出し、現在のフレームを終了させる。

```c
sg_commit()
```

でsokol_gfxをシャットダウンしてください。

```c
sg_shutdown()
```

sg_shutdown() の前にリソースを破棄する必要がある場合、呼び出す。

```c
sg_destroy_buffer(sg_buffer buf)
sg_destroy_image(sg_image img)
sg_destroy_shader(sg_shader shd)
sg_destroy_pipeline(sg_pipeline pip)
sg_destroy_pass(sg_pass pass)
```

を呼び出して、新しいビューポート矩形を設定します。

```c
sg_apply_viewport(int x, int y, int width, int height, bool origin_top_left)
```

...または、ビューポートの矩形をfloat値で指定したい場合。

```c
sg_apply_viewportf(float x, float y, float width, float height, bool origin_top_left)
```

をクリックすると、新しいシザーレートを設定することができます。

```c
sg_apply_scissor_rect(int x, int y, int width, int height, bool origin_top_left)
```

...またはfloat値で。

```c
sg_apply_scissor_rectf(float x, float y, float width, float height, bool origin_top_left)
```

sg_apply_viewport() と sg_apply_scissor_rect() の両方はレンダリングパスの内部で呼び出されなければなりません。

> sg_begin_default_pass() と sg_begin_pass() はフレームバッファ全体をカバーするためにビューポートとシザーの矩形をリセットすることに注意してください。

を呼び出して、バッファと画像リソースの内容を更新(上書き)してください。

```c
sg_update_buffer(sg_buffer buf, const sg_range* data)
sg_update_image(sg_image img, const sg_image_data* data)
```

更新するバッファとイメージは、SG_USAGE_DYNAMIC または SG_USAGE_STREAM で作成されている必要があります。

sg_update_*() 関数を使用するとき、バッファとイメージリソースに対してフレームあたり1回のみ更新が許可されます。その根拠は、CPU が GPU が現在使用しているデータを上書きしたり、CPU が GPU を待たせたりしないようにするための簡単な対策です。

バッファと画像の更新は、レンダリング操作がバッファまたは画像内の有効な （更新された）データだけを参照する限り、部分的であってもかまいません。

バッファリソースにデータのチャンクを追加するには、以下を呼び出します。

```c
int sg_append_buffer(sg_buffer buf, const sg_range* data)
```

sg_update_buffer() との違いは、 sg_append_buffer() がフレームごとに複数回呼び出されて、新しいデータを少しずつバッファに追加できることで、オプションで前に書き込んだデータを参照する描画の呼び出しとインターリーブされています。

sg_append_buffer() は書き込まれたデータの開始へのバイトオフセットを返します。このオフセットは sg_bindings.vertex_buffer_offsets[n] または sg_bindings.index_buffer_offset に代入することが可能です。

コード例

```c
for (...) {
    const void* data = ...;
    const int num_bytes = ...;
    int offset = sg_append_buffer(buf, &(sg_range) { .ptr=data, .size=num_bytes });
    bindings.vertex_buffer_offsets[0] = offset;
    sg_apply_pipeline(pip);
    sg_apply_bindings(&bindings);
    sg_apply_uniforms(...);
    sg_draw(...);
}
```

sg_append_buffer() で使用するバッファは、SG_USAGE_DYNAMIC または SG_USAGE_STREAM で作成されている必要があります。

アプリケーションが、バッファに収まるより多くのデータをバッファに追加した場合、バッファは、フレームの残りのために "オーバーフロー" 状態になります。

オーバーフローしたバッファをレンダリングしようとする描画コールはすべて、サイレントドロップされます（デバッグモードでは、これは検証エラーにもなります）。

バッファがオーバーフロー状態にあるかどうかを手動で確認することもできます。

```c
bool sg_query_buffer_overflow(sg_buffer buf)
```

バッファにデータを追加する前に、オーバーフローが発生するかどうかを手動で確認するには、以下のように呼び出します。

```c
bool sg_query_buffer_will_overflow(sg_buffer buf, size_t size)
```

> 注: 基礎となる 3D-API の制限のため、追加されたデータのチャンクは、宛先バッファで 4 バイトにアラインされます。これは、sg_append_buffer()の呼び出しのインデックスの数が奇数であるとき、16ビットインデックスを含むインデックスバッファにギャップがあることを意味します。sg_append_buffer() の各呼び出しが1つの描画呼び出しに関連している場合、これは問題ではありませんが、1つのインデックス付き描画呼び出しがインデックスのいくつかの追加チャンクにまたがる場合は問題になるでしょう。

を呼び出して、オプション機能、制限、pixelformatのサポートを実行時にチェックします。

```c
sg_features sg_query_features()
sg_limits sg_query_limits()
sg_pixelformat_info sg_query_pixelformat(sg_pixel_format fmt)
```

を直接呼び出す必要がある場合、その基礎となる3D-APIを呼び出す必要があります。

```c
sg_reset_state_cache()
```

...再びsokol_gfxの関数を呼び出す前に

sg_query_desc() を呼び出すことによって、 sg_setup() に渡されたオリジナルの sg_desc 構造体を検査することができます。これは、ゼロ初期化された値の代わりに、デフォルト値がパッチされた sg_desc 構造体を返します。

を介して、様々な内部リソースの属性を検査することができます。

```c
sg_buffer_info sg_query_buffer_info(sg_buffer buf)
sg_image_info sg_query_image_info(sg_image img)
sg_shader_info sg_query_shader_info(sg_shader shd)
sg_pipeline_info sg_query_pipeline_info(sg_pipeline pip)
sg_pass_info sg_query_pass_info(sg_pass pass)
```

...返される情報構造体は sokol_gfx.h の内部と密接に結びついており、他の公開 API 関数や構造体よりも頻繁に変更される可能性があることに注意してください。

sokol_gfx.hがどのバックエンド用にコンパイルされたか、あるいはGLES3バックエンドがGLES2にフォールバックしなければならなかったかをランタイムに尋ねることができます。

```c
sg_backend sg_query_backend(void)
```

という関数で、デフォルトのリソース作成パラメータを問い合わせることができます。

```c
sg_buffer_desc sg_query_buffer_defaults(const sg_buffer_desc* desc)
sg_image_desc sg_query_image_defaults(const sg_image_desc* desc)
sg_shader_desc sg_query_shader_defaults(const sg_shader_desc* desc)
sg_pipeline_desc sg_query_pipeline_defaults(const sg_pipeline_desc* desc)
sg_pass_desc sg_query_pass_defaults(const sg_pass_desc* desc)
```

これらの関数は、デフォルト値のためにゼロ初期化された項目を含むことができる desc 構造体へのポインタを取ります。これらのゼロ初期化された値は、返された desc 構造体の具体的な値に置き換えられます。


## ON INITIALIZATION:

sg_setup() を呼び出すとき、初期化オプションを含む sg_desc 構造体へのポインタを提供しなければなりません。これらのオプションは sokol-gfx に2つのタイプの情報を提供します。

(1) 様々な内部リソースを割り当てるために必要な上限と下限

データ構造

- 同時にアライブできる各タイプのリソースの最大数、これは内部プールを割り当てるために使用されます。
- フレームごとに更新できる均一なデータの最大サイズ、均一な更新ごとの最悪のケースのアライメントを含む（この最悪のケースのアライメントは256バイトです）
- フレームごとのすべての動的なリソースの更新（sg_update_buffer、sg_append_buffer、sg_update_image）の最大サイズ。
- テクスチャサンプラーキャッシュの最大エントリ数（同時にいくつのユニークなテクスチャサンプラーが存在できるのか）

これらの制限値のすべてが、すべてのバックエンドで使用されるわけではありません。
を提供するのはよい習慣です。

(2) 3D-APIの「コンテキスト情報」（「バインディング」とも呼ばれることがある）。

sokol_gfx.h は、プレゼンテーション層に密接に関連する 3D API オブジェクトを作成または初期化しません (これは、「レンダリングデバイス」、スワップチェーン、およびスワップチェーンに依存する任意のオブジェクトを含みます)。これらの API オブジェクト（または、フレーム間でオブジェクトが変更される可能性がある場合、それらを取得するコールバック関数）は、sg_desc 構造体の中に入れ子された sg_context_desc 構造体で提供されなければなりません。sokol_gfx.h が sokol_app.h と共に使用される場合、 sokol_app.h によって提供されるコンテキスト情報で満たされた sg_context_desc 構造体を得るための便利な関数を提供する sokol_glue.h ヘッダーを見てみてください。

より詳細な情報は、以下の sg_desc 構造体のドキュメントブロックを参照してください。


## UNIFORM DATA LAYOUT:

> 注：シェーダーコンパイラツール sokol-shdc を使用する場合、以下の詳細について心配する必要はありません。

sg_apply_uniforms() 関数に渡されるデータは、GPU シェーダが正しいオフセットでユニフォームブロックアイテムを見つけるように、特定のレイアウトルールに従わなければなりません。

D3D11 と Metal バックエンドでは、sokol-gfx はユニフォームブロックのサイズにのみ関 心があり、内部レイアウトには関心がありません。データは一回の操作で均一/定数バッファにコピーされ、GPU側のレイアウトと一致するようにCPU側のレイアウトをアレンジするのはあなた次第です。これは、D3D11 と Metal バックエンドでは、ユニフォーム変数タイプの「クロスプラッ トフォーム」サブセットに制限されないということでもあります。

D3D11、Metal *または* WebGPUバックエンドのいずれか1つだけを使用する場合は、ここで読むのをやめてもかまいません。

GLバックエンドでは、ユニフォームブロックの内部レイアウトが重要で、ユニフォーム変数の型は少数に制限されます。これは、glUniformXXX()呼び出しでGPUにアップロードするために、sokol-gfxがユニフォームブロックメンバーの位置を特定できる必要があるためです。

ユニフォームブロックのレイアウトを sokol-gfx に記述するために、 sg_make_shader() の呼び出しに、以下の情報を sg_shader_desc 構造体で渡す必要があります。

- 使用されるパッキングルールに関するヒント (SG_UNIFORMLAYOUT_NATIVE または SG_UNIFORMLAYOUT_STD140 のいずれか)
- CPU 側に表示される正しい順序での均一ブロックメンバーの型のリスト

例えば、GLSL シェーダが以下のユニフォーム宣言を持つ場合。

```glsl
uniform mat4 mvp;
uniform vec2 offset0;
uniform vec2 offset1;
uniform vec2 offset2;
```

...そして、CPU側には、同様のC構造体があります。

```c
typedef struct {
    float mvp[16];
    float offset0[2];
    float offset1[2];
    float offset2[2];
} params_t;
```

...sg_shader_descのユニフォームブロックの記述は、次のようなものでなければなりません。

```c
sg_shader_desc desc = {
    .vs.uniform_blocks[0] = {
        .size = sizeof(params_t),
        .layout = SG_UNIFORMLAYOUT_NATIVE,  // this is the default and can be omitted
        .uniforms = {
            // order must be the same as in 'params_t':
            [0] = { .name = "mvp", .type = SG_UNIFORMTYPE_MAT4 },
            [1] = { .name = "offset0", .type = SG_UNIFORMTYPE_VEC2 },
            [2] = { .name = "offset1", .type = SG_UNIFORMTYPE_VEC2 },
            [3] = { .name = "offset2", .type = SG_UNIFORMTYPE_VEC2 },
        }
    }
};
```

この情報により、sokol-gfxはユニフォームブロック構造内のデータアイテムの正しいオフセットを計算することができます。

SG_UNIFORMLAYOUT_NATIVEパッキングルールは、GLバックエンドのみが使用される場合はうまく機能しますが、適切なD3D11/Metal/GLでは、次のセクションで説明するstd140レイアウトのサブセットを使用しなければなりません。


## クロスバックエンド共通の統一データレイアウト

クロスプラットフォーム/クロス3Dバックエンドのコードでは、CPU側のブロックレイアウトがすべてのsokol-gfxバックエンドで同じ統一されたものを使用できることが重要です。これを実現するためには、std140レイアウトの共通のサブセットを使用しなければなりません。

- sg_shader_desc の均一ブロックレイアウトヒントは、明示的に SG_UNIFORMLAYOUT_STD140 に設定する必要があります。
- 以下のGLSLユニフォームタイプのみが使用可能です（関連するsokol-gfx enumもあります）。
    - float => SG_UNIFORMTYPE_FLOAT
    - vec2  => SG_UNIFORMTYPE_FLOAT2
    - vec3  => SG_UNIFORMTYPE_FLOAT3
    - vec4  => SG_UNIFORMTYPE_FLOAT4
    - int   => SG_UNIFORMTYPE_INT
    - ivec2 => SG_UNIFORMTYPE_INT2
    - ivec3 => SG_UNIFORMTYPE_INT3
    - ivec4 => SG_UNIFORMTYPE_INT4
    - mat4  => SG_UNIFORMTYPE_MAT4
- これらの型のアライメントは、以下の通り（バイト単位）でなければならない。
    - float => 4
    - vec2  => 8
    - vec3  => 16
    - vec4  => 16
    - int   => 4
    - ivec2 => 8
    - ivec3 => 16
    - ivec4 => 16
    - mat4  => 16
- 配列は、vec4, int4, mat4 の型にのみ許されます。

> HLSL の cbuffer のレイアウト規則は std140 のレイアウト規則と若干異なるので，HLSL コードの cbuffer 宣言は std140 と互換性があるように調整しなければならないことに注意してください．

一般的な均一ブロックレイアウトの問題を解決する最も簡単な方法は、sokol-shdc シェーダクロスコンパイラツールを使用することです!


## バックエンドに特化したトピック

GLバックエンドは、ユニフォームブロックの内部構造、テクスチャサンプラー名と-typeについて知る必要があります。ユニフォームレイアウトの詳細は、上記のUNIFORM DATA LAYOUTセクションで説明されています。

```c
// uniform block structure and texture image definition in sg_shader_desc:
sg_shader_desc desc = {
    // uniform block description (size and internal structure)
    .vs.uniform_blocks[0] = {
        ...
    },
    // one texture on the fragment-shader-stage, GLES2/WebGL needs name and image type
    .fs.images[0] = { .name="tex", .type=SG_IMAGETYPE_ARRAY }
    ...
};
```

MetalとD3D11のバックエンドは、ユニフォームブロックのサイズだけを知っていればよく、その内部メンバー構造を知っている必要はありません。

```c
sg_shader_desc desc = {
    .vs.uniform_blocks[0].size = sizeof(params_t),
    .fs.images[0].type = SG_IMAGETYPE_ARRAY,
    ...
};
```

シェーダオブジェクトを作成するとき、GLES2/WebGLはバーテックスシェーダで使用されるバーテックス属性名を知る必要があります。

```c
sg_shader_desc desc = {
    .attrs = {
        [0] = { .name="position" },
        [1] = { .name="color1" }
    }
};
```

シェーダ作成時に提供された頂点属性名は、後に sg_create_pipeline() で頂点レイアウトと頂点シェーダ入力を一致させるために使用されます。

D3D11 では、代わりにセマンティック名とセマンティックインデックスをシェーダ記述構造体で提供する必要があります（詳細は D3D11_INPUT_ELEMENT_DESC の D3D11 のドキュメントを参照してください）。

```c
sg_shader_desc desc = {
    .attrs = {
        [0] = { .sem_name="POSITION", .sem_index=0 }
        [1] = { .sem_name="COLOR", .sem_index=1 }
    }
};
```

提供された意味情報は、後に sg_create_pipeline() で頂点レイアウトとバーテックスシェーダ入力を一致させるために使用されます。

D3D11 で、（バイトコードではなく）HLSL ソースコードをシェーダ作成に渡すとき、オプションで頂点ステージにシェーダモデルターゲットを定義することができます。

```c
sg_shader_Desc desc = {
    .vs = {
        ...
        .d3d11_target = "vs_5_0"
    },
    .fs = {
        ...
        .d3d11_target = "ps_5_0"
    }
};
```

デフォルトのターゲットは "ps_4_0 "と "fs_4_0 "です。これらのターゲット名は、ソースからシェーダをコンパイルするときのみ使用されることに注意してください。バイトコードからシェーダを作成する場合、これらは無視されます。

Metal、GL 3.3、または GLES3/WebGL2 では、頂点属性はそのスロットインデックスでバインドできるため、属性名や意味名を提供する必要はありません（これは Metal では必須、GL では任意です）。

```c
sg_pipeline_desc desc = {
    .layout = {
        .attrs = {
            [0] = { .format=SG_VERTEXFORMAT_FLOAT3 },
            [1] = { .format=SG_VERTEXFORMAT_FLOAT4 }
        }
    }
};
```


## WORKING WITH CONTEXTS

sokol-gfx は、異なるレンダリングコンテキストを切り替えて、リソースオブジェクトを コンテキストに関連付けることができます。これは、複数のウィンドウにレンダリングするGLアプリケーションを作成するのに便利です。

レンダリングコンテキストは、コンテキストがアクティブである間に作成されたすべてのリソースを追跡します。コンテキストが破棄されると、「コンテキストに属している」すべてのリソースも破棄されます。

デフォルトのコンテキストは sg_setup() で暗黙のうちに作成、有効化され、sg_shutdown() で破棄されます。したがって、複数のコンテキストを使用しない典型的なアプリケーションでは、何も変更されず、コンテキスト関数を呼び出す必要はありません。

コンテキストを扱うために、3つの関数が追加されました。

```c
sg_context sg_setup_context():
```

GL コンテキストが作成され、アクティブになった後に一度だけ呼び出される必要があります。

```c
void sg_activate_context(sg_context ctx)
```

これは、異なるGLコンテキストをアクティブにした後に呼び出す必要があります。3D-API固有の動作とは別に、sg_activate_context()の呼び出しは、内部的にsg_reset_state_cache()を呼び出すことになります。

```c
void sg_discard_context(sg_context ctx)
```

これは GL コンテキストが破壊される直前に呼ばれなければならず，コンテキストに関連するすべてのリソース（コンテキストがアクティブだった間に作成されたもの）を破壊します． sg_discard_context(sg_context ctx) が呼ばれた時点で GL コンテキストはアクティブになっていなければなりません．

また、リソース（バッファ、イメージ、シェーダ、パイプライン）は、リソースが作成されたときにアクティブであったのと同じGLコンテキストがアクティブである間のみ使用または破棄されなければならないことに注意してください（例外はGLのリソース共有で、そのようなリソースは別のコンテキストがアクティブであっても使用できますが、作成時にアクティブだった同じコンテキストで破棄しなければならない）。

より詳しい情報は、multiwindow-glfwのサンプルをご覧ください。

https://github.com/floooh/sokol-samples/blob/master/glfw/multiwindow-glfw.c


## TRACE HOOKS:

sokol_gfx.h は、オプションとして、各パブリック API 関数に対して "trace hook" コールバックをインストールすることができます。パブリックAPI関数が呼び出され、その関数にトレースフックコールバックがインストールされている場合、その関数のパラメータと結果でコールバックが呼び出されます。これは、デバッグツールやプロファイリングツール、あるいはリソースの生成と破棄を追跡するような場合に便利である。

トレースフック機能を使うには

実装をインクルードする前に SOKOL_TRACE_HOOKS を定義してください。

コールバック関数のポインタを持つ sg_trace_hooks 構造体を設定します (興味のない関数のポインタはすべてゼロ初期化したままにしておきます)。オプションで sg_trace_hooks 構造体の user_data メンバを設定します。

sg_install_trace_hooks() を呼び出してトレースフックをインストールします。この関数の戻り値は、以前に設定したトレースフックを含む、別の sg_trace_hooks 構造体です。この構造体を保持し、適切な連鎖のために、あなた自身のトレースコールバックからこれらの以前の関数のポインタを呼び出す必要があります。

トレースフックがどのように使用されるかの例として、 imgui/sokol_gfx_imgui.h ヘッダを見てください。これは sokol_gfx.h のリアルタイムデバッグ UI を Dear ImGui 上に実装しています。


## ポータブルパック頂点フォーマットに関するメモ:

UBYTE4、SHORT2 などの packed vertex フォーマットを使用する場合、すべてのバックエンドで動作させる必要があるため、2 つの点を考慮する必要があります。

D3D11 は頂点フェッチ時に *normalized* 頂点フォーマットを浮動小数点にのみ変換でき、 normalized フォーマットは最後に 'N' があり、範囲 -1.0 ～ +1.0 (signed フォーマット) または 0.0 ～ 1.0 (unsigned フォー マット) に "normalized" されます。

- SG_VERTEXFORMAT_BYTE4N
- SG_VERTEXFORMAT_UBYTE4N
- SG_VERTEXFORMAT_SHORT2N
- SG_VERTEXFORMAT_USHORT2N
- SG_VERTEXFORMAT_SHORT4N
- SG_VERTEXFORMAT_USHORT4N

D3D11 は *non-normalized* 頂点フォーマットを浮動小数点バーテックスシェーダ入力 に変換しません。

- SG_VERTEXFORMAT_BYTE4,
- SG_VERTEXFORMAT_UBYTE4
- SG_VERTEXFORMAT_SHORT2
- SG_VERTEXFORMAT_SHORT4

- WebGL/GLES2 では、整数バーテックスシェーダ入力（int または ivecn）を使用できません。
- SG_VERTEXFORMAT_UINT10_N2 は WebGL/GLES2 でサポートされていません。

したがって、すべてのプラットフォームで動作する頂点入力レイアウトには、以下の頂点フォーマットのみを使用し、必要に応じて、127.0、255.0、32767.0 または 65535.0 を乗算して、頂点シェーダで正規化した頂点入力を「拡張」してください。

- SG_VERTEXFORMAT_FLOAT,
- SG_VERTEXFORMAT_FLOAT2,
- SG_VERTEXFORMAT_FLOAT3,
- SG_VERTEXFORMAT_FLOAT4,
- SG_VERTEXFORMAT_BYTE4N,
- SG_VERTEXFORMAT_UBYTE4N,
- SG_VERTEXFORMAT_SHORT2N,
- SG_VERTEXFORMAT_USHORT2N
- SG_VERTEXFORMAT_SHORT4N,
- SG_VERTEXFORMAT_USHORT4N


## メモリ割り当てオーバーライド

このように初期化時にメモリ割り当て関数をオーバーライドすることができます。

```c
void* my_alloc(size_t size, void* user_data) {
    return malloc(size);
}

void my_free(void* ptr, void* user_data) {
    free(ptr);
}

...
    sg_setup(&(sg_desc){
        // ...
        .allocator = {
            .alloc = my_alloc,
            .free = my_free,
            .user_data = ...,
        }
    });
...
```

オーバーライドが提供されない場合、malloc と free が使用されます。

これは、sokol_gfx.h 自身が行うメモリ割り当ての呼び出しにのみ影響し、 OS ライブラリでの割り当ては影響しませんが。


## ログ関数オーバーライド

このように初期化時にログ関数をオーバーライドすることができます。

```c
void my_log(const char* message, void* user_data) {
    printf("sg says: \s\n", message);
}

...
    sg_setup(&(sg_desc){
        // ...
        .logger = {
            .log_cb = my_log,
            .user_data = ...,
        }
    });
...
```

オーバーライドが提供されない場合、ほとんどのプラットフォームでputsが使用されます。Android では、代わりに __android_log_write が使用されます。


## コミットメントリスナー

sg_commit() の内部から不特定の順序で呼び出されるコールバック関数を sokol-gfx にフックすることが可能です。これは主に、sokol_gfx.hの上に構築されるライブラリが、フレームの終了/開始について通知されるのに便利です。

コミットリスナーを追加するには、次のように呼び出します。

```c
static void my_commit_listener(void* user_data) {
    ...
}

bool success = sg_add_commit_listener((sg_commit_listener){
    .func = my_commit_listener,
    .user_data = ...,
});
```

コミットリスナーの内部配列が満杯の場合、あるいは同じコミットリスナーが既に追加されていた場合、この関数は false を返します。

この関数が true を返した場合、sg_commit() 内から my_commit_listener() がフレームごとに呼び出されます。

デフォルトでは、1024の異なるコミットリスナーを追加することができますが、この数はsg_setup()呼び出しで微調整することができます。

```c
sg_setup(&(sg_desc){
    .max_commit_listeners = 2048,
});
```

sg_commit_listener の項目は、関数ポインタと user_data フィールドの両方が等しい場合、他の項目と等しくなります。

コミットリスナーを削除するには

```c
bool success = sg_remove_commit_listener((sg_commit_listener){
    .func = my_commit_listener,
    .user_data = ...,
});
```

...ここで、.func と .user_data フィールドは以前の sg_add_commit_listener() の呼び出しと同じです。この関数はコミットリスナーの項目が見つかって削除された場合はtrueを、そうでない場合はfalseを返します。


## リソースの生成と破壊の詳細

リソースオブジェクトを作成する「バニラ」な方法は、「make関数」を使用することです。

```c
sg_buffer sg_make_buffer(const sg_buffer_desc* desc)
sg_image sg_make_image(const sg_image_desc* desc)
sg_shader sg_make_shader(const sg_shader_desc* desc)
sg_pipeline sg_make_pipeline(const sg_pipeline_desc* desc)
sg_pass sg_make_pass(const sg_pass_desc* desc)
```

この場合、3つのケースのいずれかになります。

1. 返されたハンドルは無効である。これは、このリソースタイプのリソースプールに空きスロットがもうない場合に起こります。無効なハンドルは、例えば、INVALIDリソース状態に関連付けられます。

```c
sg_buffer buf = sg_make_buffer(...)
if (sg_query_buffer_state(buf) == SG_RESOURCESTATE_INVALID) {
    // buffer pool is exhausted
}
```

2. 返されたハンドルは有効であるが、何らかの理由で基礎となるリソースの作成に失敗した。この結果、リソースオブジェクトは FAILED 状態になる。リソースの作成に失敗した理由は、リソースの種類によって異なります。詳細については、ログメッセージをご覧ください。失敗したリソースの状態は、次のようにして確認できます。

```c
sg_buffer buf = sg_make_buffer(...)
if (sg_query_buffer_state(buf) == SG_RESOURCESTATE_FAILED) {
    // creating the resource has failed
}
```

3. そして最後に、すべてがうまくいけば、返されたリソースはリソースステートVALIDになり、使用できるようになります。これは、次のようにして確認することができます。

```c
sg_buffer buf = sg_make_buffer(...)
if (sg_query_buffer_state(buf) == SG_RESOURCESTATE_VALID) {
    // creating the resource has failed
}
```

「make関数」を呼び出すと、作成されたリソースは次のような状態を経ます。
の状態を経る。

- INITIAL: 新しいリソースに関連付けられたリソーススロットは現在フリーです (技術的には、まだリソースは存在せず、空のプールスロットがあるだけです)。
- ALLOC: 新しいリソースのハンドルが割り当てられました。これは単にプールスロットが予約されたことを意味します。
- VALID or FAILED: VALIDの場合、3D APIバックエンドリソースオブジェクトは正常に作成されました、それ以外の場合、リソースはFAILEDの状態になります。

時には、最初にハンドルを取得し、後で基礎となるリソースを初期化することが理にかなっていることがあります。例えば、低速のデータソースから非同期にデータをロードする場合、ロードプロセスの早い段階でどのようなバッファやテクスチャが必要かが分かるかもしれませんが、実際にバッファやテクスチャの内容をロードするのは後のタイミングになります。

このような状況のために、sokol-gfxリソース・オブジェクトは2つのステップで作成することができます。alloc関数」の1つを使って、前もってハンドルを確保することができます。

```c
sg_buffer sg_alloc_buffer(void)
sg_image sg_alloc_image(void)
sg_shader sg_alloc_shader(void)
sg_pipeline sg_alloc_pipeline(void)
sg_pass sg_alloc_pass(void)
```

これは、ALLOC状態の基礎となるリソースオブジェクトを持つハンドルを返します。

```C
sg_image img = sg_alloc_image();
if (sg_query_image_state(img) == SG_RESOURCESTATE_ALLOC) {
    // allocating an image handle has succeeded, otherwise
    // the image pool is full
}
```

このような「不完全な」ハンドルは、ほとんどのsokol-gfxレンダリング関数で害なく使用することができ、sokol-gfxはVALID状態でないリソースを含むレンダリング操作を単にスキップします。

後で（例えば、テクスチャのロードが非同期で完了したら）、リソースの作成は「init関数」の一つを呼び出すことで完了します。これらの関数は、既存のリソースハンドルと「desc構造」を取ります。

```c
void sg_init_buffer(sg_buffer buf, const sg_buffer_desc* desc)
void sg_init_image(sg_image img, const sg_image_desc* desc)
void sg_init_shader(sg_shader shd, const sg_shader_desc* desc)
void sg_init_pipeline(sg_pipeline pip, const sg_pipeline_desc* desc)
void sg_init_pass(sg_pass pass, const sg_pass_desc* desc)
```

init関数はALLOC状態のリソースを想定しており、関数が戻った後、リソースはVALIDまたはFAILED状態のいずれかになる。alloc関数とそれに続くinit関数を呼び出すことは、make関数を単独で呼び出すことと完全に等価である。

破壊は、2段階のプロセスとして起こることもある。uninit関数」は、VALIDまたはFAILED状態からALLOC状態にリソースオブジェクトを戻す。

```c
void sg_uninit_buffer(sg_buffer buf)
void sg_uninit_image(sg_image img)
void sg_uninit_shader(sg_shader shd)
void sg_uninit_pipeline(sg_pipeline pip)
void sg_uninit_pass(sg_pass pass)
```

VALIDまたはFAILEDの状態でないリソースで「uninit関数」を呼び出しても無駄である。

最終的にプールスロットを再利用のために解放するには、「dealloc関数」を呼び出します。

```c
void sg_dealloc_buffer(sg_buffer buf)
void sg_dealloc_image(sg_image img)
void sg_dealloc_shader(sg_shader shd)
void sg_dealloc_pipeline(sg_pipeline pip)
void sg_dealloc_pass(sg_pass pass)
```

ALLOC状態でないリソースに対して「dealloc関数」を呼び出しても無駄ですが、警告のログメッセージは生成されます。

「uninit関数」と「dealloc関数」を連続して呼び出すことは、関連する「destroy関数」を呼び出すことと等価である。

```c
void sg_destroy_buffer(sg_buffer buf)
void sg_destroy_image(sg_image img)
void sg_destroy_shader(sg_shader shd)
void sg_destroy_pipeline(sg_pipeline pip)
void sg_destroy_pass(sg_pass pass)
```

destroy 関数」はどのような状態のリソースに対しても呼び出すことができ、一般に正しい動作をします（例えば、リソースが ALLOC 状態の場合、destroy 関数は「dealloc 関数」と同等で、「uninit 部分」をスキップします）。

そして最後に、ALLOC状態のリソースを手動でFAILED状態にするために、「fail関数」を呼び出すことができる。

```c
sg_fail_buffer(sg_buffer buf)
sg_fail_image(sg_image img)
sg_fail_shader(sg_shader shd)
sg_fail_pipeline(sg_pipeline pip)
sg_fail_pass(sg_pass pass)
```

これは、非同期リソース作成中にsokol-gfxの外部で何か問題が発生した場合（例えば、ファイルのロード操作に失敗したなど）に推奨されます。この場合、'init関数'の代わりに'fail関数'を呼び出す必要があります。

ALLOC状態でないリソースに対して「fail関数」を呼び出しても無駄ですが、警告のログメッセージは生成されます。

> 注: 2段階のリソース作成は通常、バッファとイメージに対してのみ意味を持ちますが、シェーダ、パイプライン、パスに対しては意味を持ちません。特に、VALID状態でないシェーダーでパイプラインオブジェクトを作成しようとすると、検証レイヤーのエラーが発生します。また、検証レイヤーが無効になっている場合は、パイプラインオブジェクトがFAILED状態になります。イメージ無効のイメージオブジェクトでパスオブジェクトを作成しようとすると、同じことが起こります。

## LICENSE

zlib/libpng license

Copyright (c) 2018 Andre Weissflog

This software is provided 'as-is', without any express or implied warranty.
In no event will the authors be held liable for any damages arising from the
use of this software.

Permission is granted to anyone to use this software for any purpose,
including commercial applications, and to alter it and redistribute it
freely, subject to the following restrictions:

    1. The origin of this software must not be misrepresented; you must not
    claim that you wrote the original software. If you use this software in a
    product, an acknowledgment in the product documentation would be
    appreciated but is not required.

    2. Altered source versions must be plainly marked as such, and must not
    be misrepresented as being the original software.

    3. This notice may not be removed or altered from any source
    distribution.