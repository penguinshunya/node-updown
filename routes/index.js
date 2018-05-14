var express = require('express');
var multer = require('multer');
var router = express.Router();
var upload = multer({ dest: './uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST upload files. */
router.post('/upload', upload.array('files'), function(req, res, next) {
  res.end('finish');
});

module.exports = router;
