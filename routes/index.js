var express = require('express');
var multer = require('multer');
var fs = require('fs');
var file = require('./file');
var router = express.Router();
var upload = multer({ dest: './uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload & Download' });
});

/* POST upload files. */
router.post('/upload', upload.single('file'), function(req, res, next) {
  file.insert({
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size
  }, function() {
    res.end(JSON.stringify({
      filename: req.file.filename,
      originalname: req.file.originalname
    }));
  });
});

/* GET download file. */
router.get('/download/:filename', function(req, res, next) {
  const filename = req.params.filename;
  file.single({ filename: filename }, function(file) {
    res.download(`./uploads/${filename}`, file.originalname);
  });
});

/* GET files. */
router.get('/files/', function(req, res, next) {
  file.select({}, function(files) {
    res.end(JSON.stringify(files));
  });
});

/* DELETE file. */
router.delete('/files/:filename', function(req, res, next) {
  const filename = req.params.filename;
  file.delete({ filename: filename }, function() {
    fs.unlink(`./uploads/${filename}`, function() {
      res.end();
    });
  });
});

module.exports = router;
