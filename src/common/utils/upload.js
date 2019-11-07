import { message } from 'antd'

export function beforeUpload (file) {
  console.log('======= BEFORE UPLOAD ======')
  const isLt50M = file.size / 1024 / 1024 < 50
  if (!isLt50M) {
    message.error('Image must smaller than 50MB!')
  }
  return isLt50M
}

export function videoBeforeUpload (file) {
  const isLt50M = file.size / 1024 / 1024 < 50
  const isMp4 = file.type === 'audio/mp4' || file.type === 'video/mp4'
  if (!isMp4) {
    message.error('You can only upload mp4 file')
  }
  if (!isLt50M) {
    message.error('Video must smaller than 50MB!')
  }
  return isLt50M && isMp4
}

export function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export function dummyRequest ({ file, onSuccess }) {
  setTimeout(() => {
    onSuccess('ok')
  }, 0)
}
