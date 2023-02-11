# 使用方法

## ディレクトリ構造

```
espnet/              # Python modules
utils/               # Utility scripts of ESPnet
test/                # Unit test
test_utils/          # Unit test for executable scripts
egs/                 # The complete recipe for each corpora
    an4/             # AN4 is tiny corpus and can be obtained freely, so it might be suitable for tutorial
      asr1/          # ASR recipe
          - run.sh   # Executable script
          - cmd.sh   # To select the backend for job scheduler
          - path.sh  # Setup script for environment variables
          - conf/    # Containing Configuration files
          - steps/   # The steps scripts from Kaldi
          - utils/   # The utils scripts from Kaldi
      tts1/          # TTS recipe
    ...
```

## サンプルスクリプトの実行

egsディレクトリの下にあるexampleディレクトリに移動します。WSJ、CHiME-4、TEDなど主要なASRベンチマークをいくつか用意します。以下のディレクトリは、CMU国勢調査データベース（AN4）レシピでASR実験を行う例です。

```sh
$ cd egs/an4/asr1
```

ディレクトリに移動したら、chainerバックエンドで以下のメインスクリプトを実行します。

```sh
$ ./run.sh --backend chainer
```

を実行するか、pytorchバックエンドで以下のメインスクリプトを実行します。

```sh
$ ./run.sh --backend pytorch
```

このメインスクリプトで、以下のようなASR実験の全手順を実行することができます。

- データのダウンロード
- データ準備 (Kaldi スタイル)
- 特徴抽出(Kaldi形式)
- 辞書やJSON形式のデータ作成
- chainerやpytorchに基づく学習。
- 認識とスコアリング

## クラスタでのセットアップ

ジョブスケジューリングシステムを使うを参照

## ロギング

トレーニングの進捗状況（トレーニングデータおよび検証データの損失と精度）は、以下のコマンドでモニターできます。

```sh
$ tail -f exp/${expdir}/train.log
```

./run.sh --verbose 0 (--verbose 0 はほとんどのレシピでデフォルト) を使用すると、次のような情報が得られます。

```sh
epoch       iteration   main/loss   main/loss_ctc  main/loss_att  validation/main/loss  validation/main/loss_ctc  validation/main/loss_att  main/acc    validation/main/acc  elapsed_time  eps
:
:
6           89700       63.7861     83.8041        43.768                                                                                   0.731425                         136184        1e-08
6           89800       71.5186     93.9897        49.0475                                                                                  0.72843                          136320        1e-08
6           89900       72.1616     94.3773        49.9459                                                                                  0.730052                         136473        1e-08
7           90000       64.2985     84.4583        44.1386        72.506                94.9823                   50.0296                   0.740617    0.72476              137936        1e-08
7           90100       81.6931     106.74         56.6462                                                                                  0.733486                         138049        1e-08
7           90200       74.6084     97.5268        51.6901                                                                                  0.731593                         138175        1e-08
     total [#################.................................] 35.54%
this epoch [#####.............................................] 10.84%
     91300 iter, 7 epoch / 20 epochs
   0.71428 iters/sec. Estimated time to finish: 2 days, 16:23:34.613215.
```

なお、an4レシピはデバッグ用に使われることが多いので、デフォルトで--verbose 1が使用されています。

また、Tensorboardのイベントはtensorboard/${expname}フォルダに自動的に記録される。そのため、Tensorboardをインストールすると、複数の実験を簡単に比較するために

```sh
$ tensorboard --logdir tensorboard
```

を実行し、指定されたアドレス (デフォルト : localhost:6006) に接続します。2018-12-18_19h49_48 なお、インストール作業を簡略化するため、Tensorboardのインストールは含めないことにします。Tensorboardを使用する場合は、手動でインストール(pip install tensorflow; pip install tensorboard)してください。

## run.shのオプションを変更する

シェルスクリプトのコマンドライン引数を渡すためにutils/parse_options.shに依存し、run.shで使用されています。

例: スクリプトに ngpu オプションがある場合

