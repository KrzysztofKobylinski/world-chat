import React, { Component } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { chooseWhatToShow, noAvatar } from '../../libs/helpers'
import { Menu, MenuItem, Popover, Button, MenuDivider, TextArea } from '@blueprintjs/core'

import './PostEditor.css'

class PostEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postBody: '',
      postUser: '',
      postAvatar: ''
    }
  }

  handlePostEditorInputChange = e => {
    const { user } = this.props
    this.setState({
      postBody: e.target.value,
      postUser: chooseWhatToShow(user.displayName, user.email),
      postAvatar: chooseWhatToShow(user.photoURL, noAvatar(this.props.user.email))
    })
  }

  createPost = e => {
    e.preventDefault()
    const { user } = this.props
    const { postBody, postUser, postAvatar } = this.state
    if (postBody) {
      this.props.postsCollection.add({
        postBody,
        postUser,
        postAvatar,
        postUID: user.uid,
        postTime: new Date().getTime()
      })

      this.setState({
        postBody: '',
        postUser: '',
        postAvatar: ''
      })
    }
  }

  renderForm = () => (
    <div className="textAndButton">
      <TextArea
        className="textArea"
        style={{ width: '70%', display: 'inline', height: '100%' }}
        fill={true}
        onChange={this.handlePostEditorInputChange}
        value={this.state.postBody}
        placeholder="Insert text in any language you want :)"
      />
      <Button className="buttonArea" onClick={this.createPost}>
        Send!
      </Button>
    </div>
  )

  renderProfile = () => (
    <div
      className="headerPhoto"
      style={{
        backgroundImage: `url(${chooseWhatToShow(this.props.user.photoURL, noAvatar(this.props.user.email))})`
      }}
    />
  )
  render() {
    console.log(this.props.user.email)
    return (
      <Form inline className="">
        <div className="wholeArea">
          {this.renderProfile()}
          {this.renderForm()}
        </div>
      </Form>
    )
  }
}

export default PostEditor
