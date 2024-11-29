import request from './request';

// 提交留言,参数为对象形式
export async function postMessage(comObj) {
  return await request.post('/api/message', comObj);
}

// 分页获取评论
export async function getMessages(page = 1, limit = 10, keyword = '') {
  const resp = await request.get('/api/message', {
    params: {
      page,
      limit,
      keyword
    }
  });
  // console.log('message_api_getMessates_resp:', resp)
  return resp;
}