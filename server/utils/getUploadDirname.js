function getUploadDirName() {
  const date = new Date()
  let month = Number.parseInt(date.getMonth()) + 1
  month = month.toString().length > 1 ? month : `0${month}`
  const dir = `${date.getFullYear()}${month}${date.getDate()}`
  return dir
}

module.exports = getUploadDirName
