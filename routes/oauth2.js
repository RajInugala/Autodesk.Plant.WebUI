var express = require('express');
var router = express.Router();

/* GET OAuth2 Callback page. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
