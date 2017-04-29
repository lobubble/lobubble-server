# lobubble-server
Node.js server for lobubble at Startup Weekend

**API List**

 - GET /api/v1/login?access_token=*{access_token}*
	 - 로그인 정보 불러옴 + 토큰 DB에 저장 및 갱신
```
{
    "id":"1512965602112023",
    "name":"Kim Hanseulmaro",
    "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B",
    "gender":"male"
}
```

 - GET /api/v1/getFriendList?access_token=*{access_token}*
	 - 친구 목록 불러옴 + DB에 정보 저장 및 갱신
```
{
    "data":[
        {
            "id":"1187675588022501",
            "name":"김동현",
            "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/13510980_904118946378168_4746849477514196967_n.jpg?oh=f34ddddd90dc8955d8efc37b9ea957a5&oe=5981756F",
            "gender":"male"
        },
        {
            "id":"1916006061951887",
            "name":"SungMin Jung",
            "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/p320x320/11038116_1654792574739905_5470593157069560453_n.jpg?oh=84655655f24be0aaf208f803b6237166&oe=5979A756",
            "gender":"male"
        }
    ],
    "paging":{
        "cursors":{
            "before":"QVFIUnNqQ1Q0YWlxb3l3RE1YUkI4MlFRdWgzeEM5S3BFUVY3c2I4N3RMNWdaQW5DU0pXSzBoOFYtZAUQ5Ni1HMTFWUE1DNlRMcWFzY05KNV92S08tZAlM0aWNB",
            "after":"QVFIUnBzZAHhlMTY3WHBmaV9IVm5IblBFRnFnNEtuTVUwcW81bTNiU3FlT0pzMVc1dU9FSTdOTks2OE11T0hEQTlneEpyMS1BMW9GR3N5YkJKTUlSbE1oZAVln"
        }
    },
    "summary":{
        "total_count":410
    }
}
```

 - GET /api/v1/addMyRecommend?access_token=*{access_token}*&friend_id=*{친구 페북 아이디}*
	 - 친구 추천 목록에 등록
```
[
    {
        "id":2,
        "fb_id":"1512965602112023",
        "target_id":"1916006061951887",
        "time":"2017-04-29T12:38:27.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    },
    {
        "id":4,
        "fb_id":"1512965602112023",
        "target_id":"undefined",
        "time":"2017-04-29T12:47:00.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    }
]
```

 - GET /api/v1/getMyRecommend?access_token=*{access_token}*&gender=*{all|femail|male}*
	 - 내 친구 추천 목록 가져옴
```
[
    {
        "id":2,
        "fb_id":"1512965602112023",
        "target_id":"1916006061951887",
        "time":"2017-04-29T12:38:27.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    },
    {
        "id":4,
        "fb_id":"1512965602112023",
        "target_id":"undefined",
        "time":"2017-04-29T12:47:00.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    }
]
```


 - GET /api/v1/getMyRecommend?access_token=*{access_token}*&id=*{페이스북 아이디}*&gender=*{all|femail|male}*
	 - 다른 사람의 추천 목록 가져옴
```
[
    {
        "id":2,
        "fb_id":"1512965602112023",
        "target_id":"1916006061951887", 
        "time":"2017-04-29T12:38:27.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    },
    {
        "id":4,
        "fb_id":"1512965602112023",
        "target_id":"undefined",
        "time":"2017-04-29T12:47:00.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    }
]
```

 - GET /api/v1/removeMyRecommend?id=*{페이스북 id}*
	 - 내 추천목록에서 해당하는 사람 삭제
```
[
    {
        "id":2,
        "fb_id":"1512965602112023",
        "target_id":"1916006061951887", 
        "time":"2017-04-29T12:38:27.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    },
    {
        "id":4,
        "fb_id":"1512965602112023",
        "target_id":"undefined",
        "time":"2017-04-29T12:47:00.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    }
]
```


 - POST /api/v1/changeMyIntroduce?access_token=*{access_token}*
	 - body:
		- introduce: text
	 - 자기소개 수정
```
[
    {
        "id":2,
        "fb_id":"1512965602112023",
        "target_id":"1916006061951887", 
        "time":"2017-04-29T12:38:27.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    },
    {
        "id":4,
        "fb_id":"1512965602112023",
        "target_id":"undefined",
        "time":"2017-04-29T12:47:00.000Z",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s480x480/15202551_1289281151147137_5720633694706240800_n.jpg?oh=863fa9aba32067b40e0d30c58b88ac6b&oe=5989B21B"
    }
]
```


 - GET /api/v1/getUserInfomation?access_token=*{access_token}*
 - GET /api/v1/getUserInfomation?id=*{페이스북 아이디}*
	 - 1명에 대한 유저 정보 가져오기
```
[
    {
        "id":53,
        "fb_id":"1512965602112023",
        "name":"Kim Hanseulmaro",
        "picture":"https://scontent.xx.fbcdn.net/v/t1.0-1/s320x320/15202551_1289281151147137_5720633694706240800_n.jpg?oh=7701140821b066c91961516cc9770185&oe=5992855C",
        "gender":"male",
        "introduce":null,
        "time":"2017-04-29T16:12:44.000Z"
    }
]
```
