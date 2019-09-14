import React from 'react'
import './PostDisplay.css'
import { ListGroupItem, Button } from 'react-bootstrap'
import { isPoster } from '../../libs/helpers'

const PostDisplay = props => (
  <ListGroupItem>
    <div className="postDisplay">
      <div className="photoPost" style={{ backgroundImage: `url(${props.post.postAvatar})` }} />
      <div>
        <strong>{props.post.postUser}</strong>, napisał:
        <strong>{isPoster(props.post.postUID, props.user.uid)}</strong>
        <div>{props.post.postBody}</div>
      </div>
    </div>
  </ListGroupItem>
)

export default PostDisplay
