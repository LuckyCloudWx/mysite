import request from '@/utils/request'

export function getProjects() {
  return request({
    url: '/api/project',
    method: 'get'
  })
}

export function modifyProject(data) {
  return request({
    url: `/api/project/${data.id}`,
    method: 'put',
    data: {
      description: data.description,
      name: data.name,
      url: data.url,
      github: data.github,
      thumb: data.thumb,
      order: data.order
    }
  })
}

export function addProject(data) {
  return request({
    url: '/api/project',
    method: 'post',
    data
  })
}

export function delProject(id) {
  return request({
    url: `/api/project/${id}`,
    method: 'delete',
  })
}