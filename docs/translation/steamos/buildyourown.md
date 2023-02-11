# 自分だけのSteam Machineを組み立てる

SteamOS は、弊社の Linux ベースのオペレーティングシステムです。根幹となるシステムは Debian 8 （コードネームは Debian Jessie) を利用しています。 SteamOS は堅牢な Debian コアの上に築かれており、リビングルームでの使用に最適化されています。さらに、SteamOS は利用者に完全な管理権限があるオープンな Linux プラットフォームです。自分のシステムを管理し、お好きなように新しいソフトウェアやコンテンツをインストールすることができます。

## SteamOS をインストール・カスタマイズする

### SteamOS のハードウェア要件は？

- プロセッサー: Intel あるいは AMD の 64bit 対応プロセッサ 
- メモリー: 4GB 以上の RAM 
- ハードディスク: 200GB 以上のディスク容量 
- ビデオカード: 
  - NVIDIA グラフィックスカード
  - AMD グラフィックスカード (RADEON 8500 以降)
  - Intel グラフィックス 
- 追加要件: インストール用の USB ポート
- UEFI ファームウェア (推奨) 

> 注：このイメージはSteam Deckと互換性がありません。Steam Deckのリカバリーイメージをお探しの場合は、[こちらのリンク](https://help.steampowered.com/faqs/view/1B71-EDF2-EB6D-2BB3)を開いてください。

### Steam OS をインストールする方法は？

Steam OS をインストールする方法は二種類存在します。推奨されるのは自動インストールの方法で、こちらはデフォルトのディスク設定を使ってインストールを行います。もう一つはエキスパートの方法で、Debian インストーラを利用した自動インストールの後に一部の設定が可能です。以下の方法より 1 つお選び下さい。

> 警告: いずれのインストール方法も対象のコンピュータ内の全データを消去します

### 自動インストール

1. [SteamOS インストーラをダウンロードする](https://store.steampowered.com/steamos/download/?ver=custom)
2. SteamOS.zip ファイルを FAT32 でフォーマットされた空の USB メモリに解凍します。必ず MBR パーティションを使用してください。
3. 対象のコンピュータへその USB メモリを挿し込みます。コンピュータを起動し、BIOS に USB メモリから起動するよう指示します。(大抵はF8、F11、F12などのキーで BIOS のブートメニューを呼び出せます。)
4. 必ず UEFI を選択して下さい。&quot;UEFI: Patriot Memory PMAP&quot;などのように記載されています。UEFI が存在しなければ、BIOS の設定から UEFI サポートを有効化する必要があります。
5. メニューから&quot;自動インストール (ディスクは消去されます！)&quot;を選択します。
6. 残りのインストール作業は全て自動で行われ、ドライブの再パーティションと SteamOS のインストールが完了します。
7. インストールが完了したら、システムが再起動した後自動的にログインされ Steam がインストールされます。このときインターネット接続が必要になります。インターネットに接続している場合、Steam は自動でインストールされます。インターネットに接続していない場合(例えば、Wi-Fi アクセスポイントに接続する必要がある場合など)、そのことを通知するポップアップが表示されます。ポップアップを閉じるとネットワーク設定ができる UI が表示されます。インターネットに接続した後にその UI を閉じると Steam が自動でインストールされます。
8. Steam のインストールが完了したら、システムは自動で再起動しシステムパーティションのバックアップが作成されます。
9. バックアップが完了した後に、&quot;再起動&quot;を選択すると新たにインストールされた SteamOS の利用を開始できます。

### エキスパートインストール

1. [SteamOS インストーラをダウンロードする](https://store.steampowered.com/steamos/download/?ver=custom)
2. SteamOS.zip ファイルを FAT32 でフォーマットされた空の USB メモリに解凍します。必ず MBR パーティションを使用してください。
3. 対象のコンピュータへその USB メモリを挿し込みます。コンピュータを起動し、BIOS に USB メモリから起動するよう指示します。(大抵はF8、F11、F12などのキーで BIOS のブートメニューを呼び出せます。)
4. 必ず UEFI を選択して下さい。"UEFI: Patriot Memory PMAP"などのように記載されています。UEFI が存在しなければ、BIOS の設定から UEFI サポートを有効化する必要があります。
5. メニューから"エキスパートインストール"を選択します。
6. 使用言語、場所、キーボードレイアウトを選択します。
7. ここでデフォルトのディスクパーティションを変更することもできます。
8. 残りのインストール作業は全て自動で行われ、SteamOS のインストールが完了します。
9. インストールが完了したら、システムが再起動した後自動的にログインされ Steam がインストールされます。このときインターネット接続が必要になります。インターネットに接続している場合、Steam は自動でインストールされます。インターネットに接続していない場合(例えば、Wi-Fi アクセスポイントに接続する必要がある場合など)、そのことを通知するポップアップが表示されます。ポップアップを閉じるとネットワーク設定ができる UI が表示されます。インターネットに接続した後にその UI を閉じると Steam が自動でインストールされます。
10. Steam のインストールが完了したら、システムは自動で再起動しシステムパーティションのバックアップが作成されます。
11. バックアップが完了した後に、"再起動"を選択すると新たにインストールされた SteamOS の利用を開始できます。

---

## スレッド

他の SteamOS ユーザーとの対話に参加しよう

[スレッドに参加](https://steamcommunity.com/groups/steamuniverse/discussions/1/)

## 詳細

SteamOS の詳細

[SteamOS FAQ](https://steamcommunity.com/groups/steamuniverse/discussions/1/648814395741989999/)