# lobubble-server
Node.js server for lobubble at Startup Weekend

**API List**

 - GET /api/v1/login?access_token=*{access_token}*
	 - 로그인 정보 불러옴 + 토큰 DB에 저장 및 갱신


 - GET /api/v1/getFriendList?access_token=*{access_token}*
	 - 친구 목록 불러옴 + DB에 정보 저장 및 갱신


 - GET /api/v1/addMyRecommend?access_token=*{access_token}*&friend_id=*{친구 페북 아이디}*
	 - 친구 추천 목록에 등록


 - GET /api/v1/getMyRecommend?access_token=*{access_token}*
	 - 내 친구 추천 목록 가져옴
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