function getUploadFileExt(name) {
  const ext = name.split('.')
  return ext[ext.length - 1]
}

module.exports = getUploadFileExt
