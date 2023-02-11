# インストール

## 必要条件

- Python 3.6.1+
- gcc 4.9+ for PyTorch1.0.0+

オプションとしてGPU環境では以下のライブラリが必要です:

Cuda 8.0、9.0、9.1、10.0 各DNNライブラリに依存します。
Cudnn 6+, 7+
NCCL 2.0+ (マルチGPU使用時)
(インストールstep2でanaconda環境を使用する場合、以下のパッケージはAnacondaを使用してインストールされるため、スキップすることができます。)

- cmake3 for some extensions

```sh
# For Ubuntu
$ sudo apt-get install cmake
```

- sox

```sh
# For Ubuntu
$ sudo apt-get install sox
# For CentOS
$ sudo yum install sox
```

- sndfile

```sh
# For Ubuntu
$ sudo apt-get install libsndfile1-dev
# For CentOS
$ sudo yum install libsndfile
```

- ffmpeg (インストール時には必要ありませんが、いくつかのレシピで使用されます。)

```sh
# For Ubuntu
$ sudo apt-get install ffmpeg
# For CentOS
$ sudo yum install ffmpeg
```

flac (インストール時には必要ありませんが、いくつかのレシピで使用されます。)

```sh
# For Ubuntu
$ sudo apt-get install flac
# For CentOS
$ sudo yum install flac
```

## 対応するLinuxディストリビューションとその他の要件

CIでは、以下のLinuxディストリビューションをサポートしています。自前でLinuxを構築したい場合は、CIの設定もご確認ください。 適切な環境を準備するために

- ubuntu18
- centos7
- debian9

## Step 1) [オプション] Kaldiのインストール

ESPnet1 (under igs/) を使用する場合: Kaldi をコンパイルする必要があります。
ESPnet2 (under igs2/)を使用する場合: Kaldiのインストールを省略することができます。

関連リンク:

- Kaldi Github
- Kaldi Documentation
  - Downloading and installing Kaldi
  - The build process (how Kaldi is compiled)
- Kaldi INSTALL

Kaldiの必要条件:

- OS: Ubuntu, CentOS, MacOSX, Windows, Cygwin, etc.
- GCC >= 4.7

1. Git clone Kaldi

```sh
$ cd <any-place>
$ git clone https://github.com/kaldi-asr/kaldi
```

2. ツールのインストール

```sh
$ cd <kaldi-root>/tools
$ make -j <NUM-CPU>
```

BLASライブラリをATLAS, OpenBLAS, MKLから選択する。

- OpenBLAS

```sh
$ cd <kaldi-root>/tools
$ ./extras/install_openblas.sh
```

- MKL (sudo権限が必要です)

```sh
$ cd <kaldi-root>/tools
$ sudo ./extras/install_mkl.sh
```

- ATLAS (sudo権限が必要です)

```sh
# Ubuntu
$ sudo apt-get install libatlas-base-dev
```

3. Kaldiのコンパイルとインストール

```sh
$ cd <kaldi-root>/src
# [By default MKL is used] ESPnet uses only feature extractor, so you can disable CUDA
$ ./configure --use-cuda=no
# [With OpenBLAS]
# $ ./configure --openblas-root=../tools/OpenBLAS/install --use-cuda=no
# If you'll use CUDA
# ./configure --cudatk-dir=/usr/local/cuda-10.0
$ make -j clean depend; make -j <NUM-CPU>
```

また、Kaldiのプリビルドバイナリもあります。

## Step 2) ESPnetのインストール

1. Git clone ESPnet

```sh
$ cd <any-place>
$ git clone https://github.com/espnet/espnet
```

2. （任意）コンパイルしたKaldiをespnet/toolsの下に置く。

Step1でKaldiをコンパイルした場合は、toolsの下に置いてください。

```sh
$ cd <espnet-root>/tools
$ ln -s <kaldi-root> .
```

make時にespnet/tools/kaldiがない場合、コンパイルせずに自動的にKaldiのリポジトリが置かれます。

