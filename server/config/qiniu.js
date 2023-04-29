const config={
    enable:true, //是否开启七牛
    accessKey:'',
    secretKey:'',
    bucket:'', //存储桶名称
    cdn:'', //七牛配置的域名，七牛配置的测试域名只能使用一个月，记得配！
    zone:'',  // 区域，当前可选 z0/z1/z2/as0/na0等
    rootPath:'',//存储下的存储根目录
    size:4, //最大文件大小，不得大于4M(单位M)
    useHttps:true, //是否启用https
    useCdnDomains:false //是否启用cdn上传加速
}

module.exports=config;