```sh
#!/usr/bin/env bash
# run.sh
ngpu=1
. utils/parse_options.sh
echo ${ngpu}
```

そして、以下のように値を変更することができます。

```
$ ./run.sh --ngpu 2
echo 2
```

## GPUの使用

トレーニング実験にGPUを使用する場合は、run.shの--ngpuオプションを適切に設定してください、例．

```sh
  # use single gpu
  $ ./run.sh --ngpu 1

  # use multi-gpu
  $ ./run.sh --ngpu 3

  # if you want to specify gpus, set CUDA_VISIBLE_DEVICES as follows
  # (Note that if you use slurm, this specification is not needed)
  $ CUDA_VISIBLE_DEVICES=0,1,2 ./run.sh --ngpu 3

  # use cpu
  $ ./run.sh --ngpu 0
```

デフォルトではシングルGPUを使用します(--ngpu 1)。

ASRのデコード。ESPnetは、高速な認識のためのGPUベースのデコードもサポートしています。

run.shの以下の行を手動で削除してください。

```sh
#### use CPU for decoding
ngpu=0
```

asr_recog.py の --batchsize オプションに 1 以上の値を設定し、GPU デコードを可能にする。
そしてスクリプトを実行します(例: run.sh --stage 5 --ngpu 1)

GPUデコードを使用することにより、大幅な速度向上が得られます。

## マルチGPUのヒント

- なお、複数のGPUを使用する場合は、セットアップの前にncclのインストールが必要です。
- 現在、espnet1では単一ノード内での複数GPUによる学習のみサポートしています。複数ノードにまたがる分散セットアップはespnet2のみ対応しています。
- 複数GPUによる推論には対応していません。その代わり、認識タスクを複数のジョブに分割し、この分割したジョブを複数のGPUに分散してください。
- 複数GPUで十分な速度向上が得られなかった場合、まずnvidia-smiでGPU使用率を確認します。GPU-Util の割合が低い場合、ボトルネックはディスクアクセスにあると思われます。run.sh の --n-iter-processes 2 でデータプリフェッチを適用することで、この問題を軽減することができます。なお、このデータプリフェッチはCPUメモリを大量に消費しますので、プロセス数を増やす場合は注意してください。
- ESPnet2におけるマルチGPU学習時のバッチサイズの挙動は、ESPnet1とは異なります。ESPnet2では、GPUの数に関係なく、合計バッチサイズは変わりません。そのため、GPUの数を増やした場合は、手動でバッチサイズを増やす必要があります。詳しくはこちらのドキュメントをご覧ください。

## 途中からスタート、または指定したステージでストップ

run.shはデータの前処理、トランザクションなど複数の段階があるので、何らかの理由で失敗した場合は指定された段階から開始することになるでしょう。

以下のように、指定したステージから開始し、指定したステージで処理を停止することができます。

```sh
# 第3ステージから開始し、第5ステージで停止
$ ./run.sh --stage 3 --stop-stage 5
```

## CTC、アテンション、ハイブリッドCTC/アテンション

ESPnetでは、モデルの学習/復号モードをCTC、アテンション、ハイブリッドCTC/アテンションから簡単に切り替えることができます。

学習設定にmtlalphaを指定することで、各モードを学習させることができる。

```sh
# hybrid CTC/attention (default)
mtlalpha: 0.3

# CTC
mtlalpha: 1.0

# attention
mtlalpha: 0.0
```

各モードのデコードは、以下のデコード構成で行うことができます。

```sh
# hybrid CTC/attention (default)
ctc-weight: 0.3
beam-size: 10

# CTC
ctc-weight: 1.0
## for best path decoding
api: v1 # default setting (can be omitted)
## for prefix search decoding w/ beam search
api: v2
beam-size: 10

# attention
ctc-weight: 0.0
beam-size: 10
maxlenratio: 0.8
minlenratio: 0.3
```

