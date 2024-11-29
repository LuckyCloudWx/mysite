# 后台开发问题总结

## 问题一：无限重定向(Maximum call stack size exceeded)

### 问题来源

在设置导航前置守卫后，点击退出登录（或者直接修改path到登录界面）后，出现该错误

### 解决方案

经过检查，发现登录界面的router并没有配置，被注释掉了；

## 问题二:数据库setBanners后提示：banner read-only; 查看数据库，发现数据清空

### 问题来源

执行setBanner()将数据post到数据库后，先后提示read-only错误和{code:0,msg:'服务器内部错误',data:...}

### 解决方案

对于read-only错误，是因为api中request语法错误

```js
export function setBanners(body) {
  return request({
    url: '/api/banner',
    method: 'post',
    body,
  })
}
```

可以看到，请求体的键名书写错误，应该是‘data’；更正后，服务器有了响应（该响应也不是我需要的结果，不过可以证明request语法错误被更正过来了）

```js
export function setBanners(data) {
  return request({
    url: '/api/banner',
    method: 'post',
    data,
  })
}
```

对于“{code:0,msg:'服务器内部错误',data:...}”的信息提示，解决方案如下：

首先该提示起因是这样的，在request语法错误发现之前，我一直以为是传入参数的问题，这里要求格式是Array，于是用typeof进行检查发现传入的参数是object类型（其实Array经过typeof后就是object），于是又对参数进行了修改，用forin语句逐个push到body=[]中再传入。这里大家也可以看得出来了，forin语句遍历的只是‘key’，而非里面的所有，折旧导致传入数据不符合格式，因此出现这样的信息提示。将错误代码注释掉，书写的正确代码如下：

```js
    async formEditConfirm() {
      this.dialogFormVisible = false;
      // let body = [];
      // for (const key in this.banners) {
      //   body.push(key);
      // }
      // const resp = await setBanners(body);
      const resp = await setBanners(this.banners);
      console.log(this.banners instanceof Array, resp);
      this.$message.success("修改成功");
    },
```

<img src="D:\documents\codes\webFrontEnd\项目开发\mysite\background_site\question_img\expacted_result_banner.png" style="zoom:150%;" />
