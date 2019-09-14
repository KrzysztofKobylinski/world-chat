import React, { Component, createRef } from 'react'
import PostDisplay from '../../Components/PostDisplay/PostDisplay'
import PostEditor from '../../Components/PostEditor/PostEditor'
import _ from 'lodash'
import ScrollToBottom from 'react-scroll-to-bottom';

import { Panel, ListGroup } from 'react-bootstrap'
import { Button, ButtonGroup, FormGroup, InputGroup, Card } from '@blueprintjs/core'

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
 
 
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }
  
  
  
  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.unsubscribe = this.postsCollection.onSnapshot(this.onCollectionUpdate)
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
  

  onCollectionUpdate = snapshot => {
    let postData = []
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
    const postsBodies = _.map(postData, 'postBody')
    googleTranslate.translate(postsBodies, 'es', (err, translation) => {
      let posts = _.map(translation, function (item, index) {
        return { ...item, ...postData[index]}
      })
      this.setState({postData: posts})
    })

  }
  renderPostsList = (user, postData) => {
    return (
      <div>
 <ListGroup>
        {postData
          .sort((a, b) => a.postTime - b.postTime)
          .map((post, id) => {
            return (<PostDisplay key={id} user={user} post={post} />
              
              )
          })}
          
      </ListGroup>
      <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
     
    )
  }
  renderFooter = (user, posts) => <PostEditor user={user} postsCollection={posts} />

  render() {
    const { user } = this.props
    const { postData } = this.state  
    return (
      <div>
        
        <Card className="chatPanel" elevation={4}>
          {this.renderPostsList(user, postData)}
          

          {this.renderFooter(user, this.postsCollection)}
          
        </Card>
        
       
      </div>
    )
  }
}

export default Chat