- CTCモードでは検証精度を計算せず、損失値で最適なモデルを選択する（すなわち、$ ./run.sh --recog_model model.loss.best）。
- CTC復号はデフォルトでベストパスデコーディングを採用し、単純に時間ステップごとに最確ラベルを出力する。ビームサーチを用いたプレフィックスサーチデコーディングはビームサーチAPI v2でもサポートされています。
- 純粋注目モードでは、仮説長の最大値と最小値（-maxlenratio と --minlenratio） を適切に設定する必要がある。一般に、挿入エラーが多い場合はmaxlenratioの値を小さくし、削除エラーが多い場合はminlenratioの値を大きくします。なお、最適な値は、入力フレームと出力ラベルの長さの比率に依存し、言語ごと、BPEユニットごとに変更される。
- 負のmaxlenratioを使用すると、入力フレーム数とは無関係に一定の最大仮説長を設定することができる。maxlenratioを-1に設定すると、デコードは常に最初の出力の後に停止し、これを利用して発話分類タスクをエミュレートすることができる。これは、一部の音声言語理解や話者識別タスクに適している。
- 学習・認識時のハイブリッドCTC/attentionの有効性については、[2]や[3]を参照してください。例えば、ハイブリッドCTC/注意は上記の最大・最小仮説ヒューリスティックに敏感ではない。

## トランスデューサー

重要：Transducerの損失に関する問題が発生した場合は、私たちのwarp-transducerのフォークで問題を開いてください。

ESPnetはTransducer lossで学習させたモデル（Transducerモデル）をサポートしています。このようなモデルを学習させるためには、学習設定に以下を設定する必要があります。

```sh
criterion: loss
model-module: "espnet.nets.pytorch_backend.e2e_asr_transducer:E2E"
```

### Architecture

現在、ESPnetではいくつかのトランスデューサーのアーキテクチャを利用することができます。

- RNN-Transducer (default, e.g.: etype: blstm with dtype: lstm)
- Custom-Transducer (e.g.: etype: custom and dtype: custom)
- Mixed Custom/RNN-Transducer (e.g: etype: custom with dtype: lstm)

アーキテクチャの指定はエンコーダ部とデコーダ部に分かれており、それぞれ training config の etype と dtype でユーザが定義します。どちらかにcustomが指定された場合、対応する部分にはカスタマイズ可能なアーキテクチャが使用される。そうでない場合は、RNNベースのアーキテクチャが選択される。

ここで、カスタムアーキテクチャとは、ESPnetにおけるトランスデューサモデルのユニークな機能です。これは、アーキテクチャの定義に柔軟性を持たせ、同じモデル部分（エンコーダまたはデコーダ）内に異なるレイヤタイプやパラメータを混在させたSOTAトランスデューサモデルの再現を容易にするために用意されたものです。そのため、RNNアーキテクチャとはアーキテクチャの定義が異なります。

1. カスタムアーキテクチャの各ブロック（またはレイヤー）は、enc-block-arch または/および dec-block-arch パラメータで個別に指定する必要があります。

```
 # e.g: Conv-Transformer encoder
 etype: custom
 enc-block-arch:
         - type: conv1d
           idim: 80
           odim: 32
           kernel_size: [3, 7]
           stride: [1, 2]
         - type: conv1d
           idim: 32
           odim: 32
           kernel_size: 3
           stride: 2
         - type: conv1d
           idim: 32
           odim: 384
           kernel_size: 3
           stride: 1
         - type: transformer
           d_hidden: 384
           d_ff: 1536
           heads: 4
```

2. カスタムエンコーダ（tdnn、conformer、transformer）とカスタムデコーダ（causal-conv1d、transformer）には、それぞれ異なるブロックタイプが認められています。それぞれ、必須とオプションのパラメータがあります。

