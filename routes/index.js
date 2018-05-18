var express = require('express');
var multer = require('multer');
var fs = require('fs');
var file = require('./file');
var path = require('path');
var router = express.Router();
var upload = multer({ dest: './uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Upload & Download' });
});

/* POST upload files. */
router.post('/upload', upload.single('file'), function(req, res, next) {
  const obj = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    date: req.query.date
  };
  file.insert(obj, function() {
    res.end(JSON.stringify(obj));
  });
});

/* GET download file. */
router.get('/download/:filename([0-9a-f]{32})', function(req, res, next) {
  const filename = req.params.filename;
  file.single({ filename: filename }, function(file) {
    res.download(`./uploads/${filename}`, file.originalname);
  });
});

/* GET file. */
/* use src attribute of img/audio/video element */
router.get('/files/:filename([0-9a-f]{32})', function(req, res, next) {
  const filename = req.params.filename;
  file.single({ filename: filename }, function(file) {
    // not to download in 'open by new tab' of web browser
    res.type(file.mimetype);
    // if don't use join function, raise 403 ForbiddenError
    res.sendFile(path.join(__dirname, `../uploads/${filename}`));
  });
});

/* GET files. */
router.get('/files/', function(req, res, next) {
  file.select({}, function(files) {
    res.end(JSON.stringify(files));
  });
});

/* DELETE file. */
router.delete('/files/:filename([0-9a-f]{32})', function(req, res, next) {
  const filename = req.params.filename;
  file.delete({ filename: filename }, function() {
    fs.unlink(`./uploads/${filename}`, function() {
      res.end();
    });
  });
});

module.exports = router;
