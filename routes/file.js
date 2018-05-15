var MongoClient = require('mongodb').MongoClient;

// MONGODB_URL環境変数から、MongoDBのURLを取得する
const url = `mongodb://${ process.env.MONGODB || '127.0.0.1:27017' }`;

exports.insert = function(file, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db('updown');

    db.collection('files').insertOne(file, function(err, result) {
      client.close();
      callback();
    });
  });
};

exports.single = function(where, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db('updown');

    db.collection('files').findOne(where, function(err, file) {
      client.close();
      callback(file);
    });
  });
};

exports.select = function(where, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db('updown');

    db.collection('files').find(where).toArray(function(err, files) {
      client.close();
      callback(files);
    });
  });
};

exports.delete = function(where, callback) {
  MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    const db = client.db('updown');

    db.collection('files').deleteOne(where, function(err, result) {
      client.close();
      callback();
    });
  });
};