```
 # 1D convolution (TDNN) block
 - type: conv1d
   idim: [Input dimension. (int)]
   odim: [Output dimension. (int)]
   kernel_size: [Size of the context window. (int or tuple)]
   stride (optional): [Stride of the sliding blocks. (int or tuple, default = 1)]
   dilation (optional): [Parameter to control the stride of elements within the neighborhood. (int or tuple, default = 1)]
   groups (optional): [Number of blocked connections from input channels to output channels. (int, default = 1)
   bias (optional): [Whether to add a learnable bias to the output. (bool, default = True)]
   use-relu (optional): [Whether to use a ReLU activation after convolution. (bool, default = True)]
   use-batchnorm: [Whether to use batch normalization after convolution. (bool, default = False)]
   dropout-rate (optional): [Dropout-rate for TDNN block. (float, default = 0.0)]

 # Transformer
 - type: transformer
   d_hidden: [Input/output dimension of Transformer block. (int)]
   d_ff: [Hidden dimension of the Feed-forward module. (int)]
   heads: [Number of heads in multi-head attention. (int)]
   dropout-rate (optional): [Dropout-rate for Transformer block. (float, default = 0.0)]
   pos-dropout-rate (optional): [Dropout-rate for positional encoding module. (float, default = 0.0)]
   att-dropout-rate (optional): [Dropout-rate for attention module. (float, default = 0.0)]

 # Conformer
 - type: conformer
   d_hidden: [Input/output dimension of Conformer block (int)]
   d_ff: [Hidden dimension of the Feed-forward module. (int)]
   heads: [Number of heads in multi-head attention. (int)]
   macaron_style: [Whether to use macaron style. (bool)]
   use_conv_mod: [Whether to use convolutional module. (bool)]
   conv_mod_kernel (required if use_conv_mod = True): [Number of kernel in convolutional module. (int)]
   dropout-rate (optional): [Dropout-rate for Transformer block. (float, default = 0.0)]
   pos-dropout-rate (optional): [Dropout-rate for positional encoding module. (float, default = 0.0)]
   att-dropout-rate (optional): [Dropout-rate for attention module. (float, default = 0.0)]

 # Causal Conv1d
 - type: causal-conv1d
   idim: [Input dimension. (int)]
   odim: [Output dimension. (int)]
   kernel_size: [Size of the context window. (int)]
   stride (optional): [Stride of the sliding blocks. (int, default = 1)]
   dilation (optional): [Parameter to control the stride of elements within the neighborhood. (int, default = 1)]
   groups (optional): [Number of blocked connections from input channels to output channels. (int, default = 1)
   bias (optional): [Whether to add a learnable bias to the output. (bool, default = True)]
   use-relu (optional): [Whether to use a ReLU activation after convolution. (bool, default = True)]
   use-batchnorm: [Whether to use batch normalization after convolution. (bool, default = False)]
   dropout-rate (optional): [Dropout-rate for TDNN block. (float, default = 0.0)]
```

3. 定義されたアーキテクチャは、enc-block-repeat または/および dec-block-repeat パラメータでアーキテクチャのブロック/レイヤの総数を指定することにより、繰り返し使用することができます。

```
 # e.g.: 2x (Causal-Conv1d + Transformer) decoder
 dtype: transformer
 dec-block-arch:
         - type: causal-conv1d
           idim: 256
           odim: 256
           kernel_size: 5
         - type: transformer
           d_hidden: 256
           d_ff: 256
           heads: 4
           dropout-rate: 0.1
           att-dropout-rate: 0.4
 dec-block-repeat: 2
```

### マルチタスク学習

また、以下のような様々な補助損失を用いたマルチタスク学習にも対応している。CTC, crossentropy w/ label-smoothing (LM loss), auxiliary Transducer, and symmetric KL divergence.これら4つの損失は、メインのTransducer損失と同時に学習することで、以下のように定義される総損失を共同で最適化することが可能である。

拡張Transducerの学習

ここで、損失はそれぞれ順番に主トランスデューサーの損失、CTCの損失、補助トランスデューサーの損失、対称KLダイバージェンス損失、LM損失です。ラムダ値は、全体の損失に対するそれぞれの寄与を定義します。さらに、タスクに応じて各損失を独立に選択または省略することができます。

各損失は学習設定において、以下のようなオプションと共に定義することができる。