3. Pythonの環境構築

espnet レシピで使用される Python インタープリタを指定するために `<espnet-root>/tools/activate_python.sh` を作成する必要があります (ESPnet がどのように Python を指定するかについては、path.sh の例を参照してください)。(ESPnet がどのように Python を指定するかを理解するには、例えば path.sh を参照してください)。

また、tools/activate_python.shを生成するためのスクリプトもいくつか用意されています。

- オプションA) Anacondaの環境構築

```sh
$ cd <espnet-root>/tools
$ ./setup_anaconda.sh [output-dir-name|default=venv] [conda-env-name|default=root] [python-version|default=none]
# e.g.
$ ./setup_anaconda.sh anaconda espnet 3.8
```

このスクリプトは、出力ディレクトリが存在しない場合、新しい miniconda を作成しようとします。もし既にAnacondaを持っていて、それを使うのであれば。

```sh
$ cd <espnet-root>/tools
$ CONDA_TOOLS_DIR=$(dirname ${CONDA_EXE})/..
$ ./setup_anaconda.sh ${CONDA_TOOLS_DIR} [conda-env-name] [python-version]
# e.g.
$ ./setup_anaconda.sh ${CONDA_TOOLS_DIR} espnet 3.8
```

- オプションB) システムPythonからvenvをセットアップする。

```sh
$ cd <espnet-root>/tools
$ ./setup_venv.sh $(command -v python3)
```

- オプションC) システムPythonの環境構築

```sh
$ cd <espnet-root>/tools
$ ./setup_python.sh $(command -v python3)
```

- オプションD) Pythonの環境を設定しない。

オプションCとオプションDはほぼ同じです。このオプションは、Google Colabに向いているかもしれません。

```sh
$ cd <espnet-root>/tools
$ rm -f activate_python.sh && touch activate_python.sh
```

4. ESPnetのインストール

```sh
$ cd <espnet-root>/tools
$ make
```

Makefile は ESPnet と PyTorch を含むすべての依存関係をインストールしようとします。また、PyTorch のバージョンを指定することもできます。

```sh
$ cd <espnet-root>/tools
$ make TH_VERSION=1.10.1
```

なお、CUDAのバージョンはnvccコマンドに由来するものです。もし、他のCUDAバージョンを指定したい場合は、CUDA_VERSIONを指定する必要があります。

```sh
$ cd <espnet-root>/tools
$ make TH_VERSION=1.10.1 CUDA_VERSION=11.3
```

nvccコマンドがない場合、パッケージはデフォルトでCPUモードでインストールされます。手動でオンにする場合は、CPU_ONLY オプションを指定します。

```sh
$ cd <espnet-root>/tools
$ make CPU_ONLY=0
```

## Step 3) [オプション] カスタムツールのインストール

特定のタスクにのみ使用されるパッケージ（例：Transducer ASR、日本語TTSなど）はデフォルトではインストールされませんので、これらのレシピを実行する際に何らかのインストールエラーに遭遇した場合は、オプションでインストールする必要があります。

たとえば

- Warp Transducerを取り付けるには

```sh
cd <espnet-root>/tools
. activate_python.sh
. ./setup_cuda_env.sh <cuda-root>  # e.g. <cuda-root> = /usr/local/cuda
./installers/install_warp-transducer.sh
```

- PyOpenJTalkをインストールするには

```sh
cd <espnet-root>/tools
. activate_python.sh
./installers/install_pyopenjtalk.sh
```

- pipを使ってモジュールをインストールするには。例：ipythonをインストールする場合

```sh
cd <espnet-root>/tools
. activate_python.sh
pip install ipython
```

## インストールを確認する

インストールが正常に終了したかどうかは、次の方法で確認できます。

```sh
cd <espnet-root>/tools
. ./activate_python.sh; python3 check_install.py
```

このチェックは、上記のインストールの最終段階で必ず呼ばれることに注意してください。