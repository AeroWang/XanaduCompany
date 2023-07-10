> ## 参考主分支的 [README.md](https://github.com/AeroWang/XanaduCompany/blob/vue3/README.md)

## 一、采用技术方案

该系统采用的主要技术如下：
> Vue2 
1. [Vue.js](https://cn.vuejs.org/v2/guide/index.html)
2. [Element U](https://element.eleme.cn/#/zh-CN/component/installation)
3. [axios](http://www.axios-js.com/zh-cn/docs/index.html)
4. [node.js](https://nodejs.org/zh-cn/docs/)
5. [Sequelize](https://www.sequelize.com.cn/)
6. [Koa](https://koa.bootcss.com/)
7. MySQL数据库


> 2022.11.19 更新
>
> Vue3 [新分支](https://github.com/AeroWang/XanaduCompany/tree/vue3)； 由 `zerotower69` 开发

- 更新为 Vue3 + TS + Element Plus

## 二、开发环境
1. 数据库：MySQL（v5.7.7-rc-log，版本号须大于5.7）,但是用8.x也可能有问题，自行抉择
2. 系统基础环境：Node.js 版本推荐14

## 三、目录说明

admin---后台管理

web---前台门户展示

server---后端服务

## 四、进入项目

系统已上线进行展示

1. 企业门户展示（https://xanadu.aerowang.cn/）

2. 系统后台管理（https://xanadu.aerowang.cn/admin）

   - 账户：youke，密码：a123456

     也可以在进行注册

## 五、如何本地运行

> 数据库文件见QQ群 434063310 文件

1. 先启动后端(server目录下)
```bash
npm install

npm run start(本地启动)

或者 npm run dev(实时监听改动重启)
```
2. 启动前端（web 或者 admin目录下）
```bash
# 1.安装
npm install / yarn install
# 2.启动
npm run dev / yarn dev
# 3.打包
npm run build / yarn build
```

## 六、补充说明

由于本系统进行了CDN加载资源优化，所以运行本系统务必连接一个比较快速稳定的网络，否则系统页面将会出现一些错误！

> 2022.11.19 更新

部分资源引用来源于 cdn.jsdelivr.net，目前（2022.11.19）访问可能有些慢，有兴趣的可以自己修改引用链接

