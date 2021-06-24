<template>
  <div>
    <mavon-editor
      ref="md"
      v-model="content"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      @change="change"
    />
  </div>
</template>

<script>
import { uploadFile, deleteFile } from '@/api/file'

export default {
  name: 'Markdown',
  components: {},
  data() {
    return {
      content: '',
      html: '',
      configs: {
        boxShadow: false
      }
    }
  },
  methods: {
    /**
     * 将图片上传到服务器，返回地址替换到md中
     * @param {string} index  图片索引
     * @param file 图片对象
     */
    imgAdd(index, file) {
      console.log(file)
      const formData = new FormData()
      formData.append('file', file)
      uploadFile(formData).then(response => {
        const res = response.data
        const url = res.data.fileUrl
        this.$refs.md.$img2Url(index, url)
      })
    },
    /**
     * 删除图片
     * @param {Array} index index[0]为图片 URL，index[1]为该文件对象
     */
    imgDel(index) {
      // index[0]: http://localhost:3000/upload/20210521/16215627399857247.png
      // delete this.img_file[index]
      const imgUrl = index[0].substring(29)
      deleteFile(imgUrl).then(response => {
        const res = response.data
        if (res.status === 200) {
          this.$message.success(res.msg)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    change(value, render) {
      // render 为 markdown 解析后的结果
      this.html = render
      // console.log(render)
    },
    submit() {
      // console.log(this.content)
      console.log(this.html)
      this.$message.success('提交成功！')
    }
  }
}
</script>