```
    # Transducer loss (L1)
    transducer-loss-weight: [Weight of the main Transducer loss (float)]

    # CTC loss (L2)
    use-ctc-loss: True
    ctc-loss-weight (optional): [Weight of the CTC loss. (float, default = 0.5)]
    ctc-loss-dropout-rate (optional): [Dropout rate for encoder output representation. (float, default = 0.0)]

    # Auxiliary Transducer loss (L3)
    use-aux-transducer-loss: True
    aux-transducer-loss-weight (optional): [Weight of the auxiliary Transducer loss. (float, default = 0.4)]
    aux-transducer-loss-enc-output-layers (required if use-aux-transducer-loss = True): [List of intermediate encoder layer IDs to compute auxiliary Transducer loss(es). (list)]
    aux-transducer-loss-mlp-dim (optional): [Hidden dimension for the MLP network. (int, default = 320)]
    aux-transducer-loss-mlp-dropout-rate: [Dropout rate for the MLP network. (float, default = 0.0)]

    # Symmetric KL divergence loss (L4)
    # Note: It can be only used in addition to the auxiliary Transducer loss.
    use-symm-kl-div-loss: True
    symm-kl-div-loss-weight (optional): [Weight of the symmetric KL divergence loss. (float, default = 0.2)]

    # LM loss (L5)
    use-lm-loss: True
    lm-loss-weight (optional): [Weight of the LM loss. (float, default = 0.2)]
    lm-loss-smoothing-rate: [Smoothing rate for LM loss. If > 0, label smoothing is enabled. (float, default = 0.0)]
```

### Inference

また、デコードコンフィグでビームサイズやサーチタイプのパラメータを設定することで、Transducerの様々なデコードアルゴリズムが利用可能です。

- タイムステップごとに1つのエミッションに制限された貪欲な探索 (beam-size: 1).
- 前置探索を行わないビーム探索アルゴリズム (beam-size: >1 and search-type: default).
- Time Synchronous Decoding [Saon et al., 2020] (beam-size: >1 and search-type: tsd)。
- Alignment-Length Synchronous Decoding [Saon et al., 2020] (beam-size: >1 and search-type: alsd)(ビームサイズ: >1, サーチタイプ: alsd).
- N-step Constrained beam search [Kim et al., 2020] を修正したもの (beam-size: >1 and search-type: default)。
- Kim et al., 2021]とNSCをベースにしたAdaptive Expansion Searchを修正 (beam-size: >1 and search-type: maes)。

各アルゴリズムは、ビームサイズ（beam-size）と最終的な仮説の正規化（score-norm-transducer）を制御する2つのパラメータを共有している。各アルゴリズムの具体的なパラメータは以下の通りである。

```
    # Default beam search
    search-type: default

    # Time-synchronous decoding
    search-type: tsd
    max-sym-exp: [Number of maximum symbol expansions at each time step (int)]

    # Alignement-length decoding
    search-type: alsd
    u-max: [Maximum output sequence length (int)]

    # N-step Constrained beam search
    search-type: nsc
    nstep: [Number of maximum expansion steps at each time step (int)]
           # nstep = max-sym-exp + 1 (blank)
    prefix-alpha: [Maximum prefix length in prefix search (int)]

    # modified Adaptive Expansion Search
    search-type: maes
    nstep: [Number of maximum expansion steps at each time step (int, > 1)]
    prefix-alpha: [Maximum prefix length in prefix search (int)]
    expansion-gamma: [Number of additional candidates in expanded hypotheses selection (int)]
    expansion-beta: [Allowed logp difference for prune-by-value method (float, > 0)]
```

デフォルトのアルゴリズムを除き、記載されているパラメータは性能とデコード速度を制御するために使用されます。各パラメータの最適値はタスクに依存します。一般的に高い値を設定すると、パフォーマンスを重視するためにデコード時間が長くなり、低い値を設定するとパフォーマンスを犠牲にしてデコード時間が長くなります。

### 補足説明

