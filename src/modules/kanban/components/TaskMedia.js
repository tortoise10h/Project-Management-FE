import React, { Component } from 'react'
import { dummyRequest, beforeUpload } from '../../../common/utils/upload'
import { Upload, Button, Icon, Form } from 'antd'

class TaskMedia extends Component {
  constructor (props) {
    super(props)
    this.state = {
      media: [],
      avatarLoading: false,
      isAdd: false
    }
    this.normFile = this.normFile.bind(this)
    this.handleAddMedia = this.handleAddMedia.bind(this)
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
  }

  normFile (e) {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  /* -----------STATUS BUTTON UPLOAD--------------- */
  handleChangeAvatar (info) {
    if (info.file.state === 'uploading') {
      this.setState({ avatarLoading: true })
      return this.normFile(info)
    }
    if (info.file.status === 'done') {
      this.setState({ avatarLoading: false })
    }
    return this.normFile(info)
  }
  /* -----------STATUS BUTTON UPLOAD--------------- */

  /* -----------ADD MEDIA TO TASK--------------- */
  async handleAddMedia (e) {
    const { onAddMedia } = this.props
    e.preventDefault()
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        onAddMedia(values)
        this.setState({
          media: []
        })
      }
    })
  }
  /* -----------ADD MEDIA TO TASK--------------- */

  /* -----------SET MEDIA BEFOR UPLOAD--------------- */
  handleUpload (e) {
    this.setState({
      media: e.fileList
    })
  }
  /* -----------SET MEDIA BEFOR UPLOAD--------------- */

  render () {
    const { form: { getFieldDecorator } } = this.props
    const media = this.state.media

    const uploadProps = {
      multiple: true,
      name: 'media',
      listType: 'picture'
    }

    return (
      <div>
        <Form onSubmit={this.handleAddMedia}>
          <Form.Item label=''>
            {getFieldDecorator('media', {
              getValueFromEvent: this.handleChangeAvatar
            })(
              <Upload
                fileList={this.state.media}
                customRequest={dummyRequest}
                beforeUpload={beforeUpload}
                {...uploadProps}
                onChange={this.handleUpload}
                style={{ width: '100%' }}
              >
                {media.length <= 0
                  ? (
                    <Button block>
                      <Icon type='upload' /> Upload
                    </Button>
                  ) : null}
              </Upload>
            )}
          </Form.Item>
          {
            media.length >= 1 ? (
              <Form.Item style={{ textAlign: 'left' }}>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ marginRight: 13 }}
                >Add
                </Button>
              </Form.Item>
            ) : null
          }
        </Form>
      </div>
    )
  }
}

export default Form.create({ name: 'customized_form_controls' })(TaskMedia)
