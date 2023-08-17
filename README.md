# 请注意看本文档，环境说明都在这了！数据库文件请加群后自行翻阅群文件，不要都知道加群还要问为什么项目里找不到数据库文件！数据库版本5.X。
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

## 六、docker

docker 一键自动部署

命令

```bash
# 主目录下
docker compose up -d

# 即可访问
```

需要更改以下文件:

- `./admin/.env.production`

  `VUE_APP_BASE_API = '你自己的域名:3000/api/v1'`

- `./admin/vue.config.js`

  line.27 `publicPath: '/',` => `publicPath: '/admin/',` 

- `./server/config/dbinfo.js`

  `host: "localhost",` => `host: "xanadu-db",`

- `./web/.env.production`

  `VUE_APP_PRODURL = "你自己的域名/admin/#/login"`

- `./web/src/utils/request.ts`

  `baseURL: '/api'` => `你自己的域名:3000/api`

docker并未使用go版本

## 七、补充说明

由于本系统进行了CDN加载资源优化，所以运行本系统务必连接一个比较快速稳定的网络，否则系统页面将会出现一些错误！

> 2022.11.19 更新

部分资源引用来源于 cdn.jsdelivr.net，目前（2022.11.19）访问可能有些慢，有兴趣的可以自己修改引用链接

> 2023.03.15 更新

1.一定要cd到各自的目录下跑，准确来说，本系统分为前端、后端，前端管理端三个项目,此根目录无法直接运行。

2.请严格检查自己的node版本。鉴于已经发现的问题，在windows环境下，建议使用node 14的大版本；另外，QQ群的群文件提供了依赖包的压缩包，也可以作为尝试；mac系统 14和16都OK(运行在APPLE M1之上)。

3.如果数据库连接报错，请首先检查server(后端node)下config目录中的dbinfo.js的配置与你自己的数据库配置是否正确。

4.项目运行前，请一定要npm install安装相关的依赖，并进入到pcweb端、管理端、后端看看各自的package.json文件看看**scripts**部分，确认你要运行的命令是已经定义了的。都没有定义 dev命令，你偏偏要执行`npm run dev`，肯定是要报错的，而且第一句报错信息的意思就会是 dev不在 scripts中，反正你看到 package.json和scripts两个关键字出现在你报错的第一行肯定就是执行了未定义的命令

5.数据库脚本请参考QQ群：434063310（这个群主并非原作者，而是自愿来维护的）。

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
12.遇到报错看到英文不要烦，看看第一句最后一句。比如后端报错有“foreign key”, 肯定是外键有问题，请检查模型定义或者数据库的定义或者数据好吧。前端Vue undefined,这个问题多半和不正确使用cdn有关，vue.config.js(vue3)注释自己看好吧，已经有了说明。英文报错不要多就不看，打开有道（更推荐google）翻译翻一翻也不是多难的事。

13. 群内提问建议提问具体的问题，如果你要问 nginx如何安装，建议先google或者bing.com(如果你太烦nginx不想折腾也可以使用宝塔傻瓜式部署，但仍然建议你部署后看一眼其nginx的配置，学习学习)。百度不推荐的原因是检索的内容多半是CSDN，其内容质量参差不齐，对初学者是不利的。博客贴的东西不一定全对，你如果是小白最好还是耐心看看文档，如果看不下去B站也是学习的好地方。本项目涉及的东西还很简单，文档和B站其实已经能解答你的大多数问题了。
可能说到这，看到这有人就觉得我们不想让人提问。但你的问题如果太大，连个安装入门都没过，你要提问大多数人不是不想回答，而是实在不知道从哪个角度回答你，要解释的东西太多了不如直接无视。

14.需要加入新的功能建议先读懂代码，代码其实不难，你无非是不熟悉新的语言刚开始阵痛而已。功能上的设计没啥特色，想这部分代码都嫖是不可能的，只能是你自己幸苦原创了。看不懂的代码部分可以贴图提问（**一定要贴图**）,代码一段时间不看就会忘掉一些，贴图提问可保证你的困惑能及时被回答。

期望大家能从文档不仅知道使用好本项目，更收获相关的技能，以使自己在前端上有所进步。看到这，还不点个star?留下你的star再嫖好吧（dog.）

## 七、最后的最后

*记得给star哦ღ( ´･ᴗ･` )~*
新群：434063310。（不保证回复时效性）
## 八、zerotower69最后一次更新说明
1.项目的初衷是为了让大家有个vue3版本的语法对比，因此很多功能都和vue2分支的保持一致。
由于开发难免有bug,如有需要自行参考vue2分支或者部署版本修改。
2.我并对不任何人的使用体验负责，有bug欢迎你向我提问，但我不是授课老师。你需要的授课老师可能是：
* [菜鸟教程](https://www.runoob.com)
* [bing](https://www.bing.com)
* [bilibili](https://www.bilibili.com)
* [vue3](https://vuejs.org)
望各位详细阅读本文档，并参考优质一点的学习资源，入门时少看csdn!

