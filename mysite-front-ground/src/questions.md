# 问题总结

## 预加载时属性读取为undefined

### 问题描述

在为组件属性传递远程获取的数据时，由于一开始数据还未获取到，这时数据为空或undefined，因此，子组件在created阶段由于读取不到有效值而产生报错。

### 解决方案

在导入获取远程数据mixin模板时，预传递一个带格式空参数，如：

```javascript
mixins:[fetchData({total:0,rows:[]})]
```

## titleControler模块输出undefined

### 问题描述

在使用utils中的titleControler模块时，输出为undefined；

其中，utils的index.js中的导出代码为：

```javascript
export {default as titleControl} from './titleControler'
```

对应文件的，导入代码为：

```javascript
import {titleControl} from '@/utils/titleControler'
```

### 解决方案

这里是导入路径的问题，由于工具函数已经由index.js统一导出了，因此导入的时候直接书写'@/utils'即可；且'titleControler'采用默认导出方式，若从这里直接导出，应当用'import titleControl from ...'这样的默认导出导入的方式。

## mock移除了但又没完全移除

### 问题描述

我将main.js中import './mock' 注释后，打开前台，项目和文章数据可以正常从服务器获取到了，但是！！！
1，打开留言板后，留言数据依旧是mock数据
2，打开一遍留言板再返回文章或项目后，文章、项目数据又变成了mock数据
3，注释掉mock文件夹中message.js的分页获取留言后，留言数据才正常

### 解决方案
我在components中的comment组件的index.vue中，也导入了一次mock中的index，因此评论模块数据使用的是mock数据，并且！！因为打开了留言板模块，所以运行了一遍mock/index.js中的所有导入，所以导致项目和文章模块的数据也变成mock了。

## 留言数据重复

### 问题描述

接上一问题的第三个现象，留言数据可以正常从服务器获取了，但是滚动条往下滑动时，加载出的下一页数据量不正确，总共26条数据，第一页20条，第二页却又加载出了10条。