import Mock from 'mockjs'

export default Mock.mock('/api/project', 'get', {
  code: 0,
  msg: "",
  'data|10-30': [
    {
      id: '@guid',
      name: "@ctitle(5,10)",
      url: "@url",
      github: "@url",
      'description|1-4': ["@cword(10,30)"],
      thumb: "@image( '300x250', '@color', '#fff', 'TestImage' )",
      'order|+1': 1
    },
  ]
})