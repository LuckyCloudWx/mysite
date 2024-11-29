import request from '@/utils/request'

export function getMessages(page = 1, limit = 10, keyword = '') {
  return request({
    url: '/api/message',
    method: 'get',
    params: {
      page,
      limit,
      keyword
    }
  })
}

export function delMessage(id) {
  return request({
    url: `/api/message/${id}`,
    method: 'delete'
  })
}