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
			body.picture = body.picture.data.url;
			
			mysql_query("REPLACE INTO `account` (`id`, `token`, `fb_id`, `time`) VALUES(NULL, '"+access_token+"', '"+body.id+"', CURRENT_TIMESTAMP)", function(err, rows, fields){
				if(err){
					next(err);
					return;
				}
				mysql_query("REPLACE INTO `user` (`id`, `fb_id`, `name`, `picture`, `gender`, `time`) VALUES(NULL, '"+body.id+"', '"+body.name+"', '"+body.picture.data.url+"', '"+body.gender +"', CURRENT_TIMESTAMP)", function(err, rows, fields){
					if(err){
						// next(err);
						// return;
					}
					res.send(body);
				});
			});
        } catch (error) {
			next(error);
        }
    });
});

router.get('/getFriendList', function(req, res, next){
	var access_token = req.query.access_token;
	var fb_id = req.query.id?req.query.id:"me";

    request({
        url: "https://graph.facebook.com/v2.9/"+fb_id+"/friends?fields=id,name,picture.width(300),gender&limit=1000&access_token=" + access_token
        // url: req.protocol + '://secure.c.i' + '/api/user/profile',
        // headers: req.headers
    }, function (err, res2, body) {
        try {
			body = JSON.parse(body);

			for(item in body.data){
				body.data[item].picture = body.data[item].picture.data.url;
			}

			for(item in body.data){
				mysql_query("REPLACE INTO `user` (`id`, `fb_id`, `name`, `picture`, `gender`, `time`) VALUES(NULL, '"+body.data[item].id+"', '"+body.data[item].name+"', '"+body.data[item].picture +"', '"+body.data[item].gender +"', CURRENT_TIMESTAMP)", function(err, rows, fields){
					if(err){
						// next(err);
						// return;
					}
					// res.send(body);
				});
			}
			res.send(body);
        } catch (error) {
			next(error);
        }
    });
});


router.get('/getMyRecommend', function(req, res, next){
	var access_token = req.query.access_token;
	
});


router.get('/addMyRecommend', function(req, res, next){
	var access_token = req.query.access_token;
	var friend_id = req.query.friend_id;
	mysql_query("REPLACE INTO `recommend` (`id`, `fb_id`, `target_id`, `time`) VALUES(NULL, (SELECT `account`.`fb_id` FROM `account` WHERE `account`.`token` = '"+access_token+"'), '"+friend_id+"', CURRENT_TIMESTAMP)", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		res.send("success");
	});
});






module.exports = router;
