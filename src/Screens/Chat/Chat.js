import React, { Component } from 'react'
import PostDisplay from '../../Components/PostDisplay/PostDisplay'
import PostEditor from '../../Components/PostEditor/PostEditor'

import { Panel, ListGroup } from 'react-bootstrap'
import { Button, ButtonGroup, FormGroup, InputGroup, Card } from '@blueprintjs/core'

import './Chat.css'

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
