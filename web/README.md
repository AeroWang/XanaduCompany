# Xanadu-web

node.js 版本推荐14
## 安装依赖
```
npm install
```

### 本地开发 启动项目
```
npm run dev
```

### 构建项目，进行打包
```
npm run build
```


### 构建时特殊依赖包
image-webpack-loader使用 npm install 容易安装失败，导致导包构建失败

例 **Error:**
```
> cwebp-bin@5.1.0 postinstall D:\...\code\node_modules\cwebp-bin
> node lib/install.js

  ‼ getaddrinfo ENOENT raw.githubusercontent.com
  ‼ cwebp pre-build test failed
  i compiling from source
  ...
  ...
```
#### 方式一：

1. 这里没连上raw.githubusercontent.com，可能是域名解析的问题。
查询 `raw.githubusercontent.com` 的ip https://raw.hellogithub.com/hosts.json
   - 来源于 [😘 让你“爱”上 GitHub，解决访问时图裂、加载慢的问题](https://github.com/521xueweihan/GitHub520)

2. mac系统的host文件在 /etc/hosts; windows的 host 文件在 C:\Windows\System32\drivers\etc，直接在文件结尾加上：
`185.199.110.133       raw.githubusercontent.com`  (_2023.03.17_)
3. 保险起见，删除原来的`node_modules`目录重新安装依赖 `npm install`

#### 方式二：

1. 若安装过 image-webpack-loader 先卸载
`npm uninstall image-webpack-loader`
2. 使用 cnpm , 安装 cnpm 然后将全局的 registry 设置成阿里的镜像，国内阿里比较快
`npm install cnpm -g --registry=https://registry.npm.taobao.org`
3. 使用 cnpm 安装 image-webpack-loader
`cnpm install --save-dev  image-webpack-loader`


## Over!
