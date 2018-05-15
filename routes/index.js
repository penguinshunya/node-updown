var express = require('express');
var multer = require('multer');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var router = express.Router();
var upload = multer({ dest: './uploads/' });

// MONGODB_URL環境変数から、MongoDBのURLを取得する
const url = `mongodb://${ process.env.MONGODB || '127.0.0.1:27017' }`;

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db('updown');

    // ファイル情報のリストをPugファイルに渡す
    db.collection('files').find({}).toArray(function(err, files) {
      client.close();
      res.render('index', { title: 'Express', files: files });
    });
  });
});

/* POST upload files. */
router.post('/upload', upload.array('files'), function(req, res, next) {

  // MongoDBに接続し、DBにファイル情報を格納する
  // http://mongodb.github.io/node-mongodb-native/3.0/
  // { useNewUrlParser: true } を入れないと、DeprecationWarningが表示される
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db('updown');

    db.collection('files').insertMany(req.files.map(function(obj) {
      return {
        filename: obj.filename,
        originalname: obj.originalname,
        mimetype: obj.mimetype,
        size: obj.size
      };
    }), function(err, result) {
      client.close();

      res.end(JSON.stringify(req.files.map(function(obj) {
        return { filename: obj.filename, originalname: obj.originalname };
      })));
    });
  });
});

/* GET download file. */
router.get('/download/:filename', function(req, res, next) {
  const filename = req.params.filename;

  fs.readFile(`./uploads/${filename}`, function(err, data) {
    res.send(data);
  });
});

/* DELETE delete file. */
/* TODO: どうにかして、router.delete(...) という感じで実装したい */
router.post('/files/:filename', function(req, res, next) {
  const filename = req.params.filename;

  switch (req.body._method) {
  case 'DELETE':
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
      const db = client.db('updown');

      // DB上のファイル情報を削除してから、ファイル本体を削除する
      db.collection('files').deleteOne({ filename: filename }, function(err, result) {
        fs.unlink(`./uploads/${filename}`, function(err) {
          client.close();
          res.end('delete');
        });
      });
    });
    break;
  }
});

module.exports = router;
