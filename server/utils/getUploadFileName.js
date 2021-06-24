function getUploadFileName (ext) {
  return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`
}

module.exports = getUploadFileName
