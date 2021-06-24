<template>
  <div ref="editor" class="editor">
    <!--<div ref="toolbar" class="toolbar" />-->
    <!--<div ref="editor" class="text" />-->
  </div>
</template>

<script>
import E from 'wangeditor'
import Settings from '@/settings'
import { imgUpload } from './upload'

export default {
  name: 'WangEditor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    isClear: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      editor: null,
      info_: null
    }
  },
  watch: {
    isClear(val) {
      // 触发清除文本域内容
      if (val) {
        this.editor.txt.clear()
        this.info_ = null
      }
    },
    value: function(value) {
      if (value !== this.editor.txt.html()) {
        this.editor.txt.html(this.value)
      }
    }
    // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
  },
  mounted() {
    this.seteditor()
    this.editor.txt.html(this.value)
  },
  methods: {
    seteditor() {
      // http://192.168.2.125:8080/admin/storage/create
      this.editor = new E(this.$refs.editor)
      this.editor.customConfig = this.editor.customConfig ? this.editor.customConfig : this.editor.config
      this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
      // this.editor.customConfig.uploadImgServer = Settings.apiUrl + '/api/CoreService/File/UploadFile' // 配置服务器端地址
      // 自定义图片上传
      this.editor.customConfig.customUploadImg = async(files, insertImgFn) => {
        // files 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        const formData = new FormData()
        formData.append('file', files[0])
        const data = await imgUpload(formData)
        // 上传图片，返回结果，将图片插入到编辑器中
        insertImgFn(data.url)
        this.$message.success('图片上传成功')
      }
      this.editor.customConfig.uploadImgHeaders = {} // 自定义 header
      this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
      this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
      this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
      this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
      this.editor.customConfig.showFullScreen = true
      // 配置菜单
      this.editor.customConfig.showMenuTooltips = true
      this.editor.customConfig.menuTooltipPosition = 'down' // 提示‘下标’
      // 配置行高
      this.editor.customConfig.lineHeights = ['1', '1.15', '1.6', '2', '2.5', '3']
      this.editor.customConfig.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'lineHeight', // 行高12
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'video', // 插入视频
        'code', // 插入代码
        'undo', // 撤销
        'redo', // 重复
        'fullscreen' // 全屏
      ]

      this.editor.customConfig.uploadImgHooks = {
        fail: (xhr, editor, result) => {
          // 插入图片失败回调
        },
        success: (xhr, editor, result) => {
          // 图片上传成功回调
          if (result.assertion) {
            console.log(result.message)
          }
        },
        timeout: (xhr, editor) => {
          // 网络超时的回调
        },
        error: (xhr, editor) => {
          // 图片上传错误的回调
        },
        customInsert: (insertImg, result, editor) => {
          // 图片上传成功，插入图片的回调
          // result为上传图片成功的时候返回的数据，这里我打印了一下发现后台返回的是data：[{url:"路径的形式"},...]
          // console.log(result.data[0].url)
          // insertImg()为插入图片的函数
          // 循环插入图片
          const url = Settings.apiUrl + ':1889/' + result.objectEntity
          insertImg(url)
          // }
        }
      }
      this.editor.customConfig.onchange = html => {
        this.info_ = html // 绑定当前逐渐地值
        this.$emit('change', this.info_) // 将内容同步到父组件中
      }
      // 创建富文本编辑器
      this.editor.create()
    }
  }
}
</script>
<style lang="css">
/*.editor {*/
/*  position: relative;*/
/*  z-index: 0;*/
/*}*/

</style>
