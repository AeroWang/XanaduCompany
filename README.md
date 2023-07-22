## 一、采用技术方案

该系统采用的主要技术如下：
> Vue3
1. [Vue.js](https://cn.vuejs.org/)
2. [Element Plus](https://element-plus.gitee.io/zh-CN/)
3. [axios](http://www.axios-js.com/zh-cn/docs/index.html)
4. [node.js](https://nodejs.org/zh-cn/docs/)
5. [Sequelize](https://www.sequelize.com.cn/)
6. [Koa](https://koa.bootcss.com/)
7. MySQL数据库


> 2022.11.19 更新
>
> Vue3 [新分支,已经是默认分支](https://github.com/AeroWang/XanaduCompany)； 由 `zerotower69` 开发

- 更新为 Vue3 + TS + Element Plus

> 2023.03.15 更新
>
vue3为主分支，vue2版本请参考[vue2](https://github.com/AeroWang/XanaduCompany/tree/vue2)分支,本分支当前的坑比较多，部分不完善的地方请参考vue2版本的效果。
## 二、开发环境

1. 操作系统：Windows10
2. 数据库：MySQL（v5.7.7-rc-log，版本号须大于5.7）
3. Web服务器：Nginx 
4. 开发工具：Webstorm
5. 系统基础环境：Node.js
6. 浏览器：谷歌浏览器

## 三、目录说明

admin---后台管理

web---前台门户展示

server---后端服务

## 四、进入项目

系统已上线进行展示

1. 企业门户展示（https://xanadu.aerowang.cn/）

2. 系统后台管理（https://xanadu.aerowang.cn/admin）

   - 账户：youke，密码：a123456
   - 管理员：admin 密码：654321

     也可以在进行注册
## 五、如何本地运行
**有问题看一眼package.json中的scripts，别无中生有dev,running 啥命令，
命令执行不了肯定没有定义!**
1. 先启动后端(server目录下)
```bash
npm install

npm run start(本地启动)

或者 npm run dev(实时监听改动重启，边改边跑) 需要全局安装 nodemon（任何说不是xxx命令的错误都是没有全局安装，请先安装后再运行）
```
2. 启动前端（web 或者 admin目录下）
```bash
# 1.安装
npm install
   #又或者
pnpm install
# 2.启动
npm run serve 
   #又或者
pnpm serve
# 3.打包
npm run build 
 #又或者
pnpm build
# 4.清除 node_modules
npm run clear 
  # 又或者
pnpm clear #由于rmdir 安装在这里，它也会清掉，就是自己干了自己
#会有一条报错出现，请无视它
```
pnpm 命令请提前全局安装
```bash
npm i pnpm -g
```

## 六、补充说明

由于本系统进行了CDN加载资源优化，所以运行本系统务必连接一个比较快速稳定的网络，否则系统页面将会出现一些错误！

> 2022.11.19 更新

部分资源引用来源于 cdn.jsdelivr.net，目前（2022.11.19）访问可能有些慢，有兴趣的可以自己修改引用链接

> 2023.03.15 更新

1.一定要cd到各自的目录下跑，准确来说，本系统分为前端、后端，前端管理端三个项目,此根目录无法直接运行。

2.请严格检查自己的node版本。鉴于已经发现的问题，在windows环境下，建议使用node 14的大版本；另外，QQ群的群文件提供了依赖包的压缩包，也可以作为尝试；mac系统 14和16都OK(运行在APPLE M1之上)。

3.如果数据库连接报错，请首先检查server(后端node)下config目录中的dbinfo.js的配置与你自己的数据库配置是否正确。

4.项目运行前，请一定要npm install安装相关的依赖。

5.数据库脚本请参考QQ群：434063310。

6.node推荐使用nvm版本管理工具，[windows用户](https://github.com/coreybutler/nvm-windows/releases)直接使用.exe无烦恼安装, mac用户可以使用brew安装
```bash
brew install nvm
```
安装了nvm你就可以使用其切换node的版本了，nvm install xxx是安装命令，每次切换记得使用nvm use xxx切换到你想使用的版本。

7.web项目使用了CDN,你如果不想使用，请注释掉配置中external中的逻辑；如果使用，请检查相关的CDN链接是否能正常访问，直接粘贴到浏览器你就可以检查了，并正确配置你的external。

8.关于使用proxy，请一定要在生产环境nginx中配置反向代理。

9.后端node当下确实没有合适的打包方案，一般直接服务器使用pm2启动node服务，请在服务端安装pm2使用:

```bash
npm i pm2 -g
```

如果确实需要打包，请知乎查阅文章，百度的质量不太行。但这里的打包和java等的概念不一样的，即使用webpack打包，你的代码还是js而不是像java那样经过编译器转为字节码，node的本质是c++(因为node严谨来说是一个javascript运行时而不是一门新的语言，只是c++编写的V8内核提供了node的这些API，真正负责和系统交互语言是c++)，你使用的语言仍然是javascript。

10.新手请注意辨明前端打包的目的，当前我们写的代码是浏览器不能直接运行的，我们需要将我们的代码转为浏览器可识别并执行的格式，本质上是js到另一种j s规范的过程，和后端意义的打包完全不同。

11.图片路径问题请尽量使用自己的cdn服务或者把资源放在自己的服务器上，替换数据库已经存在的图片路径，你可以使用
如下的sql语句：
```mysql
UPDATE [tablename] SET [fieldname] = REPLACE([fieldname], 'locolhost:3000','[yourHOST]')
```
图片资源不太需要nginx反向代理，你可以参考如下的配置:
```nginx
location ~ .*\.(gif|jpg|jpeg|png|bmp|swf|webp|jfif)$
    {
        #图片在server/static里，改写root路径就可以了！
        root /www/wwwroot/zero/company/server/static;
        expires      30d;
        error_log /dev/null;
        access_log /dev/null;
    }
```

## 七、最后的最后

记得给star哦ღ( ´･ᴗ･` )~
新群：434063310。
