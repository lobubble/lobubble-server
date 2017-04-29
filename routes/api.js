var express = require('express');
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');


var router = express.Router();


var mysql_query = function (query, callback) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'azure',
        password: '6#vWHD_$',
        port: 52603,
        database: 'lobubble'
    });
	
    connection.connect();
	connection.query(query, callback);
	connection.end();
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next){
	var access_token = req.query.access_token;
	
    request({
        url: "https://graph.facebook.com/v2.9/me?access_token=" + access_token
        // url: req.protocol + '://secure.c.i' + '/api/user/profile',
        // headers: req.headers
    }, function (err, res2, body) {
        // console.log(body);
		// if(err){
		// 	next(err);
		// 	return;
		// }

        try {
			res.send(body);
			// mysql_query("insert into `account` (`id`, `token`, `fb_id`, `time`) values(NULL, '"+access_token+"')")
        } catch (error) {
			next(error);
        }
    });
});

router.get('/getAppUserList', function(req, res, next){

});

router.get('/getInvit')






module.exports = router;