- CTCを用いた学習と同様に、Transducerは検証精度を出力しない。そのため、最適なモデルはその損失値で選択される（つまり、-recog_model model.loss.best）。
- MTLとTransducerの学習・デコードオプションにはいくつかの違いがあります。概要については espnet/espnet/nets/pytorch_backend/e2e_asr_transducer.py を、利用可能なすべての引数については espnet/espnet/nets/pytorch_backend/transducer/arguments を参照する必要があります。
- FastEmit正則化 [Yu et al., 2021]は、--fastemit-lambda学習パラメータ（デフォルト=0.0）で利用可能です。
- LMを用いたRNNデコーダの事前初期化がサポートされている。通常のデコーダキーが期待されることに注意。LMのstate dictキー(predictor.*)はAMのstate dictキー(dec.*)に従ってリネームされます。
- Transformer LMを使ったTransformer-Decoderの事前初期化はまだサポートされていません。

##トレーニングコンフィギュレーションを変更する¶。

学習とデコードのデフォルト設定は、それぞれ conf/train.yaml と conf/decode.yaml に記述されています。これは特定の引数で上書きすることができます：例．

```sh
# e.g.
asr_train.py --config conf/train.yaml --batch-size 24
# e.g.--config2 and --config3 are also provided and the latter option can overwrite the former.
asr_train.py --config conf/train.yaml --config2 conf/new.yaml
```

この方法では、run.shを編集する必要があり、不便な場合があります。引数を直接与えるのではなく、yamlファイルを修正してrun.shに与えることをお勧めします。

```sh
# e.g.
./run.sh --train-config conf/train_modified.yaml
# e.g.
./run.sh --train-config conf/train_modified.yaml --decode-config conf/decode_modified.yaml
```

また、入力されたyamlファイルからyamlファイルを生成するユーティリティも用意されています。

```sh
# e.g. You can give any parameters as '-a key=value' and '-a' is repeatable.
#      This generates new file at 'conf/train_batch-size24_epochs10.yaml'
./run.sh --train-config $(change_yaml.py conf/train.yaml -a batch-size=24 -a epochs=10)
# e.g. '-o' option specifies the output file name instead of auto named file.
./run.sh --train-config $(change_yaml.py conf/train.yaml -o conf/train2.yaml -a batch-size=24)
```

## ミニバッチの設定方法

espnet v0.4.0以降では、-batch-countでミニバッチサイズを指定する3つのオプションがあります（実装はespnet.utils.batchfyを参照してください）。

1.

```
--batch-count seq --batch-seqs 32 --batch-seq-maxlen-in 800 --batch-seq-maxlen-out 150.
```

このオプションは、v0.4.0以前の古い設定と互換性があります。これは、ミニバッチサイズを配列数でカウントし、入力配列の最大長が800、出力配列の最大長が150を超えるとサイズを小さくするものです。

2.

```
--batch-count bin --batch-bins 100000.
```

