const titles = [
  '50米之恋(2019)',
  '等待奇迹降临(2018)',
  '熊出没·原始时代(2019)',
  '每21秒(2018)',
  '他们有什么(2018)',
  '布雷兹(2018)',
  '特别追踪(2018)',
  '遇见女孩的感觉(2019)',
];
const avatars = [
  'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2546768035.jpg', // Alipay
  'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2533209689.jpg', // Angular
  'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2541035591.jpg', // Ant Design
  'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2455960843.jpg', // Ant Design Pro
  'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2528823268.jpg', // Bootstrap
  'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2527633250.jpg', // React
  'https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2534385078.jpg',
  'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2544157135.jpg',
];

const desc = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];
const videos = [
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"',
];

function fakeVideoList({ query: { count = 10, offset = 0 } }, res) {
  const list = [];
  const offsetInt = parseInt(offset, 10);
  const nextOffset = offsetInt < 3 ? offsetInt + 1 : null;
  for (let i = 0; i < count; i += 1) {
    list.push({
      id: offset * count + i,
      alt: desc[i % 5],
      src: avatars[i % 8],
      title: titles[i % 8],
      description: desc,
    });
  }

  res.send({ videoList: list, nextOffset });
}

function fakeVideoInfo({ params: { id }, res }) {
  const list = [];
  const commentList = [];
  for (let i = 0; i < id; i += 1) {
    list.push({
      id: i,
      cover: avatars[id % 3],
      title: titles[id % 8],
    });
    commentList.push({
      id: i,
      name: '匿名用户',
      avatar: avatars[id % 3],
      content: desc[id % 5],
      dateTime: new Date().toDateString(),
    });
  }

  res.send({
    title: titles[id % 8],
    cover: avatars[id % 8],
    avatar: avatars[id % 8],
    url: videos[id % 3],
    online: id + 10,
    relatedVideo: list,
    commentList,
  });
}

export default {
  'GET /api/videos': fakeVideoList,
  'GET /api/video/:id': fakeVideoInfo,
};
