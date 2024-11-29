import request from '@/utils/request'

export function getBlogs(page = 1, limit = 10) {
  return request({
    url: '/api/blog',
    method: 'get',
    params: {
      page,
      limit
    }
  })
}

export function delBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'delete'
  })
}

export function addBlog(data) {
  return request({
    url: `/api/blog`,
    method: 'post',
    data
  })
}

export function getOneBlog(id) {
  return request({
    url: `/api/blog/${id}`,
    method: 'get'
  })
}

export function modifyBlog(id, data) {
  return request({
    url: `/api/blog/${id}`,
    method: 'put',
    data
  })
}