import React, { Component } from 'react'
import { Form, FormControl } from 'react-bootstrap'
import { chooseWhatToShow, noAvatar } from '../../libs/helpers'
import fire from '../../config/Fire'
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

  logout = e => {
    e.preventDefault()
    fire.auth().signOut()
  }

  handlePostEditorInputChange = e => {
    const { user } = this.props
    this.setState({
      postBody: e.target.value,
      postUser: chooseWhatToShow(user.displayName, user.email),
      postAvatar: chooseWhatToShow(user.photoURL, noAvatar)
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

  

  renderMenuButton = () => {
    const exampleMenu = (
      <Menu className = "menuButton" style = {{float:'right'}}>
        <MenuItem icon="cog" text="Language change" popoverProps={{ openOnTargetFocus: false }}>
          <MenuItem text="Custom" />
          <MenuDivider />
          <MenuItem text="English" />
          <MenuItem text="Polish" />
          <MenuItem text="Spanish" />
          <MenuItem text="Chinese" />
        </MenuItem>
        <MenuItem icon="log-out" text="Logout" onClick={this.logout} />
      </Menu>
    )

    return (
      <Popover content={exampleMenu}>
        <Button icon="cog" minimal="true" />
      </Popover>
    )
  }
  renderForm = () => (
    <div className= "textAndButton">
      
      <TextArea className = "textArea" style = {{width: '70%', display: 'inline', height:'100%'}} fill={true} onChange={this.handlePostEditorInputChange} value={this.state.postBody} />
      <Button className = "buttonArea" onClick={this.createPost}>Wyślij</Button>

    </div>
  )

  renderProfile = () => (
    <div
      className="headerPhoto"
      style={{
        backgroundImage: `url(${chooseWhatToShow(this.props.user.photoURL, noAvatar)})`
      }}
    />
  )
  render() {
    console.log(this.props)
    return (
      <Form inline className = "">
       <div className="wholeArea">
       {this.renderProfile()}
        {this.renderForm()}
         </div> 
       <div className= "menuButtonArea">{this.renderMenuButton()}</div> 
      </Form>
    )
  }
}

export default PostEditor
