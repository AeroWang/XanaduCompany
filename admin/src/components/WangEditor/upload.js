import { uploadFile } from '@/api/file'

export function imgUpload(file) {
  return new Promise((resolve, reject) => {
    uploadFile(file).then(response => {
      const res = response.data
      console.log(res)
      if (res.status === 200) {
        const data = {
          url: res.data.fileUrl
          // type: file.name ? fileType(file.name) : 'html'
        }
        resolve(data)
      } else {
        reject(res)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
