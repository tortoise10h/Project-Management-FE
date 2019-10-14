import { notification } from 'antd'

const checkError = (error) => {
  notification.config({
    placement: 'topRight'
  })
  switch (typeof (error)) {
    case 'object': {
      if (Array.isArray(error)) {
        error.map((a) => (
          notification.error({
            message: a.message
          })
        ))
      } else {
        notification.error({
          message: error.message
        })
      }
      break
    }
    case 'string': {
      notification.error({
        message: error
      })
      break
    }
    default: {
      notification.error({
        message: 'Server Error'
      })
    }
  }
}

export default checkError
