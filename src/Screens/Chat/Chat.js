import React, { Component } from 'react'
import PostDisplay from '../../Components/PostDisplay/PostDisplay'
import PostEditor from '../../Components/PostEditor/PostEditor'
import _ from 'lodash'
import fire from '../../config/Fire'
import 'flag-icon-css/css/flag-icon.min.css'

import { Panel, ListGroup } from 'react-bootstrap'
import {
  Button,
  ButtonGroup,
  FormGroup,
  InputGroup,
  Card,
  Navbar,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Popover,
  MenuDivider,
  TextArea,
  Tooltip,
   Position,
   Classes
} from '@blueprintjs/core'

import './Chat.css'
const apiKey = 'AIzaSyA1xQVYNd7WWiwAmKiBak9ZEy5RyyKJXM4'
var googleTranslate = require('google-translate')(apiKey)

class Chat extends Component {
  constructor(props) {
    super(props)
    this.postsCollection = this.props.firestore.collection('posts')
    this.unsubscribe = null
    this.state = {
      postData: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.postsCollection.onSnapshot(this.onCollectionUpdate)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  logout = e => {
    e.preventDefault()
    fire.auth().signOut()
  }
  onCollectionUpdate = snapshot => {
    let postData = []
    if (snapshot) {
      snapshot.forEach(doc => {
        const { postBody, postUser, postAvatar, postUID, postTime } = doc.data()
        postData.push({
          key: doc.id,
          postBody,
          postUser,
          postAvatar,
          postUID,
          postTime
        })
      })
    } else postData = this.state.postData
    const postsBodies = _.map(postData, 'postBody')
    googleTranslate.translate(postsBodies, this.props.language, (err, translation) => {
      let posts = _.map(translation, function(item, index) {
        return { ...item, ...postData[index] }
      })
      // console.log('zapytanie return', posts, this.props.language)
      this.setState({ postData: posts })
    })
  }
  renderPostsList = (user, postData) => {
    return (
      <ListGroup>
        {postData
          .sort((a, b) => a.postTime - b.postTime)
          .map((post, id) => {
            return <PostDisplay key={id} user={user} post={post} />
          })}
      </ListGroup>
    )
  }
  renderFooter = (user, posts) => <PostEditor user={user} postsCollection={posts} />

  renderMenuButton = () => {
    const exampleMenu = (
      <Menu className="menuButton" style={{ float: 'right' }}>
        <Tooltip content="Feature disable in demo version" position={Position.LEFT}>
        <MenuItem icon="cog" text="Language change" popoverProps={{ openOnTargetFocus: false }}>
          <MenuItem disabled="true" text="Custom" />
          <MenuDivider />
          <MenuItem disabled="true" text="English" onClick={() => this.props.onLanguageChange('pl')} />
          <MenuItem disabled="true" text="Polish" onClick={() => this.props.onLanguageChange('pl')} />
          <MenuItem disabled="true" text="Spanish" onClick={() => this.props.onLanguageChange('es')} />
          <MenuItem disabled="true" text="Chinese" onClick={() => this.props.onLanguageChange('ch')} />
        </MenuItem>
        </Tooltip>
        <MenuItem icon="log-out" text="Logout" onClick={this.logout} />
      </Menu>
    )

    return (
      <Popover content={exampleMenu}>
        <Button icon="cog" minimal="true" />
      </Popover>
    )
  }
  renderNavbar = () => {
    let flagClassName = 'flag flag-icon flag-icon-'
    return (
      <Navbar>
        <Navbar.Group>
        <Tooltip content="Private chat feature is not avaliable yet" position={Position.TOP}>
          <Tabs
            animate={this.state.animate}
            id="navbar"
            large={true}
            onChange={this.handleNavbarTabChange}
            selectedTabId={this.state.navbarTabId}
          >
            <Tab id="Global" title="Global" />
            <Tab id="Olek" title="Olek" />
            <Tab id="Juan" title="Juan" />
          </Tabs>
          </Tooltip>
        </Navbar.Group>
        <Navbar.Group align="right">
          Language: <span class={flagClassName.concat(this.props.language)}></span>
          {this.renderMenuButton()}
        </Navbar.Group>
      </Navbar>
    )
  }
  render() {
    const { user } = this.props
    const { postData } = this.state
    return (
      <div>
        <Card className="chatPanel" elevation={4}>
          {this.renderNavbar()}
          {this.renderPostsList(user, postData)}
          {this.renderFooter(user, this.postsCollection)}
        </Card>
      </div>
    )
  }
}

export default Chat
