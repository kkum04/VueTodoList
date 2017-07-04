var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('todo', { title: 'todo' });
});

module.exports = router;
