import request from './request';

export async function getBlogTypes() {
  return await request.get('/api/blogtype');
}

export async function getBlogs(page = 1, limit = 10, categoryid = -1, keyword = '') {
  return await request.get('/api/blog', {
    params: { page, limit, categoryid, keyword }
  });
}

// 获取单个博客
export async function getBlog(blogId) {
  return await request.get(`/api/blog/${blogId}`);
}

// 提交评论,参数为对象形式
export async function postComment(comObj) {
  console.log('api_data', comObj)
  const resp = await request.post('/api/comment', comObj);
  console.log('resp', resp)
  return resp;
}

// 分页获取评论
export async function getComments(blogId, page = 1, limit = 10) {
  return await request.get('/api/comment', {
    params: {
      page,
      limit,
      blogId
    }
  });
}