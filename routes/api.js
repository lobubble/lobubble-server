var express = require('express');
var request = require('request');
var fs = require('fs');
var mysql = require('mysql');

var router = express.Router();


var multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../public/uploadedFiles/')
  },
  filename: function (req, file, cb) {
    cb(null,  + Date.now() + "." + file.originalname.split(".").pop())
  }
});

 


var uploading = multer({
  fileFilter: function (req, file, cb) {
	var UnacceptableMimeTypes = ["exe", "com", "scr", "sh", "ln"]
    if (UnacceptableMimeTypes.indexOf(file.originalname.split(".").pop()) > -1) {
      return cb(new Error('Unacceptable file type.'))
    }

    cb(null, true)
  },
  storage: storage,
  limits: {fileSize: 1000 * 1000 * 20, files:5}
})



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
				mysql_query("REPLACE INTO `user` (`id`, `fb_id`, `name`, `picture`, `gender`, `time`) VALUES(NULL, '"+body.id+"', '"+body.name+"', '"+body.picture+"', '"+body.gender +"', CURRENT_TIMESTAMP)", function(err, rows, fields){
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
	var access_token = req.query.access_token?req.query.access_token:"";
	var fb_id = req.query.id?req.query.id:null;
	var gender = req.query.gender?req.query.gender:"all";
	if(gender == "all"){
		gender = "";
	}
	else{
		gender = " AND `user`.`gender`='" + gender + "' "; 
	}
	var fQuery = fb_id?"'" + fb_id + "'":"(SELECT `account`.`fb_id` FROM `account` WHERE `account`.`token` = '"+access_token+"')";

	mysql_query("SELECT `recommend`.*, `user`.`name`, `user`.`picture` FROM `recommend`, `user` WHERE `recommend`.`target_id` = `user`.`fb_id` AND `recommend`.`fb_id` = " + fQuery + gender, function(err, rows, fields){
	// mysql_query("SELECT `recommend`.*, (SELECT `user`.`name` FROM `user` WHERE `user`.`fb_id` = `recommend`.`target_id`) as `name`, (SELECT `user`.`picture` FROM `user` WHERE `user`.`fb_id` = `recommend`.`target_id`) as `picture` FROM `recommend` WHERE `recommend`.`fb_id` = " + fQuery + gender, function(err, rows, fields){
		
		if(err){
			next(err);
			return;
		}
		res.send(rows);
	});
});


router.get('/addMyRecommend', function(req, res, next){
	var access_token = req.query.access_token;
	var friend_id = req.query.friend_id;
	
	mysql_query("REPLACE INTO `recommend` (`id`, `fb_id`, `target_id`, `time`) VALUES(NULL, (SELECT `account`.`fb_id` FROM `account` WHERE `account`.`token` = '"+access_token+"'), '"+friend_id+"', CURRENT_TIMESTAMP)", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		request({
			url: req.protocol + '://' + req.get('host') + '/api/v1/getMyRecommend?access_token=' + access_token
		}, function(err, res2, body){
			res.send(body);
		});
	});
});

router.get('/removeMyRecommend', function(req, res, next){
	var id = req.query.id;
	
	mysql_query("DELETE FROM `recommend` WHERE `target_id` = '"+id+"' AND `fb_id` = (SELECT `fb_id` FROM `account` WHERE `token` = '"+ access_token +"')", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		request({
			url: req.protocol + '://' + req.get('host') + '/api/v1/getMyRecommend?access_token=' + access_token
		}, function(err, res2, body){
			res.send(body);
		});
	});
});

router.post('/changeMyIntroduce', function(req, res, next){
	var access_token = req.query.access_token;
	var introduce = req.body.introduce;
	
	mysql_query("UPDATE `user` SET `introduce` = '"+introduce+"' WHERE `fb_id` = (SELECT `fb_id` FROM `account` WHERE `token` = '"+ access_token +"');", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		res.send(rows);
	});
});

router.get('/getUserInfomation', function(req, res, next){
	var access_token = req.query.access_token;
	var fb_id = req.query.id?req.query.id:"(SELECT `fb_id` FROM `account` WHERE `token` = '"+ access_token +"')";
	
	mysql_query("SELECT * FROM `user` WHERE `fb_id` = "+fb_id+";", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		res.send(rows);
	})	
});

// router.post('/uploadCustomImage', uploading.fields([{name: "file", maxCount: 1}]), function(req, res, next){
// 	// req.files.file[0]
// 	try {
		
// 	} catch (error) {
// 		next(error);	
// 	}
// });

router.get('/getCustomImage', function(req, res, next) {
	try {
		var fb_id = mysql.escape(req.query.id);

		mysql_query("SELECT * FROM `custom_photo` WHERE `fb_id` = " + fb_id, function(err, rows, fields){
			if(err){
				next(err);
				return;
			}
			
			mysql_query("SELECT `id`, `fi_id`, `picture` AS `file`, `time` FROM `user` WHERE `fb_id` = " + fb_id, function(err, rows2, fields2){
				if(err){
					next(err);
					return;
				}
				rows.push(rows2[0]);
				res.send(rows);
			});
		});
		
	} catch (error) {
		next(error);
	}
});



module.exports = router;
