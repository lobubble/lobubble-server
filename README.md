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