これは、パディングされた入出力ミニバッチテンソルにおいて、100以下のビンの数が最大となるミニバッチを作成する（すなわち、max(ilen) * idim + max(olen) * odim)。基本的に、このオプションは --batch-count seq よりも学習の繰り返しを速くする。もし、-batch-seqs xの設定が最適であれば、-batch-bin $((x * (mean(ilen) * idim + mean(olen) * odim)) を試してみてください。）

3.

```
--batch-count frame --batch-frames-in 800 --batch-frames-out 100 --batch-frames-inout 900.
```

これは、入力、出力、入力+出力の最大フレーム数がそれぞれ800、100、900以下のミニバッチを作成します。batch-frames-xxx のいずれかを部分的に設定することができる。このオプションは、-batch-bin と同様、-batch-count seq よりも学習の繰り返しを速くすることができます。すでに、-batch-seqs xの設定が最適な場合は、-batch-frames-in $((x * (mean(ilen) * idim)) --batch-frames-out $((x * mean(olen) * odim)) を試してみてください。

## ファインチューニングの使用方法

ESPnetは現在、転移学習と凍結という2つの微調整をサポートしています。ユーザーがメインの学習設定（例：conf/train*.yaml）で以下のオプションを定義することが期待されます。必要であれば、オプションに -- という接頭辞をつけることで、直接 (asr|tts|vc)_train.py に渡すことができます。

### トランスファーラーニング

- 転送学習オプションは、エンコーダ初期化（enc-init）とデコーダ初期化（dec-init）に分かれる。ただし、両オプションとも同じモデルを指定することができる。
- 各オプションは、スナップショットのパス(例: [espnet_model_path]/results/snapshot.ep.1) またはモデルのパス(例: [espnet_model_path]/results/model.loss.best) を引数として取ることができます。
- さらに、エンコーダとデコーダのモジュールのリスト（カンマで区切る）を指定して、enc-init-mods と dec-init-mods オプションで転送するモジュールを制御することもできます。
- 指定された各モジュールは、転送先モデルのモジュール名の先頭と部分的に一致することだけを期待します。したがって、共通の接頭辞を持つモジュールであれば、同じキーで複数のモジュールを指定することができる。

Mandatory: enc-init: /home/usr/espnet/egs/vivos/asr1/exp/train_nodev_pytorch_train/results/model.loss.best -> specify a pre-trained model on VIVOS for transfer learning.
> Example 1: enc-init-mods: 'enc.' -> transfer all encoder parameters.
> Example 2: enc-init-mods: 'enc.embed.,enc.0.' -> transfer encoder embedding layer and first layer parameters.

### Freezing

- freeze オプションは freeze-mods, (espnet2 の freeze_param) で有効にすることができます。
- このオプションはモデルモジュールのリスト(カンマで区切る)を引数として取る。前述したように、指定されたモジュールが完全に一致することは期待しない。

Example 1: freeze-mods: 'enc.embed.' -> freeze encoder embedding layer parameters.
Example 2: freeze-mods: 'dec.embed,dec.0.' -> freeze decoder embedding layer and first layer parameters. Example 3 (espnet2): freeze_param: 'encoder.embed' -> freeze encoder embedding layer parameters.

## 重要なお知らせ

学習済みのソースモデルがある場合、転送学習に指定するモジュールは、ターゲットモデルのモジュールと同じパラメータ（すなわち、層とユニット）を持つことが期待される。
また、RNN-Transducerデコーダのために事前に学習されたRNN LMによる初期化もサポートしています。
RNNモデルは、Transformer, Conformer, Customモデルと比較して、エンコーダ部とデコーダ部で異なるキー名を使用します。
RNNモデルでは、エンコーダ部にはenc.を、デコーダ部にはdec.を使用します。
Transformer/Conformer/Customモデルでは、エンコーダ部にenc.を、デコーダ部にdec.を使用しています。

## 既知の問題点

### Error due to ACS (Multiple GPUs)

複数のGPUを使用している場合、トレーニングがフリーズしたり、期待よりも低いパフォーマンスが観察される場合は、PCI Express Access Control Services (ACS) が無効になっていることを確認してください。より詳細な説明は、以下を参照してください： リンク1 リンク2 リンク3.PCI Express ACSを無効にするには、ここに書かれている手順に従います。ROOTユーザーアクセス権を持っているか、管理者にリクエストする必要があります。

### Error due to matplotlib

以下のようなエラー（またはその他のnumpy関連のエラー）が発生した場合。

```
RuntimeError: module compiled against API version 0xc but this version of numpy is 0xb
Exception in main training loop: numpy.core.multiarray failed to import
Traceback (most recent call last):
;
:
from . import _path, rcParams
ImportError: numpy.core.multiarray failed to import
```

その後、以下のコマンドでmatplotlibを再インストールしてください。

```sh
$ cd egs/an4/asr1
$ . ./path.sh
$ pip install pip --upgrade; pip uninstall matplotlib; pip --no-cache-dir install matplotlib
```

## ChainerとPytorchのバックエンド

|                    |             Chainer             |              Pytorch               |
| ------------------ | ------------------------------- | ---------------------------------- |
| Performance        | ◎                               | ◎                                  |
| Speed              | ○                               | ◎                                  |
| Multi-GPU          | supported                       | supported                          |
| VGG-like encoder   | supported                       | supported                          |
| Transformer        | supported                       | supported                          |
| RNNLM integration  | supported                       | supported                          |
| #Attention types   | 3 (no attention, dot, location) | 12 including variants of multihead |
| TTS recipe support | no support                      | supported                          |