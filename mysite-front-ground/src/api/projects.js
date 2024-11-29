import request from './request'

export default async function getData () {
  return await request.get('/api/project');
}