User
---
avatar
signature
nickname
phone
gender
role
password
password_hash

has_many Video
has_many Comment

many_to_many Comment likedComments thought Like_Comment
many_to_many Video collectionVideos thought Collection


get    /api/users/            user_list
get    /api/users/me          current_user
get    /api/users/{id}        user
post   /api/users/            create_user
put    /api/users/{id}        modify_user
delete /api/users/{id}        delete_user
get    /api/users/videos      my_videos
get    /api/users/collection  my_collection_videos
get    /api/users/comment     my_comment


```json
{
  "avatar": "",
  "signature": "",
  "nickname": "",
  "phone": "",
  "gender": "",
  "role": "",
  "hot": "",
}
```


Video
---
title
description
url
cover
hot
category

has_many Comment

belongs_to User

many_to_many Video related_video thought Related_Video
many_to_many User collectionUsers thought Collection

get    /api/videos/              video_list
get    /api/videos/{id}          video
post   /api/videos/              create_video
put    /api/videos/{id}          modify_video
delete /api/videos/{id}          delete_video
get    /api/videos/collect/{id}  collect_video
delete /api/videos/collect/{id}  cancel_collect_video
post   /api/videos/comment       comment_video
post   /api/users/search         search_video



```json
{
  "title": "",
  "description": "",
  "url": "",
  "cover": "",
  "hot": "",
  "category": "",
  "author": {},
  "comments": [],
  "collectedUser": []
}
```


Comment
---
title
content

belongs_to User
belongs_to Video

many_to_many User likedUsers thought Like_Comment


get    /api/comment/              comment_list
get    /api/comment/{id}          comment
delete /api/comment/{id}          delete_comment
get    /api/comment/like/{id}     like_comment
delete /api/comment/like/{id}     unlike_comment


```json
{
  "title": "",
  "content": "",
  "author": {},
  "likedUser": []
}
```


Like_Comment
---
user_id
comment_id

Collection
---
user_id
video_id

Related_Video
---
video_id
related_video_id

