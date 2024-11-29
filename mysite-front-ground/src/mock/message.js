import Mock from 'mockjs';
import qs from 'querystring';

// 模拟提交评论的响应
Mock.mock('/api/message', 'post', function(options) {
  const body = JSON.parse(options.body);
  return Mock.mock({
    code: 0,
    msg: "",
    data: {
      id: '@guid',
      nickname: body.nickname,
      content: body.content,
      createDate: "@date('yyyy-MM-dd')",
      'avatar|1': [
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
        "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
      ],
    }
  })
});

//分页获取留言的响应
Mock.mock(/^\/api\/message(\?.+)?/, 'get', function(options) {
  const query = qs.parse(options.url.split('?')[1]);
  return {
    code: 0,
    msg: '',
    data: Mock.mock({
      total: 51,
      [`rows|${query.limit}`]: [{
        'id': '@guid',
        nickname: "@cword(2,5)",
        content: "@cword(20,100)",
        createDate: "@date('yyyy-MM-dd')",
        'avatar|1': [
          "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar6.jpg",
          "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar4.jpg",
          "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar8.jpg",
          "https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/avatar2.jpg",
        ],
      }]
    })
  }
});