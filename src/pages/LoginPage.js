import React from 'react'
import { Input, Row, Col, Button } from 'antd'

export default class LoginPage extends React.Component {
  render () {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Login Form :)</h1>
        <Row type='flex' justify='center'>
          <Col span={12}>
            <Input />
            <Input />
            <Button type='primary'>Login</Button>
          </Col>
        </Row>
      </div>
    )
  }
}
