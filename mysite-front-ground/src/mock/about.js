import Mock from 'mockjs'

export default Mock.mock('/api/about', 'get', {
  code: 0,
  msg: '',
  data: 'http://lucky_clouds.gitee.io/my-vue-project/'
})