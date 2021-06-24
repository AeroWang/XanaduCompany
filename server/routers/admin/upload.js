const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const path = require('path')
// const Koa = require('koa')
// const koaBody = require('koa-body')
// const path = require('path')
// const fs = require('fs')
// const app = new Koa()

// const routes = require('../../controllers/role/routesController')
// const newKoaBody = koaBody({
//   multipart: true,
//   formidable: {
//     maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
//   }
// })
// const routers = router
//   // .get('/routes',routes.routes)
//   //
//   .post('/upload/file', newKoaBody, async (ctx, next) => {
//     // 上传单个文件
//     const file = ctx.request.files.file // 获取上传文件信息
//     // 创建可读流
//     const reader = fs.createReadStream(file.path)
//     let filePath = path.join(__dirname, 'static/upload/') + `/${file.name}`
//     console.log(filePath)
//     // 创建可写流
//     const upStream = fs.createWriteStream(filePath)
//     // 可读流通过管道写入可写流
//     reader.pipe(upStream)
//     return ctx.body = '上传成功！'
//   })
// const staticPath = './static'
const routers = router
  // .get('/routes',routes.routes)
  //
  .post('/file', async (ctx) => {
    if (ctx.request.files) {
      const fileUrl = `${ctx.origin}/upload/${ctx.uploadpath.file}`
      console.log(fileUrl)
      ctx.body = {
        status: 200,
        data: {
          fileUrl
        },
        msg: 'ok'
      }
    } else {
      ctx.body = {
        status: -1,
        data: null,
        msg: '服务器错误，请联系管理员'
      }
    }
  })
  // 删除文件
  .delete('/file/:date/:id', async (ctx) => {
    const datePath = ctx.params.date
    const fileName = ctx.params.id
    const staticPath = path.resolve(__dirname, '../../static')
    const filePath = `${staticPath}/upload/${datePath}/${fileName}`
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
      ctx.body = {
        status: 200,
        data: null,
        msg: '删除成功'
      }
    } else {
      ctx.body = {
        status: -1,
        data: null,
        msg: '服务器删除错误，但不影响文章编辑！'
      }
    }
    
  })

module.exports = routers
