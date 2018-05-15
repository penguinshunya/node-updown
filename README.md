## 概要

- ドラッグ&ドロップで簡単に、複数のファイルを一括アップロードできます
- アップロードしたファイルのダウンロードが行えます
- Node.jsとMongoDBサーバさえあれば動きます
- 複雑な設定は必要ありません。必要な情報は、MongoDBサーバのIPアドレスとポート番号だけです

## 手順

```
$ git clone https://github.com/penguinshunya/node-updown.git
$ cd node-updown
$ npm install
$ env PORT=80 MONGODB=172.17.0.4:27017 npm start
```

## 改善すべき点

- アップロードの状況を可視化できない
- サーバ上でファイル名の変更ができない
- ファイルの内容を目視できない。画像ファイルであればサムネイル表示にするなど
- ファイル削除時に、確認ダイアログボックスが表示されない
