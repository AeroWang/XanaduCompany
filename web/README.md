# Xanadu-web

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
1. 若安装过 image-webpack-loader 先卸载
```
npm uninstall image-webpack-loader
```
2. 使用 cnpm , 安装 cnpm 然后将全局的 registry 设置成阿里的镜像，国内阿里比较快
```
npm install cnpm -g --registry=https://registry.npm.taobao.org
```
3. 使用 cnpm 安装  image-webpack-loader
```
cnpm install --save-dev  image-webpack-loader 
```
