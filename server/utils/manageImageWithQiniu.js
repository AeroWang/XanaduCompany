const Qiniu =require('qiniu');
const config =require('../config/qiniu_my');
const fs=require('fs')
const path = require("node:path");
const {Readable} =require('node:stream')
/**
 *
 * @param {string} zone
 */
const getZone=(zone)=>{
    let res=Qiniu.zone.Zone_z0;
    switch (zone){
        case 'z2':
            res = Qiniu.zone.Zone_z2;
            break;
        case 'z0':
            res = Qiniu.zone.Zone_z0;
            break;
        case 'z1':
            res = Qiniu.zone.Zone_z1;
            break;
        case 'as0':
            res = Qiniu.zone.Zone_as0;
            break;
        case 'na0':
            res =  Qiniu.zone.Zone_na0;
            break;
    }
    return res
}

 const getToken=()=>{
    const mac = new Qiniu.auth.digest.Mac(config.accessKey, config.secretKey);

    const options = {
        scope: config.bucket,
    };
    const putPolicy = new Qiniu.rs.PutPolicy(options);
    return putPolicy.uploadToken(mac);
}

/**
 * 删除原来的文件
 * @param {string} filename
 */
const deleteOriginFile=async (filename)=>{
    const filepath =path.resolve(__dirname,"../static/upload/"+filename);
    console.log("filename===>",filename)
    const dirname= filename.split('/')[0];
    const deletepath=path.resolve(__dirname,"../static/upload/"+dirname);
    const files=fs.readdirSync(deletepath);
    const promises=files.map(file=>fs.promises.rm(deletepath+"/"+file))
    await Promise.all(promises)
    return await fs.promises.rmdir(deletepath);
}

/**
 * 上传文件
 * @param {import('fs').ReadStream} localFile
 * @param {string} filename
 * @return {Promise<any>}
 */
 const uploadFile=(localFile,filename)=>{
    return new Promise((resolve,reject)=>{
        const qiniuConfig = new Qiniu.conf.Config();
        const zone=getZone(config.zone);
        // console.log('zone===>',zone)
        qiniuConfig.zone=zone;
        qiniuConfig.useHttpsDomain=config.useHttps;
        qiniuConfig.useCdnDomain=config.useCdnDomains;
        const formUploader = new Qiniu.form_up.FormUploader(qiniuConfig);
        const putExtra = new Qiniu.form_up.PutExtra();
        const filepath= !config.rootPath? "/"+filename : `/${config.rootPath}/${filename}`
        formUploader.putStream(getToken(),filepath,localFile,putExtra,(e, respBody, respInfo)=>{
            if(e){
                console.log("qiniu错误===>",e)
                reject(e)
            }
            // console.log('body====>',respBody)
            // console.log('info====>',respInfo)
            if(respInfo.statusCode === 200){
                const protocol= config.useHttps? 'https':'http';
                deleteOriginFile(filename).then(()=>{

                }).catch((err)=>{
                    console.log('删除报错===>',err)
                })
                resolve(`${protocol}://${config.cdn}/${respBody.key}`)
            } else {
                console.log(respBody)
                reject(respBody)
            }
        })
    })
}

module.exports={
     getToken,
    uploadFile
}

