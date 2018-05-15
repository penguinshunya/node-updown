## 概要

- ドラッグ&ドロップで簡単に、複数のファイルを一括アップロードできます
- アップロードしたファイルのダウンロードが行えます
- 事前準備として必要なのは、GitとDocker Composeのインストールだけです

## 手順

```
$ git clone https://github.com/penguinshunya/node-updown.git
$ cd node-updown
$ docker-compose up -d
```

ホストOSから[http://localhost:8000/](http://localhost:8000/)にアクセスすることで、Webアプリを利用できます。  

ポート番号を変更する場合は、docker-compose.ymlの`- 8000:80`を書き換えます。PORT環境変数の初期値は'3000'、MONGODB環境変数の初期値は'127.0.0.1:27017'です。共に、docker-compose.ymlで変更可能です。

## 改善すべき点

- アップロードの状況を可視化できない
- サーバ上でファイル名の変更ができない
- ファイルの内容を目視できない。画像ファイルであればサムネイル表示にするなど
- ファイル削除時に、確認ダイアログボックスが表示されない
