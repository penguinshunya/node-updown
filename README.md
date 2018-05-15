## 概要

- ドラッグ&ドロップで簡単に、複数のファイルを一括アップロードできます
- アップロードしたファイルのダウンロードが行えます
- Node.jsとMongoDBサーバさえあれば動きます
- 複雑な設定は必要ありません。必要な情報は、MongoDBサーバのIPアドレスとポート番号だけです

## 手順

```
# git clone https://github.com/penguinshunya/node-updown.git
# cd node-updown
# npm install
# env PORT=80 MONGODB=172.17.0.4:27017 npm start
```

※PORT環境変数の初期値は'3000'、MONGODB環境変数の初期値は'127.0.0.1:27017'です。

## 手順2

Node.jsとMongoDBをインストールしていなくても、Docker ComposeがインストールされていればWebサーバを起動できます。

```
$ git clone https://github.com/penguinshunya/node-updown.git
$ cd node-updown
$ docker-compose up -d
$ docker-compose exec node bash
# cd /share
# npm install
# env PORT=80 MONGODB=mongo:27017 npm start
```

ホストOSから[http://localhost:8000/](http://localhost:8000/)にアクセスすることで、Webアプリを利用できます。  
ポート番号を変更する場合は、docker-compose.ymlの`- 8000:80`を書き換えます。

## 改善すべき点

- アップロードの状況を可視化できない
- サーバ上でファイル名の変更ができない
- ファイルの内容を目視できない。画像ファイルであればサムネイル表示にするなど
- ファイル削除時に、確認ダイアログボックスが表示されない
