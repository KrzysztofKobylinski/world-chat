import React, { Component } from 'react'
import PostDisplay from '../../Components/PostDisplay/PostDisplay'
import PostEditor from '../../Components/PostEditor/PostEditor'

import { Panel, ListGroup } from 'react-bootstrap'
import { Button, ButtonGroup, FormGroup, InputGroup, Card } from '@blueprintjs/core'

import './Chat.css'
const apiKey = "AIzaSyA1xQVYNd7WWiwAmKiBak9ZEy5RyyKJXM4";
var googleTranslate = require('google-translate')(apiKey);

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
  
  translate = (post) =>{
    let translation2 = new Promise(function(resolve, reject){
      googleTranslate.translate(post.postBody, "es", function(err, translation) {
        
        resolve(translation) 
        });
    }
     
    )
    translation2.then(translation => {
      console.log(translation,"here")
      return translation
    })
  
}

  componentWillUnmount() {
    this.unsubscribe()
  }

  onCollectionUpdate = snapshot => {
    const postData = []
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
      
       /* this.translate(postData) */
     /*  console.log(postData) */
    })
    
      this.setState({
        postData
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
  renderFooter = (user, posts) => (

      <PostEditor user={user} postsCollection={posts} />

  )

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
