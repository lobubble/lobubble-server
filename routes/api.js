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
        url: "https://graph.facebook.com/v2.9/me?fields=id,name,picture.width(400),gender&access_token=" + access_token
        // url: req.protocol + '://secure.c.i' + '/api/user/profile',
        // headers: req.headers
    }, function (err, res2, body) {
        // console.log(body);
		// if(err){
		// 	next(err);
		// 	return;
		// }

        try {

			body = JSON.parse(body);
			mysql_query("insert into `account` (`id`, `token`, `fb_id`, `time`) values(NULL, '"+access_token+"', '"+body.id+"', CURRENT_TIMESTAMP) ON DUPLICATE KEY UPDATE `token`='"+access_token+"'", function(err, rows, fields){
				if(err){
					next(err);
					return;
				}
				res.send(body);
			});
        } catch (error) {
			next(error);
        }
    });
});

router.get('/getFriendList', function(req, res, next){
	var access_token = req.query.access_token;
	var fb_id = req.query.fb_id?req.query.fb_id:"me";

    request({
        url: "https://graph.facebook.com/v2.9/"+fb_id+"/friends?fields=id,name,picture.width(300),gender&limit=1000&access_token=" + access_token
        // url: req.protocol + '://secure.c.i' + '/api/user/profile',
        // headers: req.headers
    }, function (err, res2, body) {
        try {
			body = JSON.parse(body);
			res.send(body);
        } catch (error) {
			next(error);
        }
    });
});

router.get('/getInvit')






module.exports = router;
